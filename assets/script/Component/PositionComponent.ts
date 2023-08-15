import { ecs } from "../Core/ECS"
import { _decorator, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ecs.ECSDecorator.registerECSComName('PositionComponent')
@ccclass('PositionComponent')
export class PositionComponent extends ecs.ECSComponent {
    public position: Vec3 = new Vec3(0, 0)

    start() {

    }

    update(deltaTime: number) {

    }
}