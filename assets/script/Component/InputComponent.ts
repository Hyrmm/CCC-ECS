import { ecs } from "../Core/ECS"
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ecs.ECSDecorator.registerECSComName('InputComponent')
@ccclass('InputComponent')
export class InputComponent extends ecs.ECSComponent {
    
    start() {

    }

    update(deltaTime: number) {

    }
}