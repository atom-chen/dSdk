import Comp_ListRenderer from "../../../gamecore/components/Comp_ListRenderer";
import { DeerUserVO } from "../../../gamecore/deer/DeerSDK";
import WXImage from "../../../gamecore/wechat/WXImage";
import GameUtils from "../../../GameUtils";

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
export default class RankItemRender extends Comp_ListRenderer {
  @property(cc.Label)
  rankLb: cc.Label = null;
  @property(cc.Sprite)
  headImg: cc.Sprite = null;
  @property(cc.Label)
  nameLb: cc.Label = null;
  @property([cc.SpriteFrame])
  imgs: Array<cc.SpriteFrame> = [];
  @property(cc.Sprite)
  rankimg: cc.Sprite = null;
  @property(cc.Label)
  levelLb: cc.Label = null;

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {}

  refreshUI() {
    let data: DeerUserVO = this.data;
    // this.rankLb.string = this.index + 1 + "";
    if (this.imgs[this.index] != undefined) {
      this.rankLb.string = "";
      this.rankimg.node.active = true;
      this.rankimg.spriteFrame = this.imgs[this.index];
      if(this.index == 3){
        this.rankLb.string = this.index + 1 + "";
      }
    } else {
      // this.rankimg.node.active = false;
      this.rankLb.string = this.index + 1 + "";
      this.rankimg.node.active = true;
      this.rankimg.spriteFrame = this.imgs[3];
    }
    this.headImg.spriteFrame = WXImage.createImage(data.avatar);
    this.nameLb.string = GameUtils.instance.substrName(data.nickname, 5);
    this.levelLb.string = data.amount + "关";
  }

  // update (dt) {}
}
