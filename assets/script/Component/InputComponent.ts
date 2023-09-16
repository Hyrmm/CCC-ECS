
import { ecs } from "../Core/ECS"
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ecs.ECSDecorator.registerECSComName('InputComponent')
@ccclass('InputComponent')
export class InputComponent extends ecs.ECSComponent {

    public keyUpCode: number | null
    public keyDownCode: number | null
    public keyPresingCode: number | null

    start() {

    }

    update(deltaTime: number) {

    }
}