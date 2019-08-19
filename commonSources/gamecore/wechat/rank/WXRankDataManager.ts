import WXRankVO from "./WXRankVO";
import WXRankEventNames from "./WXRankEventNames";



/**
 * 微信排行榜数据管理器
 * 
 */
export default class WXRankDataManager extends cc.Node {

    private static _instance: WXRankDataManager;

    /**
     * 获取管理器单例
     */
    public static get instance(): WXRankDataManager {
        if (!WXRankDataManager._instance) new WXRankDataManager();
        return WXRankDataManager._instance;
    }


    //好友排行榜数据
    private _friendRankData: Array<WXRankVO> = [];



    constructor() {
        super();

        console.log("【WXRankDataManager】初始化");

        if (WXRankDataManager._instance) {
            throw new Error("Please use WXRankDataManager.instance");
        }

        WXRankDataManager._instance = this;


        this.getUserInfo();

        try {
            wx.onMessage((data: object) => {
                console.log("【WXRankDataManager】constructor, wx.onMessage")
                console.log(data);

                if (!data) return;

                let action: string = data["action"];
                switch (action) {
                    case "__rdm__myScore":
                        //设置我的分数
                        this.myScore = data["value"];
                        break;
                }
            });
        } catch (error) {

        }
    }


    /**
     * 获取排行榜数据
     */
    public get friendRankData(): Array<WXRankVO> {
        return this._friendRankData.concat();
    }


    private _friendRankNext: WXRankVO;

    /**
     * 获取我的下一个超越的目标
     */
    public get friendRankNext(): WXRankVO {
        return this._friendRankNext;
    }


    private _friendRankPrevious: WXRankVO;

    /**
     * 获取我的上一个超越的目标
     */
    public get friendRankPrevious(): WXRankVO {
        return this._friendRankPrevious;
    }


    private _friendRankMine: WXRankVO;

    /**
     * 获取我排行榜数据
     */
    public get friendRankMine(): WXRankVO {
        // console.log("【获取我的数据】")
        // if (this._friendRankMine) console.log("@@@@", this._friendRankMine.nickname, this._friendRankMine.score);
        return this._friendRankMine;
    }


    private _myIndex: number = -1;


    /**
     * 获取我的名次
     */
    public get myIndex(): number {
        return this._myIndex;
    }



    private _myScore: number = 0;

    /**
     * 设置我的分数
     */
    public set myScore(v: number) {
        if (this._myScore == v) return;

        this._myScore = v;

        //抛出事件
        WXRankDataManager._instance.dispatchEvent(new cc.Event(WXRankEventNames.MY_SCORE_CHANGE, false));

        //刷新所有数据
        this.refreshAllData();

    }

    public get myScore(): number {
        return this._myScore;
    }


    /**
     * avatarUrl	string	用户头像图片 url	
     * city	string	用户所在城市	
     * country	string	用户所在国家	
     * gender	number	用户性别	
     * language	string	显示 country province city 所用的语言	
     * nickName	string	用户昵称	
     * openId	string	用户 openId	
     * province	string	用户所在省份
     */
    private _userInfo: object;

    /**
     * 获取个人信息
     */
    private getUserInfo(): void {
        try {
            wx.getUserInfo({
                "openIdList": ['selfOpenId'],
                "success": (res: object) => {
                    console.log("user info");
                    console.log(res);

                    try {
                        let data: Array<object> = res["data"];
                        this._userInfo = data[0];
                    } catch (error) {
                        this._userInfo = res["userInfo"];
                    }

                },
                "fail": () => {

                },
                "complete": () => {
                    //刷新排行榜数据
                    this.refreshRankingData();
                }
            })
        } catch (error) {

        }
    }



