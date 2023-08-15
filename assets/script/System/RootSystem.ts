import { ecs } from "../Core/ECS"


// 根系统调用其他系统逻辑
export class RootSystem implements ecs.System {
    public priority: number = 999
    public managedECSComponents = []



    add<T extends ecs.System>(system: T): T | null {
        if (ecs.systemPool.includes(system)) return null
        ecs.systemPool.push(system)
        return system
    }

    execute(dt: number) {
        let afterFilterSystemPool = ecs.systemPool

        // 过滤优先级为负数的系统
        afterFilterSystemPool = afterFilterSystemPool.filter((system) => system.priority > 0)

        // 系统执行优先级排序
        afterFilterSystemPool = afterFilterSystemPool.sort((preSystem, nextSystem) => preSystem.priority - nextSystem.priority)


        afterFilterSystemPool.forEach((system) => {
            system.update(dt)
        })
    }



    update(dt?: number): void {

    }
}
type ctor<T = unknown> = new (...args: any[]) => T;