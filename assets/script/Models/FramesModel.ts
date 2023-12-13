import * as pb from "../Proto/proto";
import { BaseModel } from "./BaseModel";
import { EnumProtoId, EnumProtoName, protoName2Id } from "../Proto/protoMap";
import { ModelsManager } from "../Manager/ModelsManager";
import { UserInfoModel } from "./UserInfoModel";
import { EntityManager } from "../Manager/EntityManager";
import { entityConfig } from "../ECS/Entity/Entity";
import { LocalMsg, Input } from "../Type";
import { FramesManager } from "../Manager/FramesManager";


export class FramesModel extends BaseModel {
    private playerId: number = 10086
    private historyPendingFrames: Array<pb.S2C_Frames> = []

    protected dataBase: DateBase = { pendingFrames: [] }

    public resetDatabase(): void {
        this.dataBase = { pendingFrames: [] }
    }

    public initListener(): void {
        this.regeisterListener(EnumProtoName.S2C_Frames, this.parseFrame, this)
        this.regeisterListener(EnumProtoName.S2C_SyncRoomStatus, this.parseSyncRoomStatus, this)

        this.regeisterListenerLocal(LocalMsg.EnumLocalMsg.SocketDisconnect, this.onSocketDisconnect, this)
    }

    public applyFrame(data: pb.C2S_Frames) {
        this.sendMsg(protoName2Id.C2S_Frames, data)
    }


    public applyPlayerMoveInputs(sendData: Input.TypePlayerMove) {
        const playerId = ModelsManager.getModel(UserInfoModel).userUuid
        const data: pb.C2S_Frames = { playerMove: { playerId: playerId, dt: sendData.dt, velocityX: sendData.velocityX, velocityY: sendData.velocityY } }
        this.applyFrame(data)
    }

    private parseFrame(recvData: pb.S2C_Frames) {
        this.dataBase.pendingFrames.push(recvData)
    }

    private parseSyncRoomStatus(recvData: pb.S2C_SyncRoomStatus) {
        // 不停的接受房间历史的帧消息，直至所有帧全部拉完后，开始同步历史帧消息,且再同步正常的帧消息
        if (recvData.frames && recvData.frames.length) {
            this.historyPendingFrames = this.historyPendingFrames.concat(recvData.frames)
        }

        if (recvData.isSyncFinish == 1) {
            FramesManager.syncHistoryFrames(this.historyPendingFrames)

            // 服务器采用多轮事件循环分片的方式同步给客户端历史帧消息，以及一旦客户端加入房间后，服务器已经开始同步给客户端当前房间进行帧
            // 所以在同步完历史帧消息后，要去清理当前堆积帧中的脏数据，采用历史帧的最后一帧数和堆积帧进行比对
            const lastHistoryFrame = this.historyPendingFrames.length ? this.historyPendingFrames[this.historyPendingFrames.length - 1] : { frames: -1 }
            for (const [index, willSyncFrame] of this.dataBase.pendingFrames.entries()) {
                if (willSyncFrame.frames > lastHistoryFrame.frames) {
                    this.dataBase.pendingFrames = this.dataBase.pendingFrames.slice(index)
                    this.historyPendingFrames = []
                    FramesManager.startSyncFrames()
                    return
                }
            }

            this.historyPendingFrames = []
            FramesManager.startSyncFrames()
            this.dataBase.pendingFrames = []

        }


    }

    private onSocketDisconnect() {
        // 停止同步帧、清理实体信息
        FramesManager.stopSyncFrames()
        EntityManager.delEntityByEntityConfig(entityConfig.selfPlayerEntityConfig)
        EntityManager.delEntityByEntityConfig(entityConfig.otherPlayerEntityConfig)
        this.resetDatabase()
    }

    public get pendingFrames(): Array<pb.S2C_Frames> {
        return this.dataBase.pendingFrames
    }
}

interface DateBase {
    pendingFrames: Array<pb.S2C_Frames>
}