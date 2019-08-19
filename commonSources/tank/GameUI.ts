
import GameCtrl from "./GameCtrl";
import GameData from "./GameData";
import TankDataMgr from "./TankDataMgr";
import GameManager from "../gamecore/managers/GameManager";
import GameUtils from "../GameUtils";
import WXUtils from "../gamecore/wechat/WXUtils";
import Globaldef from "./Globaldef";
import JoystickBG from "./JoystickBG";
import UIManager from "./UIManager";

const {ccclass, property} = cc._decorator;



@ccclass
export default class GameUI extends cc.Component {

    
    @property(cc.Label)
    score:cc.Label = null;

    @property(cc.Node)
    pauseGroup:cc.Node = null;

    @property(cc.Sprite)
    curBlood:cc.Sprite[] = [];

    @property(cc.Sprite)
    select:cc.Sprite = null;

    @property(cc.Button)
    pauseBtn:cc.Button = null;

    @property(cc.Button)
    bulletType:cc.Button[] = [];

    @property(cc.Button)
    fightBtn:cc.Button = null;

    @property(JoystickBG)
    joyStickBG:JoystickBG = null;
    


    @property(cc.Label)
    cd_time:cc.Label[] = [];


    @property(cc.Node)
    cdNode:cc.Node = null;

    // joyStickBG: n("JoystickBG")

    private bannerAd = null;
    onLoad() {
        this.bannerAd = null;
    }
    
    private gameCtrl:GameCtrl = null;
    private uiMgr = null;
    start() {
        this.refreshBg(), 0 == GameData.instance.m_curMapType && (
            15 == GameData.instance.m_curLevel || 16 == GameData.instance.m_curLevel || 17 == GameData.instance.m_curLevel ||
             18 == GameData.instance.m_curLevel || 20 == GameData.instance.m_curLevel || GameData.instance.m_curLevel);
        var n = cc.find("Canvas");
        n && (this.gameCtrl = n.getComponent(GameCtrl), this.uiMgr = n.getComponent("UIManager")), 
        this.refreshArrow(), this.refreshBulletType(TankDataMgr.instance.bulletType), this.pauseGroup.active = !1;
    }
    onEnable() {
        // a.instance.hideFeedBackButton(), a.instance.hideGameClubButton();
    }
    refreshBg() {
        1 == GameData.instance.m_curMapType ? cc.loader.loadRes("map_tex/bg_1", cc.SpriteFrame, function(a, e) {
            if (a) cc.error(a.message || a); else {
                var t = cc.find("Canvas/BackGround").getComponent(cc.Sprite);
                t && e && (t.spriteFrame = e);
            }
        }.bind(this)) : 2 == GameData.instance.m_curMapType ? 22 < GameData.instance.m_curLevel ? cc.loader.loadRes("map_tex/bg_4", cc.SpriteFrame, function(a, e) {
            if (a) cc.error(a.message || a); else {
                var t = cc.find("Canvas/BackGround").getComponent(cc.Sprite);
                t && e && (t.spriteFrame = e);
            }
        }.bind(this)) : 0 < GameData.instance.m_curLevel ? cc.loader.loadRes("map_tex/bg_3", cc.SpriteFrame, function(a, e) {
            if (a) cc.error(a.message || a); else {
                var t = cc.find("Canvas/BackGround").getComponent(cc.Sprite);
                t && e && (t.spriteFrame = e);
            }
        }.bind(this)) : cc.loader.loadRes("map_tex/bg_2", cc.SpriteFrame, function(a, e) {
            if (a) cc.error(a.message || a); else {
                var t = cc.find("Canvas/BackGround").getComponent(cc.Sprite);
                t && e && (t.spriteFrame = e);
            }
        }.bind(this)) : cc.loader.loadRes("map_tex/bg", cc.SpriteFrame, function(a, e) {
            if (a) cc.error(a.message || a); else {
                var t = cc.find("Canvas/BackGround").getComponent(cc.Sprite);
                t && e && (t.spriteFrame = e);
            }
        }.bind(this)), 
        this.bulletType[4] && this.bulletType[4].node.active = 1 != GameData.instance.m_curMapType && !(2 != GameData.instance.m_curMapType);
    }
    countDownAni() {
        if (this.refreshBg(), "level_debug" != cc.director.getScene().name) {
            GameData.instance.isPause = !0, this.cdNode.active = !0;
            for (var a = 0; a < this.cd_time.length; a++) this.cd_time[a].node.active = !1, 
            this.cd_time[a].node.scaleX = 2, this.cd_time[a].node.scaleY = 2;
            var e = 0;
            this.cd_time[e].node.active = !0;
            var t = cc.scaleTo(.5, 1), n = cc.sequence(t, cc.callFunc(function() {
                return (this.cd_time[e].node.active = !1, ++e >= this.cd_time.length) ? (this.cdNode.active = !1, 
                GameData.instance.isPause = !1, void (this.gameCtrl && this.gameCtrl.enemyManager.checkState())) : void (this.cd_time[e].node.active = !0, 
                this.cd_time[e].node.runAction(n));
            }.bind(this)));
            this.cd_time[e].node.runAction(n);
        }
    }
    playCDSound(n) {
        0 == n ? GameManager.soundsManager.playSound("countdown_one.MP3", !1,"", .5) : 1 == n ? GameManager.soundsManager.playSound("countdown_two.MP3", !1,"", .5) :
         2 == n && GameManager.soundsManager.playSound("countdown_three.MP3", !1,"", .5);
    }
    countDownAniReBorn() {
        GameData.instance.isPause = !0, this.cdNode.active = !0;
        for (var a = 0; a < this.cd_time.length; a++) this.cd_time[a].node.active = !1, 
        this.cd_time[a].node.scaleX = 2, this.cd_time[a].node.scaleY = 2;
        var e = 0;
        this.cd_time[e].node.active = !0;
        var t = cc.scaleTo(.5, 1), n = cc.sequence(t, cc.callFunc(function() {
            return (this.cd_time[e].node.active = !1, ++e >= this.cd_time.length) ? (this.cdNode.active = !1, 
            GameData.instance.isPause = !1, void (this.gameCtrl && this.gameCtrl.reBorn())) : void (this.cd_time[e].node.active = !0, 
            this.cd_time[e].node.runAction(n));
        }.bind(this)));
        this.cd_time[e].node.runAction(n);
    }
    refresh() {
        for (var a = GameData.instance.m_curBlood, e = 0; e < this.curBlood.length; e++)
            this.curBlood[e].node.color = cc.Color.BLACK;
        for (e = 0; e < a; e++) this.curBlood[e].node.color = cc.Color.WHITE;
        var t = GameData.instance.m_killRating, n = GameData.instance.m_curLevel;
        this.score.string = "第" + (n + 1) + "关\n分数 " + t;
    }
    update() {
        GameData.instance && true == GameData.instance.m_isDirty && (this.refresh(), GameData.instance.m_isDirty = !1);
    }


