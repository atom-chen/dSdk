import DeerSDKEventNames from "./DeerSDKEventNames";
import EventData from "../managers/event/EventData";
import DeerSDK, { DeerAdType, DeerAdVO, DeerTrackAction } from "./DeerSDK";

// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

//广告尺寸
const AD_SIZE: number = 256;

/**
 * spine动画广告
 * 
 */
@ccclass
export default class Comp_DeerSpineAd extends cc.Component {

    private static _lastAdIndex: number = -1;

    @property({
        displayName: "轮播间隔(秒)",
        tooltip: "0表示不轮播"
    })
    adInterval: number = 12;

    @property({
        displayName: "是否随机",
    })
    adRandom: boolean = true;

    start() {
        if (DeerSDK.instance.isReady) {
            this.loadAdData();
        } else {
            DeerSDK.instance.addEventListener(DeerSDKEventNames.READY, this.sdkReadyHandler, this);
        }

        this.node.on(cc.Node.EventType.TOUCH_END, this.touchEndHandler, this);
    }


    private sdkReadyHandler(e: EventData): void {
        DeerSDK.instance.removeEventListener(DeerSDKEventNames.READY, this.sdkReadyHandler, this);

        this.loadAdData();
    }


    private touchEndHandler(e: cc.Event): void {
        if (this._currentAd) {
            //广告跳转
            this._currentAd.navigate();
        }
    }

    // update (dt) {}


    /**
     * 加载广告数据
     */
    private loadAdData(): void {
        var self = this;
        DeerSDK.instance.ad_getAdData(DeerAdType.ANIMATION,
            (ads: Array<DeerAdVO>) => {
                self.data = ads;
            });
    }


    private _data: Array<DeerAdVO> = [];


    public set data(value: Array<DeerAdVO>) {
        if (this._data == value) return;
        this._data = value;

        this.showNextAd();

        this.unschedule(this.showNextAd);

        if (this.adInterval > 0) {
            this.schedule(this.showNextAd, this.adInterval);
        }
    }


    public get data(): Array<DeerAdVO> {
        return this._data;
    }


    /**
     * 清除所有动画广告
     */
    public clear(): void {
        this._currentAd = null;

        if (this._lastAdNode) {
            this._lastAdNode.destroy();
            this._lastAdNode = null;
        }
    }


    private _currentAd: DeerAdVO;


    public get currentAd(): DeerAdVO {
        return this._currentAd;
    }

    /**
     * 显示下一个广告
     * 
     */
    public showNextAd(): void {
        if (!this._data || this._data.length == 0) return;

        let index: number = this._data.indexOf(this._currentAd);
        if (this.adRandom && this._data.length > 1) {
            //是否随机
            let i: number = 20;

            while (i-- > 0) {
                let nowIndex: number = Math.floor(Math.random() * this._data.length);
                if (nowIndex != index && nowIndex != Comp_DeerSpineAd._lastAdIndex) {
                    index = nowIndex;
                    break;
                }
            }

            //记录数据
            Comp_DeerSpineAd._lastAdIndex = index;
        } else {
            index++;
            if (index >= this._data.length) index = 0;
        }


        this.showAd(this._data[index]);
    }


    //上一个广告节点
    private _lastAdNode: cc.Node;

    /**
     * 显示广告
     * 
     * @param ad 
     */
    public showAd(ad: DeerAdVO): void {
        if (!ad || this._currentAd == ad) return;

        this._currentAd = ad;

        if (!this._currentAd.spine) return;

        //上报数据
        this._currentAd.reportShown();

        var paths = [this._currentAd.spine.png, this._currentAd.spine.atlas, this._currentAd.spine.aniJson]
        cc.loader.load(paths, (errors, results) => {
            // if (errors) {
            //     for (var i = 0; i < errors.length; i++) {
            //         cc.log('Error url [' + errors[i] + ']: ' + results.getError(errors[i]));
            //     }
            // }

            let newNode: cc.Node = new cc.Node();
            let spine: sp.Skeleton = newNode.addComponent(sp.Skeleton);

            try {
                let a = results.getContent(this._currentAd.spine.png);

                var spineData: any = new sp.SkeletonData();
                if (cc.ENGINE_VERSION >= "2.0.0") {
                    spineData.textures = [results.getContent(this._currentAd.spine.png)];
                } else {
                    spineData.textures = [this._currentAd.spine.png];
                }

                //png文件上传后会重名
                let nowTextureName: string = this._currentAd.spine.png.split("/").pop();
                spineData.textureNames = [nowTextureName];

                spineData.atlasText = results.getContent(this._currentAd.spine.atlas);
                let textureNameV = spineData.atlasText.match(/\n(.+?\.png)\n/);
                if (textureNameV) {
                    let textureName: string = textureNameV[1];
                    //替换贴图描述中的贴图文件名
                    spineData.atlasText = spineData.atlasText.replace("\n" + textureName + "\n", "\n" + nowTextureName + "\n");
                }

                spineData.skeletonJson = results.getContent(this._currentAd.spine.aniJson);
                spine.skeletonData = spineData;
                spine.defaultSkin = "default";
                spine.premultipliedAlpha = false;

                //设置动画
                // spine.animation = "hurt";
                if (spineData._skeletonJson && spineData._skeletonJson.animations) {
                    let keys: Array<string> = Object.keys(spineData._skeletonJson.animations);
                    if (keys.length > 0) {
                        spine.animation = keys[0];
                    }
                }

                if (this._lastAdNode) this._lastAdNode.destroy();
                this._lastAdNode = newNode;

                this._lastAdNode.scaleX = this.node.width / AD_SIZE;
                this._lastAdNode.scaleY = this.node.height / AD_SIZE;
                this.node.addChild(this._lastAdNode);
            } catch (error) {

            }
        });
    }
}
