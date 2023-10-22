import { BaseModel } from "./BaseModel";
import { EnumProtoName } from "../Proto/protoMap";

export class FramesModel extends BaseModel {
    public initListener() {
        this.regeisterListener(EnumProtoName.S2C_Frames, this.parseFrames, this)
    }

    private parseFrames() {

    }

}