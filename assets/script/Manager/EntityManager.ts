import { Prefab, instantiate, log } from "cc"
import { ecs } from "../Core/ECS"
import { LayerManager } from "../Manager/LayerManager"
import { BaseEntity, playerEntityConfig } from "../Config/Entity"
import { AssetsManager } from "./AssetsManager"
import { I_EntityConfig } from "../Config/Entity"





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

    // 挂载配置
    static setConfig(entityConfig: I_EntityConfig, entity: BaseEntity) {
        if (entityConfig.velocity) {
            
        }
    }

    // 挂载层级
    static set2Layer() {

    }



}



