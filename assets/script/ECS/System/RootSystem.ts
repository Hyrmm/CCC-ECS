import { ecs } from "../../Core/ECS"
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

    /**
    * 删除以帧刷新为单位执行回调
    * @param scheduleId 添加时返回的调度id
    */
    public delFramesSchedule(scheduleId: Symbol): Boolean {
        return this.framesScheduleMap.delete(scheduleId)
    }

    private executeSubSystem(dt: number) {
        let afterFilterSystemPool = ecs.System.getAllSystems()

        // 过滤优先级为负数的系统
        afterFilterSystemPool = afterFilterSystemPool.filter((system) => system.priority > 0)

        // 系统执行优先级排序
        afterFilterSystemPool = afterFilterSystemPool.sort((preSystem, nextSystem) => preSystem.priority - nextSystem.priority)

        for (const subSystem of afterFilterSystemPool) {
            subSystem.update(dt)
        }

        this.executeFramesSchedule(dt)
    }

    private executeFramesSchedule(dt: number) {
        for (const callbackSchedule of this.framesScheduleMap.values()) {
            callbackSchedule(dt)
        }
    }


}
type ctor<T = unknown> = new (...args: any[]) => T;