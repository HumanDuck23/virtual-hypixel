import {Client} from "minecraft-protocol"
import {Logger} from "../classes/Logger";

export class _ModuleBase {

    name: string
    version: string
    client: Client
    logger: Logger = new Logger()

    constructor(name: string, version: string, client: Client) {
        this.name = name
        this.version = version
        this.client = client

        this.logger.info(`Loaded module: ${name} v${version}`)
    }

    onPacket(meta: any, data: any, toServer: Client) {}

}