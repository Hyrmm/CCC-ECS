import { LayerIdEnum } from "../Config/Enum"
import { LayerManager } from "../Manager/LayerManager"
import { ecs } from "../Core/ECS"



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

type ctor<T = unknown> = new (...args: any[]) => T;
export interface entityConfig {
    name: string
    layerId: number
    components: Array<ctor<ecs.ECSComponent>>
}