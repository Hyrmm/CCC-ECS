
import { ecs } from "../../Core/ECS"
import { _decorator, Component, Node } from 'cc'
import { BaseComponent } from "./Component"
const { ccclass, property } = _decorator

@ecs.ECSDecorator.registerECSComName('InputComponent')
@ccclass('InputComponent')
export class InputComponent extends BaseComponent {

    public keyPresingCode: Array<number> = []

    start() {

    }

    update(deltaTime: number) {

    }
}