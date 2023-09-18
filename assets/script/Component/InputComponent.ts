
import { ecs } from "../Core/ECS"
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ecs.ECSDecorator.registerECSComName('InputComponent')
@ccclass('InputComponent')
export class InputComponent extends ecs.ECSComponent {

    public keyPresingCode: Array<number> = []

    start() {

    }

    update(deltaTime: number) {

    }
}