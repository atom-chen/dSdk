
/**
 * 屏幕方向
 */
export const enum Orientation {
    //指定舞台当前位于设备的默认方向（正面向上）。
    DEFAULT = "default",
    //指定舞台当前相对于默认方向向左旋转。
    ROTATED_LEFT = "rotatedLeft",
    //指定舞台当前相对于默认方向向右旋转。
    ROTATED_RIGHT = "rotatedRight",
    //指定舞台当前相对于默认方向向下翻转。
    UPSIDE_DOWN = "upsideDown"
}


/**
 * 游戏相关信息
 */
export default class GameValues {

    /** 版本号*/
    static gameVersion: string = "1.0";

    /** 内部版本号*/
    static gameInternalVersionCode: string;

    /** 是否是测试 false 正式服 true 测试服*/
    static isDebug: boolean = false;

    /** 屏幕方向*/
    public static orientation: Orientation = Orientation.DEFAULT;


    /**
     * 获取游戏canvas。用于实现微信平台的  canvas相关api
     * 
     * 这里目前仅支持cocos creator。
     */
    public static get canvas(): any {
        try {
            return cc.game["canvas"];
        } catch (error) {

        }

        try {
            return cc['Game'].canvas
        } catch (error) {

        }

        return null;
    }

    //================================================================================
    //数据存储
    //================================================================================


    /**
     * 保存本地数据
     * 
     * @param key 
     * @param data 
     */
    public static saveLocalData(key: string, data: any): void {
        try {
            cc.sys.localStorage.setItem("gv_" + key, data);
        } catch (error) {
            
        }
    }

    /**
     * 读取本地数据
     * 
     * @param key 
     */
    public static getLocalData(key: string): any {
        try {
            return cc.sys.localStorage.getItem("gv_" + key);
        } catch (error) {
            
        }
    }
    //================================================================================



    //================================================================================
    //日志拦截
    //================================================================================

    //是否输入日志
    private static _enableLog: boolean = true;

    private static _originalLogFun: Function = null;

    //日志回调
    public static logHandler:Function = null;

    /**
     * 设置是否开启日志
     */
    public static set enableLog(v: boolean) {
        if (GameValues._enableLog == v) return;
        GameValues._enableLog = v;

        if (GameValues._originalLogFun == null) {
            GameValues._originalLogFun = console.log;

            console.log = function (...args): void {
                if (GameValues._enableLog) {
                    GameValues._originalLogFun.apply(null, args);
                }
                
                if (GameValues.logHandler) GameValues.logHandler(args)
            }
        }
    }


    /**
     * 获取是否已开启日志
     */
    public static get enableLog(): boolean {
        return GameValues._enableLog;
    }
    //================================================================================


    private static _currentPlatform: PlatformName = 0;

    /**
     * 获取当前平台
     * 
     */
    public static get currentPlatform(): PlatformName {
        if (GameValues._currentPlatform == 0) {
            if (typeof BK != "undefined") {
                GameValues.currentPlatform = PlatformName.QQCM;
            } else if (typeof tt != "undefined") {
                GameValues.currentPlatform = PlatformName.TOUTIAO
            } else if (typeof wx != "undefined") {
                GameValues.currentPlatform = PlatformName.WECHAT
            } else if (typeof qg != "undefined") {
                GameValues.currentPlatform = PlatformName.OPPO
            } else if (typeof FBInstant != "undefined") {
                GameValues.currentPlatform = PlatformName.FACEBOOK
            } else {
                //默认
                GameValues.currentPlatform = PlatformName.WECHAT;
            }
        }

        return GameValues._currentPlatform;
    }

    /**
     * 设置当前平台
     */
    public static set currentPlatform(v: PlatformName) {
        if (GameValues._currentPlatform != v) {
            GameValues._currentPlatform = v;
        }
    }



    private static _isIOS: boolean = undefined;

    /**
     * 检查是否是iOS设备
     */
    public static get isIOS(): boolean {
        if (GameValues._isIOS == undefined) {
            try {
                if (navigator.userAgent) {
                    GameValues._isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
                }

                if (!GameValues._isIOS && !!navigator.platform) {
                    GameValues._isIOS = /iPad|iPhone|iPod/.test(navigator.platform);
                }
            } catch (error) {
                GameValues._isIOS = false;
            }

        }

        return GameValues._isIOS;
    }


    private static _isAndroid: boolean = undefined;

    /**
     * 检查是否是android设备
     */
    public static get isAndroid(): boolean {
        if (GameValues._isAndroid == undefined) {
            try {
                let ua: string = navigator.userAgent.toLowerCase();
                GameValues._isAndroid = (ua.indexOf("android") > -1);
            } catch (error) {
                GameValues._isAndroid = false;
            }
        }

        return GameValues._isAndroid;
    }

}



/**
 * 平台常量
 */
export const enum PlatformName {
    "WECHAT" = 1,
    //头条
    "TOUTIAO" = 2,
    //QQ厘米秀
    "QQCM" = 3,
    //facebook instant game
    "FACEBOOK" = 4,
    //oppo
    "OPPO" = 5,
    //iOS
    "IOS" = 6,
}


