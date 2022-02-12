import {configInterface} from "../interfaces/configInterface"

export class PacketFilter {

    config: configInterface["packet"]

    constructor(config: configInterface["packet"]) {
        this.config = config
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

        return [false, data]
    }

}