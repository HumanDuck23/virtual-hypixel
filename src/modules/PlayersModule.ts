import {_ModuleBase} from "./_ModuleBase"
import {Client} from "minecraft-protocol"
import {Player} from "../classes/Player"
import {utils} from "../utils"
import {mcColors} from "../data/mcColors"
import {statsObject} from "../data/statsObject";

const ChatMessage = require('prismarine-chat')('1.8')

export class PlayersModule extends _ModuleBase {

    players: Player[] = []
    clientPlayer: Player
    apiKey: string
    lastRespawn: number = 0

    constructor(client: Client, apiKey: string) {
        super("Players",  "1.0.0", client)
        this.apiKey = apiKey
        this.clientPlayer = new Player(client.profile.id)
    }

    onPacket(meta: any, data: any) {
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
                                utils.message.sendMessage(this.client, statsObject[player.currentMode](player.playerObj))
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