import QQCM_gameInfo from "./QQCM_gameInfo"
import GameValues, { Orientation } from "../base/GameValues";




/**
 * 将对象转换为key value请求参数
 */
var QQCM_objectToURLParamters = function (data: object): string {
    let dataV: string = "";
    if (data) {
        for (let key in data) {
            if (dataV != "") dataV += "&";
            dataV += key + "=" + encodeURIComponent(data[key]);
        }
    }

    return dataV;
}

/**
 * 处理路径
 */
var QQCM_doPath = function (path: string): string {
    return path.replace(/^\/?res\//, "GameRes://res/");
}


var QQCM_startTime: Date;
/**
 * 生成兼容微信小游戏平台的方法
 * 
 * @param gameName      游戏名称
 */
export const QQCM_init = function (gameName: string = null) {
    //开始时间
    QQCM_startTime = new Date();

    window["wx"] = {}
    var wx = window["wx"]

    if (typeof GameStatusInfo != "undefined") {
        let keys: Array<string> = Object.keys(GameStatusInfo);
        keys.forEach((key: string) => {
            QQCM_gameInfo[key] = GameStatusInfo[key];
        })

        QQCM_gameInfo.gameName = gameName;
        console.log("【QQCM】GameStatusInfo")
        console.log(JSON.stringify(GameStatusInfo));
    }

    //=========================================================================
    //画布
    //=========================================================================
    let canvas: any = GameValues.canvas;
    if (canvas) {
        /**
         * 同步获取的是canvas数据
         */
        //@see https://hudong.qq.com/docs/engine/engine/native/func/funcs/other.html
        canvas.toTempFilePathSync = function (obj: any): string {
            console.log("------【QQCM】 toTempFilePathSync-------");
            if (!obj) obj = {};
            console.log(JSON.stringify(obj))

            if (typeof BK == "undefined") return;

            let x: number = obj["x"] || 0;
            let y: number = obj["y"] || 0;
            let width: number = obj["width"] || 0;
            let height: number = obj["height"] || 0;
            let fileType: string = obj["fileType"] || "png";

            //左下角为0 0点
            y = BK.Director.screenPixelSize.height - y - height;

            let ss = new BK.ScreenShot();
            ss.origin = { x: x, y: y };// 设置截图区域原点
            ss.size = { width: width, height: height };// 设置截图区域大小

            let fileName: string = "screenshot_" + (new Date().getTime());

            // 截图得到的文件存放在GameSandBox路径下。
            let filePath: string = ss.shotToFile(fileName, fileType);
            console.log("【QQCM】file saved at " + filePath);

            return filePath;
        }

        /**
         * 异步获取的是webGL数据
         */
        canvas.toTempFilePath = function (obj: any): void {
            console.log("------【QQCM】 toTempFilePath-------")
            console.log(JSON.stringify(obj));

            if (!obj) return;

            let successFun: Function = obj ? obj["success"] : null;
            let failFun: Function = obj ? obj["fail"] : null;
            let completeFun: Function = obj ? obj["complete"] : null;

            if (typeof BK == "undefined") return;

            let x: number = obj["x"] || 0;
            let y: number = obj["y"] || 0;
            let width: number = obj["width"] || 0;
            let height: number = obj["height"] || 0;
            let fileType: string = obj["fileType"] || "png";

            //左下角为0 0点
            y = BK.Director.screenPixelSize.height - y - height;

            // console.log("**** BK.Director.screenScale = " + BK.Director.screenScale);
            // console.log("**** BK.Director.renderSize = " + JSON.stringify(BK.Director.renderSize));
            // console.log("**** BK.Director.screenPixelSize = " + JSON.stringify(BK.Director.screenPixelSize));

            let ss = new BK.ScreenShot();
            ss.origin = { "x": x, "y": y };// 设置截图区域原点
            ss.size = { width: width, height: height };// 设置截图区域大小

            // 截图得到的文件存放在GameSandBox路径下。
            let fileName: string = "screenshot_" + (new Date().getTime());
            ss.shotToFileFromGL(bkWebGLGetInstance(), fileName, fileType, (filePath: string) => {
                console.log("【QQCM】file saved at " + filePath);

                let res: object = {
                    tempFilePath: filePath
                };

                if (filePath) {
                    if (successFun) successFun(res);
                    if (completeFun) completeFun();
                } else {
                    if (failFun) failFun();
                    if (completeFun) completeFun();
                }
            });
        }



    }
    //=========================================================================


    //=========================================================================
    //图片
    //=========================================================================
    wx.createImage = function (): any {
        console.log("------【QQCM】 createImage-------")
        let img: any = new Image();
        console.log("image is " + JSON.stringify(img));
        return img;
    }
    //=========================================================================



    //=========================================================================
    //游戏圈
    //=========================================================================
    wx.createGameClubButton = function (obj: any): any {
        return {
            onTap: function (callback: Function): void {
            },
            offTap: function (callback: Function): void {
            },
            show: function (): void {
            },
            hide: function (): void {
            },
            destory: function (): void {
            }
        };
    }
    //=========================================================================

    //=========================================================================
    //登陆
    //=========================================================================

    //微信登陆
    wx.login = function (obj: any): void {
        console.log("------【QQCM】 login-------")

        if (typeof BK == "undefined") return;

        let successFun: Function = obj ? obj["success"] : null;
        let failFun: Function = obj ? obj["fail"] : null;
        let completeFun: Function = obj ? obj["complete"] : null;


        BK.QQ.fetchOpenKey((errCode, cmd, data) => {
            console.log("fetchOpenKey", errCode, cmd, data);
            let res: object = {};

            if (errCode == 0 || errCode == 200) {
                res["code"] = data.openKey;
            }

            if (successFun) successFun(res);
            if (completeFun) completeFun();
        });
    }


    //=========================================================================
    //设备
    //=========================================================================
    wx.vibrateShort = function (obj: any): void {
        console.log("------【QQCM】 vibrateShort-------")
    }
    wx.vibrateLong = function (obj: any): void {
        console.log("------【QQCM】 vibrateLong-------")
    }
    wx.onMemoryWarning = function (callback: Function): void {
        console.log("------【QQCM】 onMemoryWarning-------")
    }
    //=========================================================================



    //=========================================================================
    //用户信息
    //=========================================================================

    //用户信息
    wx._userInfoRes = null;


    wx._isGettingUserInfo = false;
    wx._getUserInfoStack = [];

    //获取用户信息
    wx.getUserInfo = function (obj: any = null): void {
        console.log("------【QQCM】 getUserInfo-------")

        if (typeof BK == "undefined") return;

        if (wx._userInfoRes != null) {
            let successFun: Function = obj ? obj["success"] : null;
            let completeFun: Function = obj ? obj["complete"] : null;

            if (successFun) successFun(wx._userInfoRes);
            if (completeFun) completeFun();
            return;
        }

        wx._getUserInfoStack.push(obj);

        if (wx._isGettingUserInfo !== true) {
            wx._isGettingUserInfo = true;

            BK.MQQ.Account.getNick(QQCM_gameInfo.openId, (openID, nickName) => {
                console.log("------【QQCM】 BK.MQQ.Account.getNick-------")
                console.log(openID, nickName)

                if (nickName) {
                    wx._userInfoRes = {
                        //nickName: string, avatarUrl: string, gender: number, country: string, province: string, city: string } = null;
                        "userInfo": {
                            "nickName": nickName,
                            "avatarUrl": QQCM_gameInfo.openId,
                            "gender": QQCM_gameInfo.sex,
                        },
                        "rawData": "",
                        "encryptedData": "",
                        "signature": ""
                    }
                }

                wx._getUserInfoStack.forEach((obj: any) => {
                    let successFun: Function = obj ? obj["success"] : null;
                    let failFun: Function = obj ? obj["fail"] : null;
                    let completeFun: Function = obj ? obj["complete"] : null;

                    if (wx._userInfoRes) {
                        if (successFun) successFun(wx._userInfoRes);
                        if (completeFun) completeFun();
                    } else {
                        if (failFun) failFun();
                        if (completeFun) completeFun();
                    }
                });

                wx._getUserInfoStack = [];
                wx._isGettingUserInfo = false;
            });
        }
    }


    wx.createUserInfoButton = function (obj: any = null): any {
        console.log("------【QQCM】 createUserInfoButton-------")
        console.log(obj);

        return null;
    }
    //=========================================================================


    //=========================================================================
    //开放数据
    //=========================================================================


    wx.getFriendCloudStorage = function (obj: object): void {
        console.log("------【QQCM】 getFriendCloudStorage-------")
        console.log(obj)
        if (!obj) return;

        if (typeof BK == "undefined") return;

        let successFun: Function = obj ? obj["success"] : null;
        let failFun: Function = obj ? obj["fail"] : null;
        let completeFun: Function = obj ? obj["complete"] : null;


        //@see https://hudong.qq.com/docs/engine/userInfo/rank.html#5
        // 排序的方法：[ 1: 从大到小(单局)，2: 从小到大(单局)，3: 由大到小(累积)]
        // var rankType = 0; //要查询的排行榜类型，0: 好友排行榜，1: 群排行榜，2: 讨论组排行榜，3: C2C二人转 (手Q 7.6.0以上支持)
        // 必须配置好周期规则后，才能使用数据上报和排行榜功能
        // let errCode = 0;
        // let cmd = ""
        // let data:any = JSON.parse('{"data":{"ranking_list":[{"nick":"laan","score":10,"selfFlag":1,"url":"http://thirdqq.qlogo.cn/g?b=sdk&k=IfYApSUGXLfESO24mAcl3Q&s=40&t=1483287545"}]},"seqId":0}');
        BK.QQ.getRankListWithoutRoom("score", 1, 0, (errCode, cmd, data) => {
            console.log("getRankListWithoutRoom callback  cmd" + cmd + " errCode:" + errCode + "  data:" + JSON.stringify(data));
            // 返回错误码信息
            if (errCode !== 0) {
                console.log('获取排行榜数据失败!错误码：' + errCode);
                if (failFun) failFun(errCode);
                if (completeFun) completeFun();
                return;
            }

            let rankData: Array<any> = [];
            // 解析数据
            if (data) {
                for (var i = 0; i < data.data.ranking_list.length; ++i) {
                    let obj: object = data.data.ranking_list[i];

                    let userData: object = {
                        avatarUrl: obj["url"],
                        nickname: obj["nick"],
                        openid: 0,
                        isSelf: (obj["selfFlag"] == 1),
                        KVDataList: [
                            {
                                "key": "score",
                                "value": '{"wxgame": {"score": ' + obj["score"] + '}}'
                            }
                        ],
                    }

                    rankData.push(userData);
                }
            }

            // console.log("返回数据为");
            // console.log(JSON.stringify(rankData))

            if (successFun) successFun({ "data": rankData });
            if (completeFun) completeFun();
        });
    }


    /**
     * 读取用户数据
     */
    wx.getUserCloudStorage = function (obj: object): void {
        console.log("------【QQCM】 setUserCloudStorage-------")
        console.log(obj)
        if (!obj) return;

        if (typeof BK == "undefined") return;

        let successFun: Function = obj ? obj["success"] : null;
        let failFun: Function = obj ? obj["fail"] : null;
        let completeFun: Function = obj ? obj["complete"] : null;


        if (failFun) failFun(0);
        if (completeFun) completeFun();
    }


    /**
     * 保存用户数据
     */
    wx.setUserCloudStorage = function (obj: object): void {
        console.log("------【QQCM】 setUserCloudStorage-------")
        console.log(obj)
        if (!obj) return;

        if (typeof BK == "undefined") return;

        let successFun: Function = obj ? obj["success"] : null;
        let failFun: Function = obj ? obj["fail"] : null;
        let completeFun: Function = obj ? obj["complete"] : null;


        //分数
        let scoreV: number;

        let KVDataList: Array<any> = obj["KVDataList"];
        if (KVDataList) {
            for (let i: number = 0; i < KVDataList.length; i++) {
                let KVData: any = KVDataList[i];
                let key: string = KVData["key"];
                let value: string = KVData["value"];

                try {
                    let obj: object = JSON.parse(value);
                    if (obj["wxgame"]) {
                        scoreV = Math.floor(obj["wxgame"]["score"]);
                    }
                } catch (error) {

                }
            };
        }

        console.log("【保存分数】" + scoreV);

        if (!isNaN(scoreV)) {
            //保存分数
            let data = {
                userData: [
                    {
                        openId: QQCM_gameInfo.openId,
                        startMs: QQCM_startTime.getTime().toString(),    //必填，游戏开始时间，单位为毫秒，字符串类型
                        endMs: ((new Date()).getTime()).toString(),  //必填，游戏结束时间，单位为毫秒，字符串类型
                        scoreInfo: { "score": scoreV }
                    },
                ],
                attr: {
                    score: {
                        type: 'rank',
                        order: 1,
                    }
                },
            };

            // gameMode: 游戏模式，如果没有模式区分，直接填 1
            // 必须配置好周期规则后，才能使用数据上报和排行榜功能
            BK.QQ.uploadScoreWithoutRoom(1, data, (errCode, cmd, data) => {
                // 返回错误码信息
                if (errCode !== 0) {
                    console.log('上传分数失败!错误码：' + errCode);

                    if (failFun) failFun(errCode);
                    if (completeFun) completeFun();
                } else {
                    console.log('上传分数成功' + JSON.stringify(data));
                    if (successFun) successFun(data);
                    if (completeFun) completeFun();
                }
            });
        }

    }

    //=========================================================================

    //=========================================================================
    //设置
    //=========================================================================
    wx.getSetting = function (obj: any): void {
        console.log("------【QQCM】 getSetting-------")
        console.log(obj)
        if (!obj) return;

        let successFun: Function = obj ? obj["success"] : null;
        let failFun: Function = obj ? obj["fail"] : null;
        let completeFun: Function = obj ? obj["complete"] : null;

        let res: any = {
            "authSetting": {
                "scope.userInfo": true
            }
        }

        if (successFun) successFun(res);
        if (completeFun) completeFun();
    }
    //=========================================================================


    //=========================================================================
    //小程序跳转
    //=========================================================================
    wx.navigateToMiniProgram = function (obj: any) {
        console.log("------【QQCM】 navigateToMiniProgram-------")
        console.log(obj)
        if (!obj) return;

        let successFun: Function = obj ? obj["success"] : null;
        let failFun: Function = obj ? obj["fail"] : null;
        let completeFun: Function = obj ? obj["complete"] : null;

        if (successFun) successFun();

        let gameId = obj["appId"]; //跳转的gameid，必须为数字
        let extendInfo = QQCM_objectToURLParamters(obj["extraData"]); //额外参数，必须为字符串
        BK.QQ.skipGame(gameId, extendInfo);

        if (completeFun) completeFun();
    }
    //=========================================================================

    //=========================================================================
    //开放数据域
    //=========================================================================
    wx.__openDataContext = {
        callbacks: [],
        postMessage: function (msg: any): void {
            wx.__openDataContext.callbacks.forEach(fun => {
                fun(msg);
            });
        }
    }
    wx.getOpenDataContext = function (): any {
        return wx.__openDataContext;
    }

    wx.onMessage = function (callback: Function): void {
        let callbacks: Array<Function> = wx.__openDataContext.callbacks;
        if (callbacks.indexOf(callback) == -1) {
            callbacks.push(callback);
        }
    }
    //=========================================================================




    //=========================================================================
    //系统信息
    //=========================================================================
    wx.getSystemInfo = function (obj: any): any {
        console.log("------【QQCM】 getSetting-------")
        console.log(obj)
        if (!obj) return;

        let successFun: Function = obj ? obj["success"] : null;
        let failFun: Function = obj ? obj["fail"] : null;
        let completeFun: Function = obj ? obj["complete"] : null;

        let res: any = {
            version: QQCM_gameInfo.QQVer,
            SDKVersion: "2.3.0",
            platform: QQCM_gameInfo.platform,
            model: QQCM_gameInfo.model,
        }

        if (successFun) successFun(res);
        if (completeFun) completeFun();
    }
    //=========================================================================


    //=========================================================================
    //生命周期
    //=========================================================================
    wx.exitMiniProgram = function (obj: any): void {
        console.log("------【QQCM】 exitMiniProgram-------")
        console.log(obj)

        let successFun: Function = obj ? obj["success"] : null;
        let failFun: Function = obj ? obj["fail"] : null;
        let completeFun: Function = obj ? obj["complete"] : null;

        if (failFun) failFun({});
        if (completeFun) completeFun();
    }

    wx.__query = null;
    wx.getLaunchOptionsSync = function (): any {
        console.log("------【QQCM】 getLaunchOptionsSync-------")

        if (wx.__query == null) {
            try {
                let queryV: string = QQCM_gameInfo.gameParam;
                wx.__query = JSON.parse('{"' + decodeURI(queryV).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
            } catch (error) {
                wx.__query = {}
            }
        }

        return {
            scene: 0,
            query: wx.__query,
            isSticky: 0,
            shareTicket: null,
        }
    }

    wx.onHide = function (callback: Function): void {
        console.log("------【QQCM】 onHide-------")
        if (typeof BK == "undefined") return;

        BK.onEnterBackground(callback);
    }

    wx.onShow = function (callback: Function): void {
        console.log("------【QQCM】 onShow-------");

        if (typeof BK == "undefined") return;

        BK.onEnterForeground(callback);
    }

    wx.offHide = function (callback: Function): void {
        console.log("------【QQCM】 offHide-------")

        if (typeof BK == "undefined") return;
        BK.offEnterBackground(callback);
    }

    wx.offShow = function (callback: Function): void {
        console.log("------【QQCM】 offShow-------")

        if (typeof BK == "undefined") return;
        BK.offEnterForeground(callback);
    }

    wx.onClose = function (callback: Function): void {
        console.log("------【QQCM】 onClose-------")

        if (typeof BK == "undefined") return;
        BK.onGameClose(callback);
    }

    wx.offClose = function (callback: Function): void {
        console.log("------【QQCM】 offClose-------")

        if (typeof BK == "undefined") return;
        BK.offGameClose(callback);
    }

    //=========================================================================


    //=========================================================================
    //文件
    //=========================================================================
    wx.getFileSystemManager = function (): any {
        console.log("------【QQCM】 getFileSystemManager-------")

        return {
            readFileSync: function (filePath: string, encoding: string = "binary"): any {
                filePath = QQCM_doPath(filePath);

                console.log("------【QQCM】 getFileSystemManager readFileSync -------")
                console.log("\t filePath = " + filePath)
                console.log("\t encoding = " + encoding)

                if (typeof BK == "undefined") return;

                try {
                    let buffer = BK.FileUtil.readFile(filePath);
                    console.log("file data is " + JSON.stringify(buffer));
                    let _response = BK.Misc.BKBufferToArrayBuffer(buffer);
                    let res: any = new Uint8Array(_response);

                    if (encoding == "binary") {
                    } else {
                        let str: string = "";
                        var len = res.byteLength;
                        for (let i = 0; i < len; i++) {
                            str += String.fromCharCode(res[i]);
                        }

                        res = str;
                    }


                    return res;
                } catch (error) {

                }

                return null;
            },

            readFile: function (obj: object): void {
                console.log("------【QQCM】 getFileSystemManager readFile -------")
                console.log(JSON.stringify(obj))

                if (!obj) return;
                if (typeof BK == "undefined") return;

                let successFun: Function = obj ? obj["success"] : null;
                let failFun: Function = obj ? obj["fail"] : null;
                let completeFun: Function = obj ? obj["complete"] : null;

                let filePath: string = obj["filePath"];
                filePath = QQCM_doPath(filePath);

                let encoding: string = obj["encoding"];

                try {
                    let buffer = BK.FileUtil.readFile(filePath);
                    console.log("file data is " + JSON.stringify(buffer));
                    let _response = BK.Misc.BKBufferToArrayBuffer(buffer);
                    let res: any = new Uint8Array(_response);

                    if (encoding == "binary") {
                    } else {
                        let str: string = "";
                        var len = res.byteLength;
                        for (let i = 0; i < len; i++) {
                            str += String.fromCharCode(res[i]);
                        }

                        res = str;
                    }


                    if (successFun) successFun(res);
                    if (completeFun) completeFun();
                } catch (error) {
                    if (failFun) failFun(error);
                    if (completeFun) completeFun();
                }

            }

        }

    }
    //=========================================================================


    //=========================================================================
    //转发
    //=========================================================================

    wx.getShareInfo = function (obj: any) {

    }

    wx.hideShareMenu = function (obj: any) {

    }

    wx.showShareMenu = function (obj: any) {

    }

    wx.updateShareMenu = function (obj: any) {

    }
    /**
     * roomId	number	房间id	如使用BK.Room房间逻辑，可填入对应roomId，如开发者自建房间，填0
     * summary	string	分享wording	
     * picUrl	string	图片的网络链接	
     * isSelectFriend	boolean	选择好友	为true则跳出选择好友的列表
     * extendInfo	string	扩展信息	开发者可自定义该信息，用与传输参数
     * callback	function	分享结果回调	可选 ,具体类型如下例 （手Q7.6.3以以上版本支持）
     */
    wx.shareAppMessage = function (obj: any): void {
        // title	string		否	转发标题，不传则默认使用当前小游戏的昵称。	
        // imageUrl	string		否	转发显示图片的链接，可以是网络图片路径或本地图片文件路径或相对代码包根目录的图片文件路径。显示图片长宽比是 5:4	
        // query	string

        console.log("------【QQCM】 shareAppMessage-------")
        console.log(JSON.stringify(obj));
        if (!obj) return;

        if (typeof BK == "undefined") return;

        let successFun: Function = obj ? obj["success"] : null;
        let failFun: Function = obj ? obj["fail"] : null;
        let completeFun: Function = obj ? obj["complete"] : null;

        let imageURL: string = obj["imageUrl"];

        //分享本地图片
        if (imageURL && BK.FileUtil.isFileExist(imageURL)) {
            let buf = BK.FileUtil.readFile(imageURL);
            console.log("buf is" + JSON.stringify(buf));
            //@see https://hudong.qq.com/docs/engine/api/BK.QQ.html?h=sharetoark
            BK.QQ.shareToArkFromBuff(
                QQCM_gameInfo.roomId,
                obj["title"],
                QQCM_gameInfo.gameParam,
                buf
            );

            if (successFun) successFun();
            if (completeFun) completeFun();

        } else {
            //分享网络图片
            BK.Share.share({
                qqImgUrl: imageURL,
                // isToFriend: true,
                summary: obj["title"],
                // extendInfo: '扩展信息，可选，默认为空',
                success: (succObj) => {
                    if (successFun) successFun(succObj);
                    BK.Console.log('分享成功', succObj.code, JSON.stringify(succObj.data));
                },
                fail: (failObj) => {
                    if (failFun) successFun(failObj);
                    BK.Console.log('分享失败', failObj.code, JSON.stringify(failObj.msg));
                },
                complete: () => {
                    if (completeFun) completeFun();
                    BK.Console.log('分享完成，不论成功失败');
                }
            });
        }

    }


    wx.onShareAppMessage = function (callback: Function) {
        console.log("------【QQCM】 onShareAppMessage-------")

        if (typeof BK == "undefined") return;

        let obj: any;
        try {
            obj = callback();
        } catch (error) {
            return;
        }

        if (!obj) return;

        console.log(JSON.stringify(obj));

        let title: string = obj["title"];
        let imageURL: string = obj["imageUrl"];
        let query: string = obj["query"];

        try {
            // BK.Game.onShare(
            BK.onShare(
                {
                    summary: title,
                    picUrl: imageURL,
                    extendInfo: query
                }
            );
        } catch (error) {

        }
        // BK.Game.onShare(
        //     {
        //         summary: title,
        //         picUrl: imageURL,
        //         extendInfo: query
        //     }
        // );
    }

    wx.offShareAppMessage = function (callback: Function) {

    }
    //=========================================================================


    //=========================================================================
    //广告
    //=========================================================================
    wx.createRewardedVideoAd = function (obj: any): any {
        console.log("------【QQCM】 createRewardedVideoAd-------")
        console.log(obj)

        if (typeof BK == "undefined") return null;

        return new QQCM_RewardedVideoAd(obj);
    }

    wx.createBannerAd = function (obj: any): any {
        console.log("------【QQCM】 createBannerAd-------")
        console.log(obj)

        if (typeof BK == "undefined") return null;

        return new QQCM_BannerAd(obj);
    }
    //=========================================================================

    //=========================================================================
    //虚拟支付
    //=========================================================================
    //@see https://hudong.qq.com/docs/engine/pay/item/purchase.html
    wx.requestMidasPayment = function (obj: any): void {
        console.log("------【QQCM】 requestMidasPayment-------")
        if (!obj) return;

        console.log(JSON.stringify(obj))

        if (typeof BK == "undefined") return;

        let successFun: Function = obj ? obj["success"] : null;
        let failFun: Function = obj ? obj["fail"] : null;
        let completeFun: Function = obj ? obj["complete"] : null;


        let itemID: number = obj["offerId"];
        let count: number = obj["buyQuantity"];

        let itemList: Array<any> = [{
            "itemId": itemID,
            "itemNum": count
        }];

        let oriv: number = 1;
        if (GameValues.orientation == Orientation.ROTATED_LEFT) {
            oriv = 3;
        } else if (GameValues.orientation == Orientation.ROTATED_RIGHT) {
            oriv = 2;
        }

        // gameOrientation  //1（默认，竖屏）2.横屏（home键在左边）3.横屏 （home键在右边）
        // transparent 是否透明
        // itemList 道具列表
        // callback 形如 function(errCode,data)

        BK.QQ.qPayPurchase(oriv, true, itemList, function (errCode, data) {
            console.log("qPayPurchase errCode:" + errCode + " data:" + JSON.stringify(data));

            // errCode == 0代表成功.其他错误码请查阅本节最下
            if (errCode == 0) {
                if (successFun) successFun(data);
                if (completeFun) completeFun();
            } else {
                if (failFun) failFun(errCode);
                if (completeFun) completeFun();
            }
        });
    }
    //=========================================================================


    //=========================================================================
    //界面交互
    //=========================================================================

    wx.hideLoading = function (obj: any): void {
        console.log("------【QQCM】 hideLoading-------");

        if (typeof BK == "undefined") return;

        let successFun: Function = obj ? obj["success"] : null;
        let failFun: Function = obj ? obj["fail"] : null;
        let completeFun: Function = obj ? obj["complete"] : null;

        BK.UI.hideLoading();

        if (successFun) successFun();
        if (completeFun) completeFun();
    }


    wx.hideToast = function (obj: any): void {
        console.log("------【QQCM】 hideToast-------");

        if (typeof BK == "undefined") return;

        let successFun: Function = obj ? obj["success"] : null;
        let failFun: Function = obj ? obj["fail"] : null;
        let completeFun: Function = obj ? obj["complete"] : null;

        BK.UI.hideToast();

        if (successFun) successFun();
        if (completeFun) completeFun();
    }


    wx.showLoading = function (obj: any): void {
        console.log("------【QQCM】 showLoading-------")
        if (!obj) return;

        if (typeof BK == "undefined") return;

        let successFun: Function = obj ? obj["success"] : null;
        let failFun: Function = obj ? obj["fail"] : null;
        let completeFun: Function = obj ? obj["complete"] : null;

        BK.UI.showLoading({
            title: obj["title"]
        });

        if (successFun) successFun();
        if (completeFun) completeFun();
    }

    wx.showModal = function (obj: any): void {
        console.log("------【QQCM】 showModal-------")
        if (!obj) return;

        if (typeof BK == "undefined") return;

        let successFun: Function = obj ? obj["success"] : null;
        let failFun: Function = obj ? obj["fail"] : null;
        let completeFun: Function = obj ? obj["complete"] : null;

        BK.UI.showAlert({
            title: obj["title"],
            content: obj["content"],
            success: function (succObj: any) {
                if (succObj.confirm) {
                    if (successFun) successFun(true);
                } else if (succObj.cancel) {
                    if (successFun) successFun(false);
                }
                if (completeFun) completeFun();
            },
            complete: function () {//􏰀􏰁􏰂􏰃     

            }
        });
    }


    wx.showToast = function (obj: any): void {
        console.log("------【QQCM】 showToast-------")
        if (!obj) return;

        if (typeof BK == "undefined") return;

        let successFun: Function = obj ? obj["success"] : null;
        let failFun: Function = obj ? obj["fail"] : null;
        let completeFun: Function = obj ? obj["complete"] : null;

        BK.UI.showToast({
            title: obj["title"],
            duration: 1500
        });

        if (successFun) successFun();
        if (completeFun) completeFun();
    }
    //=========================================================================

    //=========================================================================
    //菜单
    //=========================================================================
    wx.getMenuButtonBoundingClientRect = function (): any {
        console.log("------【QQCM】 getMenuButtonBoundingClientRect-------")
        return { "top": 0, "left": 0, "width": 0, "height": 0, "bottom": 0, "right": 0 }
    }

    wx.setMenuStyle = function (style: any): any {
        console.log("------【QQCM】 setMenuStyle-------")
    }
    //=========================================================================

    //发送请求
    wx.request = function (obj: any): void {
        console.log("------【QQCM】 request-------")
        console.log(JSON.stringify(obj));
        if (!obj) return;

        if (typeof BK == "undefined") return;

        // obj["method"] = "POST";

        let url: string = obj["url"];
        if (!url) return;

        let successFun: Function = obj ? obj["success"] : null;
        let failFun: Function = obj ? obj["fail"] : null;
        let completeFun: Function = obj ? obj["complete"] : null;

        let method: string = obj["method"] || "get";
        method = method.toLocaleLowerCase();

        //数据类型
        let dataType: string = obj["dataType"] || "json";
        dataType = dataType.toLowerCase();

        function onResponseImage(buffer, code) {
            console.log("【QQCM】HttpUtil result, url = " + url + ", code = " + code);

            let res: any = new Uint8Array(BK.Misc.BKBufferToArrayBuffer(buffer));
            try {
                if (dataType == "json") {
                    let str: string = "";
                    var len = res.byteLength;
                    for (let i = 0; i < len; i++) {
                        str += String.fromCharCode(res[i]);
                    }

                    res = JSON.parse(str);
                    //向微信的返回数据格式看齐
                    res = { "data": res };
                } else {
                }
            } catch (error) {

            }

            console.log(JSON.stringify(res));

            if (code == 200) {
                if (successFun) successFun(res);
                if (completeFun) completeFun();
            } else {
                if (failFun) failFun(code);
                if (completeFun) completeFun();
            }
        }

        let data: object = obj["data"];
        let dataV: string = QQCM_objectToURLParamters(data);
        console.log(dataV);
        if (method != "post") {
            if (url.indexOf("?") >= 0) {
                url += "&" + dataV;
            } else {
                url += "?" + dataV;
            }
        }

        let httpimagreq: any = new BK.HttpUtil(url);
        httpimagreq.setHttpMethod(method);

        if (method == "post") {
            httpimagreq.setHttpPostData(dataV);
        }

        //设置头信息
        let header: object = obj["header"];
        if (header) {
            for (let key in header) {
                if (key === "Referer") {
                    httpimagreq.setHttpReferer && httpimagreq.setHttpReferer(header["Referer"]);
                } else if (key === "Cookie") {
                    httpimagreq.setHttpCookie && httpimagreq.setHttpCookie(header["Cookie"]);
                }
                //设置header
                httpimagreq.setHttpHeader(key, header[key]);
            }
        }

        // console.log(JSON.stringify(httpimagreq))
        httpimagreq.requestAsync(onResponseImage);
    }

}



/**
 * 厘米秀banner广告
 */
class QQCM_BannerAd {
    //刷新间隔时间
    private static REFRESH_DELAY: number = 30000;
    //最小间隔时间
    private static MIN_DELAY: number = 10000;

    //广告id
    private _adUnitId: string;

    //激励视频广告场景 0.游戏页面挂件广告 1.游戏结算页广告 2.游戏任务广告  3.游戏复活广告 
    public videoType: number = 2;

    //广告
    private _theAd: any;

    private _fetchInterval: number = 0;

    constructor(obj: any) {
        if (obj) this._adUnitId = obj["adUnitId"];

        this.fetchAd();

        //每隔20秒刷新一次广告
        setInterval(() => {
            console.log("刷新banner广告");
            //刷新广告
            this.removeAd();
            this.fetchAd();
        }, QQCM_BannerAd.REFRESH_DELAY);
    }


    private _lastFetachTime: Date;

    /**
     * 拉取广告
     */
    private fetchAd(): void {
        if (this._destroied) return;

        if (this._lastFetachTime) {
            let now: number = new Date().getTime();
            if (now - this._lastFetachTime.getTime() < QQCM_BannerAd.MIN_DELAY) {
                console.log("间隔时间太小");
                return;
            }
        }

        this._lastFetachTime = new Date();

        // console.log("请求banner广告2");
        BK.Advertisement.fetchBannerAd(this.fetchAdCallback.bind(this));
    }

    private fetchAdCallback(retCode, msg, handle) {
        // console.log("请求banner广告 callback");
        //返回码0表示成功 
        if (retCode == 0) {
            this._theAd = handle;

            if (this._isShowing) {
                //默认显示广告
                this.show();
            }

            console.log("【条形广告】fetchAdCallback, this._destroied=" + this._destroied);

            //2.2 开发者主动关闭广告。
            //adBannerHandle.close(); 
            //2.3 开发者监听事件
            // this._theAd.onClickContent(() => {
            //     //用户点击了落地页
            //     this.removeAd();
            //     this.fetchAd();
            // });

            this._theAd.onClickClose(() => {
                this.removeAd();
            });


            this.doLoaded();
        } else {
            // console.log("拉取banner广告失败:" + retCode + " msg:" + msg)
            this.doError(retCode, msg);
        }
    }


    private _isShowing: boolean = true;


    /**
     * 显示广告
     */
    public show(): void {
        console.log("【条形广告】show")
        this._isShowing = true;

        //3.跳转至播放界面 
        if (this._theAd) {
            this._theAd.show((succCode, msg, handle) => {
                console.log("【条形广告】this._theAd.show's callback, this._destroied=" + this._destroied);
                console.log(handle);

                //检查是否已销毁
                if (this._destroied) {
                    try {
                        handle.close();
                    } catch (error) {

                    }
                    // setTimeout(this.removeAd, 1000);
                    return;
                }


                if (succCode == 0) {
                    this.doResize();
                } else {
                    console.log("展示失败 msg:" + msg);
                }
            });
        } else {
            this.fetchAd();
        }
    }


    private removeAd(): void {
        console.log("【条形广告】removeAd")
        try {
            if (this._theAd) {
                this._theAd.close();
            }
        } catch (error) {

        }

        this._theAd = null;
    }


    public hide(): void {
        if (this._destroied) return;
        this._isShowing = false;

        // console.log("隐藏banner广告");

        this.removeAd();
    }


    private _destroied: boolean = false;

    /**
     * 释放
     */
    public destroy(): void {
        if (this._destroied) return;
        this._destroied = true;

        this.removeAd();

        this._onResizeCallbacks = [];
        this._onErrorCallbacks = [];
        this._onLoadCallbacks = [];

        clearInterval(this._fetchInterval);
    }

    private _onResizeCallbacks: Array<Function> = [];


    private _adSize: object;
    /**
     * 
     */
    private doResize(): void {
        // banner广告统一长宽比例 582 ： 166 横竖屏下统一位于屏幕底部居中位置。
        // 竖屏下长为 屏幕宽度的 78% 横屏下长为 屏幕宽度的 44%
        if (!this._adSize) {
            this._adSize = {};

            let screenSize: cc.Size = cc.view.getFrameSize();
            if (GameValues.orientation == Orientation.DEFAULT) {
                //竖版
                this._adSize["width"] = screenSize.width * 0.78;
                this._adSize["height"] = screenSize.width * 0.78 * 166 / 582;
            } else {
                //横版
                this._adSize["width"] = 0;
                this._adSize["height"] = 0;
            }
        }

        this._onResizeCallbacks.forEach((fun: Function) => {
            fun(this._adSize);
        });
    }


    public onResize(callback: Function): void {
        if (this._destroied) return;

        if (!callback) return;

        if (this._onResizeCallbacks.indexOf(callback) == -1) {
            this._onResizeCallbacks.push(callback);
        }
    }

    public offResize(callback: Function): void {
        if (this._destroied) return;

        let index: number = this._onResizeCallbacks.indexOf(callback);
        if (index >= 0) this._onResizeCallbacks.splice(index, 1);
    }



    private _onLoadCallbacks: Array<Function> = [];


    /**
     * 
     */
    private doLoaded(): void {
        let res: object = {
        }

        this._onLoadCallbacks.forEach((fun: Function) => {
            fun(res);
        });
    }


    public onLoad(callback: Function): void {
        if (!callback) return;

        if (this._onLoadCallbacks.indexOf(callback) == -1) {
            this._onLoadCallbacks.push(callback);
        }
    }

    public offLoad(callback: Function): void {
        let index: number = this._onLoadCallbacks.indexOf(callback);
        if (index >= 0) this._onLoadCallbacks.splice(index, 1);
    }


    private _onErrorCallbacks: Array<Function> = [];


    /**
     * 
     */
    private doError(errCode: number, errMsg: string): void {
        let res: object = {
            errMsg: errMsg,
            errCode: errCode
        }

        this._onErrorCallbacks.forEach((fun: Function) => {
            fun(res);
        });
    }


    public onError(callback: Function): void {
        if (!callback) return;

        if (this._onErrorCallbacks.indexOf(callback) == -1) {
            this._onErrorCallbacks.push(callback);
        }
    }

    public offError(callback: Function): void {
        let index: number = this._onErrorCallbacks.indexOf(callback);
        if (index >= 0) this._onErrorCallbacks.splice(index, 1);
    }

}

/**
 * 厘米秀视频广告
 */
class QQCM_RewardedVideoAd {

    //广告id
    private _adUnitId: string;

    //激励视频广告场景 0.游戏页面挂件广告 1.游戏结算页广告 2.游戏任务广告  3.游戏复活广告 
    public videoType: number = 2;


    //广告
    private _theAd: any;


    private _isReady: boolean = false;

    constructor(obj: any) {
        if (obj) this._adUnitId = obj["adUnitId"];

        this._theAd = BK.Advertisement.createVideoAd();
        this._isReady = false;

        console.log("【QQCM VideoAd】请求视频广告", this._theAd);

        this._theAd.onLoad(this.doLoaded.bind(this));

        this._theAd.onPlayStart(() => {
            //开始播放
            this._completed = false;
            console.log("【QQCM VideoAd】视频广告开始播放");
        });

        this._theAd.onError((err) => {
            console.log("【QQCM VideoAd】视频广告获取失败");
            this.doError(err.code, err.msg)
        });

        this._theAd.onPlayFinish(() => {
            console.log("【QQCM VideoAd】视频广告播放完成");
            this._completed = true;
        });
        this._theAd.onClose(() => {
            console.log("【QQCM VideoAd】视频广告关闭");
            this.doClose();
        });
    }

    public load(): void {

    }

    /**
     * 显示广告
     */
    public show(): void {
        if (this._theAd && this._isReady) {
            this._theAd.show();
        }
    }

    private _onLoadCallbacks: Array<Function> = [];


    /**
     * 
     */
    private doLoaded(): void {
        console.log("【QQCM VideoAd】视频广告获取成功");
        this._isReady = true;

        let res: object = {
        }

        this._onLoadCallbacks.forEach((fun: Function) => {
            fun(res);
        });
    }


    public onLoad(callback: Function): void {
        if (!callback) return;

        if (this._onLoadCallbacks.indexOf(callback) == -1) {
            this._onLoadCallbacks.push(callback);
        }
    }

    public offLoad(callback: Function): void {
        let index: number = this._onLoadCallbacks.indexOf(callback);
        if (index >= 0) this._onLoadCallbacks.splice(index, 1);
    }


    private _onErrorCallbacks: Array<Function> = [];


    /**
     * 
     */
    private doError(errCode: number = 0, errMsg: string = null): void {
        let res: object = {
            errMsg: errMsg,
            errCode: errCode
        }

        this._onErrorCallbacks.forEach((fun: Function) => {
            fun(res);
        });
    }


    public onError(callback: Function): void {
        if (!callback) return;

        if (this._onErrorCallbacks.indexOf(callback) == -1) {
            this._onErrorCallbacks.push(callback);
        }
    }

    public offError(callback: Function): void {
        let index: number = this._onErrorCallbacks.indexOf(callback);
        if (index >= 0) this._onErrorCallbacks.splice(index, 1);
    }


    private _onCloseCallbacks: Array<Function> = [];

    //是否已播放完毕
    private _completed: boolean = false;
    /**
     * 
     */
    private doClose(): void {
        let res: object = {
            isEnded: this._completed
        }

        this._onCloseCallbacks.forEach((fun: Function) => {
            fun(res);
        });
    }

    public onClose(callback: Function): void {
        if (!callback) return;

        if (this._onCloseCallbacks.indexOf(callback) == -1) {
            this._onCloseCallbacks.push(callback);
        }
    }

    public offClose(callback: Function): void {
        let index: number = this._onCloseCallbacks.indexOf(callback);
        if (index >= 0) this._onCloseCallbacks.splice(index, 1);
    }

}



/**
 * 厘米秀banner广告
 */
// class QQCM_BannerAd {
//     //刷新间隔时间
//     // private static REFRESH_DELAY: number = 30000;
//     //最小间隔时间
//     private static MIN_DELAY: number = 10000;

//     //广告id
//     private _adUnitId: string;

//     //广告
//     private _theAd: any;


//     constructor(obj: any) {
//         if (obj) this._adUnitId = obj["adUnitId"];

//         this.fetchAd();
//     }


//     private _lastFetachTime: Date;

//     /**
//      * 拉取广告
//      */
//     private fetchAd(): void {
//         if (this._destroied) return;

//         console.log("【QQCM BannerAd】请求广告");

//         // if (this._lastFetachTime) {
//         //     let now: number = new Date().getTime();
//         //     if (now - this._lastFetachTime.getTime() < QQCM_BannerAd.MIN_DELAY) {
//         //         console.log("间隔时间太小");
//         //         return;
//         //     }
//         // }
//         // this._lastFetachTime = new Date();

//         //@see https://hudong.qq.com/docs/engine/api-new/mqq/advertisement/advertisement-banner.html
//         // console.log("请求banner广告2");
//         this._theAd = BK.Advertisement.createBannerAd({
//             // "videwId":1002
//             "videwId": 1001
//         });

//         this._theAd.onLoad(() => {
//             console.log("【QQCM BannerAd】加载完成")
//             this.doLoaded();

//             // if (this._isShowing) {
//             //     //默认显示广告
//             //     this.show();
//             // }
//         });
//         this._theAd.onError((err) => {
//             console.log("【QQCM BannerAd】加载错误")
//             this.doError(err.code, err.msg);
//         });

//         // this._theAd.show();
//     }


//     private _isShowing: boolean = true;


//     /**
//      * 显示广告
//      */
//     public show(): void {
//         console.log("【QQCM BannerAd】展现广告")

//         if (this._destroied) return;
//         this._isShowing = true;

//         //3.跳转至播放界面 
//         if (this._theAd) {
//             this._theAd.show();
//             this.doResize();
//         }
//     }


//     public hide(): void {
//         if (this._destroied) return;

//         console.log("【QQCM BannerAd】隐藏广告")

//         this._isShowing = false;
//         if (this._theAd) this._theAd.hide();
//     }


//     private _destroied: boolean = false;

//     /**
//      * 释放
//      */
//     public destroy(): void {
//         console.log("【QQCM BannerAd】销毁广告")

//         if (this._destroied) return;
//         this._destroied = true;

//         if (this._theAd) {
//             this._theAd.destory();
//             this._theAd = null;
//         }

//         this._onResizeCallbacks = [];
//         this._onErrorCallbacks = [];
//         this._onLoadCallbacks = [];
//     }

//     private _onResizeCallbacks: Array<Function> = [];


//     private _adSize: object;
//     /**
//      * 
//      */
//     private doResize(): void {
//         // banner广告统一长宽比例 582 ： 166 横竖屏下统一位于屏幕底部居中位置。
//         // 竖屏下长为 屏幕宽度的 78% 横屏下长为 屏幕宽度的 44%
//         if (!this._adSize) {
//             this._adSize = {};

//             let screenSize: cc.Size = cc.view.getFrameSize();
//             if (GameValues.orientation == Orientation.DEFAULT) {
//                 //竖版
//                 this._adSize["width"] = screenSize.width * 0.78;
//                 this._adSize["height"] = screenSize.width * 0.78 * 166 / 582;
//             } else {
//                 //横版
//                 this._adSize["width"] = 0;
//                 this._adSize["height"] = 0;
//             }
//         }

//         this._onResizeCallbacks.forEach((fun: Function) => {
//             fun(this._adSize);
//         });
//     }


//     public onResize(callback: Function): void {
//         if (this._destroied) return;

//         if (!callback) return;

//         if (this._onResizeCallbacks.indexOf(callback) == -1) {
//             this._onResizeCallbacks.push(callback);
//         }
//     }

//     public offResize(callback: Function): void {
//         if (this._destroied) return;

//         let index: number = this._onResizeCallbacks.indexOf(callback);
//         if (index >= 0) this._onResizeCallbacks.splice(index, 1);
//     }



//     private _onLoadCallbacks: Array<Function> = [];


//     /**
//      * 
//      */
//     private doLoaded(): void {
//         let res: object = {
//         }

//         this._onLoadCallbacks.forEach((fun: Function) => {
//             fun(res);
//         });
//     }


//     public onLoad(callback: Function): void {
//         if (!callback) return;

//         if (this._onLoadCallbacks.indexOf(callback) == -1) {
//             this._onLoadCallbacks.push(callback);
//         }
//     }

//     public offLoad(callback: Function): void {
//         let index: number = this._onLoadCallbacks.indexOf(callback);
//         if (index >= 0) this._onLoadCallbacks.splice(index, 1);
//     }


//     private _onErrorCallbacks: Array<Function> = [];


//     /**
//      * 
//      */
//     private doError(errCode: number = 0, errMsg: string = null): void {
//         let res: object = {
//             errMsg: errMsg,
//             errCode: errCode
//         }

//         this._onErrorCallbacks.forEach((fun: Function) => {
//             fun(res);
//         });
//     }


//     public onError(callback: Function): void {
//         if (!callback) return;

//         if (this._onErrorCallbacks.indexOf(callback) == -1) {
//             this._onErrorCallbacks.push(callback);
//         }
//     }

//     public offError(callback: Function): void {
//         let index: number = this._onErrorCallbacks.indexOf(callback);
//         if (index >= 0) this._onErrorCallbacks.splice(index, 1);
//     }

// }
