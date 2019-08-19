import DeerSDK from "../../gamecore/deer/DeerSDK";

import WXOpenData from "../../gamecore/wechat/WXOpenData";
import MainDataMgr, { RoleSKinInfo } from "../../module/data/MainDataMgr";
import GameUtils from "../../GameUtils";
import { GameMeta, IImageUpgradeMeta, IKeyRewardMeta } from "../../module/meta/pbcus";
import StageDataMgr from "../../module/data/StageDataMgr";
import RoleMgr from "../mainscene/RoleMgr";

/**关卡数据 */
export class LevelConfig {
    /** ArmsUnlockMeta id. */
    public normal: number;
    public light: number;
    public fullStar: number;

}
/**模式结构体 */
export const enum STAGE_STATE_STRUCT{
    UNLOCK = 0,
    SKIP = 1,
    HEIGHTEST = 2,
    LOCK = 3
}

/**过关数据 */
export class PassStageInfo{
    skip : STAGE_STATE_STRUCT = STAGE_STATE_STRUCT.LOCK;
    star : number;
    index: number;
}
/**模式结构体 */
export const enum MODE_TYPE_STRUCT{
    MODE1 = 0,
    MODE2 = 1,
    MODE3 = 2,
    MODE4 = 3,
}


const {ccclass, property} = cc._decorator;

@ccclass
export default class GameConfig {
    
    private static _instance: GameConfig = null;
    public static get instance(): GameConfig {
      if (!GameConfig._instance) GameConfig._instance = new GameConfig();
  
      return GameConfig._instance;
    }
  
    static gameCdn: string = "https://xz-cdn.youkongwan.com/game/mrbullet/meta/";

    public gameMeta: GameMeta = null;
  
    public lastscene: string = "";
    public nowscene: string = "";
  
    public scene: string = "";

    //子弹反弹次数
    public static bulletReboundNum:number = 22;


    /**福利中心金币数量 */
    // static welfGoldCount:number = 1000;

    public static TextConfig = {

        "welfWare" : {
            dayRecieved:"今日已领取",
        },
        "skipPanelVideoKey": 3,
        "goldGiftRewardNum": 1000,
        "winGameGoldNum": 20,
        "moreRewardGoldNum": 180,
    }


     /**
   * 提及分数到服务器，主要是世界排行榜
   */
  public saveScoreToService(scroe: number): void {
    var value: number = scroe;
    //保存游戏分数
    DeerSDK.instance.game_saveScoreToService(
      value,
      res => {
        //分数保存成功
        // console.log("save successHandler:", res, value + 1);
      },
      err => {
        //分数保存失败
        // console.log("save failHandler:", err, value + 1);
      }
    );
    //提交数据到好友排行榜子域
    WXOpenData.saveUserScoreToCloud(value);
  }

   /**
   * 获取签到状态
   */
  public isSigin() {
    let isSignin: boolean = false;
    let signinrecord: Array<number> = MainDataMgr.instance.getData(
      MainDataMgr.KEY_USER_SIGIN_RECORD
    );
    if (signinrecord.length > 0) {
      let enddate: Date = new Date(signinrecord[signinrecord.length - 1]);
      let nowdate: Date = GameUtils.instance.serverTime;
      if (
        nowdate.getDate() != enddate.getDate() ||
        nowdate.getMonth() != enddate.getMonth()
      ) {
        if (signinrecord.length >= 7) {
          MainDataMgr.instance.setData(
            MainDataMgr.KEY_USER_SIGIN_RECORD,
            [],
            false
          );
        }
      }
      if (nowdate.getDate() == enddate.getDate()) {
        isSignin = true;
      }
    }
    // this.dispatchEventWith(SiginEventName.IS_SIGIN_STATE, isSignin);
    return isSignin;
  }

