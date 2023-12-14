import { ecs } from "../../Core/ECS"
import { Vec3 } from "cc"
import { PositionComponent, InputComponent, PhysicalComponent, PlayerComponent } from "../Component/ECSComponent"
import { FramesManager } from "../../Manager/FramesManager"
import { BaseSystem } from "./System"
import { Input } from "../../Type"
import { EntityManager } from "../../Manager/EntityManager"

export class MovementSystem extends BaseSystem {

    public priority: number = 1
    public managedECSComponents = []



    /**
    * 针对有控制组件的实体更新位置
    * @param dt 帧间隔
    */
    public updateControllablePositon(dt: number) {
        const entitys = ecs.ECSQuery.withComsBoth(PositionComponent, PhysicalComponent, InputComponent)
        for (const entity of entitys) {
            const physicalCom = entity.getCom(PhysicalComponent)
            const velocityX = physicalCom.velocityX
            const velocityY = physicalCom.velocityY

            const { directionX, directionY } = EntityManager.getEntityDirection(entity)

            // 一旦有朝向说明有移动，向服务器同步操作
            if (directionX != 0 || directionY != 0) {
                FramesManager.applyInputs(Input.EnumInputTypeName.PlayerMove, { playerMove: { dt: Math.ceil(dt * 1000), velocityX: velocityX * directionX, velocityY: velocityY * directionY } })
            }

        }
    }

    /**
    * 针对性更新玩家实体影子位置
    * @param playerMoveArr 移动数据
    */
    public updatePlayerShadowPositon(playerMoveArr: Array<Input.TypePlayerMove>) {

        // 移动数据结构处理
        const playerId2PlayerMoveMap: Map<string, Input.TypePlayerMove> = new Map()
        for (const playerMove of playerMoveArr) {
            playerId2PlayerMoveMap.set(playerMove.playerId, playerMove)
        }

        const entitys = ecs.ECSQuery.withComsBoth(PlayerComponent)
        for (const entity of entitys) {
            const playerCom = entity.getCom(PlayerComponent)
            const positionCom = entity.getCom(PositionComponent)
            const playerMoveData = playerId2PlayerMoveMap.get(playerCom.playerId)
            if (playerMoveData) {
                const posX = (playerMoveData.dt * playerMoveData.velocityX) / 5
                const posY = (playerMoveData.dt * playerMoveData.velocityY) / 5
                positionCom.shadowPosition.add(new Vec3(posX, posY, 0))
            }
        }


    }

    /**
    * 根据玩家实体影子位置，插值追逐影子
    * @param dt 帧刷新间隔
    */
    public updatePlayerInterpolationPositon(dt) {
        const playerEntitys = ecs.ECSQuery.withComsBoth(PlayerComponent)

        // 插值增量系数取值区间在(0,1),可以将dt(每帧间隔时间)作为其中参数动态计算插值增量，可使得在不同刷新率下，插值的都是平滑的
        // FPS/dt=> 30hz/34ms 60hz/17ms 120hz/9ms 144hz/7ms
        // 存在特殊情况，卡顿时dt间隔会别的非常大，可能导致delta超出区间（0，1），此时时delta等于1
        const delta = Math.min((dt * 1000) / 180, 1)
        for (const entity of playerEntitys) {
            const positionCom = entity.getCom(PositionComponent)

            const curPos = positionCom.position
            const curShadowPos = positionCom.shadowPosition
            const offsetPos = new Vec3(curShadowPos.x - curPos.x, curShadowPos.y - curPos.y, 0)

            if (!offsetPos.equals(Vec3.ZERO)) {
                // 极限情况，真实位置永远趋近于目标影子位置，当相离位置小于1像素时直接修正到目标影子位置
                let interpolationX = Math.abs(offsetPos.x) <= 1 ? offsetPos.x : delta * offsetPos.x
                let interpolationY = Math.abs(offsetPos.y) <= 1 ? offsetPos.y : delta * offsetPos.y
                positionCom.position.add(new Vec3(interpolationX, interpolationY, 0))
            }
        }
    }

    public update(dt?: number) {
        this.updateControllablePositon(dt)
        this.updatePlayerInterpolationPositon(dt)
    }
}
type ctor<T = unknown> = new (...args: any[]) => T;