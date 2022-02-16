import {configInterface} from "../interfaces/configInterface"
import {VirtualHypixel} from "./VirtualHypixel"
import {StreamModule} from "../modules/StreamModule";

const ChatMessage = require('prismarine-chat')('1.8')

export class PacketFilter {

    config: configInterface
    virtual: VirtualHypixel

    constructor(config: configInterface, virtual: VirtualHypixel) {
        this.config = config
        this.virtual = virtual
    }

    handleIncomingPacket(meta: any, data: any): [boolean, any] {
        // World Particles
        if (meta.name === "world_particles" && this.config.packet.particles) return [true, null]

        // Disabled mods
        if (data.data && data.data.toString().toLowerCase().includes("hypixel") && this.config.packet.enableMods) return [true, null]
        if (data.channel && data.channel === "badlion:mods" && this.config.packet.enableMods) return [true, null]

        if (meta.name === "scoreboard_team") {
            if (data.team) data.team = data.team.replace("§k", "")
            if (data.name) data.name = data.name.replace("§k", "")
            if (data.prefix) data.prefix = data.prefix.replace("§k", "")
        }

        /*if (meta.name === "player_info") {
            for (const e of data.data) {
                if (e !== null && e.ping === 0 && this.virtual.playerModule?.clientPlayer.currentMode !== "LOBBY" && this.virtual.playerModule?.clientPlayer.currentMode !== undefined) {
                    return [true, null]
                }
            }
        }*/

        if (meta.name === "chat") {
            const m = new ChatMessage(JSON.parse(data.message))

            const serverRE = /You are currently connected to server (.*)/
            if (serverRE.exec(m.toString())) {
                if (this.virtual.playerModule) {
                    const rex = serverRE.exec(m.toString())
                    if (rex && rex[1].includes("mini"))
                        this.virtual.playerModule.clientPlayer.currentMode = "GAME"
                    else
                        this.virtual.playerModule.clientPlayer.currentMode = "LOBBY"
                }
                return [true, null]
            }

            if (this.virtual.streamModule?.getMessageSender(m.toString())) {
                const name = this.virtual.streamModule.getMessageSender(m.toString())
                // @ts-ignore
                if (name && this.virtual.streamModule?.messages[name] > this.config.streamMod.spam.limit) {
                    this.virtual.streamModule?.onSpam(name)
                }
            }
        }

        return [false, data]
    }

}