import { BaseModel } from "./BaseModel";
import { EnumProtoId, EnumProtoName, protoName2Id } from "../Proto/protoMap";
import * as pb from "../Proto/pb";
import { T_PlayerMove } from "../Config/Interface";
import { ModelsManager } from "../Manager/ModelsManager";
import { UserInfoModel } from "./UserInfoModel";
import { EntityManager } from "../Manager/EntityManager";
import { entityConfig } from "../Entity/Entity";
import { EnumLocalMsg } from "../Config/Enum";
import { FramesManager } from "../Manager/FramesManager";

export class FramesModel extends BaseModel {
    private playerId: number = 10086
    protected dataBase: DateBase = { pendingFrames: [] }

    public initListener(): void {
        this.regeisterListener(EnumProtoName.S2C_Frames, this.parseFrame, this)
        this.regeisterListener(EnumProtoName.S2C_PlayerJoin, this.parsePalyerJoin, this)
        this.regeisterListener(EnumProtoName.S2C_SyncRoomStatus, this.parseSyncRoomStatus, this)


        this.regeisterListenerLocal(EnumLocalMsg.LoginSucess, this.handleLoginSucess, this)
    }



    public applyFrame(data: pb.C2S_Frames) {
        this.sendMsg(protoName2Id.C2S_Frames, data)
    }

    public applyPlayerJoin(data: pb.C2S_PlayerJoin) {
        this.sendMsg(EnumProtoId.C2S_PlayerJoin, data)
    }

    public applyPlayerMoveInputs(sendData: T_PlayerMove) {
        const data: pb.C2S_Frames = { playerMove: { playerId: this.playerId, dt: sendData.dt, velocityX: sendData.velocityX, velocityY: sendData.velocityY } }
        this.applyFrame(data)
    }

    public get pendingFrames(): Array<pb.S2C_Frames> {
        return this.dataBase.pendingFrames
    }

    private parseFrame(recvData: pb.S2C_Frames) {
        this.dataBase.pendingFrames.push(recvData)
    }

    private parsePalyerJoin(recvData: pb.S2C_PlayerJoin) {
        const userUuid = ModelsManager.getModel(UserInfoModel).userUuid

        if (recvData.uuid == userUuid) {
            // 自己本人
            const config = entityConfig.selfPlayerEntityConfig
            EntityManager.createEntity(config)
        } else {
            // 其他玩家
            const config = entityConfig.otherPlayerEntityConfig
            EntityManager.createEntity(config)
        }
    }

    private parseSyncRoomStatus(recvData: pb.S2C_SyncRoomStatus) {
        const userUuid = ModelsManager.getModel(UserInfoModel).userUuid
        for (const player of recvData.players) {
            if (player.uuid != userUuid) {
                // 其他玩家
                const config = entityConfig.otherPlayerEntityConfig
                EntityManager.createEntity(config)
            }
        }

        FramesManager.startSyncFrames()
    }

    private handleLoginSucess() {
        const userUuid = ModelsManager.getModel(UserInfoModel).userUuid
        this.applyPlayerJoin({ uuid: userUuid })
    }

}

interface DateBase {
    pendingFrames: Array<pb.S2C_Frames>
}