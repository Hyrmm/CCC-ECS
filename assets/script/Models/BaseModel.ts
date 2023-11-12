import { EventManager } from "../Manager/EventManager"
import { EnumProtoName } from "../Proto/protoMap"
export class BaseModel {
    public initListener(): void {

    }
    /**
     * 注册监听消息
     * @param msgName 事件名
     * @param callback 参数
     * @param target 目标
     */
    protected regeisterListener<T extends BaseModel>(msgName: EnumProtoName, callback: (bodyData) => void, target?: T) {
        EventManager.on(msgName, callback, target ? target : this)
    }
}