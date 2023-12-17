import * as pb from "../Proto/proto";
import { RootSystem } from "../ECS/System/RootSystem"
import { MovementSystem } from "../ECS/System/MovementSystem"
import { FramesModel } from "../Models/FramesModel"
import { ModelsManager } from "./ModelsManager"
import { SystemManager } from "./SystemManager"
import { Input } from "../Type"
import { UserInfoModel } from "../Models/UserInfoModel";
import { BaseEntity, entityConfig } from "../ECS/Entity/Entity";
import { EntityManager } from "./EntityManager";
import { PlayerComponent } from "../ECS/Component/PlayerComponent";

export class FramesManager {

    static pendingInputs: Array<any>
    static pendingFrames: Array<pb.S2C_Frames>

    static framesModel: FramesModel
    static asyncSchedule: Symbol

    static init() {
        this.framesModel = ModelsManager.getModel(FramesModel)
    }

    static startSyncFrames() {
        const rootSystem = SystemManager.getSystem(RootSystem)
        this.asyncSchedule = rootSystem.addFramesSchedule(this.syncFrames, this)
    }

    static stopSyncFrames() {
        const rootSystem = SystemManager.getSystem(RootSystem)
        rootSystem.delFramesSchedule(this.asyncSchedule)
        this.asyncSchedule = null
    }

    /**
    * 同步帧
    */
    static syncFrames() {
        const frame = this.framesModel.pendingFrames.shift()
        const pendingFramesLen = this.framesModel.pendingFrames.length

        if (!frame) return

        // 同步等待帧帧堆积
        if (pendingFramesLen > 0) {
            const rootSystem = SystemManager.getSystem(RootSystem)
            rootSystem.delFramesSchedule(this.asyncSchedule)
            this.asyncSchedule = rootSystem.addFramesSchedule(this.keepFrames, this)
        }

        this.preParseInputs(frame)
    }

    /**
    * 一次性同步历史帧(来自首次加入房间)
    * @param historyFrames 历史帧数据
    */
    static syncHistoryFrames(historyFrames: Array<pb.S2C_Frames>) {
        for (const frame of historyFrames) {
            this.preParseInputs(frame)
        }
    }

    /**
    * 追朔帧(处于后台、网络波动、游戏暂停所产生的堆积帧)
    */
    static keepFrames() {
        const frame = this.framesModel.pendingFrames.shift()
        const pendingFramesLen = this.framesModel.pendingFrames.length
        console.log(`当前追溯帧:`, frame, "剩余等待帧数量:", pendingFramesLen)

        // 同步完成修正状态
        if (pendingFramesLen <= 0) {
            const rootSystem = SystemManager.getSystem(RootSystem)
            rootSystem.delFramesSchedule(this.asyncSchedule)
            this.asyncSchedule = rootSystem.addFramesSchedule(this.syncFrames, this)
        }

        this.preParseInputs(frame)
    }

    /**
    * 提交输入到服务端
    * @param inputsType 输入类型名称
    * @param inputs 对应类型数据
    */
    static applyInputs(inputsType: Input.EnumInputTypeName, inputs: Input.TypeInputLocal) {
        switch (inputsType) {
            // 移动
            case Input.EnumInputTypeName.PlayerMove: {
                this.framesModel.applyPlayerMoveInputs(inputs.playerMove)
                break
            }

            default: {
                console.error("无效的输入提交,", inputsType, inputs)
            }
        }
    }

    /**
    * 预解析来自服务端的输入
    * @param frame 帧消息
    */
    static preParseInputs(frame: pb.S2C_Frames) {

        if (frame.playerMove) {
            this.parseInputs(Input.EnumInputTypeName.PlayerMove, { playerMove: frame.playerMove })
        }

        if (frame.playerJoin) {
            this.parseInputs(Input.EnumInputTypeName.PlayerJoin, { playerJoin: frame.playerJoin })
        }

        if (frame.playerLeave) {
            this.parseInputs(Input.EnumInputTypeName.PlayerLeave, { playerLeave: frame.playerLeave })
        }
    }

    /**
    * 解析来自服务端输入
    * @param inputsType 输入类型名称
    * @param inputs 对应类型数据
    */
    static parseInputs(inputsType: Input.EnumInputTypeName, inputs: Input.TypeInputServe) {
        switch (inputsType) {
            // 移动
            case Input.EnumInputTypeName.PlayerMove: {
                const movementSystem = SystemManager.getSystem(MovementSystem)
                movementSystem.updatePlayerShadowPositon(inputs.playerMove)
                break
            }
            // 加入
            case Input.EnumInputTypeName.PlayerJoin: {
                const userUuid = ModelsManager.getModel(UserInfoModel).userUuid
                for (const info of inputs.playerJoin) {
                    let playerEntity: BaseEntity
                    if (info.player.uuid == userUuid) {
                        // 自己本人
                        const config = entityConfig.selfPlayerEntityConfig
                        playerEntity = EntityManager.createEntity(config)
                    } else {
                        // 其他玩家
                        const config = entityConfig.otherPlayerEntityConfig
                        playerEntity = EntityManager.createEntity(config)
                    }
                    playerEntity.getCom(PlayerComponent).playerId = info.player.uuid
                }
                break
            }
            //离开
            case Input.EnumInputTypeName.PlayerLeave: {
                for (const info of inputs.playerLeave) {
                    EntityManager.delEntityByUserUuid(info.player.uuid)
                }
                break
            }

            default: {
                console.error("无效的输入提交,", inputsType, inputs)
            }
        }
    }


    static filterDirtyFrame(frames: Array<pb.S2C_Frames>) {

    }


}