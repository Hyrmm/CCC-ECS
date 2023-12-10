


export enum EnumDirKeyCode {
    Up = 87,
    Down = 83,
    Left = 65,
    Right = 68
}
export enum EnumInputTypeName {
    PlayerMove = "playerMove",
    PlayerJoin = "playerJoin",
    PlayerLeave = "playerLeave"
}


export type TypePlayer = { uuid: string, position: { v1: number, v2: number }, velocity: { v1: number, v2: number } }

export type TypePlayerMove = { dt: number, velocityX?: number, velocityY?: number, playerId?: string }
export type TypePlayerJoin = { player: TypePlayer }
export type TypePLayerLeave = { player: TypePlayer }


export type TypeInputLocal = { playerMove?: TypePlayerMove }
export type TypeInputServe = { playerMove?: Array<TypePlayerMove>, playerJoin?: Array<TypePlayerJoin>, playerLeave?: Array<TypePLayerLeave> }