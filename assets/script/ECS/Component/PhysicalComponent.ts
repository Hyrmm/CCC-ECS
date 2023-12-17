import { ecs } from "../../Core/ECS"
import { _decorator } from 'cc'
import { BaseComponent } from "./Component"
const { ccclass, property } = _decorator


@ecs.ECSDecorator.registerECSComName('PhysicalComponent')
@ccclass('PhysicalComponent')
export class PhysicalComponent extends BaseComponent {
    public velocityX: number = 1
    public velocityY: number = 1


}