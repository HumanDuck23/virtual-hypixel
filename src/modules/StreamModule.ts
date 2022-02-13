import {_ModuleBase} from "./_ModuleBase"
import {Client} from "minecraft-protocol"
import {VirtualHypixel} from "../classes/VirtualHypixel"
import {configInterface} from "../interfaces/configInterface"

const ChatMessage = require('prismarine-chat')('1.8')

export class StreamModule extends _ModuleBase {

    config: configInterface

    constructor(client: Client, virtual: VirtualHypixel) {
        super("StreamMod",  "1.0.0", client, virtual)
        this.config = virtual.config
    }

    onInPacket(meta: any, data: any, toServer: Client) {
        if (meta.name === "chat") {
            const m = new ChatMessage(JSON.parse(data.message))

            const re = /(.*):.*/
            if (re.exec(m.toString())) {
                // @ts-ignore
                const spaced = re.exec(m.toString())[1].split(" ")
                let name = spaced[spaced.length - 1]
                if (name.includes("[")) {
                    // guild rank
                    name = spaced[spaced.length - 2]
                }
                console.log(`message from ${name}`)
            }
        }
    }

}