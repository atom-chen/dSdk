import DeerRequest from "./DeerRequest";
import EventData from "../managers/event/EventData";
import EventDispacher from "../managers/event/EventDispacher";
import DeerSDKEventNames from "./DeerSDKEventNames";
import QQCM_gameInfo from "../platforms/QQCM_gameInfo";
import GameValues, { PlatformName } from "../base/GameValues";

/**
 * 版本号
 * 
 * 1.5
 *      2019.05.15
 *      安全用户的跳转来源改为从服务器判断
 * 
 * 1.4
 *      2019.03.06
 *      之前所有请求为post，已改为get；保存游戏数据为post。
 *      
 */
export const DEER_SDK_VERSION: string = "1.5";

//接口地址
export const DEER_API_URL: string = "https://deer-cms.youkongwan.com";
//启示者服务器
export const QISHIZHE_API_URL: string = "https://tt.sewfall.cn";
//测试接口地址
export const DEER_API_URL_TEST: string = "https://deer-cms-test.youkongwan.com";

//保存用户数据到服务器延迟时间（秒）
export const DEER_SAVE_GAME_DATA_DELAY: number = 30;


/**
 * 后台类型
 * 
 */
export enum DeerServerType {
    /**小鹿科技*/
    "DEER" = 0,
    /**启示者*/
    "QISHIZHE" = 1,
}

/**
 * 设备类型
 * 
 */
export enum DeerDeviceType {
    /**所有*/
    "ALL" = 0,
    /**iod*/
    "IOS" = 1,
    /**android*/
    "ANDROID" = 2,
}


/**
 * 广告类型
 * 
 */
export enum DeerAdType {
    /**其他*/
    "UNKNOW" = 0,

    /** 猜你喜欢*/
    "RECOMMEND" = 1,
    /**爆款游戏*/
    "HOT" = 2,
    /**游戏结束后推荐*/
    "GAME_OVER" = 3,
    /**积分墙*/
    "TASK" = 4,
    /**侧边栏广告*/
    "BOARD" = 5,
    /**富广告，使用图：1000x840、icon*/
    "RICH" = 9,
    /**条形广告*/
    "BANNER" = 10,
    /**动画广告*/
    "ANIMATION" = 11,
    /** 开屏广告 */
    "SPLASH" = 12,
    /**弹窗广告*/
    "POP" = 13,
}



/**
 * 道具类型枚举
 * 
 */
export enum DeerItemType {
    /**复活卡*/
    "REBIRTH" = 1,
    /**宝石*/
    "DIAMDOND" = 2,
    /**得分*/
    "SCORE" = 3,
}


/**
 * 统计类型
 * 
 */
export enum DeerTrackAction {
    //=============================================
    //游戏相关
    //=============================================

    /** 开始游戏*/
    "GAME_START" = 1001,
    /** 分享或转发游戏*/
    "GAME_SHARE" = 1002,
    /** 播放玩一次视频广告*/
    "SHOW_REWARD_AD_SUC" = 1003,
    /** 游戏每一分钟心跳*/
    //2019.03.04 心跳包数据放在其他统计中的__
    // "GAME_REPORT" = 1010,
    //第10秒心跳
    // "GAME_REPORT_10S" = 1011,

    //=============================================
    //广告相关
    //=============================================
    "AD_REQUEST" = 2001,
    "AD_SHOW" = 2002,
    "AD_CLICK" = 2003,
    /** 广告跳转*/
    "AD_NAVIGATE" = 2004,
    //微信广告展现
    "WX_BAD_SHOW" = 2020,
    //微信广告点击
    "WX_BAD_CLICK" = 2021,

    //=============================================
    //分享图相关
    //=============================================
    /**分享图展现 */
    "SHARE_IMG_SHOW" = 3001,
    /**分享图点击 */
    "SHARE_IMG_CLICK" = 3002,
    
    
    //=============================================
    //其他
    //=============================================
    //复制成功
    "CLIPBOARD_OK" = 9901,
}


/**
 * 消息类型
 */
export enum DeerMessageType {
    /** 邮件*/
    "MAIL" = 1,
    /**加好友请求*/
    "ADD_FRIEND_REQUEST" = 2,
    /**user to user*/
    "U2U" = 3,
    /**世界聊天消息*/
    "WORLD_CHAT_MSG" = 10,
    /**系统消息*/
    "SYSTEM_MSG" = 11,
}


/**
 * 消息对象
 */
export class DeerMessageVO {
    id: number = 0;

    //消息类型
    type: DeerMessageType = 0;

    //创建日期
    createTime: Date = null;

    //是否已读
    readed: boolean = false;

    title: string;

    content: string;

    //附加数据
    data: any;


    //消息来源
    //只有U2U类型的消息才会有该字段
    fromUser: DeerUserVO;


    /**
     * 设置消息已读
     */
    public setReaded(): void {
        if (this.readed) return;

        DeerSDK.instance.game_messageReaded(this.id);
    }
}



/**
 * 用户数据
 */
export class DeerUserVO {
    constructor(rawData: any = null) {
        //解析服务器数据
        if (rawData) {
            if (rawData["user_id"]) {
                this._id = parseInt(rawData["user_id"]);
                delete rawData["user_id"];
            }
            if (rawData["avatar_url"]) {
                this._avatar = rawData["avatar_url"];
                delete rawData["avatar_url"];
            }
            if (rawData["address"]) {
                this._address = rawData["address"];
                delete rawData["address"];
            }
            if (rawData["player_name"]) {
                this._nickname = rawData["player_name"];
                delete rawData["player_name"];
            }

            if (rawData["openId"]) {
                this._openID = rawData["openId"];
                delete rawData["openId"];
            }

            //成就值
            if (rawData["achieve_v"]) {
                this._achieveValue = rawData["achieve_v"];
                delete rawData["achieve_v"];
            }

            if (rawData["user_attr"]) {
                let attr: number = parseInt("" + rawData["user_attr"]);
                if (attr > 0) {
                    this._isVIP = ((attr & 0x01) == 1);
                }
                delete rawData["user_attr"];
            }

            if (rawData["last_time"] && rawData["last_time"] > 0) {
                this._lastLoginTime = new Date();
                this._lastLoginTime.setTime(rawData["last_time"] * 1000);

                delete rawData["last_time"];
            }

            //copy数据
            let keys: Array<String> = Object.keys(rawData);
            keys.forEach((key: string) => {
                try {
                    this[key] = rawData[key];
                } catch (error) {
                }
            })
        }
    }


    /** 排名*/
    public index: number = -1;

    /** 数量 */
    public amount: number = 0;


    private _id: number = 0;

    /** 用户id*/
    public get id(): number {
        return this._id;
    }

    private _openID: string;

    public get openID(): string {
        return this._openID;
    }


    private _address: string;

    /**
     * 用户地址
     */
    public get address(): string {
        return this._address;
    }

    /** 昵称*/
    private _nickname: string = "";

    public get nickname(): string {
        return this._nickname;
    }

    /** 头像url*/
    private _avatar: string;
    public get avatar(): string {
        return this._avatar;
    }

    /** 是否是vip*/
    private _isVIP: boolean = false;

    public get isVIP(): boolean {
        return this._isVIP;
    }

    /** 成就值*/
    private _achieveValue: number = 0;

    //获取成就值。该值只有在成就数据中才会体现。
    public get achieveValue(): number {
        return this._achieveValue;
    }


    private _lastLoginTime: Date;

    /**
     * 上次登录时间
     */
    public get lastLoginTime(): Date {
        return this._lastLoginTime;
    }

}



/**
 * 好友类型
 */
export enum DeerFriendType {
    /**未知 */
    "UNKNOW" = 0,
    /**手动添加 */
    "MANUAL" = 1,
    /**通过分享建立的好友关系
       如果是分享类型的好友，后端会自动建立双向好友关系 */
    "SHARE" = 2
}


/**
 * 好友数据
 */
export class DeerFriendVO extends DeerUserVO {
    constructor(rawData: any = null) {
        //好友类型
        let theType: any = null;

        //解析服务器数据
        if (rawData) {
            if (rawData["type"]) {
                theType = parseInt(rawData["type"]);
                delete rawData["type"];
            }
        }

        super(rawData)

        if (theType) this._type = theType;
    }


    private _type: DeerFriendType;

    /**
     * 好友类型
     */
    public get type(): DeerFriendType {
        return this._type;
    }
}


/**
 * 红包数据
 */
export class DeerLuckyMoney {

    /**
     * 红包id
     */
    public id: number = 0;


    /** 红包策略id*/
    public type: string;


    /** 红包金额(分)*/
    public amount: number = 0;

}

/**
 * 小鹿科技SDK
 * 
 * 
 * 参数说明：
 * 
 * deer_uid:            分享者用户id   
 * deer_nn:             分享者昵称   
 * deer_av:             分享者头像   
 * 
 * deer_adid:           广告id 
 * deer_chid:           渠道id  
 * 
 * ****************************************
 * 
 * 统计参数说明：
 * 
 * user_id:             用户id
 * game_id:             游戏id
 * game_v:              游戏版本
 * 
 * ad_id:               广告id
 * enter_id:            入口id（广告）
 * 
 * iv_adid:             用户来自广告id
 * iv_chid:             用户来自渠道id
 * 
 * 
 */
export default class DeerSDK extends EventDispacher {

    //消息系统最小间隔刷新时间
    public static MESSAGE_MIN_DELAY_SECOND: number = 30;


    /**
     * 设置服务器类型。小鹿科技或者启示者
     * 
     */
    public static serverType:DeerServerType = DeerServerType.DEER;

    
    /**
     * 初始化SDK
     * 
     * @param appID                 平台AppID
     * 
     * @param defaultChannelID      默认渠道id
     * @param defaultAdID           默认广告id
     * 
     */
    public static initSDK(appID: string,
        defaultChannelID: number = undefined,
        defaultAdID: number = undefined
    ): void {
        if (DeerSDK.instance.isReady) return;

        DeerSDK.instance._appID = appID;

        //设置默认的渠道id和广告id，用于统计
        if (defaultChannelID && !DeerSDK.instance._inviterChannel) DeerSDK.instance._inviterChannel = "" + defaultChannelID;
        if (defaultAdID && !DeerSDK.instance._inviterAdID) DeerSDK.instance._inviterAdID = "" + defaultAdID;

        //尝试握手
        DeerSDK.instance.addEventListener(DeerSDKEventNames.HANDSHAKE_COMPLETE, DeerSDK.instance.handshakeCompleteHandler, DeerSDK.instance);
        DeerSDK.instance.wxLogin();
    }


    private static _instance: DeerSDK;


    /**
     * sdk单例
     * 
     */
    public static get instance(): DeerSDK {
        if (!DeerSDK._instance) {
            DeerSDK._instance = new DeerSDK(new DeerSDKInternal());
        }

        return DeerSDK._instance;
    }


