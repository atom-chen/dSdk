import GameManager from "../gamecore/managers/GameManager";
import UIManager from "./UIManager";
import GameData from "./GameData";

const { ccclass, property } = cc._decorator;



@ccclass
export default class TankDataMgr {
  //====================需要保存在本地的数据============================================

  // /**玩家金币数量 */
  static KEY_USER_GOLD_NUM: string = "userGoldNum";

  /**玩家钻石数量 */
  static KEY_USER_DIMOND_NUM:string = "userDimondNum";

  /**玩家当前关卡 */
  static KEY_CUR_STAGE_NUM:string = "curStageNum";

  /**玩家已通过的关卡信息 */
  static KEY_PASS_STAGE_ARR:string = "passStageArr";
  
  /**玩家最高关卡 */
  static KEY_BEST_STAGE_NUM:string = "bestStageNum";

  /**玩家星星数 */
  static KEY_USER_STAR_NUM:string = "userStarNum";

  /**玩家体力值 */
  static KEY_USER_HP_NUM:string = "userHpNum";

  /**玩家体力值记录时间 */
  static KEY_USER_HP_ADD_TIME:string = "userHpAddTime";


  static KEY_TRY_STAGE_COUNT_ARR: string = "tryStageCountArr";


  /**玩家刷新次数 */
  static KEY_REFRESH_COUNT_ARR: string = "refreshCountArr";

  /**玩家获得的刷新次数 */
  static KEY_EARN_REFRESH_COUNT_INFO:string = "earnRefreshCountInfo";


  /**砸金蛋当天视频次数 */
  static KEY_GOLD_EGG_LIMIT:string = "_goldEggLimit";


  static KEY_LEVEL_DATA_ARR:string = "levelDataArr";
  static KEY_LEVEL_DATA_XUEDI_ARR:string = "levelDataXuediArr";
  static KEY_LEVEL_DATA__GONGCHANG_ARR:string = "levelDataGongchangArr";


  //====================不需要保存在本地的数据===========================================

  static CUR_LEVEL:number = 0;
  static IS_NEW_STAGE:boolean = false;
  static CUR_STARS:number = 0;
  static MAP_POS:cc.Vec2 = cc.v2(0,0);



  static HP_TIMER:number = 0;

  /**复活状态，注意复活时需要重置 */
  static IS_REVIVE_STATE:boolean =false;
  //**砸金蛋模式 */
  static IS_FROM_EGGLAYER:boolean = false;
  //**是否砸金蛋成功 */
  static IS_EGG_SUCC:boolean = false;

  /**是否从扣体力方式进入 */
  static NEED_SUB_HP:boolean = false;

  static SHOW_HELP_BTN:boolean = true;


  static IS_ANI:boolean = false;
  static USER_OP = {
    mode:0,
    level:1,
    beginTime: 0,
    time : [],
    location:[],
  }
 

  //====================保存数据的默认值=================================================
  public curStageNum: number = 0; //当前关卡

  private bestStageNum:number = 0; //最高关卡

  private userStarNum:number = 0; //星星数

  private userGoldNum:number = 0;   //金币数
  private userDimondNum:number = 0; //钻石数

  public userHpNum:number = 20;   //体力数

  public userHpAddTime:number = 0; //开始计时的时间

  private _goldEggLimit:number = 0;//砸金蛋每日次数



  public levelDataArr:Array<LEVEL_INFO> = [];
  public levelDataXuediArr:Array<LEVEL_INFO> = [];
  public levelDataGongchangArr:Array<LEVEL_INFO> = [];

  public finish_xinshou:boolean = true;

  public totalKillNum:number = 0;

  public useFightBtn = 0


  m_score:number =  0
  m_playerTime:number = 0
  m_killNums:number = 0
  bulletType:number = 1
  levelData:Object[] = [ Object ]
  curMaxLevel:number = 0
  levelDataXueDi:Object[] = [ Object ]
  curMaxLevelXueDi:number = 0
  levelDataGongChang:Object[] = [ Object ]
  curMaxLevelGongChang:number = 0
  totalScore:number = 0
  totalGameTime:number = 0
  bgMusic:number = 1
  effectMusic:number = 1
  bullet_one:number = 1
  bullet_three:boolean = false
  bullet_pao:number = 0
  bullet_fllow:number = 0
  bullet_power:number = 0
  curAdType:number = 0







                    

