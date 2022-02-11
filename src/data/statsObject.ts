import {utils} from "../utils"
import {mcColors} from "./mcColors";

export const statsObject = {
    "DUELS_SUMO_DUEL": (player: any) => {
        const d = player.stats.Duels

        const wins = d.sumo_duel_wins
        const losses = d.sumo_duel_losses
        const ws = d.current_sumo_winstreak
        const bws = d.best_sumo_winstreak

        const wText = utils.message.colorText(`W: ${wins}`, mcColors.GREEN)
        const lText = utils.message.colorText(`L: ${losses}`, mcColors.RED)
        const wsText = utils.message.colorText(`WS: ${ws}`, mcColors.LIGHT_PURPLE)
        const bwsText = utils.message.colorText(`BWS: ${bws}`, mcColors.DARK_PURPLE)
        return utils.message.colorText(`${wText} - ${lText} - ${wsText} - ${bwsText}`, mcColors.WHITE)
    }
}