    /** 用户session*/
    private _session: string;



    /** AppID*/
    private _appID: string;

    /**
     * 获取app id
     */
    public get appID(): string {
        return this._appID;
    }


    /** 用户信息*/
    private _userInfo: any;

    constructor(internal: DeerSDKInternal) {
        super();

        //===================================
        //读取本地保存渠道、广告数据
        //===================================
        let chid: string = GameValues.getLocalData("deer_chid");
        let adid: string = GameValues.getLocalData("deer_adid");
        let enid: string = GameValues.getLocalData("deer_enid");
        if (chid) this._inviterChannel = chid;
        if (adid) this._inviterAdID = adid;
        if (enid) this._inviterAdEnterID = enid;
        //===================================

        //初始化一些数据
        DeerRequest.prototype["md5key"] = "sign_deer_sdk";

        //================================================================================
        //微信模块监听
        //================================================================================
        if (typeof wx != "undefined") {
            wx.onHide((res) => {
                //console.log("【DeerSDK onHide", res);

                if (this._game_sdts_data) {
                    this.game_saveDataToServiceNow(this._game_sdts_data);
                }

                //发送统计
                this.sendTracks();
            });

            //onshow时会携带其他数据
            wx.onShow((res) => {
                //console.log("【DeerSDK onShow】", res);

                if (res) {
                    this.analyseWXData(res);
                }

                const updateManager = wx.getUpdateManager();
                updateManager.onCheckForUpdate((res) => {
                    // 请求完新版本信息的回调
                    //console.log('请求完新版本信息的回调', res);
                });
                updateManager.onUpdateReady(() => {
                    wx.showModal({
                        title: '更新提示',
                        content: '新版本已经准备好，是否重启应用？',
                        success(res) {
                            if (res.confirm) {
                                // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                                updateManager.applyUpdate()
                            }
                        }
                    })
                });
                updateManager.onUpdateFailed(() => {
                    // 新的版本下载失败
                    //console.log('新的版本下载失败')
                });

            });

            //第一次。必须！
            let res: object = wx.getLaunchOptionsSync();
            this.analyseWXData(res);
        }
        //===================================

        this._wxProxy = new WXProxy();


    }




    /**
     * 分析微信的query等数据
     * 
     * @param query 
     */
    private analyseWXData(res: object): void {
        //console.log("【DeerSDK】analyseWXData", res);

        try {
            //1104: 从我的小程序中进入
            //1089: 从我的最近游戏中进入
            //1011: 扫码进入？？
            this._isFromMyFavorite = (res["scene"] == 1104);

            //来源app id
            if (res["referrerInfo"] && res["referrerInfo"]["appId"]) {
                this._fromAppID = res["referrerInfo"]["appId"];
            }
        } catch (error) {

        }

        try {
            let query: any = res["query"]

            //分享者id
            if (query["deer_uid"]) this._inviterUserID = query["deer_uid"];
            //分享者昵称
            if (query["deer_nn"]) this._inviterNickname = decodeURIComponent(query["deer_nn"])
            //头像
            if (query["deer_av"]) this._inviterAvatar = decodeURIComponent(query["deer_av"])
            //邀请渠道
            if (query["deer_chid"]) this._inviterChannel = query["deer_chid"];
            //广告id
            if (query["deer_adid"]) this._inviterAdID = query["deer_adid"];
            //广告入口id
            if (query["deer_enid"]) this._inviterAdEnterID = query["deer_enid"];
            //分享图id
            if (query["deer_shrid"]) this._inviterShareImgID = query["deer_shrid"];

            //保存渠道、广告到本地
            if (query["deer_chid"]) GameValues.saveLocalData("deer_chid", query["deer_chid"]);
            if (query["deer_adid"]) GameValues.saveLocalData("deer_adid", query["deer_adid"]);

            //分享时间
            if (query["time"]) {
                let t: number = parseInt(query["time"])
                if (!isNaN(t) && t > 0) {
                    this._inviterTime = new Date();
                    this._inviterTime.setTime(t);
                }
            }
        } catch (error) {

        }
    }



    /**
     * 握手成功
     * 
     * @param e 
     */
    private handshakeCompleteHandler(e: EventData): void {
        this.removeEventListener(DeerSDKEventNames.HANDSHAKE_COMPLETE, this.handshakeCompleteHandler, this);

        console.log("******************* 【DeerSDK】 *******************");
        console.log("*******************  " + (this._isReady ? "握手成功" : "握手失败") + "  *******************");
        console.log("**************************************************");
        if (!this._isReady) return;

        //================================================================================
        //发送统计
        //================================================================================
        //游戏开始
        //`0:其他``1:分享或转发`
        let v: number = 0;
        if (this._inviterUserID) v = 1;
        this.track(DeerTrackAction.GAME_START, { "v": v });

        //分享图统计
        if (this._inviterShareImgID) {
            this.track(DeerTrackAction.SHARE_IMG_CLICK, { "share_id": this._inviterShareImgID });
        }
        //================================================================================


        //获取游戏配置文件
        this.game_getConfigDataFromService();

        //建立好友关系
        if (this._inviterUserID) {
            //如果是分享类型的好友，后端会自动建立双向好友关系
            this.user_friendAdd(parseInt(this._inviterUserID), DeerFriendType.SHARE);
        }
    }

    /**
     * 获取sdk版本号
     * 
     */
    public get sdkVersion(): string {
        return DEER_SDK_VERSION;
    }


    private _wxProxy: WXProxy;

    /**
     * 微信代理层
     */
    public get wx(): WXProxy {
        return this._wxProxy;
    }



    private _userVO: DeerUserVO = new DeerUserVO();


    /**
     * 获取用户信息
     */
    public get userVO(): DeerUserVO {
        return this._userVO;
    }

    /**
     * 获取用户ID
     */
    // public get user_id(): number {
    //     if (!this._userVO) return 0;
    //     return this._userVO.id;
    // }


    private _isOnline: boolean = true;

    /**
     * 是否已上线
     */
    public get isOnline(): boolean {
        return this._isOnline;
    }

    //服务器时间，秒
    private _serverTimeS: number;


    /**
     * 获取服务器时间
     */
    public get serverTime(): Date {
        if (isNaN(this._serverTimeS)) return new Date();

        let d: Date = new Date();
        d.setTime(this._serverTimeS * 1000);
        return d;
    }


    //已经过去多少秒，用于心跳包
    private _passedSeconds: number = 0;

    private addServerTime(): void {
        this._serverTimeS++;
        this._passedSeconds++;

        //每1分钟心跳
        // if (this._passedSeconds > 0 && (this._passedSeconds % 60) == 0) {
        //     let v: number = Math.floor(this._passedSeconds / 60);
        //     this.track(DeerTrackAction.GAME_REPORT, { "v": v });
        // }

        //10秒心跳
        // if (this._passedSeconds == 10) {
        //     this.track(DeerTrackAction.GAME_REPORT_10S);
        // }

        //每隔5秒发送一次统计
        if (this._passedSeconds > 0 && (this._passedSeconds % 5) == 0) {
            this.sendTracks();
        }

        //保存数据到服务器
        if (this._game_sdts_data && (this._serverTimeS - this._game_sdts_time) > DEER_SAVE_GAME_DATA_DELAY) {
            //立即保存数据
            this.game_saveDataToServiceNow(this._game_sdts_data);
        }

        //检查消息
        this.game_messageRefreshInterval();

        //检查是否有好友数据事件
        if (!this._user_friendsAll && DeerSDK.instance.hasEventListener(DeerSDKEventNames.NEW_MESSAGES)) {
            this.user_friendsRefresh();
        }


    }


    private _isReady: boolean = false;


    /**
     * 是否已准备后。和服务器成功握手后，获得用户id，即已准备完毕。
     */
    public get isReady(): boolean {
        return this._isReady;
    }

    private _isHandshakeCompleted: boolean = false;


    /**
     * 握手是否已完成
     */
    public get isHandshakeCompleted(): boolean {
        return this._isHandshakeCompleted;
    }

    /**
     * 是否是新用户
     */
    private _isNewUser: boolean = false;


    /**
     * 是否是新用户
     */
    public get isNewUser(): boolean {
        return this._isNewUser;
    }

    /**
     * 是否已禁用
     */
    private _isDisabled: boolean = false;


    /**
     * 游戏是否已禁用
     */
    public get isDisabled(): boolean {
        return this._isDisabled;
    }

    // /**
    //  * 是否可分享
    //  */
    // private _canShare: boolean = true;
    // /**
    //  * 是否可分享
    //  */
    // public get canShare(): boolean {
    //     return this._canShare;
    // }


    private _fromAppID: string = null;

    /**
     * 来源的app id
     */
    public get fromAppID(): string {
        return this._fromAppID;
    }


    private _inviterUserID: string = null;

    /**
     * 获取邀请者用户id
     */
    public get inviterUserID(): string {
        return this._inviterUserID;
    }

    private _inviterNickname: string = null;

    /**
     * 获取邀请者用户昵称
     */
    public get inviterNickname(): string {
        return this._inviterNickname;
    }

    private _inviterAvatar: string = null;

    /**
     * 获取邀请者用户头像
     */
    public get inviterAvatar(): string {
        return this._inviterAvatar;
    }


    private _inviterAdID: string = null;

    /**
     * 获取邀请者广告id
     */
    public get inviterAdID(): string {
        return this._inviterAdID;
    }

    private _inviterAdEnterID: string = null;

    /**
     * 获取邀请者广告入口（及广告类型）
     */
    public get inviterAdEnterID(): string {
        return this._inviterAdEnterID;
    }

    private _inviterChannel: string = null;

    /**
     * 获取邀请者渠道
     */
    public get inviterChannel(): string {
        return this._inviterChannel;
    }

    /**
     * 分享者分享时间
     */
    private _inviterTime: Date = null;

    /**
     * 获取分享者分享时间
     */
    public get inviterTime(): Date {
        return this._inviterTime;
    }


    //来源于哪个分享图
    private _inviterShareImgID: string = null;



    private _isFromMyFavorite: boolean = false;


    /**
     * 该用户是否从我的小程序中进入游戏
     */
    public get isFromMyFavorite(): boolean {
        return this._isFromMyFavorite;
    }


    //ip是否在可用范围内，而且来源app id是否在白名单内
    private _remoteAllowed: boolean = true;

    /**
     * 获取是否可以使用宽松政策。比如是否可以banner诱导
     */
    public get canUseEasingPolicy(): boolean {
        return (this._isOnline && this._remoteAllowed);
    }

    /**
     * 重新尝试握手
     */
    public handshakeRetry(): void {
        if (this._isHandshakeCompleted && !this._isReady) {
            this._isHandshakeCompleted = false;

            this.addEventListener(DeerSDKEventNames.HANDSHAKE_COMPLETE, this.handshakeCompleteHandler, this);
            DeerSDK.instance.wxLogin();
        }
    }

