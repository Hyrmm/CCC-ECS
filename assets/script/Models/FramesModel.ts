import { BaseModel } from "./BaseModel";
import { EnumProtoName, protoName2Id } from "../Proto/protoMap";
import { C2S_Frames, S2C_Frames } from "../Proto/pb";
import { NetManager } from "../Manager/NetManager";

export class FramesModel extends BaseModel {

    private dataBase: DateBase = { pendingFrames: [] }

    private parseFrame(recvData: S2C_Frames) {
        this.dataBase.pendingFrames.push(recvData)
    }


    
    public initListener(): void {
        this.regeisterListener(EnumProtoName.S2C_Frames, this.parseFrame, this)
    }
    public sendInputs(sendData: C2S_Frames) {
        NetManager.sendData(protoName2Id.C2S_Frames, sendData)
    }

    public get pendingFrames(): Array<S2C_Frames> {
        return this.dataBase.pendingFrames
    }



}

interface DateBase {
    pendingFrames: Array<S2C_Frames>
}