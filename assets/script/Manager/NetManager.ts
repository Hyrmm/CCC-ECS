import { error } from "cc"
import * as pb from "../Proto/pb"
import { protoId2Name, protoName2Id, EnumProtoName } from "../Proto/protoMap"
import { EventManager } from "./EventManager"
export class NetManager {
    static webSocket: WebSocket

    static heartbeatTimer: number = 5000
    static heartbeatInterval: number
    static serverTiem: number

    static init() {
        this.doConnect()
    }


    static onOpen(ev: Event) {
        // 心跳检测
        if (this.heartbeatInterval) {
            this.clearHearbeatInterval()
        }

        this.heartbeatInterval = setInterval(this.sendHeartbeat.bind(this), this.heartbeatTimer)
    }

    static onError(ev: Event) {
        this.clearHearbeatInterval()
    }

    static onClose(ev: Event) {
        console.log(`[clientClose]:`, ev)
        this.clearHearbeatInterval()
    }

    static doConnect() {
        this.webSocket = new WebSocket("ws://127.0.0.1:8888")
        this.webSocket.binaryType = "arraybuffer"
        const self = this
        this.webSocket.onopen = (ev) => {
            self.onOpen(ev)
        }
        this.webSocket.onclose = (ev) => {
            self.onClose(ev)
        }
        this.webSocket.onerror = (ev) => {
            self.onError(ev)
        }
        this.webSocket.onmessage = (ev) => {
            self.recvData(ev)
        }
    }

    static reConnect() {
        console.log(`[reConnect]:${this.webSocket}`)
        if (this.webSocket && this.webSocket.readyState != this.webSocket.OPEN) {
            this.webSocket = null
            this.doConnect()
        }

    }

    static recvData(ev: MessageEvent) {
        const commonData = pb.decodeCommonData(new Uint8Array(ev.data as ArrayBuffer))
        const protoId = commonData.protoId
        const protoName = protoId2Name[protoId]
        if (!protoName) return console.error("[recvData]协议不存在!")

        const bodyData = pb[`decode${protoName}`](commonData.body)

        // 心跳特殊处理
        if (protoId == 1000) {
            this.recvHeartbeat(bodyData as pb.C2S_HeartBeat)
        }

        // 分发协议消息
        EventManager.emit(protoName, bodyData)

        const dirtyProtoList = [protoName2Id[EnumProtoName.S2C_Frames]]
        if (!dirtyProtoList.includes(protoId)) {
            console.log("%c↓", "color:red;", `[recvData]:${protoId}|${protoName}:`, bodyData)
        }

    }

    static sendData(protoId: number, data: any) {
        const protoName = protoId2Name[protoId]

        if (!protoName) return console.error("[sendData]协议不存在!")

        const dataBody = pb[`encode${protoName}`](data)
        const commonData = pb.encodeCommonData({ protoId: protoId, body: dataBody })
        this.webSocket.send(commonData)

        console.log("%c↑", "color: green;", `[sendData]:${protoId}|${protoName}:`, data)
    }

    static sendHeartbeat() {
        const data: pb.C2S_HeartBeat = { serverTime: this.serverTiem }
        this.sendData(1001, data)
    }

    static recvHeartbeat(data: pb.C2S_HeartBeat) {
        this.serverTiem = data.serverTime
    }

    static clearHearbeatInterval() {
        clearInterval(this.heartbeatInterval)
        this.heartbeatInterval = 0
    }

}