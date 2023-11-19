import { Enum } from "cc"
import { FramesModel } from "../Models/FramesModel"
import { S2C_Frames } from "../Proto/pb"
import { ModelsManager } from "./ModelsManager"
import { EventManager } from "./EventManager"

export class FramesManager {

    static pendingFrames: Array<S2C_Frames>
    static pendingInputs: Array<any>
    static framseModel: FramesModel
    static asyncInterval: number
    static asyncTimer: number = 100

    static init() {
        this.framseModel = ModelsManager.getModel(FramesModel)
        this.asyncInterval = setTimeout(this.async.bind(this), this.asyncTimer)
    }

    /**
    * 同步帧数
    */
    static async() {
        // 同步等待帧帧堆积
        const pendingFramesLen = this.framseModel.pendingFrames.length
        if (pendingFramesLen > 1) {
            const curSyncTimer = 1000 / (pendingFramesLen / 3)
            this.asyncTimer = curSyncTimer > 100 ? 100 : curSyncTimer
            this.asyncInterval = setInterval(this.syncFrams.bind(this), this.asyncTimer)
            return
        }

        const frame = this.framseModel.pendingFrames.shift()
        this.asyncTimer = 100
        this.asyncInterval = setTimeout(this.async.bind(this), this.asyncTimer)
        console.log(`当前执行帧:`, frame, "剩余等待帧数量:", pendingFramesLen)
    }

    static syncFrams() {
        const pendingFramesLen = this.framseModel.pendingFrames.length
        const frame = this.framseModel.pendingFrames.shift()
        console.log(`当前追溯帧:`, frame, "剩余等待帧数量:", pendingFramesLen)

        if (pendingFramesLen < 1) {
            clearInterval(this.asyncInterval)
            this.async()
        }
    }

    static applyInputs() {

    }



}