  /**
   * 签到状态
   * @param id 日期 type 1:从未签到 2：已经签到 3:当前签到 4:当天已签到 5 未签到
   */
  public isSiginId: number = 0;
  public getItemState(id: number) {
    let type: number = 0;
    let signinrecord: Array<number> = MainDataMgr.instance.getData(
      MainDataMgr.KEY_USER_SIGIN_RECORD
    );
    let length = signinrecord.length;
    let times: number = signinrecord[id];
    let maxtime: number = signinrecord[signinrecord.length - 1];
    let maxdate: Date = new Date(maxtime);
    let timesdate: Date = new Date(times);
    let nowdate: Date = GameUtils.instance.serverTime;
    if (length == 0) {
      //没有签到过
      type = 1;
      this.isSiginId = 0;
    } else {
      if (id < length) {
        //已经签到
        if (nowdate.getDate() == timesdate.getDate()) {
          this.isSiginId = id;
        }
        type = 2;
      }
      //注册即将签到ui和事件
      if (id == length) {
        if (nowdate.getDate() == maxdate.getDate()) {
          type = 4;
        } else {
          type = 3;
          this.isSiginId = id;
        }
      }
      //未签到天数
      if (id > length) {
        //未签到
        type = 5;
      }
    }
    // console.log("签到状态标识符", type);
    return type;
  }

  /**
   * 获取签到奖励
   */

  private getAwardP1:number = null;
  private getAwardResult:any = null;

  public getAward(id:number):number {
    if(id === this.getAwardP1){
      return this.getAwardResult;
    }
    this.getAwardP1 = id;

    // this.getAwardResult = 100 * id;
    this.getAwardResult = this.gameMeta.signInMeta[id].coinNum;
    // console.log("测试签到奖励数值100")
    return this.getAwardResult;
  }
  
    /**
   * 获取当前装备的英雄
  */
 public getCurRoleSKinInfo():IImageUpgradeMeta{
    let data:Array<RoleSKinInfo> = MainDataMgr.instance.getData(MainDataMgr.KEY_ROLE_SKIN_ARR);
    // let roleSkinInfo:RoleSKinInfo = null;
    for(let i = 0;i < data.length;i ++){
      if(!data[i]){
        data = RoleMgr.calcuRoleData();
      }
    }
    for(let i = 0;i < data.length;i ++){
      if(data[i].equip == true){
        return GameConfig.instance.gameMeta.imageUpgradeMeta[i];
      }
    }

    data[data.length - 1].equip = true;
    return GameConfig.instance.gameMeta.imageUpgradeMeta[data.length - 1];
  }

  /**获取金币兑换钻石比例 */
  public getKeyNumByGoldNum(): IKeyRewardMeta{
      return {
        price : GameConfig.instance.gameMeta.keyRewardMeta[0].price,
        num: GameConfig.instance.gameMeta.keyRewardMeta[0].num,
      }
  }

    /**获取金币兑换体力比例 */
    public getHpNumByGoldNum(): IKeyRewardMeta{
      return {
        price : GameConfig.instance.gameMeta.keyRewardMeta[0].price,
        num: GameConfig.instance.gameMeta.keyRewardMeta[0].num,
      }
  }

  /**当前模式状态信息 */
  public getCurModeInfo(mode:MODE_TYPE_STRUCT):ModeInfo{
    let modeInfo = new ModeInfo();
    let allModeStars = StageDataMgr.instance.getAllModeStars();
    modeInfo.lockState = allModeStars >= GameConfig.instance.gameMeta.newModeUnlockMeta[mode].starsNum;
    if(modeInfo.lockState == false){
        modeInfo.needStars = allModeStars  + "/" + GameConfig.instance.gameMeta.newModeUnlockMeta[mode].starsNum;
        return modeInfo;
    }
    modeInfo.isNewMode = StageDataMgr.instance.isNewMode(mode);

    modeInfo.modeStars = StageDataMgr.instance.getStarsByMode(mode);

    return modeInfo;
  }

  /**获取当前模式所有关卡信息 */
  public getModeStageNumByMode(mode:MODE_TYPE_STRUCT):number{

    if(mode == MODE_TYPE_STRUCT.MODE1){
      return GameConfig.instance.gameMeta.classicalModeLevelMeta.length;
    }else if(mode == MODE_TYPE_STRUCT.MODE2){
      return GameConfig.instance.gameMeta.grenadeModeLevelMeta.length;
    }else if(mode == MODE_TYPE_STRUCT.MODE3){
      return GameConfig.instance.gameMeta.hostageModeLevelMeta.length;
    }else if(mode == MODE_TYPE_STRUCT.MODE4){
      return GameConfig.instance.gameMeta.survivalModeLevelMeta.length;
    }
    return 0;
  }




}


export class ModeInfo{
    /**是否已解锁 */
    lockState:boolean;
    /**是否是新mode */
    isNewMode:boolean;
    /**已获得星星 */
    modeStars:number = 0;
    /**解锁所需要的星星数 */
    needStars:string = null;
}