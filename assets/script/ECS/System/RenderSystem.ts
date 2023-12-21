import { Vec3 } from "cc";
import { ecs } from "../../Core/ECS"
import { AnimateComponent, PlayerComponent, PositionComponent, RenderComponent } from "../Component/ECSComponent"
import { BaseEntity } from "../Entity/Entity";
import { BaseSystem } from "./System";

export class RenderSystem extends BaseSystem {

    public priority: number = 1
    public managedECSComponents = []

    /**
     * 渲染实体位置
     * @param entity 实体
     */
    private renderEntityPosition(entity: BaseEntity) {
        const positionComponent = entity.getCom(PositionComponent)
        entity.setPosition(positionComponent.position)
    }

    private renderEntityDirection(entity: BaseEntity) {

    }

    /**
     * 渲染实体帧动画
     * @param entity 实体
     */
    private renderEntityFrameAnimate(entity: BaseEntity) {
        const positionCom = entity.getCom(PositionComponent)
        const frameAnimateCom = entity.getCom(AnimateComponent)
        if (frameAnimateCom) {
            if (Vec3.subtract(new Vec3(0, 0, 0), positionCom.shadowPosition, positionCom.position).length() <= 10) {
                frameAnimateCom.playAnimate("idle")
            } else {
                frameAnimateCom.playAnimate("run")
            }
        }
    }


    /**
     * 渲染玩家实体
     */
    private renderPlayerEntitys(dt: number) {
        const playerEntitys = ecs.ECSQuery.withComsBoth(PlayerComponent, RenderComponent)
        for (const entity of playerEntitys) {
            this.renderEntityPosition(entity as BaseEntity)
            this.renderEntityFrameAnimate(entity as BaseEntity)
        }
    }

    update(dt?: number): void {
        this.renderPlayerEntitys(dt)
    }

}
type ctor<T = unknown> = new (...args: any[]) => T;