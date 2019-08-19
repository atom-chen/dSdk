import GameManager from "../../gamecore/managers/GameManager";
import GameConfig, { MODE_TYPE_STRUCT, PassStageInfo, STAGE_STATE_STRUCT } from "../../view/stageMode/GameConfig";
import DeerSDK from "../../gamecore/deer/DeerSDK";
import { IEnergyMeta } from "../meta/pbcus";
import SoundMgr from "../../SoundMgr";

const { ccclass, property } = cc._decorator;



@ccclass
export default class StageDataMgr {
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



  static KEY_HELP_OPEN_STAGE:string = "helpOpenStage";



  //====================不需要保存在本地的数据===========================================

  static CUR_MODE:MODE_TYPE_STRUCT = null;
  static CUR_LEVEL:number = 0;
  static IS_NEW_STAGE:boolean = false;
  static CUR_STARS:number = 0;
  static MAP_POS:cc.Vec2 = cc.v2(0,0);

  static TEMP_REFRESH_INFO:REFRESH_INFO = {
    curMode: - 1,
    curStageNum: -1,
    refreshCount: -1,
  }
  static LAST_TIP_STAGE:number = -1;
  static RETRY_STAGE:number = -1;


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
  public curStageNum: number = 1; //当前关卡

  private bestStageNum:number = 0; //最高关卡

  private userStarNum:number = 0; //星星数

  private userGoldNum:number = 0;   //金币数
  private userDimondNum:number = 0; //钻石数

  public userHpNum:number = 20;   //体力数

  public userHpAddTime:number = 0; //开始计时的时间

  private _goldEggLimit:number = 0;//砸金蛋每日次数


  
  private helpOpenStage:number = 0; // 开启了提示的关卡，等于 模式（0-3) * 10000 + 关卡

  private last_egg_day:string = "";

  //玩家通关看视频等获得的刷新次数
  public earnRefreshCountInfo:REFRESH_INFO = {
    curMode: - 1,
    curStageNum: -1,
    refreshCount: -1,
  }

  

  /**已通过的关卡信息 */
  private passStageArr:Array<Array<PassStageInfo>> = [
    [],
    [],
    [],
    [],
    [],
  ];

  public tryStageCountArr:Array<Array<number>> = [
    [],
    [],
    [],
    [],
    [],
  ];


  /**玩家尝试次数计数 */
  public refreshCountArr:Array<Array<number>> = [
    [],
    [],
    [],
    [],
    [],
  ];

  


  private static _instance: StageDataMgr = null;
  //====================单例=============================================================
  public static get instance(): StageDataMgr {
    if (!StageDataMgr._instance) StageDataMgr._instance = new StageDataMgr();

    return StageDataMgr._instance;
  }

  private _lastChangedKey: string;

  // KEY 抛出改变事件
  public setData(key: string, value: any, justToday: boolean = false) {
    this[key] = value;
    GameManager.dataManager.setData(key, null, true, justToday, true);
    GameManager.dataManager.setData(key, value, true, justToday, true);
  }

  public get goldEggLimit():number{
      if(StageDataMgr.instance.getData("aaaa") != new Date().getDate()){
        this._goldEggLimit = 0;
      }
      return this._goldEggLimit;
  }

  public set goldEggLimit(time){
    console.log(StageDataMgr.instance.setData("aaaa",new Date().getDate()))
    this._goldEggLimit = time;
  }



  public localKey = {};
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


  /**
   * 保存关卡值
   * @param stageID 需要保存的关卡
   * @param skip 是否跳过
   * @param star 星星
   * @param stageMode 模式
   */
  public savePassStage(stageID:number,skip:STAGE_STATE_STRUCT,star:number,stageMode:MODE_TYPE_STRUCT): void{
    let passStage:Array<Array<PassStageInfo>> =  StageDataMgr.instance.getData(StageDataMgr.KEY_PASS_STAGE_ARR);
    let passStageArr = passStage[stageMode];
    if(passStageArr.length < stageID - 1){
        for(let i = 0; i < stageID -1 ;i ++){
            if(!passStageArr[i]){
                passStageArr[i] = {
                    index : i + 1,
                    skip : STAGE_STATE_STRUCT.SKIP,
                    star : 0
                }
            }
        }
        passStageArr.push({
            index :stageID,
            skip :skip,
            star :star
        })
    }else{
        if(passStageArr.length >= stageID){
          if(passStageArr[stageID - 1].star >= star){
            return;
          }
          passStageArr[stageID - 1] = {
              index : stageID,
              skip : skip,
              star : star
          } 
        }else{
            passStageArr.push({
                index :stageID,
                skip :skip,
                star :star
            })
        }
    }
    passStage[stageMode] = passStageArr;
    // console.log(passStage,"sssssssss",stageID,skip,stageID,stageMode)
    StageDataMgr.instance.setData(StageDataMgr.KEY_PASS_STAGE_ARR,passStage);
  }


/**获取模式下所有星星 */
  public getStarsByMode(stageMode:MODE_TYPE_STRUCT):number{
    let stars:number = 0;
    let passStage:Array<Array<PassStageInfo>> = StageDataMgr.instance.passStageArr;
    let hasLocalData:boolean = false;
    for(let i = 0;i < passStage.length;i ++){
      if(passStage[i].length != 0){
        hasLocalData = true;
        break;
      }
    }
    if(!hasLocalData){
      passStage =  StageDataMgr.instance.getData(StageDataMgr.KEY_PASS_STAGE_ARR);
    }
    let passStageArr = passStage[stageMode];
    for(let i = 0;i < passStageArr.length;i ++){
      stars += passStageArr[i].star;
    }
    return stars;
  }

  