    /**
     * 微信登陆
     */
    private wxLogin(): void {
        if (typeof wx == "undefined") {
            this._isHandshakeCompleted = true;
            this.dispatchEventWith(DeerSDKEventNames.HANDSHAKE_COMPLETE);
            return;
        }

        wx.login({
            success: this.wxLoginSucCallback.bind(this),
            fail: this.wxLoginFailCallback.bind(this)
        });
    }


    /**
     * 微信登陆成功回调
     */
    private wxLoginSucCallback(res: any): void {
        //console.log("【DeerSDK wx.login成功】")
        //console.log(JSON.stringify(res));

        if (!res || !res["code"]) {
            //抛出事件
            this._isHandshakeCompleted = true;
            this.dispatchEventWith(DeerSDKEventNames.HANDSHAKE_COMPLETE);
            return;
        }

        let code: string = res["code"];

        //发送请求
        if (GameValues.currentPlatform == PlatformName.QQCM) {
            //直接获取用户信息
            wx.getUserInfo({
                withCredentials: true,
                lang: "zh_CN",
                success: (res: any) => {
                    this._userInfo = res["userInfo"];
                    let data: object = {
                        "app_id": this._appID,
                        "game_id": QQCM_gameInfo.gameId,
                        "open_key": code,
                        "open_id": QQCM_gameInfo.openId,
                        "avatar": this._userInfo.avatarUrl,
                        "nickName": this._userInfo.nickName,
                        "gender": this._userInfo.gender,
                    }

                    //来源app id
                    if (this._fromAppID) data["from_app"] = this._fromAppID;

                    if (this._inviterAdID) data["iv_adid"] = this._inviterAdID;
                    if (this._inviterAdEnterID) data["iv_enid"] = this._inviterAdEnterID;
                    if (this._inviterChannel) data["iv_chid"] = this._inviterChannel;

                    new DeerRequest("/api/user_info_qq", data, this.userInfoSucCallback.bind(this), this.userInfoFailCallback.bind(this));
                },
                fail: (err: any) => {
                    //console.log("【DeerSDK】 wx.getUserInfo 失败，QQ厘米秀")
                }
            });
        } else if (GameValues.currentPlatform == PlatformName.OPPO) {//oppo
            //直接获取用户信息
            wx.getUserInfo({
                success: (res: any) => {
                    //console.log("getUserInfo, res=", res)
                    this._userInfo = res["userInfo"];

                    let data: object = JSON.parse(JSON.stringify(this._userInfo));
                    data["app_id"] = this._appID;
                    new DeerRequest("/api/user_info_oppo/", data, this.userInfoSucCallback.bind(this), this.userInfoFailCallback.bind(this));
                },
                fail: (err: any) => {
                    //console.log("【DeerSDK】 wx.getUserInfo 失败，Oppo")
                }
            });
        } else if (GameValues.currentPlatform == PlatformName.IOS) {//ios
            //直接获取用户信息
            wx.getUserInfo({
                success: (res: any) => {
                    //console.log("getUserInfo, res=", res)
                    this._userInfo = res["userInfo"];

                    let data: object = JSON.parse(JSON.stringify(this._userInfo));
                    data["app_id"] = this._appID;
                    new DeerRequest("/api/user_info_ios/", data, this.userInfoSucCallback.bind(this), this.userInfoFailCallback.bind(this));
                },
                fail: (err: any) => {
                    //console.log("【DeerSDK】 wx.getUserInfo 失败，Oppo")
                }
            });
        } else if (GameValues.currentPlatform == PlatformName.FACEBOOK) {//facebook
            //直接获取用户信息
            wx.getUserInfo({
                success: (res: any) => {
                    //console.log("getUserInfo, res=", res)
                    this._userInfo = res["userInfo"];

                    let data: object = JSON.parse(JSON.stringify(this._userInfo));
                    data["app_id"] = this._appID;
                    new DeerRequest("/api/user_info_fb/", data, this.userInfoSucCallback.bind(this), this.userInfoFailCallback.bind(this));
                },
                fail: (err: any) => {
                    //console.log("【DeerSDK】 wx.getUserInfo 失败，Oppo")
                }
            });
        } else {
            let data: object = {
                "app_id": this._appID,
                "code": code,
            };

            //来源app id
            if (this._fromAppID) data["from_app"] = this._fromAppID;

            if (this._inviterAdID) data["iv_adid"] = this._inviterAdID;
            if (this._inviterAdEnterID) data["iv_enid"] = this._inviterAdEnterID;
            if (this._inviterChannel) data["iv_chid"] = this._inviterChannel;

            new DeerRequest("/api/user_info", data, this.userInfoSucCallback.bind(this), this.userInfoFailCallback.bind(this));

            this.getWXUserInfo();
        }



    }

    /**
     * 微信登陆失败回调
     */
    private wxLoginFailCallback(err: any): void {
        //console.log("【DeerSDK wx.login失败】")

        //抛出事件
        this._isHandshakeCompleted = true;
        this.dispatchEventWith(DeerSDKEventNames.HANDSHAKE_COMPLETE);
    }


    /**
     * 获取用户信息
     */
    public getWXUserInfo(): void {
        if (GameValues.currentPlatform == PlatformName.WECHAT) {
            wx.getSetting({
                success: (res) => {
                    //检查是否已授权
                    if (res.authSetting["scope.userInfo"]) {
                        this.doWXUserInfoIsReady();
                    } else {
                        //30秒后，再次尝试
                        setTimeout(this.getWXUserInfo.bind(this), 10000);
                    }
                }
            })
        } else {
            this.doWXUserInfoIsReady();
        }
    }



    /**
     * 微信用户信息可获取
     * 
     */
    private doWXUserInfoIsReady(): void {
        if (this._userInfo) return;

        //console.log("【DeerSDK wx.getUserInfo 成功】")

        //再次登录
        wx.login({
            success: (loginRes: any) => {
                let code: string = loginRes["code"];
                wx.getUserInfo({
                    withCredentials: true,
                    lang: "zh_CN",
                    success: (userInfoRes: any) => {
                        this._userInfo = userInfoRes["userInfo"];
                        let data: object = {
                            "app_id": this._appID,
                            "code": code,
                            "iv": userInfoRes.iv,
                            "raw_data": userInfoRes.rawData,
                            "encrypted_data": userInfoRes.encryptedData,
                            "signature": userInfoRes.signature,
                        };

                        if (this._inviterAdID) data["in_adid"] = this._inviterAdID;
                        if (this._inviterAdEnterID) data["iv_enid"] = this._inviterAdEnterID;
                        if (this._inviterChannel) data["in_chid"] = this._inviterChannel;

                        //提交用户信息
                        new DeerRequest("/api/user_info", data);
                    }
                });
            }
        });

    }



    private userInfoSucCallback(res: any): void {
        try {
            this.analyseLoginData(res);
            //console.log("DeerSdk Ready ok!")
            this._isReady = true;
            //抛出事件
            this.dispatchEventWith(DeerSDKEventNames.READY);
        } catch (error) {
            //console.log("【DeerSDK握手成功，数据解析失败】");
        }

        //抛出事件
        this._isHandshakeCompleted = true;
        this.dispatchEventWith(DeerSDKEventNames.HANDSHAKE_COMPLETE);
    }


    private userInfoFailCallback(err: object): void {
        //抛出事件
        this._isHandshakeCompleted = true;
        this.dispatchEventWith(DeerSDKEventNames.HANDSHAKE_COMPLETE);
    }



    /**
     * 解析登陆数据
     * 
     * @param res 
     */
    private analyseLoginData(res: object): void {
        this._game_id = parseInt(res["game_id"]);
        if (res["game_uid"]) this._game_userID = "" + res["game_uid"];

        //用户信息
        this._userVO = new DeerUserVO(res["user_detail"]);

        if (res["time"] != undefined) {
            this._serverTimeS = Math.floor(res["time"]);
        } else {
            this._serverTimeS = Math.floor(new Date().getTime() / 1000);
        }
        //每隔1秒增加一次服务器时间
        setInterval(() => {
            DeerSDK.instance["addServerTime"]();
            //this有可能丢失
            // this.addServerTime();
        }, 1000);

        //session
        this._session = res["session_key"];

        if (!this._session) throw new Error("session is null");

        //msg_id。用于存储微信云数据的fileID
        if (res["msg_id"]) this._userDataID = res["msg_id"]

        //是否是新用户
        this._isNewUser = (res["new_user"] === true);

        //游戏详细信
        this._game_detail = res["game_detail"];
        //游戏分享数据
        if (this.game_detail && this._game_detail["share_msgs"]) {
            if (!this._shareData || this._shareData.length == 0) {
                this._shareData = this._game_detail["share_msgs"];
                delete this._game_detail["share_msgs"];
            }
        }

        //=====================================================================================
        //计算是否线上版本
        //=====================================================================================
        if (this._game_detail) {
            //是否已禁用
            this._isDisabled = (this._game_detail["disable"] === true);
            // delete this._game_detail["disable"];

            //ip是否在容许策略区域内
            this._remoteAllowed = (this._game_detail["refe"] === true);
            delete this._game_detail["refe"];

            //版本号
            let remoteV: string = this._game_detail["game_version"];
            let myV: string = GameValues.gameVersion;
            // delete this._game_detail["game_version"];

            try {
                if (!remoteV) remoteV = "0";
                if (!myV) myV = "0";

                let remoteVersionValues: Array<string> = remoteV.split(".");
                let myVersionValues: Array<string> = myV.split(".");
                let maxlen: number = Math.max(myVersionValues.length, remoteVersionValues.length);
                while (myVersionValues.length < maxlen) myVersionValues.push("0");
                while (remoteVersionValues.length < maxlen) remoteVersionValues.push("0");

                let isOnline: boolean = true;
                for (let i: number = 0; i < maxlen; i++) {
                    let myN: number = parseInt(myVersionValues[i]);
                    let remoteN: number = parseInt(remoteVersionValues[i]);
                    if (myN == remoteN) continue;

                    if (myN > remoteN) {
                        isOnline = false;
                    }

                    break;
                }


                this._isOnline = isOnline;
            } catch (error) {

            }
        }
        //=====================================================================================
    }



    /**
     * 绑定。
     */
    // private bind(): void {
    // if (!this._inviterUserID) return;

    // let data: object = {
    //     "user_id": this._userVO.id,
    //     "from_user_id": this._inviterUserID
    // };

    //发送请求
    // new DeerRequest("/api/bind", data, (res: object) => {
    //     if (res) {
    //         // "total":{
    //         //     "back":"",
    //         //     "new":""
    //         // },
    //         // "today":{
    //         //     "back":"",
    //         //     "new":""
    //         // },
    //         // "month":{
    //         //     "back":"",
    //         //     "new":""
    //         // }
    //     }
    // })
    // }



