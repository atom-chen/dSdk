import GameManager from "../../gamecore/managers/GameManager";
import GameUtils from "../../GameUtils";
import WXUser from "../../gamecore/wechat/WXUser";
import DeerSDK from "../../gamecore/deer/DeerSDK";
import BasePanelComp from "../base/BasePanelComp";

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
export default class MainSetting extends BasePanelComp {
  @property(cc.Node)
  muscinode: cc.Node = null;
  @property(cc.Node)
  soundnode: cc.Node = null;
  @property(cc.Label)
  id: cc.Label = null;

  start() {
    this.initState();
    this.init();
    if (!DeerSDK.instance.userVO || !DeerSDK.instance.userVO.id) {
        return;
    }
    //判断用户信息是否已经获取
    // console.log(WXUser.userInfo,DeerSDK.instance.userVO,"=============")
    if (WXUser.userInfo) {
      this.id.string = "ID:" + DeerSDK.instance.userVO.id + "";
    } else {
      //设置用户信息获取成功回调
      WXUser.onUserInfo(this.updateUserInfo);
    }
  }

  private initState() {
    let ok: boolean = GameManager.soundsManager.soundMuted;
    let open: cc.Node = this.soundnode.getChildByName("onbg");
    let close: cc.Node = this.soundnode.getChildByName("offbg");
    if (ok) {
      open.active = false;
      close.active = true;
    } else {
      open.active = true;
      close.active = false;
    }
    let ok1: boolean = GameManager.soundsManager.musicMuted;

    // console.log(ok,ok1,"ooooooooooooo")
    let open1: cc.Node = this.muscinode.getChildByName("onbg");
    let close1: cc.Node = this.muscinode.getChildByName("offbg");
    if (ok1) {
      //播放
      open1.active = false;
      close1.active = true;
    } else {
      open1.active = true;
      close1.active = false;
    }
  }

  private closeView() {
    this.close();
  }

  private myGameInfo() {
    GameManager.soundsManager.playTapSound();
  }

  /**客服*/
  private onService() {
    GameManager.soundsManager.playTapSound();
    GameUtils.instance.wxOpenCustomerServiceConversation();
  }

  private onShare() {
    GameManager.soundsManager.playTapSound();
    GameUtils.instance.onShare();
  }

  /**
   * 控制声音
   */
  private controlSound() {
    GameManager.soundsManager.playTapSound();
    let ok: boolean = GameManager.soundsManager.soundMuted;
    let open: cc.Node = this.soundnode.getChildByName("onbg");
    let close: cc.Node = this.soundnode.getChildByName("offbg");
    if (ok) {
      //播放
      GameManager.soundsManager.unmuteSound();
      open.active = true;
      close.active = false;
    } else {
      //关闭
      open.active = false;
      close.active = true;
      GameManager.soundsManager.muteSound();
    }
  }

  /**
   * 控制音乐
   */
  private controlMusic() {
    GameManager.soundsManager.playTapSound();
    let ok: boolean = GameManager.soundsManager.musicMuted;
    let open: cc.Node = this.muscinode.getChildByName("onbg");
    let close: cc.Node = this.muscinode.getChildByName("offbg");
    if (ok) {
      //播放
      open.active = true;
      close.active = false;
      GameManager.soundsManager.unmuteMusic();
    } else {
      open.active = false;
      close.active = true;
      //关闭
      GameManager.soundsManager.muteMusic();
    }
  }

  private showFeedBack() {
    GameManager.soundsManager.playTapSound();
    cc.loader.loadRes("prefabs/hall/feedback", cc.Prefab, (err, prefab) => {
      if (!err) {
        let setting = cc.instantiate(prefab);
        this.node.addChild(setting);
      }
    });
  }

  private updateUserInfo():void{
    if (!DeerSDK.instance.userVO || !DeerSDK.instance.userVO.id) {
      return;
    }
    //获取用户信息
    this.id.string = "ID:" + DeerSDK.instance.userVO.id + "";
  }


  // update (dt) {}
  onDestroy(){
    WXUser.offUserInfo(this.updateUserInfo);
  }
}



