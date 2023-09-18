import { ecs } from "../Core/ECS"
import { Vec3 } from "cc"
// import { PositionComponent } from "../Component/PositionComponent"
// import { InputComponent } from "../Component/InputComponent"
// import { RenderComponent } from "../Component/RenderComponent"
import { KeyCode } from "../Config/Enum"
import { PositionComponent, InputComponent, PhysicalComponent } from "../Component/ECSComponent"

export class MovementSystem extends ecs.System {

    public priority: number = 1
    public managedECSComponents = []



    // 针对有控制组件的实体更新位置
    public updateControllablePositon(dt: number) {
        const entitys = ecs.ECSQuery.withComsBoth(PositionComponent, PhysicalComponent, InputComponent)
        for (const entity of entitys) {



            const timeOffset = dt

            const positionCom = entity.getCom(PositionComponent)
            const physicalCom = entity.getCom(PhysicalComponent)

            const position = positionCom.position
            const velocityX = physicalCom.velocityX
            const velocityY = physicalCom.velocityY


            const { directionX, directionY } = this.getEntityDirection(entity)

            if (directionX != 0 || directionY != 0) {
                console.log(position)
            }
            position.add(new Vec3(timeOffset * velocityX * 100 * directionX, timeOffset * velocityY * 100 * directionY, 0))


        }
    }

    private getEntityDirection(entity: ecs.Entity): { directionX: number, directionY: number } {
        let directionX, directionY
        const inputCom = entity.getCom(InputComponent)
        const curPresingKeyCode = inputCom.keyPresingCode[inputCom.keyPresingCode.length - 1]

        switch (curPresingKeyCode) {
            case KeyCode.up: {
                directionX = 0
                directionY = 1
                break
            }
            case KeyCode.down: {
                directionX = 0
                directionY = -1
                break
            }
            case KeyCode.left: {
                directionX = -1
                directionY = 0
                break
            }
            case KeyCode.right: {
                directionX = 1
                directionY = 0
                break
            }
            default: {
                directionX = 0
                directionY = 0
            }
        }


        return { directionX, directionY }
    }


    public update(dt?: number) {
        this.updateControllablePositon(dt)
    }
}
type ctor<T = unknown> = new (...args: any[]) => T;