    private watchVideoAd(): void {
        GameUtils.instance.showVideoAd(
        () => {
            GameData.instance.isPause = !1, cc.director.resume(), TankDataMgr.instance.bulletType = Globaldef.BULLET_TYPE.E_BOMB, 
                TankDataMgr.instance.bullet_pao = 1, console.log("TankDataMgr.instance.saveData()"), this.refreshBulletType(TankDataMgr.instance.bulletType), 
                this.selectAni(this.select.node);
        },
        () => {
            GameUtils.showAlert(
            "观看完整视频",
            () => {
                this.watchVideoAd();
            },
            () => {
                GameData.instance.isPause = !1, cc.director.resume();
            }
            );
        },
        () => {
            GameUtils.instance.playFailOnShare((res: number) => {
                switch (res) {
                  case 1:
                        GameData.instance.isPause = !1, cc.director.resume(), TankDataMgr.instance.bulletType = Globaldef.BULLET_TYPE.E_BOMB, 
                        TankDataMgr.instance.bullet_pao = 1, console.log("TankDataMgr.instance.saveData()"), this.refreshBulletType(TankDataMgr.instance.bulletType), 
                        this.selectAni(this.select.node);
                    break;
                }
              }, "yuanchengpao");
        }
        );
    }


    private watchVideoAd1(): void {
        GameUtils.instance.showVideoAd(
        () => {
            GameData.instance.isPause = !1, cc.director.resume(), TankDataMgr.instance.bulletType = Globaldef.BULLET_TYPE.E_FLLOW, 
            TankDataMgr.instance.bullet_fllow = 1, TankDataMgr.instance.saveData("watchVideoAd1"), this.refreshBulletType(TankDataMgr.instance.bulletType), 
            this.selectAni(this.select.node);
        },
        () => {
            GameUtils.showAlert(
            "观看完整视频",
            () => {
                this.watchVideoAd1();
            },
            () => {
                GameData.instance.isPause = !1, cc.director.resume();
            }
            );
        },
        () => {
            GameUtils.instance.playFailOnShare((res: number) => {
                switch (res) {
                  case 1:
                        GameData.instance.isPause = !1, cc.director.resume(), TankDataMgr.instance.bulletType = Globaldef.BULLET_TYPE.E_FLLOW, 
                        TankDataMgr.instance.bullet_fllow = 1, TankDataMgr.instance.saveData("watchVideoAd1"), this.refreshBulletType(TankDataMgr.instance.bulletType), 
                        this.selectAni(this.select.node);
                    break;
                }
              }, "yuanchengpao");
        }
        );
    }

