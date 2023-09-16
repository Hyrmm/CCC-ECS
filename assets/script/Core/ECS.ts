/*
 * @Author: hyrm 1358188945@qq.com
 * @Date: 2023-08-06 15:02:17
 * @LastEditors: hyrm 1358188945@qq.com
 * @LastEditTime: 2023-09-16 21:14:03
 * @FilePath: \MyGame\assets\script\core\ECS.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Component, Node } from "cc"





export module ecs {
    type comName = string
    type name2ECSComponent<T> = Map<string, T>

    type systemPool = Array<System>
    type entityPool = Array<Entity>

    type ctor<T = unknown> = new (...args: any[]) => T;

    interface ICom {
        entity: Entity
    }

    window['ecs'] = ecs

    export const systemPool: systemPool = []
    export const entityPool: entityPool = []

    export const comName2EntityPool: Map<comName, entityPool> = new Map()

    export class System {
        public priority: number
        protected lastUpdateTime: number
        public update(dt?: number): void {
        }
    }

    export class Entity extends Node {
        public entityId: number

        private ECSComponents: Array<ECSComponent> = []
        private name2ECSComponent: Map<string, ECSComponent> = new Map()

        constructor(name?: string) {
            super(name)
        }

        static createEntity(entityName: string): Entity {
            const entity = new Entity(entityName)
            entity.entityId = entityPool.push(entity) - 1
            return entity
        }

        public addCom<T extends ECSComponent>(com: ctor<T>): void {
            if (this.name2ECSComponent.has(com['comName'])) return

            const comInstance = this.addComponent(com)

            comInstance.entity = this

            this.ECSComponents.push(comInstance)
            this.name2ECSComponent.set(com['comName'], comInstance)

            if (comName2EntityPool.has(com['comName'])) {
                comName2EntityPool.get(com['comName']).push(this)
            } else {
                comName2EntityPool.set(com['comName'], [this])
            }
        }

        public addComs<T extends ECSComponent>(com: Array<ctor<T>>): void {
            for (const componentCtor of com) {
                this.addCom(componentCtor)
            }
        }

        public delCom<T extends ECSComponent>(com: ctor<T>) {
            if (!this.name2ECSComponent.has(com['comName'])) return

            const delCom = this.name2ECSComponent.get(com['comName'])

            // 实体上组件缓存清除
            this.name2ECSComponent.delete(com['comName'])

            // 组件分类查询组件池清除
            const comGroupEntityPool = comName2EntityPool.get(com['comName'])
            const newEntityPool = comGroupEntityPool.filter((entity) => entity.entityId != this.entityId)
            comName2EntityPool.set(com['comName'], newEntityPool)


            delCom.destroy()
        }

        public getCom<T extends ECSComponent>(com: ctor<T>): T {
            return this.name2ECSComponent.get(com['comName']) as T
        }

        public hasCom(com: ctor<ICom>): boolean {
            return this.name2ECSComponent.has(com['comName'])
        }

    }

    export class ECSComponent extends Component implements ICom {
        static comName: string = ""
        public entity: Entity
    }

    export class ECSDecorator {
        static registerECSComName(name: string) {
            return function <T extends { new(...args: any[]): {} }>(constructor: T) {
                return class extends constructor {
                    static comName = name;
                };
            };
        }
    }

    export class ECSQuery {
        static withCom(comCtor: ctor<ICom>): Array<Entity> {
            return comName2EntityPool.get(comCtor['comName'])
        }

        static withComs(...comCtors: ctor<ICom>[]): Array<Entity> {
            let resultEntitys = []

            comCtors.forEach(
                (comCtor) => {
                    resultEntitys = resultEntitys.concat(this.withCom(comCtor))
                }
            )

            return resultEntitys
        }
        static withComsBoth(...comCtors: ctor<ICom>[]): Array<Entity> {
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

        static withComsButWithoutCom(comCtors: Array<ctor<ICom>>, withoutCom: ctor<ICom>) {

            const withComs = this.withComs(...comCtors)
            const resultEntitys = withComs.filter((entity) => entity.hasCom(withoutCom))


            return resultEntitys
        }


    }


}


