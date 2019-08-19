import Common from "./Common";

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
export default class CircleNode extends cc.Component {

    @property(Boolean)
    tntTrigger:Boolean = false;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    onBeginContact = function(e, t, o) {
        // console.log(o.tag,"tagCircleNode")
        if (o.tag == Common.Tag.tagBullet && t.tag == Common.Tag.tagNone) {
            var l = e.getWorldManifold().points[0], a = o.node.getComponent(cc.RigidBody).linearVelocity.normalize();
            this.scheduleOnce(function() {
                this.node.getComponent(cc.RigidBody).type = cc.RigidBodyType.Dynamic,
                this.node.getComponent(cc.RigidBody).applyLinearImpulse(a.mul(1e3),
                 l, true);
            }, 0);
        }
        if (o.tag == Common.Tag.tagTNT) {
            this.tntTrigger = true;
            e.getWorldManifold().points[0];
            var i = o.node.parent.convertToWorldSpaceAR(o.node.position),
             r = this.node.parent.convertToWorldSpaceAR(this.node.position).sub(i).normalize();
            // console.log(">>>>"), 
            this.node.getComponent(cc.RigidBody).applyLinearImpulse(r.mul(3e3),
             this.node.getComponent(cc.RigidBody).getWorldCenter(), true);
        }
        if (o.tag == Common.Tag.tagGrenade && !this.tntTrigger && o.node.parent.getComponent("GrenadeController").isBoom) {
            this.tntTrigger = true;
            var r = o.node.parent.convertToWorldSpaceAR(o.node.position);
            i = this.node.parent.convertToWorldSpaceAR(this.node.position).sub(r).normalize();
            this.node.getComponent(cc.RigidBody).applyLinearImpulse(i.mul(5e3), this.node.getComponent(cc.RigidBody).getWorldCenter(), true);
    }

    // update (dt) {}
}
