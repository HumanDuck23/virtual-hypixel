import {utils} from "../utils"
import {mcColors} from "./mcColors"

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

    "DUELS_BRIDGE_2V2V2V2" (player: any) {
        const d = player.stats.Duels

        const wins = d.bridge_2v2v2v2_wins ?? 0
        const losses = d.bridge_2v2v2v2_losses ?? 0
        const ws = d.current_winstreak_mode_bridge_2v2v2v2 ?? 0
        const bws = d.best_winstreak_mode_bridge_2v2v2v2 ?? 0

        return { wins, losses, ws, bws, t: this.genWLWSBWS(player, wins, losses, ws, bws) }
    },

    "DUELS_BRIDGE_3V3V3V3" (player: any) {
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

    // Bedwars Modes
    // Solo BW
    "BEDWARS_EIGHT_ONE" (player: any) {
        const b = player.stats.Bedwars

        const star = player.achievements.bedwars_level
        const wins = parseInt(b.eight_one_wins_bedwars ?? 0)
        const losses = parseInt(b.eight_one_losses_bedwars ?? 0)

        const kills = parseInt(b.eight_one_kills_bedwars ?? 0)
        const deaths = parseInt(b.eight_one_deaths_bedwars ?? 0)

        const fkills = parseInt(b.eight_one_final_kills_bedwars ?? 0)
        const fdeaths = parseInt(b.eight_one_final_deaths_bedwars ?? 0)

        const bbroken = parseInt(b.eight_one_beds_broken_bedwars ?? 0)
        const blost = parseInt(b.eight_one_beds_lost_bedwars ?? 0)

        const ws = parseInt(b.eight_one_winstreak ?? 0)

        const kd = deaths !== 0 ? kills / deaths : kills
        const fkd = fdeaths !== 0 ? fkills / fdeaths : fkills
        const bbl = blost !== 0 ? bbroken / blost : bbroken
        const wl = losses !== 0 ? wins / losses : wins

        return { wins, losses, ws, t: this.genSWSKDFKDWLBBL(player, star, ws, kd.toFixed(2), fkd.toFixed(2), wl.toFixed(2), bbl.toFixed(2)) }
    },

    // Doubles BW
    "BEDWARS_EIGHT_TWO" (player: any) {
        const b = player.stats.Bedwars

        const star = player.achievements.bedwars_level
        const wins = parseInt(b.eight_two_wins_bedwars ?? 0)
        const losses = parseInt(b.eight_two_losses_bedwars ?? 0)

        const kills = parseInt(b.eight_two_kills_bedwars ?? 0)
        const deaths = parseInt(b.eight_two_deaths_bedwars ?? 0)

        const fkills = parseInt(b.eight_two_final_kills_bedwars ?? 0)
        const fdeaths = parseInt(b.eight_two_final_deaths_bedwars ?? 0)

        const bbroken = parseInt(b.eight_two_beds_broken_bedwars ?? 0)
        const blost = parseInt(b.eight_two_beds_lost_bedwars ?? 0)

        const ws = parseInt(b.eight_two_winstreak ?? 0)

        const kd = deaths !== 0 ? kills / deaths : kills
        const fkd = fdeaths !== 0 ? fkills / fdeaths : fkills
        const bbl = blost !== 0 ? bbroken / blost : bbroken
        const wl = losses !== 0 ? wins / losses : wins

        return { wins, losses, ws, t: this.genSWSKDFKDWLBBL(player, star, ws, kd.toFixed(2), fkd.toFixed(2), wl.toFixed(2), bbl.toFixed(2)) }
    },

    // Threes BW
    "BEDWARS_FOUR_THREE" (player: any) {
        const b = player.stats.Bedwars

        const star = player.achievements.bedwars_level
        const wins = parseInt(b.four_three_wins_bedwars ?? 0)
        const losses = parseInt(b.four_three_losses_bedwars ?? 0)

        const kills = parseInt(b.four_three_kills_bedwars ?? 0)
        const deaths = parseInt(b.four_three_deaths_bedwars ?? 0)

        const fkills = parseInt(b.four_three_final_kills_bedwars ?? 0)
        const fdeaths = parseInt(b.four_three_final_deaths_bedwars ?? 0)

        const bbroken = parseInt(b.four_three_beds_broken_bedwars ?? 0)
        const blost = parseInt(b.four_three_beds_lost_bedwars ?? 0)

        const ws = parseInt(b.four_three_winstreak ?? 0)

        const kd = deaths !== 0 ? kills / deaths : kills
        const fkd = fdeaths !== 0 ? fkills / fdeaths : fkills
        const bbl = blost !== 0 ? bbroken / blost : bbroken
        const wl = losses !== 0 ? wins / losses : wins

        return { wins, losses, ws, t: this.genSWSKDFKDWLBBL(player, star, ws, kd.toFixed(2), fkd.toFixed(2), wl.toFixed(2), bbl.toFixed(2)) }
    },

    // Fours BW
    "BEDWARS_FOUR_FOUR" (player: any) {
        const b = player.stats.Bedwars

        const star = player.achievements.bedwars_level
        const wins = parseInt(b.four_four_wins_bedwars ?? 0)
        const losses = parseInt(b.four_four_losses_bedwars ?? 0)

        const kills = parseInt(b.four_four_kills_bedwars ?? 0)
        const deaths = parseInt(b.four_four_deaths_bedwars ?? 0)

        const fkills = parseInt(b.four_four_final_kills_bedwars ?? 0)
        const fdeaths = parseInt(b.four_four_final_deaths_bedwars ?? 0)

        const bbroken = parseInt(b.four_four_beds_broken_bedwars ?? 0)
        const blost = parseInt(b.four_four_beds_lost_bedwars ?? 0)

        const ws = parseInt(b.four_four_winstreak ?? 0)

        const kd = deaths !== 0 ? kills / deaths : kills
        const fkd = fdeaths !== 0 ? fkills / fdeaths : fkills
        const bbl = blost !== 0 ? bbroken / blost : bbroken
        const wl = losses !== 0 ? wins / losses : wins

        return { wins, losses, ws, t: this.genSWSKDFKDWLBBL(player, star, ws, kd.toFixed(2), fkd.toFixed(2), wl.toFixed(2), bbl.toFixed(2)) }
    },

    // 4v4 BW
    "BEDWARS_TWO_FOUR" (player: any) {
        const b = player.stats.Bedwars

        const star = player.achievements.bedwars_level
        const wins = parseInt(b.two_four_wins_bedwars ?? 0)
        const losses = parseInt(b.two_four_losses_bedwars ?? 0)

        const kills = parseInt(b.two_four_kills_bedwars ?? 0)
        const deaths = parseInt(b.two_four_deaths_bedwars ?? 0)

        const fkills = parseInt(b.two_four_final_kills_bedwars ?? 0)
        const fdeaths = parseInt(b.two_four_final_deaths_bedwars ?? 0)

        const bbroken = parseInt(b.two_four_beds_broken_bedwars ?? 0)
        const blost = parseInt(b.two_four_beds_lost_bedwars ?? 0)

        const ws = parseInt(b.two_four_winstreak ?? 0)

        const kd = deaths !== 0 ? kills / deaths : kills
        const fkd = fdeaths !== 0 ? fkills / fdeaths : fkills
        const bbl = blost !== 0 ? bbroken / blost : bbroken
        const wl = losses !== 0 ? wins / losses : wins

        return { wins, losses, ws, t: this.genSWSKDFKDWLBBL(player, star, ws, kd.toFixed(2), fkd.toFixed(2), wl.toFixed(2), bbl.toFixed(2)) }
    },

    getPlayerText(player: any) {
        if (player.monthlyPackageRank === "SUPERSTAR") {
            // @ts-ignore
            return utils.message.colorText(`[MVP${utils.message.colorTextCustomReset("++", mcColors[player.rankPlusColor ?? "RED"], mcColors.GOLD)}] ${player.displayname}`, mcColors.GOLD)
        } else if (player.newPackageRank) {
            if (player.newPackageRank === "VIP" || player.newPackageRank === "VIP_PLUS") {
                return utils.message.colorText(`[VIP${player.newPackageRank === "VIP_PLUS" ? utils.message.colorTextCustomReset("+", mcColors.GOLD, mcColors.GREEN) : ""}] ${player.displayname}`, mcColors.GREEN)
            } else if (player.newPackageRank === "MVP" || player.newPackageRank === "MVP_PLUS") {
                // @ts-ignore
                return utils.message.colorText(`[MVP${player.newPackageRank === "MVP_PLUS" ? utils.message.colorTextCustomReset("+", mcColors[player.rankPlusColor ?? "RED"], mcColors.AQUA) : ""}] ${player.displayname}`, mcColors.AQUA)
            }
        }
        return utils.message.colorText(player.displayname, mcColors.GRAY)
    },

    colorStar(star: number) {
        let color = mcColors.GRAY
        let colorList: mcColors[] = []
        if (star < 100) {
            color = mcColors.GRAY
        } else if (star < 200) {
            color = mcColors.WHITE
        } else if (star < 300) {
            color = mcColors.GOLD
        } else if (star < 400) {
            color = mcColors.AQUA
        } else if (star < 500) {
            color = mcColors.DARK_GREEN
        } else if (star < 600) {
            color = mcColors.DARK_AQUA
        } else if (star < 700) {
            color = mcColors.DARK_RED
        } else if (star < 800) {
            color = mcColors.LIGHT_PURPLE
        } else if (star < 900) {
            color = mcColors.BLUE
        } else if (star < 1000) {
            color = mcColors.DARK_PURPLE
        } else if (star < 1100) {
            colorList = [mcColors.RED, mcColors.GOLD, mcColors.YELLOW, mcColors.GREEN, mcColors.AQUA, mcColors.LIGHT_PURPLE, mcColors.DARK_PURPLE]
        } else if (star < 1200) {
            color = mcColors.WHITE
        } else if (star < 1300) {
            color = mcColors.YELLOW
        } else if (star < 1400) {
            color = mcColors.AQUA
        } else if (star < 1500) {
            color = mcColors.GREEN
        } else if (star < 1600) {
            color = mcColors.DARK_AQUA
        } else if (star < 1700) {
            color = mcColors.RED
        } else if (star < 1800) {
            color = mcColors.LIGHT_PURPLE
        } else if (star < 1900) {
            color = mcColors.BLUE
        } else if (star < 2000) {
            color = mcColors.DARK_PURPLE
        } else if (star < 2100) {
            colorList = [mcColors.DARK_GRAY, mcColors.GRAY, mcColors.WHITE, mcColors.WHITE, mcColors.GRAY, mcColors.GRAY, mcColors.DARK_GRAY]
        } else {
            colorList = [mcColors.RED, mcColors.GOLD, mcColors.YELLOW, mcColors.GREEN, mcColors.AQUA, mcColors.LIGHT_PURPLE, mcColors.DARK_PURPLE]
        }

        if (colorList !== []) {
            return utils.message.colorText(`[${star}✫]`, color)
        } else {
            let t = ""
            const starText = `[${star}✫]`
            for (const [i, char] of starText.split("").entries()) {
                if (colorList[i] !== undefined) {
                    t += utils.message.colorText(char, colorList[i])
                }
            }
            return t
        }
    },

    genSWSKDFKDWLBBL(player: any, star: any, ws: any, kd: any, fkd: any, wl: any, bbl: any) {
        const bar = utils.message.colorText("II", mcColors.DARK_PURPLE, true, false, false, false, true)
        const starText = this.colorStar(parseInt(star))
        const wsText = utils.message.colorText(`WS: ${ws}`, mcColors.GREEN)
        const kdText = utils.message.colorText(`K/D: ${kd}`, mcColors.YELLOW)
        const fkdText = utils.message.colorText(`FK/D: ${fkd}`, mcColors.GOLD)
        const wlText = utils.message.colorText(`W/L: ${wl}`, mcColors.RED)
        const bblText = utils.message.colorText(`BB/BL: ${bbl}`, mcColors.LIGHT_PURPLE)
        return utils.message.colorText(`${bar} ${this.getPlayerText(player)} - ${starText} - ${wsText} - ${kdText} - ${fkdText} - ${wlText} - ${bblText}`, mcColors.WHITE)

    },

    genWLWSBWS(player: any, w: any, l: any, ws: any, bws: any) {
        const bar = utils.message.colorText("II", mcColors.DARK_PURPLE, true, false, false, false, true)
        const wText = utils.message.colorText(`W: ${w}`, mcColors.GREEN)
        const lText = utils.message.colorText(`L: ${l}`, mcColors.RED)
        const wsText = utils.message.colorText(`WS: ${ws}`, mcColors.LIGHT_PURPLE)
        const bwsText = utils.message.colorText(`BWS: ${bws}`, mcColors.DARK_PURPLE)
        return utils.message.colorText(`${bar} ${this.getPlayerText(player)} - ${wText} - ${lText} - ${wsText} - ${bwsText}`, mcColors.WHITE)
    }
}