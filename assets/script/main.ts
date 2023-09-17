import { ecs } from "./Core/ECS"
import { _decorator, Component, Node, Input, input } from 'cc';
import { RootSystem } from './System/RootSystem';
import { RenderSystem } from './System/RenderSystem';
import { MovementSystem } from "./System/MovementSystem";
import { InputListenerSystem } from "./System/InputListenerSystem"
import { LayerManager } from "./Manager/LayerManager"
import { EntityManager } from "./Manager/EntityManager"
import { AssetsManager } from "./Manager/AssetsManager";




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
        this.initAssetsManager(() => {
            this.initSystem()
            this.initLayerManager()
            this.initInputListener()
            this.initEntityManager()
        })
    }

    update(deltaTime: number) {
        this.rootSystem.execute(deltaTime)
    }



    //** 系统初始化 */
    private initSystem() {

        this.renderSystem = this.rootSystem.add(new RenderSystem())
        this.movementSystem = this.rootSystem.add(new MovementSystem())
        this.inputListenerSystem = this.rootSystem.add(new InputListenerSystem())
        console.log(`[初始化]:System 完成`)

    }

    //** 输入监听初始化 */
    private initInputListener() {
        input.on(Input.EventType.KEY_UP, this.inputListenerSystem.onKeyUp, this.inputListenerSystem);
        input.on(Input.EventType.KEY_DOWN, this.inputListenerSystem.onKeyDown, this.inputListenerSystem);
        input.on(Input.EventType.KEY_PRESSING, this.inputListenerSystem.onKeyPressing, this.inputListenerSystem);
        console.log(`[初始化]:InputListener 完成`)
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

    //** 资源管理器初始化 */
    private initAssetsManager(finishCb) {
        AssetsManager.init(finishCb)
    }



}


