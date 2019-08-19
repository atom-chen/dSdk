/**
 * 今日头条
 */

var JRTT_startTime: Date;

/**
 * 生成兼容微信小游戏平台的方法
 * 
 * @param gameName      游戏名称
 */
export const JRTT_init = function () {
    
    //开始时间
    JRTT_startTime = new Date();

    if (typeof tt == "undefined") return;
    
    window["wx"] = tt;

    //@see https://developer.toutiao.com/docs/game/ui/menu/tt.getMenuButtonLayout.html
    tt.getMenuButtonBoundingClientRect = tt.getMenuButtonLayout;


    wx.createUserInfoButton = function (obj: any = null): any {
        console.log("------【JRTT】 createUserInfoButton-------")
        console.log(obj)
        return null;
    }
}