export interface configInterface {
    account: {
        email: string,
        password: string,
        auth: "mojang" | "microsoft",

        hypixelApiKey: string
    },


    game: {
        enableMods: boolean,
        particles: boolean
    }
}