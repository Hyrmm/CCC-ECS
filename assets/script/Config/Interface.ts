import { Node } from "cc"
import { ecs } from "../Core/ECS"



export interface I_LayerConfig {
    id: number
    layer: Node
}

export interface I_InputsType {
    playerMove?: T_PlayerMove
}

export interface I_OutputsType {
    playerMove?: Array<T_PlayerMove>
}

export type T_PlayerMove = {
    dt: number, velocityX?: number, velocityY?: number, playerId?: number
}