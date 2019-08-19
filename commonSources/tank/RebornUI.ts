import GameData from "./GameData";
import GameCtrl from "./GameCtrl";
import GameUI from "./GameUI";
import Globaldef from "./Globaldef";
import TankDataMgr from "./TankDataMgr";
import UIManager from "./UIManager";
import GameUtils from "../GameUtils";


// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class RebornUI extends cc.Component {


    gameCtrl:GameCtrl = null;
    start() {
        var n = cc.find("Canvas");
        n && (this.gameCtrl = n.getComponent("GameCtrl"));
    }


    
    private watchVideoAd(): void {
        TankDataMgr.instance.curAdType = 2;
        GameUtils.instance.showVideoAd(
        () => {
            this.lookSuccess();
        },
        () => {
            GameUtils.showAlert(
            "观看完整视频可复活",
            () => {
                this.watchVideoAd();
            },
            () =>{
                this.lookCancel();
            }
            );
        },
        () => {
            GameUtils.instance.playFailOnShare((res: number) => {
                switch (res) {
                  case 1:
                        this.lookSuccess();
                    break;
                }
              }, "moreRewardGoldNum");
        }
        );
    }

    clickLookBtn() {
        if (cc.sys.browserType == cc.sys.BROWSER_TYPE_CHROME) this.node.active = !1, cc.director.resume(), 
        this.gameCtrl && this.gameCtrl.enemyManager && this.gameCtrl.enemyManager.removeAllBullet(), 
        GameData.instance.isPause = !0, (n = cc.find("Canvas/GameUI")) && (e = n.getComponent(GameUI)) && e.countDownAniReBorn();
         else if (false){}
         else if (cc.sys.browserType == cc.sys.BROWSER_TYPE_WECHAT_GAME)
        GameData.instance.isPause = !0, 
        TankDataMgr.instance.curAdType = 2, this.watchVideoAd(); else {
            var n, e;
            (this.node.active = !1, cc.director.resume(), this.gameCtrl && this.gameCtrl.enemyManager && this.gameCtrl.enemyManager.removeAllBullet(), 
            GameData.instance.isPause = !0, n = cc.find("Canvas/GameUI")) && (e = n.getComponent(GameUI)) && e.countDownAniReBorn();
        }
    }
    clickSkipBtn() {
        cc.director.resume(), this.node.active = !1, GameData.instance.m_isWin = !1, GameData.instance.isPause = !0, 
        TankDataMgr.instance.getUIMgr().showUI(Globaldef.UI_NAME[Globaldef.UI_ID.E_GAME_END_UI]);
    }
    videoAd = null;

    lookSuccess() {
        this.node.active = !1, cc.director.resume();
        var n = cc.find("Canvas/GameUI");
        if (n) {
            this.gameCtrl && this.gameCtrl.enemyManager && this.gameCtrl.enemyManager.removeAllBullet();
            var e = n.getComponent(GameUI);
            e && e.countDownAniReBorn();
        }
    }
    lookCancel() {
        this.node.active = !1, cc.director.resume(), GameData.instance.m_isWin = !1, GameData.instance.isPause = !0, 
        cc.find("Canvas").getComponent(UIManager).showUI(Globaldef.UI_NAME[Globaldef.UI_ID.E_GAME_END_UI]);
    }
    lookError() {
        2 == TankDataMgr.instance.curAdType && cc.find("Canvas").getComponent(UIManager).showTip("广告播放错误！请从新尝试", function() {
            this.node.active = !1, cc.director.resume(), GameData.instance.m_isWin = !1, GameData.instance.isPause = !0, 
            cc.find("Canvas").getComponent(UIManager).showUI(Globaldef.UI_NAME[Globaldef.UI_ID.E_GAME_END_UI]);
        });
    }
    // clickShareBtn() {
    //     cc.sys.browserType == cc.sys.BROWSER_TYPE_WECHAT_GAME && wx.shareAppMessage({
    //         title: "回味经典 重温童年 一起来战！",
    //         imageUrl: "share.jpg"
    //     });
    // }
    onEnable() {
        this.showBannerAd();
    }
    onDisable() {
        this.hideBannerAD();
    }
    showBannerAd() {
        console.log("showBannerAd")

        return;

        // if (cc.sys.browserType != cc.sys.BROWSER_TYPE_CHROME) if (!this.bannerAd) i.instance.channel == r.Channel.C_TOUTIAO ? 
        // (n = (cc.view.getFrameSize().width - 300) / 2, 
        // this.bannerAd = a.instance.createBannerAD("gl2ag6frqnp677e974", n, 110, 300)) :
        //  this.bannerAd = t.instance.createBannerAD("adunit-ca30fa67782fabd0", 20, 100, 300); else if (i.instance.channel == r.Channel.C_TOUTIAO) {
        //     var n = (cc.view.getFrameSize().width - 300) / 2;
        //     this.bannerAd = a.instance.createBannerAD("gl2ag6frqnp677e974", n, 110, 300);
        // } else this.bannerAd.show();
    }
    hideBannerAD() {
        console.log("hideBannerAD")
        return;
        // this.bannerAd && (this.bannerAd.destroy(), this.bannerAd = null, i.instance.channel == r.Channel.C_TOUTIAO || (this.bannerAd = t.instance.createBannerAD("adunit-ca30fa67782fabd0", 20, 100, 300), 
        // this.bannerAd.hide()));
    }
}
