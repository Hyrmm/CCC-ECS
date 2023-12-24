import { Component, UI } from "cc";
import { Layer } from "../Type";

export abstract class BaseUiComponent extends Component {
    protected onDestroy(): void {

    }
}

// 全屏界面
export abstract class UiView extends BaseUiComponent {
}

// 弹窗界面
export abstract class UiDialog extends BaseUiComponent {

}



export const UiConfig: Map<string, { prefebPath: string, layerId: Layer.EnumLayerId }> = new Map()
UiConfig.set("LoginView", { prefebPath: "loginView", layerId: Layer.EnumLayerId.UiLayer })