  public getAllModeStars():number{
    let stars:number = 0;
    let passStage:Array<Array<PassStageInfo>> = StageDataMgr.instance.passStageArr;
    let hasLocalData:boolean = false;
    for(let i = 0;i < passStage.length;i ++){
      if(passStage[i].length != 0){
        hasLocalData = true;
        break;
      }
    }
    if(!hasLocalData){
      passStage =  StageDataMgr.instance.getData(StageDataMgr.KEY_PASS_STAGE_ARR);
    }
    for(let i = 0; i < (MODE_TYPE_STRUCT.MODE4 + 1);i ++){
      let passStageArr = passStage[i];
      for(let i = 0;i < passStageArr.length;i ++){
        stars += passStageArr[i].star;
      }
    }
    return stars;
  }
  /**是否是新模式刚解锁 */
  public isNewMode(stageMode:MODE_TYPE_STRUCT):boolean{
    let passStage:Array<Array<PassStageInfo>> = StageDataMgr.instance.passStageArr;
    let hasLocalData:boolean = false;
    for(let i = 0;i < passStage.length;i ++){
      if(passStage[i].length != 0){
        hasLocalData = true;
        break;
      }
    }
    if(!hasLocalData){
      passStage =  StageDataMgr.instance.getData(StageDataMgr.KEY_PASS_STAGE_ARR);
    }

    let passStageArr = passStage[stageMode];
    if(passStageArr.length == 0){
      return true;
    }
    return false;
  }

  /**获取该模式最高关卡 */
  public getHighestStageByMode(mode:MODE_TYPE_STRUCT):number{
    let passStage:Array<Array<PassStageInfo>> = StageDataMgr.instance.passStageArr;
    let hasLocalData:boolean = false;
    for(let i = 0;i < passStage.length;i ++){
      if(passStage[i].length != 0){
        hasLocalData = true;
        break;
      }
    }
    if(!hasLocalData){
      passStage =  StageDataMgr.instance.getData(StageDataMgr.KEY_PASS_STAGE_ARR);
    }

    let passStageArr = passStage[mode];

    if(mode == MODE_TYPE_STRUCT.MODE1){
      if((passStageArr.length + 1) > GameConfig.instance.gameMeta.classicalModeLevelMeta.length){
        return passStageArr.length;
      }
    }else if(mode == MODE_TYPE_STRUCT.MODE2){
      if((passStageArr.length + 1) > GameConfig.instance.gameMeta.grenadeModeLevelMeta.length){
        return passStageArr.length;
      }
    }else if(mode == MODE_TYPE_STRUCT.MODE3){
      if((passStageArr.length + 1) > GameConfig.instance.gameMeta.hostageModeLevelMeta.length){
        return passStageArr.length;
      }
    }else if(mode == MODE_TYPE_STRUCT.MODE4){
      if((passStageArr.length + 1) > GameConfig.instance.gameMeta.survivalModeLevelMeta.length){
        return passStageArr.length;
      }
    }

    return passStageArr.length + 1;
  }

  /**获取该模式信息 */
  public getInfoByMode(mode:MODE_TYPE_STRUCT):Array<PassStageInfo>{
    let passStage:Array<Array<PassStageInfo>> = StageDataMgr.instance.passStageArr;
    let hasLocalData:boolean = false;
    for(let i = 0;i < passStage.length;i ++){
      if(passStage[i].length != 0){
        hasLocalData = true;
        break;
      }
    }
    if(!hasLocalData){
      passStage =  StageDataMgr.instance.getData(StageDataMgr.KEY_PASS_STAGE_ARR);
    }
    let passStageArr = [];
    for(let i = 0;i < passStage[mode].length;i ++){
      passStageArr.push(passStage[mode][i]);
    }
    return passStageArr;
  }



  


