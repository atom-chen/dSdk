import { Base_init } from "./Base";




/**
 * ios接口调用
 * 
 * 
 * 
 * 
 */
export const IOS_init = function () {
    Base_init();

    var wx = window["wx"]

    wx.getSystemInfoSync = function (obj: any): any {
        console.log("------【IOS】 getSystemInfoSync-------")

        try {
            window["WebViewJavascriptBridge"] .callHandler(
              "getSystemInfoSync",
              "",
              function(responseData) {
                bridgeLog("来自Java的回传数据： " + responseData);
              }
            );
        } catch (e) {
        console.log(e);
        }

        return {};
    }

    wx.getSystemInfo = function (obj: any): void {
        console.log("------【IOS】 getSystemInfo-------")

        try {
            window["WebViewJavascriptBridge"] .callHandler(
            "getSystemInfo",
            "",
            function(responseData) {
                bridgeLog("来自Java的回传数据： " + responseData);
            }
            );
        } catch (e) {
            console.log(e);
        }
    }

    wx.showToast = function (obj: any): void {
        console.log("------【IOS】 showToast-------");

        try {
            var param = { title: obj.title, duration: obj.duration };
            window["WebViewJavascriptBridge"] .callHandler("showToast", param, function(
              responseData
            ) {
              bridgeLog("来自Java的回传数据： " + responseData);
            });
        } catch (e) {
        console.log(e);
        }
    }


    wx.hideToast = function (obj: any): void {
        console.log("------【IOS】 hideToast-------");

        try {
            window["WebViewJavascriptBridge"] .callHandler("hideToast", "", function(
              responseData
            ) {
              bridgeLog("来自Java的回传数据： " + responseData);
            });
        } catch (e) {
        console.log(e);
        }
    }

    wx.showLoading = function (obj: any): void {
        console.log("------【IOS】 showLoading-------")

        try {
            var param = "加载中...";
            window["WebViewJavascriptBridge"] .callHandler(
              "showLoading",
              param,
              function(responseData) {
                bridgeLog("来自Java的回传数据： " + responseData);
              }
            );
        } catch (e) {
        console.log(e);
        }
    }

    wx.hideLoading = function (obj: any): void {
        console.log("------【IOS】 hideLoading-------");

        try {
            window["WebViewJavascriptBridge"] .callHandler("hideLoading", "", function(
              responseData
            ) {
              bridgeLog("来自Java的回传数据： " + responseData);
            });
        } catch (e) {
        console.log(e);
        }
    }


    wx.vibrateShort = function (obj: any): void {
        console.log("------【IOS】 vibrateShort-------")

        try {
            // window["webkit"].messageHandlers.vibrateShort.postMessage(null);
            var param = "vibrateShort";
            window["WebViewJavascriptBridge"] .callHandler(
              "vibrateShort",
              param,
              function(responseData) {
                bridgeLog("来自Java的回传数据： " + responseData);
              }
            );
        } catch (e) {
        console.log(e);
        }
    }

    wx.vibrateLong = function (obj: any): void {
        console.log("------【IOS】 vibrateLong-------")

        try {
            // window["webkit"].messageHandlers.vibrateLong.postMessage(null);
            var param = "vibrateLong";
            window["WebViewJavascriptBridge"] .callHandler(
              "vibrateLong",
              param,
              function(responseData) {
                bridgeLog("来自Java的回传数据： " + responseData);
              }
            );
        } catch (e) {
        console.log(e);
        }
    }

    wx.shareAppMessage = function (obj: any): void {
        console.log("------【IOS】 shareAppMessage-------")

        try {
            // window["webkit"].messageHandlers.vibrateLong.postMessage(null);
            var param = "调用系统分享";
            window["WebViewJavascriptBridge"] .callHandler(
              "shareAppMessage",
              param,
              function(responseData) {
                bridgeLog("来自Java的回传数据： " + responseData);
              }
            );
        } catch (e) {
        console.log(e);
        }
    }

    wx.setScreenBrightness = function (obj: any): any {
        console.log("------【IOS】 setScreenBrightness -------")

        try {
            var param = "{value:0.25}";
            window["WebViewJavascriptBridge"] .callHandler(
              "setScreenBrightness",
              param,
              function(responseData) {
                bridgeLog("来自Java的回传数据： " + responseData);
              }
            );
          } catch (e) {
            console.log(e);
          }
    }

    wx.setKeepScreenOn = function (obj: any): any {
        console.log("------【IOS】 wx.setKeepScreenOn -------")

        try {
            window["WebViewJavascriptBridge"] .callHandler(
              "setKeepScreenOn",
              "",
              function(responseData) {
                bridgeLog("来自Java的回传数据： " + responseData);
              }
            );
        } catch (e) {
        console.log(e);
        }
    }

    wx.getScreenBrightness = function (obj: any): any {
        console.log("------【IOS】 wx.getScreenBrightness -------")

        try {
        var param = "获取屏幕亮度";
        window["WebViewJavascriptBridge"] .callHandler(
            "getScreenBrightness",
            param,
            function(responseData) {
            bridgeLog("来自Java的回传数据： " + responseData);
            }
        );
        } catch (e) {
        console.log(e);
        }
    }

    wx.getMenuButtonBoundingClientRect = function (): any {
        console.log("------【IOS】 getMenuButtonBoundingClientRect -------")
        return { "top": 0, "left": 0, "width": 0, "height": 0, "bottom": 0, "right": 0 }
    }

     //=========================================================================
    //广告
    //=========================================================================
    wx.createRewardedVideoAd = function (obj: any): any {
        console.log("------【IOS】 createRewardedVideoAd-------")
        let theAd:RewardedVideoAd = new RewardedVideoAd();

        return theAd;
    }

    wx.createInterstitialAd = function (obj: any): any {
        console.log("------【IOS】 createInterstitialAd-------")
        return null;
    }

    wx.createBannerAd = function (obj: any): any {
        var param = JSON.stringify(obj);
        console.log("------【IOS】 createBannerAd-------" + param)

        let theAd = new BannerAd();
        try {
            window["WebViewJavascriptBridge"].callHandler(
                "createBannerAd",
                param,
                function(responseData) {
                    theAd.adId = responseData;
                    bridgeLog("来自Java的回传数据： " + responseData);
                }
            );
        } catch (error) {
            
        }
        
        return theAd;
    }
    //=========================================================================
}

