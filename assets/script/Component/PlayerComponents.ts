
import { ecs } from "../Core/ECS"
import { _decorator, Component, Node } from 'cc'
import { BaseComponent } from "./Component"
const { ccclass, property } = _decorator

@ecs.ECSDecorator.registerECSComName('PlayerComponents')
@ccclass('PlayerComponents')
export class PlayerComponents extends BaseComponent {
    public playerId: number = 10086

    start() {

    }

    update(deltaTime: number) {

    }
}