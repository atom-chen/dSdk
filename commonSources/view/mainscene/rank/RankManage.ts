import EventDispacher from "../../../gamecore/managers/event/EventDispacher";
import DeerSDK, { DeerUserVO } from "../../../gamecore/deer/DeerSDK";
import RankEventName from "./RankEventName";

// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class RankManage extends EventDispacher {
  private constructor() {
    super();
  }
  private static data: RankManage = new RankManage();
  public static get Interest() {
    return this.data;
  }
  public getServiceData() {
    DeerSDK.instance.game_getGlobalRankingData(
      res => {
        let elsedata: Array<DeerUserVO> = res["score_rank"];
        let mydata: DeerUserVO = res["my_score"];
        this.worddata = elsedata;
        this.frieddata = mydata;
        this.dispatchEventWith(RankEventName.RANK_SETTING_DATE);
      },
      () => {
        // this.dispatchEventWith(RankEventName.RANK_WORD_DATA_Fail, null);
      }
    );
  }
  private worddata: Array<DeerUserVO> = [];
  private frieddata: DeerUserVO = null;

  public get getWordData() {
    //通知view层开始渲染
    return this.worddata;
  }

  public get getMyData() {
    //通知view层开始渲染
    return this.frieddata;
  }
}
