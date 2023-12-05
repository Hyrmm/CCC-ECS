import { FramesModel } from "../Models/FramesModel"
import { UserInfoModel } from "../Models/UserInfoModel"
import { ModelsManager } from "./ModelsManager"

export class CleanerManaget {

    /**
     * 断开连接清理
     */
    public static disconnectClean() {

    }


    private static clearModels() {
        const modelsList = ModelsManager.getModels()
        for (const model of modelsList) {
            model.resetDatabase()
        }
    }
}