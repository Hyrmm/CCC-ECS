import { BaseModel } from "./BaseModel";
import { EnumProtoName } from "../Proto/protoMap";
import { S2C_Frames } from "../Proto/pb";

export class FramesModel extends BaseModel {
    private dataBase: DateBase = { pendingFrames: [] }

    private parseFrame(data: S2C_Frames) {
        this.dataBase.pendingFrames.push(data)
    }


    public initListener(): void {
        this.regeisterListener(EnumProtoName.S2C_Frames, this.parseFrame, this)
    }

    public get pendingFrames(): Array<S2C_Frames> {
        return this.dataBase.pendingFrames
    }



}

interface DateBase {
    pendingFrames: Array<S2C_Frames>
}