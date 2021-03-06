/**
 * wx的事件定义
 */
export default class WXEventNames {

    //条形广告resize
    static BANNER_AD_RESIZE:string = "bannerAdResize";

    //条形广告显示
    static BANNER_AD_SHOW:string = "bannerAdShow";
    //条形广告影藏
    static BANNER_AD_HIDE:string = "bannerAdHide";
    //下一个条形广告
    static BANNER_AD_NEXT:string = "bannerAdNext";
    //条形广告错误
    static BANNER_AD_ERROR:string = "bannerAdError";

    //激励视频广告关闭，未播放完成
    static REWARD_VIDEO_AD_CLOSE:string = "rewardVideoAdClose";
    //激励视频广告播放完成
    static REWARD_VIDEO_AD_COMPLETE:string = "rewardVideoAdComplete";
    //激励视频广告准备好
    static REWARD_VIDEO_AD_READY:string = "rewardVideoAdReady";
    //激励视频广告显示错误
    static REWARD_VIDEO_AD_ERROR:string = "rewardVideoAdError";

    //插屏广告关闭
    static INTERSTITIAL_AD_CLOSE:string = "interstitialAdClose";
    //插屏广告错误
    static INTERSTITIAL_AD_ERROR:string = "interstitialAdComplete";
    //插屏广告已准备好
    static INTERSTITIAL_AD_READY:string = "interstitialAdReady";


    //屏幕截图开始
    static IMAGE_SNAPSHOT_START:string = "imageSnapshotStart";
    //屏幕截图结束
    static IMAGE_SNAPSHOT_END:string = "imageSnapshotEnd";
}