/**
 * banner广告
 */
class BannerAd {
    public adId:string;

    constructor() {

    }


    public show():void {
        console.log("~~~~~bannershow");
        var param= {adId:this.adId}
        try {
            window["WebViewJavascriptBridge"].callHandler(
            "bannerShow",
            param,
            function(responseData) {
                bridgeLog("来自Java的回传数据： " + responseData);
            }
            );
        } catch (e) {
            console.log(e);
        }
    }

    public hide():void {
        console.log("~~~~~bannerHide");
        var param= {adId:this.adId}
        try {
            window["WebViewJavascriptBridge"].callHandler(
            "bannerHide",
            param,
            function(responseData) {
                bridgeLog("来自Java的回传数据： " + responseData);
            }
            );
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * 销毁
     */
    public destroy():void {
        console.log("~~~~~bannerDestroy");
        var param= {adId:this.adId}
        try {
            window["WebViewJavascriptBridge"].callHandler(
            "bannerDestroy",
            param,
            function(responseData) {
                bridgeLog("来自Java的回传数据： " + responseData);
            }
            );
        } catch (e) {
            console.log(e);
        }

        this.adId = null;
        
        this._loadCallbacks = [];
        this._resizeCallbacks = [];
        this._errorCallbacks = [];
    }


    private _loadCallbacks:Array<Function> = [];

    public onLoad(fun:Function):void {
        if (this._loadCallbacks.indexOf(fun) == -1) {
            this._loadCallbacks.push(fun);
        }
    }

    public offLoad(fun:Function):void {
        let index:number = this._loadCallbacks.indexOf(fun);
        if (index >= 0) {
            this._loadCallbacks.splice(index, 1);
        }
    }

    public doLoaded():void {
        this._loadCallbacks.forEach((fun)=>{
            fun();
        })
    }

    private _resizeCallbacks:Array<Function> = [];

    public onResize(fun:Function):void {
        if (this._resizeCallbacks.indexOf(fun) == -1) {
            this._resizeCallbacks.push(fun);
        }
    }
    public offResize(fun:Function):void {
        let index:number = this._resizeCallbacks.indexOf(fun);
        if (index >= 0) {
            this._resizeCallbacks.splice(index, 1);
        }
    }

    public doResize():void {
        this._resizeCallbacks.forEach((fun)=>{
            fun();
        })
    }

    private _errorCallbacks:Array<Function> = [];

    public onError(fun:Function):void {
        if (this._errorCallbacks.indexOf(fun) == -1) {
            this._errorCallbacks.push(fun);
        }
    }
    public offError(fun:Function):void {
        let index:number = this._errorCallbacks.indexOf(fun);
        if (index >= 0) {
            this._errorCallbacks.splice(index, 1);
        }
    }

    public doError(err):void {
        this._errorCallbacks.forEach((fun)=>{
            fun(err);
        })
    }
}


/**
 * 激励视频广告
 */
class RewardedVideoAd {
    public adId:string;

    constructor() {

    }


    public load():void {
        console.log("~~~~~rewardedVideoAdLoad");
        var param= {adId:this.adId}
        try {
            window["WebViewJavascriptBridge"].callHandler(
            "rewardedVideoAdLoad",
            param,
            (responseData)=> {
                this.doLoaded();
                bridgeLog("来自Java的回传数据： " + responseData);
            }
            );
        } catch (e) {
            console.log(e);
        }
    }

    public show():void {
        console.log("~~~~~rewardedVideoAdShow");
        var param= {adId:this.adId}
        try {
            window["WebViewJavascriptBridge"].callHandler(
            "rewardedVideoAdShow",
            param,
            (responseData)=> {
                this.doLoaded();
                bridgeLog("来自Java的回传数据： " + responseData);
            }
            );
        } catch (e) {
            console.log(e);
        }
    }


    private _loadCallbacks:Array<Function> = [];

    public onLoad(fun:Function):void {
        if (this._loadCallbacks.indexOf(fun) == -1) {
            this._loadCallbacks.push(fun);
        }
    }

    public offLoad(fun:Function):void {
        let index:number = this._loadCallbacks.indexOf(fun);
        if (index >= 0) {
            this._loadCallbacks.splice(index, 1);
        }
    }

    public doLoaded():void {
        this._loadCallbacks.forEach((fun)=>{
            fun();
        })
    }

    private _closeCallbacks:Array<Function> = [];

    public onClose(fun:Function):void {
        if (this._closeCallbacks.indexOf(fun) == -1) {
            this._closeCallbacks.push(fun);
        }
    }
    public offResize(fun:Function):void {
        let index:number = this._closeCallbacks.indexOf(fun);
        if (index >= 0) {
            this._closeCallbacks.splice(index, 1);
        }
    }

    public doClose():void {
        this._closeCallbacks.forEach((fun)=>{
            fun();
        })
    }

    private _errorCallbacks:Array<Function> = [];

    public onError(fun:Function):void {
        if (this._errorCallbacks.indexOf(fun) == -1) {
            this._errorCallbacks.push(fun);
        }
    }
    public offError(fun:Function):void {
        let index:number = this._errorCallbacks.indexOf(fun);
        if (index >= 0) {
            this._errorCallbacks.splice(index, 1);
        }
    }

    public doError(err):void {
        this._errorCallbacks.forEach((fun)=>{
            fun(err);
        })
    }
}

