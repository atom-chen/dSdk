// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
import GameManager from "../gamecore/managers/GameManager";
import DeerSDK from "../gamecore/deer/DeerSDK";
const {ccclass, property} = cc._decorator;

@ccclass
export default class OnlineTimerMgr {

    // static KEY_ONLINE_TIME:number = 0;
    static KEY_LAST_RECEIVE_TIME:string = "lastReceiveTime";



    //在线大奖励发放时间
    static KEY_REWARD_HP_TIME:number = 720000;

    //在线小奖励发放时间
    static KEY_CD_REWARD_HP_TIME:number = 40000;
    //在线小奖励体力值
    static KEY_REWARD_HP_NUM_BY_CD:number = 2;

    /**在线奖励最大值 */
    static KEY_REWARD_MAX_HP_NUM:number = 9999;

    static KEY_NOW_REWARD_HP_NUM:string = "nowRewardHpNum";
    public nowRewardHpNum:number = 0;

    //小时间
    private onlineTime_cd:number = 0;
    //总时间
    private onlineTime_total:number = 0;

    public startTime_cd:number = 0;
    public startTime_total:number = 0;



    private static _instance:OnlineTimerMgr = null;

    public static get instance():OnlineTimerMgr {
        if (!OnlineTimerMgr._instance) OnlineTimerMgr._instance = new OnlineTimerMgr();
        return OnlineTimerMgr._instance;
    }

    private _lastChangedKey:string;

    /**
     *  被修改的 KEY
     */
    public get lastChangedKey():string {
        return this._lastChangedKey;
    }

    
    // KEY 抛出改变事件
    public setData(key:string, value:any){
        this[key] = value;
        // this._lastChangedKey = key;

        GameManager.dataManager.setData(key, value, true,false,true);
        // cc.sys.localStorage.setItem(key, value);
    }
    // 获取状态
    public getData(key:string){

        let storage = GameManager.dataManager.getData(key);
        // let storage = cc.sys.localStorage.getItem(key);
        if(storage == undefined || storage == null || storage === ""){
            return this[key];
        }
        storage = storage ? storage : this[key];
        // console.log(storage,"storage")
        storage = JSON.parse(storage);
        return storage;
    }

    private canRecive = false;
    private timeOutFunc = null;
    /**初始化游戏计时器 */
    public initGlobalTimer():void{
        this.nowRewardHpNum = Number(OnlineTimerMgr.instance.getData(OnlineTimerMgr.KEY_NOW_REWARD_HP_NUM));
        let serverTime = DeerSDK.instance.serverTime.getTime();
        this.onlineTime_cd = serverTime;
        this.onlineTime_total = serverTime;

        let func = () => {
            if(this.nowRewardHpNum >= OnlineTimerMgr.KEY_REWARD_MAX_HP_NUM){
                // console.log("体力值不能再多了");
                OnlineTimerMgr.instance.canRecive = false;
                let serverTime = DeerSDK.instance.serverTime.getTime();

                this.onlineTime_cd = serverTime;
                this.onlineTime_total = serverTime;
            }
            else{
                OnlineTimerMgr.instance.canRecive = true;
                let serverTime = DeerSDK.instance.serverTime.getTime();
                this.startTime_cd = serverTime - this.onlineTime_cd;
                this.startTime_total = serverTime - this.onlineTime_total;

                if(this.startTime_cd >= OnlineTimerMgr.KEY_CD_REWARD_HP_TIME){
                    // console.log("cd到")
                    this.onlineTime_cd = serverTime;
                    this.nowRewardHpNum += OnlineTimerMgr.KEY_REWARD_HP_NUM_BY_CD;
                    if(this.nowRewardHpNum > OnlineTimerMgr.KEY_REWARD_MAX_HP_NUM){
                        this.nowRewardHpNum = OnlineTimerMgr.KEY_REWARD_MAX_HP_NUM;
                    }
                    OnlineTimerMgr.instance.setData(OnlineTimerMgr.KEY_NOW_REWARD_HP_NUM,this.nowRewardHpNum);
                }
                if(this.startTime_total >= OnlineTimerMgr.KEY_REWARD_HP_TIME){
                    // console.log("大cd到")
                    this.onlineTime_total = serverTime;
                    // this.nowRewardHpNum = OnlineTimerMgr.KEY_REWARD_MAX_HP_NUM;
                    // OnlineTimerMgr.instance.setData(OnlineTimerMgr.KEY_NOW_REWARD_HP_NUM,this.nowRewardHpNum);
                }
                // console.log(this.startTime_cd / 1000,this.startTime_total / 1000,"时间",this.nowRewardHpNum)
            }
            this.timeOutFunc = setTimeout(func,1000);
        }
        if(this.timeOutFunc){
            clearTimeout(this.timeOutFunc);
        }
        func();
    }

    public canRececiveHp():boolean{
        return OnlineTimerMgr.instance.canRecive;
    }

    public refreshTime():void{
        this.onlineTime_total = DeerSDK.instance.serverTime.getTime();
    }

    static timeFormat(timestamp):string {
        var time = new Date(timestamp);
        // var year = time.getFullYear();
        // var month = (time.getMonth() + 1) > 9 && (time.getMonth() + 1) || ('0' + (time.getMonth() + 1))
        // var date = time.getDate() > 9 && time.getDate() || ('0' + time.getDate())
        // var hour = time.getHours() > 9 && time.getHours() || ('0' + time.getHours())
        var minute = time.getMinutes() > 9 && time.getMinutes() || ('0' + time.getMinutes())
        var second = time.getSeconds() > 9 && time.getSeconds() || ('0' + time.getSeconds())
        // var YmdHis = year + '/' + month + '/' + date + ' ' + hour + ':' + minute + ':' + second;
        var YmdHis = minute + ':' + second;
        return YmdHis;
    }


}
