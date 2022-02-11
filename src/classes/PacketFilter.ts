import {configInterface} from "../interfaces/configInterface"

export class PacketFilter {

    config: configInterface["packet"]

    constructor(config: configInterface["packet"]) {
        this.config = config
    }

    handleIncomingPacket(meta: any, data: any) {
        // World Particles
        if (meta.name === "world_particles" && !this.config.particles) return true

        // Disabled mods
        if (data.data && data.data.toString().toLowerCase().includes("hypixel") && this.config.enableMods) return true
        if (data.channel && data.channel === "badlion:mods" && this.config.enableMods) return true
        return false
    }

}