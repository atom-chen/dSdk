import Utils from "../managers/Utils";
import EventDispacher from "../managers/event/EventDispacher";

/**
 * 微信功能类
 */

export default class WXUtils {
    /**
     * 事件派发器。使用GameManager时，会被替换。
     */
    public static eventManager:EventDispacher;
    // public static get eventManager():EventDispacher {
    //     if (!WXUtils._eventManager) {
    //         debugger
    //         if (typeof GameManager === 'function'){
    //             WXUtils._eventManager = GameManager.eventManager;
    //         }
    //     }
    //     return WXUtils._eventManager;
    // }

    /**
     * 显示信息提示
     * 
     * @param info 信息内容
     * @param duration 显示时间（毫秒）
     */
    static showToast(info: string, duration: number = 1500): void {
        console.log("----  WX Utils ----");
        console.log("-  showToast  -");
        console.log(info)

        //兼容处理。担心开发者使用秒做单位
        if (duration < 10) duration *= 1000;

        if (typeof wx == "undefined") return;

        wx.showToast({
            "title": info,
            "icon": "none",  	    //有效值 "success", "loading", "none"	
            "duration": duration,  	//提示的延迟时间，单位毫秒，默认：1500
            "mask": false,          //是否显示透明蒙层，防止触摸穿透，默认：false	
        });
    }

    /**
     * 影藏信息提示
     * 
     */
    static hideToast(): void {
        console.log("----  WX Utils ----");
        console.log("-  hideToast  -");

        if (typeof wx == "undefined") return;

        wx.hideToast({});
    }


    /**
     * 显示 loading 提示框。需主动调用 wx.hideLoading 才能关闭提示框
     * 
     * @param info 信息内容
     * @param duration 显示时间（毫秒）
     */
    static showLoading(info: string = ''): void {
        console.log("----  WX Utils ----");
        console.log("-  showLoading  -");
        console.log(info);
        if (typeof wx == "undefined") return;
        try {
            wx.showLoading({
                "title": info,
            });
        } catch (error) {

        }
    }


    /**
    * 隐藏 loading 提示框
    * 
    * @param info 信息内容
    */
    static hideLoading(): void {
        console.log("----  WX Utils ----");
        console.log("-  hideLoading  -");
        if (typeof wx == "undefined") return;
        try {
            wx.hideLoading();
        } catch (error) {

        }
    }



    /**
     * 跳转至小程序
     * 
     * 必须是同一公众号下，而非同个 open 账号下
     * 
     * @param appID 
     * @param path 
     * @param extraData 
     * 
     * @see https://developers.weixin.qq.com/minigame/dev/document/open-api/miniprogram-navigate/wx.navigateToMiniProgram.html
     */
    static navigateToMiniProgram(
        appID: string,
        path: string = null,
        extraData: object = null,
        success: Function = null,
        fail: Function = null
    ): void {

        console.log("----  WX Utils ----");
        console.log("-  navigateToMiniProgram  -");
        console.log(appID, path)

        if (typeof wx == "undefined") {
            if (fail) fail();
            return;
        }

        try {
            wx.navigateToMiniProgram({
                "appId": appID,
                "path": path,
                "extraData": extraData,
                "success": success,
                "fail": fail
            });
        } catch (error) {

        }
    }



    /**
     * 获取小程序启动参数
     */
    static getLaunchOptionsSync(): object {
        console.log("----  WX Utils ----");
        console.log("-  getLaunchOptionsSync  -");
        if (typeof wx == "undefined") return null;

        return wx.getLaunchOptionsSync();
    }



    /**
     * 获取右上角按钮坐标
     * 
     * 游戏刚运行后，该方法会获得错误left、top属性。需要延迟处理
     */
    static getMenuButtonLayout(): {"x":number, "y":number, "width":number, "height":number} {
        console.log("----  WX Utils ----");
        console.log("-  getMenuButtonLayout  -");

        if (typeof wx == "undefined") return null;

        let obj: any = wx.getMenuButtonBoundingClientRect();

        let screenRect: {"x":number, "y":number, "width":number, "height":number} = Utils.fromScreenRect({"x":obj.left, "y":obj.top, "width":obj.width, "height":obj.height});
        console.log("in game is", screenRect);
        
        return screenRect;
    }



    /**
     * 打开客服
     */
    static openCustomerServiceConversation(): void {
        console.log("----  WX Utils ----");
        console.log("-  openCustomerServiceConversation  -");

        if (typeof wx == "undefined") return null;

        wx.openCustomerServiceConversation();
    }


    /**
     * 显示alert
     * 
     * @param title 
     * @param content 
     * @param confirmLabel 
     * @param cancelLabel 
     * @param confirmCallback 
     * @param cancelCallback 
     */
    static showAlert(title: string, content: string, confirmLabel: string = null, cancelLabel: string = null, confirmCallback: Function = null, cancelCallback: Function = null): void {
        console.log("----  WX Utils ----");
        console.log("-  showAlert  -");

        if (typeof wx == "undefined") {
            if (cancelCallback != null) cancelCallback();
            else if (confirmCallback != null) confirmCallback();

            return null;
        }

        let obj: object = {};
        obj["title"] = title;
        obj["content"] = content;

        if (cancelLabel) {
            obj["showCancel"] = true;
            obj["cancelText"] = cancelLabel;
        } else {
            obj["showCancel"] = false;
        }

        if (confirmLabel) {
            obj["confirmText"] = confirmLabel;
        }

        //回调
        obj["success"] = function (res: any): void {
            if (res) {
                if (res.confirm) {
                    if (confirmCallback) confirmCallback();
                } else if (res.cancel) {
                    if (cancelCallback) cancelCallback();
                }
            }
        }

        wx.showModal(obj);
    }

}
