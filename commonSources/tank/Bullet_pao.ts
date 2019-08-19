import EffManager from "./EffManager";
import Globaldef from "./Globaldef";

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
export default class Bullet_pao extends cc.Component {
    @property(cc.Prefab)
    bombPrefab:cc.Prefab = null;
    
    @property(Number)
    bomb_radius:number = 2;
    
    @property(Number)
    checkType:number = 3;


    bullet_type = null;

    private targetObj:cc.Node = null;
    onDisable() {
        this.targetObj && (this.targetObj.active = !1);
    }
    setTargetType(n) {
        this.checkType = n;
    }
    setTarget(i, e) {
        this.showTargetCircle(e);
        var s = Math.sqrt(Math.pow(i.x - this.node.x, 2) + Math.pow(i.y - this.node.y, 2)), n = s / 300;
        cc.log("touchPos: ", i.x, i.y),
        cc.log("localPos: ", this.node.x, this.node.y), 
        cc.log("dis: " + s + " t:" + n);
        var p = s / 4;
        200 < p && (p = 200), 0 > i.x && (p *= -1);
        var c = cc.v2(i.x - this.node.x + i.x, i.y - this.node.y + i.y).normalize().rotateSelf(1.5707964);
        var o = cc.v2(0-this.node.x, 0- this.node.y).addSelf(c.mulSelf(p));

        

        // o.x += (i.x - this.node.x + i.x) / 2, o.y += (i.y - this.node.y + i.y) / 2;
        // o = cc.v2(-i.x + this.node.x + i.x - 130,i.y)
        o = cc.v2(i.x,i.y);


        // console.log(o,'ooooooooooooooooooooooooo')
        var r = [cc.v2(this.node.x, this.node.y), o, cc.v2(i.x, i.y) ];
        var l = cc.bezierTo(n, r);



        // var l = cc.moveTo(2,cc.v2(i.x,i.y));
        var g = cc.sequence(l, cc.callFunc(function() {
            cc.log("end"), EffManager.instance.addHitEff(this.node.getPosition(), this.node), this.node.active = !1, 
            this.checkType == Globaldef.TagType.ENEMY ? this.checkEnemy() : this.checkType == Globaldef.TagType.HERO && this.checkHero();
        }.bind(this)));
        this.node.runAction(g);
    }

    private targetPrefab:cc.Prefab = null;
    showTargetCircle(a) {
        if (this.targetPrefab) {
            var e = cc.instantiate(this.targetPrefab), o = this.node.parent.getChildByName("downNode");
            e.parent = o, e.setPosition(a), this.targetObj = e, this.targetObj.active = !0, 
            cc.Node;
        } else {
            var n = "target_hero";
            this.checkType == Globaldef.TagType.HERO && (n = "target"), cc.loader.loadRes("prefabs/" + n, function(e, t) {
                if (e) cc.error(e.message || e); else {
                    this.targetPrefab = t;
                    var n = cc.instantiate(t), o = this.node.parent.getChildByName("downNode");
                    n.parent = o, n.setPosition(a), this.targetObj = n, this.targetObj.active = !0;
                }
            }.bind(this));
        }
    }
    checkEnemy() {
        for (var o = cc.find("Canvas/bg/EnemyManager").getComponent("EnemyManager"), e = 0; e < o.getEnemyCount(); e++) {
            var t = o.getEnemyByIdx(e), n = this.node.getPosition(), i = t.getPosition();
            if (40 > n.sub(i).mag() && t) {
                var r = t.getComponent("Enemy");
                r && r.onHP(-3);
            }
        }
        this.targetObj && (this.targetObj.active = !1);
    }
    checkHero() {
        var a = cc.find("Canvas").getComponent("GameCtrl"), e = this.node.getPosition(), t = a.hero.node.getPosition();
        40 > e.sub(t).mag() && a.hero.onHP(-3), this.targetObj && (this.targetObj.active = !1);
    }
    addBombEff() {
        var n = cc.instantiate(this.bombPrefab);
        n && (n.parent = this.node.parent, n.setPosition(this.node.x, this.node.y)), this.targetObj && (this.targetObj.active = !1);
    }
}
