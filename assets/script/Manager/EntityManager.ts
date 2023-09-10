import { ecs } from "../Core/ECS"
import { LayerManager } from "../Manager/LayerManager"
import { entityConfig } from "../Config/Interface"





export class EntityManager {
    static entitysPool: Array<ecs.Entity> = null

    static init() {
        this.entitysPool = ecs.entityPool
    }


    static createEntity(entityConfig: entityConfig) {

        const entity = ecs.Entity.createEntity(entityConfig.name)

        entity.addComs(entityConfig.components)

        LayerManager.setEntity2Layer(entityConfig.layerId, entity)

        return entity
    }



}



