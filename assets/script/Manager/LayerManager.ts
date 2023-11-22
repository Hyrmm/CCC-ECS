import { Node } from "cc"
import { ecs } from '../Core/ECS'
import { I_LayerConfig } from "../Config/Interface"
import { LayerIdEnum } from "../Config/Enum"





export class LayerManager {

    static layersPool: Map<number, Node> = new Map()
    static playerLayer: Node = null

    static init(layerList: Array<{ id: number, layer: Node }>): void {
        this.initSetLayer(layerList)
        this.playerLayer = this.layersPool.get(LayerIdEnum.playerLayer)
    }

    static initSetLayer(layerList: Array<{ id: number, layer: Node }>): void {
        for (const layer of layerList) {
            this.setLayer({ id: layer.id, layer: layer.layer })
        }
    }

    static setLayer(layerConfig: I_LayerConfig) {
        return this.layersPool.set(layerConfig.id, layerConfig.layer)
    }

    static getLayerById(layerId: number) {
        return this.layersPool.get(layerId)
    }

    static setEntity2Layer(layerId: number, entity: ecs.Entity) {
        const targetLayer = this.layersPool.get(layerId)

        if (targetLayer) {
            targetLayer.addChild(entity)
        }
    }
}