  private tempTime:number = 0;
  private hpLimitEvent(curTime:number):void{
    if((curTime - this.tempTime) >= 50){
      StageDataMgr.instance.setData(StageDataMgr.KEY_USER_HP_ADD_TIME,curTime);
      this.tempTime = curTime;
    }else{
      StageDataMgr.instance.userHpAddTime = curTime;
    }
  }


  public initHpTimer():void{
    let energyMetaData:IEnergyMeta = GameConfig.instance.gameMeta.energyMeta[0];

    let timer = () => {
      let curHpNum = StageDataMgr.instance.userHpNum == 20 ? StageDataMgr.instance.getData(StageDataMgr.KEY_USER_HP_NUM) : StageDataMgr.instance.userHpNum;
      let curTime:number = DeerSDK.instance.serverTime.getTime();
      if(curHpNum >= energyMetaData.upperLimit){
          StageDataMgr.instance.hpLimitEvent(curTime);
          StageDataMgr.HP_TIMER = energyMetaData.recoverInterval * 1000;
          // console.log("体力值已满")
      }else{
        let lastTime = StageDataMgr.instance.userHpAddTime == 0 ? StageDataMgr.instance.getData(StageDataMgr.KEY_USER_HP_ADD_TIME):StageDataMgr.instance.userHpAddTime;
        StageDataMgr.HP_TIMER = curTime - lastTime;
        // console.log(StageDataMgr.instance.getData(StageDataMgr.KEY_USER_HP_NUM),"体力值",StageDataMgr.HP_TIMER)
  
        let addHpNum = Math.floor(StageDataMgr.HP_TIMER / (energyMetaData.recoverInterval * 1000)) * energyMetaData.recoverNum + curHpNum;
        if(addHpNum > energyMetaData.upperLimit){
          addHpNum = energyMetaData.upperLimit;
        }
        lastTime = curTime - StageDataMgr.HP_TIMER % (energyMetaData.recoverInterval * 1000);
        StageDataMgr.instance.hpLimitEvent(lastTime);
        StageDataMgr.instance.setData(StageDataMgr.KEY_USER_HP_NUM,addHpNum);
      }
      setTimeout(() => {
        timer();
      }, 1000);
    }
    timer();
  }

  /**
   * 获取关卡尝试次数
   */
  public getRefreshCount(curMode:MODE_TYPE_STRUCT,curLevel:number):number{
    if(StageDataMgr.instance.refreshCountArr[curMode].length == 0){
      StageDataMgr.instance.getData(StageDataMgr.KEY_REFRESH_COUNT_ARR);
    }

    let data:number = StageDataMgr.instance.refreshCountArr[curMode][curLevel - 1];
    if(!data && data !== 0){
      
        let game_config: any = DeerSDK.instance.game_config;
        if (game_config != undefined) {
            StageDataMgr.instance.refreshCountArr[curMode][curLevel - 1] = game_config.refreshNumLimit;
          data = game_config.refreshNumLimit;
        }else {
          data = 1;
        }
    }
    return data;
  }
  /**
   * 保存某关卡尝试次数
   * @param curMode 
   * @param curLevel 
   * @param curNum 当前剩余的免费刷新次数
   */
  public setRefreshCount(curMode:MODE_TYPE_STRUCT,curLevel:number,curNum:number):void{
    if(StageDataMgr.instance.refreshCountArr[curMode].length == 0){
      StageDataMgr.instance.getData(StageDataMgr.KEY_REFRESH_COUNT_ARR);
    }
    StageDataMgr.instance.refreshCountArr[curMode][curLevel - 1] = curNum;
    StageDataMgr.instance.setData(StageDataMgr.KEY_REFRESH_COUNT_ARR,StageDataMgr.instance.refreshCountArr);
  }


  /**为0时，重新计算总关卡数 */
  public totalStage:number = 0;
  
    /**
   * 获取玩家总通关数
   */
  public getBestStageNum(){
    let stage = 0;
    if(this.totalStage == 0){
      let data  = StageDataMgr.instance.getData(StageDataMgr.KEY_PASS_STAGE_ARR);
      for(let i = 0;i < data.length;i ++){
          for(let j = 0;j < data[i].length;j ++){
              stage += 1;
          }
      }
      this.totalStage = stage;
    }else{
      stage = this.totalStage;
    }
    return stage;
  }
  
  /**判断是否是免费关卡 */
  public judgeIsFreeStage(mode:MODE_TYPE_STRUCT,stage:number):boolean{
    if(mode == MODE_TYPE_STRUCT.MODE1 && stage <= 16){
      return true;
    }
    return false;
  }
}



    export class REFRESH_INFO {
      curMode:MODE_TYPE_STRUCT;
      curStageNum:number;
      refreshCount:number;
  }

