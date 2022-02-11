import {Client} from "minecraft-protocol"

export class _ModuleBase {

    name: string
    version: string
    client: Client

    constructor(name: string, version: string, client: Client) {
        this.name = name
        this.version = version
        this.client = client
    }

    onPacket(meta: any, data: any) {}

}