import { LayerIdEnum } from "../Config/Enum"
import { playerEntity } from "../Config/Interface"
import { InputComponent, PhysicalComponent, PositionComponent, RenderComponent } from "../Component/ECSComponent"


export const playerEntityConfig: playerEntity = {
    name: "player",
    layerId: LayerIdEnum.playerLayer,
    components: [PositionComponent, PhysicalComponent, InputComponent, RenderComponent],
    velocity: [2, 2],
    moveClipsName: "captain",
    prefebName: "player"
}