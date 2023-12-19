import { assetManager, Prefab, SpriteFrame, Texture2D, Node, Sprite, instantiate, Asset } from "cc"

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

    static createInstancePrefeb(prefabPath, loadFinishCb: (resultNode: Node, inUseCb: (isUseAsste: boolean) => void) => void) {
        const bundle = assetManager.getBundle("prefeb")
        bundle.load(prefabPath, Prefab, (err, prefebAsset: Prefab) => {
            if (err) {
                console.error(`[AssetsManager]:加载 ${prefabPath} 预制体失败`)
            }
            const resultNode = instantiate(prefebAsset)
            loadFinishCb(resultNode, this.genAssetsInUseCb(prefebAsset))
        })
    }


    static genAssetsInUseCb(asset: Asset) {
        const callBack = (isUseAsset: boolean) => {
            if (isUseAsset) this.assetAddRefsCnt(asset)
        }
        return callBack
    }



    static assetDeRefsCnt(asset: Asset) {
        console.log(`[AssetsManager]:deRef`, asset)
        asset.decRef()
    }

    static assetAddRefsCnt(asset: Asset) {
        console.log(`[AssetsManager]:addRef`, asset)
        asset.addRef()
    }







}