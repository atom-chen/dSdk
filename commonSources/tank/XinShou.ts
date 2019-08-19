import GameCtrl from "./GameCtrl";
import TankDataMgr from "./TankDataMgr";
import GameData from "./GameData";


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
export default class XinShou extends cc.Component {


    @property(cc.Node)
    clickCircle:cc.Node = null;

    @property(cc.Node)
    hand:cc.Node = null;

    ctrl:GameCtrl = null;

    start() {
        
        if (true != TankDataMgr.instance.finish_xinshou) {
            GameData.instance.curStep = 0;
            var n = cc.find("Canvas");
            this.ctrl = n.getComponent("GameCtrl"), this.clickCircle.active = !1, this.hand.active = !1, 
            this.scheduleOnce(this.refresh, .5), this.refresh();
        } else this.node.active = !1;
    }
    refresh() {
        this.clickCircle.active = !0, this.hand.active = !0, 0 == GameData.instance.curStep ? (this.clickCircle.setPosition(cc.v2(410, -149)), 
        this.hand.setPosition(cc.v2(532, -176)), this.hand.scaleX = -1) : 1 == GameData.instance.curStep && (this.clickCircle.setPosition(cc.v2(-20, -149)), 
        this.hand.setPosition(cc.v2(-146, -176)), this.hand.scaleX = 1);
    }
    onClick(n) {
        var e = cc.find("Canvas");
        return (e.getComponent("GameCtrl").onTouch(n), GameData.instance.curStep++, 2 <= GameData.instance.curStep) ? (TankDataMgr.instance.setData("finish_xinshou", 1), 
        e.getComponent("UIManager").showTip("点击屏幕 任意位置 \n即可发射炮弹！", function() {
            TankDataMgr.instance.finish_xinshou = true;
            var n = cc.find("Canvas/GameUI");
            if (n) {
                var e = n.getComponent("GameUI");
                e && e.countDownAni();
            }
        }.bind(this)), void (this.node.active = !1)) : void this.scheduleOnce(this.refresh, 1);
    }

}
