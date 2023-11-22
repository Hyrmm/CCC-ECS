import { ecs } from "./Core/ECS"
import { _decorator, Component, Node, Input, input, game, Game } from 'cc';
import { RootSystem } from './System/RootSystem';
import { RenderSystem } from './System/RenderSystem';
import { MovementSystem } from "./System/MovementSystem";
import { InputListenerSystem } from "./System/InputListenerSystem"
import { LayerManager } from "./Manager/LayerManager"
import { EntityManager } from "./Manager/EntityManager"
import { AssetsManager } from "./Manager/AssetsManager";




import { LayerIdEnum } from "./Config/Enum"
import { NetManager } from "./Manager/NetManager";
import { ModelsManager } from "./Manager/ModelsManager";
import { FramesManager } from "./Manager/FramesManager";
import { SystemManager } from "./Manager/SystemManager";


const { ccclass, property } = _decorator;

@ccclass('main')
export class main extends Component {

    @property(Node)
    playerLayer: Node = null



    private rootSystem: RootSystem = new RootSystem()
    private renderSystem: RenderSystem | null
    private movementSystem: MovementSystem | null
    private inputListenerSystem: InputListenerSystem | null


    protected onLoad(): void {
        this.initAssetsManager(() => {
            this.initGameEvent()
            this.initLayerManager()
            this.initEntityManager()
            this.initNetManager()
            this.initModelsManager()
            this.initFramesManager()
            this.initSystemManager()
            this.initInputListener()
            this.initSystem()
        })
    }

    update(deltaTime: number) {
        this.rootSystem.execute(deltaTime)
    }





    //** 输入监听初始化 */
    private initInputListener() {
        input.on(Input.EventType.KEY_UP, this.inputListenerSystem.onKeyUp, this.inputListenerSystem);
        input.on(Input.EventType.KEY_DOWN, this.inputListenerSystem.onKeyDown, this.inputListenerSystem);
        input.on(Input.EventType.KEY_PRESSING, this.inputListenerSystem.onKeyPressing, this.inputListenerSystem);
    }

    //** 游戏事件监听初始化 */
    private initGameEvent() {
        game.on(Game.EVENT_SHOW, () => {
            NetManager.reConnect()
        })
    }

    //** 系统管理器初始化 */
    private initSystemManager() {
        this.renderSystem = SystemManager.registerSystem(RenderSystem)
        this.movementSystem = SystemManager.registerSystem(MovementSystem)
        this.inputListenerSystem = SystemManager.registerSystem(InputListenerSystem)
    }

    //** 层级管理器初始化 */
    private initLayerManager() {
        const layerList = [{ id: LayerIdEnum.playerLayer, layer: this.playerLayer }]
        LayerManager.init(layerList)
    }

    //** 实体管理器初始化 */
    private initEntityManager() {
        EntityManager.init()
    }

    //** 资源管理器初始化 */
    private initAssetsManager(finishCb) {
        AssetsManager.init(finishCb)
    }

    //** 网络管理器初始化 */
    private initNetManager() {
        NetManager.init()
    }

    //** 模型层管理器初始化 */
    private initModelsManager() {
        ModelsManager.init()
    }

    //** 帧同步管理器初始化 */
    private initFramesManager() {
        FramesManager.init()
    }

    //** 系统初始化 */
    private initSystem() {
        this.renderSystem = this.rootSystem.add(this.renderSystem)
        this.movementSystem = this.rootSystem.add(this.movementSystem)
        this.inputListenerSystem = this.rootSystem.add(this.inputListenerSystem)
    }
}


