import { Node } from "cc"
import { ecs } from '../Core/ECS'
import { layerConfig } from "../Config/Interface"
import { LayerIdEnum } from "../Config/Enum"





export class LayerManager {
    
    static layersPool: Map<number, Node> = new Map()
    static playerLayer: Node = null

    static init(): void {
        this.playerLayer = this.layersPool.get(LayerIdEnum.playerLayer)
    }

    static setLayer(layerConfig: layerConfig) {
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


