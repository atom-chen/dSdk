import GameCtrl from "./GameCtrl";
import Globaldef from "./Globaldef";
import GameData from "./GameData";
import EffManager from "./EffManager";
import Raycast from "./Raycast";

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
export default class Bullet_fllow extends cc.Component {

    // rayPrefab: cc.Prefab = null;
    moveDir: any = null;
    startMove:boolean = false;
    moveSpeed:number = 200;
    enemyManager:any = null



    rayComPonent:any =  null;

    @property(cc.Prefab)
    bombPrefab:cc.Prefab = null;
    
    @property(Number)
    canColNum:number = 2;
    
    @property(cc.Sprite)
    sprite:cc.Sprite = null;

    @property(cc.RigidBody)
    body:cc.RigidBody = null;
    
    @property(cc.PhysicsBoxCollider)
    collider:cc.PhysicsBoxCollider = null;

    ray:any = null;

    @property(cc.Prefab)
    rayPrefab:cc.Prefab = null;


    bullet_type:number = 0;
    // LIFE-CYCLE CALLBACKS:

    private gameCtrl:GameCtrl = null;
    onLoad() {
        this.body = this.getComponent(cc.RigidBody);
        this.collider = this.getComponent(cc.PhysicsBoxCollider);
        var n = cc.find("Canvas/bg/EnemyManager");
        this.enemyManager = n.getComponent("EnemyManager");
        var Canvas = cc.find("Canvas");
        this.gameCtrl = Canvas.getComponent(GameCtrl);
    }

    start () {
        this.addRay();
    }
    refreshAngle() {
        var a = cc.v2(this.moveDir.x * this.moveSpeed, this.moveDir.y * this.moveSpeed), e = cc.v2(1, 0), t = Math.atan2(a.y - e.y, a.x - e.x) * (180 / Math.PI);
        cc.log("refreshAngle: " + -t), this.sprite.node.rotation = -t;
    }


    private target = null;
    update(a) {
        if (this.rayComPonent) {
            var e = this.node.getPosition();
            if (this.target = this.enemyManager.getEnemyNearest(this.node.getPosition()), null != this.target) {
                var o = this.target.node.getPosition().sub(e);
                o.normalizeSelf(),console.log("cccc"),  this.rayComPonent.setCenter(e.addSelf(o.mulSelf(10))), this.target.isDead ? this.rayComPonent.setTarget(0, 0) : this.rayComPonent.setTarget(this.target.node.x, this.target.node.y);
            }
        }
        if (this.rayComPonent && this.rayComPonent.curCollider) switch (this.rayComPonent.curCollider.tag) {
          case Globaldef.TagType.WALL:
            this.target = null;
            break;

          case Globaldef.TagType.ENEMY:
            break;

          case Globaldef.TagType.HERO:
          case Globaldef.TagType.ITEM:
            this.target = null;
        }
        this.startMove && this.move(a);
    }
    move(l) {
        var e = this.node.getPosition().add(this.moveDir.mul(this.moveSpeed * l));
        if (this.node && this.node.setPosition(e), this.target) {
            var t = this.target.node.getPosition().subSelf(e);
            t.normalizeSelf();
            var n = this.moveDir, i = this.moveDir.x * t.x + this.moveDir.y * t.y;
            if (.1 > i) return this.moveDir.x = t.x, void (this.moveDir.y = t.y);
            0 > (a = Math.atan2(t.y, t.x) - Math.atan2(n.y, n.x)) && (a += 180);
            var s = 180 * a / Math.PI;
            if (cc.log("A " + a + " dot: " + i + " angle: " + s), !(5 >= Math.abs(s - 180) && 0 <= i)) {
                a = 2 * (a * l);
                var a, d = this.moveDir.x * Math.cos(a) - this.moveDir.y * Math.sin(a), o = this.moveDir.x * Math.sin(a) + this.moveDir.y * Math.cos(a);
                this.moveDir.x = d, this.moveDir.y = o, this.refreshAngle();
            }
        }
    }

    // x = null
    // y = null
    // test_1(d) {
    //     var e = d, t = cc.v2(this.x, this.y), n = e.sub(t), i = t.sub(e).mag(), s = t.x + 5 * n.x / i, a = t.y + 5 * n.y / i;
    //     if (100 >= i) return !0;
    //     var c = cc.v2(s, a);
    //     this.node && this.node.setPosition(c);
    //     var o = t.x, r = t.y;
    //     return Math.atan2(a - r, s - o), Math.PI, !1;
    // }
    onPreSolve(s, e, l) {
        var n = s.colliderA.tag;
        switch (this.collider == s.colliderA && (n = s.colliderB.tag), n) {
          case Globaldef.TagType.WALL:
            break;

          case Globaldef.TagType.ENEMY:
            if (this.collider.tag == Globaldef.TagType.BULLET_HERO) {
                EffManager.instance.addHitEff(this.node.getPosition(), this.node), this.node.active = !1;
                var a = l.getComponent("Enemy");
                return void (a && a.onHP(-1));
            }
            this.collider.tag, Globaldef.TagType.BULLET_ENEMY;
            break;

          case Globaldef.TagType.HERO:
            if (this.collider.tag == Globaldef.TagType.BULLET_HERO){} else if (this.collider.tag == Globaldef.TagType.BULLET_ENEMY) {
                EffManager.instance.addHitEff(this.node.getPosition(), this.node), this.node.active = !1;
                var d = l.getComponent("Hero_physic");
                d && d.onHP(-1);
            }
            break;

          case Globaldef.TagType.ITEM:
            if (this.collider.tag == Globaldef.TagType.BULLET_HERO || this.collider.tag == Globaldef.TagType.BULLET_ENEMY) {
                EffManager.instance.addHitEff(this.node.getPosition(), this.node), this.node.active = !1;
                var o = l.getComponent("EnemyItem");
                o && o.onHP(-1);
            }
        }
        this.canColNum -= 3, 0 >= this.canColNum && (EffManager.instance.addHitEff(this.node.getPosition(), this.node), 
        this.node.active = !1, this.node.destroy());
    }

    addBombEff() {
        var n = cc.instantiate(this.bombPrefab);
        n && (n.parent = this.node.parent, n.setPosition(this.node.x, this.node.y));
    }
    addRay() {
        this.ray = cc.instantiate(this.rayPrefab), this.ray.parent = this.gameCtrl.bgImg.node, 
        this.rayComPonent = this.ray.getComponent(Raycast), this.node.getPosition(), 
        this.node.convertToWorldSpaceAR(cc.v2(0, 0)),
        
        console.log("nnnnn")
        this.rayComPonent.setCenter(this.node.x, this.node.y);
        var n = this.enemyManager.getEnemyNearest(this.node.getPosition());
        this.rayComPonent.setTarget(n.node.x, n.node.y), this.ray.setPosition(0, 0);
    }
    onDestroy() {
        this.ray && this.ray.destroy();
    }

    // update (dt) {}
}
