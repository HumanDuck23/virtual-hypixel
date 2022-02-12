import {configInterface} from "../interfaces/configInterface"
import {VirtualHypixel} from "./VirtualHypixel";

export class PacketFilter {

    config: configInterface["packet"]
    virtual: VirtualHypixel

    constructor(config: configInterface["packet"], virtual: VirtualHypixel) {
        this.config = config
        this.virtual = virtual
    }

    handleIncomingPacket(meta: any, data: any): [boolean, any] {
        // World Particles
        if (meta.name === "world_particles" && !this.config.particles) return [true, null]

        // Disabled mods
        if (data.data && data.data.toString().toLowerCase().includes("hypixel") && this.config.enableMods) return [true, null]
        if (data.channel && data.channel === "badlion:mods" && this.config.enableMods) return [true, null]

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

        return [false, data]
    }

}