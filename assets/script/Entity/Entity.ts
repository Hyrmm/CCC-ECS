import { LayerIdEnum } from "../Config/Enum"
import { InputComponent, PhysicalComponent, PlayerComponents, PositionComponent, RenderComponent } from "../Component/ECSComponent"
import { ecs } from "../Core/ECS"


export class BaseEntity extends ecs.Entity {
    public config: I_EntityConfig
}






export interface I_EntityConfig {
    name: string
    layerId: number
    components: Array<ctor<ecs.ECSComponent>>
    moveClipsName?: string
    prefebName?: string
    velocity?: [number, number]
}

export const playerEntityConfig: I_EntityConfig = {
    name: "player",
    layerId: LayerIdEnum.playerLayer,
    components: [PositionComponent, PhysicalComponent, InputComponent, RenderComponent, PlayerComponents],
    velocity: [2, 2],
    moveClipsName: "captain",
    prefebName: "player"
}


type ctor<T = unknown> = new (...args: any[]) => T