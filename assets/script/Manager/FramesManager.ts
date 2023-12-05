import { FramesModel } from "../Models/FramesModel"
import { S2C_Frames } from "../Proto/pb"
import { MovementSystem } from "../System/MovementSystem"
import { RootSystem } from "../System/RootSystem"
import { ModelsManager } from "./ModelsManager"
import { SystemManager } from "./SystemManager"
import { Input } from "../Type"

export class FramesManager {

    static pendingInputs: Array<any>
    static pendingFrames: Array<S2C_Frames>

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
    * 追朔帧
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
    * 提交输入到服务器
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
    * 預解析来自服务输入
    * @param frame 幀消息
    */
    static preParseInputs(frame: S2C_Frames) {
        if (frame.playerMove) {
            this.parseInputs(Input.EnumInputTypeName.PlayerMove, { playerMove: frame.playerMove })
        }
    }

    /**
    * 解析来自服务输入
    * @param inputsType 输入类型名称
    * @param inputs 对应类型数据
    */
    static parseInputs(inputsType: Input.EnumInputTypeName, inputs: Input.TypeInputServe) {
        switch (inputsType) {
            // 移动
            case Input.EnumInputTypeName.PlayerMove: {
                const movementSystem = SystemManager.getSystem(MovementSystem)
                movementSystem.updatePlayerPositon(inputs.playerMove)
                break
            }

            default: {
                console.error("无效的输入提交,", inputsType, inputs)
            }
        }
    }



}