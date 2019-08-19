import Common from "./Common";
import { MODE_TYPE_STRUCT } from "./GameConfig";
import StageDataMgr from "../../module/data/StageDataMgr";

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
export default class CubeBox extends cc.Component {

    @property(Boolean)
    isCollider:boolean= false;


    @property(Number)
    grendaBoomCount:number = 0;


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    onBeginContact(e, t, o) {
        if(t.enabled == false || o.enabled == false){
            // console.log(t.node.name,t.tag,o.node.name,o.tag,t.enabled,o.enabled,"CubeBox");
            return;
        }else{
            // console.log(t.node.name,t.tag,o.node.name,o.tag,t.enabled,o.enabled,"CubeBox");
        }
        if (o.tag == Common.Tag.tagBullet && (t.tag == Common.Tag.tagMoveBox || t.tag == Common.Tag.tagMoveCube)) {
            var i = o.getComponent(cc.RigidBody).linearVelocity.normalize(), r = e.getWorldManifold().points[0];
            this.scheduleOnce(function() {
                53 == StageDataMgr.CUR_LEVEL && StageDataMgr.CUR_MODE == MODE_TYPE_STRUCT.MODE3 ?
                 t.getComponent(cc.RigidBody).applyLinearImpulse(i.mul(9e6), t.getComponent(cc.RigidBody).getWorldCenter(), true) :
                  68 ==  StageDataMgr.CUR_LEVEL && StageDataMgr.CUR_MODE == MODE_TYPE_STRUCT.MODE3 ? 
                t.getComponent(cc.RigidBody).applyLinearImpulse(i.mul(5e5), t.getComponent(cc.RigidBody).getWorldCenter(), true) :
                 80 ==  StageDataMgr.CUR_LEVEL && StageDataMgr.CUR_MODE == MODE_TYPE_STRUCT.MODE3 ? r &&
                 t.getComponent(cc.RigidBody).applyForce(i.mul(5e6), r, true) : t.getComponent(cc.RigidBody).applyLinearImpulse(i.mul(5e4),
                  t.getComponent(cc.RigidBody).getWorldCenter(), true);
            }, 0);
        }
        if (o.tag == Common.Tag.tagGrenade && o.node.parent.getComponent("GrenadeController").isBoom) {
            this.grendaBoomCount++, o.node.group = "rope";
            var c = t.node.parent.convertToWorldSpaceAR(t.node.position);
            var s = o.node.parent.convertToWorldSpaceAR(o.node.position);
            var d = c.sub(s).normalize(), u = StageDataMgr.CUR_LEVEL,
            p = StageDataMgr.CUR_MODE;
            15 == u && p == MODE_TYPE_STRUCT.MODE2 ?
            t.getComponent(cc.RigidBody).applyLinearImpulse(d.mul(15e4),
            t.getComponent(cc.RigidBody).getWorldCenter(), true) 
            : 36 == u && p == MODE_TYPE_STRUCT.MODE2 ? (d = s.sub(c).normalize(), 
            t.getComponent(cc.RigidBody).applyLinearImpulse(d.mul(3e4), t.getComponent(cc.RigidBody).getWorldCenter(), true)) : 38 == u ? (t.getComponent(cc.RigidBody).applyLinearImpulse(d.mul(5e4 * this.grendaBoomCount), t.getComponent(cc.RigidBody).getWorldCenter(), true), 
            this.scheduleOnce(function() {
                this.grendaBoomCount = 0;
            }, .5)) : 43 == u ? (t.getComponent(cc.RigidBody).applyLinearImpulse(d.mul(4e4 * this.grendaBoomCount), t.getComponent(cc.RigidBody).getWorldCenter(), true), 
            this.scheduleOnce(function() {
                this.grendaBoomCount = 0;
            }, .5)) : 44 == u ? (t.getComponent(cc.RigidBody).applyLinearImpulse(cc.v2(0, 5e4 * this.grendaBoomCount), t.getComponent(cc.RigidBody).getWorldCenter(), true), 
            this.scheduleOnce(function() {
                this.grendaBoomCount = 0;
            }, .5)) : 53 == u ? (t.getComponent(cc.RigidBody).applyLinearImpulse(d.mul(2e4 * this.grendaBoomCount), t.getComponent(cc.RigidBody).getWorldCenter(), true), 
            this.scheduleOnce(function() {
                this.grendaBoomCount = 0;
            }, .5)) : 55 == u ? (t.getComponent(cc.RigidBody).applyLinearImpulse(d.mul(3e4 * this.grendaBoomCount), t.getComponent(cc.RigidBody).getWorldCenter(), true), 
            this.scheduleOnce(function() {
                this.grendaBoomCount = 0;
            }, .5)) : t.getComponent(cc.RigidBody).applyLinearImpulse(d.mul(2e4), t.getComponent(cc.RigidBody).getWorldCenter(), true);
        }
        if (o.tag == Common.Tag.tagTNT && o.node.getComponent("TNTBox").isBoom) {
            o.node.group = "rope";
            c = t.node.parent.convertToWorldSpaceAR(t.node.position), s = o.node.parent.convertToWorldSpaceAR(o.node.position), 
            d = c.sub(s).normalize(), u = StageDataMgr.CUR_LEVEL, p = StageDataMgr.CUR_MODE;
            16 == u && p == MODE_TYPE_STRUCT.MODE2 ? t.getComponent(cc.RigidBody).applyLinearImpulse(cc.v2(0, 2e5),
             t.getComponent(cc.RigidBody).getWorldCenter(), true) : 19 == u && p == MODE_TYPE_STRUCT.MODE2 ?
              t.getComponent(cc.RigidBody).applyLinearImpulse(d.mul(3e5), t.getComponent(cc.RigidBody).getWorldCenter(), true) :
               18 == u && p == MODE_TYPE_STRUCT.MODE3 ?
                t.getComponent(cc.RigidBody).applyLinearImpulse(d.mul(5e3), t.getComponent(cc.RigidBody).getWorldCenter(), true) : 
                91 == u && p == MODE_TYPE_STRUCT.MODE1 ?
                 t.getComponent(cc.RigidBody).applyLinearImpulse(d.mul(5e3), t.getComponent(cc.RigidBody).getWorldCenter(), true) :
                  106 == u && p == MODE_TYPE_STRUCT.MODE1 ?
                   t.getComponent(cc.RigidBody).applyLinearImpulse(d.mul(15e3), t.getComponent(cc.RigidBody).getWorldCenter(), true) :
                    120 == u && p == MODE_TYPE_STRUCT.MODE1 ?
                     t.getComponent(cc.RigidBody).applyLinearImpulse(d.mul(15e3), t.getComponent(cc.RigidBody).getWorldCenter(), true) :
                      181 == u && p == MODE_TYPE_STRUCT.MODE1 ?
                       t.getComponent(cc.RigidBody).applyLinearImpulse(d.mul(15e3), t.getComponent(cc.RigidBody).getWorldCenter(), true) :
                        189 == u && p == MODE_TYPE_STRUCT.MODE1 ?
                         t.getComponent(cc.RigidBody).applyLinearImpulse(d.mul(15e3), t.getComponent(cc.RigidBody).getWorldCenter(), true) :
                          88 == u && p == MODE_TYPE_STRUCT.MODE3 ?
                           t.getComponent(cc.RigidBody).applyLinearImpulse(d.mul(15e3), t.getComponent(cc.RigidBody).getWorldCenter(), true) :
                            102 == u && p == MODE_TYPE_STRUCT.MODE3 ?
                             t.getComponent(cc.RigidBody).applyLinearImpulse(d.mul(15e3), t.getComponent(cc.RigidBody).getWorldCenter(), true) :
                              135 == u && p == MODE_TYPE_STRUCT.MODE3 ?
                               t.getComponent(cc.RigidBody).applyLinearImpulse(d.mul(15e3), t.getComponent(cc.RigidBody).getWorldCenter(), true) :
                                78 == u && p == MODE_TYPE_STRUCT.MODE4 &&
                                 t.getComponent(cc.RigidBody).applyLinearImpulse(d.mul(15e3), t.getComponent(cc.RigidBody).getWorldCenter(), true);
        }
    }

    start () {

    }

    // update (dt) {}
}
