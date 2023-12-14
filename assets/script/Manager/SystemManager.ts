
import { ecs } from "../Core/ECS"
import { BaseSystem } from "../ECS/System/System"

class SystemMap {
    private map: Map<string, BaseSystem> = new Map()
    private array: Array<BaseSystem> = []

    /**
    * 添加实例
    * @param key model名
    * @param instance model实例
    */
    addInstance(key: string, instance: BaseSystem): void {
        this.map.set(key, instance)
        this.array.push(instance)
    }
    /**
    * 获取实例
    * @param key model名
    */
    getInstance<T extends BaseSystem>(key: string): T {
        return this.map.get(key) as T
    }

    getAllInstance(): Array<BaseSystem> {
        return this.array
    }
}

export class SystemManager {

    static systemMap: SystemMap = new SystemMap

    static init<T extends BaseSystem>(systemsList: Array<ctor<T>>) {
        for (const systemCls of systemsList) {
            this.registerSystem(systemCls)
        }
    }

    /**
    * 获取system实例
    * @param systemCls system类
    */
    static registerSystem<T extends BaseSystem>(systemCls: ctor<T>): T {
        const systemInstance = ecs.System.registSystem(systemCls)
        this.systemMap.addInstance(systemCls.name, systemInstance)
        return systemInstance
    }

    /**
    * 获取system实例
    * @param systemCls system类
    */
    static getSystem<T extends BaseSystem>(systemCls: ctor<T>): T {
        return this.systemMap.getInstance(systemCls.name)
    }
}

type ctor<T = unknown> = new (...args: any[]) => T
