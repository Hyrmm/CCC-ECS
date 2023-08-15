import { ecs } from "../Core/ECS"
import { EventKeyboard, KeyCode } from "cc"



export class InputListenerSystem implements ecs.System {

    public priority: number = 1

    private keyUpCode: KeyCode
    private keyDownCode: KeyCode



    public onKeyUp(even: EventKeyboard) {
        this.keyUpCode = even.keyCode
    }
    public onKeyDown(even: EventKeyboard) {
        this.keyDownCode = even.keyCode
    }


    public update(dt?: number) {

    }




}
type ctor<T = unknown> = new (...args: any[]) => T;