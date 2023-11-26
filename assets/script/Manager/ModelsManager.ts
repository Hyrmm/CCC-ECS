
import { BaseModel } from "../Models/BaseModel"
import { FramesModel } from "../Models/FramesModel"
import { UserInfoModel } from "../Models/UserInfoModel"

class ModelMap {
    private map: Map<string, BaseModel> = new Map()
    private array: Array<BaseModel> = []

    /**
    * 添加实例
    * @param key model名
    * @param instance model实例
    */
    addInstance(key: string, instance: BaseModel): void {
        this.map.set(key, instance)
        this.array.push(instance)
    }

    /**
    * 获取实例
    * @param key model名
    */
    getInstance<T extends BaseModel>(key: string): T {
        return this.map.get(key) as T
    }

    getAllInstance(): Array<BaseModel> {
        return this.array
    }
}


export class ModelsManager {

    static modelMap: ModelMap = new ModelMap

    static init() {
        // 注册
        this.registerModels()

        // 注册事件监听
        this.registerModelsListener()
    }

    static registerModels(): void {
        this.modelMap.addInstance(FramesModel.name, new FramesModel)
        this.modelMap.addInstance(UserInfoModel.name, new UserInfoModel)
    }

    static registerModelsListener(): void {
        const allModelsArr = this.modelMap.getAllInstance()
        for (const model of allModelsArr) {
            model.initListener()
        }
    }

    /**
    * 获取model实例
    * @param modelCls model类
    */
    static getModel<T extends BaseModel>(modelCls: ctor<T>): T {
        return this.modelMap.getInstance(modelCls.name)
    }
}

type ctor<T = unknown> = new (...args: any[]) => T
