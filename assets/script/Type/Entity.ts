import { ecs } from "../Core/ECS"
import { Layer } from "."


export type TypeEntityConfig = {
    name: string
    layerId: Layer.EnumLayerId
    components: Array<ctor<ecs.ECSComponent>>
    moveClipsName?: string
    prefebName?: string
    velocity?: [number, number]
}


type ctor<T = unknown> = new (...args: any[]) => T