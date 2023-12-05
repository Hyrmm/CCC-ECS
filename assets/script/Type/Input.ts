


export enum EnumDirKeyCode {
    Up = 87,
    Down = 83,
    Left = 65,
    Right = 68
}
export enum EnumInputTypeName {
    PlayerMove = "playerMove"
}




export type TypePlayerMove = { dt: number, velocityX?: number, velocityY?: number, playerId?: number }
export type TypeInputLocal = { playerMove?: TypePlayerMove }
export type TypeInputServe = { playerMove?: Array<TypePlayerMove> }