import {mcColors} from "./data/mcColors"
import {Client} from "minecraft-protocol"

export const utils = {
    message: {
        sendMessage (client: Client, m: string, hoverText: string = "") {
            let message = {};
            if (hoverText) {
                message = { message: JSON.stringify({ text: "", extra: [{ text: m, hoverEvent: { action: "show_text", value: { text: hoverText } } }] }) }
            } else {
                message = { message: JSON.stringify({ text: "", extra: [{ text: m }] }) }
            }
            client.write("chat", message)
        },

        colorText(text: string, color: mcColors, bold = false, underline = false, italic = false, strike = false, obf = false) {
            return color + (bold ? mcColors.BOLD : "") + (underline ? mcColors.UNDERLINE : "") + (italic ? mcColors.ITALIC : "") + (strike ? mcColors.STRIKETHROUGH : "") + (obf ? mcColors.OBF : "") + text + mcColors.RESET
        },

        removeFormattingStrings(message: string) {
            let n = ""
            let skipNext = false
            for (const char of message) {
                if (char === "§") {
                    skipNext = true
                } else {
                    if (!skipNext) {
                        n += char
                    } else {
                        skipNext = false
                    }
                }
            }
            return n
        }
    }
}