import WXEventNames from "./WXEventNames";
import EventData from "../managers/event/EventData";
import WXUtils from "./WXUtils";
import WXRewardVideoAd from "./WXRewardVideoAd";


/**
 * 微信视频广告关闭确定alert
 */
export default class WXRewardVideoAdCloseComfirm {

    //视频广告关闭alert，点击重新观看视频
    public static closeAlertPlayAgainCallback: Function = null;

    private static _alertTitle: string;
    private static _alertConent: string;
    private static _alertCancel: string;
    private static _alertConfirmLabel: string;

    /**
     * 重置
     */
    public static reset(): void {
        WXUtils.eventManager.removeEventListener(WXEventNames.REWARD_VIDEO_AD_CLOSE, this.videoAdEventsHandler, this);
        WXUtils.eventManager.removeEventListener(WXEventNames.REWARD_VIDEO_AD_COMPLETE, this.videoAdEventsHandler, this);
        WXUtils.eventManager.removeEventListener(WXEventNames.REWARD_VIDEO_AD_ERROR, this.videoAdEventsHandler, this);
    }

    /**
     * 初始化alert。
     * 
     * 在用户中断关闭视频后，弹出alert再次让用户确认
     * 
     * @param title 
     * @param content 
     * @param cancelLabel 
     * @param confirmLabel 
     */
    public static init(title: string, content: string,
        cancelLabel: string = "下次再说",
        confirmLabel: string = "观看视频"): void {

        this._alertTitle = title;
        this._alertConent = content;
        this._alertCancel = cancelLabel;
        this._alertConfirmLabel = confirmLabel;

        this.reset();


        WXUtils.eventManager.addEventListener(WXEventNames.REWARD_VIDEO_AD_CLOSE, this.videoAdEventsHandler, this, 100);
        WXUtils.eventManager.addEventListener(WXEventNames.REWARD_VIDEO_AD_COMPLETE, this.videoAdEventsHandler, this, 100);
        WXUtils.eventManager.addEventListener(WXEventNames.REWARD_VIDEO_AD_ERROR, this.videoAdEventsHandler, this, 100);
    }


    private static videoAdEventsHandler(e: EventData): void {
        this.reset();

        if (e.type == WXEventNames.REWARD_VIDEO_AD_CLOSE) {
            //用户中断
            if (!WXRewardVideoAd.isReady) return;

            e.stopPropagation();

            //弹出alert
            WXUtils.showAlert(this._alertTitle,
                this._alertConent,
                this._alertConfirmLabel,
                this._alertCancel,
                this.alertConfirmCallback.bind(this),
            )
        } else {

        }
    }



    private static alertConfirmCallback(): void {
        //再次显示广告
        WXRewardVideoAd.show();

        if (this.closeAlertPlayAgainCallback != null) {
            this.closeAlertPlayAgainCallback();
        }
    }
}