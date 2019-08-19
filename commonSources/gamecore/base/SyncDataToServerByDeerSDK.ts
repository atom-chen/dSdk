import EventData from "../managers/event/EventData";
import DeerSDK from "../deer/DeerSDK";
import DeerSDKEventNames from "../deer/DeerSDKEventNames";
import GameManager from "../managers/GameManager";
import GameCoreEventNames from "../GameCoreEventNames";
import SyncDataToRemoteBase from "./SyncDataToRemoteBase";


/**
 * 将本地已设置同步到服务器的数据，通过DeerSDK同步
 */
export default class SyncDataToServerByDeerSDK extends SyncDataToRemoteBase {


    private static _instance: SyncDataToServerByDeerSDK;


    public static get instance(): SyncDataToServerByDeerSDK {
        if (!SyncDataToServerByDeerSDK._instance) new SyncDataToServerByDeerSDK();
        return SyncDataToServerByDeerSDK._instance;
    }



    constructor() {
        super();

        if (SyncDataToServerByDeerSDK._instance) throw new Error("Please use static instance property");

        SyncDataToServerByDeerSDK._instance = this;

        this.doInit();
    }



    private doInit(): void {
        var self = this;
        if (DeerSDK.instance.isHandshakeCompleted) {
            self.doInit2();
        } else {
            DeerSDK.instance.addEventListener(DeerSDKEventNames.HANDSHAKE_COMPLETE, (e: EventData) => {
                self.doInit2();
            }, this, 0, true);
        }
    }



    private doInit2(): void {
        if (this.forbidToSyncDataFromRemote || DeerSDK.instance.isNewUser/*新用户不需要下载数据*/) {
            this.setReady();
        } else {
            this.syncDataFromRemoteToDataManager();
        }
    }



    /**
     * 同步服务器数据到本地
     */
    public syncDataFromRemoteToDataManager(): void {
        DeerSDK.instance.game_getDataFromService(
            (v: string) => {
                try {
                    this._lastSyncValue = v;
                    let data: object = JSON.parse(this._lastSyncValue);

                    this.setDataFromRemote(data);
                } catch (error) {

                }

                this.setReady();
            },

            () => {
                console.log("从服务器获取游戏数据失败！");
                this.setReady();
            }
        );
    }


    private _lastSyncValue: string;
    private _lastTrySyncValue: string;

    /**
     * 同步本地数据到服务器
     */
    public syncDataFromDataManagerToRemote(): void {
        console.log("同步本地数据到服务器")
        this._lastTrySyncValue = GameManager.dataManager.getDataNeedSyncToServer();

        if (this._lastTrySyncValue != this._lastSyncValue) {
            console.log("this._lastTrySyncValue != this._lastSyncValue")
            DeerSDK.instance.game_saveDataToServiceNow(this._lastTrySyncValue, this.syncDataFromDataManagerToService_suc.bind(this));
        }
    }


    private syncDataFromDataManagerToService_suc(): void {
        this._lastSyncValue = this._lastTrySyncValue;
        this._lastTrySyncValue = null;
    }

}