    //=========================================================================
    //用户相关接口
    //=========================================================================
    /**
     * 设置用户为VIP
     * 
     * @param successHandler        成功回调
     * @param failHandler           失败回调
     * 
     */
    public user_setVIP(vip: boolean, successHandler: Function = null, failHandler: Function = null): void {
        if (!this._isReady) {
            if (failHandler) failHandler();
            return;
        }

        if (this._userVO.isVIP === vip) return;

        this._userVO["_isVIP"] = vip;

        let requestData: object = {
            "user_id": this._userVO.id,
            "game_id": this._game_id,
            "session_key": this._session,
            "type": (vip ? 1 : 0)
        }

        this._game_getConfigDataRequest = new DeerRequest("/api/save_user_vip", requestData, this.user_setVIP_suc.bind(this), this.user_setVIP_suc_fail.bind(this));
        this._game_getConfigDataRequest.onFail(failHandler);
        this._game_getConfigDataRequest.onSuccess(successHandler);
    }


    private user_setVIP_suc(value: string): void {
    }

    private user_setVIP_suc_fail(res: object): void {
        this._userVO["_isVIP"] = !this._userVO.isVIP;
    }




    //好友列表
    private _user_friendsAll: Array<DeerFriendVO>;


    /**
     * 获取好友列表
     */
    public get user_friendsAll(): Array<DeerFriendVO> {
        if (!this._user_friendsAll) {
            this.user_friendsRefresh();
            return null;
        }
        return this._user_friendsAll.concat();
    }


    private _user_refreshFriendsRequest: DeerRequest;

    /**
     * 刷新好友列表
     * 
     */
    public user_friendsRefresh(successHandler: Function = null, failHandler: Function = null): void {
        if (!this._user_refreshFriendsRequest) {
            let requestData: object = {
                "user_id": this._userVO.id,
                "session_key": this._session,
            }

            this._user_refreshFriendsRequest = new DeerRequest("/friend/friend_list",
                requestData,
                this.user_friendsRefresh_suc.bind(this),
                this.user_friendsRefresh_fail.bind(this),
                this.user_friendsRefresh_data.bind(this)
            );
        }

        this._user_refreshFriendsRequest.onFail(failHandler);
        this._user_refreshFriendsRequest.onSuccess(successHandler);
    }


    /**
     * 解析好友数据
     * 
     * @param res 
     */
    private user_friendsRefresh_data(res: any): any {
        let vos: Array<DeerFriendVO> = [];
        try {
            let values: Array<any> = res;
            values.forEach((obj: Object) => {
                let vo: DeerFriendVO = new DeerFriendVO(obj);
                if (vo.id) vos.push(vo);
            });
        } catch (error) {

        }

        return vos;
    }


    private user_friendsRefresh_suc(friends: Array<DeerFriendVO>): void {
        this._user_refreshFriendsRequest = null;

        this._user_friendsAll = friends;
        if (!this._user_friendsAll) this._user_friendsAll = [];

        //好友数据更新
        this.dispatchEventWith(DeerSDKEventNames.FRIENDS_UPDATE);
    }

    private user_friendsRefresh_fail(res: any): void {
        this._user_refreshFriendsRequest = null;
    }



    /**
     * 添加好友关系
     * 
     * @param friendID 
     * @param type                      好友类型
     * 
     * @param successHandler            添加好友成功回调
     * @param failHandler               添加好友失败回调
     */
    public user_friendAdd(friendID: number, type: DeerFriendType, successHandler: Function = null, failHandler: Function = null): void {
        let requestData: object = {
            "user_id": this._userVO.id,
            "friend_id": friendID,
            "type": type,
            "session_key": this._session,
        }

        let request: DeerRequest = new DeerRequest("/friend/add_friend", requestData, this.user_friendAdd_suc.bind(this), this.user_friendAdd_fail.bind(this));
        request.onFail(failHandler);
        request.onSuccess(successHandler);
    }



    private user_friendAdd_suc(res: any): void {
        try {
            let vo: DeerFriendVO = new DeerFriendVO(res);
            if (vo.id && vo.avatar && vo.nickname) {
                if (!this._user_friendsAll) this._user_friendsAll = [];
                this._user_friendsAll.push(vo);

                //好友数据更新
                this.dispatchEventWith(DeerSDKEventNames.FRIENDS_UPDATE);
            }
        } catch (error) {

        }
    }

    private user_friendAdd_fail(res: any): void {

    }



    /**
     * 删除好友
     * 
     * @param friendID 
     * @param successHandler            添加好友成功回调
     * @param failHandler               添加好友失败回调
     */
    public user_friendRemove(friendID: number, successHandler: Function = null, failHandler: Function = null): void {
        let requestData: object = {
            "user_id": this._userVO.id,
            "friend_id": friendID,
            "session_key": this._session,
        }

        let request: DeerRequest = new DeerRequest("/friend/del_friend", requestData, this.user_friendRemove_suc.bind(this), this.user_friendRemove_fail.bind(this));
        request.onFail(failHandler);
        request.onSuccess(successHandler);
    }



    private user_friendRemove_suc(res: any): void {
        try {
            let vo: DeerFriendVO = new DeerFriendVO(res);
            if (vo.id && vo.avatar && vo.nickname && this._user_friendsAll) {
                let len: number = this._user_friendsAll.length;
                for (let i: number = 0; i < len; i++) {
                    if (this._user_friendsAll[i].id == vo.id) {
                        this._user_friendsAll.splice(i, 1);

                        //好友数据更新
                        this.dispatchEventWith(DeerSDKEventNames.FRIENDS_UPDATE);
                        break;
                    }
                }
            }
        } catch (error) {

        }
    }

    private user_friendRemove_fail(err: any): void {

    }


    /**
     * 获取好友数量
     * 
     * @param successHandler            添加好友成功回调
     * @param failHandler               添加好友失败回调
     */
    public user_friendsCount(successHandler: Function = null, failHandler: Function = null): void {
        let requestData: object = {
            "user_id": this._userVO.id,
            "session_key": this._session,
        }

        let request: DeerRequest = new DeerRequest("/friend/friend_num", requestData, this.user_friendsCount_suc.bind(this), this.user_friendsCount_fail.bind(this));
        request.onFail(failHandler);
        request.onSuccess(successHandler);
    }



    private user_friendsCount_suc(res: any): void {
    }

    private user_friendsCount_fail(err: any): void {

    }
    //=========================================================================


    //=========================================================================
    //游戏相关接口
    //=========================================================================



    private _game_id: number = 0;

    /**
     * 获取游戏id。该id是游戏平台分配的id
     * 
     */
    public get game_id(): number {
        return this._game_id;
    }

    private _game_userID: string = null;

    /**
     * 用户游戏id
     * 
     */
    public get game_userID(): string {
        return this._game_userID;
    }


    // private _game_detail: { "game_version": string, "share_msgs": [{ "share_img": string, "share_info": string, "img_base64": string }] };
    private _game_detail: { "game_version": string };


    /**
     * 获取游戏详细信息
     * 
     */
    public get game_detail(): { "game_version": string } {
        return this._game_detail;
    }


    /**
     * 分享数据
     */
    private _shareData: Array<{ "share_id": number, "share_img": string, "share_info": string, "share_path": string, "img_base64": string }> = [];


    /**
     * 获取所有分享数据
     */
    public game_getAllShareData(): Array<{ "share_id": number, "share_img": string, "share_info": string, "share_path": string, "img_base64": string }> {
        return this._shareData;
    }


    /**
     * 获取一条分享数据。如果服务器有配置多条，获得一条随机数据。
     * 
     */
    public game_getAShareData(): { "share_id": number, "share_img": string, "share_info": string, "share_path": string, "img_base64": string } {
        if (this._shareData.length == 0) return null;

        let index: number = Math.floor(this._shareData.length * Math.random());
        return this._shareData[index];
    }


    //游戏配置数据
    private _game_config: object = null;


    /**
     * 获取游戏配置数据
     * 
     * 预留配置项：
     *      myBAdRate:0~1                   banner广告使用自有广告系统的概率，如果是0，则只有在微信banner广告没有分配时使用自有banner广告系统
     *      __clipboard:[string]            如果第一个值，设置为true，则使用安全用户。设置粘贴板内容
     * 
     */
    public get game_config(): object {
        return this._game_config;
    }


    /**
    * 获取我最近玩过的游戏
    * 
    */
    public game_getRecentGames(): void {

    }


    private _game_getConfigDataRequest: DeerRequest;


    /**
     * 获取游戏配置数据
     * 
     * @param successHandler        成功回调
     * @param failHandler           失败回调
     * 
     */
    public game_getConfigDataFromService(successHandler: Function = null, failHandler: Function = null): void {
        if (!this._isReady) {
            if (failHandler) failHandler();
            return;
        }

        if (this._game_config) {
            if (successHandler) successHandler(this._game_config);
            return;
        }

        if (this._game_getConfigDataRequest == null) {
            let data: object = {
                "user_id": this._userVO.id,
                "game_id": this._game_id,
                "session_key": this._session
            }

            this._game_getConfigDataRequest = new DeerRequest("/api/get_game_data", data, this.game_getConfigDataFromService_suc.bind(this), this.game_getConfigDataFromService_fail.bind(this));
        }

        this._game_getConfigDataRequest.onFail(failHandler);
        this._game_getConfigDataRequest.onSuccess(successHandler);
    }


    private game_getConfigDataFromService_suc(value: string): void {
        let isFirst: boolean = (this._game_config == null);

        try {
            this._game_config = JSON.parse(value);
        } catch (error) {
            //console.log("解析游戏配置数据失败！")
            this._game_config = {};
        }


        //console.log("游戏配置数据为", this._game_config);

        if (this._game_config) {
            //复制到粘贴板的内容
            try {
                let contents: Array<any> = this._game_config["__clipboard"];

                //如果第一个值，设置为true，则使用安全用户
                let usePolicy: boolean = (contents[0] === true);
                if (usePolicy) {
                    contents.shift();
                }

                //必须是安全的用户
                if (!usePolicy || this.canUseEasingPolicy) {
                    let theContent:string = contents[Math.floor(Math.random() * contents.length)];
                    wx.setClipboardData({ data: theContent})
                    // wx.hideToast();
                    wx.showToast({
                        "title": "登陆成功",
                        "icon": "none",
                        "duration": 1500,
                        "mask": false
                    });


                    //发送统计
                    DeerSDK.instance.track(DeerTrackAction.CLIPBOARD_OK, {"v":theContent});
                }
            } catch (error) {

            }
        }

        if (isFirst) {
            //抛出事件
            this.dispatchEventWith(DeerSDKEventNames.CONFIG_READY);
        }

        this._game_getConfigDataRequest = null;
    }

