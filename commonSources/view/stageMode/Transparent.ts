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
export default class Transparent extends cc.Component {

    bulletPass = false;
    
    rigidBody = null;
    
    start() {
        this.rigidBody = this.node.getComponent(cc.RigidBody);
    }

    onBeginContact(e, t, o)  {
        if (o.tag == Common.Tag.tagBullet) {
            if (this.bulletPass) e.disabled = true; else if (86 == StageDataMgr.CUR_LEVEL && StageDataMgr.CUR_MODE ==  MODE_TYPE_STRUCT.MODE1) {
                var l = e.getWorldManifold().points[0], i = o.getComponent(cc.RigidBody).linearVelocity.normalize();
                this.scheduleOnce(()=> {
                    this.rigidBody.applyForce(i.mul(5e6), l, true);
                }, 0);
            }
        } else o.tag == Common.Tag.tagCubeBox || o.tag == Common.Tag.tagMoveCube || o.tag == Common.Tag.tagDeath ? e.disabled = true :
         o.tag == Common.Tag.tagBodyJoint && o.node.parent.getComponent("RoleController") && o.node.parent.getComponent("RoleController").isHit &&
          (e.disabled = true);
    }

    // update (dt) {}
}
