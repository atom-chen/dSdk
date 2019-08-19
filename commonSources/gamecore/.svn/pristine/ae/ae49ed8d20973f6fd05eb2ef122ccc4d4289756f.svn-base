import EventData from "../managers/event/EventData";
import DeerSDK from "../deer/DeerSDK";
import DeerSDKEventNames from "../deer/DeerSDKEventNames";
import GameManager from "../managers/GameManager";
import GameCoreEventNames from "../GameCoreEventNames";


/**
 * 将本地已设置同步到远程的数据
 * 
 * 
 */
export default class SyncDataToRemoteBase {

    /**
     * 最少间隔多少时间同步一次数据到远程
     */
    protected _syncToRemoteMinDelay:number = 40000;



    //禁止从服务器下载数据
    public forbidToSyncDataFromRemote: boolean = false;
    //远程数据下载后，禁止自动使用。需要手动调用 useDataFromRemote 方法
    public forbidToUseDataFromRemoteAuto: boolean = false;

    constructor() {
    }



    private _isReady: boolean = false;


    protected setReady():void {
        if (this._isReady) return;

        this._isReady = true;
        
        var self = this;
        if (typeof wx != "undefined") {
            wx.onHide(() => {
                console.log("【SyncDataToServerByDeerSDK】onHide");
                self.syncDataFromDataManagerToRemote();
            });

            //qq厘米秀才支持该方法
            if (wx.onClose) {
                wx.onClose(() => {
                    console.log("【SyncDataToServerByDeerSDK】onClose");
                    self.syncDataFromDataManagerToRemote();
                })
            }
        }

        //添加事件监听
        GameManager.eventManager.addEventListener(GameCoreEventNames.DATA_REMOTE_CHANGE, this.dataManagerSerializeHandler, this);
    }

    /**
     * 是否已准备完毕
     */
    public get isReady(): boolean {
        return this._isReady;
    }


    /*
     * 同步服务器数据到本地
     */
    public syncDataFromRemoteToDataManager(): void {

    }


    //第一次从远程获取到的数据
    protected _remoteDataFirst:any;

    /**
     * 设置从远程获取到的数据
     * 
     * @param data 
     */
    protected setDataFromRemote(data:any):void {
        this._remoteDataFirst = data;

        if (!this.forbidToUseDataFromRemoteAuto) {
            this.useDataFromRemote();
        }

        GameManager.eventManager.dispatchEventWith(GameCoreEventNames.DATA_REMOTE_RETRIVE);
    }


    /**
     * 使用远程数据
     */
    public useDataFromRemote():void {
        if (!this._remoteDataFirst) return;
        
        this._lastSyncTime = new Date().getTime();
        
        for (let key in this._remoteDataFirst) {
            GameManager.dataManager.setData(key, this._remoteDataFirst[key], true, false, true);
        }


        this._remoteDataFirst = null;
    }


    //上一次同步数据到服务器的时间
    protected _lastSyncTime: number = 0;

    /**
     * 数据中心本地数据序列化事件控制
     * 
     */
    protected dataManagerSerializeHandler(e: EventData): void {
        console.log("数据中心本地数据序列化事件控制")

        //最小间隔10秒
        let now: number = new Date().getTime();
        if (now - this._lastSyncTime > this._syncToRemoteMinDelay) {
            this._lastSyncTime = now;

            //保存数据到服务器
            this.syncDataFromDataManagerToRemote();
        }
    }

    /**
     * 同步本地数据到服务器
     */
    public syncDataFromDataManagerToRemote(): void {

    }

}