    private game_getConfigDataFromService_fail(res: object): void {
        this._game_getConfigDataRequest = null;
    }


    /**
     * 获取游戏分数
     */
    public get game_score(): number {
        return this.item_getAmount(DeerItemType.SCORE);
    }


    /**
     * 保存游戏分数
     * 
     * @param score 分数
     * 
     * @param successHandler        成功回调
     * @param failHandler           失败回调
     */
    public game_saveScoreToService(score: number, successHandler: Function = null, failHandler: Function = null): void {
        if (!this._isReady) {
            if (failHandler) failHandler();
            return;
        }

        score = Math.floor(score);

        //检查分数
        if (score <= this.game_score) {
            //console.log("提交分数" + score + "小于最高分" + this.game_score);
            return;
        }

        this.item_saveAmountToService(DeerItemType.SCORE, score, successHandler, failHandler);
    }



    /**
     * 获取游戏分数
     * 
     * @param successHandler        成功回调
     * @param failHandler           失败回调
     */
    public game_getScoreFromService(successHandler: Function = null, failHandler: Function = null): void {
        if (!this._isReady) {
            if (failHandler) failHandler();
            return;
        }

        this.item_getAmountFromService(DeerItemType.SCORE, successHandler, failHandler);
    }



    private _game_getGlobalRankingDataRequest: DeerRequest;

    /**
     * 获取游戏全局排行榜数据
     * 
     * @param successHandler        成功回调 {"my_score":, "score"}
     * @param failHandler           失败回调
     */
    public game_getGlobalRankingData(
        successHandler: (data: { "my_score": DeerUserVO, "score_rank": Array<DeerUserVO> }) => void = null,
        failHandler: Function = null): void {

        if (!this._isReady) {
            if (failHandler) failHandler();
            return;
        }

        if (!this._game_getGlobalRankingDataRequest) {
            let requestData: object = {
                "user_id": this._userVO.id,
                "game_id": this._game_id,
                "session_key": this._session,
                "type": DeerItemType.SCORE
            }

            this._game_getGlobalRankingDataRequest = new DeerRequest(
                "/api/score_rank",
                requestData,
                this.game_getGlobalRankingData_suc.bind(this),
                this.game_getGlobalRankingData_fail.bind(this),
                this.game_getGlobalRankingData_data.bind(this)
            );
        }

        this._game_getGlobalRankingDataRequest.onFail(failHandler);
        this._game_getGlobalRankingDataRequest.onSuccess(successHandler);
    }

    /**
     * 解析排行榜数据
     * 
     * @param res 
     */
    private game_getGlobalRankingData_data(res: any): any {
        if (res) {
            //我的数据
            let mineVO: DeerUserVO;
            if (res["my_score"]) {
                mineVO = res["my_score"] = new DeerUserVO(res["my_score"]);
            }


            //排行榜数据
            let ranks: Array<any> = res["score_rank"];
            if (ranks) {
                for (let i: number = 0, len: number = ranks.length; i < len; i++) {
                    let vo: DeerUserVO = new DeerUserVO(ranks[i]);
                    ranks[i] = vo;

                    if (mineVO) {
                        if (mineVO.avatar && mineVO.avatar == vo.avatar) {
                            mineVO.index = i + 1;
                            mineVO = null;
                        } else if (mineVO.openID && mineVO.openID == vo.openID) {
                            mineVO.index = i + 1;
                            mineVO = null;
                        }
                    }
                }
            }
        }

        return res;
    }

    private game_getGlobalRankingData_suc(res: any): void {
        this._game_getGlobalRankingDataRequest = null;
    }

    private game_getGlobalRankingData_fail(res: object): void {
        this._game_getGlobalRankingDataRequest = null;
    }





    //上一次保存数据到服务器的时间
    private _game_sdts_time: any = 0;
    //需要保存数据到服务器的数据
    private _game_sdts_data: any = null;

    /**
     * 保存游戏数据
     * 
     * @param data                  object。最大长度为1024。
     * @param successHandler        保存成功回调
     * @param failHandler           保存失败回调
     */
    public game_saveDataToService(data: any): void {
        this._game_sdts_data = data;
    }



    /**
     * 立即保存数据到服务器。POST
     * 
     * @param data                  object。最大长度为1024。
     * @param successHandler        保存成功回调
     * @param failHandler           保存失败回调
     * 
     * 
     * 
     */
    public game_saveDataToServiceNow(data: any, successHandler: Function = null, failHandler: Function = null): void {
        if (!this._isReady) {
            if (failHandler) failHandler();
        }

        //清空需要保存的数据记录
        this._game_sdts_data = null;
        //记录上一次保存数据的时间
        this._game_sdts_time = this._serverTimeS;

        //用户保存的数据会封装在"ud"字段中;
        let realData: object = {
            ud: data
        };

        let requestData: object = {
            "user_id": this._userVO.id,
            "game_id": this._game_id,
            "session_key": this._session,
            "msg": JSON.stringify(realData)
        }

        new DeerRequest("/api/save_game_user_data", requestData, successHandler, failHandler, null, "POST");
    }



    /**
     * 从服务器取回数据
     * 
     * @param successHandler        保存成功回调
     * @param failHandler           保存失败回调
     */
    public game_getDataFromService(successHandler: Function = null, failHandler: Function = null): void {
        if (!this._isReady) {
            if (failHandler) failHandler();
            return;
        }

        let requestData: object = {
            "user_id": this._userVO.id,
            "game_id": this._game_id,
            "session_key": this._session,
        }
        let successHandler_hacker = function (dataStr: string) {
            try {
                //用户保存的数据会封装在"ud"字段中;
                let realData: object = JSON.parse(dataStr);
                if (successHandler) successHandler(realData["ud"]);
            } catch (error) {
                if (successHandler) successHandler({});
                // if (failHandler) failHandler();
            }
        }

        // new DeerRequest("/get_game_user_data", requestData, successHandler, failHandler);
        new DeerRequest("/api/get_game_user_data", requestData, successHandler_hacker, failHandler);
    }



    //用户数据id。用户第三发存储数据时，存储数据id
    private _userDataID: string = null;

    public get game_dataID(): string {
        return this._userDataID;
    }


    /**
     * 保存用户的数据id到服务器
     * 
     * @param dataID                数据id
     * @param successHandler        保存成功回调
     * @param failHandler           保存失败回调
     */
    public game_saveDataIDToService(dataID: string, successHandler: Function = null, failHandler: Function = null): void {
        if (this._userDataID == dataID) {
            if (successHandler) successHandler();
            return;
        }

        if (!this._isReady) {
            if (failHandler) failHandler();
            return;
        }


        let requestData: object = {
            "user_id": this._userVO.id,
            "game_id": this._game_id,
            "session_key": this._session,
            "msg_id": dataID,
        }

        // new DeerRequest("/get_game_user_data", requestData, successHandler, failHandler);
        let request: DeerRequest = new DeerRequest("/api/save_msg_id", requestData,
            (res) => {
                this._game_userID = dataID;
            },
            (err) => {
            }
        );

        request.onSuccess(successHandler);
        request.onFail(failHandler);
    }



    private _game_getRandomUsersRequest: DeerRequest;

    //上一次请求到的随机用户
    private _lastRandomUsers: Array<DeerUserVO>;

    /**
     * 随机获取一些用户数据。服务器返回100个用户数据。
     * 
     * @param successHandler        保存成功回调
     * @param failHandler           保存失败回调
     */
    public game_getRandomUsers(successHandler: (users: Array<DeerUserVO>) => void = null, failHandler: Function = null): void {
        if (!this._isReady) {
            if (failHandler) failHandler();
            return;
        }

        if (!this._game_getRandomUsersRequest) {
            let requestData: object = {
                "user_id": this._userVO.id,
                "game_id": this._game_id,
                "session_key": this._session,
            }

            this._game_getRandomUsersRequest = new DeerRequest(
                "/api/random_users",
                requestData,
                this.game_getRandomUsers_suc.bind(this),
                this.game_getRandomUsers_fail.bind(this),
                this.game_getRandomUsers_data.bind(this),
            );
        }

        this._game_getRandomUsersRequest.onSuccess(successHandler);
        this._game_getRandomUsersRequest.onFail(failHandler);
    }


    /**
     * 解析随机用户数据
     * 
     * @param res 
     */
    private game_getRandomUsers_data(res: any): any {
        try {
            let myUserID: number = this._userVO.id;

            let users: Array<DeerUserVO> = [];

            let arr: Array<any> = res["msg"];
            for (let i: number = 0, len: number = arr.length; i < len; i++) {
                if (arr[i].user_id != myUserID) {
                    users.push(new DeerUserVO(arr[i]));
                }
            }

            if (users.length > 0) this._lastRandomUsers = users.concat();

            return users;
        } catch (error) {
            //console.log("analyse random user data error", error)
        }

        //尝试使用上一次数据
        if (this._lastRandomUsers && this._lastRandomUsers.length > 0) {
            return this._lastRandomUsers.concat();
        }

        return [];
    }

    private game_getRandomUsers_suc(res: any): void {
        this._game_getRandomUsersRequest = null;
    }

    private game_getRandomUsers_fail(res: object): void {
        this._game_getRandomUsersRequest = null;
    }



    //上一次刷新时间
    private _game_messageLastRefreshTime: number = 0;

    /**
     * 定时刷新消息
     */
    private game_messageRefreshInterval(): void {
        //检查是否有事件监听
        if (!DeerSDK.instance.hasEventListener(DeerSDKEventNames.NEW_MESSAGES)) {
            return;
        }

        if (this._serverTimeS - this._game_messageLastRefreshTime > DeerSDK.MESSAGE_MIN_DELAY_SECOND) {
            //刷新数据
            this.game_messageRefresh();
        }
    }


    private _game_messageRefreshIndex: number = 1;

    /**
     * 刷新消息
     * 
     */
    public game_messageRefresh(msgType: DeerMessageType = 0): void {
        if (!this._isReady) return;

        //消息最小时间
        let minTime: number = 0;
        if (this._game_messageRefreshIndex > 1) {
            minTime = Math.floor(this._game_messageLastRefreshTime - DeerSDK.MESSAGE_MIN_DELAY_SECOND - 10);
        }

        let requestData: object = {
            "user_id": this._userVO.id,
            "game_id": this._game_id,
            "session_key": this._session,
            "index": this._game_messageRefreshIndex,
            "msg_type": msgType,
            "last_time": minTime,
        }

        new DeerRequest("/msg/roll_msg", requestData, this.game_messageRefresh_suc.bind(this), this.game_messageRefresh_fail.bind(this));


        //记录上次刷新时间
        this._game_messageLastRefreshTime = this._serverTimeS;
    }


    /**
     * 已派发的消息id列表
     */
    private _game_messageIDs: Array<number> = [];


    private _game_messageAll: Array<DeerMessageVO> = [];

