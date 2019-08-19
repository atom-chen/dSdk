import { GameMeta } from "./pbcus";

import EventDispacher from "../../gamecore/managers/event/EventDispacher";
import GameValues from "../../gamecore/base/GameValues";
import GameCoreEventNames from "../../gamecore/GameCoreEventNames";
import GameConfig from "../../view/stageMode/GameConfig";


const { ccclass, property } = cc._decorator;

//数据url
const DATA_URL: string = GameConfig.gameCdn + "meta14.jpg";



/**
 * protobuf数据中心
 *
 * @see https://github.com/dcodeIO/protobuf.js
 *
 */
@ccclass
export default class PBManager extends EventDispacher {
  private static _instance: PBManager;
  public static get instance(): PBManager {
    if (!PBManager._instance) new PBManager();
    return PBManager._instance;
  }

  private _gameMeta: GameMeta;

  /**
   * 获取所有游戏数据
   *
   */
  public get gameMeta(): GameMeta {
    return this._gameMeta;
  }

  constructor() {
    super();
    if (PBManager._instance) throw new Error("please use PBManager.instance");
    PBManager._instance = this;
    this.init();
  }

  private _isReady: boolean;

  /**
   * 是否已准备好
   */
  public get isReady(): boolean {
    return this._isReady;
  }

  /**
   * 初始化
   */
  private init(): void {
    var fileUrl: string = DATA_URL + "?vesion=" + GameValues.gameVersion;

    var xhr = cc.loader.getXMLHttpRequest();
    xhr.open("GET", fileUrl, true);
    xhr.responseType = "arraybuffer";
    xhr.onload = oEvent => {
      this.dataLoadedCallback(xhr.response);
    };
    // 错误处理
    xhr.onerror = err => {
      console.log("【PBManager】init, by XMLHttpRequest");
      console.log(err);
    };
    xhr.send(null);
  }

  private dataLoadedCallback(data): void {
    this._gameMeta = GameMeta.decode(new Uint8Array(data));
    console.log(this._gameMeta,"gameMeta")
    this._isReady = true;
    //抛出事件
    this.dispatchEventWith(GameCoreEventNames.COMMON_READY);
  }
}
