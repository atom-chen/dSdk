// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
import Common from "./Common";
import AudioManager from "./AudioManager";
import PrfabsManager from "./PrfabsManager";
import StageDataMgr from "../../module/data/StageDataMgr";
import { MODE_TYPE_STRUCT } from "./GameConfig";
import RoleController from "./RoleController";
import CubeBox from "./CubeBox";
import GrenadeController from "./GrenadeController";
import TNTBox from "./TNTBox";
// import NodePoolManager from "./NodePoolManager";



const {ccclass, property} = cc._decorator;

@ccclass
export class RoleJointController extends cc.Component {

    private isBlood = false;
    private blood = null;
    private tntTrigger = false;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
    }



    onBeginContact(e, t, o){
        if(o.enabled == false){
            return;
        }else{
            //console.log(t.node.name,t.tag,o.node.name,o.tag,"RoleJointController",t.enabled,o.enabled);
        }



        var a = e.getWorldManifold().points;

        if (o.tag == Common.Tag.tagBullet)
        e.disabled = true, t.node.parent.getComponent(RoleController).isHit || (AudioManager.instance.playSound("scream"), 
        this.node.dispatchEvent(new cc.Event.EventCustom(Common.eventMessage.enemyDie,true))), t.name.indexOf("hand") < 0 && a[0] && this.playBloodEffct(a[0], o.node.getComponent(cc.RigidBody).linearVelocity), 
        t.node.parent.getComponent(RoleController).isHit = true, t.node.parent.getComponent(RoleController).hitJointRgBody = t.node.getComponent(cc.RigidBody), 
        t.node.parent.getComponent(RoleController).hitDir = o.node.getComponent(cc.RigidBody).linearVelocity.normalize(), 
        t.node.parent.getComponent(RoleController).hitPoint = e.getWorldManifold().points[0], 
        a[0] && t.node.parent.getComponent(RoleController).hitEffct();
        else if (o.tag == Common.Tag.tagCubeBox){o.node.getComponent(CubeBox).isCollider || t.node.parent.getComponent(RoleController).isHit ||
        (o.node.getComponent(CubeBox).isCollider = true, 
        t.node.parent.getComponent(RoleController).isHit = true, AudioManager.instance.playSound("scream"), 
        this.node.dispatchEvent(new cc.Event.EventCustom(Common.eventMessage.enemyDie,true)),
        a[0] && this.playBloodEffct(a[0], o.node.getComponent(cc.RigidBody).linearVelocity));
        }
    else if (o.tag == Common.Tag.tagCircle) t.node.parent.getComponent(RoleController).isHit || (t.node.parent.getComponent(RoleController).isHit = true, 
        AudioManager.instance.playSound("scream"), this.node.dispatchEvent(new cc.Event.EventCustom(Common.eventMessage.enemyDie,true)), this.playBloodEffct(a[0], o.node.getComponent(cc.RigidBody).linearVelocity)); else if (o.tag == Common.Tag.tagMoveBox) o.node.getComponent(CubeBox).isCollider || (o.node.getComponent(CubeBox).isCollider = true, 
        AudioManager.instance.playSound("scream"),
         this.scheduleOnce(() => {
             if(this.node){
                this.node.dispatchEvent(new cc.Event.EventCustom(Common.eventMessage.enemyDie,true)),
                o.node.getComponent(cc.RigidBody).linearDamping = 1;
             }
        }, .5),
         this.playBloodEffct(a[0], o.node.getComponent(cc.RigidBody).linearVelocity));
        else if (o.tag == Common.Tag.tagPlat) t.node.parent.getComponent(RoleController).isRoadDead && !t.node.parent.getComponent(RoleController).isHit &&
         (t.node.parent.getComponent(RoleController).isHit = true, 
        AudioManager.instance.playSound("scream"),
        this.node.dispatchEvent(new cc.Event.EventCustom(Common.eventMessage.enemyDie,true)),
        this.playBloodEffct(a[0], o.node.getComponent(cc.RigidBody).linearVelocity));
         else if (o.tag == Common.Tag.tagTNT) {
            if ((s = t.node.parent.getComponent(RoleController)).isHit || (s.isHit = true, AudioManager.instance.playSound("scream"), 
            this.node.dispatchEvent(new cc.Event.EventCustom(Common.eventMessage.enemyDie,true))
            ), !this.tntTrigger) {
                this.tntTrigger = true;
                var r = o.node.parent.convertToWorldSpaceAR(o.node.position), c = s.roleBody.node.parent.convertToWorldSpaceAR(s.roleBody.node.position).sub(r).normalize();
                o.node.getComponent(TNTBox).isLink ? s.roleBody.applyLinearImpulse(cc.v2(0, 1e4), s.roleBody.getWorldCenter(), true) :
                 s.roleBody.applyLinearImpulse(c.mul(6e3), s.roleBody.getWorldCenter(), true);
            }
            this.isBlood || (this.isBlood = true, this.blood = cc.instantiate(PrfabsManager.instance.prfabsAry.Blood_2), 
            this.blood.getComponent(cc.ParticleSystem).resetSystem(), this.blood.position = this.node.position, 
            this.node.parent.addChild(this.blood, 1e3));
        } else if (o.tag == Common.Tag.tagGrenade && o.node.parent.getComponent(GrenadeController).isBoom) {
            var s;
            if ((s = t.node.parent.getComponent(RoleController)).isHit || (s.isHit = true, AudioManager.instance.playSound("scream"), 
            this.node.dispatchEvent(new cc.Event.EventCustom(Common.eventMessage.enemyDie,true))
            ), -1 == s.grendaBoomNodeName.indexOf(o.node.parent.name)) {
                s.grendaBoomNodeName += o.node.parent.name + ",";
                r = o.node.parent.convertToWorldSpaceAR(o.node.position), c = s.roleBody.node.parent.convertToWorldSpaceAR(s.roleBody.node.position).sub(r).normalize();
                var d = s.grendaBoomNodeName.split(",").length;
                2 == d ? s.roleBody.applyLinearImpulse(c.mul(5e4), s.roleBody.getWorldCenter(), true) : s.roleBody.applyLinearImpulse(c.mul(5e4 * d), s.roleBody.getWorldCenter(), true);
            }
            this.isBlood || (this.isBlood = true, this.blood = cc.instantiate(PrfabsManager.instance.prfabsAry.Blood_2), 
            this.blood.getComponent(cc.ParticleSystem).resetSystem(), this.blood.position = this.node.position, 
            this.node.parent.addChild(this.blood, 1e3));
        } else if (o.tag == Common.Tag.tagDeath && t.tag == Common.Tag.tagBodyJoint) t.node.parent.getComponent(RoleController).isHit || (t.node.parent.getComponent(RoleController).isHit = true, 
        AudioManager.instance.playSound("scream"), this.node.dispatchEvent(new cc.Event.EventCustom(Common.eventMessage.enemyDie,true))), this.isBlood || (this.isBlood = true, this.blood = cc.instantiate(PrfabsManager.instance.prfabsAry.Blood_2), 
        this.blood.getComponent(cc.ParticleSystem).resetSystem(), this.blood.position = this.node.position, 
        this.node.parent.addChild(this.blood, 1e3)); else if (o.tag == Common.Tag.tagMoveCube) {
            if (!t.node.parent.getComponent(RoleController).isHit) o.node.getComponent(cc.RigidBody).linearVelocity.mag() > 1e3 && (t.node.parent.getComponent(RoleController).isHit = true, 
            AudioManager.instance.playSound("scream"),         this.node.dispatchEvent(new cc.Event.EventCustom(Common.eventMessage.enemyDie,true))
            , this.isBlood || (this.isBlood = true, this.blood = cc.instantiate(PrfabsManager.instance.prfabsAry.Blood_2), 
            this.blood.getComponent(cc.ParticleSystem).resetSystem(), this.blood.position = this.node.position, 
            this.node.parent.addChild(this.blood, 1e3)));
        }
    }

    playBloodEffct = function(e, t) {
        if (!this.isBlood) {
            this.isBlood = true;
            var o = t.signAngle(cc.v2(1, 0));
            o = cc.misc.radiansToDegrees(o),
            this.blood = cc.instantiate(PrfabsManager.instance.prfabsAry.Blood_2);
            this.blood.getComponent(cc.ParticleSystem).resetSystem();
            var n = this.node.parent.convertToNodeSpaceAR(e);
            this.blood.position = n, this.blood.rotation = o, this.node.parent.addChild(this.blood, 1e3);
        }
    }

    update (dt) {
        this.blood && (this.blood.position = this.node.position);
        if(StageDataMgr.CUR_LEVEL == 80 && StageDataMgr.CUR_MODE == MODE_TYPE_STRUCT.MODE3){
            if(this.node.parent.getChildByName("role_head").getComponent(cc.RigidBody).linearVelocity.mag() > 150){
                if(!this.node.parent.getComponent(RoleController).isHit){
                    this.node.parent.getComponent(RoleController).isHit = true;
                    this.node.dispatchEvent(new cc.Event.EventCustom(Common.eventMessage.enemyDie,true))
                }
            }
        }
        if(StageDataMgr.CUR_LEVEL == 128 && StageDataMgr.CUR_MODE == MODE_TYPE_STRUCT.MODE1){
            this.node.parent.getChildByName("role_left_foot_bottom").getComponent(cc.RigidBody).linearVelocity.mag() > 300 && 
            (this.node.parent.getComponent(RoleController).isHit || (this.node.parent.getComponent(RoleController).isHit = true, 
          AudioManager.instance.playSound("scream"), 
          this.node.dispatchEvent(new cc.Event.EventCustom(Common.eventMessage.enemyDie,true))
          , this.isBlood || (this.isBlood = true, this.blood = cc.instantiate(PrfabsManager.instance.prfabsAry.Blood_2), 
          this.blood.getComponent(cc.ParticleSystem).resetSystem(), this.blood.position = this.node.parent.getChildByName("role_head").position, 
          this.node.parent.getChildByName("role_head").addChild(this.blood, 1e3))));
        }

    }
}
