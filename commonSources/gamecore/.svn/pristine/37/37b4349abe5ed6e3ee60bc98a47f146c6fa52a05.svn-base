import WXBannerAd from "./WXBannerAd";
import Utils from "../managers/Utils";
import WXBannerAdBase from "./WXBannerAdBase";
import WXEventNames from "./WXEventNames";
import EventData from "../managers/event/EventData";

// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

/**
 * 靠近banner广告
 */
@ccclass
export default class Comp_NearToWXBannerAd extends cc.Component {

    @property({
        displayName: "间隔距离"
    })
    distanceToAd: number = 0;

    @property({
        displayName: "延迟时间",
        tooltip: "用户面板中元素延迟处理"
    })
    layoutDelay: number = 0.8;

    @property({
        displayName: "缓动效果"
    })
    useAction: boolean = false;

    @property({
        displayName: "默认不显示"
    })
    hideBeforeRelayout: boolean = true;


    private _originalOpacity: number;

    onLoad() {
        this._originalOpacity = this.node.opacity;
        if (this.hideBeforeRelayout) this.node.opacity = 0;
    }

    start() {
        if (this.layoutDelay > 0) {
            this.scheduleOnce(() => {
                this.init();
            }, this.layoutDelay);
        } else {
            this.init();
        }
    }

    // update (dt) {}

    /**
     * 初始化
     */
    private init(): void {
        this.node.opacity = this._originalOpacity;

        this.checkBannerAd();
    }


    /**
     * 检查banner广告是否存在
     */
    private checkBannerAd(): void {
        if (!WXBannerAd.currentAd) {
            this.scheduleOnce(this.checkBannerAd, 0.1);
            return;
        }

        WXBannerAd.currentAd.addEventListener(WXEventNames.BANNER_AD_RESIZE, this.bannerAdEventsHandler, this);
        WXBannerAd.currentAd.addEventListener(WXEventNames.BANNER_AD_SHOW, this.bannerAdEventsHandler, this);

        if (WXBannerAd.currentAd.isShowing) {
            this.relayout();
        }
    }


    /**
     * banner广告事件
     * 
     * @param e 
     */
    private bannerAdEventsHandler(e: EventData): void {
        this.relayout();
    }



    /**
     * 重新布局
     */
    public relayout(): void {
        let ad: WXBannerAdBase = WXBannerAd.currentAd;
        if (!ad) return;

        if (!ad.adRect) return;

        let rect: cc.Rect = new cc.Rect(ad.adRect.x, ad.adRect.y, ad.adRect.width, ad.adRect.height);
        rect = Utils.fromScreenRect(rect);
        
        let po: cc.Vec2 = new cc.Vec2(rect.x + rect.width / 2, rect.y + rect.height);
        po = this.node.getParent().convertToNodeSpaceAR(po);

        let toY: number;
        if (!ad.isShowing) {
            //如果广告不显示，停靠在广告顶部下面
            toY = po.y - this.node.height * (1 - this.node.anchorY) - this.distanceToAd;
        } else {
            toY = po.y + this.node.height * this.node.anchorY + this.distanceToAd;
        }

        if (this.useAction) {
            this.node.stopAllActions();
            this.node.runAction(cc.moveTo(0.5, this.node.x, toY))
        } else {
            this.node.y = toY;
        }
    }


    onDestroy() {
        if (WXBannerAd.currentAd) {
            WXBannerAd.currentAd.removeEventListener(WXEventNames.BANNER_AD_RESIZE, this.bannerAdEventsHandler, this);
            WXBannerAd.currentAd.removeEventListener(WXEventNames.BANNER_AD_SHOW, this.bannerAdEventsHandler, this);
        }
    }
}
