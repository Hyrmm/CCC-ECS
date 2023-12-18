
import { ecs } from "../Core/ECS"
import { BaseSystem } from "../ECS/System/System"


export class SystemManager {

    static init<T extends BaseSystem>(systemsList: Array<ctor<T>>) {
        for (const systemCls of systemsList) {
            this.registSystem(systemCls)
        }
    }

    /**
    * 注册system实例
    * @param systemCls system类
    */
    static registSystem<T extends BaseSystem>(systemCls: ctor<T>): T {
        const systemInstance = ecs.System.registSystem(systemCls)
        return systemInstance
    }

    /**
    * 获取system实例
    * @param systemCls system类
    */
    static getSystem<T extends BaseSystem>(systemCls: ctor<T>): T {
        return ecs.System.registSystem(systemCls)
    }
}

type ctor<T = unknown> = new (...args: any[]) => T
