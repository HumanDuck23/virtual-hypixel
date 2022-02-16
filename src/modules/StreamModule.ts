import {_ModuleBase} from "./_ModuleBase"
import {Client} from "minecraft-protocol"
import {VirtualHypixel} from "../classes/VirtualHypixel"
import {configInterface} from "../interfaces/configInterface"

const ChatMessage = require('prismarine-chat')('1.8')

export class StreamModule extends _ModuleBase {

    config: configInterface
    messages: {
        [key: string]: number
    } = {}
    toServer: Client | null = null
    warnings: {
        [key: string]: number
    } = {}

    constructor(client: Client, virtual: VirtualHypixel) {
        super("StreamMod",  "1.0.0", client, virtual)
        this.config = virtual.config
    }

    onInPacket(meta: any, data: any, toServer: Client) {
        this.toServer = toServer
        if (meta.name === "chat") {
            const m = new ChatMessage(JSON.parse(data.message))
            const name = this.getMessageSender(m.toString())
            if (name) {
                this.messages[name]++
                setTimeout(() => {
                    this.messages.name--
                }, 500)
            }
        }
    }

    onSpam(name: string) {
        if (this.toServer !== null) {
            this.warnings[name] = this.warnings[name] ? this.warnings[name] + 1 : 1
            if (this.warnings[name] < this.config.streamMod.spam.warncount)
                this.toServer.write("chat", { message: `Don't spam ${name}. This is warning #${this.warnings[name]}` })
            else {
                // max warnings
                for (let [i, command] of this.config.streamMod.spam.actions.entries()) {
                    setTimeout(() => {
                        this.toServer?.write("chat", { message: command })
                    }, 400 * (i+1))
                }
            }
        }
    }

    getMessageSender(m: string) {
        const re = /(.*):.*/
        if (re.exec(m)) {
            // @ts-ignore
            const spaced = re.exec(m.toString())[1].split(" ")
            let name = spaced[spaced.length - 1]
            if (name.includes("[")) {
                // guild rank
                name = spaced[spaced.length - 2]
            }
            return name
        } else return null
    }
}