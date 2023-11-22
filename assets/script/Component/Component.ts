import { ecs } from "../Core/ECS"
import { BaseEntity } from "../Entity/Entity"

export class BaseComponent extends ecs.ECSComponent {
    public entity: BaseEntity
}