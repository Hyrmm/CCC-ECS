import { Vec3 } from "cc";
import { ecs } from "../../Core/ECS"
import { PlayerComponent } from "../Component/PlayerComponent";
import { PositionComponent } from "../Component/PositionComponent"
import { RenderComponent } from "../Component/RenderComponent"
import { BaseEntity } from "../Entity/Entity";
import { BaseSystem } from "./System";

export class RenderSystem extends BaseSystem {

    public priority: number = 1
    public managedECSComponents = []



    update(dt?: number): void {
        this.renderPlayerEntitys(dt)
    }

    /**
     * 渲染位置
     * @param entity 实体
     */
    private renderPosition(entity: BaseEntity) {
        const positionComponent = entity.getCom(PositionComponent)
        entity.setPosition(positionComponent.position)
    }


    /**
     * 玩家实体影子追踪(插值渲染)
     */
    private renderPlayerEntitys(dt: number) {
        const playerEntitys = ecs.ECSQuery.withComsBoth(PlayerComponent)
        for (const entity of playerEntitys) {

            const positionCom = entity.getCom(PositionComponent)
            const curPos = positionCom.position
            const curShadowPos = positionCom.shadowPosition
            const offsetPos = new Vec3(curShadowPos.x - curPos.x, curShadowPos.y - curPos.y, 0)

            if (offsetPos != Vec3.ZERO) {
                const t = Math.ceil(dt * 1000) / (1000 / 60)
                positionCom.position.add(new Vec3(t * offsetPos.x, t * offsetPos.y))
            }
            this.renderPosition(entity as BaseEntity)
        }
    }


}
type ctor<T = unknown> = new (...args: any[]) => T;