/*
 * @Author: hyrm 1358188945@qq.com
 * @Date: 2023-08-13 01:08:57
 * @LastEditors: hyrm 1358188945@qq.com
 * @LastEditTime: 2023-09-17 02:10:08
 * @FilePath: \MyGame\assets\script\System\InputListenerSystem.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ecs } from "../Core/ECS"
import { EventKeyboard, KeyCode } from "cc"
import { InputComponent } from "../Component/ECSComponent"



export class InputListenerSystem extends ecs.System {

    public priority: number = 1

    private keyUpCode: KeyCode
    private keyDownCode: KeyCode
    private keyPresingCode: KeyCode



    public onKeyUp(even: EventKeyboard) {
        this.keyUpCode = even.keyCode
        this.updateKeyCode()
    }
    public onKeyDown(even: EventKeyboard) {
        this.keyDownCode = even.keyCode
        this.updateKeyCode()
    }
    public onKeyPressing(even: EventKeyboard) {
        this.keyPresingCode = even.keyCode
        this.updateKeyCode()
    }


    public updateKeyCode() {

        // 当长按的键被抬起时，置空键数据
        if (this.keyUpCode && (this.keyDownCode || this.keyPresingCode) && (this.keyUpCode == this.keyPresingCode || this.keyUpCode == this.keyDownCode)) {
            this.keyPresingCode = this.keyUpCode = this.keyDownCode = null
        }

        const resultEntitys = ecs.ECSQuery.withCom(InputComponent)
        for (const entity of resultEntitys) {
            const inputCom = entity.getComponent(InputComponent)
            inputCom.keyUpCode = this.keyUpCode
            inputCom.keyDownCode = this.keyDownCode
            inputCom.keyPresingCode = this.keyPresingCode
        }
    }


    public update(dt?: number) {

    }




}
type ctor<T = unknown> = new (...args: any[]) => T;