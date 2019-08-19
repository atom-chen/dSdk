
/**
 * 微信数据类
 */
export default class WXData {
    

    private static _fromAppID:string = undefined;

    /**
     * 获取来源appid
     */
    static get fromAppID(): string {
        console.log("----  WXData ----");
        console.log("-  fromAppID  -");

        if (typeof wx == "undefined") return null;
        
        
        if (this._fromAppID == undefined) {
            let obj:object= wx.getLaunchOptionsSync();
            if (obj && obj["referrerInfo"]) {
                let referrerInfo:object = obj["referrerInfo"];
                this._fromAppID = referrerInfo["appId"];
            }
        }

        return this._fromAppID;
    }


    private static _dataFromPath:object;

    /**
     * 获取跳转path携带数据
     */
    static get dataFromPath():object {
        console.log("----  WXData ----");
        console.log("-  dataFromPath  -");

        if (typeof wx == "undefined") return null;
        
        
        if (!this._dataFromPath) {
            
            let obj:object= wx.getLaunchOptionsSync();
            if (obj && obj["query"]) {
                this._dataFromPath = obj["query"];
            } else {
                this._dataFromPath = {};
            }
        }

        return this._dataFromPath;
    }

    private static _dataFromApp:object;

    /**
     * 获取小程序跳转过来携带的数据
     */
    static get dataFromApp():object {
        console.log("----  WXData ----");
        console.log("-  dataFromApp  -");

        if (typeof wx == "undefined") return null;
        
        
        if (!this._dataFromApp) {
            
            let obj:object= wx.getLaunchOptionsSync();
            if (obj && obj["referrerInfo"]) {
                let referrerInfo:object = obj["referrerInfo"];
                this._dataFromApp = referrerInfo["extraData"];
            } else {
                this._dataFromApp = {};
            }
        }

        return this._dataFromApp;
    }
}
