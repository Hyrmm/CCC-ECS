import { ecs } from "../Core/ECS"
import { BaseSystem } from "./System"


// 根系统调用其他系统逻辑
export class RootSystem extends BaseSystem {
    public priority: number = 999

    private framesScheduleMap: Map<Symbol, (dt: number) => void> = new Map()



    public execute(dt: number) {
        this.executeSubSystem(dt)
        this.executeFramesSchedule(dt)
    }

    /**
    * 添加子系统
    * @param system 子系统
    */
    public addSystem<T extends ecs.System>(system: T): T | null {
        if (ecs.systemPool.includes(system)) return null
        ecs.systemPool.push(system)
        return system
    }

    /**
    * 添加以帧刷新为单位执行回调
    * @param callback 回调函数
    * @param target this指向
    */
    public addFramesSchedule(callback: (dt: number) => void, target?: any): Symbol {
        const scheduleKey = Symbol(callback.name)
        if (target) {
            this.framesScheduleMap.set(scheduleKey, callback.bind(target))
        } else {
            this.framesScheduleMap.set(scheduleKey, callback)
        }
        return scheduleKey
    }

    private executeSubSystem(dt: number) {
        let afterFilterSystemPool = ecs.systemPool

        // 过滤优先级为负数的系统
        afterFilterSystemPool = afterFilterSystemPool.filter((system) => system.priority > 0)

        // 系统执行优先级排序
        afterFilterSystemPool = afterFilterSystemPool.sort((preSystem, nextSystem) => preSystem.priority - nextSystem.priority)


        afterFilterSystemPool.forEach((system) => {
            system.update(dt)
        })

        this.executeFramesSchedule(dt)
    }

    /**
    * 删除以帧刷新为单位执行回调
    * @param scheduleId 添加时返回的调度id
    */
    public delFramesSchedule(scheduleId: Symbol): Boolean {
        return this.framesScheduleMap.delete(scheduleId)
    }

    private executeFramesSchedule(dt: number) {
        for (const callbackSchedule of this.framesScheduleMap.values()) {
            callbackSchedule(dt)
        }
    }


}
type ctor<T = unknown> = new (...args: any[]) => T;