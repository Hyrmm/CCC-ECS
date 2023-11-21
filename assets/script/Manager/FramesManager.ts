import { Enum } from "cc"
import { FramesModel } from "../Models/FramesModel"
import { C2S_Frames, S2C_Frames } from "../Proto/pb"
import { ModelsManager } from "./ModelsManager"
import { EventManager } from "./EventManager"
import { NetManager } from "./NetManager"
import { protoName2Id } from "../Proto/protoMap"

export class FramesManager {

    static pendingFrames: Array<S2C_Frames>
    static pendingInputs: Array<any>
    static framseModel: FramesModel
    static asyncInterval: number
    static asyncTimer: number = 100

    static init() {
        this.framseModel = ModelsManager.getModel(FramesModel)
        this.asyncInterval = setInterval(this.async.bind(this), this.asyncTimer)
    }

    /**
    * 同步帧数
    */
    static async() {
        const frame = this.framseModel.pendingFrames.shift()
        const pendingFramesLen = this.framseModel.pendingFrames.length
        console.log(`当前执行帧:`, frame, "剩余等待帧数量:", pendingFramesLen)

        // 同步等待帧帧堆积
        if (pendingFramesLen > 0) {
            clearInterval(this.asyncInterval)
            this.asyncInterval = setInterval(this.syncFrams.bind(this), this.asyncTimer / 10)
        }
    }

    static syncFrams() {
        const frame = this.framseModel.pendingFrames.shift()
        const pendingFramesLen = this.framseModel.pendingFrames.length
        console.log(`当前追溯帧:`, frame, "剩余等待帧数量:", pendingFramesLen)

        // 同步完成修正状态
        if (pendingFramesLen <= 0) {
            clearInterval(this.asyncInterval)
            this.asyncInterval = setInterval(this.async.bind(this), this.asyncTimer)
        }
    }

    static applyInputs(type) {
        const data: C2S_Frames = { playerMove: {} }
        this.sendInputs(data)
    }

    static sendInputs(data: C2S_Frames) {
        NetManager.sendData(protoName2Id.C2S_Frames, data)
    }



}