import { Prefab, instantiate, log } from "cc"
import { ecs } from "../Core/ECS"
import { LayerManager } from "../Manager/LayerManager"
import { BaseEntity } from "../ECS/Entity/Entity"
import { AssetsManager } from "./AssetsManager"
import { PhysicalComponent } from "../ECS/Component/PhysicalComponent"
import { Entity, Layer } from "../Type"





export class EntityManager {
    static entitysPool: Array<ecs.Entity> = null

    static init() {
        this.entitysPool = ecs.entityPool
    }


    static createEntity(entityConfig: Entity.TypeEntityConfig) {

        const entity = ecs.Entity.createEntity(BaseEntity, entityConfig.name)

        entity.addComs(entityConfig.components)

        this.bindEntityConfig(entityConfig, entity)
        this.setEntity2Layer(entityConfig.layerId, entity)

        return entity
    }

    // 绑定数据
    static bindEntityConfig(entityConfig: Entity.TypeEntityConfig, entity: BaseEntity) {
        // 速度
        if (entityConfig.velocity) {
            const physicalCom = entity.getComponent(PhysicalComponent)
            physicalCom.velocityX = entityConfig.velocity[0]
            physicalCom.velocityY = entityConfig.velocity[1]
        }

        // 预制体
        if (entityConfig.prefebName) {
            AssetsManager.getPrefeb(`entity/${entityConfig.prefebName}`, (prefebAssets: Prefab) => {
                const prefebNode = instantiate(prefebAssets)
                prefebNode.name = `entity/${entityConfig.prefebName}`
                entity.addChild(prefebNode)
            })
        }
    }

    // 挂载层级
    static setEntity2Layer(layerId: Layer.EnumLayerId, entity: BaseEntity) {
        LayerManager.setEntity2Layer(layerId, entity)
    }



}



