import { S2C_Frames } from "../Proto/pb"

export class FramesManager {

    static pendingFrames: Array<S2C_Frames>
    static pendingInputs: Array<any>

    static init() {
        setInterval(this.async.bind(this), 100)
    }

    static async() {

    }


    static applyInputs() {

    }

}