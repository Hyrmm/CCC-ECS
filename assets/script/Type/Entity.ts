import { Enum } from "cc"
import { ecs } from "../Core/ECS"
import { Layer } from "./index"


export type TypeAnimate = {
    loop: boolean
    duraction: number
    frameRange: [number, number]
}

export type TypeFrameAnimate = {
    playOnLoad: boolean
    animatesMap: Map<string, TypeAnimate>
    defaultAnimateName: string

    frameSheetRectCnt: [number, number]
    frameAnimateSheetName: string
}

export type TypeEntityConfig = {
    name: string
    layerId: Layer.EnumLayerId
    components: Array<ctor<ecs.ECSComponent>>
    prefebName?: string
    velocity?: [number, number]
    frameAnimate?: TypeFrameAnimate
}

export enum EnumEntityAnimateName {
    IdleTop = "idleTop",
    IdleLeft = "idleTop",
    IdleRight = "idleTop",
    IdleBottom = "idleTop",
}

type ctor<T = unknown> = new (...args: any[]) => T