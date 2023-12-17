import { ecs } from "../../Core/ECS"
import { BaseComponent } from "./Component"
import { _decorator, Vec3, Vec2 } from 'cc'
const { ccclass, property } = _decorator

@ecs.ECSDecorator.registerECSComName('PositionComponent')
@ccclass('PositionComponent')
export class PositionComponent extends BaseComponent {
    public position: Vec3 = new Vec3(0, 0, 0)
    public shadowPosition: Vec3 = new Vec3(0, 0, 0)
}