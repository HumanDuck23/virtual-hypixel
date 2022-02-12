import {utils} from "../utils"
import {mcColors} from "./mcColors";

export const statsObject = {
    "DUELS_SUMO_DUEL" (player: any) {
        const d = player.stats.Duels

        const wins = d.sumo_duel_wins ?? 0
        const losses = d.sumo_duel_losses ?? 0
        const ws = d.current_sumo_winstreak ?? 0
        const bws = d.best_sumo_winstreak ?? 0

        return { wins, losses, ws, bws, t: this.genWLWSBWS(player, wins, losses, ws, bws) }
    },

    // Bridge Modes
    "DUELS_BRIDGE_DUEL" (player: any) {
        const d = player.stats.Duels

        const wins = d.bridge_duel_wins ?? 0
        const losses = d.bridge_duel_losses ?? 0
        const ws = d.current_bridge_winstreak ?? 0
        const bws = d.best_bridge_winstreak ?? 0

        return { wins, losses, ws, bws, t: this.genWLWSBWS(player, wins, losses, ws, bws) }
    },

    "DUELS_BRIDGE_DOUBLES" (player: any) {
        const d = player.stats.Duels

        const wins = d.bridge_doubles_wins ?? 0
        const losses = d.bridge_doubles_losses ?? 0
        const ws = d.current_winstreak_mode_bridge_doubles ?? 0
        const bws = d.best_winstreak_mode_bridge_doubles ?? 0

        return { wins, losses, ws, bws, t: this.genWLWSBWS(player, wins, losses, ws, bws) }
    },

    "DUELS_BRIDGE_THREES" (player: any) {
        const d = player.stats.Duels

        const wins = d.bridge_threes_wins ?? 0
        const losses = d.bridge_threes_losses ?? 0
        const ws = d.current_bridge_winstreak ?? 0
        const bws = d.best_winstreak_mode_bridge_threes ?? 0

        return { wins, losses, ws, bws, t: this.genWLWSBWS(player, wins, losses, ws, bws) }
    },

    "DUELS_BRIDGE_FOUR" (player: any) {
        const d = player.stats.Duels

        const wins = d.bridge_four_wins ?? 0
        const losses = d.bridge_four_losses ?? 0
        const ws = d.current_winstreak_mode_bridge_four ?? 0
        const bws = d.best_winstreak_mode_bridge_four ?? 0

        return { wins, losses, ws, bws, t: this.genWLWSBWS(player, wins, losses, ws, bws) }
    },

    "DUELS_BRIDGE_2v2v2v2" (player: any) {
        const d = player.stats.Duels

        const wins = d.bridge_2v2v2v2_wins ?? 0
        const losses = d.bridge_2v2v2v2_losses ?? 0
        const ws = d.current_winstreak_mode_bridge_2v2v2v2 ?? 0
        const bws = d.best_winstreak_mode_bridge_2v2v2v2 ?? 0

        return { wins, losses, ws, bws, t: this.genWLWSBWS(player, wins, losses, ws, bws) }
    },

    "DUELS_BRIDGE_3v3v3v3" (player: any) {
        const d = player.stats.Duels

        const wins = d.bridge_3v3v3v3_wins ?? 0
        const losses = d.bridge_3v3v3v3_losses ?? 0
        const ws = d.current_winstreak_mode_bridge_3v3v3v3 ?? 0
        const bws = d.best_winstreak_mode_bridge_3v3v3v3 ?? 0

        return { wins, losses, ws, bws, t: this.genWLWSBWS(player, wins, losses, ws, bws) }
    },

    "DUELS_CAPTURE_THREES" (player: any) {
        const d = player.stats.Duels

        const wins = d.capture_threes_wins ?? 0
        const losses = d.capture_threes_losses ?? 0
        const ws = d.best_winstreak_mode_capture_threes ?? 0
        const bws = d.best_winstreak_mode_capture_threes ?? 0

        return { wins, losses, ws, bws, t: this.genWLWSBWS(player, wins, losses, ws, bws) }
    },

    // UHC Modes
    "DUELS_UHC_DUEL" (player: any) {
        const d = player.stats.Duels

        const wins = d.uhc_duel_wins ?? 0
        const losses = d.uhc_duel_losses ?? 0
        const ws = d.current_winstreak_mode_uhc_duel ?? 0
        const bws = d.best_winstreak_mode_uhc_duel ?? 0

        return { wins, losses, ws, bws, t: this.genWLWSBWS(player, wins, losses, ws, bws) }
    },

    "DUELS_UHC_DOUBLES" (player: any) {
        const d = player.stats.Duels

        const wins = d.uhc_duel_wins ?? 0
        const losses = d.uhc_doubles_losses ?? 0
        const ws = d.current_winstreak_mode_uhc_doubles ?? 0
        const bws = d.best_winstreak_mode_uhc_doubles ?? 0

        return { wins, losses, ws, bws, t: this.genWLWSBWS(player, wins, losses, ws, bws) }
    },

    "DUELS_UHC_FOUR" (player: any) {
        const d = player.stats.Duels

        const wins = d.uhc_four_wins ?? 0
        const losses = d.uhc_four_losses ?? 0
        const ws = d.current_winstreak_mode_uhc_four ?? 0
        const bws = d.best_winstreak_mode_uhc_four ?? 0

        return { wins, losses, ws, bws, t: this.genWLWSBWS(player, wins, losses, ws, bws) }
    },

    "DUELS_UHC_MEETUP" (player: any) {
        const d = player.stats.Duels

        const wins = d.uhc_meetup_wins ?? 0
        const losses = d.uhc_meetup_losses ?? 0
        const ws = d.current_winstreak_mode_uhc_meetup ?? 0
        const bws = d.best_winstreak_mode_uhc_meetup ?? 0

        return { wins, losses, ws, bws, t: this.genWLWSBWS(player, wins, losses, ws, bws) }
    },

    // OP Mode
    "DUELS_OP_DUEL" (player: any) {
        const d = player.stats.Duels

        const wins = d.op_duel_wins ?? 0
        const losses = d.op_duel_losses ?? 0
        const ws = d.current_winstreak_mode_op_duel ?? 0
        const bws = d.best_winstreak_mode_op_duel ?? 0

        return { wins, losses, ws, bws, t: this.genWLWSBWS(player, wins, losses, ws, bws) }
    },

    // Skywars Modes
    "DUELS_SW_DUEL" (player: any) {
        const d = player.stats.Duels

        const wins = d.sw_duel_wins ?? 0
        const losses = d.sw_duel_losses ?? 0
        const ws = d.current_winstreak_mode_sw_duel ?? 0
        const bws = d.best_winstreak_mode_sw_duel ?? 0

        return { wins, losses, ws, bws, t: this.genWLWSBWS(player, wins, losses, ws, bws) }
    },

    "DUELS_SW_DOUBLES" (player: any) {
        const d = player.stats.Duels

        const wins = d.sw_doubles_wins ?? 0
        const losses = d.sw_doubles_losses ?? 0
        const ws = d.current_winstreak_mode_sw_double ?? 0
        const bws = d.best_winstreak_mode_sw_doubles ?? 0

        return { wins, losses, ws, bws, t: this.genWLWSBWS(player, wins, losses, ws, bws) }
    },

    // Classic Mode
    "DUELS_CLASSIC_DUEL" (player: any) {
        const d = player.stats.Duels

        const wins = d.classic_duel_wins ?? 0
        const losses = d.classic_duel_losses ?? 0
        const ws = d.current_winstreak_mode_classic_duel ?? 0
        const bws = d.best_winstreak_mode_classic_duel ?? 0

        return { wins, losses, ws, bws, t: this.genWLWSBWS(player, wins, losses, ws, bws) }
    },

    // Bow Mode
    "DUELS_BOW_DUEL" (player: any) {
        const d = player.stats.Duels

        const wins = d.bow_duel_wins ?? 0
        const losses = d.bow_duel_losses ?? 0
        const ws = d.current_winstreak_mode_bow_duel ?? 0
        const bws = d.best_winstreak_mode_bow_duel ?? 0

        return { wins, losses, ws, bws, t: this.genWLWSBWS(player, wins, losses, ws, bws) }
    },

    // Blitz Mode
    "DUELS_BLITZ_DUEL" (player: any) {
        const d = player.stats.Duels

        const wins = d.blitz_duel_wins ?? 0
        const losses = d.blitz_duel_losses ?? 0
        const ws = d.current_winstreak_mode_blitz_duel ?? 0
        const bws = d.best_winstreak_mode_blitz_duel ?? 0

        return { wins, losses, ws, bws, t: this.genWLWSBWS(player, wins, losses, ws, bws) }
    },

    // Bow Spleef Mode
    "DUELS_BOWSPLEEF_DUEL" (player: any) {
        const d = player.stats.Duels

        const wins = d.bowspleef_duel_wins ?? 0
        const losses = d.bowspleef_duel_losses ?? 0
        const ws = d.current_winstreak_mode_bowspleef_duel ?? 0
        const bws = d.best_winstreak_mode_bowspleef_duel ?? 0

        return { wins, losses, ws, bws, t: this.genWLWSBWS(player, wins, losses, ws, bws) }
    },

    // Parkour Mode
    "DUELS_PARKOUR_EIGHT" (player: any) {
        const d = player.stats.Duels

        const wins = d.parkour_eight_wins ?? 0
        const losses = d.parkour_eight_losses ?? 0
        const ws = d.current_winstreak_mode_parkour_eight ?? 0
        const bws = d.best_winstreak_mode_parkour_eight ?? 0

        return { wins, losses, ws, bws, t: this.genWLWSBWS(player, wins, losses, ws, bws) }
    },

    // Boxing Mode
    "DUELS_BOXING_DUEL" (player: any) {
        const d = player.stats.Duels

        const wins = d.boxing_duel_wins ?? 0
        const losses = d.boxing_duel_losses ?? 0
        const ws = d.current_winstreak_mode_boxing_duel ?? 0
        const bws = d.best_winstreak_mode_boxing_duel ?? 0

        return { wins, losses, ws, bws, t: this.genWLWSBWS(player, wins, losses, ws, bws) }
    },

    // Nodebuff Mode
    "DUELS_NODEBUFF_DUEL" (player: any) {
        const d = player.stats.Duels

        const wins = d.potion_duel_wins ?? 0
        const losses = d.potion_duel_losses ?? 0
        const ws = d.current_winstreak_mode_potion_duel ?? 0
        const bws = d.best_winstreak_mode_potion_duel ?? 0

        return { wins, losses, ws, bws, t: this.genWLWSBWS(player, wins, losses, ws, bws) }
    },

    // Megawalls Modes
    "DUELS_MW_DUEL" (player: any) {
        const d = player.stats.Duels

        const wins = d.mw_duel_wins ?? 0
        const losses = d.mw_duel_losses ?? 0
        const ws = d.current_winstreak_mode_mw_duel ?? 0
        const bws = d.best_winstreak_mode_mw_duel ?? 0

        return { wins, losses, ws, bws, t: this.genWLWSBWS(player, wins, losses, ws, bws) }
    },

    "DUELS_MW_DOUBLES" (player: any) {
        const d = player.stats.Duels

        const wins = d.mw_doubles_wins ?? 0
        const losses = d.mw_doubles_losses ?? 0
        const ws = d.current_winstreak_mode_mw_double ?? 0
        const bws = d.best_winstreak_mode_mw_doubles ?? 0

        return { wins, losses, ws, bws, t: this.genWLWSBWS(player, wins, losses, ws, bws) }
    },

    // Combo Mode
    "DUELS_COMBO_DUEL" (player: any) {
        const d = player.stats.Duels

        const wins = d.combo_duel_wins ?? 0
        const losses = d.combo_duel_losses ?? 0
        const ws = d.current_winstreak_mode_combo_duel ?? 0
        const bws = d.best_winstreak_mode_combo_duel ?? 0

        return { wins, losses, ws, bws, t: this.genWLWSBWS(player, wins, losses, ws, bws) }
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