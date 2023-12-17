
import { ecs } from "../../Core/ECS"
import { _decorator, Component, Node, Vec3 } from 'cc'
import { BaseComponent } from "./Component"
const { ccclass, property } = _decorator

@ecs.ECSDecorator.registerECSComName('InputComponent')
@ccclass('InputComponent')
export class InputComponent extends BaseComponent {

    public keyPresingCode: Array<number> = []
    public predictPos: Vec3 = new Vec3(0, 0, 0)


}