import { RootSystem } from './ECS/System/RootSystem'
import { RenderSystem } from './ECS/System/RenderSystem'
import { MovementSystem } from "./ECS/System/MovementSystem"
import { InputListenerSystem } from "./ECS/System/InputListenerSystem"
import { NetManager } from "./Manager/NetManager"
import { ModelsManager } from "./Manager/ModelsManager"
import { FramesManager } from "./Manager/FramesManager"
import { LayerManager } from "./Manager/LayerManager"
import { EntityManager } from "./Manager/EntityManager"
import { AssetsManager } from "./Manager/AssetsManager"
import { SystemManager } from "./Manager/SystemManager"

import { Layer } from './Type'
import { _decorator, Component, Node, Input, input, game, Game } from 'cc'
import { UiManager } from './Manager/UiManager'
const { ccclass, property } = _decorator

@ccclass
export class Main extends Component {

    @property(Node)
    playerLayer: Node = null

    @property(Node)
    uiLayer: Node = null




    private rootSystem: RootSystem | null
    private renderSystem: RenderSystem | null
    private movementSystem: MovementSystem | null
    private inputListenerSystem: InputListenerSystem | null


    protected onLoad(): void {
        this.initAssetsManager(() => {
            this.initSystemManager()
            this.initNetManager()
            this.initModelsManager()
            this.initFramesManager()
            this.initLayerManager()
            this.initEntityManager()
            this.initGameEvent()
            this.initInputListener()
            UiManager.openUiView("LoginView")
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
        this.rootSystem = SystemManager.registSystem(RootSystem)
        this.renderSystem = SystemManager.registSystem(RenderSystem)
        this.movementSystem = SystemManager.registSystem(MovementSystem)
        this.inputListenerSystem = SystemManager.registSystem(InputListenerSystem)

        this.rootSystem.mainSceneCom = this

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
        const layerList = [
            { id: Layer.EnumLayerId.UiLayer, layer: this.uiLayer },
            { id: Layer.EnumLayerId.PlayerLayer, layer: this.playerLayer },
        ]
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
        game.on(Game.EVENT_HIDE, () => {

        })
    }
}


