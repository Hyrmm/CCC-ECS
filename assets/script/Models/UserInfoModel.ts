import { EventManager } from "../Manager/EventManager";
import { S2C_Login } from "../Proto/pb";
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
    }

    public applyLogin() {
        this.sendMsg(EnumProtoId.C2S_Login, {})
    }

    public get userUuid(): string {
        return this.dataBase.userUuid
    }

    private parseLogin(recvData: S2C_Login): void {
        this.dataBase.userUuid = recvData.uuid
        EventManager.emit(LocalMsg.EnumLocalMsg.LoginSucess)
    }



}

interface DateBase {
    userUuid: string
}