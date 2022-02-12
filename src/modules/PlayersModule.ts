import {_ModuleBase} from "./_ModuleBase"
import {Client} from "minecraft-protocol"
import {Player} from "../classes/Player"
import {utils} from "../utils"
import {mcColors} from "../data/mcColors"
import {statsObject} from "../data/statsObject";
import {configInterface} from "../interfaces/configInterface";
import {VirtualHypixel} from "../classes/VirtualHypixel";

const ChatMessage = require('prismarine-chat')('1.8')

export class PlayersModule extends _ModuleBase {

    players: Player[] = []
    playersSent: any = {}
    clientPlayer: Player
    apiKey: string
    lastRespawn: number = 0
    config: configInterface

    dodging: boolean = false

    constructor(client: Client, virtual: VirtualHypixel) {
        super("Players",  "1.0.0", client, virtual)
        this.config = virtual.config
        this.apiKey = this.config.account.hypixelApiKey
        this.clientPlayer = new Player(client.profile.id, -1)
    }

    onInPacket(meta: any, data: any, toServer: Client) {
        if (meta.name === "named_entity_spawn") {
            if (data.playerUUID !== undefined && data.entityId !== undefined) {
                const player = new Player(data.playerUUID, data.entityId)
                player.exists()
                    .then(exists => {
                        if (exists) {
                            player.loadMode(this.apiKey)
                                .then((e) => {
                                    if (e) {
                                        if (player.currentMode === this.clientPlayer.currentMode && !this.hasPlayer(player)) {
                                            this.players.push(player)
                                            this.playersSent[player.uuid] = false
                                            player.loadStats(this.apiKey)
                                                .catch(e => {
                                                    this.logger.error(`Error loading stats of ${player.name}: ${e}`)
                                                })
                                        }
                                    }
                                })
                                .catch(e => {
                                    this.logger.error(`Error loading gamemode of ${player.uuid}: ${e}`)
                                })
                        }
                    })
                    .catch(() => {
                        // player doesn't exist, do nothing
                    })
            }
        } else if (meta.name === "entity_destroy") {
            for (let id of data.entityIds) {
                if (this.getEntityIDIndex(id) !== -1) {
                    const uuid = this.players[this.getEntityIDIndex(id)].uuid
                    this.players.splice(this.getEntityIDIndex(id), 1)
                    delete this.playersSent[uuid]
                }
            }
        } else if (meta.name === "respawn" && new Date().getTime() - this.lastRespawn > 500) {
            this.lastRespawn = new Date().getTime()
            this.players = []
            this.clientPlayer.loadMode(this.apiKey)
                .catch(e => {
                    this.logger.error(`Error loading current gamemode: ${e}`)
                })
        } else if (meta.name === "chat") {
            const m = new ChatMessage(JSON.parse(data.message))

            if (m.toString() === "Are you sure? Type /lobby again if you really want to quit." && this.dodging) {
                this.dodging = false
                setTimeout(() => {
                    toServer.write("chat", { message: "/l" })
                    return
                }, 700)
            }

            const playerCountRE = /\(([0-9]*)\/([0-9]*)\)/

            const ex = playerCountRE.exec(m.toString())
            if (ex && parseInt(ex[1]) > 1) {
                setTimeout(() => {
                    let sentToClient = 0
                    for (let player of this.players) {
                        if (!this.playersSent[player.uuid]) {
                            sentToClient++
                            this.playersSent[player.uuid] = true
                            if (player.currentMode) {
                                if (Object.keys(statsObject).includes(player.currentMode)) {
                                    // @ts-ignore
                                    const s = statsObject[player.currentMode](player.playerObj)
                                    utils.message.sendMessage(this.client, s.t)
                                    if (this.config.autododge.shouldDodge && this.clientPlayer.currentMode) {
                                        const hasMode = Object.keys(this.config.autododge.dodge).includes(this.clientPlayer.currentMode)
                                        const hasAll = Object.keys(this.config.autododge.dodge).includes("ALL")
                                        if (hasMode || hasAll) {
                                            const criteria = this.config.autododge.dodge[hasMode ? this.clientPlayer.currentMode : "ALL"]
                                            if (
                                                criteria.wins && s.wins > criteria.wins ||
                                                criteria.ws && s.ws > criteria.ws ||
                                                criteria.wlr && (s.losses !== 0 ? s.wins/s.losses : s.wins) > criteria.wlr
                                            ) {
                                                utils.message.sendMessage(this.client, utils.message.colorText("Dodging!", mcColors.RED, true))
                                                setTimeout(() => {
                                                    this.dodging = true
                                                    toServer.write("chat", { message: "/l" })
                                                }, 700)
                                            }
                                        }
                                    }
                                } else {
                                    utils.message.sendMessage(this.client, statsObject.getPlayerText(player.playerObj))
                                }
                            }
                        }
                    }
                    let alreadySent = 0
                    for (let u of Object.keys(this.playersSent)) {
                        if (this.playersSent[u]) alreadySent++
                    }
                    for (let i = 0; i < parseInt(ex[1]) - 1 - alreadySent - sentToClient; i++) {
                        utils.message.sendMessage(this.client, utils.message.colorText("Nicked player!", mcColors.RED, true))
                    }
                }, 2000)
            }
        }
    }


    hasPlayer(player: Player) {
        for (let p of this.players) {
            if (p.uuid === player.uuid) return true
        }
        return false
    }

    getEntityIDIndex(id: number) {
        for (const [index, player] of this.players.entries()) {
            if (player.entityID === id) return index
        }
        return -1
    }
}