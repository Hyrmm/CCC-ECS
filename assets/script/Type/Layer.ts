import { Node } from "cc"

export enum EnumLayerId {
    UiLayer = 1,
    TipsLayer = 2,
    PlayerLayer = 3,

}

export type TypeLayerConfig = { id: EnumLayerId, layer: Node }