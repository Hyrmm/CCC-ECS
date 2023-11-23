import { ecs } from "../Core/ECS"
import { BaseSystem } from "./System"


// 根系统调用其他系统逻辑
export class RootSystem extends BaseSystem {
    public priority: number = 999
    private framesScheduleMap: Map<Symbol, Function> = new Map()

    public add<T extends ecs.System>(system: T): T | null {
        if (ecs.systemPool.includes(system)) return null
        ecs.systemPool.push(system)
        return system
    }

    public execute(dt: number) {
        let afterFilterSystemPool = ecs.systemPool

        // 过滤优先级为负数的系统
        afterFilterSystemPool = afterFilterSystemPool.filter((system) => system.priority > 0)

        // 系统执行优先级排序
        afterFilterSystemPool = afterFilterSystemPool.sort((preSystem, nextSystem) => preSystem.priority - nextSystem.priority)


        afterFilterSystemPool.forEach((system) => {
            system.update(dt)
        })

        this.executeFramesSchedule()
    }

    /**
    * 添加以帧刷新为单位执行回调
    * @param mission 回调函数
    * @param target this指向
    */
    public addFramesSchedule(mission: Function, target?: any): Symbol {
        const key = Symbol(mission.name)
        if (target) {
            this.framesScheduleMap.set(key, mission.bind(target))
        } else {
            this.framesScheduleMap.set(key, mission)
        }
        return key
    }

    /**
    * 删除以帧刷新为单位执行回调
    * @param scheduleId 添加时返回的调度id
    */
    public delFramesSchedule(scheduleId: Symbol): Boolean {
        return this.framesScheduleMap.delete(scheduleId)
    }

    private executeFramesSchedule() {
        for (const mission of this.framesScheduleMap.values()) {
            mission()
        }
    }



    update(dt?: number): void {

    }
}
type ctor<T = unknown> = new (...args: any[]) => T;