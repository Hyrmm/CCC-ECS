import { ecs } from "./Core/ECS"
import { _decorator, Component, Node, Input, input } from 'cc';
import { RootSystem } from './System/RootSystem';
import { RenderSystem } from './System/RenderSystem';
import { MovementSystem } from "./System/MovementSystem";
import { InputListenerSystem } from "./System/InputListenerSystem"
import { LayerManager } from "./Manager/LayerManager"
import { EntityManager } from "./Manager/EntityManager"




import { LayerIdEnum } from "./Config/Enum"


const { ccclass, property } = _decorator;

@ccclass('main')
export class main extends Component {

    @property(Node)
    playerLayer = null



    private rootSystem: RootSystem = new RootSystem()
    private renderSystem: RenderSystem | null
    private movementSystem: MovementSystem | null
    private inputListenerSystem: InputListenerSystem | null


    protected onLoad(): void {

        this.initSystem()
        this.initLayerManager()
        this.initInputListener()
        this.initEntityManager()
    }

    update(deltaTime: number) {
        this.rootSystem.execute(deltaTime)
    }



    //** 系统初始化 */
    private initSystem() {

        this.renderSystem = this.rootSystem.add(new RenderSystem())
        this.movementSystem = this.rootSystem.add(new MovementSystem())
        this.inputListenerSystem = this.rootSystem.add(new InputListenerSystem())

    }

    //** 输入监听初始化 */
    private initInputListener() {
        input.on(Input.EventType.KEY_UP, this.inputListenerSystem.onKeyUp, this.inputListenerSystem);
        input.on(Input.EventType.KEY_DOWN, this.inputListenerSystem.onKeyDown, this.inputListenerSystem);
        input.on(Input.EventType.KEY_PRESSING, this.inputListenerSystem.onKeyPressing, this.inputListenerSystem);
    }

    //** 层级管理器初始化 */
    private initLayerManager() {
        LayerManager.setLayer({ id: LayerIdEnum.playerLayer, layer: this.playerLayer })
        LayerManager.init()
    }

    //** 实体管理器初始化 */
    private initEntityManager() {
        EntityManager.init()
    }



}


