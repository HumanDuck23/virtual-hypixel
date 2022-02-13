import {Client} from "minecraft-protocol"
import {_ModuleBase} from "./_ModuleBase"
import {VirtualHypixel} from "../classes/VirtualHypixel"
import {utils} from "../utils"
import {mcColors} from "../data/mcColors"

export class CommandModule extends _ModuleBase {

    constructor(client: Client, virtual: VirtualHypixel) {
        super("Commands",  "1.0.0", client, virtual)
    }

    onOutPacket(meta: any, data: any, toServer: Client) {
        if (meta.name === "chat") {
            if (data.message === "/rq") {
                if (this.virtual.playerModule?.clientPlayer.currentMode)
                    toServer.write("chat", { message: `/play ${this.virtual.playerModule?.clientPlayer.currentMode.toLowerCase()}` })
                else
                    utils.message.sendMessage(this.client, utils.message.colorText("You need to be in game to re-queue!", mcColors.RED, true))
                return true
            } else if (data.message === "/l") {
                if (this.virtual.playerModule)
                    this.virtual.playerModule.clientPlayer.currentMode = "LOBBY"
            }
        }

        return false
    }

}