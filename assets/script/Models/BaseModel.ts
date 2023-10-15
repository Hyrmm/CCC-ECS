import { EventManager } from "../Manager/EventManager"
export class BaseModel {

    protected dataBase: any

    /**
     * 注册监听消息
     * @param msgName 事件名
     * @param callback 参数
     * @param target 目标
     */
    protected regeisterListener<T extends BaseModel>(msgName: string, callback, target: T) {
        const cb = function () {

        }

        EventManager.on(msgName, cb.bind(target), target)
    }
}