    private watchVideoAd2(): void {
        GameUtils.instance.showVideoAd(
        () => {
            GameData.instance.isPause = !1, cc.director.resume(), TankDataMgr.instance.bulletType = Globaldef.BULLET_TYPE.E_POWER_BOMB, 
            TankDataMgr.instance.bullet_power = 1, TankDataMgr.instance.saveData("---dd 004"), this.refreshBulletType(TankDataMgr.instance.bulletType), 
            this.selectAni(this.select.node);
        },
        () => {
            GameUtils.showAlert(
            "观看完整视频",
            () => {
                this.watchVideoAd2();
            },
            () => {
                console.log("---dd watchVideoAd2"), GameData.instance.isPause = !1, cc.director.resume();
            }
            );
        },
        () => {
            GameUtils.instance.playFailOnShare((res: number) => {
                switch (res) {
                  case 1:
                        GameData.instance.isPause = !1, cc.director.resume(), TankDataMgr.instance.bulletType = Globaldef.BULLET_TYPE.E_POWER_BOMB, 
                        TankDataMgr.instance.bullet_power = 1, TankDataMgr.instance.saveData("---dd 004"), this.refreshBulletType(TankDataMgr.instance.bulletType), 
                        this.selectAni(this.select.node);
                    break;
                }
              }, "yuanchengpao");
        }
        );
    }

    private watchVideoAd3(): void {
        GameUtils.instance.showVideoAd(
        () => {
            GameData.instance.isPause = !1, cc.director.resume(), TankDataMgr.instance.bulletType = Globaldef.BULLET_TYPE.E_THREE, 
            TankDataMgr.instance.bullet_three = true, TankDataMgr.instance.saveData("-xx 004"), this.refreshBulletType(TankDataMgr.instance.bulletType), 
            this.selectAni(this.select.node);
        },
        () => {
            GameUtils.showAlert(
            "观看完整视频",
            () => {
                this.watchVideoAd3();
            },
            () => {
                console.log("---dd watchVideoAd3"), GameData.instance.isPause = !1, cc.director.resume();
            }
            );
        },
        () => {
            GameUtils.instance.playFailOnShare((res: number) => {
                switch (res) {
                  case 1:
                        GameData.instance.isPause = !1, cc.director.resume(), TankDataMgr.instance.bulletType = Globaldef.BULLET_TYPE.E_THREE, 
                        TankDataMgr.instance.bullet_three = true, TankDataMgr.instance.saveData("-xx 004"), this.refreshBulletType(TankDataMgr.instance.bulletType), 
                        this.selectAni(this.select.node);
                    break;
                }
              }, "yuanchengpao");
        }
        );
    }




