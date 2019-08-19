import EventData from "../managers/event/EventData";
import DeerSDK from "../deer/DeerSDK";
import DeerSDKEventNames from "../deer/DeerSDKEventNames";
import GameManager from "../managers/GameManager";
import GameCoreEventNames from "../GameCoreEventNames";
import SyncDataToRemoteBase from "./SyncDataToRemoteBase";


/**
 * 将本地已设置同步到服务器的数据，同步到微信CDN服务器
 * 
 * 
 * @see https://developers.weixin.qq.com/minigame/dev/wxcloud/guide/storage/api.html
 */
export default class SyncDataToWXCloud extends SyncDataToRemoteBase {


    private static _instance: SyncDataToWXCloud;


    public static get instance(): SyncDataToWXCloud {
        if (!SyncDataToWXCloud._instance) new SyncDataToWXCloud();
        return SyncDataToWXCloud._instance;
    }


    constructor() {
        super();

        if (SyncDataToWXCloud._instance) throw new Error("Please use static instance property");
        SyncDataToWXCloud._instance = this;


        try {
            wx.cloud.init({});
        } catch (error) {
        }

        this.doInit();
    }



    private doInit(): void {
        if (DeerSDK.instance.isReady) {
            this.doSDKReady();
        } else {
            DeerSDK.instance.addEventListener(DeerSDKEventNames.READY, (e: EventData) => {
                this.doSDKReady();
            }, this, 0, true);
        }
    }



    private doSDKReady(): void {
        if (this.forbidToSyncDataFromRemote || DeerSDK.instance.isNewUser) {
            this.setReady();
        } else {
            this.syncDataFromRemoteToDataManager();
        }
    }


    /*
     * 同步服务器数据到本地
     */
    public syncDataFromRemoteToDataManager(): void {
        let fileID: string = DeerSDK.instance.game_dataID;
        if (!fileID) {
            this.setReady();
            console.log("【SyncDataToWXCloud】fileID不存在", fileID)
            return;
        }

        try {
            wx.cloud.downloadFile({
                fileID: fileID,
                success: (res) => {
                    console.log("【SyncDataToWXCloud】从微信Cloud下载数据成功", fileID)
                    // 返回临时文件路径
                    this.readFile(res.tempFilePath);
                },
                fail: (err) => {
                    console.log("【SyncDataToWXCloud】从微信Cloud下载数据失败", err)
                },
                complete: () => {
                    this.setReady();
                }
            });
        } catch (error) {
            this.setReady();
            console.log("【SyncDataToWXCloud】从微信Cloud下载数据失败")
        }
    }


    private readFile(filePath: string): void {
        try {
            let fs = wx.getFileSystemManager();
            fs.readFile(
                {
                    filePath: filePath,
                    encoding: "utf-8",
                    success: (res) => {
                        try {
                            this._cloudData = JSON.parse(res.data);
                            this.setDataFromRemote(this._cloudData);

                            console.log("【SyncDataToWXCloud】解析数据文件成功", this._cloudData);
                        } catch (error) {
                            console.log("【SyncDataToWXCloud】解析数据文件失败")
                        }
                    },
                    fail: (err) => {
                        console.log("【SyncDataToWXCloud】读取数据文件失败")
                    }
                }
            );
        } catch (error) {
            console.log("【SyncDataToWXCloud】读取数据文件失败")
        }
    }



    private _cloudData: object = {};
    private _lastSyncValue: string;
    private _lastTrySyncValue: string;

    /**
     * 同步本地数据到服务器
     */
    public syncDataFromDataManagerToRemote(): void {
        //写入文件
        this._lastTrySyncValue = GameManager.dataManager.getDataNeedSyncToServer();

        if (this._lastTrySyncValue == this._lastSyncValue) return;

        //更新内存数据，并写入文件
        try {
            if (!this._cloudData) this._cloudData = {};

            let updateValues: object = JSON.parse(this._lastTrySyncValue);
            Object.keys(updateValues).forEach((key: string) => {
                this._cloudData[key] = updateValues[key];
            });

            console.log("【SyncDataToWXCloud】写入本地，准备上传", this._cloudData)
            let localFilePath: string = wx.env.USER_DATA_PATH + "/temp_file_to_wx_cloud.json";

            //写入到本地
            let fs = wx.getFileSystemManager();
            fs.writeFile(
                {
                    filePath: localFilePath,
                    data: JSON.stringify(this._cloudData),
                    encoding: "utf-8",
                    success: (res) => {
                        let cloudFilePath: string = "ugd__" + DeerSDK.instance.game_id + "_" + DeerSDK.instance.userVO.id;

                        console.log("【SyncDataToWXCloud】写入本地成功，开始上传")
                        try {
                            wx.cloud.uploadFile({
                                cloudPath: cloudFilePath,
                                filePath: localFilePath,
                                success: (res) => {
                                    this._lastSyncValue = this._lastTrySyncValue;

                                    //保存file id
                                    console.log(res.fileID)
                                    DeerSDK.instance.game_saveDataIDToService(res.fileID);
                                    console.log("【SyncDataToWXCloud】上传数据成功", res)
                                },
                                fail: (err) => {
                                    console.log("【SyncDataToWXCloud】上传数据失败")
                                }
                            })
                        } catch (error) {
                            console.log("【SyncDataToWXCloud】上传数据失败")
                        }
                    },
                    fail: (err) => {
                        console.log("【SyncDataToWXCloud】写入本地失败")
                    }
                }
            );
        } catch (error) {

        }


    }

}