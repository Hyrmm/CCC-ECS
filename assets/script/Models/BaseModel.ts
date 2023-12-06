import { EventManager } from "../Manager/EventManager"
import { EnumProtoName } from "../Proto/protoMap"
import { LocalMsg } from "../Type"
import { NetManager } from "../Manager/NetManager"
export class BaseModel {
    protected dataBase: any

    public constructor() {

    }

    public initListener(): void {

    }

    public resetDatabase(): void { }

    /**
     * 注册监听消息(协议)
     * @param msgName 事件名
     * @param callback 参数
     * @param target 目标
     */
    protected regeisterListener<T extends BaseModel>(msgName: EnumProtoName, callback: (bodyData) => void, target?: T) {
        EventManager.on(msgName, callback, target ? target : this)
    }

    protected regeisterListenerLocal<T extends BaseModel>(msgName: LocalMsg.EnumLocalMsg, callback: (param) => void, target?: T) {
        EventManager.on(msgName, callback, target ? target : this)
    }

    /**
     * 发送协议消息
     * @param protoId 协议id
     * @param data 数据
     */
    protected sendMsg(protoId: number, data: any) {
        NetManager.sendData(protoId, data)
    }
}
