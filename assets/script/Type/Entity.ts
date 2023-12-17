import { ecs } from "../Core/ECS"
import { Layer } from "./index"


export type TypeFrameAnimate = {
    defaultAnimateName: string
    frameSheetRectCnt: [number, number]
    frameAnimateSheetName: string
    animatesMap: Map<string, [number, number]>
}

export type TypeEntityConfig = {
    name: string
    layerId: Layer.EnumLayerId
    components: Array<ctor<ecs.ECSComponent>>
    moveClipsName?: string
    prefebName?: string
    velocity?: [number, number]
    frameAnimate?: TypeFrameAnimate
}


type ctor<T = unknown> = new (...args: any[]) => T