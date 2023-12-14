import { assetManager, Prefab } from "cc"

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

    static getPrefeb(prefabPath, loadFinishCb) {
        const bundle = assetManager.getBundle("prefeb")
        bundle.load(prefabPath, Prefab, (err, prefebAssets: Prefab) => {
            if (err) {
                console.error(`[EntityManager]:加载 ${prefabPath} 预制体失败`)
            }
            loadFinishCb(prefebAssets)
        })
    }







}