import { assetManager, Prefab, SpriteFrame, Texture2D, Node, Sprite, instantiate } from "cc"

export class AssetsManager {
    static name2Bundles: Array<string> = ["prefeb", "resource"]

    static init(finishCb) {
        let finishAmount = 0
        this.name2Bundles.forEach(bundleName => {
            assetManager.loadBundle(bundleName, (err, bundle) => {
                if (err) {
                    console.error(`[LoadBundle]:${bundleName}加载失败`)
                } else {
                    console.log(`[LoadBundle]:${bundleName}加载成功`)
                    finishAmount += 1
                }

                if (finishAmount == this.name2Bundles.length) {
                    console.log(`[初始化]:AssetManager 完成`)
                    finishCb()
                }
            })
        });
    }

    static createInstancePrefeb(prefabPath, loadFinishCb) {
        const bundle = assetManager.getBundle("prefeb")
        bundle.load(prefabPath, Prefab, (err, prefebAssets: Prefab) => {
            if (err) {
                console.error(`[EntityManager]:加载 ${prefabPath} 预制体失败`)
            }
            prefebAssets.addRef()
            const resultNode = instantiate(prefebAssets)

            loadFinishCb(resultNode)
        })
    }

    static createEntityFrameSheetNode(frameSheetName: string, loadFinishCb: (frameSheetNode: Node) => void) {
        const bundle = assetManager.getBundle("resource")
        bundle.load(`entity/frameAnimate/${frameSheetName}/texture`, Texture2D, (err, textureAsssets: Texture2D) => {
            if (err) {
                console.error(`[EntityManager]:加载 ${frameSheetName} 帧动画纹理失败`)
            }
            const resultNode = new Node("sp_frameAnimate")
            const spriteFrame = new SpriteFrame()
            textureAsssets.addRef()
            spriteFrame.texture = textureAsssets
            resultNode.addComponent(Sprite).spriteFrame = spriteFrame
            loadFinishCb(resultNode)
        })
    }

    static deleteEntityFrameSheetNode(node: Node) {
        const spriteCom = node.getComponent(Sprite)
        if (spriteCom.spriteFrame) {
            spriteCom.spriteFrame.texture.decRef()
        }
        spriteCom.spriteFrame = null
        node.destroy()
    }






}