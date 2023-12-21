import { ecs } from "../../Core/ECS"
import { Layer, Entity } from "../../Type"
import { AnimateComponent, InputComponent, PhysicalComponent, PlayerComponent, PositionComponent, RenderComponent } from "../Component/ECSComponent"



export class BaseEntity extends ecs.Entity {
    public config: Entity.TypeEntityConfig
}

export class PlayerEntity extends BaseEntity {
    public config: Entity.TypeEntityConfig
}



const allFrameAnimatesMap: Map<string, Entity.TypeFrameAnimate> = new Map()

const douxAnimatesMap: Map<string, Entity.TypeAnimate> = new Map()
douxAnimatesMap.set("idle", { loop: true, duraction: 0.1, frameRange: [0, 3] })
douxAnimatesMap.set("run", { loop: false, duraction: 0.1, frameRange: [5, 10] })
allFrameAnimatesMap.set("doux", { playOnLoad: true, frameAnimateSheetName: "doux", frameSheetRectCnt: [24, 1], defaultAnimateName: "idle", animatesMap: douxAnimatesMap })

const mortAnimatesMap: Map<string, Entity.TypeAnimate> = new Map()
mortAnimatesMap.set("idle", { loop: true, duraction: 0.1, frameRange: [0, 3] })
mortAnimatesMap.set("run", { loop: false, duraction: 0.1, frameRange: [5, 10] })
allFrameAnimatesMap.set("mort", { playOnLoad: true, frameAnimateSheetName: "mort", frameSheetRectCnt: [24, 1], defaultAnimateName: "idle", animatesMap: mortAnimatesMap })

const tardAnimatesMap: Map<string, Entity.TypeAnimate> = new Map()
tardAnimatesMap.set("idle", { loop: true, duraction: 0.1, frameRange: [0, 3] })
tardAnimatesMap.set("run", { loop: false, duraction: 0.1, frameRange: [5, 10] })
allFrameAnimatesMap.set("tard", { playOnLoad: true, frameAnimateSheetName: "tard", frameSheetRectCnt: [24, 1], defaultAnimateName: "idle", animatesMap: tardAnimatesMap })

const vitaAnimatesMap: Map<string, Entity.TypeAnimate> = new Map()
vitaAnimatesMap.set("idle", { loop: true, duraction: 0.1, frameRange: [0, 3] })
vitaAnimatesMap.set("run", { loop: false, duraction: 0.1, frameRange: [5, 10] })
allFrameAnimatesMap.set("vita", { playOnLoad: true, frameAnimateSheetName: "vita", frameSheetRectCnt: [24, 1], defaultAnimateName: "idle", animatesMap: vitaAnimatesMap })



const entityConfig: Map<string, Entity.TypeEntityConfig> = new Map()

entityConfig.set("playerDoux", {
    name: "playerDoux",
    layerId: Layer.EnumLayerId.PlayerLayer,
    components: [PositionComponent, PhysicalComponent, RenderComponent, PlayerComponent, AnimateComponent],
    velocity: [1, 1],
    prefebName: "playerDoux",
    frameAnimate: allFrameAnimatesMap.get("doux")
},)

entityConfig.set("playerMort", {
    name: "playerMort",
    layerId: Layer.EnumLayerId.PlayerLayer,
    components: [PositionComponent, PhysicalComponent, RenderComponent, PlayerComponent, AnimateComponent],
    velocity: [1, 1],
    prefebName: "playerMort",
    frameAnimate: allFrameAnimatesMap.get("mort")
},)

entityConfig.set("playerTard", {
    name: "playerTard",
    layerId: Layer.EnumLayerId.PlayerLayer,
    components: [PositionComponent, PhysicalComponent, RenderComponent, PlayerComponent, AnimateComponent],
    velocity: [1, 1],
    prefebName: "playerTard",
    frameAnimate: allFrameAnimatesMap.get("tard")
},)

entityConfig.set("playerVita", {
    name: "playerVita",
    layerId: Layer.EnumLayerId.PlayerLayer,
    components: [PositionComponent, PhysicalComponent, RenderComponent, PlayerComponent, AnimateComponent],
    velocity: [1, 1],
    prefebName: "playerVita",
    frameAnimate: allFrameAnimatesMap.get("vita")
},)

export { entityConfig }