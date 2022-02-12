import {_ModuleBase} from "./_ModuleBase"
import {Client} from "minecraft-protocol"
import {Player} from "../classes/Player"
import {utils} from "../utils"
import {mcColors} from "../data/mcColors"
import {statsObject} from "../data/statsObject";
import {configInterface} from "../interfaces/configInterface";

const ChatMessage = require('prismarine-chat')('1.8')

export class PlayersModule extends _ModuleBase {

    players: Player[] = []
    clientPlayer: Player
    apiKey: string
    lastRespawn: number = 0
    config: configInterface

    dodging: boolean = false

    constructor(client: Client, config: configInterface) {
        super("Players",  "1.0.0", client)
        this.config = config
        this.apiKey = config.account.hypixelApiKey
        this.clientPlayer = new Player(client.profile.id)
    }

    onPacket(meta: any, data: any, toServer: Client) {
        if (meta.name === "named_entity_spawn") {
            if (data.playerUUID !== undefined) {
                const player = new Player(data.playerUUID)
                player.exists()
                    .then(exists => {
                        if (exists) {
                            player.loadMode(this.apiKey)
                                .then((e) => {
                                    if (e) {
                                        if (player.currentMode === this.clientPlayer.currentMode) {
                                            this.players.push(player)
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
            if (ex && ex[1] === ex[2]) {
                setTimeout(() => {
                    let sentToClient = 0
                    for (let player of this.players) {
                        sentToClient++
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
                    for (let i = 0; i < parseInt(ex[2]) - 1 - sentToClient; i++) {
                        utils.message.sendMessage(this.client, utils.message.colorText("Nicked player!", mcColors.RED, true))
                    }
                }, 2000)
            }
        }
    }

}