    onClickBullet(n) {
        if (n.currentTarget == this.bulletType[0].node) TankDataMgr.instance.bulletType = Globaldef.BULLET_TYPE.E_ONE;
         else if (!(n.currentTarget == this.bulletType[1].node)) n.currentTarget == this.bulletType[2].node ?
          1 == TankDataMgr.instance.bullet_pao ? TankDataMgr.instance.bulletType = Globaldef.BULLET_TYPE.E_BOMB :
           ((GameData.instance.isPause = !0, 
        !this.uiMgr || 0 == this.uiMgr.isValid) && (e = cc.find("Canvas"), this.gameCtrl = e.getComponent(GameCtrl), 
        this.uiMgr = e.getComponent(UIManager)), this.uiMgr.showTipOKCancel("看视频可以解锁 远程炮！\n可以攻击无法到达的区域！", function() {
            console.log("---bb 001"), false ? (
                this.watchVideoAd()
            ) : true ? this.watchVideoAd():{}}.bind(this), function() {
            GameData.instance.isPause = !1, cc.director.resume();
        }.bind(this)), cc.director.pause()) : n.currentTarget == this.bulletType[3].node ? 1 == TankDataMgr.instance.bullet_fllow ? 
        TankDataMgr.instance.bulletType = Globaldef.BULLET_TYPE.E_FLLOW : ((GameData.instance.isPause = !0, 
        !this.uiMgr || 0 == this.uiMgr.isValid) && (e = cc.find("Canvas"), this.gameCtrl = e.getComponent(GameCtrl), 
        this.uiMgr = e.getComponent(UIManager)), this.uiMgr.showTipOKCancel("看视频可以解锁 跟踪炮！\n可以追踪敌方！", function() {
            console.log("---cc 001"), false ? {} : true ? this.watchVideoAd1() : {};
        }.bind(this),
        function() {
            GameData.instance.isPause = !1, cc.director.resume();
        }.bind(this)), cc.director.pause()) : n.currentTarget == this.bulletType[4].node && (1 == TankDataMgr.instance.bullet_power ?
             TankDataMgr.instance.bulletType = Globaldef.BULLET_TYPE.E_POWER_BOMB : ((GameData.instance.isPause = !0, 
        !this.uiMgr || 0 == this.uiMgr.isValid) && (e = cc.find("Canvas"), this.gameCtrl = e.getComponent(GameCtrl), 
        this.uiMgr = e.getComponent(UIManager)), this.uiMgr.showTipOKCancel("看视频可以解锁 超级炮！\n横扫一切障碍物！", function() {
            console.log("---dd 001"), false ? {} : cc.sys.browserType == cc.sys.BROWSER_TYPE_WECHAT_GAME ? this.watchVideoAd2() :
             (GameData.instance.isPause = !1, cc.director.resume(), TankDataMgr.instance.bulletType = Globaldef.BULLET_TYPE.E_POWER_BOMB, 
            TankDataMgr.instance.bullet_power = 1, TankDataMgr.instance.saveData("nnnnnnnn1"), this.refreshBulletType(TankDataMgr.instance.bulletType), 
            this.selectAni(this.select.node));
        }.bind(this), function() {
            GameData.instance.isPause = !1, cc.director.resume();
        }.bind(this)), cc.director.pause())); else if (true == TankDataMgr.instance.bullet_three) TankDataMgr.instance.bulletType = Globaldef.BULLET_TYPE.E_THREE; 
        else {
            if (GameData.instance.isPause = !0, !this.uiMgr || 0 == this.uiMgr.isValid) {
                var e = cc.find("Canvas");
                this.gameCtrl = e.getComponent(GameCtrl), this.uiMgr = e.getComponent(UIManager);
            }
            this.uiMgr.showTipOKCancel("看视频可以解锁 三连发！\n火力超强！", function() {
                console.log("---xx 001"), false ? {} : cc.sys.browserType == cc.sys.BROWSER_TYPE_WECHAT_GAME ?
                 this.watchVideoAd3() :(GameData.instance.isPause = !1, cc.director.resume(), TankDataMgr.instance.bulletType = Globaldef.BULLET_TYPE.E_THREE, 
                TankDataMgr.instance.bullet_three = true, 
                TankDataMgr.instance.saveData("nnnnnnn2"),
                 this.refreshBulletType(TankDataMgr.instance.bulletType), 
                this.selectAni(this.select.node));
            }.bind(this), function() {
                GameData.instance.isPause = !1, cc.director.resume();
            }.bind(this)), cc.director.pause();
        }
        this.refreshBulletType(TankDataMgr.instance.bulletType);
    }

