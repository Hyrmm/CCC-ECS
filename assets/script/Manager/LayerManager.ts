import { Node } from "cc"
import { Layer } from "../Type"
import { BaseEntity } from "../ECS/Entity/Entity"





export class LayerManager {

    static layersPool: Map<number, Node> = new Map()

    static uiLayer: Node = null
    static playerLayer: Node = null

    static init(layerList: Array<{ id: number, layer: Node }>): void {
        this.initSetLayer(layerList)

        this.uiLayer = this.layersPool.get(Layer.EnumLayerId.UiLayer)
        this.playerLayer = this.layersPool.get(Layer.EnumLayerId.PlayerLayer)
    }

    static initSetLayer(layerList: Array<{ id: number, layer: Node }>): void {
        for (const layer of layerList) {
            this.setLayer({ id: layer.id, layer: layer.layer })
        }
    }

    static setLayer(layerConfig: Layer.TypeLayerConfig) {
        return this.layersPool.set(layerConfig.id, layerConfig.layer)
    }

    static getLayerById(layerId: number) {
        return this.layersPool.get(layerId)
    }

    static setEntity2Layer(layerId: Layer.EnumLayerId, entity: BaseEntity) {
        const targetLayer = this.layersPool.get(layerId)

        if (targetLayer) {
            targetLayer.addChild(entity)
        }
    }

    static setUi2Layer(layerId: Layer.EnumLayerId, ui: Node) {
        const targetLayer = this.layersPool.get(layerId)
        if (targetLayer) {
            targetLayer.addChild(ui)
        }
    }

    static offEntityFromLayer(layerId: Layer.EnumLayerId, entity: BaseEntity) {
        const targetLayer = this.layersPool.get(layerId)

        if (targetLayer) {
            targetLayer.removeChild(entity)
        }
    }
}


