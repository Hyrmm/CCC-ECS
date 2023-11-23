import { InputsTypeEnum, OutputsTypeEnum } from "../Config/Enum"
import { I_InputsType, I_OutputsType } from "../Config/Interface"
import { FramesModel } from "../Models/FramesModel"
import { C2S_Frames, S2C_Frames } from "../Proto/pb"
import { MovementSystem } from "../System/MovementSystem"
import { RootSystem } from "../System/RootSystem"
import { ModelsManager } from "./ModelsManager"
import { SystemManager } from "./SystemManager"

export class FramesManager {

    static pendingFrames: Array<S2C_Frames>
    static pendingInputs: Array<any>

    static rootSystem: RootSystem
    static framesModel: FramesModel


    static asyncTimer: number = 100
    static framesScheduleId: Symbol

    static init() {
        this.rootSystem = SystemManager.getSystem(RootSystem)
        this.framesModel = ModelsManager.getModel(FramesModel)
        this.framesScheduleId = this.rootSystem.addFramesSchedule(this.syncFrames, this)
    }

    /**
    * 同步帧数
    */
    static syncFrames() {
        const frame = this.framesModel.pendingFrames.shift()
        const pendingFramesLen = this.framesModel.pendingFrames.length

        if (!frame) return

        // 同步等待帧帧堆积
        if (pendingFramesLen > 0) {
            this.rootSystem.delFramesSchedule(this.framesScheduleId)
            this.framesScheduleId = this.rootSystem.addFramesSchedule(this.keepFrames, this)
        }

        if (frame.playerMove) {
            this.parseOnputs(OutputsTypeEnum.PlayerMove, { playerMove: frame.playerMove })
        }
        console.log(`当前执行帧:`, frame, "剩余等待帧数量:", pendingFramesLen)
    }

    /**
    * 追朔帧数
    */
    static keepFrames() {
        const frame = this.framesModel.pendingFrames.shift()
        const pendingFramesLen = this.framesModel.pendingFrames.length
        console.log(`当前追溯帧:`, frame, "剩余等待帧数量:", pendingFramesLen)

        // 同步完成修正状态
        if (pendingFramesLen <= 0) {
            this.rootSystem.delFramesSchedule(this.framesScheduleId)
            this.framesScheduleId = this.rootSystem.addFramesSchedule(this.syncFrames, this)
        }
    }

    /**
    * 提交输入到服务器
    * @param inputsType 输入类型名称
    * @param inputs 对应类型数据
    */
    static applyInputs(inputsType: InputsTypeEnum, inputs: I_InputsType) {
        switch (inputsType) {
            // 移动
            case InputsTypeEnum.PlayerMove: {
                this.framesModel.sendPlayerMoveInputs(inputs.playerMove)
                break
            }

            default: {
                console.error("无效的输入提交,", inputsType, inputs)
            }
        }
    }

    /**
    * 解析来自服务输入
    * @param inputsType 输入类型名称
    * @param inputs 对应类型数据
    */
    static parseOnputs(inputsType: OutputsTypeEnum, inputs: I_OutputsType) {
        switch (inputsType) {
            // 移动
            case OutputsTypeEnum.PlayerMove: {
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