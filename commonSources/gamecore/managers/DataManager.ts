import GameCoreEventNames from "../GameCoreEventNames";
import GameManager from "./GameManager";


/**
 * 数据管理器。可以通过该管理器管理全局数据。
 */
export default class DataManager {
    //字段名
    private static L_KEY: string = "$__dml";

    /**
     * 数据
     */
    private _data: any = {};

    //保存到本地的数据
    private _localData: any = {};

    //今日值
    private _todayValue: string;

    constructor() {
        //今日值
        let date: Date = new Date();
        this._todayValue = "" + date.getFullYear();
        this._todayValue += "-";
        let v: number = date.getMonth() + 1;
        this._todayValue += (v < 10) ? ("0" + v) : v;
        this._todayValue += "-";
        v = date.getDate();
        this._todayValue += (v < 10) ? ("0" + v) : v;

        this.unserialize();

        //每隔5秒保存一次数据
        setInterval(this.doSerialize.bind(this), 5000);

        //初始化微信模块
        setTimeout(this.initForWXModule.bind(this), 2000);
    }



    /**
     * 检查微信模块
     */
    private initForWXModule(): void {
        if (typeof wx != "undefined") {
            var self = this;
            wx.onHide(() => {
                //console.log("【DataManager】onHide");
                self.doSerialize();
            });

            //console.log("##################### wx.onClose");
            //console.log(wx.onClose);

            //qq厘米秀才支持该方法
            if (wx.onClose) {
                wx.onClose(() => {
                    //console.log("【DataManager】onClose");
                    self.doSerialize();
                })
            }
        } else {
            setTimeout(this.initForWXModule.bind(this), 2000);
        }
    }

    /**
     * 检查是否包含指定key的值
     * 
     * @param key 
     */
    public hasData(key: string): boolean {
        // console.log(key, this._data[key], this._data[key] == undefined, typeof this._data[key]);
        return (typeof this._data[key] != "undefined");
    }

    //上次改变的字段
    private _lastChangedKey: string;

    /**
     * 获取上次变化值的key值
     */
    public get lastChangedKey(): string {
        return this._lastChangedKey;
    }



    //同步到服务器的字段名
    private _syncToServerKeys: Array<string> = [];

    /**
     * 获取需要同步到服务器的数据。该数据是已经被JSON序列化了。
     * 
     */
    public getDataNeedSyncToServer(): string {
        if (this._syncToServerKeys.length == 0) return null;

        let localV: object = {};

        this._syncToServerKeys.forEach((key: string) => {
            let obj: object = this._localData[key];
            if (obj["today"] == undefined) {//本地仅当天有效的数据不保存到服务器
                localV[key] = obj["v"];
            }
        })

        return JSON.stringify(localV);
    }

    /**
     * 设置全局数据。
     * 
     * 
     * 
     * @param key               字段名
     * @param value             字段值
     * @param saveToLocal       是否保存到本地。如果保存到本地，字段值类型必须是简单类型，比如number、boolean、array
     * @param justToday         日期变化后是否删除。该参数只有在saveToLocal参数为true的时候生效。
     * @param syncToServer      是否将该数据同步到服务器。需要和其他模块配合使用
     * 
     */
    public setData(key: string,
        value: any,
        saveToLocal: boolean = false,
        justToday: boolean = false,
        syncToServer: boolean = false,
    ): void {
        if (typeof value == "object" || this._data[key] !== value) {
            this._data[key] = value;

            //保存到本地
            if (saveToLocal === true) {
                let data: any = { "v": value };
                if (justToday === true) data["today"] = this._todayValue;

                this._localData[key] = data;

                //记录变更的key
                if (this._changedKeys.indexOf(key) == -1) {
                    this._hasChanged = true;
                    this._changedKeys.push(key);
                }

            }

            this._lastChangedKey = key;
            GameManager.eventManager.dispatchEventWith(GameCoreEventNames.DATA_CHANGE, key);
        }

        if (syncToServer === true) {
            //记录需要同步数据到服务器的字段
            if (this._syncToServerKeys.indexOf(key) == -1) {
                this._syncToServerKeys.push(key);
            }
        }
    }


    /**
     * 获取全局数据
     * 
     * @param key 
     */
    public getData(key: string): any {
        return this._data[key];
    }


    /**
     * 移除数据
     * 
     * @param key 
     */
    public removeData(key: string): void {
        delete this._data[key];
        delete this._localData[key];

        let index: number = this._changedKeys.indexOf(key);
        if (index >= 0) this._changedKeys.splice(index, 1);

        this._hasChanged = true;

        index = this._syncToServerKeys.indexOf(key);
        if (index >= 0) this._syncToServerKeys.splice(index, 1);
    }


    /**
     * 重置数据
     * 
     */
    public resetData(): void {
        this._data = {};

        this._changedKeys = [];
        for (let theKey in this._localData) {
            this._changedKeys.push("" + theKey);
        }

        this._localData = {};

        this._lastChangedKey = null;

        this._hasChanged = true;
    }


    //是否有改变
    private _hasChanged: boolean = false;

    //改变的字段
    private _changedKeys: Array<string> = [];

    /**
     * 立即序列化数据
     */
    public doSerialize(): void {
        if (this._hasChanged === false) return;
        this._hasChanged = false;

        //console.log("【DataManager】doSerialize", this._changedKeys);

        //======================================================================
        //写入keys
        //======================================================================
        let keys: Array<string> = [];
        for (let theKey in this._localData) {
            keys.push("" + theKey);
        }

        cc.sys.localStorage.setItem("__" + DataManager.L_KEY + "__keys", JSON.stringify(keys));
        //======================================================================

        //远程数据是否有更改
        let syncToServerChanged: boolean = false;

        this._changedKeys.forEach((key: string) => {
            //检查是否有更改需要同步到服务器的数据字段
            if (!syncToServerChanged && this._syncToServerKeys.indexOf(key) >= 0) syncToServerChanged = true;

            //console.log("[保存]" + key, this._localData[key]);
            try {
                cc.sys.localStorage.setItem(DataManager.L_KEY + "__" + key, JSON.stringify(this._localData[key]));
            } catch (error) {
                //console.log("保存数据失败, key=" + key);
            }
        });
        this._changedKeys = [];

        //抛出事件
        if (syncToServerChanged) {
            GameManager.eventManager.dispatchEventWith(GameCoreEventNames.DATA_REMOTE_CHANGE);
        }
    }


    /**
     * 反序列化
     */
    private unserialize(): void {
        try {
            //读取所有key
            let v: string = cc.sys.localStorage.getItem("__" + DataManager.L_KEY + "__keys");
            let keys: any = JSON.parse(v);

            for (let i: number = 0; i < keys.length; i++) {
                let key: string = "" + keys[i];

                let v: string = cc.sys.localStorage.getItem(DataManager.L_KEY + "__" + key);
                this._localData[key] = JSON.parse(v);
            }

            //复制数据
            for (let key in this._localData) {
                //{"v":数据值, "today":日期值}
                let data: object = this._localData[key];
                let v: any = data["v"];

                let today: string = data["today"];
                //如果有设置隔日删除，则需要检查日期值
                if (!today || this._todayValue == today) {
                    this._data[key] = v;
                }
            }

        } catch (err) {
            this._localData = {};
        }
    }


}
