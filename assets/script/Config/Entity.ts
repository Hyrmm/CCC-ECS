import { entityConfig } from "../Manager/EntityManager"
import { LayerIdEnum } from "../Config/Enum"


export const playerEntity: entityConfig = {
    name: "player",
    layerId: LayerIdEnum.playerLayer,
    components: [],
}