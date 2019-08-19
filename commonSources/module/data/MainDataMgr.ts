import GameManager from "../../gamecore/managers/GameManager";
import CoinAnimComp from "../../view/base/CoinAnimComp";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MainDataMgr {
  //====================需要保存在本地的数据============================================

  /**玩家金币数量 */
  static KEY_USER_OFF_AWARD: string = "userOffAward";
  /**分享信息 */
  static KEY_SHARE_COUNT: string = "sharecount";

  static KEY_NEW_PLAYER:string = "newPlayer";

  static KEY_WELFAREDAY: string = "welfareDay";
  /**解锁形象列表 */
  static KEY_ROLE_SKIN_ARR:string = "roleSkinArr";

  static KEY_USER_SIGIN_RECORD: string = "signinrecord";

  /**第一次登录时间 */
  static KEY_LOGIN_DAY: string = "loginDay";

  /**记录显示福利界面的日期 */
  static KEY_SHOW_WELFARE_DAY:string = "showWelfareDay"


  /**文件解压完成 */
  static KEY_FILE_UNZIP_OK:string = "fileUnzipOK";



  //====================不需要保存在本地的数据===========================================

  /**第一次打开mainScene */
  static IS_FIRST_ENTER_MAINSCENE: boolean = true;


  static coinAniComp:CoinAnimComp = null;

  static CUR_DEATH_AD_INDEX:number = 0;
  static CUR_DEATH_AD_TYPE:number = 0;

  /**第一次进入游戏，和插屏广告有关系 */
  static IS_FIRST_OPEN:boolean = false;





  //====================保存数据的默认值=================================================
  public userOffAward: number = 0;
  public sharecount: any = {};

  public newPlayer:boolean = true;

  public welfareDay:number = -1; 

  public loginDay:string = "";

  public fileUnzipOK:number = 0;

  private roleSkinArr:Array<RoleSKinInfo> = [{
    id:0,
    state:1,
    equip:true
  }];

  // public operateArr = {}


  public signinrecord: Array<number> = [];

    //显示福利中心的日期
  static showWelfareDay:number = 0;


  //====================单例=============================================================
  private static _instance: MainDataMgr = null;

  public static get instance(): MainDataMgr {
    if (!MainDataMgr._instance) MainDataMgr._instance = new MainDataMgr();
    return MainDataMgr._instance;
  }

  private _lastChangedKey: string;

  /**
   *  被修改的 KEY
   */
  public get lastChangedKey(): string {
    return this._lastChangedKey;
  }

  // KEY 抛出改变事件
  public setData(key: string, value: any, justToday: boolean = false) {
    this[key] = value;
    GameManager.dataManager.setData(key, null, true, justToday, true);
    GameManager.dataManager.setData(key, value, true, justToday, true);
  }




  public localKey = {};
  // 获取状态
  public getData(key: string) {
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
}


export class RoleSKinInfo{
  constructor(id:number,state:number,equip:boolean = false){
    this.id = id;
    this.state = state;
    this.equip = equip;
  }
  id: number;
  /** 0：待领取，1已拥有 */
  state: number;
  equip:boolean;
}
