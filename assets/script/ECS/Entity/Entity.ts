import { ecs } from "../../Core/ECS"
import { Layer, Entity } from "../../Type"
import { AnimateComponent, InputComponent, PhysicalComponent, PlayerComponent, PositionComponent, RenderComponent } from "../Component/ECSComponent"



export class BaseEntity extends ecs.Entity {
    public config: Entity.TypeEntityConfig
}




export const allFrameAnimatesMap: Map<string, Entity.TypeFrameAnimate> = new Map()

export const douxAnimatesMap: Map<string, Entity.TypeAnimate> = new Map()
douxAnimatesMap.set("idle", { duraction: 0.1, frameRange: [0, 4] })
douxAnimatesMap.set("run", { duraction: 0.1, frameRange: [5, 27] })
allFrameAnimatesMap.set("doux", { playOnLoad: true, frameAnimateSheetName: "doux", frameSheetRectCnt: [24, 1], defaultAnimateName: "idle", animatesMap: douxAnimatesMap })

export const mortAnimatesMap: Map<string, Entity.TypeAnimate> = new Map()
mortAnimatesMap.set("idle", { duraction: 0.1, frameRange: [0, 4] })
mortAnimatesMap.set("run", { duraction: 0.1, frameRange: [5, 27] })
allFrameAnimatesMap.set("mort", { playOnLoad: true, frameAnimateSheetName: "mort", frameSheetRectCnt: [24, 1], defaultAnimateName: "idle", animatesMap: mortAnimatesMap })

export const tardAnimatesMap: Map<string, Entity.TypeAnimate> = new Map()
tardAnimatesMap.set("idle", { duraction: 0.1, frameRange: [0, 4] })
tardAnimatesMap.set("run", { duraction: 0.1, frameRange: [5, 27] })
allFrameAnimatesMap.set("tard", { playOnLoad: true, frameAnimateSheetName: "tard", frameSheetRectCnt: [24, 1], defaultAnimateName: "idle", animatesMap: tardAnimatesMap })

export const vitaAnimatesMap: Map<string, Entity.TypeAnimate> = new Map()
vitaAnimatesMap.set("idle", { duraction: 0.1, frameRange: [0, 4] })
vitaAnimatesMap.set("run", { duraction: 0.1, frameRange: [5, 27] })
allFrameAnimatesMap.set("vita", { playOnLoad: true, frameAnimateSheetName: "vita", frameSheetRectCnt: [24, 1], defaultAnimateName: "idle", animatesMap: vitaAnimatesMap })


export const entityConfig: { [key: string]: Entity.TypeEntityConfig } = {
    selfPlayerEntityConfig: {
        name: "playerSelf",
        layerId: Layer.EnumLayerId.PlayerLayer,
        components: [PositionComponent, PhysicalComponent, InputComponent, RenderComponent, PlayerComponent, AnimateComponent],
        velocity: [2, 2],
        moveClipsName: "captain",
        prefebName: "player",
        frameAnimate: allFrameAnimatesMap.get("doux")
    },
    otherPlayerEntityConfig: {
        name: "playerOther",
        layerId: Layer.EnumLayerId.PlayerLayer,
        components: [PositionComponent, PhysicalComponent, RenderComponent, PlayerComponent, AnimateComponent],
        velocity: [1, 1],
        moveClipsName: "captain",
        prefebName: "player",
        frameAnimate: allFrameAnimatesMap.get("mort")
    }

}


type ctor<T = unknown> = new (...args: any[]) => T