import {configInterface} from "../interfaces/configInterface"
import {InstantConnectProxy} from "prismarine-proxy"
import {PacketFilter} from "./PacketFilter"
import {Client} from "minecraft-protocol"
import {Logger} from "./Logger"
import {_ModuleBase} from "../modules/_ModuleBase"
import {PlayersModule} from "../modules/PlayersModule"
import {mcColors} from "../data/mcColors"
import {utils} from "../utils"
import fs from "fs"
import {CommandModule} from "../modules/CommandModule"
import {StreamModule} from "../modules/StreamModule"


export class VirtualHypixel {

    version: string = "beta-0.0.3"
    config: configInterface
    proxy: InstantConnectProxy
    client: Client | undefined

    // class instances
    logger: Logger = new Logger()
    packetFilter: PacketFilter

    // modules
    playerModule: PlayersModule | null = null
    commandModule: CommandModule | null = null
    streamModule: StreamModule | null = null
    modules: _ModuleBase[] = []

    constructor(config: configInterface) {
        this.logger.info(`Virtual Hypixel ${this.version} is starting...`)
        this.config = config

        this.packetFilter = new PacketFilter(this.config, this)

        this.proxy =  new InstantConnectProxy({
            loginHandler: (client) => {
                this.client = client
                this.logger.info(`Logging in as ${client.profile.name}...`)

                // reload modules when reconnecting
                this.logger.info("Forwarding your connection and reloading modules...")
                this.playerModule = new PlayersModule(this.client, this)
                this.commandModule = new CommandModule(this.client, this)
                this.streamModule = new StreamModule(this.client, this)
                this.modules = []
                this.modules.push(this.playerModule)
                this.modules.push(this.commandModule)
                this.modules.push(this.streamModule)

                const line = utils.message.colorText("------------------------------------", mcColors.DARK_PURPLE, true, false, false, false, true)
                const m1 = utils.message.colorText("Thank you for using Virtual Hypixel!", mcColors.GOLD, true)
                const m2 = utils.message.colorText("                  Have Fun!              ", mcColors.GOLD, true)
                utils.message.sendMessage(this.client, `${line}\n\n${m1}\n${m2}\n\n${line}`)

                return { username: config.account.email, password: config.account.password, auth: config.account.auth }
            },
            serverOptions: {
                version: "1.8.9",
                motd: `${utils.message.colorText("OOO", mcColors.GOLD, true, false, false, false, true)} ${utils.message.colorText(`Virtual Hypixel ${utils.message.colorText(this.version, mcColors.GREEN)}`, mcColors.AQUA)} ${utils.message.colorText("OOO", mcColors.GOLD, true, false, false, false, true)}`,
                maxPlayers: 69,
                favicon: fs.readFileSync("./data/favicon.txt").toString()
            },
            clientOptions: {
                version: "1.8.9",
                host: "hypixel.net"
            }
        })

        // @ts-ignore
        this.proxy.on("incoming", (data: any, meta: { name: string }, toClient: Client, toServer: Client) => {
            const handled = this.packetFilter.handleIncomingPacket(meta, data)
            if (handled[0]) return
            else data = handled[1]

            for (let module of this.modules) {
                module.onInPacket(meta, data, toServer)
            }

            toClient.write(meta.name, data)

            //if (meta.name === "player_info") {
            //    fs.appendFileSync("./packetLog.txt", `========================\n${JSON.stringify(meta)}\n${JSON.stringify(data)}\n`)
            //}
        })

        // @ts-ignore
        this.proxy.on("outgoing", (data: { message: string, data?: any }, meta: { name: string }, toClient: Client, toServer: Client) => {
            let intercept = false
            for (let module of this.modules) {
                let i = module.onOutPacket(meta, data, toServer)
                if (i) intercept = true
            }

            if (!intercept)
                toServer.write(meta.name, data)
        })

        this.logger.info(`Ready! Connect to 'localhost' to start playing!`)
    }
}