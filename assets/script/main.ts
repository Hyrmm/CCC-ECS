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



    private rootSystem: RootSystem | null
    private renderSystem: RenderSystem | null
    private movementSystem: MovementSystem | null
    private inputListenerSystem: InputListenerSystem | null


    protected onLoad(): void {
        this.initAssetsManager(() => {
            this.initSystemManager()
            this.initRootSystem()
            this.initNetManager()
            this.initModelsManager()
            this.initFramesManager()
            this.initLayerManager()
            this.initEntityManager()
            this.initGameEvent()
            this.initInputListener()
        })
    }

    update(deltaTime: number) {
        if (this.rootSystem) {
            this.rootSystem.execute(deltaTime)
        }
    }

    //** 资源管理器初始化 */
    private initAssetsManager(finishCb) {
        AssetsManager.init(finishCb)
    }

    //** 系统管理器初始化 */
    private initSystemManager() {
        this.rootSystem = SystemManager.registerSystem(RootSystem)
        this.renderSystem = SystemManager.registerSystem(RenderSystem)
        this.movementSystem = SystemManager.registerSystem(MovementSystem)
        this.inputListenerSystem = SystemManager.registerSystem(InputListenerSystem)
    }

    //** 根系统初始化 */
    private initRootSystem() {
        this.rootSystem.addSystem(this.renderSystem)
        this.rootSystem.addSystem(this.movementSystem)
        this.rootSystem.addSystem(this.inputListenerSystem)
    }

    //** 网络管理器初始化 */
    private initNetManager() {
        NetManager.init()
    }

    //** 模型层管理器初始化 */
    private initModelsManager() {
        ModelsManager.init()
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

    //** 帧同步管理器初始化 */
    private initFramesManager() {
        FramesManager.init()
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
}


