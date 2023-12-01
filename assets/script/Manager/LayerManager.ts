import { Node } from "cc"
import { BaseEntity } from "../Entity/Entity"
import { GEnum, GInterface } from "../Config/Enum"





export class LayerManager {

    static layersPool: Map<number, Node> = new Map()
    static playerLayer: Node = null

    static init(layerList: Array<{ id: number, layer: Node }>): void {
        this.initSetLayer(layerList)
        this.playerLayer = this.layersPool.get(GEnum.LayerId.playerLayer)
    }

    static initSetLayer(layerList: Array<{ id: number, layer: Node }>): void {
        for (const layer of layerList) {
            this.setLayer({ id: layer.id, layer: layer.layer })
        }
    }

    static setLayer(layerConfig: GInterface.LayerConfig) {
        return this.layersPool.set(layerConfig.id, layerConfig.layer)
    }

    static getLayerById(layerId: number) {
        return this.layersPool.get(layerId)
    }

    static setEntity2Layer(layerId: number, entity: BaseEntity) {
        const targetLayer = this.layersPool.get(layerId)

        if (targetLayer) {
            targetLayer.addChild(entity)
        }
    }
}


