import { ecs } from "../../Core/ECS"
import { Layer, Entity } from "../../Type"
import { AnimateComponent, InputComponent, PhysicalComponent, PlayerComponent, PositionComponent, RenderComponent } from "../Component/ECSComponent"



export class BaseEntity extends ecs.Entity {
    public config: Entity.TypeEntityConfig
}





const allFrameAnimatesMap: Map<string, Entity.TypeFrameAnimate> = new Map()






const douxAnimatesMap: Map<string, [number, number]> = new Map().set("idle", [0, 5]).set("run", [5, 27])
allFrameAnimatesMap.set("doux", { frameAnimateSheetName: "doux", frameSheetRectCnt: [24, 1], defaultAnimateName: "idle", animatesMap: douxAnimatesMap })

const mortAnimatesMap: Map<string, [number, number]> = new Map().set("idle", [0, 5]).set("run", [5, 27])
allFrameAnimatesMap.set("mort", { frameAnimateSheetName: "mort", frameSheetRectCnt: [24, 1], defaultAnimateName: "idle", animatesMap: mortAnimatesMap })

const tardAnimatesMap: Map<string, [number, number]> = new Map().set("idle", [0, 5]).set("run", [5, 27])
allFrameAnimatesMap.set("tard", { frameAnimateSheetName: "tard", frameSheetRectCnt: [24, 1], defaultAnimateName: "idle", animatesMap: tardAnimatesMap })

const vitaAnimatesMap: Map<string, [number, number]> = new Map().set("idle", [0, 5]).set("run", [5, 27])
allFrameAnimatesMap.set("vita", { frameAnimateSheetName: "vita", frameSheetRectCnt: [24, 1], defaultAnimateName: "idle", animatesMap: vitaAnimatesMap })


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