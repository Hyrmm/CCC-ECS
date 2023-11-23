import { Prefab, instantiate, log } from "cc"
import { ecs } from "../Core/ECS"
import { LayerManager } from "../Manager/LayerManager"
import { BaseEntity, playerEntityConfig } from "../Entity/Entity"
import { AssetsManager } from "./AssetsManager"
import { I_EntityConfig } from "../Entity/Entity"
import { PhysicalComponent } from "../Component/PhysicalComponent"





export class EntityManager {
    static entitysPool: Array<ecs.Entity> = null

    static init() {
        this.entitysPool = ecs.entityPool
        this.createEntity(playerEntityConfig)
    }


    static createEntity(entityConfig: I_EntityConfig) {

        const entity = ecs.Entity.createEntity(BaseEntity, entityConfig.name)

        // 绑定组件
        entity.addComs(entityConfig.components)

        this.setConfig(entityConfig, entity)

        // 绑定预制体
        if (entityConfig.prefebName) {
            AssetsManager.getPrefeb(`entity/${entityConfig.prefebName}`, (prefebAssets: Prefab) => {
                const prefebNode = instantiate(prefebAssets)
                entity.addChild(prefebNode)
            })
        }

        LayerManager.setEntity2Layer(entityConfig.layerId, entity)

        return entity
    }

    // 挂载数据
    static setConfig(entityConfig: I_EntityConfig, entity: BaseEntity) {
        // 速度
        if (entityConfig.velocity) {
            const physicalCom = entity.getComponent(PhysicalComponent)
            physicalCom.velocityX = entityConfig.velocity[0]
            physicalCom.velocityY = entityConfig.velocity[1]
        }
    }

    // 挂载层级
    static set2Layer() {

    }



}



