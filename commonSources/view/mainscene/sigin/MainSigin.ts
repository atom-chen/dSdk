import BasePanelComp from "../../base/BasePanelComp";
import GameConfig from "../../stageMode/GameConfig";
import MainSiginItem from "./MainSiginitem";
import GameUtils from "../../../GameUtils";
import MainDataMgr from "../../../module/data/MainDataMgr";
import StageDataMgr from "../../../module/data/StageDataMgr";


// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;
let rewardNum:number = 0;
@ccclass
export default class MainSigin extends BasePanelComp {
  @property(cc.Node)
  content: cc.Node = null;
  @property(cc.Prefab)
  item: cc.Prefab = null;

  

  @property(cc.SpriteFrame)
  spfmArr:cc.SpriteFrame[] = [];

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {}

  start() {

    // this.init(GameConfig.instance.isSigin() == true);
    this.init();


    
    let mainsiginitem: MainSiginItem = this.node
      .getChildByName("content")
      .getChildByName("bg")
      .getChildByName("item1")
      .getComponent(MainSiginItem);
    mainsiginitem.id = 6;
    mainsiginitem.MainSiginComp = this.node.getComponent(MainSigin);

    mainsiginitem.init();
    for (let i = 0; i < 6; i++) {
      let node: cc.Node = cc.instantiate(this.item);
      node.getComponent(MainSiginItem).id = i;
      this.content.addChild(node);  
      node.getComponent(MainSiginItem).MainSiginComp = this.node.getComponent(MainSigin);
      node.getComponent(MainSiginItem).init();
    }
    this.onSiginAward();

    if (GameConfig.instance.isSigin() == true) {
      let text: cc.RichText = this.node.getChildByName("content").getChildByName("ReceiveBtn").getComponent(cc.RichText);
      text.string = "<u>已领取</u>"
    }
  }

  private onSiginAward() {
    rewardNum = GameConfig.instance.getAward(GameConfig.instance.isSiginId);
  }

  private sigin() {
    if (GameConfig.instance.isSigin() == false) {
      this.siginSuccss(1);
    } else {
      GameUtils.showToast("今日已签到");
    }
    this.closeView();
  }

  // private doublesigin() {
  //   // GameUtils.buriedPoint(29);
  //   if (GameConfig.instance.isSigin() == false) {
  //     GameUtils.instance.onShare(() => {
  //       this.siginSuccss(2);
  //       this.closeView();
  //     });
  //   } else {
  //     GameUtils.showToast("今日已签到");
  //     this.closeView();
  //   }
  // }







  private threesigin() {
    // GameUtils.buriedPoint(30);
    if (GameConfig.instance.isSigin() == false) {
      GameUtils.instance.showVideoAd(
        () => {
          this.siginSuccss(2);
          this.closeView();
        },
        () => {
          GameUtils.showAlert("观看完整视频可领取双倍金币奖励", () => {
            //重新观看
            this.threesigin();
          });
        },
        () => {
          GameUtils.instance.playFailOnShare((res: number) => {
            switch (res) {
              case 1:
                this.siginSuccss(2);
                this.closeView();
                break;
            }
          }, "MainSigin1");
        }
      );
    } else {
      GameUtils.showToast("今日已签到");
      this.closeView();
    }
  }

  /**
   * 签到成功
   * @param id 签到id
   * @param type 签到类型 1:签到
   */
  public siginSuccss(power: number) {
    let time: Array<number> = MainDataMgr.instance.getData(
      MainDataMgr.KEY_USER_SIGIN_RECORD
    );
    time[
      GameConfig.instance.isSiginId
    ] = GameUtils.instance.serverTime.getTime();

    StageDataMgr.instance.setData(StageDataMgr.KEY_USER_GOLD_NUM, StageDataMgr.instance.getData(StageDataMgr.KEY_USER_GOLD_NUM) + rewardNum * power);

    if(cc.find("Canvas/leftnode/coinbg/goldtext")){
      this.showFlyGoldEvent(cc.find("Canvas"),cc.find("Canvas/leftnode/coinbg/goldtext"));
    }

    // let event = new cc.Event.EventCustom(CoinAnim.SHOW_FLY_ANI,true);
    // let flyStructInfo:FlyStruct = new FlyStruct();
    // flyStructInfo.start = cc.find("Canvas/rigthnode/sigin").convertToWorldSpaceAR(cc.find("Canvas/rigthnode/sigin").position);
    // flyStructInfo.end = cc.find("Canvas/leftnode/coinbg/goldtext").convertToWorldSpaceAR(cc.find("Canvas/leftnode/coinbg/goldtext").position);
    // flyStructInfo.type = 0;
    // event.detail = flyStructInfo;
    // this.node.dispatchEvent(event);

    GameUtils.showToast("恭喜获得" + rewardNum * power + "金币");
    MainDataMgr.instance.setData(MainDataMgr.KEY_USER_SIGIN_RECORD, time);
  }

  private closeView() {
    if(this.node){
      this.close();
    }
  }

  // update (dt) {}
}
