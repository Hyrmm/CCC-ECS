

export enum EnumInputTypeName {
    PlayerMove = "playerMove"
}



export type TypePlayerMove = { dt: number, velocityX?: number, velocityY?: number, playerId?: number }
export type TypeInputLocal = { playerMove?: TypePlayerMove }
export type TypeInputServe = { playerMove?: Array<TypePlayerMove> }