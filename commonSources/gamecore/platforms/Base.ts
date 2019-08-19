/**
 * 兼容微信小游戏平台的方法
 * 
 * @param gameName      游戏名称
 */
export const Base_init = function () {
    if (window["wx"] != undefined) return;

    window["wx"] = {}
    var wx = window["wx"]

    //=========================================================================
    //画布
    //=========================================================================
    let canvas = document.createElement("Canvas")
    if (canvas) {
        canvas["__proto__"].toTempFilePath = function (obj) {
            console.log("------【Base】 toTempFilePath-------");

            let successFun: Function = obj ? obj["success"] : null;
            let failFun: Function = obj ? obj["fail"] : null;
            let completeFun: Function = obj ? obj["complete"] : null;

            if (failFun) failFun();
            if (completeFun) completeFun();
        };

        canvas["__proto__"].toTempFilePathSync = function (obj) {
            console.log("------【Base】 toTempFilePathSync-------");
            return null;
        };
        // canvas.toTempFilePath = function (obj) {
        //     console.log("------【Base】 toTempFilePath-------");
        // };
    }
    //=========================================================================


    //=========================================================================
    //图片
    //=========================================================================
    wx.createImage = function (): any {
        console.log("------【Base】 createImage-------")
        let img: any = new Image();
        // let img: any = document.createElement("img");
        console.log("image is " + img);
        return img;
    }
    //=========================================================================



    //=========================================================================
    //游戏圈
    //=========================================================================
    wx.createGameClubButton = function (obj: any): any {
        return {
            onTap: function (callback: Function): void {
            },
            offTap: function (callback: Function): void {
            },
            show: function (): void {
            },
            hide: function (): void {
            },
            destory: function (): void {
            }
        };
    }
    //=========================================================================

    //=========================================================================
    //登陆
    //=========================================================================

    //微信登陆
    wx.login = function (obj: any): void {
        console.log("------【Base】 login-------")
    }


    //=========================================================================
    //设备
    //=========================================================================
    wx.getSystemInfoSync = function (obj: any): any {
        console.log("------【Base】 getSystemInfoSync-------")
        return {};
    }

    wx.getSystemInfo = function (obj: any): void {
        console.log("------【Base】 getSystemInfo-------")
    }

    wx.vibrateShort = function (obj: any): void {
        console.log("------【Base】 vibrateShort-------")
    }
    wx.vibrateLong = function (obj: any): void {
        console.log("------【Base】 vibrateLong-------")
    }
    wx.onMemoryWarning = function (callback: Function): void {
        console.log("------【Base】 onMemoryWarning-------")
    }
    //=========================================================================



    //=========================================================================
    //用户信息
    //=========================================================================

    //用户信息
    wx.__userInfoRes = null;

    //获取用户信息
    wx.getUserInfo = function (obj: any = null): void {
        console.log("------【Base】 getUserInfo-------")

        let successFun: Function = obj ? obj["success"] : null;
        let failFun: Function = obj ? obj["fail"] : null;
        let completeFun: Function = obj ? obj["complete"] : null;

        if (wx.__userInfoRes) {
            if (successFun) successFun(JSON.parse(JSON.stringify(wx.__userInfoRes)))
        } else {
            if (failFun) failFun()
        }

        if (completeFun) completeFun();
    }


    wx.createUserInfoButton = function (obj: any = null): any {
        console.log("------【Base】 createUserInfoButton-------")
        console.log(obj);

        return null;
    }
    //=========================================================================


    //=========================================================================
    //开放数据
    //=========================================================================
    wx.getFriendCloudStorage = function (obj: object): void {
        console.log("------【Base】 getFriendCloudStorage-------")
        console.log(obj)
    }


    /**
     * 读取用户数据
     */
    wx.getUserCloudStorage = function (obj: object): void {
        console.log("------【Base】 setUserCloudStorage-------")
    }


    /**
     * 保存用户数据
     */
    wx.setUserCloudStorage = function (obj: object): void {
        console.log("------【Base】 setUserCloudStorage-------")
    }

    //=========================================================================

    //=========================================================================
    //设置
    //=========================================================================
    wx.getSetting = function (obj: any): void {
        console.log("------【Base】 getSetting-------")

        let successFun: Function = obj ? obj["success"] : null;
        let failFun: Function = obj ? obj["fail"] : null;
        let completeFun: Function = obj ? obj["complete"] : null;

        let res: any = {
            "authSetting": {
                "scope.userInfo": true
            }
        }
        
        if (successFun) successFun(res);
        if (completeFun) completeFun();
    }
    //=========================================================================


    //=========================================================================
    //小程序跳转
    //=========================================================================
    wx.navigateToMiniProgram = function (obj: any) {
        console.log("------【Base】 navigateToMiniProgram-------")
    }
    //=========================================================================

    //=========================================================================
    //开放数据域
    //=========================================================================
    wx.__openDataContext = {
        callbacks: [],
        postMessage: function (msg: any): void {
            wx.__openDataContext.callbacks.forEach((fun) => {
                fun(msg);
            });
        }
    }
    wx.getOpenDataContext = function (): any {
        return wx.__openDataContext;
    }

    wx.onMessage = function (callback: Function): void {
        let callbacks: Array<Function> = wx.__openDataContext.callbacks;
        if (callbacks.indexOf(callback) == -1) {
            callbacks.push(callback);
        }
    }
    //=========================================================================




    //=========================================================================
    //系统信息
    //=========================================================================
    wx.getSystemInfo = function (obj: any): any {
        console.log("------【Base】 getSetting-------")
    }
    //=========================================================================


    //=========================================================================
    //生命周期
    //=========================================================================
    wx.exitMiniProgram = function (obj: any): void {
        console.log("------【Base】 exitMiniProgram-------")
    }

    wx.__query = null;
    wx.getLaunchOptionsSync = function (): any {
        console.log("------【Base】 getLaunchOptionsSync-------")

        return {
            scene: 0,
            query: {},
            isSticky: 0,
            shareTicket: null,
        }
    }

    wx.onHide = function (callback: Function): void {
        console.log("------【Base】 onHide-------")
    }

    wx.onShow = function (callback: Function): void {
        console.log("------【Base】 onShow-------");
    }

    wx.offHide = function (callback: Function): void {
        console.log("------【Base】 offHide-------")
    }

    wx.offShow = function (callback: Function): void {
        console.log("------【Base】 offShow-------")
    }

    wx.onClose = function (callback: Function): void {
        console.log("------【Base】 onClose-------")
    }

    wx.offClose = function (callback: Function): void {
        console.log("------【Base】 offClose-------")
    }

    wx.onAudioInterruptionEnd = function (callback: Function): void {
        console.log("------【Base】 onAudioInterruptionEnd-------")
    }

    //=========================================================================


    //=========================================================================
    //文件
    //=========================================================================
    wx.getFileSystemManager = function (): any {
        console.log("------【Base】 getFileSystemManager-------")
        return null
    }
    //=========================================================================


    //=========================================================================
    //转发
    //=========================================================================

    wx.getShareInfo = function (obj: any) {

    }

    wx.hideShareMenu = function (obj: any) {

    }

    wx.showShareMenu = function (obj: any) {

    }

    wx.updateShareMenu = function (obj: any) {

    }
    /**
     * roomId	number	房间id	如使用BK.Room房间逻辑，可填入对应roomId，如开发者自建房间，填0
     * summary	string	分享wording	
     * picUrl	string	图片的网络链接	
     * isSelectFriend	boolean	选择好友	为true则跳出选择好友的列表
     * extendInfo	string	扩展信息	开发者可自定义该信息，用与传输参数
     * callback	function	分享结果回调	可选 ,具体类型如下例 （手Q7.6.3以以上版本支持）
     */
    wx.shareAppMessage = function (obj: any): void {
        // title	string		否	转发标题，不传则默认使用当前小游戏的昵称。	
        // imageUrl	string		否	转发显示图片的链接，可以是网络图片路径或本地图片文件路径或相对代码包根目录的图片文件路径。显示图片长宽比是 5:4	
        // query	string
        console.log("------【Base】 shareAppMessage-------")
    }


    wx.onShareAppMessage = function (callback: Function) {
        console.log("------【Base】 onShareAppMessage-------")
    }

    wx.offShareAppMessage = function (callback: Function) {

    }
    //=========================================================================


    //=========================================================================
    //广告
    //=========================================================================
    wx.createRewardedVideoAd = function (obj: any): any {
        console.log("------【Base】 createRewardedVideoAd-------")
        return null;
    }

    wx.createInterstitialAd = function (obj: any): any {
        console.log("------【Base】 createInterstitialAd-------")
        return null;
    }

    wx.createBannerAd = function (obj: any): any {
        console.log("------【Base】 createBannerAd-------")
        return null;
    }
    //=========================================================================

    //=========================================================================
    //虚拟支付
    //=========================================================================
    //@see https://hudong.qq.com/docs/engine/pay/item/purchase.html
    wx.requestMidasPayment = function (obj: any): void {
        console.log("------【Base】 requestMidasPayment-------")
    }
    //=========================================================================


    //=========================================================================
    //界面交互
    //=========================================================================

    wx.hideLoading = function (obj: any): void {
        console.log("------【Base】 hideLoading-------");
    }


    wx.hideToast = function (obj: any): void {
        console.log("------【Base】 hideToast-------");
    }


    wx.showLoading = function (obj: any): void {
        console.log("------【Base】 showLoading-------")
    }

    wx.showModal = function (obj: any): void {
        console.log("------【Base】 showModal-------");

        let successFun: Function = obj ? obj["success"] : null;
        let failFun: Function = obj ? obj["fail"] : null;
        let completeFun: Function = obj ? obj["complete"] : null;

        let res:object = {
            "confirm":false,
            "cancel":true
        }

        if (successFun) successFun(res);
        if (completeFun) completeFun();
    }


    wx.showToast = function (obj: any): void {
        console.log("------【Base】 showToast-------");
    }
    //=========================================================================

    //=========================================================================
    //菜单
    //=========================================================================
    wx.getMenuButtonBoundingClientRect = function (): any {
        console.log("------【Base】 getMenuButtonBoundingClientRect -------")
        return { "top": 0, "left": 0, "width": 0, "height": 0, "bottom": 0, "right": 0 }
    }

    wx.setMenuStyle = function (style: any): any {
        console.log("------【Base】 setMenuStyle-------")
    }
    //=========================================================================

    //=========================================================================
    //剪贴板
    //=========================================================================
    wx.setClipboardData = function (obj: any): any {
        console.log("------【Base】 setClipboardData -------")
        if (!obj) return;

        console.log(obj.data)

        let successFun: Function = obj ? obj["success"] : null;
        let failFun: Function = obj ? obj["fail"] : null;
        let completeFun: Function = obj ? obj["complete"] : null;

        if (failFun) failFun({});
        if (completeFun) completeFun();
    }

    wx.getClipboardData = function (obj: any): any {
        console.log("------【Base】 wx.getClipboardData -------")
        if (!obj) return;

        let successFun: Function = obj ? obj["success"] : null;
        let failFun: Function = obj ? obj["fail"] : null;
        let completeFun: Function = obj ? obj["complete"] : null;

        if (successFun) successFun({"data":""});
        if (completeFun) completeFun();
    }
    //=========================================================================


    //=========================================================================
    //屏幕
    //=========================================================================
    wx.setScreenBrightness = function (obj: any): any {
        console.log("------【Base】 setScreenBrightness -------")
        if (!obj) return;

        console.log(obj.data)

        let successFun: Function = obj ? obj["success"] : null;
        let failFun: Function = obj ? obj["fail"] : null;
        let completeFun: Function = obj ? obj["complete"] : null;

        if (failFun) failFun({});
        if (completeFun) completeFun();
    }

    wx.setKeepScreenOn = function (obj: any): any {
        console.log("------【Base】 wx.setKeepScreenOn -------")
        if (!obj) return;

        let successFun: Function = obj ? obj["success"] : null;
        let failFun: Function = obj ? obj["fail"] : null;
        let completeFun: Function = obj ? obj["complete"] : null;

        if (failFun) failFun({});
        if (completeFun) completeFun();
    }

    wx.getScreenBrightness = function (obj: any): any {
        console.log("------【Base】 wx.getScreenBrightness -------")
        if (!obj) return;

        let successFun: Function = obj ? obj["success"] : null;
        let failFun: Function = obj ? obj["fail"] : null;
        let completeFun: Function = obj ? obj["complete"] : null;

        if (successFun) successFun({"value":0});
        if (completeFun) completeFun();
    }
    //=========================================================================

    //发送请求
    wx.request = function (obj: any): void {
        console.log("------【Base】 request-------")

        console.log(JSON.stringify(obj));
        if (!obj) return;

        let url: string = obj["url"];
        if (!url) return;

        let successFun: Function = obj ? obj["success"] : null;
        let failFun: Function = obj ? obj["fail"] : null;
        let completeFun: Function = obj ? obj["complete"] : null;

        let method: string = obj["method"] || "get";
        method = method.toLocaleLowerCase();

        //数据类型
        let dataType: string = obj["dataType"] || "json";
        dataType = dataType.toLowerCase();

        //请求类型
        let responseType: any = obj["responseType"] || "text";
        responseType = responseType.toLowerCase();

        let data: object = obj["data"];
        let dataV: string = "";
        if (data) {
            for (let key in data) {
                if (dataV != "") dataV += "&";
                dataV += key + "=" + encodeURIComponent(data[key]);
            }
            console.log(dataV);
            if (method != "post") {
                if (url.indexOf("?") >= 0) {
                    url += "&" + dataV;
                } else {
                    url += "?" + dataV;
                }
            }
        }


        let request: XMLHttpRequest = new XMLHttpRequest();
        request.open(method.toLocaleUpperCase(), url, true);
        request.responseType = responseType;

        request.onload = function () {
            console.log("【Base】request success");

            let res: any = request.response;
            try {
                if (dataType == "json") {
                    res = JSON.parse("" + res);
                    //向微信的返回数据格式看齐
                    res = { "data": res };
                } else {
                }
            } catch (error) {

            }

            if (successFun) successFun(res);
            if (completeFun) completeFun();
        }


        request.onerror = function () {
            console.log("【Base】request error");

            if (failFun) failFun();
            if (completeFun) completeFun();
        }


        //设置头信息
        let header: object = obj["header"];
        if (header) {
            for (let key in header) {
                request.setRequestHeader(key, header[key]);
            }
        }


        if (method == "post") {
            request.send(dataV);
        } else {
            request.send(null);
        }
    }

}

