import GameCtrl from "./GameCtrl";
import Hero_physic from "./Hero_physic";


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
export default class RayEnemy extends cc.Component {

    @property(cc.RayCastType.Any)
    rayCastType:cc.RayCastType = cc.RayCastType.Any;
    


    hero: Hero_physic = null;
    radius:number = 1000;
    @property(cc.RigidBody)
    body:cc.RigidBody = null;

    ctx:cc.Graphics = null;
    angle:number = 0;
    center:cc.Vec2 = null;
    target:cc.Vec2 = null;
    drawLine = false;

    onLoad() {
        this.ctx = this.getComponent(cc.Graphics), this.angle = 0, this.center = cc.v2(cc.winSize.width / 2, cc.winSize.height / 2), 
        this.body = this.getComponent(cc.RigidBody);
        var n = this.body.getWorldPosition(cc.v2(0,0));
        cc.log("out: ", n.x, n.y), cc.log("out: ", this.node.x, this.node.y), this.center = cc.v2(this.node.x, this.node.y);
    }
    update(a) {
        var o = this;
        this.angle += Math.PI / 10 * a;
        var e = cc.v2(0, 0);
        this.center = cc.v2(cc.winSize.width / 2, cc.winSize.height / 2);
        var n = cc.v2(Math.cos(this.angle), Math.sin(this.angle)).mulSelf(this.radius).addSelf(this.center),
         t = cc.director.getPhysicsManager().rayCast(e, n, this.rayCastType);
        this.ctx.clear(), this.rayCastType !== cc.RayCastType.Closest && this.rayCastType !== cc.RayCastType.Any || t[0] && (n = t[0].point), 
        t.forEach(function(n) {
            o.ctx.circle(n.point.x, n.point.y, 5);
        }), this.ctx.fill(), this.ctx.moveTo(e.x, e.y), this.ctx.lineTo(n.x, n.y), this.ctx.stroke();
    }
    onClosestBtnClick() {
        this.rayCastType = cc.RayCastType.Closest;
    }
    onAnyBtnClick() {
        this.rayCastType = cc.RayCastType.Any;
    }
    onAllClosestBtnClick() {
        this.rayCastType = cc.RayCastType.AllClosest;
    }
    onAllBtnClick() {
        this.rayCastType = cc.RayCastType.All;
    }

}
