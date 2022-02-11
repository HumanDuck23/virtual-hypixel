import {_ModuleBase} from "./_ModuleBase"
import {Client} from "minecraft-protocol"
import fs from "fs";

export class PlayersModule extends _ModuleBase {

    constructor(client: Client) {
        super("Players",  "1.0.0", client);
    }

    onPacket(meta: any, data: any) {
        fs.appendFileSync("./packetLog.txt", `=====================\n${JSON.stringify(meta)}\n${JSON.stringify(data)}\m=====================`)
    }

}