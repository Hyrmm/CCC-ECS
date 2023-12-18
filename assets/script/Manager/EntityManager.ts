import { Prefab, instantiate, NodePool, isValid, Texture2D, Node, Sprite } from "cc"
import { ecs } from "../Core/ECS"
import { LayerManager } from "../Manager/LayerManager"
import { BaseEntity } from "../ECS/Entity/Entity"
import { AssetsManager } from "./AssetsManager"
import { PhysicalComponent } from "../ECS/Component/PhysicalComponent"
import { Entity, Input, Layer } from "../Type"
import { PlayerComponent } from "../ECS/Component/PlayerComponent"
import { AnimateComponent, InputComponent } from "../ECS/Component/ECSComponent"





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

    static delEntity(entity: BaseEntity) {
        const entityConfig = entity.config
        ecs.Entity.deleteEntity(entity)
    }
    /**
     * 移除指定玩家类型实体，通过玩家uuid
     * @param userUuid 
     * @returns 
     */
    static delEntityByUserUuid(userUuid: string) {
        const entitys = ecs.ECSQuery.withComsBoth(PlayerComponent)
        for (const entity of entitys) {
            const playerCom = entity.getCom(PlayerComponent)
            if (playerCom.playerId == userUuid) {
                return this.delEntity(entity as BaseEntity)
            }
        }
    }
    /**
     * 移除指定layer上所有实体
     * @param layerId 层级id
     */
    static delEntityByLayerId(layerId: Layer.EnumLayerId) {
        const layer = LayerManager.getLayerById(layerId)
        const entitys = layer.children
        for (const entity of entitys) {
            this.delEntity(entity as BaseEntity)
        }
    }
    /**
     * 移除指定类型的实体，通过实体配置指定
     * @param entityConfig 实体配置
     */
    static delEntityByEntityConfig(entityConfig: Entity.TypeEntityConfig) {
        const ruledEntitys = ecs.ECSQuery.withComsBothOnly(...entityConfig.components)
        for (const entity of ruledEntitys) {
            this.delEntity(entity as BaseEntity)
        }
    }

    /**
     * 绑定实体配置
     * @param entityConfig 
     * @param entity 
     */
    static bindEntityConfig(entityConfig: Entity.TypeEntityConfig, entity: BaseEntity) {
        entity.config = entityConfig
        // 速度
        if (entityConfig.velocity) {
            const physicalCom = entity.getCom(PhysicalComponent)
            physicalCom.velocityX = entityConfig.velocity[0]
            physicalCom.velocityY = entityConfig.velocity[1]
        }

        // 预制体
        if (entityConfig.prefebName) {
            AssetsManager.createInstancePrefeb(`entity/${entityConfig.prefebName}`, (prefebNode: Node) => {
                // 实体
                if (isValid(entity)) {
                    prefebNode.name = `entityPrefeb-${entityConfig.prefebName}`
                    entity.addChild(prefebNode)
                } else {
                    prefebNode.destroy()
                }

                // 帧动画(帧动画预先在实体预制体上挂载好)
                if (isValid(entity) && entityConfig.frameAnimate) {
                    const frameSheetName = entityConfig.frameAnimate.frameAnimateSheetName
                    const animateCom = entity.getCom(AnimateComponent)
                    animateCom.isFrameSheetLoaded = true
                    animateCom.animatesMap = entityConfig.frameAnimate.animatesMap
                    animateCom.frameSheetRectCnt = entityConfig.frameAnimate.frameSheetRectCnt
                    animateCom.defaultAnimateName = entityConfig.frameAnimate.defaultAnimateName
                    animateCom.frameAnimateSpriteNode = prefebNode.getChildByName("sp_frameAnimate")
                    animateCom.playAnimate(animateCom.defaultAnimateName)
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



    /**
    * 获取实体朝向
    * @param entity 实体实例
    */
    static getEntityDirection(entity: ecs.Entity): { directionX: number, directionY: number } {

        let directionX, directionY
        const inputCom = entity.getCom(InputComponent)
        const curPresingKeyCode = inputCom.keyPresingCode[inputCom.keyPresingCode.length - 1]

        switch (curPresingKeyCode) {
            case Input.EnumDirKeyCode.Up:
                {
                    directionX = 0
                    directionY = 1
                    break
                }
            case Input.EnumDirKeyCode.Down:
                {
                    directionX = 0
                    directionY = -1
                    break
                }
            case Input.EnumDirKeyCode.Left:
                {
                    directionX = -1
                    directionY = 0
                    break
                }
            case Input.EnumDirKeyCode.Right:
                {
                    directionX = 1
                    directionY = 0
                    break
                }
            default:
                {
                    directionX = 0
                    directionY = 0
                }
        }

        return { directionX, directionY }
    }


}



