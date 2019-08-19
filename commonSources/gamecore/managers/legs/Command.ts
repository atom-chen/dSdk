import EventData from "../event/EventData";




/**
 * command
 */

export default class Command {

    /**
     * prefab url to cc.Prefab
     */
    private static prefabMap:object = {};

    /**
     * 事件
     */
    event:EventData;

    /**
     * 获取事件携带数据
     */
    public get data():any {
        return this.event.data;
    }


    //prefab资源加载路径
    protected _prefabURL:string = null;

    /**
     * 获取资源加载路径
     */
    public get prefabURL():string {
        return this._prefabURL;
    }

    /**
     * 获取资源是否已加载完成
     */
    public get prefab():cc.Prefab {
        if (!this._prefabURL) return null;
        return Command.prefabMap[this._prefabURL] as cc.Prefab;
    }

    /**
     * 加载素材
     * 
     * @param callback  回调方法
     * 
     */
     public loadPrefab(callback:Function = null):void {
        if (!this._prefabURL) {
            if (callback != null) callback.call(null);
            return;
        }

        if (Command.prefabMap[this._prefabURL]) {
            if (callback != null) callback.call(null);
            return;
        }

        let command:Command = this;

        //容错处理
        let thePrefabURL:string = this._prefabURL;
        thePrefabURL = thePrefabURL.replace(/^\/?resources\//, "");

        console.log("[Command] load prefab " + thePrefabURL);
        // 加载 Prefab
        cc.loader.loadRes(thePrefabURL, function (err, prefab) {
            console.log("[Command] prefab loaded", err, prefab);
            
            if (prefab) {
                Command.prefabMap[command._prefabURL] = prefab;
            } else {
                console.log("[Command] prefab load fail:" + command._prefabURL);
            }
            
            if (callback != null) callback.call(null);  
        });
    }


    /**
     * 执行命令
     */
    public execute():void {

    }


    /**
     * 释放prefab
     * 
     */
    public destoryPrefab():void {
        if (this._prefabURL) {
            cc.loader.releaseRes(this._prefabURL);

            delete Command.prefabMap[this._prefabURL];

            this._prefabURL = null;
        }
    }
}
