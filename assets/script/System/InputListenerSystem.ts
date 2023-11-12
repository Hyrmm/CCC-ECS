import { ecs } from "../Core/ECS"
import { EventKeyboard, KeyCode } from "cc"
import { InputComponent } from "../Component/ECSComponent"



export class InputListenerSystem extends ecs.System {

    public priority: number = 1
    private keyPresingCode: Array<KeyCode> = []



    public onKeyUp(even: EventKeyboard) {
        this.updateKeyCode('up', even.keyCode)
    }
    public onKeyDown(even: EventKeyboard) {
        this.updateKeyCode('down', even.keyCode)
    }
    public onKeyPressing(even: EventKeyboard) {
        this.updateKeyCode('presing', even.keyCode)
    }

    public updateKeyCode(type, keyCode) {

        switch (type) {
            case "up": {
                if (this.keyPresingCode.includes(keyCode)) {
                    for (const [index, curKeyCode] of this.keyPresingCode.entries()) {
                        if (curKeyCode == keyCode) {
                            this.keyPresingCode.splice(index, 1)
                        }
                    }
                }
                break
            }
            case "down": {
                !this.keyPresingCode.includes(keyCode) && this.keyPresingCode.push(keyCode)
                break
            }
            case "presing": {
                !this.keyPresingCode.includes(keyCode) && this.keyPresingCode.push(keyCode)
                break
            }
        }


        const resultEntitys = ecs.ECSQuery.withCom(InputComponent)
        for (const entity of resultEntitys) {
            const inputCom = entity.getComponent(InputComponent)
            inputCom.keyPresingCode = this.keyPresingCode
        }
    }

    public update(dt?: number) {

    }




}
type ctor<T = unknown> = new (...args: any[]) => T;