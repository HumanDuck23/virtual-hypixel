import {configInterface} from "../interfaces/configInterface"
import {InstantConnectProxy} from "prismarine-proxy"
import {PacketFilter} from "./PacketFilter"
import {Client} from "minecraft-protocol"
import {Logger} from "./Logger"


export class VirtualHypixel {

    version: string = "beta-0.0.1"
    config: configInterface
    proxy: InstantConnectProxy

    // class instances
    logger: Logger = new Logger()
    packetFilter: PacketFilter

    constructor(config: configInterface) {
        this.logger.info(`Virtual Hypixel ${this.version} is starting...`)
        this.config = config

        this.packetFilter = new PacketFilter(this.config.packet)

        this.proxy =  new InstantConnectProxy({
            loginHandler: (client) => {
                return { username: config.account.email, password: config.account.password, auth: config.account.auth }
            },
            serverOptions: {
                version: "1.8.9",
                motd: `Virtual Hypixel ${this.version}`,
                maxPlayers: 69
            },
            clientOptions: {
                version: "1.8.9",
                host: "hypixel.net"
            }
        })

        // @ts-ignore
        this.proxy.on("incoming", (data: any, meta: { name: string }, toClient: AAA, toServer: Client) => {
            if (this.packetFilter.handleIncomingPacket(meta, data)) return
            toClient.write(meta.name, data)
        })

        // @ts-ignore
        this.proxy.on("outgoing", (data: { message: string, data?: any }, meta: { name: string }, toClient: Client, toServer: Client) => {
            toServer.write(meta.name, data)
        })

        this.logger.info(`Ready! Connect to 'localhost' to start playing!`)
    }
}