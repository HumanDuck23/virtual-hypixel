// Class to contain players

import axios from "axios"
import * as Process from "process";

export class Player {

    name?: string
    currentMode?: string
    online?: boolean
    playerObj?: any
    uuid: string
    entityID: number


    constructor(uuid: string, entityID: number) {
        this.uuid = uuid
        this.entityID = entityID
    }

    exists() {
        return new Promise<boolean>(async (resolve, reject) => {
            try {
                this.loadName()
                    .then(() => {
                        resolve(true)
                    })
                    .catch(() => {
                        resolve(false)
                    })
            } catch (e) {
                reject(e)
            }
        })
    }

    loadName() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(`https://api.mojang.com/user/profiles/${this.uuid}/names`)
                if (res.data.error) {
                    reject(-1)
                } else {
                    this.name = res.data[res.data.length - 1].name
                    resolve(true)
                }
            } catch (e) {
                reject(e)
            }
        })
    }

    loadMode(apiKey: string) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(`https://api.hypixel.net/status?uuid=${this.uuid}&key=${apiKey}`)
                if (res.data.success) {
                    if (res.data.session.online) {
                        this.online = true
                        this.currentMode = res.data.session.mode
                    } else {
                        this.online = false
                    }
                    resolve(this.online)
                } else {
                    reject(`Error with hypixel api: ${res.status}`)
                }
            } catch (e) {
                reject(e)
            }
        })
    }

    loadStats(apiKey: string) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(`https://api.hypixel.net/player?uuid=${this.uuid}&key=${apiKey}`)
                if (res.data.success) {
                    this.playerObj = res.data.player
                    resolve(true)
                } else {
                    reject(`Error with hypixel api: ${res.status}`)
                }
            } catch (e) {
                reject(e)
            }
        })
    }

}