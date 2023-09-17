import { Node } from "cc"
import { ecs } from "../Core/ECS"



type ctor<T = unknown> = new (...args: any[]) => T;


export interface entityConfig {
    name: string
    layerId: number
    components: Array<ctor<ecs.ECSComponent>>
    moveClipsName?: string
    prefebName?: string
}

export interface playerEntity extends entityConfig {
    // 速度
    velocity: [number, number]
}




export interface layerConfig {
    id: number
    layer: Node
}