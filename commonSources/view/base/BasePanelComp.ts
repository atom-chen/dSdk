import GameManager from "../../gamecore/managers/GameManager";
import WXBannerAd from "../../gamecore/wechat/WXBannerAd";
import CoinAnim, { FlyStruct } from "./CoinAnimComp";
import CoinAnimComp from "./CoinAnimComp";

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

@ccclass
export default class BasePanelComp extends cc.Component {
  constructor() {
    super();
  }
  // LIFE-CYCLE CALLBACKS:

  // onLoad () {}

  start() { this.init(true); }

  init(needShowAd:boolean = true) {
    if (needShowAd && WXBannerAd.currentAd) WXBannerAd.currentAd.next();
    return;
    GameManager.popUpManager["_popUpCount"] += 1;
    // console.log(GameManager.popUpManager["_popUpCount"],'aaaaaaaaa1');
    //显示广告
    if (needShowAd && WXBannerAd.currentAd) WXBannerAd.currentAd.show();
  }

  public close(): void {
    GameManager.soundsManager.playTapSound();
    this.node.destroy();
    return;
    GameManager.popUpManager["_popUpCount"] -= 1;

    //隐藏广告
    if (WXBannerAd.currentAd) WXBannerAd.currentAd.hide();
  }


  /**
   * 
   * @param startNode 
   * @param endNode 
   * @param type 2 体力 1 金币 0 钥匙
   */
  protected showFlyGoldEvent(startNode:cc.Node,endNode:cc.Node,type:number = 1):void{
    
    let event = new cc.Event.EventCustom(CoinAnimComp.SHOW_FLY_ANI, true);
    let flyStructInfo: FlyStruct = new FlyStruct();

    flyStructInfo.start = startNode.convertToWorldSpaceAR(cc.v2(0, 0));
    flyStructInfo.start = cc.find("Canvas").convertToNodeSpaceAR(flyStructInfo.start);

    flyStructInfo.end = endNode.convertToWorldSpaceAR(cc.v2(0, 0));
    flyStructInfo.end = cc.find("Canvas").convertToNodeSpaceAR(flyStructInfo.end);

    flyStructInfo.type = type;
    event.detail = flyStructInfo;
    this.node && this.node.dispatchEvent(event);
  }

  // update (dt) {}
}
