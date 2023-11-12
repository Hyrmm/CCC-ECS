
import { BaseModel } from "../Models/BaseModel"
import { FramesModel } from "../Models/FramesModel"
import { UserInfoModel } from "../Models/UserInfoModel"

class ModelMap<T extends BaseModel> {
    private map: Map<string, T> = new Map()
    private array: Array<T> = []

    // 添加实例
    addInstance(key: string, instance: T): void {
        this.map.set(key, instance)
        this.array.push(instance)
    }

    // 获取实例
    getInstance(key: string): T | undefined {
        return this.map.get(key)
    }

    getAllInstance(): Array<T> {
        return this.array
    }
}


export class ModelsManager {

    static modelMap: ModelMap<Models> = new ModelMap

    static init() {
        // 注册
        this.registerModels()

        // 注册事件监听
        this.registerModelsListener()
    }

    static registerModels(): void {
        this.modelMap.addInstance("FramesModel", new FramesModel)
    }

    static registerModelsListener(): void {
        const allModelsArr = this.modelMap.getAllInstance()
        for (const model of allModelsArr) {
            model.initListener()
        }
    }
}

type Models = FramesModel | UserInfoModel

