export interface configInterface {
    account: {
        email: string,
        password: string,
        auth: "mojang" | "microsoft",

        hypixelApiKey: string
    },


    packet: {
        enableMods: boolean,
        particles: boolean
    },

    autododge: {
        [key: string]: {
            wlr?: number,
            wins?: number,
            ws?: number
        }
    }
}