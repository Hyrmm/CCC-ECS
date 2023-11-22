import { ecs } from "../Core/ECS"
import { PositionComponent } from "../Component/PositionComponent"
import { RenderComponent } from "../Component/RenderComponent"
import { BaseSystem } from "./System";

export class RenderSystem extends BaseSystem {

    public priority: number = 1
    public managedECSComponents = []



    update(dt?: number): void {
        const needRenderEntitys = ecs.ECSQuery.withComsBoth(PositionComponent, RenderComponent)
        for (const entity of needRenderEntitys) {
            this.renderPosition(entity)
        }
    }

    // 渲染位置
    renderPosition(entity: ecs.Entity) {
        const positionComponent = entity.getCom(PositionComponent)
        entity.setPosition(positionComponent.position)
    }

    // 渲染方向
    renderSprite(entity: ecs.Entity) {
        const renderComponent = entity.getCom(RenderComponent)
    }

}
type ctor<T = unknown> = new (...args: any[]) => T;