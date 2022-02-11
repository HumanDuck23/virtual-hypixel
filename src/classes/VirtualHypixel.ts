import {configInterface} from "../interfaces/configInterface"
import {InstantConnectProxy} from "prismarine-proxy"
import {PacketFilter} from "./PacketFilter"
import {Client} from "minecraft-protocol"
import {Logger} from "./Logger"
import {_ModuleBase} from "../modules/_ModuleBase";
import {PlayersModule} from "../modules/PlayersModule";


export class VirtualHypixel {

    version: string = "beta-0.0.1"
    config: configInterface
    proxy: InstantConnectProxy
    client: Client | undefined

    // class instances
    logger: Logger = new Logger()
    packetFilter: PacketFilter

    // modules
    modules: _ModuleBase[] = []

    constructor(config: configInterface) {
        this.logger.info(`Virtual Hypixel ${this.version} is starting...`)
        this.config = config

        this.packetFilter = new PacketFilter(this.config.packet)

        this.proxy =  new InstantConnectProxy({
            loginHandler: (client) => {
                this.client = client

                // reload modules when reconnecting
                this.logger.info("Forwarding your connection and reloading modules...")
                this.modules = []
                this.modules.push(new PlayersModule(this.client, this.config.account.hypixelApiKey))

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
        this.proxy.on("incoming", (data: any, meta: { name: string }, toClient: Client, toServer: Client) => {
            if (this.packetFilter.handleIncomingPacket(meta, data)) return

            for (let module of this.modules) {
                module.onPacket(meta, data)
            }

            toClient.write(meta.name, data)
        })

        // @ts-ignore
        this.proxy.on("outgoing", (data: { message: string, data?: any }, meta: { name: string }, toClient: Client, toServer: Client) => {
            toServer.write(meta.name, data)
        })

        this.logger.info(`Ready! Connect to 'localhost' to start playing!`)
    }
}