import {Client} from "minecraft-protocol"
import {Logger} from "../classes/Logger";
import {VirtualHypixel} from "../classes/VirtualHypixel";

export class _ModuleBase {

    name: string
    version: string
    client: Client
    logger: Logger = new Logger()
    virtual: VirtualHypixel

    constructor(name: string, version: string, client: Client, virtual: VirtualHypixel) {
        this.name = name
        this.version = version
        this.client = client
        this.virtual = virtual

        this.logger.info(`Loaded module: ${name} v${version}`)
    }

    onInPacket(meta: any, data: any, toServer: Client) {}

    onOutPacket(meta: any, data: any, toServer: Client): boolean {
        return false
    }

}