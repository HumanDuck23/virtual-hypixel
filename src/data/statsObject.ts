import {utils} from "../utils"
import {mcColors} from "./mcColors";

export const statsObject = {
    "DUELS_SUMO_DUEL" (player: any) {
        const d = player.stats.Duels

        const wins = d.sumo_duel_wins
        const losses = d.sumo_duel_losses
        const ws = d.current_sumo_winstreak
        const bws = d.best_sumo_winstreak

        return this.genWLWSBWS(player, wins, losses, ws, bws)
    },

    "DUELS_BRIDGE_DUEL" (player: any) {
        const d = player.stats.Duels

        const wins = d.bridge_duel_wins
        const losses = d.bridge_duel_losses
        const ws = d.current_bridge_winstreak
        const bws = d.best_bridge_winstreak

        return this.genWLWSBWS(player, wins, losses, ws, bws)
    },

    "DUELS_BRIDGE_DOUBLES" (player: any) {
        const d = player.stats.Duels

        const wins = d.bridge_doubles_wins
        const losses = d.bridge_doubles_losses
        const ws = d.current_winstreak_mode_bridge_doubles
        const bws = d.best_winstreak_mode_bridge_doubles

        return this.genWLWSBWS(player, wins, losses, ws, bws)
    },

    "DUELS_BRIDGE_THREES" (player: any) {
        const d = player.stats.Duels

        const wins = d.bridge_threes_wins
        const losses = d.bridge_threes_losses
        const ws = d.current_bridge_winstreak
        const bws = d.best_winstreak_mode_bridge_threes

        return this.genWLWSBWS(player, wins, losses, ws, bws)
    },

    "DUELS_BRIDGE_FOUR" (player: any) {
        const d = player.stats.Duels

        const wins = d.bridge_four_wins
        const losses = d.bridge_four_losses
        const ws = d.current_winstreak_mode_bridge_four
        const bws = d.best_winstreak_mode_bridge_four

        return this.genWLWSBWS(player, wins, losses, ws, bws)
    },

    "DUELS_BRIDGE_2v2v2v2" (player: any) {
        const d = player.stats.Duels

        const wins = d.bridge_2v2v2v2_wins
        const losses = d.bridge_2v2v2v2_losses
        const ws = d.current_winstreak_mode_bridge_2v2v2v2
        const bws = d.best_winstreak_mode_bridge_2v2v2v2

        return this.genWLWSBWS(player, wins, losses, ws, bws)
    },

    "DUELS_BRIDGE_3v3v3v3" (player: any) {
        const d = player.stats.Duels

        const wins = d.bridge_3v3v3v3_wins
        const losses = d.bridge_3v3v3v3_losses
        const ws = d.current_winstreak_mode_bridge_3v3v3v3
        const bws = d.best_winstreak_mode_bridge_3v3v3v3

        return this.genWLWSBWS(player, wins, losses, ws, bws)
    },

    "DUELS_CAPTURE_THREES" (player: any) {
        const d = player.stats.Duels

        const wins = d.capture_threes_wins
        const losses = d.capture_threes_losses
        const ws = d.best_winstreak_mode_capture_threes
        const bws = d.best_winstreak_mode_capture_threes

        return this.genWLWSBWS(player, wins, losses, ws, bws)
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
        }
        return utils.message.colorText(player.displayname, mcColors.GRAY)
    },

    genWLWSBWS(player: any, w: any, l: any, ws: any, bws: any) {
        const wText = utils.message.colorText(`W: ${w}`, mcColors.GREEN)
        const lText = utils.message.colorText(`L: ${l}`, mcColors.RED)
        const wsText = utils.message.colorText(`WS: ${ws}`, mcColors.LIGHT_PURPLE)
        const bwsText = utils.message.colorText(`BWS: ${bws}`, mcColors.DARK_PURPLE)
        return utils.message.colorText(`${this.getPlayerText(player)} - ${wText} - ${lText} - ${wsText} - ${bwsText}`, mcColors.WHITE)
    }
}