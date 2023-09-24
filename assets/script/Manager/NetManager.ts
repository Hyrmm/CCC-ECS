import { error } from "cc"
import * as pb from "../Proto/pb"
import { protoId2Name } from "../Proto/protoMap"
export class NetManager {
    static webSocket: WebSocket

    static heartbeatTimer: number = 5000
    static heartbeatInterval: number




    static init() {
        this.connect()
    }





    static connect() {
        this.webSocket = new WebSocket("ws://127.0.0.1:8888")
        const self = this;
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
            self.onMessage(ev)
        }
    }

    static reconnect() {
        if (this.webSocket) {
            this.webSocket = null
        }

        this.connect()

    }


    static onOpen(ev: Event) {
        // 心跳检测
        this.heartbeatInterval = setInterval(this.heartbeat.bind(this), this.heartbeatTimer)

    }
    static onError(ev: Event) {
        clearInterval(this.heartbeatInterval);

    }
    static onClose(ev: Event) {
        clearInterval(this.heartbeatInterval);
        this.connect()
    }

    static onMessage(ev: Event) {

    }

    static heartbeat() {
        const data: pb.C2S_HeartBeat = { serverTime: 100 }

        this.sendData(1001, data)
    }
    static sendData(protoId: number, data: any) {
        const protoName = protoId2Name[protoId]
        if (!protoName) return

        const dataBody = pb[`encode${protoName}`](data)
        const commonData = pb.encodeCommonData({ protoId: protoId, body: dataBody })
        this.webSocket.send(commonData)
        console.log(`[sendData]:${protoId}|${protoName}:`, data)
    }




}