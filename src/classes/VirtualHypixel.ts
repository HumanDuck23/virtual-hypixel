import {configInterface} from "../interfaces/configInterface"
import {InstantConnectProxy} from "prismarine-proxy";

export class VirtualHypixel {

    version: string = "beta-0.0.1"
    config: configInterface
    proxy: InstantConnectProxy

    constructor(config: configInterface) {
        this.config = config

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
    }
}