    /**
     * 获取所有消息。请自行过滤需要的消息。
     */
    public get game_messageAll(): Array<DeerMessageVO> {
        return this._game_messageAll;
    }


    /**
     * 沒有派发的消息
     */
    private _game_messageStack: Array<DeerMessageVO>;


    /**
     * 刷新消息成功
     */
    private game_messageRefresh_suc(data: object): void {
        if (!this._game_messageStack) this._game_messageStack = [];

        try {
            let msgs: Array<any> = data as Array<any>;

            let len: number = msgs.length;
            for (let i: number = 0; i < len; i++) {
                let msg: any = msgs[i];
                if (!msg) continue;

                let id: number = parseInt("" + msg.id);
                if (id <= 0) continue;
                if (this._game_messageIDs.indexOf(id) >= 0) continue;

                let vo: DeerMessageVO = new DeerMessageVO();
                vo.id = id;
                vo.type = msg["msg_type"];

                vo.readed = (msg["has_readed"] === true);

                vo.title = msg["msg_title"];
                vo.content = msg["msg_content"];
                vo.data = msg["msg_data"];

                //尝试解析
                try {
                    let jsonData: object = JSON.parse(vo.data);
                    vo.data = jsonData;
                } catch (error) {

                }

                //消息发送者
                if (msg["from_user_detail"]) {
                    let userVO: DeerUserVO = new DeerUserVO(msg["from_user_detail"]);
                    if (userVO.id) vo.fromUser = userVO;
                }

                vo.createTime = new Date();
                vo.createTime.setTime(msg.create_time * 1000);

                this._game_messageIDs.push(id);
                this._game_messageAll.push(vo);

                this._game_messageStack.push(vo);
            }

            //刷新索引
            this._game_messageRefreshIndex++;
        } catch (error) {

        }

        if (this._game_messageStack.length > 0) {
            //检查是否派发事件
            if (this.hasEventListener(DeerSDKEventNames.NEW_MESSAGES)) {
                this.dispatchEventWith(DeerSDKEventNames.NEW_MESSAGES, this._game_messageStack);

                //时间派发后，清除数据
                this._game_messageStack = null;
            }
        }
    }

    /**
     * 刷新消息失败
     */
    private game_messageRefresh_fail(data: object): void {

    }



    /**
     * 消息已读上报
     * 
     * @param msgID                 消息id
     * @param successHandler        保存成功回调
     * @param failHandler           保存失败回调
     */
    public game_messageReaded(msgID: number, successHandler: Function = null, failHandler: Function = null): void {
        if (!this._isReady) return;

        if (msgID <= 0) return;

        let requestData: object = {
            "user_id": this._userVO.id,
            "game_id": this._game_id,
            "session_key": this._session,
            "msg_id": msgID
        }

        new DeerRequest("/msg/readed_msg", requestData, successHandler, failHandler);
    }


    /**
     * 发送一条消息给目标用户
     * 
     * 
     * @param toUserID 
     * @param title 
     * @param content 
     * @param data                  携带数据
     * @param successHandler        保存成功回调
     * @param failHandler           保存失败回调
     */
    public game_messageSendToUser(toUserID: number,
        title: string,
        content: string,
        data: object = null,
        successHandler: Function = null, failHandler: Function = null): void {
        if (!this._isReady) return;

        if (toUserID <= 0) return;

        let requestData: object = {
            "user_id": this._userVO.id,
            "game_id": this._game_id,
            "session_key": this._session,
            "to_user_id": toUserID,
            "msg_title": title,
            "msg_content": content,
        }

        if (data) {
            requestData["msg_data"] = JSON.stringify(data);
        }

        new DeerRequest("/msg/user_to_user", requestData, successHandler, failHandler);
    }




    /**
     * 保存成就
     * 
     * @param achievementID         成就id
     * @param achievementValue      成就值
     * @param successHandler        保存成功回调
     * @param failHandler           保存失败回调
     */
    public game_achievementSave(achievementID: string, achievementValue: number = 0, successHandler: Function = null, failHandler: Function = null): void {
        if (!this._isReady || !achievementID) return;

        //user_id,game_id,,achieve_v
        let requestData: object = {
            "user_id": this._userVO.id,
            "game_id": this._game_id,
            "session_key": this._session,
            "achieve_id": achievementID,
            "achieve_v": achievementValue
        }

        new DeerRequest("/achieve/save_achieve", requestData, successHandler, failHandler);
    }


    /**
     * 获得已完成指定成就的用户数据
     * 
     * @param achievementID         成就id
     * @param count                 获取多少用户数据
     * @param order                 排序方式。1：正序，-1：倒序
     * @param successHandler        保存成功回调
     * @param failHandler           保存失败回调
     */
    public game_achievementObtainedUsers(achievementID: string,
        count: number = 10,
        order: number = 1,
        successHandler: (users: Array<DeerUserVO>) => void = null,
        failHandler: Function = null): void {
        if (!this._isReady || !achievementID) return;

        //user_id,game_id,,achieve_v
        let requestData: object = {
            "user_id": this._userVO.id,
            "game_id": this._game_id,
            "session_key": this._session,
            "achieve_id": achievementID,
            "num": count,
            "order": order,
        }

        new DeerRequest("/achieve/get_achieve", requestData, successHandler, failHandler, this.game_achievementObtainedUsers_data.bind(this));
    }


    private game_achievementObtainedUsers_data(res: any): Array<DeerUserVO> {
        let vos: Array<DeerUserVO> = [];

        try {
            let datas: Array<any> = res;
            for (let i: number = 0; i < datas.length; i++) {
                let vo: DeerUserVO = new DeerUserVO(datas[i]);
                if (vo && vo.id && vo.nickname) {
                    vos.push(vo);
                }
            }

        } catch (error) {

        }

        return vos;
    }
    //=========================================================================


    //=========================================================================
    //红包接口
    //=========================================================================

    private _luckyMoneyData: object = {};


    private _luckyMoneyTypes: Array<string>;


    //我的红包金额
    private _luckyMoney_myBalance: number = 0;


    //提现最小金额
    private _luckyMoney_minWithdrawalAmount: number = 0;

    /**
     * 获取我的红包余额(分)
     * 
     */
    public get luckyMoney_myBalance(): number {
        return this._luckyMoney_myBalance;
    }

    /**
     * 获取最小金额
     * 
     */
    public get luckyMoney_minWithdrawalAmount(): number {
        return this._luckyMoney_minWithdrawalAmount;
    }

    /**
     * 注册红包策略id
     * 
     * @param types 
     */
    public luckyMoney_registerTypes(types: Array<string>): void {
        if (!types) return;

        if (this._luckyMoneyTypes) throw new Error("You'd registered the types of lucky toney!");

        this._luckyMoneyData = {};
        this._luckyMoneyTypes = types.concat();

        //刷新所有策略
        if (this.isReady) {
            this.luckyMoney_refreshMyBalance();
            this.luckyMoney_refresh();
        } else {
            this.addEventListener(DeerSDKEventNames.READY, (e: EventData) => {
                this.luckyMoney_refreshMyBalance();
                this.luckyMoney_refresh();
            }, this, 0, true);
        }
    }


    /**
     * 刷新红包数据
     * 
     * @param   types               需要刷新的策略id。如果为空，刷新所有策略
     */
    public luckyMoney_refresh(types: Array<string> = null): void {
        if (!this._isReady) return;

        if (!types) types = this._luckyMoneyTypes;
        if (!types || types.length == 0) return;

        let requestData: object = {
            "user_id": this._userVO.id,
            "game_id": this._game_id,
            "session_key": this._session,
            "strategy_id": types.join(",")
        }

        new DeerRequest(
            "/packet/get_order",
            requestData,
            this.luckyMoney_refresh_suc.bind(this),
            this.luckyMoney_refresh_fail.bind(this),
            this.luckyMoney_refresh_data.bind(this),
        );
    }


    /**
     * 
     * @param res 
     */
    private luckyMoney_refresh_data(res: any): any {
        try {
            // order_money
            // strategy_id
            // user_order_id

            let data: Array<any> = res;
            data.forEach((obj: any) => {
                let vo: DeerLuckyMoney = new DeerLuckyMoney();
                vo.id = obj["user_order_id"];
                vo.amount = obj["order_money"];
                vo.type = obj["strategy_id"];

                let vos: Array<DeerLuckyMoney> = this._luckyMoneyData[vo.type];
                if (!vos) vos = this._luckyMoneyData[vo.type] = [];
                vos.push(vo);
            })

            this.dispatchEventWith(DeerSDKEventNames.LUCKY_MONEY_UPDATE);
        } catch (error) {
            //console.log("analyse lucky money data error", error)
        }

        return [];
    }

    private luckyMoney_refresh_suc(res: any): void {
    }

    private luckyMoney_refresh_fail(res: object): void {
    }


    /**
     * 派发红包
     * 
     * @param   data
     */
    public luckyMoney_dispach(data: DeerLuckyMoney, success: Function = null, fail: Function = null): void {
        if (!this._isReady || !data) {
            if (fail) fail();
            return;
        }

        // this._luckyMoney_myAmount += data.amount;
        // this.dispatchEventWith(DeerSDKEventNames.LUCKY_MONEY_UPDATE);

        let requestData: object = {
            "user_id": this._userVO.id,
            "game_id": this._game_id,
            "session_key": this._session,
            "order_id": data.id,
            "strategy_id": data.type
        }

        let request: DeerRequest = new DeerRequest("/packet/send_packet", requestData,
            (res) => {
                if (res && res["balance"] > 0) {
                    this._luckyMoney_myBalance = res["balance"];
                    this.dispatchEventWith(DeerSDKEventNames.LUCKY_MONEY_UPDATE);
                }

                //再次刷新一个策略
                this.luckyMoney_refresh([data.type]);
            },
            (err) => {
                //如果失败，减去之前增加的红包金额
                // this._luckyMoney_myBalance -= data.amount;
                // this.dispatchEventWith(DeerSDKEventNames.LUCKY_MONEY_UPDATE);
            }
        );
        request.onSuccess(success);
        request.onFail(fail);
    }



    /**
     * 获取指定类型的一个红包
     * 
     * @param type 
     */
    public luckyMoney_getOne(type: string): DeerLuckyMoney {
        let moneys: Array<DeerLuckyMoney> = this._luckyMoneyData[type];
        if (moneys && moneys.length > 0) {
            return moneys.shift();
        }

        return null;
    }


    /**
     * 检查是否存在红包
     * 
     * @param type 
     */
    public luckyMoney_exist(type: string): boolean {
        let moneys: Array<DeerLuckyMoney> = this._luckyMoneyData[type];
        if (moneys && moneys.length > 0) {
            return true;
        }

        return false;
    }



