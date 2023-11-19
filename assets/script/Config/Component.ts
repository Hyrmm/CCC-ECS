import { ecs } from "../Core/ECS"
import { BaseEntity } from "../Config/Entity"

export class BaseComponent extends ecs.ECSComponent {
    public entity: BaseEntity
}