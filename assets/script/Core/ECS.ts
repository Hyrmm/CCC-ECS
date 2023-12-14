import { Component, Node, NodePool } from "cc"



var a = 1
export module ecs {
    type systemPool = Array<System>
    type entityPool = Array<Entity>
    type ctor<T = unknown> = new (...args: any[]) => T

    window['ecs'] = ecs

    const systemName2InstantceMap: Map<string, System> = new Map()
    export const systemPool: systemPool = []
    export const entityPool: entityPool = []
    export const entityPoolMap: Map<string, Entity> = new Map()
    export const comName2EntityPool: Map<string, entityPool> = new Map()

    export class System {
        /**
         * 注册系统
         * @param systemCls 基于ecs.system的泛型类(构造函数)
         * @returns 
         */
        static registSystem<T extends System>(systemCls: ctor<T>): T {
            if (systemName2InstantceMap.has(systemCls.name)) {
                return systemName2InstantceMap.get(systemCls.name) as T
            }
            const systemInstance = new systemCls()
            systemName2InstantceMap.set(systemCls.name, systemInstance)

            return systemInstance
        }

        /**
         * 获取系统实例
         * @param systemCls 基于ecs.system的泛型类(构造函数)
         * @returns 
         */
        static getSystem<T extends System>(systemCls: ctor<T>): T {

        }

        public priority: number
        protected lastUpdateTime: number

        public update(dt?: number): void {
        }
    }

    export class Entity extends Node {
        public entityId: number
        public ECSComponents: Array<ECSComponent> = []
        public name2ECSComponent: Map<string, ECSComponent> = new Map()

        constructor(name?: string) {
            super(name)
        }

        /**
         * 创建实体
         * @param entityCls 实体类,用于自己拓展实体类，通过继承ecs.Entity即可
         * @param entityName 实体名称
        */
        static createEntity<T extends Entity>(entityCls: ctor<T>, entityName: string): T {
            const entity = new entityCls(entityName)
            entity.entityId = entityPool.push(entity) - 1
            entityPoolMap.set(entity.uuid, entity)
            return entity
        }

        /**
         * 删除实体
         * @param entity 实体,泛型接受继承ecs.Entity
         */
        static deleteEntity<T extends Entity>(entity: T) {
            entityPool[entity.entityId] = null
            entityPoolMap.delete(entity.uuid)

            // 组件分类查询组件池清除
            for (const comName of entity.name2ECSComponent.keys()) {
                const comGroupEntityPool = comName2EntityPool.get(comName)
                const newEntityPool = comGroupEntityPool.filter((poolEntity) => poolEntity.entityId != entity.entityId)
                comName2EntityPool.set(comName, newEntityPool)
            }

            entity.destroy()
        }

        /**
         * 向实体添加组件
         * @param comCls 组件类
        */
        public addCom<T extends ECSComponent>(comCls: ctor<T>): void {
            if (this.name2ECSComponent.has(comCls['comName'])) return

            const comInstance = this.addComponent(comCls)

            comInstance.entity = this

            this.ECSComponents.push(comInstance)
            this.name2ECSComponent.set(comCls['comName'], comInstance)

            if (comName2EntityPool.has(comCls['comName'])) {
                comName2EntityPool.get(comCls['comName']).push(this)
            } else {
                comName2EntityPool.set(comCls['comName'], [this])
            }
        }

        /**
         * 向实体添加组件
         * @param comCls 组件类
        */
        public addComs<T extends ECSComponent>(comCls: Array<ctor<T>>): void {
            for (const componentCtor of comCls) {
                this.addCom(componentCtor)
            }
        }

        /**
         * 删除实体上组件
         * @param comCls 组件类
        */
        public delCom<T extends ECSComponent>(comCls: ctor<T>) {
            if (!this.name2ECSComponent.has(comCls['comName'])) return

            const delCom = this.name2ECSComponent.get(comCls['comName'])

            // 实体上组件缓存清除
            this.name2ECSComponent.delete(comCls['comName'])

            // 组件分类查询组件池清除
            const comGroupEntityPool = comName2EntityPool.get(comCls['comName'])
            const newEntityPool = comGroupEntityPool.filter((entity) => entity.entityId != this.entityId)
            comName2EntityPool.set(comCls['comName'], newEntityPool)


            delCom.destroy()
        }

        /**
         * 获取实体上组件
         * @param comCls 组件类
        */
        public getCom<T extends ECSComponent>(comCls: ctor<T>): T {
            return this.name2ECSComponent.get(comCls['comName']) as T
        }

        /**
         * 实体上是否有该组件
         * @param comCls 组件类
        */
        public hasCom(comCls: ctor<Component>): boolean {
            return this.name2ECSComponent.has(comCls['comName'])
        }

    }

    export class ECSComponent extends Component {
        static comName: string = ""
        public entity: Entity
    }

    export class ECSDecorator {
        static registerECSComName(name: string) {
            return function <T extends { new(...args: any[]): {} }>(constructor: T) {
                const cls = class extends constructor {
                    static comName = name;
                }
                // ecs.comName2EntityPool.set(name, cls)
                return cls
            };
        }
    }

    export class ECSQuery {

        /**
         * 持有某个组件
         * @param comCtors 组件类
        */
        static withCom(comCtor: ctor<ECSComponent>): Array<Entity> {
            return comName2EntityPool.get(comCtor['comName']) || []
        }

        /**
         * 持有某些组件
         * @param comCtors 组件类
        */
        static withComs(...comCtors: ctor<ECSComponent>[]): Array<Entity> {
            let resultEntitys = []

            comCtors.forEach(
                (comCtor) => {
                    resultEntitys = resultEntitys.concat(this.withCom(comCtor))
                }
            )

            return resultEntitys
        }

        /**
         * 同时持有某些组件
         * @param comCtors 组件类
        */
        static withComsBoth(...comCtors: ctor<ECSComponent>[]): Array<Entity> {
            let resultEntitys = []

            const checkCount = comCtors.length
            const preEntitysArray = this.withComs(...comCtors)
            const record: Map<Entity, number> = new Map()

            for (const entity of preEntitysArray) {
                if (record.has(entity)) {
                    record.set(entity, record.get(entity) + 1)
                } else {
                    record.set(entity, 1)
                }
            }

            for (const entity of record.keys()) {
                if (record.get(entity) >= checkCount) {
                    resultEntitys.push(entity)
                }
            }

            return resultEntitys
        }

        /**
         * 持有某些组件但不包含某个组件
         * @param comCtors 组件类
        */
        static withComsButWithoutCom(comCtors: Array<ctor<ECSComponent>>, withoutCom: ctor<ECSComponent>) {
            const withComs = this.withComs(...comCtors)
            const resultEntitys = withComs.filter((entity) => entity.hasCom(withoutCom))
            return resultEntitys
        }

        /**
         * 仅同时持有某些组件
         * @param comCtors 组件类
         * @returns 
         */
        static withComsBothOnly(...comCtors: ctor<ECSComponent>[]): Array<Entity> {
            let resultEntitys = this.withComsBoth(...comCtors)
            return resultEntitys.filter((entity) => entity.ECSComponents.length == comCtors.length)
        }
    }


}



