import { Prefab, instantiate, NodePool, isValid } from "cc"
import { ecs } from "../Core/ECS"
import { LayerManager } from "../Manager/LayerManager"
import { BaseEntity } from "../ECS/Entity/Entity"
import { AssetsManager } from "./AssetsManager"
import { PhysicalComponent } from "../ECS/Component/PhysicalComponent"
import { Entity, Layer } from "../Type"
import { PlayerComponents } from "../ECS/Component/PlayerComponents"





export class EntityManager {

    static init() {

    }


    static createEntity(entityConfig: Entity.TypeEntityConfig) {

        const entity = ecs.Entity.createEntity(BaseEntity, entityConfig.name)

        entity.addComs(entityConfig.components)

        this.bindEntityConfig(entityConfig, entity)
        this.setEntity2Layer(entityConfig.layerId, entity)

        return entity
    }

    static deleteEntity(entity: BaseEntity) {
        ecs.Entity.deleteEntity(entity)
    }

    static deletePlayerEntity(userUuid: string) {
        const entitys = ecs.ECSQuery.withComsBoth(PlayerComponents)
        for (const entity of entitys) {
            const playerCom = entity.getComponent(PlayerComponents)
            if (playerCom.playerId == userUuid) {
                return this.deleteEntity(entity as BaseEntity)
            }
        }
    }

    /**
     * 绑定实体配置
     * @param entityConfig 
     * @param entity 
     */
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
                if (isValid(entity)) {
                    entity.addChild(prefebNode)
                }
            })
        }
    }

    /**
     * 放置到对应层级上
     * @param layerId 
     * @param entity 
     */
    static setEntity2Layer(layerId: Layer.EnumLayerId, entity: BaseEntity) {
        LayerManager.setEntity2Layer(layerId, entity)
    }






}



