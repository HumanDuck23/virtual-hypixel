import {utils} from "../utils"
import {mcColors} from "./mcColors";

export const statsObject = {
    "DUELS_SUMO_DUEL" (player: any) {
        const d = player.stats.Duels

        const wins = d.sumo_duel_wins
        const losses = d.sumo_duel_losses
        const ws = d.current_sumo_winstreak
        const bws = d.best_sumo_winstreak

        const wText = utils.message.colorText(`W: ${wins}`, mcColors.GREEN)
        const lText = utils.message.colorText(`L: ${losses}`, mcColors.RED)
        const wsText = utils.message.colorText(`WS: ${ws}`, mcColors.LIGHT_PURPLE)
        const bwsText = utils.message.colorText(`BWS: ${bws}`, mcColors.DARK_PURPLE)
        return utils.message.colorText(`${this.getPlayerText(player)} - ${wText} - ${lText} - ${wsText} - ${bwsText}`, mcColors.WHITE)
    },


    getPlayerText(player: any) {
        if (player.monthlyPackageRank === "SUPERSTAR") {
            // @ts-ignore
            return utils.message.colorText(`[MVP${utils.message.colorTextCustomReset("++", mcColors[player.rankPlusColor], mcColors.GOLD)}] ${player.displayname}`, mcColors.GOLD)
        } else if (player.newPackageRank) {
            if (player.newPackageRank === "VIP" || player.newPackageRank === "VIP_PLUS") {
                return utils.message.colorText(`[VIP${player.newPackageRank === "VIP_PLUS" ? utils.message.colorTextCustomReset("+", mcColors.GOLD, mcColors.GREEN) : ""}] ${player.displayname}`, mcColors.GREEN)
            } else if (player.newPackageRank === "MVP" || player.newPackageRank === "MVP_PLUS") {
                // @ts-ignore
                return utils.message.colorText(`[MVP${player.newPackageRank === "MVP_PLUS" ? utils.message.colorTextCustomReset("+", mcColors[player.rankPlusColor], mcColors.AQUA) : ""}] ${player.displayname}`, mcColors.AQUA)
            }
        } else {
            return utils.message.colorText(player.displayname, mcColors.GRAY)
        }

    }
}