import WXEventNames from "./WXEventNames";
import Utils from "../managers/Utils";
import { GameCoreLocation } from "../GameCoreLocation";
import WXBannerAdBase from "./WXBannerAdBase";
import DeerSDK, { DeerTrackAction, DeerAdVO } from "../deer/DeerSDK";

/**
 * 微信条形广告
 * 
 */
export default class WXBannerAd extends WXBannerAdBase {
    static get currentAd(): WXBannerAdBase {
        if (WXBannerAdBase._ads.length == 0) return null;
        return WXBannerAdBase._ads[WXBannerAdBase._ads.length - 1];
    }




    /**
     *  
     * @param adID                  广告ID
     * @param location              广告位置
     * @param verticalIndent        广告垂直方向上偏移像素
     * @param horizontalIndent      广告水平方向上偏移像素
     */
    // constructor(adID: string,
    //     location: GameCoreLocation = GameCoreLocation.BOTTOM_CENTER,
    //     verticalIndent: number = 0,
    //     horizontalIndent: number = 0,
    // ) {
    //     super(adID, location, verticalIndent, horizontalIndent);
    // }


    /**
     * 
     * 
     */
    protected createAd(): void {
        if (typeof wx == "undefined") return;

        if (this._bannerAd == null) {
            let screenSize: cc.Size = cc.view.getFrameSize();
            let winSize: cc.Size = cc.winSize;

            let adW: number = 0;

            //如果有设置广告最大高度
            //微信广告960x334
            if (this._maxHeight > 0) {
                adW = 960 / 334 * this._maxHeight;
            } else {
                adW = winSize.width;
            }

            //计算缩放比例
            let s: number = Utils.getCanvasScaleFactor();
            adW *= s;
            adW = Math.min(screenSize.width - this.borderWeight * 2, adW);
            // if (adW < 300) adW = 300;

            let adX: number = 0;
            let adY: number = 0;
            switch (this._location) {
                //TODO:NEXT 后期需补齐算法
                case GameCoreLocation.BOTTOM_CENTER:
                    adX = (screenSize.width - adW) / 2;
                    adY = screenSize.height;
                    break;
                case GameCoreLocation.TOP_CENTER:
                    adX = (screenSize.width - adW) / 2;
                    adY = 0;
                    break;
            }

            //计算边框
            adX += this.borderWeight;
            adY += this.borderWeight;
            adW -= this.borderWeight * 2;

            // console.log("----  微信banner广告 ----");
            // console.log("-  init  -");
            // console.log(adX, adY, "adW=" + adW, "CanvasScaleFactor=" + s);
            // console.log("-  done  -");

            let style: any = { left: adX, top: adY };
            // if (this.maxHeight > 0) style.height = this.maxHeight;
            // style.height = 210;
            style.width = adW;


            this._bannerAd = wx.createBannerAd({
                adUnitId: this._adID,
                style: style
            });
        }


        if (this._bannerAd) {
            //监听事件
            this._bannerAd.onLoad(() => {
                if (!this._destoried) {
                    this.adLoadCallback();
                }
            });

            this._bannerAd.onResize((res) => {
                if (!this._destoried) {
                    this.adResizeCallback(res);
                }
            });

            this._bannerAd.onError((err) => {
                if (!this._destoried) {
                    this.adErrorCallback(err);
                }
            });


            if (typeof wx != "undefined") {
                wx.onHide(this.wxOnHide.bind(this));
            }
        }
    }


    private wxOnHide(res): void {
        // console.log("【WXBanner onHide", res, this._bannerAd, this._isShowing);

        if (!res) return;

        if (this._destoried) {
            wx.offHide(this.wxOnHide.bind(this));
            return;
        }


        let action: number = res["targetAction"];
        let targetPath: string = res["targetPagePath"];
        if (action == -1                    //navigate to other app
            || action == 8                  //wx ad page: WCCanvasPageViewController
            || action == 9                  //to mini programe
            || targetPath                   //to page
        ) {
            // console.log("检查广告")
            //由于无法监测到微信banner广告的真实点击，这里对hide就做点击测算
            //点击广告后，this._bannerAd为null
            if (this._bannerAd && this._isShowing) {
                // console.log("检查DeerAdVO.lastNavigateTime")
                if (DeerAdVO.lastNavigateTime) {
                    let sDelay: number = new Date().getTime() - DeerAdVO.lastNavigateTime.getTime();
                    console.log("DeerAdVO.lastNavigateTime delay(ms)", sDelay);
                    if (sDelay < 5000) return;
                }

                // console.log("【WXBanner onHide 发送点击统计");
                //发送微信
                DeerSDK.instance.track(DeerTrackAction.WX_BAD_CLICK, null, true);
            }

        }

    }


    // private _isReady:boolean;

    // /**
    //  * 广告是否已准备好
    //  */
    // get isReady():boolean {
    //     return this._isReady;
    // }


