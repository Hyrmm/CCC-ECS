import { ecs } from "../../Core/ECS"
import { _decorator, Component, Node, Vec3, Sprite, log, SpriteFrame, UITransform } from 'cc'
import { BaseComponent } from "./Component"
import { Entity } from "../../Type"
import { SystemManager } from "../../Manager/SystemManager"
import { RootSystem } from "../System/RootSystem"
const { ccclass, property } = _decorator

@ecs.ECSDecorator.registerECSComName('AnimateComponent')
@ccclass('AnimateComponent')
export class AnimateComponent extends BaseComponent {
    private isPlaying: boolean = false
    private curPlayingFrame: number = 0
    private curPlayingAnimateName: string = "default"
    private playingSchedule: Symbol

    private perFrameW: number = 0
    private perFrameH: number = 0



    public frameSheetName: string
    public frameSheetRectCnt: [number, number]
    public animatesMap: Map<string, Entity.TypeAnimate>
    public defaultAnimateName: string

    public isFrameSheetLoaded: boolean = false
    public frameAnimateSpriteNode: Node = null


    public playAnimate(animateName: string) {
        if (this.curPlayingAnimateName == animateName) return

        const animateInfo = this.animatesMap.get(animateName)
        const animateDuration = animateInfo.duraction
        const animateFrameRange = animateInfo.frameRange

        if (!animateFrameRange) {
            return console.error(`帧数动画${this.frameSheetName}-${animateName}不存在`, this.animatesMap)
        }

        if (this.playingSchedule) {
            SystemManager.getSystem(RootSystem).delGlobalSchedule(this.playingSchedule)
            this.frameAnimateSpriteNode.active = false
        }

        this.curPlayingAnimateName = animateName
        this.curPlayingFrame = animateFrameRange[0]

        const spriteCom = this.frameAnimateSpriteNode.getComponent(Sprite)
        this.perFrameW = spriteCom.spriteFrame.texture.width / this.frameSheetRectCnt[0]
        this.perFrameH = spriteCom.spriteFrame.texture.height / this.frameSheetRectCnt[1]
        this.frameAnimateSpriteNode.getComponent(UITransform).setContentSize(this.perFrameW, this.perFrameH)

        spriteCom.spriteFrame.rect.width = this.perFrameW
        spriteCom.spriteFrame.rect.height = this.perFrameH
        spriteCom.spriteFrame.rect.x = 0
        spriteCom.spriteFrame.rect.y = 0

        this.run()
        this.playingSchedule = SystemManager.getSystem(RootSystem).addGlobalSchedule(this.run, animateDuration, this)
    }

    public clearAnimate() {
        this.isPlaying = false
        this.curPlayingAnimateName = ""

        if (this.playingSchedule) {
            SystemManager.getSystem(RootSystem).delGlobalSchedule(this.playingSchedule)
        }
    }

    private run() {
        if (!this.frameAnimateSpriteNode.active) this.frameAnimateSpriteNode.active = true

        const animateInfo = this.animatesMap.get(this.curPlayingAnimateName)
        const animateFrameRange = animateInfo.frameRange

        this.updateFrame()
        this.curPlayingFrame += 1

        if (this.curPlayingFrame > animateFrameRange[1]) {

            if (animateInfo.loop) {
                this.curPlayingFrame = animateFrameRange[0]
            } else {
                this.clearAnimate()
            }

        }
    }

    private updateFrame() {
        /** 核心思想依照当前帧数，和固定的纹理行列数、单帧的宽高计算出对应rect,继而对计算出顶点数据 */

        // 更新rect
        const animateSpriteCom = this.frameAnimateSpriteNode.getComponent(Sprite)
        const animateSpriteFrame = animateSpriteCom.spriteFrame
        animateSpriteFrame.rect.x = (this.curPlayingFrame % this.frameSheetRectCnt[0]) * this.perFrameW
        animateSpriteFrame.rect.y = Math.floor(this.curPlayingFrame / (this.frameSheetRectCnt[1] * this.frameSheetRectCnt[0])) * this.perFrameH

        // 更新顶点数据UV
        const sf: any = animateSpriteFrame
        const rect = animateSpriteFrame.rect
        const uv = animateSpriteFrame.uv
        const tex = animateSpriteFrame.texture
        const texw = tex.width
        const texh = tex.height

        if (sf._rotated) {
            const l = texw === 0 ? 0 : rect.x / texw;
            const r = texw === 0 ? 1 : (rect.x + rect.height) / texw;
            const t = texh === 0 ? 0 : rect.y / texh;
            const b = texh === 0 ? 1 : (rect.y + rect.width) / texh;

            if (sf._isFlipUVX && sf._isFlipUVY) {
                /*
                3 - 1
                |   |
                2 - 0
                */
                uv[0] = r;
                uv[1] = b;
                uv[2] = r;
                uv[3] = t;
                uv[4] = l;
                uv[5] = b;
                uv[6] = l;
                uv[7] = t;
            } else if (sf._isFlipUVX) {
                /*
                2 - 0
                |   |
                3 - 1
                */
                uv[0] = r;
                uv[1] = t;
                uv[2] = r;
                uv[3] = b;
                uv[4] = l;
                uv[5] = t;
                uv[6] = l;
                uv[7] = b;
            } else if (sf._isFlipUVY) {
                /*
                1 - 3
                |   |
                0 - 2
                */
                uv[0] = l;
                uv[1] = b;
                uv[2] = l;
                uv[3] = t;
                uv[4] = r;
                uv[5] = b;
                uv[6] = r;
                uv[7] = t;
            } else {
                /*
                0 - 2
                |   |
                1 - 3
                */
                uv[0] = l;
                uv[1] = t;
                uv[2] = l;
                uv[3] = b;
                uv[4] = r;
                uv[5] = t;
                uv[6] = r;
                uv[7] = b;
            }

        } else {
            const l = texw === 0 ? 0 : rect.x / texw;
            const r = texw === 0 ? 1 : (rect.x + rect.width) / texw;
            const b = texh === 0 ? 1 : (rect.y + rect.height) / texh;
            const t = texh === 0 ? 0 : rect.y / texh;
            if (sf._isFlipUVX && sf._isFlipUVY) {
                /*
                1 - 0
                |   |
                3 - 2
                */
                uv[0] = r;
                uv[1] = t;
                uv[2] = l;
                uv[3] = t;
                uv[4] = r;
                uv[5] = b;
                uv[6] = l;
                uv[7] = b;
            } else if (sf._isFlipUVX) {
                /*
                3 - 2
                |   |
                1 - 0
                */
                uv[0] = r;
                uv[1] = b;
                uv[2] = l;
                uv[3] = b;
                uv[4] = r;
                uv[5] = t;
                uv[6] = l;
                uv[7] = t;
            } else if (sf._isFlipUVY) {
                /*
                0 - 1
                |   |
                2 - 3
                */
                uv[0] = l;
                uv[1] = t;
                uv[2] = r;
                uv[3] = t;
                uv[4] = l;
                uv[5] = b;
                uv[6] = r;
                uv[7] = b;
            } else {
                /*
                2 - 3
                |   |
                0 - 1
                */
                uv[0] = l;
                uv[1] = b;
                uv[2] = r;
                uv[3] = b;
                uv[4] = l;
                uv[5] = t;
                uv[6] = r;
                uv[7] = t;
            }

        }

        // 更新着色器
        // @ts-ignore
        animateSpriteCom._assembler.updateUVs(animateSpriteCom)
    }
}