    private videoAd:any = null;
    lookRebornAD(a, o, t) {
    }
    refreshBulletType(n) {
        // return;
        var e;
        true == TankDataMgr.instance.bullet_three && (e = this.bulletType[1].node.getChildByName("lock")) && (e.active = !1), 
        1 == TankDataMgr.instance.bullet_pao && (e = this.bulletType[2].node.getChildByName("lock")) && (e.active = !1), 
        1 == TankDataMgr.instance.bullet_fllow && (e = this.bulletType[3].node.getChildByName("lock")) && (e.active = !1), 
        1 == TankDataMgr.instance.bullet_power && (e = this.bulletType[4].node.getChildByName("lock")) && (e.active = !1), 
        n == Globaldef.BULLET_TYPE.E_ONE ? (
            this.select.node.x = this.bulletType[0].node.x, this.select.node.y = this.bulletType[0].node.y) : n == Globaldef.BULLET_TYPE.E_THREE ?
             (this.select.node.x = this.bulletType[1].node.x, 
        this.select.node.y = this.bulletType[1].node.y) : n == Globaldef.BULLET_TYPE.E_BOMB ? (this.select.node.x = this.bulletType[2].node.x, 
        this.select.node.y = this.bulletType[2].node.y) : n == Globaldef.BULLET_TYPE.E_FLLOW ? (this.select.node.x = this.bulletType[3].node.x, 
        this.select.node.y = this.bulletType[3].node.y) : n == Globaldef.BULLET_TYPE.E_POWER_BOMB && (this.select.node.x = this.bulletType[4].node.x, 
        this.select.node.y = this.bulletType[4].node.y);
    }
    selectAni(a) {
        var e = cc.scaleTo(.5, 2);
        e.easing(cc.easeBackIn());
        var t = cc.sequence(e, cc.callFunc(function() {
            var e = cc.scaleTo(.5, 1);
            a.runAction(e);
        }.bind(this)));
        a.runAction(t);
    }
    onClickPause() {
        this.pauseGroup.active = !0, this.showBannerAd(), cc.director.pause();
    }
    clickMenuBtn() {
        this.hideBannerAD(), GameData.instance.reset(), cc.director.loadScene("mainScene"), cc.director.resume();
    }
    clickRetryBtn() {
        this.pauseGroup.active = !1, this.hideBannerAD(), GameData.instance.reset(), cc.find("Canvas").getComponent(GameCtrl).reset(), 
        this.countDownAni(), cc.director.resume();
    }
    clickContinueBtn() {
        this.pauseGroup.active = !1, this.hideBannerAD(), cc.director.resume();
    }
    clickUseFightBtn(n) {
        console.log(n), TankDataMgr.instance.useFightBtn = 1 == n.isChecked ? 1 : 0, this.refreshArrow();
    }
    clickFightBtn() {
        var n = this.gameCtrl.hero.curMoveDir;
        n.normalizeSelf();
        var e = this.gameCtrl.hero.node.getPosition().add(cc.v2(n.x, n.y).mulSelf(200));
        TankDataMgr.instance.bulletType == Globaldef.BULLET_TYPE.E_ONE ? this.gameCtrl.hero.fire(n, e, this.gameCtrl.bgImg.node) :
         TankDataMgr.instance.bulletType == Globaldef.BULLET_TYPE.E_THREE ? this.gameCtrl.hero.fireThree(n, e, this.gameCtrl.bgImg.node) :
          TankDataMgr.instance.bulletType == Globaldef.BULLET_TYPE.E_BOMB ?
         this.gameCtrl.hero.firePao(n, e, this.gameCtrl.bgImg.node) : TankDataMgr.instance.bulletType == Globaldef.BULLET_TYPE.E_FLLOW ?
          this.gameCtrl.hero.fireFllow(n, e, this.gameCtrl.bgImg.node) : TankDataMgr.instance.bulletType == Globaldef.BULLET_TYPE.E_POWER_BOMB &&
           this.gameCtrl.hero.firePowerBomb(n, e, this.gameCtrl.bgImg.node);
    }
    refreshArrow() {
        1 == TankDataMgr.instance.useFightBtn ? (this.gameCtrl.hero.arrNode.active = !0, this.fightBtn.node.active = !0) : (this.gameCtrl.hero.arrNode.active = !1, 
        this.fightBtn.node.active = !1);
    }
    clickPassBtn() {
        cc.director.resume(), this.pauseGroup.active = false;
        this.gameCtrl.enemyManager.removeAll(), 
        this.gameCtrl.checkGameState();
    }
    showBannerAd() {
        //cc.sys.browserType != cc.sys.BROWSER_TYPE_CHROME && (i ? this.bannerAd ? false ? this.bannerAd = o.instance.createBannerAD("gl2ag6frqnp677e974", 100, 110, 300) : this.bannerAd.show() : TankDataMgr.instance.channel == l.Channel.C_TOUTIAO ? this.bannerAd = o.instance.createBannerAD("gl2ag6frqnp677e974", 100, 110, 300) : this.bannerAd = a.instance.createBannerAD("adunit-ca30fa67782fabd0", 20, 100, 300) : console.log("userData error!"));
    }
    hideBannerAD() {
        // this.bannerAd && (this.bannerAd.destroy(), this.bannerAd = null, false || (this.bannerAd = a.instance.createBannerAD("adunit-ca30fa67782fabd0", 20, 100, 300), 
        // this.bannerAd.hide()));

    }
}