import { UiDialog, UiView, UiConfig } from "../Ui/BaseUi";
import { AssetsManager } from "./AssetsManager";
import { LayerManager } from "./LayerManager";


export class UiManager {


    static openUiView(uiName: string) {
        const config = UiConfig.get(uiName)

        const layerId = config.layerId
        const prefebPath = config.prefebPath
        AssetsManager.createInstancePrefeb(`ui/${prefebPath}`, (resultNode, inUseCb) => {
            LayerManager.setUi2Layer(layerId, resultNode)
            inUseCb(true)
        })
    }

    static openUiDialog<T extends UiDialog>() {

    }
}

type ctor<T = unknown> = new (...args: any[]) => T