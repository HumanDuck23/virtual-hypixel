/*
simple class for logging events etc.
 */

import color from "colorts"

export class Logger {

    info(text: string) {
        console.log(color(`[${new Date().toISOString()}] [info] ${color(text).white}`).cyan.bold.toString())
    }

    warn(text: string) {
        console.log(color(`[${new Date().toISOString()}] [warn] ${color(text).white}`).yellow.bold.toString())
    }

    error(text: string) {
        console.log(color(`[${new Date().toISOString()}] [error] ${color(text).white}`).red.bold.toString())
    }

}