    /**
     * 重新布局
     */
    public relayout(): void {
        // console.log("----  微信banner广告 ----");
        // console.log("-  relayout  -");

        if (!this._bannerAd) return;
        if (!this._bannerAd.style) return;

        let adWidth: number = this._bannerAd.style.realWidth;
        let adHeight: number = this._bannerAd.style.realHeight;

        let adW: number = this._bannerAd.style.width;
        if (isNaN(adW) || adW <= 0 || isNaN(adWidth) || isNaN(adHeight)) {
            //广告错误
            this.dispatchEventWith(WXEventNames.BANNER_AD_ERROR);
            this.destory();
            return;
        }

        // console.log("【WXBannerAd】rw, rh, maxHeight", adWidth, adHeight, this._maxHeight);

        let screenSize: cc.Size = cc.view.getFrameSize();
        var winSize: cc.Size = cc.winSize;
        // let scaleFactor: number = Utils.getCanvasScaleFactor();
        // console.log("frame size", screenSize);
        // console.log("window size", winSize);

        let adX: number = 0;
        let adY: number = 0;

        switch (this._location) {
            //TODO:NEXT 后期需补齐算法
            case GameCoreLocation.BOTTOM_CENTER:
                adX = (screenSize.width - adWidth) / 2;
                adY = screenSize.height - adHeight - this.borderWeight;

                //2019.03.14。需要让广告顶上去。
                //在iphonex中，防止广告被顶上去
                // adY = screenSize.height - this._adHeight + 1;

                //2019.03.14，此处会导致iphonx下广告上移2倍的底部线距离。必须为0
                // if (this._maxHeight > 0 && adHeight > this._maxHeight * scaleFactor) {
                //     this._vertialIndent = adHeight - this._maxHeight * scaleFactor;
                // }
                break;
            case GameCoreLocation.TOP_CENTER:
                adX = (screenSize.width - adWidth) / 2;
                adY = this.borderWeight;
                // if (this._maxHeight > 0 && adHeight > this._maxHeight * scaleFactor) {
                //     this._vertialIndent = -(adHeight - this._maxHeight * scaleFactor);
                // }
                break;
        }

        //偏移
        adX += this._horizontalIndent;
        adY += this._vertialIndent;//2019.03.14，此处会导致iphonx下广告上移2倍的底部线距离。必须为0

        //iphonex底部高度
        adY -= Utils.iphoneBottomBarHeight;

        adX = Math.floor(adX);
        adY = Math.floor(adY);

        if (this._bannerAd) {
            this._bannerAd.style.left = adX;
            this._bannerAd.style.top = adY;
        }

        // console.log("this._bannerAd.style=", this._bannerAd.style);

        this._adRect = new cc.Rect(adX - this.borderWeight, adY - this.borderWeight, adWidth + this.borderWeight * 2, adHeight + this.borderWeight * 2);
        // this._adRect = new cc.Rect(this._bannerAd.style.left - this.borderWeight, this._bannerAd.style.top - this.borderWeight, adWidth + this.borderWeight * 2, adHeight + this.borderWeight * 2);
        this.dispatchEventWith(WXEventNames.BANNER_AD_RESIZE);
    }



    next(): void {
        // console.log("----  微信banner广告 ----");
        // console.log("-  next  -");
        // console.log("this._isShowing=" + this._isShowing);
        this.dispatchEventWith(WXEventNames.BANNER_AD_NEXT);
    }


    /**
     * 显示广告
     */
    show(): void {
        if (this._destoried) return;
        // if (this._isShowing) return;

        // console.log("----  微信banner广告 ----");
        // console.log("-  show  -");
        // console.log("this._isShowing=" + this._isShowing);

        if (this._bannerAd && this._firstResizeDone) {
            this._bannerAd.show();

            //发送统计
            DeerSDK.instance.track(DeerTrackAction.WX_BAD_SHOW);
        }

        this._isShowing = true;
        this.dispatchEventWith(WXEventNames.BANNER_AD_SHOW);
    }


    /**
     * 隐藏广告
     */
    hide(): void {
        if (this._destoried) return;
        // if (!this._isShowing) return;


        // console.log("----  微信banner广告 ----");
        // console.log("-  hide  -");
        // console.log("this._isShowing=" + this._isShowing);

        if (this._bannerAd && this._firstResizeDone) {
            this._bannerAd.hide();
        }

        this._isShowing = false;
        this.dispatchEventWith(WXEventNames.BANNER_AD_HIDE, this);
    }


    /**
     * 销毁广告
     * 
     * 
     */
    destory(): void {
        if (this._destoried) return;

        super.destory();

        // console.log("----  微信banner广告 ----");
        // console.log("-  destroy  -");

        if (this._bannerAd) {
            this._bannerAd.destroy();
            this._bannerAd = null;
        }

        if (typeof wx != "undefined") {
            wx.offHide(this.wxOnHide.bind(this));
        }
    }



    /**
     * 广告加载完成回调
     */
    private adLoadCallback(): void {
        // console.log("----  微信banner广告 ----");
        // console.log("-  adLoadCallback  -");
    }

    /**
     * 第一次缩放回调是否已完成
     */
    private _firstResizeDone: boolean = false;

    /**
     * 广告resize回调
     */
    private adResizeCallback(res: object): void {
        // console.log("----  微信banner广告 ----");
        // console.log("-  adResizeCallback  -");
        // console.log(res);

        if (this._firstResizeDone == false) {
            this._firstResizeDone = true;

            if (this._isShowing) {
                this._bannerAd.show();

                //发送统计
                DeerSDK.instance.track(DeerTrackAction.WX_BAD_SHOW);
            } else {
                this._bannerAd.hide();
            }
        }

        // this.relayout();
        setTimeout(this.relayout.bind(this), 1000);
    }

    /**
     * 广告错误回调
     */
    private adErrorCallback(res: object): void {
        // console.log("----  微信banner广告 ----");
        // console.log("-  adErrorCallback  -");
        // console.log(res);

        //广告错误
        this.dispatchEventWith(WXEventNames.BANNER_AD_ERROR);
    }



}