    /**
     * 重新计算所有数据
     */
    private refreshAllData(): void {
        if (!this._userInfo) {
            this.getUserInfo();
            return;
        }


        let openID: string = this._userInfo["openId"];
        let avatarURL: string = this._userInfo["avatarUrl"];
        avatarURL = avatarURL.replace(/\/\d+$/, "");
        console.log("my avatar url = ", avatarURL);
        console.log("my open id = ", openID);

        let theLen: number = this._friendRankData.length;
        for (let i: number = 0; i < theLen; i++) {
            let vo: WXRankVO = this._friendRankData[i];
            let currentAvatarURL: string = vo["avatar"]
            currentAvatarURL = currentAvatarURL.replace(/\/\d+$/, "");

            console.log("vo.isSelf=" + vo.isSelf, vo.nickname, vo.score, vo.avatar);
            if (vo.isSelf === true || (openID && vo.openID == openID) || (avatarURL && currentAvatarURL == avatarURL)) {
                this._friendRankMine = vo;

                if (this._myScore > vo.score) {
                    vo.score = this._myScore;
                    this.sortFriendRankData();
                }
            }
        }

        if (!this._friendRankData) return;

        let copy: Array<WXRankVO> = this._friendRankData.concat();
        let mineIndex: number = copy.indexOf(this._friendRankMine);
        if (this._myIndex >= 0) copy.splice(mineIndex, 1);

        this._friendRankPrevious = null;
        this._friendRankNext = null;

        for (let i: number = copy.length - 1; i >= 0; i--) {
            if (this._myScore < copy[i].score) {
                this._friendRankNext = copy[i];
                if (i < copy.length - 1) this._friendRankPrevious = copy[i + 1];
                break;
            }
        }

        console.log("my rank is " + this._myIndex, ", total is " + theLen);

        // if (this._myIndex >= 1) {
        //     this._friendRankNext = this._friendRankData[this._myIndex - 1];
        // } else {
        //     this._friendRankNext = null;
        // }

        // if (this._myIndex < theLen - 1) {
        //     this._friendRankPrevious = this._friendRankData[this._myIndex + 1];
        // } else {
        //     this._friendRankPrevious = null;
        // }

        WXRankDataManager._instance.dispatchEvent(new cc.Event(WXRankEventNames.FRIEND_RANK_CHANGE, false));
    }


    /**
     * 排序数据
     */
    private sortFriendRankData(): void {
        //排序
        this._friendRankData.sort(function (a: WXRankVO, b: WXRankVO): number {
            return b.score - a.score;
        });

        let len: number = this._friendRankData.length;
        for (let i: number = 0; i < len; i++) {
            this._friendRankData[i].rank = i + 1;
        }
    }

    /**
     * 刷新排行榜数据
     * 
     */
    public refreshRankingData(): void {
        console.log("获取排行榜数据。。。。。");

        if (typeof wx == "undefined") return;

        // try {
        wx.getFriendCloudStorage({
            "keyList": ["score", "userPropVIP"],
            "success": (res) => {
                console.log("=================@@@@@@@@@@@@@@@@@@@@@@@@=================")
                console.log(res);
                console.log(this._userInfo);

                let ranks: Array<WXRankVO> = [];
                let data: Array<object> = res.data;
                for (let i = 0; i < data.length; i++) {
                    let obj: object = data[i];

                    // console.log(JSON.stringify(obj));

                    let vo: WXRankVO = new WXRankVO();
                    vo.nickname = obj["nickname"];
                    vo.avatar = obj["avatarUrl"];
                    vo.openID = obj["openid"];
                    vo.isSelf = (obj["isSelf"] === true);

                    let dataList: Array<any> = obj["KVDataList"];
                    let dataLen: number = dataList.length;
                    for (let j: number = 0; j < dataLen; j++) {
                        let kvData: any = dataList[j];
                        let key: string = kvData["key"];
                        let value: string = kvData["value"];

                        console.log("【KVData】", j, "key=" + key, "value=" + value);

                        if (key == "userPropVIP") {
                            vo.isVIP = (value == "1");
                        } else if (key == "score") {
                            try {
                                let valueObj: any = JSON.parse(value);
                                vo.score = parseInt(valueObj["wxgame"]["score"]);
                            } catch (error) {

                            }
                        }
                    }

                    ranks.push(vo);
                }

                this._friendRankData = ranks;
                //排序
                this.sortFriendRankData();
                //刷新数据
                this.refreshAllData();
            }
        });
        // } catch (error) {
        //     console.log("error for wechat api")
        //     console.log(error);
        // }
    }
}



/**
 * 创建图片
 * 
 */
export class AWXImage extends cc.SpriteFrame {

    constructor(url: string, onLoadCallback: Function = null) {
        super();

        if (typeof wx == "undefined") return null;

        let tex: cc.Texture2D = new cc.Texture2D();

        let icon = wx.createImage();
        icon.src = url;
        icon.onload = () => {
            tex.initWithElement(icon);
            tex.handleLoadedTexture();

            if (onLoadCallback) onLoadCallback();
        }

        this.setTexture(tex);
    }


}
