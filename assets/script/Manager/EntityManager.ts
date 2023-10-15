import { Prefab, instantiate, log } from "cc"
import { ecs } from "../Core/ECS"
import { LayerManager } from "../Manager/LayerManager"
import { entityConfig } from "../Config/Interface"
import { playerEntityConfig } from "../Config/Entity"
import { AssetsManager } from "./AssetsManager"





export class EntityManager {
    static entitysPool: Array<ecs.Entity> = null

    static init() {
        this.entitysPool = ecs.entityPool
        this.createEntity(playerEntityConfig)
    }


    static createEntity(entityConfig: entityConfig) {

        const entity = ecs.Entity.createEntity(entityConfig.name)

        // 绑定组件
        entity.addComs(entityConfig.components)

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



}