    /**
     * 刷新我的红包金额
     * 
     */
    public luckyMoney_refreshMyBalance(): void {
        if (!this._isReady) {
            return;
        }

        let requestData: object = {
            "user_id": this._userVO.id,
            "game_id": this._game_id,
            "session_key": this._session,
        }

        new DeerRequest(
            "/packet/get_user_amount",
            requestData,
            this.luckyMoney_getMyBalance_suc.bind(this),
            this.luckyMoney_getMyBalance_fail.bind(this),
        );
    }


    private luckyMoney_getMyBalance_suc(res: any): void {
        try {
            // balance: 8070, min_withdraw_amount: 2000
            if (res["balance"] > 0) {
                this._luckyMoney_myBalance = res["balance"];
            }

            if (res["min_withdraw_amount"] > 0) {
                this._luckyMoney_minWithdrawalAmount = res["min_withdraw_amount"];
            }

            this.dispatchEventWith(DeerSDKEventNames.LUCKY_MONEY_UPDATE);
        } catch (error) {

        }
    }

    private luckyMoney_getMyBalance_fail(res: object): void {
    }


    private _luckyMoney_withdrawRequest: DeerRequest;

    private _luckyMoney_withdrawNeedFollowCallbacks: Array<Function> = [];

    /**
     * 红包提现
     * 
     * @param success                   提现成功回调
     * @param fail                      提现失败回调
     * @param needFollowCallback        需要关注公众号回调
     */
    public luckyMoney_withdraw(
        success: Function = null,
        fail: Function = null,
        needFollowCallback: Function = null
    ): void {
        if (!this._isReady) {
            if (fail) fail();
            return;
        }

        if (!this._luckyMoney_withdrawRequest) {
            let requestData: object = {
                "user_id": this._userVO.id,
                "game_id": this._game_id,
                "session_key": this._session,
            }

            this._luckyMoney_withdrawRequest = new DeerRequest(
                "/packet/withdraw",
                requestData,
                this.luckyMoney_withdraw_suc.bind(this),
                this.luckyMoney_withdraw_fail.bind(this),
            );
        }

        this._luckyMoney_withdrawRequest.onFail(fail);
        this._luckyMoney_withdrawRequest.onSuccess(success);

        if (needFollowCallback) {
            this._luckyMoney_withdrawNeedFollowCallbacks.push(needFollowCallback);
        }
    }


    private luckyMoney_withdraw_suc(res: any): void {
        if (res) {
            if (res["status"] == -3) {
                //没有关注公众号
                this._luckyMoney_withdrawRequest.destory();//销毁
                this._luckyMoney_withdrawNeedFollowCallbacks.forEach((ele: Function) => {
                    ele();
                });
            } else {
                // balance: 8070, min_withdraw_amount: 2000
                if (res["balance"] > 0) {
                    this._luckyMoney_myBalance = res["balance"];
                    this.dispatchEventWith(DeerSDKEventNames.LUCKY_MONEY_UPDATE);
                }
            }
        }

        this._luckyMoney_withdrawRequest = null;
        this._luckyMoney_withdrawNeedFollowCallbacks = [];
    }

    private luckyMoney_withdraw_fail(res: object): void {
        this._luckyMoney_withdrawRequest = null;
        this._luckyMoney_withdrawNeedFollowCallbacks = [];
    }




    //=========================================================================


    //=========================================================================
    //游戏道具接口
    //=========================================================================


    /**
     * 道具类型->数量表
     * 
     */
    private _item_map: object = {};


    /**
     * 获取指定类型的道具数量
     * 
     * @param itemType 
     */
    public item_getAmount(itemType: DeerItemType): number {
        let v: number = this._item_map[itemType];
        if (v == undefined || v == null) return 0;

        return v;
    }




    /**
     * 从服务器获取所有道具信息（类型、数量）
     * 
     * @param successHandler        保存成功回调
     * @param failHandler           保存失败回调
     */
    public item_getAllFromService(successHandler: Function = null, failHandler: Function = null): void {
        //user_id,game_id,,achieve_v
        let requestData: object = {
            "user_id": this._userVO.id,
            "game_id": this._game_id,
            "session_key": this._session
        }

        let request: DeerRequest = new DeerRequest("/api/get_user_items", requestData, successHandler, failHandler);
        request.onSuccess(this.item_getAllFromService_success.bind(this));
    }


    private item_getAllFromService_success(data: object): void {
        try {
            let items: Array<any> = data as Array<any>;

            items.forEach((element) => {
                let type: string = "" + element["type_id"];
                this._item_map[type] = element["amount"];
            });
        } catch (error) {

        }
    }


    /**
     * 获取指定类型的道具数量
     * 
     * @param itemType 
     * @param successHandler        保存成功回调
     * @param failHandler           保存失败回调
     */
    public item_getAmountFromService(itemType: DeerItemType, successHandler: Function = null, failHandler: Function = null): void {
        let requestData: object = {
            "user_id": this._userVO.id,
            "game_id": this._game_id,
            "session_key": this._session,
            "type": itemType
        }

        let request: DeerRequest = new DeerRequest("/api/get_item_amount", requestData, successHandler, failHandler);
        request.onSuccess((data) => {
            let v: string = data["amount"];
            if (v.length > 0) {
                this._item_map[itemType] = parseInt(v);
                //console.log("记录道具:类型,数量", itemType, v);
            }
        });
    }


    /**
     * 上报道具数量。<br/>
     * 
     * <p>
     * 游戏道具类型是不只是上报的。后端会做限制。
     * </p>
     * 
     * @param itemType          道具类型
     * @param amount             道具数量
     * @param successHandler        保存成功回调
     * @param failHandler           保存失败回调
     */
    public item_saveAmountToService(itemType: DeerItemType, amount: number, successHandler: Function = null, failHandler: Function = null): void {
        let requestData: object = {
            "user_id": this._userVO.id,
            "game_id": this._game_id,
            "session_key": this._session,
            "type": itemType,
            "amount": amount
        };

        //记录原始数据
        let originalV: number = this._item_map[itemType];
        this._item_map[itemType] = amount;

        let request: DeerRequest = new DeerRequest("/api/save_item_amount", requestData, successHandler, failHandler);
        request.onFail(() => {
            this._item_map[itemType] = originalV;
            //console.log("【道具保存失败】恢复原始值", itemType, originalV);
        });
    }


    //=========================================================
    //广告相关
    //=========================================================

    private _adDataMap: object = {};


    //广告请求字典
    private _adRequestMap: object = {};


    /**
     * 获取所有广告数据
     * 
     */
    public ad_getAllAds(): Array<DeerAdVO> {
        let ads: Array<DeerAdVO> = [];

        Object.keys(this._adDataMap).forEach((key: string) => {
            let nowAds: Array<DeerAdVO> = this._adDataMap[key];
            if (nowAds) {
                nowAds.forEach((ad: DeerAdVO) => {
                    if (ads.indexOf(ad) == -1) ads.push(ad);
                })
            }
        });

        return ads;
    }

    /**
     * 获取广告数据
     * 
     * @param adType 
     * @param adFlag 
     */
    public ad_getAds(adType: DeerAdType, adFlag: string = null): Array<DeerAdVO> {
        let ads: Array<DeerAdVO> = this._adDataMap["ad_" + adType];

        if (adFlag) {//标识过滤
            let newAds: Array<DeerAdVO> = this._adDataMap["ad_" + adType + "_" + adFlag]
            if (newAds && newAds.length > 0) ads = newAds;
        }

        if (ads) return ads.concat();
        return null;
    }


    private ad_addAds(adType: DeerAdType, ads: Array<DeerAdVO>): void {
        //记录数据
        if (ads && ads.length > 0) {
            this._adDataMap["ad_" + adType] = ads;
            ads.forEach((ad: DeerAdVO) => {
                ad.adType = adType;

                //区分广告标识
                let adFlag: string = ad.flag;
                if (adFlag) {
                    let keyV: string = "ad_" + adType + "_" + adFlag;
                    if (this._adDataMap[keyV] == undefined) this._adDataMap[keyV] = []
                    this._adDataMap[keyV].push(ad);
                }
            })
        }
    }

    /**
     * 刷新广告数据
     * 
     * @param       adType          广告入口
     * @param       successHandler  数据成功回调
     * @param       failHandler     数据失败回调
     * @param       adFlag          广告标识。用来过滤同一入口下的广告。
     * 
     * 
     * @see DeerAdType
     */
    public ad_getAdData(adType: DeerAdType,
        successHandler: (ads: Array<DeerAdVO>) => void = null,
        failHandler: (err: any) => void = null,
        adFlag: string = null): void {


        //==========================================================
        //检查是否有数据
        //==========================================================
        let ads: Array<DeerAdVO> = this.ad_getAds(adType, adFlag)
        if (ads) {
            if (successHandler != null) {
                successHandler(ads);
            }
            return;
        }
        //==========================================================

        let request: DeerRequest = this._adRequestMap[adType];
        if (!request) {
            let requestData: object = {
                "app_id": this._appID,
                "entry_id": adType
            }

            request = new DeerRequest("/adv/adv", requestData,
                (ads: Array<DeerAdVO>) => {
                    delete this._adRequestMap["ad_" + adType];
                    //发送统计
                    this.track(DeerTrackAction.AD_REQUEST, { "enter_id": adType });

                    //添加广告
                    this.ad_addAds(adType, ads);

                    if (successHandler != null) {
                        let ads: Array<DeerAdVO> = this.ad_getAds(adType, adFlag)
                        successHandler(ads);
                    }
                },
                () => {
                    delete this._adRequestMap["ad_" + adType];
                },
                this.ad_getAdData_dataFactory.bind(this));
        }

        // request.onSuccess(successHandler);
        request.onFail(failHandler);
    }


    private ad_getAdData_dataFactory(data: any): Array<DeerAdVO> {
        let ads: Array<DeerAdVO> = [];
        try {
            let adData: Array<any> = data;
            for (let i: number = 0; i < adData.length; i++) {
                let obj: object = adData[i];

                let ad: DeerAdVO = new DeerAdVO();
                ad.id = parseInt(obj["id"]);

                ad.appID = obj["app_id"];
                ad.name = obj["name"];
                ad.path = obj["path"];
                ad.desc = obj["desc"];
                ad.icon = obj["icon"];
                ad.img_256_129 = obj["adv_img"];
                ad.img_1000_840 = obj["rich_img"];
                ad.previewImg = obj["pub_img"];
                ad.bannerImg = obj["strip_img"];
                ad.splashImg = obj["screen_img"];

                //spine 动画
                if (obj["spine"]) {
                    ad.spine = { "atlas": obj["spine"]["dh_desc"], "png": obj["spine"]["dh_chartlet"], "aniJson": obj["spine"]["dh_file"] }
                }

                //spine 动画 for laya
                if (obj["laya_spine"]) {
                    ad.spineLaya = { "sk": obj["laya_spine"]["laya_sk"], "chartlet": obj["laya_spine"]["laya_chartlet"] };
                }

                ad.adValue = parseInt(obj["avd_value"]);

                //=====================================================
                //检查广告的目标设备
                //=====================================================
                let isOnPlatform: boolean = true;
                if (obj["equipment"] != undefined) {
                    ad.device = parseInt(obj["equipment"]);

                    if (ad.device == DeerDeviceType.ANDROID && !GameValues.isAndroid) {
                        isOnPlatform = false;
                    } else if (ad.device == DeerDeviceType.IOS && !GameValues.isIOS) {
                        isOnPlatform = false;
                    }
                }
                //=====================================================

                if (isOnPlatform) ads.push(ad);
            }
        } catch (error) {

        }

        return ads.concat();
    }






