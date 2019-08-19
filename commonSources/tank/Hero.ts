
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
export default class Hero extends cc.Component {
    
    onLoad() {
        var n = this;
        this.node.on("mousedown", function() {
            console.log("Hello!");
        }), cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this), 
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        var e = cc.director.getCollisionManager();
        e.enabled = true, e.enabledDebugDraw = true
        //  cc.systemEvent.on(cc.EventListener.TOUCH_ONE_BY_ONE,
        //     onTouchBegan: function(e) {
        //         var t = e.getLocation();
        //         return n.title.string = cc.Intersection.pointInPolygon(t, n.polygonCollider.world.points) ? "Hit" : "Not hit", 
        //         true;
        //     }
        // }, this.node);
    }
    onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this), cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }
    start() {}
    update() {}
    onKeyDown(n) {
        switch (n.keyCode) {
          case cc.macro.KEY.w:
            console.log("Press w key"), this.node.y += 6;
            break;

          case cc.macro.KEY.s:
            console.log("Press s key"), this.node.y -= 6;
            break;

          case cc.macro.KEY.a:
            console.log("Press a key");
            break;

          case cc.macro.KEY.d:
            console.log("Press d key");
        }
    }
    onKeyUp(n) {
        switch (n.keyCode) {
          case cc.macro.KEY.a:
            console.log("release a key");
        }
    }
    touchingNumber:number = 0;
    collisionX:number = 0;
    jumping:boolean = false;
    collisionY:number = 0;
    onCollisionEnter(o, e) {
        console.log("on collision enter"), this.node.color = cc.Color.RED, this.node.color = cc.Color.RED, 
        this.touchingNumber++;
        var t = o.world.aabb, n = o.world.preAabb.clone(), i = e.world.aabb, r = e.world.preAabb.clone();
        return (r.x = i.x, n.x = t.x, cc.Intersection.rectRect(r, n)) ? (r.xMax > n.xMax ? (this.node.x = n.xMax - this.node.parent.x, 
        this.collisionX = -1) : r.xMin < n.xMin && (this.node.x = n.xMin - r.width - this.node.parent.x, 
        this.collisionX = 1), void (o.touchingX = !0)) : void (r.y = i.y, n.y = t.y, cc.Intersection.rectRect(r, n) && (r.yMax > n.yMax ? (this.node.y = n.yMax - this.node.parent.y, 
        this.jumping = !1, this.collisionY = -1) : r.yMin < n.yMin && (this.node.y = n.yMin - r.height / 2, 
        this.collisionY = 1), o.touchingY = !0));
    }
    onCollisionStay(o, e) {
        console.log("on collision stay"), this.node.color = cc.Color.RED, this.touchingNumber++;
        var t = o.world.aabb, n = o.world.preAabb.clone(), i = e.world.aabb, r = e.world.preAabb.clone();
        return (r.x = i.x, n.x = t.x, cc.Intersection.rectRect(r, n)) ? (r.xMax > n.xMax ? (this.node.x = n.xMax - this.node.parent.x, 
        this.collisionX = -1) : r.xMin < n.xMin && (this.node.x = n.xMin - r.width - this.node.parent.x, 
        this.collisionX = 1), void (o.touchingX = !0)) : void (r.y = i.y, n.y = t.y, cc.Intersection.rectRect(r, n) && (r.yMax > n.yMax ? (this.node.y = n.yMax - this.node.parent.y, 
        this.jumping = !1, this.collisionY = -1) : r.yMin < n.yMin && (this.node.y = n.yMin - r.height / 2, 
        this.collisionY = 1), o.touchingY = !0));
    }
    onCollisionExit() {
        console.log("on collision exit");
    }
}
