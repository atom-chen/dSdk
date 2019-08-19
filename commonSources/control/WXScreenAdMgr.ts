import WXInterstitialAd from "../gamecore/wechat/WXInterstitialAd";
import StageDataMgr from "../module/data/StageDataMgr";
import DeerSDK from "../gamecore/deer/DeerSDK";
import MainDataMgr from "../module/data/MainDataMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class WXScreenAdMgr {
    
    private static _instance: WXScreenAdMgr = null;
    //====================单例=============================================================
    public static get instance(): WXScreenAdMgr {
      if (!WXScreenAdMgr._instance) WXScreenAdMgr._instance = new WXScreenAdMgr();
      return WXScreenAdMgr._instance;
    }

    private _adList:Array<string> = [];

    public set adList(arr:Array<string>){
        if(this._adList && this._adList.length != 0){
            console.error(this._adList,"已存在");
        }else{
            for(let i = 0; i < arr.length;i ++){
                this._adList.push(arr[i]);
            }
        }
        // console.log(this._adList,"list")
    }


    public get adList() {
        return this._adList;
    }


    
    /**
     * 随机播放一个插屏广告
    1.是当天登录新玩家->开关是true，显示插屏广告；开关是false但是大于16关，显示插屏广告；
    2.不是当天登录->显示插屏广告
     */
    showRandAd(){
        return;
        if (cc.sys.platform == cc.sys.WECHAT_GAME) {

            if(MainDataMgr.instance.getData(MainDataMgr.KEY_LOGIN_DAY) == (new Date().getMonth() + "月" +  new Date().getDate())){
                let data: any = DeerSDK.instance.game_config;
                if (data != undefined){
                    let newPlayerInterstitialSwitch_common = data.newPlayerInterstitialSwitch_common;
                    if(newPlayerInterstitialSwitch_common == true){
                        new WXInterstitialAd(this.adList[Math.floor(Math.random() * this._adList.length)]).show();
                    }else if(StageDataMgr.instance.getBestStageNum() > 16){
                        new WXInterstitialAd(this.adList[Math.floor(Math.random() * this._adList.length)]).show();
                    }
                }
            }else{
                new WXInterstitialAd(this.adList[Math.floor(Math.random() * this._adList.length)]).show();
            }
        }
    }



}