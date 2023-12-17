import { ecs } from "../../Core/ECS"
import { _decorator, Component, Node, Vec3, Sprite } from 'cc'
import { BaseComponent } from "./Component"
const { ccclass, property } = _decorator

@ecs.ECSDecorator.registerECSComName('AnimateComponent')
@ccclass('AnimateComponent')
export class AnimateComponent extends BaseComponent {
    public animatesMap: Map<string, [number, number]>
    public frameSheetName: string
    public frameSheetRectCnt: [number, number]
    public defaultAnimateName: string

    public isFrameSheetLoaded: boolean = false

    public get frameAnimateSpriteNode(): Node | null {
        const spNode = this.entity.getChildByName("sp_frameAnimate")
        return spNode ? spNode : null
    }
}