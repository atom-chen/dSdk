import WXEventNames from "./WXEventNames";
import WXUtils from "./WXUtils";
import DeerSDK from "../deer/DeerSDK";
import WXBannerAd from "./WXBannerAd";
import GameValues from "../base/GameValues";
import GameCoreEventNames from "../GameCoreEventNames";


/**
 * 微信激励视频广告
 * 
 */
export default class WXRewardVideoAd {

    //视频广告对象
    private static _ad:any;


    private static _adID:string;

    /**
     * 设置广告id
     */
    static set adID(value:string) {
        console.log("----  微信视频广告 ----");
        console.log("-  set ad id  -");
        console.log(value);

        if (WXRewardVideoAd._adID != value) {
            WXRewardVideoAd._adID = value;

            //延迟一定时间初始化视频广告。请求太密集会加载不到视频广告
            //这里不做延迟，可在游戏中视情况各自做延迟处理。 2019.06.11
            // setTimeout(WXRewardVideoAd.reset.bind(WXRewardVideoAd), 4000);
            WXRewardVideoAd.reset();
        }
    }



    /**
     * 获取视频广告id
     */
    static get adID():string {
        return WXRewardVideoAd._adID;
    }


    //广告是否已准备好
    private static _isReady:boolean = false;

    /**
     * 广告是否已准备好
     */
    static get isReady():boolean {
        return WXRewardVideoAd._isReady;
    }


    //上一次视频广告完成播放时间（毫秒、本地时间）
    private static _lastVideoAdTime:number = 0;
    private static _lastVideoAdStartTime:number = 0;

    //获取上一次视频广告完成播放时间（毫秒、本地时间）
    public static get lastVideoAdTime():number {
        return WXRewardVideoAd._lastVideoAdTime;
    }


    private static _isPlaying:boolean;

    /**
     * 是否正在播放视频广告
     */
    static get isPlaying():boolean {
        return WXRewardVideoAd._isPlaying;
    }


    //记录当前背景音乐是否已静音
    private static _originalBGMMuted:boolean;

    //记录当前banner广告是否是显示的
    private static _originalBannerAdIsShowing:boolean = false;

    /**
     * 显示广告
     */
    static show():boolean {
        console.log("----  微信视频广告 ----");
        console.log("-  show  -");
        console.log("WXRewardVideoAd._isReady", WXRewardVideoAd._isReady);
        console.log("WXRewardVideoAd._isPlaying", WXRewardVideoAd._isPlaying);

        if (!WXRewardVideoAd._isReady) return false;

        if (WXRewardVideoAd._isPlaying) {
            if (new Date().getTime() - WXRewardVideoAd._lastVideoAdStartTime > 20000) {
                WXRewardVideoAd._isPlaying = false;
            }
        }

        if (WXRewardVideoAd._isPlaying) return;

        //记录当前背景音乐是否已静音
        WXRewardVideoAd._originalBGMMuted = GameValues.getLocalData("musicMuted");
        //静音背景音乐
        WXUtils.eventManager.dispatchEventWith(GameCoreEventNames.MUTE_MUSIC);

        //记录条形广告状态
        if (WXBannerAd.currentAd) {
            WXRewardVideoAd._originalBannerAdIsShowing = WXBannerAd.currentAd.isShowing;
            //隐藏条形广告
            WXBannerAd.currentAd.hide();
        } else {
            WXRewardVideoAd._originalBannerAdIsShowing = false;
        }
        
        try {
            if (WXRewardVideoAd._ad) {
                WXRewardVideoAd._ad.show();
            }

            WXRewardVideoAd._isPlaying = true;

            //记录开始播放时间
            WXRewardVideoAd._lastVideoAdStartTime = new Date().getTime();
            
            return true;
        } catch (error) {
            WXRewardVideoAd._isPlaying = false;
        }

        return false;
    }
    /**
     * 重置
     */
    static reset():void {
        console.log("----  微信视频广告 ----");
        console.log("-  reset  -");

        if (WXRewardVideoAd._ad) {
            WXRewardVideoAd._ad.offLoad(WXRewardVideoAd.adLoadCallback);
            WXRewardVideoAd._ad.offClose(WXRewardVideoAd.adCloseCallback);
            WXRewardVideoAd._ad.offError(WXRewardVideoAd.adErrorCallback);
            
            WXRewardVideoAd._ad = null;
        }

        //重置参数
        WXRewardVideoAd._isReady = false;
        WXRewardVideoAd._isPlaying = false;

        if (!WXRewardVideoAd._adID) return;

        if (typeof wx == "undefined") return;

        
        WXRewardVideoAd._ad = DeerSDK.instance.wx.createRewardedVideoAd({
            adUnitId: WXRewardVideoAd._adID
        });
        // WXRewardVideoAd._ad = wx.createRewardedVideoAd({
        //     adUnitId: WXRewardVideoAd._adID
        // });

        //监听事件
        if (WXRewardVideoAd._ad) {
            WXRewardVideoAd._ad.onLoad(WXRewardVideoAd.adLoadCallback);
            WXRewardVideoAd._ad.onClose(WXRewardVideoAd.adCloseCallback);
            WXRewardVideoAd._ad.onError(WXRewardVideoAd.adErrorCallback);
            WXRewardVideoAd._ad.load();
        }
    }


