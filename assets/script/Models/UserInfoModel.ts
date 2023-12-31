import { EventManager } from "../Manager/EventManager";
import { S2C_Login } from "../Proto/proto";
import { EnumProtoId, EnumProtoName } from "../Proto/protoMap";
import { LocalMsg } from "../Type";
import { BaseModel } from "./BaseModel";

export class UserInfoModel extends BaseModel {
    protected dataBase: DateBase = { userUuid: "" }

    public resetDatabase(): void {
        this.dataBase = { userUuid: "" }
    }

    public initListener(): void {
        this.regeisterListener(EnumProtoName.S2C_Login, this.parseLogin, this)

        this.regeisterListenerLocal(LocalMsg.EnumLocalMsg.SocketDisconnect, this.onSocketDisconnect, this)
    }

    public applyLogin() {
        this.sendMsg(EnumProtoId.C2S_Login, {})
    }

    public applyPlayerJoin() {
        this.sendMsg(EnumProtoId.C2S_PlayerJoin, {})
    }

    public get userUuid(): string {
        return this.dataBase.userUuid
    }

    private parseLogin(recvData: S2C_Login): void {
        this.dataBase.userUuid = recvData.uuid
        EventManager.emit(LocalMsg.EnumLocalMsg.LoginSucess)
        this.applyPlayerJoin()
    }

    private onSocketDisconnect() {
        this.resetDatabase()
    }


}

interface DateBase {
    userUuid: string
}