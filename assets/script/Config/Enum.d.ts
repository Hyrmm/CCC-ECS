import { Node } from "cc"

declare module GEnum {
    enum LayerId {
        playerLayer = 1
    }

    enum KeyCode {
        Up = 87,
        Down = 83,
        Left = 65,
        Right = 68
    }

    enum LocalMsg {
        LoginSucess = "LoginSucess"
    }

    enum InputsType {
        PlayerMove = "playerMove"
    }

}

declare module GInterface {
    interface LayerConfig {
        id: number
        layer: Node
    }

    interface InputsTypeLocal {
        playerMove?: GType.PlayerMove
    }

    interface InputsTypeServe {
        playerMove?: Array<GType.PlayerMove>
    }
}

declare module GType {
    type PlayerMove = { dt: number, velocityX?: number, velocityY?: number, playerId?: number }
}

declare module GInterface.a {

}





