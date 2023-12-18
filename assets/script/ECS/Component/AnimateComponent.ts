import { ecs } from "../../Core/ECS"
import { _decorator, Component, Node, Vec3, Sprite, log, SpriteFrame, UITransform } from 'cc'
import { BaseComponent } from "./Component"
import { Entity } from "../../Type"
const { ccclass, property } = _decorator

@ecs.ECSDecorator.registerECSComName('AnimateComponent')
@ccclass('AnimateComponent')
export class AnimateComponent extends BaseComponent {
    private isPlaying: boolean = false
    private curPlayingFrame: number = 0
    private curPlayingAnimateName: string = "default"
    private playingInterval: number

    private perFrameW: number = 0
    private perFrameH: number = 0



    public frameSheetName: string
    public frameSheetRectCnt: [number, number]
    public animatesMap: Map<string, Entity.TypeAnimate>
    public defaultAnimateName: string

    public isFrameSheetLoaded: boolean = false
    public frameAnimateSpriteNode: Node = null


    public playAnimate(animateName: string) {
        const animateInfo = this.animatesMap.get(animateName)
        const animateDuration = animateInfo.duraction
        const animateFrameRange = animateInfo.frameRange

        if (!animateFrameRange) {
            return console.error(`帧数动画${this.frameSheetName}-${animateName}不存在`, this.animatesMap)
        }

        if (this.playingInterval) {
            clearInterval(this.playingInterval)
            this.frameAnimateSpriteNode.active = false
        }

        this.curPlayingAnimateName = animateName
        this.curPlayingFrame = animateFrameRange[0]

        const spriteCom = this.frameAnimateSpriteNode.getComponent(Sprite)
        this.perFrameW = spriteCom.spriteFrame.texture.width / this.frameSheetRectCnt[0]
        this.perFrameH = spriteCom.spriteFrame.texture.height / this.frameSheetRectCnt[1]

        setInterval(this.run.bind(this, animateName), 100)
    }

    private run(animateName: string) {
        this.frameAnimateSpriteNode.getComponent(UITransform).setContentSize(this.perFrameW, this.perFrameH)
        const spriteCom = this.frameAnimateSpriteNode.getComponent(Sprite)
        const animateInfo = this.animatesMap.get(animateName)
        const animateDuration = animateInfo.duraction
        const animateFrameRange = animateInfo.frameRange

        this.updateRect()
        this.calculateUV(spriteCom.spriteFrame)

        if ((spriteCom as any)._assembler) {
            (spriteCom as any)._assembler.updateUVs(spriteCom.spriteFrame)
        }

        if (this.curPlayingFrame == animateFrameRange[1]) {
            this.curPlayingFrame = animateFrameRange[0]
        } else {
            this.curPlayingFrame += 1
        }

    }

    private updateRect() {
        // 核心思想依照当前帧数，和固定的纹理行列数、单帧的宽高计算出对应rect,继而对计算出顶点数据
        const animateSpriteCom = this.frameAnimateSpriteNode.getComponent(Sprite)
        const animateSpriteFrame = animateSpriteCom.spriteFrame
        animateSpriteFrame.rect.x = this.curPlayingFrame * this.perFrameW
        animateSpriteFrame.rect.y = Math.floor(this.curPlayingFrame / (this.frameSheetRectCnt[1] * this.frameSheetRectCnt[0])) * this.perFrameH
        animateSpriteFrame.rect.width = this.perFrameW
        animateSpriteFrame.rect.width = this.perFrameH
        if ((animateSpriteCom as any)._assembler) {
            (animateSpriteCom as any)._assembler.updateUVs(animateSpriteCom)
        }
    }


    private calculateUV(spriteFrame: SpriteFrame) {
        const sf: any = spriteFrame
        const rect = spriteFrame.rect;
        const uv = spriteFrame.uv;
        const tex = spriteFrame.texture;
        const texw = tex.width;
        const texh = tex.height;

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

    }
}