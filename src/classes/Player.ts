// Class to contain players

import axios from "axios"

export class Player {

    name?: string
    uuid: string

    constructor(uuid: string) {
        this.uuid = uuid
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

}