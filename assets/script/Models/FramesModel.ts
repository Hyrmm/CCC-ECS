import { BaseModel } from "./BaseModel";
import { EnumProtoName, protoName2Id } from "../Proto/protoMap";
import { C2S_Frames, S2C_Frames } from "../Proto/pb";
import { NetManager } from "../Manager/NetManager";
import { T_PlayerMove } from "../Config/Interface";

export class FramesModel extends BaseModel {
    private playerId: number = 10086
    private dataBase: DateBase = { pendingFrames: [] }

    private parseFrame(recvData: S2C_Frames) {
        this.dataBase.pendingFrames.push(recvData)
    }



    public initListener(): void {
        this.regeisterListener(EnumProtoName.S2C_Frames, this.parseFrame, this)
    }

    public sendPlayerMoveInputs(sendData: T_PlayerMove) {
        const data: C2S_Frames = { playerMove: { playerId: this.playerId, dt: sendData.dt, velocityX: sendData.velocityX, velocityY: sendData.velocityY } }
        NetManager.sendData(protoName2Id.C2S_Frames, data)
    }




    public get pendingFrames(): Array<S2C_Frames> {
        return this.dataBase.pendingFrames
    }

}

interface DateBase {
    pendingFrames: Array<S2C_Frames>
}