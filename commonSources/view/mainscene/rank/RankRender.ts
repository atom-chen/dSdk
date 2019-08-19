import { DeerUserVO } from "../../../gamecore/deer/DeerSDK";
import RankManage from "./RankManage";
import RankEventName from "./RankEventName";
import Comp_List from "../../../gamecore/components/Comp_List";
import WXImage from "../../../gamecore/wechat/WXImage";
import GameUtils from "../../../GameUtils";
import GameManager from "../../../gamecore/managers/GameManager";
import BasePanelComp from "../../base/BasePanelComp";
import wxRankList from "../../../rank/wxRankList";

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
export default class RankRender extends BasePanelComp {
  @property(cc.Node)
  content: cc.Node = null;
  @property(cc.Label)
  rank_Lb: cc.Label = null;
  @property(cc.Sprite)
  head_sp: cc.Sprite = null;
  @property(cc.Label)
  name_Lb: cc.Label = null;
  @property([cc.SpriteFrame])
  imgs: Array<cc.SpriteFrame> = [];
  @property(cc.Sprite)
  rankimg: cc.Sprite = null;
  @property(cc.Label)
  levelLb: cc.Label = null;
  @property(cc.Node)
  wesub: cc.Node = null;

  @property(cc.Node)
  kuang1: cc.Node = null;
  @property(cc.Node)
  kuang2: cc.Node = null;


  @property(cc.Sprite)
  friedBt: cc.Sprite = null;
  @property(cc.Sprite)
  wordBt: cc.Sprite = null;

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    RankManage.Interest.addEventListener(
      RankEventName.RANK_SETTING_DATE,
      this.showWord,
      this
    );
    // debugger;
    this.node.width = cc.winSize.width;
    this.node.height = cc.winSize.height;
  }

  private closeView() {
    this.close();
  }
  start() {
    this.init();
    RankManage.Interest.getServiceData();
    this.showFried();
    
  }

  

  private showWord() {
    let data: Array<DeerUserVO> = RankManage.Interest.getWordData;
    if (data && data.length > 0) {
      this.showWordItem(data);
      this.showMyItem(RankManage.Interest.getMyData);
    }
  }
  private showWorld() {
    GameManager.soundsManager.playTapSound();
    this.kuang1.active = false;
    this.kuang2.active = true;
    this.node
      .getChildByName("content")
      .getChildByName("bg")
      .getChildByName("scroll").active = true;
    this.node
      .getChildByName("content")
      .getChildByName("bg")
      .getChildByName("rankme").active = true;
    if (typeof wx != "undefined") {
      this.node.getComponent(wxRankList).hideFriendRank();
      // let data: any = {};
      // data["state"] = 2;
      // wx.getOpenDataContext().postMessage(data);
    }
    this.wesub.active = false;
  }

  private showFried() {
    GameManager.soundsManager.playTapSound();
    this.kuang1.active = true;
    this.kuang2.active = false;
    this.node
      .getChildByName("content")
      .getChildByName("bg")
      .getChildByName("scroll").active = false;
    this.node
      .getChildByName("content")
      .getChildByName("bg")
      .getChildByName("rankme").active = false;

    if (typeof wx != "undefined") {
      this.node.getComponent(wxRankList).loadLevelOpenRank();
      // let data: any = {};
      // data["state"] = 1;
      // wx.getOpenDataContext().postMessage(data);
    }
    this.wesub.active = false;
    this.wesub.active = true;
  }

  /**
   *
   * @param event 世界排行榜数据
   */
  private showWordItem(worddata: Array<DeerUserVO>) {
    if (worddata != undefined) {
      console.log("this", worddata);
      let comp_list: Comp_List = this.content.getComponent(Comp_List);
      comp_list.data = worddata;
    }
  }

  /**
   * 渲染个人用户信息
   * @param event 自己信息
   */
  private showMyItem(mydata: DeerUserVO) {
    if (mydata != undefined || mydata != null) {
      if (mydata.index < 0) {
        this.rank_Lb.string = "未上榜";
      } else {
        if (this.imgs[mydata.index - 1] != undefined) {
          this.rank_Lb.string = "";
          this.rankimg.spriteFrame = this.imgs[mydata.index - 1];
        }else{
          this.rankimg.spriteFrame = this.imgs[3];
          this.rank_Lb.string = mydata.index + "";
        }
        if(mydata.index == 4){
          this.rank_Lb.string = "4";
        }
      }
      this.head_sp.spriteFrame = WXImage.createImage(mydata.avatar);
      this.name_Lb.string = GameUtils.instance.substrName(mydata.nickname, 6);
      this.levelLb.string = mydata.amount + "关";
    }
  }

  onDestroy() {
    RankManage.Interest.removeEventListener(
      RankEventName.RANK_SETTING_DATE,
      this.showWord,
      this
    );
    this.node.on(RankEventName.RANK_SHOW_WORD_VIEW, this.showWord, this);
  }

  // update (dt) {}
}