    setLevelData(o, e, t, n, i) {
      console.log("保存关卡信息",o,e,t,n,i);
      if (0 == i) {
          if (!(r = this.levelData[o])) return;
          r.unLocked = e, t > r.score && (r.score = t), n > r.star && (r.star = n);
      } else if (1 == i) {
          if (!(r = this.levelDataXueDi[o])) return;
          r.unLocked = e, t > r.score && (r.score = t), n > r.star && (r.star = n);
      } else if (2 == i) {
          var r;
          if (!(r = this.levelDataGongChang[o])) return;
          r.unLocked = e, t > r.score && (r.score = t), n > r.star && (r.star = n);
      }
      // this.saveData();
      // var a = this.getMaxLevel();
      // a += this.getMaxLevelXueDi(), a += this.getMaxLevelGongChang(), this.setWXData(t, a);
  }




  //玩家通关看视频等获得的刷新次数
  public earnRefreshCountInfo:REFRESH_INFO = {
    curMode: - 1,
    curStageNum: -1,
    refreshCount: -1,
  }

  

  public tryStageCountArr:Array<Array<number>> = [
    [],
    [],
    [],
    [],
    [],
  ];


  /**玩家尝试次数计数 */
  private refreshCountArr:Array<Array<number>> = [
    [],
    [],
    [],
    [],
    [],
  ];

  private static _instance: TankDataMgr = null;
  //====================单例=============================================================
  public static get instance(): TankDataMgr {
    if (!TankDataMgr._instance) TankDataMgr._instance = new TankDataMgr();

    return TankDataMgr._instance;
  }

  private _lastChangedKey: string;

  // KEY 抛出改变事件
  public setData(key: string, value: any, justToday: boolean = false) {
    if (key == TankDataMgr.KEY_CUR_STAGE_NUM) {
      GameData.instance.m_curLevel = value % 40;
    }

    this[key] = value;
    GameManager.dataManager.setData(key, null, true, justToday, true);
    GameManager.dataManager.setData(key, value, true, justToday, true);
  }

  private localKey = {};
  // 获取状态
  public getData(key: string) {

    // if(key == "userHpNum"){
    //   return 200;
    // }else if(key == "userDimondNum"){
    //   return 200;
    // }

    if(this.localKey[key]){
      return this[key];
    }
    let storage = GameManager.dataManager.getData(key);
    if (storage == undefined || storage == null) {
      return this[key];
    }
    this[key] = storage;
    this.localKey[key] = true;
    return storage;
  }

  public saveData(str){
      console.log("saveData=====",str)
      
  }

  initLevelData() {
    for (var n, t = 0; 40 > t; t++) n = {
        level: t,
        unLocked: 0,
        score: 0,
        star: 3
    }, this.levelData.push(n);
  }
  initLevelDataXueDi() {
    for (var n, t = 0; 40 > t; t++) n = {
        level: t,
        unLocked: 0,
        score: 0,
        star: 3
    }, this.levelDataXueDi.push(n);
  }
  initLevelDataGongChang() {
    for (var n, t = 0; 40 > t; t++) n = {
        level: t,
        unLocked: 0,
        score: 0,
        star: 3
    }, this.levelDataGongChang.push(n);
  }

  uiMgr:UIManager = null;
  getUIMgr() {
    if (this.uiMgr && true == this.uiMgr.isValid) return this.uiMgr;
    var n = cc.find("Canvas").getComponent(UIManager);
    return n ? (this.uiMgr = n, this.uiMgr) : void 0;
  }
}








/**模式结构体 */
export const enum MAP_TYPE_STRUCT{
    MAP_NORMAL = 0,
    MAP_XUEDI = 1,
    MAP_GONGCHANG = 2
}

export class LEVEL_INFO {
    level:number;
    unLocked:number;
    score: number;
    star: number;
}
  

    export class REFRESH_INFO {
    //   curMode:MODE_TYPE_STRUCT;
    //   curStageNum:number;
    //   refreshCount:number;
  }