    //=========================================================
    //基础方法
    //=========================================================

    /**
     * 获取需要携带的数据
     * 
     * @param shareType         分享类型。
     */
    public getShareQueryData(): object {
        let queryObj: object = {
            "deer_uid": this._userVO.id,
            "time": new Date().getTime()
        };


        if (this._userInfo) {
            queryObj["deer_nn"] = this._userInfo.nickName;
            queryObj["deer_av"] = this._userInfo.avatarUrl;
        }

        if (this._inviterChannel) queryObj["deer_chid"] = this._inviterChannel;
        if (this._inviterAdID) queryObj["deer_adid"] = this._inviterAdID;
        if (this._inviterAdEnterID) queryObj["deer_enid"] = this._inviterAdEnterID;

        return queryObj;
    }



    //==============================================================
    //统计相关
    //==============================================================

    //统计代理方法。如果设置该方法，统计会同步发送一份
    public trackProxyFun: (action: DeerTrackAction, data: object) => void = null;

    /**
     * 发送统计
     * 
     * @param action 
     * @param data 
     * @param sendNow           是否立即发送统计。默认为false，即先保存在本地，定时打包发给服务器。 
     */
    public track(action: DeerTrackAction, data: object = null, sendNow: Boolean = false): void {
        if (!data) data = {};

        data["aid"] = action;

        if (GameValues.gameVersion) data["game_v"] = GameValues.gameVersion;
        //游戏时长
        data["game_t"] = this._passedSeconds;

        if (this._inviterChannel) data["iv_chid"] = this._inviterChannel;
        if (this._inviterAdID) data["iv_adid"] = this._inviterAdID;
        if (this._inviterAdEnterID) data["iv_enid"] = this._inviterAdEnterID;

        this._trackDataStack.push(data);
        if (sendNow) {
            this.sendTracks();
        }
        // new DeerRequest("api/game_statistic", data);

        if (this.trackProxyFun) {
            try {
                this.trackProxyFun(action, data);
            } catch (error) {

            }
        }
    }


    private _trackDataStack: Array<any> = [];

    /**
     * 发送统计
     */
    private sendTracks(): void {
        if (this._trackDataStack.length == 0) return;

        if (this._isReady) {
            this._trackDataStack.forEach((data: object) => {
                data["user_id"] = this._userVO.id;
                data["game_id"] = this._game_id;
                data["session"] = this._session;
            })
        }

        //以post方式发送多个数据
        let data: object = { "more_data": JSON.stringify(this._trackDataStack) }
        new DeerRequest("api/game_statistic", data, null, null, null, "POST");

        this._trackDataStack = [];
    }


    //==============================================================
    //其他功能
    //==============================================================

    /**
     * 获取请求的携带数据
     */
    public getRequestData(): object {
        let data: any = {};

        data["user_id"] = this._userVO.id;
        data["game_id"] = this._game_id;
        data["session"] = this._session;

        return data
    }

    /**
     * 发送反馈
     * 
     */
    public sendFeedback(data: { cellphone: string, wx: string, content: string },
        successHandler: (res: any) => void = null,
        failHandler: (err: any) => void = null): void {

        let requestData: object = {
            "user_id": this._userVO.id,
            "game_id": this._game_id,
            "session_key": this._session,
            "tell": data.cellphone,
            "fb_wx": data.wx,
            "fb_content": data.content
        };

        //记录原始数据
        let request: DeerRequest = new DeerRequest("/api/feedback", requestData, successHandler, failHandler);
    }
}





class DeerSDKInternal {

}


/**
 * 微信代理
 */
class WXProxy {

    /**
     * 分享app
     * 
     * @param obj 
     */
    public shareAppMessage(obj: any): void {
        if (typeof wx == "undefined") return;

        //发送统计
        //`1:转发``2:分享`
        DeerSDK.instance.track(DeerTrackAction.GAME_SHARE, { "v": 2 });

        //追加分享参数参数
        this.addShareQueryData(obj);


        //console.log("WXProxy shareAppMessage", obj);

        wx.shareAppMessage(obj);
    }


    /**
     * 追加参数
     * @param obj 
     */
    private addShareQueryData(obj: any): void {
        if (!obj) return;

        let queryObj: object = DeerSDK.instance.getShareQueryData();

        //==========================================================
        //检查分享图
        //==========================================================
        let shareImg: string = obj["imageUrl"];
        let sharePath: string = "";             //分享携带参数
        let shareData: any = DeerSDK.instance.game_getAllShareData();
        if (shareImg && shareData) {
            for (let i: number = 0; i < shareData.length; i++) {
                if (shareData[i].share_img == shareImg) {
                    //发送统计
                    DeerSDK.instance.track(DeerTrackAction.SHARE_IMG_SHOW, { "share_id": shareData[i].share_id })

                    //分享图携带路径参数
                    sharePath = shareData[i].share_path;

                    //追加参数
                    queryObj["deer_shrid"] = shareData[i].share_id;
                    break;
                }
            }
        }
        //==========================================================


        let dataV: string = obj["query"] || "";
        let keys: Array<string> = Object.keys(queryObj);
        keys.forEach((key: string) => {
            if (dataV != "") dataV += "&";
            dataV += key + "=" + encodeURIComponent(queryObj[key]);
        });

        //分享路径
        if (sharePath && sharePath.indexOf("?") >= 0) {
            if (dataV != "") dataV += "&";
            dataV += sharePath.replace(/^.*\?/, "")
        }

        if (dataV != "") obj["query"] = dataV;
    }


    /**
     * 分享app
     * 
     * @param obj 
     */
    public onShareAppMessage(fun: Function): void {
        if (typeof wx == "undefined") return;

        wx.onShareAppMessage(() => {
            let obj: object = fun();
            if (!obj) return {};

            //发送统计
            //`1:转发``2:分享`
            DeerSDK.instance.track(DeerTrackAction.GAME_SHARE, { "v": 1 });

            //追加分享参数参数
            this.addShareQueryData(obj);

            return obj;
        });

        wx.showShareMenu(
            {
                "withShareTicket": true
            }
        );

    }



    /**
     * 创建视频广告
     * 
     * @param obj 
     */
    public createRewardedVideoAd(obj: any): any {
        if (typeof wx == "undefined") return null;

        let ad: any = wx.createRewardedVideoAd(obj);
        if (!ad) return null;

        ad.onClose((res) => {
            if (res && res["isEnded"] == true) {
                DeerSDK.instance.track(DeerTrackAction.SHOW_REWARD_AD_SUC);
            }
        });

        return ad;

    }



}



/**
 * 广告数据
 */
export class DeerAdVO {
    //上一次跳转时间
    public static lastNavigateTime: Date;

    //广告id
    public id: number = 0;

    //目标设备
    public device: DeerDeviceType = 0;

    //广告标识。同一个广告入口，可以用标识来过滤广告数据
    public flag: string;

    //平台appid
    public appID: string;

    //平台游戏id（QQ厘米秀广告需要该字段）
    public gameID: string;

    //游戏名
    public name: string;

    //游戏描述
    public desc: string;

    //游戏icon
    public icon: string = null;

    //256x129广告图。死亡后推荐广告需要使用该图
    public img_256_129: string = null;

    //1000x840广告图
    public img_1000_840: string = null;

    //条形广告 750x210
    public bannerImg: string = null;

    //开屏广告图
    public splashImg: string = null;

    //预览图地址
    public previewImg: string;

    //spine动画文件
    public spine: { "atlas": string, "png": string, "aniJson": string } = null;

    //spine动画文件(laya)
    public spineLaya: { "sk": string, "chartlet": string } = null;

    //广告价值(0-100)
    public adValue: number = 0;

    //广告跳转地址
    public path: string = null;


    //广告类型
    public adType: DeerAdType = 0;


    /**
     * 广告展现上报数据
     */
    public reportShown(): void {
        //发送统计
        DeerSDK.instance.track(DeerTrackAction.AD_SHOW, { "enter_id": this.adType, "ad_id": this.id });
    }

    /**
     * 广告跳转上报数据
     */
    public reportNavigate(): void {
        //发送统计
        DeerSDK.instance.track(DeerTrackAction.AD_NAVIGATE, {
            "enter_id": this.adType,
            "ad_id": this.id,
            "path": this.path
        });
    }

    /**
     * 跳转
     * 
     * 
     * @param  showPreviewImageWhenFail         拒绝跳转后是否预览二维码图
     * @param  success                          接受跳转后回调
     * @param  fail                             拒绝跳转后回调
     */
    public navigate(
        showPreviewImageWhenFail: boolean = true,
        success: Function = null,
        fail: Function = null
    ): void {
        //发送统计
        DeerSDK.instance.track(DeerTrackAction.AD_CLICK, {
            "enter_id": this.adType,
            "ad_id": this.id,
            "path": this.path
        });


        let toAppID: string = this.appID;

        if (GameValues.currentPlatform == PlatformName.QQCM) {
            toAppID = this.gameID;
        }

        // 开屏广告不显示预览图
        if (this.adType == DeerAdType.SPLASH) showPreviewImageWhenFail = false;

        // try {
        let toPath: string = this.path;
        if (toPath) {
            if (toPath.indexOf("?") >= 0) toPath += "&deer_enid=" + this.adType;
            else toPath += "?deer_enid=" + this.adType;

            if (toPath.indexOf("deer_adid=") == -1) {
                toPath += "&deer_adid=" + this.id;
            }
        }

        if (typeof wx == "undefined") return;

        //记录时间
        DeerAdVO.lastNavigateTime = new Date();

        wx.navigateToMiniProgram({
            "appId": toAppID,
            "path": toPath,
            "fail": (err) => {
                if (fail) fail(err);

                if (showPreviewImageWhenFail) {
                    if (this.previewImg != undefined && this.previewImg.indexOf("http") >= 0) {
                        try {
                            wx.previewImage(
                                {
                                    "urls": [this.previewImg]
                                }
                            );
                        } catch (error) {
                        }
                    }
                }
            },
            "success": () => {
                this.reportNavigate();

                if (success) success();
            }
        });
        // } catch (error) {
        //     console.log("########################", error);
        // }
    }

}



