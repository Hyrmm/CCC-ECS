
import { ecs } from "../../Core/ECS"
import { _decorator, Component, Node } from 'cc'
import { BaseComponent } from "./Component"
const { ccclass, property } = _decorator

@ecs.ECSDecorator.registerECSComName('PlayerComponents')
@ccclass('PlayerComponents')
export class PlayerComponent extends BaseComponent {
    public playerId: string

    start() {
        
    }

    update(deltaTime: number) {

    }
}