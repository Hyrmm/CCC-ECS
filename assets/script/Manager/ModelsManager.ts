import { BaseModel } from "../Models/BaseModel"
import { FramesModel } from "../Models/FramesModel"
import { UserInfoModel } from "../Models/UserInfoModel"
export class ModelsManager {
    static modelsMap: Map<string, BaseModel> = new Map()

    static init() {
        // 注册
        this.registerModels()

        // 注册事件监听
        this.registerModelsListener()
    }

    static registerModels(): void {
        this.modelsMap.set(FramesModel.name, new FramesModel)
        this.modelsMap.set(UserInfoModel.name, new UserInfoModel)

    }

    static registerModelsListener(): void {
        for (const model of this.modelsMap.values()) {
            model.initListener()
        }
    }

    /**
    * 获取model实例
    * @param modelCls model类
    */
    static getModel<T extends BaseModel>(modelCls: ctor<T>): T {
        return this.modelsMap.get(modelCls.name) as T
    }

    /**
    * 获取所有model实例
    * @param modelCls model类
    */
    static getModels(): Array<BaseModel> {
        return [...this.modelsMap.values()]
    }
}

type ctor<T = unknown> = new (...args: any[]) => T
