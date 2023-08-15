import { ecs } from "../Core/ECS"
import { _decorator } from 'cc';
const { ccclass, property } = _decorator;

@ecs.ECSDecorator.registerECSComName('RenderComponent')
@ccclass('RenderComponent')
export class RenderComponent extends ecs.ECSComponent {
    start() {

    }

    update(deltaTime: number) {

    }
}