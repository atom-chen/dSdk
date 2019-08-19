import DeerSDK from "../gamecore/deer/DeerSDK";
import WXBannerAd from "../gamecore/wechat/WXBannerAd";
import Utils from "../gamecore/managers/Utils";


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
export default class BannerAuto extends cc.Component {
  // LIFE-CYCLE CALLBACKS:

  @property(cc.Integer)
  bannerUpADD:number = 0;


  onLoad() {
  }

  private startLoca: cc.Vec2 = null;
  private bureeLoca: cc.Vec2 = null;
  start() {
    return;
    this.getBerryData();
  }

  private isNoBuLoca() {
    // debugger
    this.bureeLoca = cc.v2(this.node.x, -(cc.winSize.height / 2 - 100) + 60);
    this.startLoca = cc.v2(this.node.x, this.node.y);
  }

  // private bannerUpADD: number = 0;
  private bannerUpADDR: number = 0;
  private getBerryData() {
    let policy: boolean = DeerSDK.instance.canUseEasingPolicy;
    if (policy == true) {
    // if(true){ 
      let data: any = DeerSDK.instance.game_config;
      if (data != undefined) {
      // if(true){ 

        this.bannerUpADD = this.bannerUpADD == 0 ? data.bannerUpADD : this.bannerUpADD;
        this.bannerUpADDR = data.bannerUpADDR;
        this.init();
        // this.relayout();
      }
    }
  }

  private isstart: boolean = false;
  private init() {
    let rounsize: number = Math.random();
    if (rounsize <= this.bannerUpADDR) {
      let isrelayout: boolean = this.relayout();
      if (isrelayout == false) {
        this.isNoBuLoca();
      }
      WXBannerAd.currentAd.hide();
      this.node.position = this.bureeLoca;
      if(this.bannerUpADD == -1){
        return;
      }
      this.scheduleOnce(() => {
        // this.node.position = this.startLoca;
        WXBannerAd.currentAd.show();
        this.isstart = true;
      }, this.bannerUpADD);
    }
  }

  private relayout() {
    let isRelayout: boolean = false;
    let ad = WXBannerAd.currentAd;
    if (ad != undefined) {
      let isshow = ad.isShowing;
      if (isshow == true) {
        let rect = ad.adRect;
        if (rect != undefined) {
          rect = Utils.fromScreenRect(rect);
          let po = new cc.Vec2(rect.x + rect.width / 2, rect.y + rect.height);
          po = this.node.parent.convertToNodeSpaceAR(po);
          let toY;
          if (!ad.isShowing) {
            toY = po.y - this.node.height * (1 - this.node.anchorY);
          } else {
            toY = po.y + this.node.height * this.node.anchorY;
          }
          this.bureeLoca = cc.v2(this.node.x, toY - this.node.height / 2 - rect.height / 2);
          // console.log(rect.height,"hhhhhhhhh",this.bureeLoca)

          this.startLoca = cc.v2(this.node.x, toY + 55);
          isRelayout = true;
        }
      }
    }
    return isRelayout;
  }

  // private time: number = 0;
  update(dt) {
    return;
    if (this.isstart == true) {
      this.relayout();
      this.node.position = this.startLoca;
    }
  }
}
