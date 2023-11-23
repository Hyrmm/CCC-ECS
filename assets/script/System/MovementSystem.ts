import { ecs } from "../Core/ECS"
import { Vec3 } from "cc"
import { InputsTypeEnum, KeyCodeEnum } from "../Config/Enum"
import { PositionComponent, InputComponent, PhysicalComponent, PlayerComponents } from "../Component/ECSComponent"
import { FramesManager } from "../Manager/FramesManager"
import { T_PlayerMove } from "../Config/Interface"
import { BaseSystem } from "./System"
import { BaseEntity } from "../Entity/Entity"

export class MovementSystem extends BaseSystem {

    public priority: number = 1
    public managedECSComponents = []



    /**
    * 针对有控制组件的实体更新位置
    * @param dt 帧间隔(千分之毫秒)
    */
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

            // 一旦有朝向说明有移动，向服务器同步操作
            if (directionX != 0 || directionY != 0) {
                FramesManager.applyInputs(InputsTypeEnum.PlayerMove, { playerMove: { dt: Math.ceil(dt * 1000), velocityX: velocityX * directionX, velocityY: velocityY * directionY } })
                // position.add(new Vec3(timeOffset * velocityX * 100 * directionX, timeOffset * velocityY * 100 * directionY, 0))
            }

        }
    }

    /**
    * 针对性更新玩家实体位置
    * @param dt 帧间隔(千分之毫秒)
    */
    public updatePlayerPositon(playerMoveArr: Array<T_PlayerMove>) {
        // 移动数据结构处理
        const playerId2PlayerMoveMap: Map<number, T_PlayerMove> = new Map()
        for (const playerMove of playerMoveArr) {
            playerId2PlayerMoveMap.set(playerMove.playerId, playerMove)
        }

        const entitys = ecs.ECSQuery.withComsBoth(PositionComponent, PhysicalComponent, InputComponent, PlayerComponents)
        for (const entity of entitys) {
            const playerCom = entity.getComponent(PlayerComponents)
            const positionCom = entity.getCom(PositionComponent)
            const playerMoveData = playerId2PlayerMoveMap.get(playerCom.playerId)

            const posX = playerMoveData.dt * playerMoveData.velocityX
            const posY = playerMoveData.dt * playerMoveData.velocityY
            positionCom.position.add(new Vec3(posX / 2, posY / 2, 0))
        }




    }

    /**
    * 获取实体朝向
    * @param entity 实体实例
    */
    private getEntityDirection(entity: ecs.Entity): { directionX: number, directionY: number } {

        let directionX, directionY
        const inputCom = entity.getCom(InputComponent)
        const curPresingKeyCode = inputCom.keyPresingCode[inputCom.keyPresingCode.length - 1]

        switch (curPresingKeyCode) {
            case KeyCodeEnum.Up: {
                directionX = 0
                directionY = 1
                break
            }
            case KeyCodeEnum.Down: {
                directionX = 0
                directionY = -1
                break
            }
            case KeyCodeEnum.Left: {
                directionX = -1
                directionY = 0
                break
            }
            case KeyCodeEnum.Right: {
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