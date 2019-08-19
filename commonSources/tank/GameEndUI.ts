import GameData from "./GameData";
import SoundMgr from "../SoundMgr";
import TankDataMgr from "./TankDataMgr";
import GameCtrl from "./GameCtrl";
import GameUtils from "../GameUtils";

const {ccclass, property} = cc._decorator;



@ccclass
export default class GameEndUI extends cc.Component {

    @property(cc.Sprite)
    winImg:cc.Sprite = null;

    @property(cc.Sprite)
    failImg:cc.Sprite = null;

    @property(cc.Button)
    menuBtn:cc.Button = null;

    @property(cc.Button)
    reTryBtn:cc.Button = null;

    @property(cc.Button)
    nextBtn:cc.Button = null;

    @property(cc.Label)
    proName:cc.Label[] = [];

    @property(cc.Label)
    proValue:cc.Label[] = [];

    @property(cc.Node)
    stars:cc.Node[] = [];

    onEnable() {
        this.refresh();
    }
    refresh() {
        console.log("xxxxx    gameEndUI");
        var a = 100 * (GameData.instance.m_curLevel + 1), e = 100 * GameData.instance.m_curMaxMon, t = a + 300 + 1e3 + e, n = 0, c = 0, o = 0, r = 0, l = 0, p = 3;
        if (GameData.instance.m_isWin) {
            this.winImg.node.active = !0, this.failImg.node.active = !1, l = (n = a) + (c = 300) + (o = 3 == GameData.instance.m_curBlood ? 1e3 : parseInt("" + 1e3 / 3 * GameData.instance.m_curBlood)) + (r = e), 
            this.nextBtn.node.active = !0,
            //  this.menuBtn.node.x = -390,
            //   this.reTryBtn.node.x = 0, 
            // this.nextBtn.node.x = 390, 
            p = l >= t ? 3 : l >= t / 2 ? 2 : 1, this.showStar(p);
            var g = GameData.instance.m_curMapType;
            TankDataMgr.instance.setLevelData(GameData.instance.m_curLevel, 1, t, p, g), 39 <= GameData.instance.m_curLevel && (
                this.nextBtn.node.active = !1
            // this.menuBtn.node.x = -300,
            //  this.reTryBtn.node.x = 300
             ), SoundMgr.instance.playWinBg();



             let data = JSON.stringify({mode:GameData.instance.m_curMapType, level:TankDataMgr.instance.getData(TankDataMgr.KEY_CUR_STAGE_NUM)});
             // console.log(t,'==t==');
             GameUtils.buriedPoint(3,data);

        } else this.winImg.node.active = !1, this.failImg.node.active = !0, n = 0, c = 0, 
        o = 0, r = 0, l = 0, this.nextBtn.node.active = !1,
        //  this.menuBtn.node.x = -300, 
        // this.reTryBtn.node.x = 300,
         p = 0, SoundMgr.instance.playLoseBg();
        this.proValue[0].string = n + " / " + a, this.proValue[1].string = c + " / 300", 
        this.proValue[2].string = o + " / 1000", this.proValue[3].string = r + " / " + e, 
        this.proValue[4].string = l + " / " + t;
    }
    clickMenuBtn() {
        GameData.instance.reset(), cc.director.loadScene("mainScene");
    }
    clickRetryBtn() {
        SoundMgr.instance.playGameBg(), this.node.active = !1, GameData.instance.reset(), cc.find("Canvas").getComponent(GameCtrl).reset();
        var n, e = cc.find("Canvas/GameUI");
        e ? (n = e.getComponent("GameUI")) && n.countDownAni() : (e = cc.find("Canvas/GameNewUI")) && (n = e.getComponent("GameNewUI")) && n.countDownAni();
    }
    clickNextBtn() {
        // SoundMgr.instance.stopAll();
        var n = cc.find("Canvas").getComponent(GameCtrl);
        n.reset();
        GameData.instance.m_curLevel++;
        var e = GameData.instance.m_curLevel;


        TankDataMgr.instance.setData(TankDataMgr.KEY_CUR_STAGE_NUM,TankDataMgr.instance.getData(TankDataMgr.KEY_CUR_STAGE_NUM) + 1);

        cc.log("loadLevel: " + e);
        n.loadLevel(e);
    }
    showStar(a) {
        for (var e = 0; e < this.stars.length; e++) this.stars[e].active = !1, this.stars[e].scaleX = 2, 
        this.stars[e].scaleY = 2;
        var o = cc.scaleTo(.3, 1);
        if (o.easing(cc.easeBackIn()), 1 <= a) {
            this.stars[0].active = !0;
            var n = cc.sequence(o, cc.callFunc(function() {
                if (2 <= a) {
                    this.stars[1].active = !0;
                    var e = cc.sequence(o, cc.callFunc(function() {
                        if (39 <= GameData.instance.m_curLevel) {
                            var e = cc.find("Canvas").getComponent("UIManager");
                            0 == GameData.instance.m_curMapType ? e.showTip("????? \n???? ???? \n??? ???? ???", function() {
                                this.clickMenuBtn();
                            }.bind(this)) : 1 == GameData.instance.m_curMapType && e.showTip("????? \n???? ??? \n??? ???? ???", function() {
                                this.clickMenuBtn();
                            }.bind(this));
                        }
                        3 <= a && (this.stars[2].active = !0, this.stars[2].runAction(o));
                    }.bind(this)));
                    this.stars[1].runAction(e);
                }
            }.bind(this)));
            this.stars[0].runAction(n);
        }
    }
    clickShareBtn() {
        cc.sys.browserType == cc.sys.BROWSER_TYPE_WECHAT_GAME && wx.shareAppMessage({
            title: "回味经典 重温童年 一起来战！",
            imageUrl: "share.jpg"
        });
    }
}