    /**
     * 广告加载完成回调
     */
    private static adLoadCallback():void {
        console.log("----  微信视频广告 ----");
        console.log("-  adLoadCallback  -");

        WXRewardVideoAd._isReady = true;
        WXUtils.eventManager.dispatchEventWith(WXEventNames.REWARD_VIDEO_AD_READY);
    }
    
    /**
     * 广告关闭回调
     */
    private static adCloseCallback(res:object = null):void {
        console.log("----  微信视频广告 ----");
        console.log("-  adCloseCallback  -");
        console.log(JSON.stringify(res));

        //恢复背景音乐
        if (!WXRewardVideoAd._originalBGMMuted) {
            WXUtils.eventManager.dispatchEventWith(GameCoreEventNames.UNMUTE_MUSIC);
            WXRewardVideoAd._originalBGMMuted = false;
        }

        //恢复banner广告
        if (WXBannerAd.currentAd && WXRewardVideoAd._originalBannerAdIsShowing) {
            WXBannerAd.currentAd.show();
            WXRewardVideoAd._originalBannerAdIsShowing = false;
        }

        WXRewardVideoAd._isPlaying = false;

        // if (res) {
        if (res && res["isEnded"] == true) {
            //记录播放时间
            WXRewardVideoAd._lastVideoAdTime = new Date().getTime();
            
            WXUtils.eventManager.dispatchEventWith(WXEventNames.REWARD_VIDEO_AD_COMPLETE);
        } else {
            //显示信息提示
            WXUtils.showToast("请看完整段视频");

            WXUtils.eventManager.dispatchEventWith(WXEventNames.REWARD_VIDEO_AD_CLOSE);
        }
    }

    /**
     * 广告错误回调
     */
    private static adErrorCallback(res:object):void {
        console.log("----  微信视频广告 ----");
        console.log("-  adErrorCallback  -");
        console.log(res);

        //恢复背景音乐
        if (!WXRewardVideoAd._originalBGMMuted) {
            WXUtils.eventManager.dispatchEventWith(GameCoreEventNames.UNMUTE_MUSIC);
            WXRewardVideoAd._originalBGMMuted = false;
        }

        //恢复banner广告
        if (WXBannerAd.currentAd && WXRewardVideoAd._originalBannerAdIsShowing) {
            WXBannerAd.currentAd.show();
            WXRewardVideoAd._originalBannerAdIsShowing = false;
        }

        WXRewardVideoAd._isPlaying = false;
        WXUtils.eventManager.dispatchEventWith(WXEventNames.REWARD_VIDEO_AD_ERROR);
    }




    
}
