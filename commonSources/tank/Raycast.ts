

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
export default class Raycast extends cc.Component {



    @property(cc.RayCastType.Any)
    rayCastType:cc.RayCastType = 0;


    // @property(cc.PhysicsBoxCollider)
    // curCollider:cc.PhysicsBoxCollider = null;
    curCollider:any = null;

    @property(Number)
    radius:number = 1000;
    


    ctx:cc.Graphics = null;
    angle:number = 0;
    center:cc.Vec2 = null;
    target:cc.Vec2 = null;
    drawLine = false;
    onLoad() {
        
        this.ctx = this.getComponent(cc.Graphics), 
        this.angle = 0,
        this.center = cc.v2(cc.winSize.width / 2, cc.winSize.height / 2), 
        this.center = cc.v2(699, 184), this.target = cc.v2(799, 284), this.rayCastType = cc.RayCastType.Closest, 
        this.drawLine = !1;
    }
    setCenter(n, e:number = 0) {
        // console.error(e,"setCenter 参数为0 ！")
        this.center = cc.v2(n, e);
    }
    setTarget(n, e) {
        this.target = cc.v2(n, e);
    }
    update(o) {
        var r = this;
        this.angle += Math.PI / 10 * o;
        var e = this.center, n = this.target, t = this.node.parent.convertToWorldSpaceAR(e), i = this.node.parent.convertToWorldSpaceAR(n),
         a = cc.director.getPhysicsManager().rayCast(t, i, this.rayCastType);
        true == this.drawLine && this.ctx.clear(), this.rayCastType !== cc.RayCastType.Closest && this.rayCastType !== cc.RayCastType.Any ||
         (a[0] ? (n = a[0].point, 
        this.curCollider = a[0].collider) : this.curCollider = null), true == this.drawLine && (a.forEach(function(n) {
            r.ctx.circle(n.point.x, n.point.y, 5);
        }), this.ctx.fill(), this.ctx.moveTo(e.x, e.y), this.ctx.lineTo(n.x, n.y), this.ctx.stroke());
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
