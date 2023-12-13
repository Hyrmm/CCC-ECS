import { ecs } from "../../Core/ECS"
import { Layer, Entity } from "../../Type"
import { InputComponent, PhysicalComponent, PlayerComponent, PositionComponent, RenderComponent } from "../Component/ECSComponent"



export class BaseEntity extends ecs.Entity {
    public config: Entity.TypeEntityConfig
}

export const entityConfig: { [key: string]: Entity.TypeEntityConfig } = {
    selfPlayerEntityConfig: {
        name: "playerSelf",
        layerId: Layer.EnumLayerId.PlayerLayer,
        components: [PositionComponent, PhysicalComponent, InputComponent, RenderComponent, PlayerComponent],
        velocity: [2, 2],
        moveClipsName: "captain",
        prefebName: "player"
    },
    otherPlayerEntityConfig: {
        name: "playerOther",
        layerId: Layer.EnumLayerId.PlayerLayer,
        components: [PositionComponent, PhysicalComponent, RenderComponent, PlayerComponent],
        velocity: [1, 1],
        moveClipsName: "captain",
        prefebName: "player"
    }

}


type ctor<T = unknown> = new (...args: any[]) => T