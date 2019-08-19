import GameValues, { Orientation } from "../base/GameValues";
import { Base_init } from "./Base";



//pkg包名称
var Oppo_pkgName: string;

/**
 * oppo快应用 兼容微信小游戏平台的方法
 * 
 * @see https://cdofs.oppomobile.com/cdo-activity/static/201810/26/quickgame/documentation/feature/account.html
 * 
 * @param pkgName       包名
 */
export const Oppo_init = function (pkgName: string) {
    Base_init();

    Oppo_pkgName = pkgName;

    var wx = window["wx"]


    //=========================================================================
    //画布
    //=========================================================================
    let canvas: any = GameValues.canvas;
    if (canvas) {
        /**
         * 同步获取的是canvas数据
         */
        //@see https://hudong.qq.com/docs/engine/engine/native/func/funcs/other.html
        canvas.toTempFilePathSync = function (obj: any): string {
            console.log("------【Oppo】 toTempFilePathSync-------");
            return null;
        }

        /**
         * 异步获取的是webGL数据
         */
        canvas.toTempFilePath = function (obj: any): void {
            console.log("------【Oppo】 toTempFilePath-------")
        }
    }
    //=========================================================================


    //=========================================================================
    //图片
    //=========================================================================
    wx.createImage = function (): any {
        console.log("------【Oppo】 createImage-------")
        let img: any = new Image();
        console.log("image is " + JSON.stringify(img));
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
        console.log("------【Oppo】 login-------")
        console.log(JSON.stringify(obj));

        if (typeof qg == "undefined") return;

        let successFun: Function = obj ? obj["success"] : null;
        let failFun: Function = obj ? obj["fail"] : null;
        let completeFun: Function = obj ? obj["complete"] : null;

        console.log("开始登陆 pkgName is", Oppo_pkgName);
        console.log("qg.login is", qg.login);

        let timerID = setInterval(() => {
            console.log("检查login, timer id is", timerID);

            if (qg.login == undefined || qg.login == null) return;
            clearInterval(timerID);

            qg.login({
                pkgName: Oppo_pkgName,
                success: (res) => {
                    console.log(JSON.stringify(res));

                    /*
                    uid	string	用户唯一Id
                    token	string	token
                    nickName	string	昵称
                    avatar	string	头像
                    sex	string	性别，M：男，F：女
                    birthday	string	生日
                    phoneNum	string	手机号(带*号)
                    location	string	地理位置
                    */

                    //nickName: string, avatarUrl: string, gender: number, country: string, province: string, city: string } = null;
                    wx._userInfoRes = {
                        "userInfo": {
                            "openId": res["uid"],
                            "nickName": res["nickName"],
                            "avatarUrl": res["avatar"],
                            "gender": (res["sex"] == "M" ? "1" : "2")
                        },
                        "rawData": "",
                        "encryptedData": "",
                        "signature": ""
                    }

                    if (successFun) successFun({ code: res["token"] });
                    if (completeFun) completeFun();
                },
                fail: (err) => {
                    console.log(JSON.stringify(err));

                    if (failFun) failFun(err);
                    if (completeFun) completeFun();
                }
            });
        }, 0.3);

    }


    //=========================================================================
    //设备
    //=========================================================================
    wx.vibrateShort = function (obj: any): void {
        console.log("------【Oppo】 vibrateShort-------")
        if (typeof qg == "undefined") return;

        qg.vibrateShort(obj);
    }
    wx.vibrateLong = function (obj: any): void {
        console.log("------【Oppo】 vibrateLong-------")

        if (typeof qg == "undefined") return;

        qg.vibrateLong(obj);
    }
    wx.onMemoryWarning = function (callback: Function): void {
        console.log("------【Oppo】 onMemoryWarning-------")
    }
    //=========================================================================



    //=========================================================================
    //用户信息
    //=========================================================================

    //用户信息
    wx._userInfoRes = null;


    wx._isGettingUserInfo = false;
    wx._getUserInfoStack = [];

    //获取用户信息
    wx.getUserInfo = function (obj: any = null): void {
        console.log("------【Oppo】 getUserInfo-------")

        let successFun: Function = obj ? obj["success"] : null;
        let failFun: Function = obj ? obj["fail"] : null;
        let completeFun: Function = obj ? obj["complete"] : null;

        if (wx._userInfoRes != null) {
            if (successFun) successFun(wx._userInfoRes);
            if (completeFun) completeFun();
        } else {
            wx.login();

            if (failFun) failFun();
            if (completeFun) completeFun();
        }
    }


    wx.createUserInfoButton = function (obj: any = null): any {
        console.log("------【Oppo】 createUserInfoButton-------")
        console.log(obj);

        return null;
    }
    //=========================================================================


    //=========================================================================
    //开放数据
    //=========================================================================


    wx.getFriendCloudStorage = function (obj: object): void {
        console.log("------【Oppo】 getFriendCloudStorage-------")
        console.log(obj)
    }


    /**
     * 读取用户数据
     */
    wx.getUserCloudStorage = function (obj: object): void {
        console.log("------【Oppo】 setUserCloudStorage-------")
    }


    /**
     * 保存用户数据
     */
    wx.setUserCloudStorage = function (obj: object): void {
        console.log("------【Oppo】 setUserCloudStorage-------")
    }

    //=========================================================================

    //=========================================================================
    //设置
    //=========================================================================
    wx.getSetting = function (obj: any): void {
        console.log("------【Oppo】 getSetting-------")
    }
    //=========================================================================


    //=========================================================================
    //小程序跳转
    //=========================================================================
    wx.navigateToMiniProgram = function (obj: any) {
        console.log("------【Oppo】 navigateToMiniProgram-------")
    }
    //=========================================================================

    //=========================================================================
    //开放数据域
    //=========================================================================
    wx.getOpenDataContext = function (): any {
        return null;
    }

    wx.onMessage = function (callback: Function): void {
    }
    //=========================================================================




    //=========================================================================
    //系统信息
    //=========================================================================
    wx.getSystemInfo = function (obj: any): any {
        console.log("------【Oppo】 getSetting-------")
    }
    //=========================================================================


    //=========================================================================
    //生命周期
    //=========================================================================
    wx.exitMiniProgram = function (obj: any): void {
        console.log("------【Oppo】 exitMiniProgram-------")
    }

    wx.__query = null;
    wx.getLaunchOptionsSync = function (): any {
        console.log("------【Oppo】 getLaunchOptionsSync-------")

        return {
            scene: 0,
            query: {},
            isSticky: 0,
            shareTicket: null,
        }
    }

    wx.onHide = function (callback: Function): void {
        console.log("------【Oppo】 onHide-------")
    }

    wx.onShow = function (callback: Function): void {
        console.log("------【Oppo】 onShow-------");
    }

    wx.offHide = function (callback: Function): void {
        console.log("------【Oppo】 offHide-------")
    }

    wx.offShow = function (callback: Function): void {
        console.log("------【Oppo】 offShow-------")
    }

    wx.onClose = function (callback: Function): void {
        console.log("------【Oppo】 onClose-------")
    }

    wx.offClose = function (callback: Function): void {
        console.log("------【Oppo】 offClose-------")
    }

    //=========================================================================


    //=========================================================================
    //文件
    //=========================================================================
    wx.getFileSystemManager = function (): any {
        console.log("------【Oppo】 getFileSystemManager-------")

        if (typeof qg == "undefined") return null;

        return qg.getFileSystemManager();
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
     */
    wx.shareAppMessage = function (obj: any): void {
        console.log("------【Oppo】 shareAppMessage-------")

        let successFun: Function = obj ? obj["success"] : null;
        let failFun: Function = obj ? obj["fail"] : null;
        let completeFun: Function = obj ? obj["complete"] : null;

        if (failFun) failFun();
        if (completeFun) completeFun();
    }


    wx.onShareAppMessage = function (callback: Function) {
        console.log("------【Oppo】 onShareAppMessage-------")
    }

    wx.offShareAppMessage = function (callback: Function) {

    }
    //=========================================================================


    //=========================================================================
    //广告
    //=========================================================================
    wx.createRewardedVideoAd = function (obj: any): any {
        console.log("------【Oppo】 createRewardedVideoAd-------")
        return null;
    }

    wx.createBannerAd = function (obj: any): any {
        console.log("------【Oppo】 createBannerAd-------")
        return null;
    }
    //=========================================================================

    //=========================================================================
    //虚拟支付
    //=========================================================================
    //@see https://hudong.qq.com/docs/engine/pay/item/purchase.html
    wx.requestMidasPayment = function (obj: any): void {
        console.log("------【Oppo】 requestMidasPayment-------")
    }
    //=========================================================================


    //=========================================================================
    //界面交互
    //=========================================================================

    wx.hideLoading = function (obj: any): void {
        console.log("------【Oppo】 hideLoading-------");
    }


    wx.hideToast = function (obj: any): void {
        console.log("------【Oppo】 hideToast-------");
    }


    wx.showLoading = function (obj: any): void {
        console.log("------【Oppo】 showLoading-------")
    }

    wx.showModal = function (obj: any): void {
        console.log("------【Oppo】 showModal-------")
    }


    wx.showToast = function (obj: any): void {
        console.log("------【Oppo】 showToast-------")
    }
    //=========================================================================

    //=========================================================================
    //菜单
    //=========================================================================
    wx.getMenuButtonBoundingClientRect = function (): any {
        console.log("------【Oppo】 getMenuButtonBoundingClientRect-------")
        return { "top": 0, "left": 0, "width": 0, "height": 0, "bottom": 0, "right": 0 }
    }

    wx.setMenuStyle = function (style: any): any {
        console.log("------【Oppo】 setMenuStyle-------")
    }
    //=========================================================================

}

