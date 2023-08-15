import { Node } from 'cc';
import { ecs } from '../Core/ECS';





export class LayerManager {
    static layersPool: Map<number, Node> = new Map()

    init(): void {

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

interface layerConfig {
    id: number
    layer: Node
}
