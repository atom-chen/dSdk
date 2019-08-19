import Common from "./Common";
import AudioManager from "./AudioManager";
import PrfabsManager from "./PrfabsManager";
import GameConfig, { MODE_TYPE_STRUCT } from "./GameConfig";
import StageDataMgr from "../../module/data/StageDataMgr";
import CubeBox from "./CubeBox";
import TNTBox from "./TNTBox";

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
export default class HostageJointController extends cc.Component {

    hostageController = null;

    isBlood = false;

    blood = null;

    tntTrigger = false;
   

    onLoad = function() {
    }

    onBeginContact(e, t, o) {
        if(o.enabled == false){
            return;
        }
        
        var r = e.getWorldManifold().points;
        if (o.tag == Common.Tag.tagBullet) e.disabled = true, this.hostageController.isHit || (AudioManager.instance.playSound("scream"), 
            this.node.dispatchEvent(new cc.Event.EventCustom(Common.eventMessage.gameFail,true))
        ), t.name.indexOf("hand") < 0 && r[0] && this.playEffectBld(r[0], o.node.getComponent(cc.RigidBody).linearVelocity), 
        this.hostageController.isHit = true, this.hostageController.hitJointRgBody = t.node.getComponent(cc.RigidBody), 
        this.hostageController.hitDir = o.node.getComponent(cc.RigidBody).linearVelocity.normalize(), 
        this.hostageController.hitPoint = e.getWorldManifold().points[0], r[0] && this.hostageController.hitEffct(); else if (o.tag == Common.Tag.tagCubeBox) if (o.node.getComponent(CubeBox).isCollider || this.hostageController.isHit) {
            var c = StageDataMgr.CUR_LEVEL, s = StageDataMgr.CUR_MODE;
            38 != c && 45 != c && 25 != c || s != MODE_TYPE_STRUCT.MODE3 || (AudioManager.instance.playSound("scream"), 
            this.node.dispatchEvent(new cc.Event.EventCustom(Common.eventMessage.gameFail,true))
            , r[0] && this.playEffectBld(r[0], o.node.getComponent(cc.RigidBody).linearVelocity));
        } else o.node.getComponent(CubeBox).isCollider = true, this.hostageController.isHit = true, 
        AudioManager.instance.playSound("scream"),
        this.node.dispatchEvent(new cc.Event.EventCustom(Common.eventMessage.gameFail,true))
        
        , r[0] && this.playEffectBld(r[0], o.node.getComponent(cc.RigidBody).linearVelocity); else if (o.tag == Common.Tag.tagCircle) this.hostageController.isHit || (this.hostageController.isHit = true, 
        AudioManager.instance.playSound("scream"),this.node.dispatchEvent(new cc.Event.EventCustom(Common.eventMessage.gameFail,true))
        , this.playEffectBld(r[0], o.node.getComponent(cc.RigidBody).linearVelocity)); else if (o.tag == Common.Tag.tagMoveBox) o.node.getComponent(CubeBox).isCollider || (o.node.getComponent(CubeBox).isCollider = true, 
        AudioManager.instance.playSound("scream"), this.scheduleOnce(() => {
            if(this.node){
                this.node.dispatchEvent(new cc.Event.EventCustom(Common.eventMessage.gameFail,true))
                , o.node.getComponent(cc.RigidBody).linearDamping = 1;
            }
        }, .5), this.playEffectBld(r[0], o.node.getComponent(cc.RigidBody).linearVelocity)); else if (o.tag == Common.Tag.tagPlat) this.hostageController.isRoadDead && !this.hostageController.isHit && (this.hostageController.isHit = true, 
        AudioManager.instance.playSound("scream"), 
        this.node.dispatchEvent(new cc.Event.EventCustom(Common.eventMessage.gameFail,true)), this.playEffectBld(r[0], o.node.getComponent(cc.RigidBody).linearVelocity)); else if (o.tag == Common.Tag.tagTNT) {
            if (this.hostageController.isHit || (this.hostageController.isHit = true, AudioManager.instance.playSound("scream"), 
            this.node.dispatchEvent(new cc.Event.EventCustom(Common.eventMessage.gameFail,true))), !this.tntTrigger) {
                this.tntTrigger = true;
                var d = o.node.parent.convertToWorldSpaceAR(o.node.position), u = this.hostageController.roleBody.node.parent.convertToWorldSpaceAR(this.hostageController.roleBody.node.position).sub(d).normalize();
                o.node.getComponent(TNTBox).isLink ? this.hostageController.roleBody.applyLinearImpulse(cc.v2(0, 1e4), this.hostageController.roleBody.getWorldCenter(), true) : this.hostageController.roleBody.applyLinearImpulse(u.mul(6e3), this.hostageController.roleBody.getWorldCenter(), true);
            }
            this.isBlood || (this.isBlood = true, this.blood = cc.instantiate(PrfabsManager.instance.prfabsAry.Blood_2), 
            this.blood.getComponent(cc.ParticleSystem).resetSystem(), this.blood.position = this.node.position, 
            this.node.parent.addChild(this.blood, 1e3));
        } else if (o.tag == Common.Tag.tagGrenade && o.node.parent.getComponent("GrenadeController").isBoom) {
            if (this.hostageController.isHit || (this.hostageController.isHit = true, AudioManager.instance.playSound("scream"), 
            this.node.dispatchEvent(new cc.Event.EventCustom(Common.eventMessage.gameFail,true))), -1 == this.hostageController.grendaBoomNodeName.indexOf(o.node.parent.name)) {
                this.hostageController.grendaBoomNodeName += o.node.parent.name + ",";
                d = o.node.parent.convertToWorldSpaceAR(o.node.position), u = this.hostageController.roleBody.node.parent.convertToWorldSpaceAR(this.hostageController.roleBody.node.position).sub(d).normalize();
                var p = this.hostageController.grendaBoomNodeName.split(",").length;
                2 == p ? this.hostageController.roleBody.applyLinearImpulse(u.mul(5e4), this.hostageController.roleBody.getWorldCenter(), true) : this.hostageController.roleBody.applyLinearImpulse(u.mul(5e4 * p), this.hostageController.roleBody.getWorldCenter(), true);
            }
            this.isBlood || (this.isBlood = true, this.blood = cc.instantiate(PrfabsManager.instance.prfabsAry.Blood_2), 
            this.blood.getComponent(cc.ParticleSystem).resetSystem(), this.blood.position = this.node.position, 
            this.node.parent.addChild(this.blood, 1e3));
        } else o.tag == Common.Tag.tagDeath && t.tag == Common.Tag.tagBodyJoint && (this.hostageController.isHit || (this.hostageController.isHit = true, 
        AudioManager.instance.playSound("scream"), this.node.dispatchEvent(new cc.Event.EventCustom(Common.eventMessage.gameFail,true))), this.isBlood || (this.isBlood = true, this.blood = cc.instantiate(PrfabsManager.instance.prfabsAry.Blood_2), 
        this.blood.getComponent(cc.ParticleSystem).resetSystem(), this.blood.position = this.node.position, 
        this.node.parent.addChild(this.blood, 1e3)));
    }

    playEffectBld(e, t) {
        if (!this.isBlood) {
            this.isBlood = true;
            var o = t.signAngle(cc.v2(1, 0));
            o = cc.misc.radiansToDegrees(o), this.blood = cc.instantiate(PrfabsManager.instance.prfabsAry.Blood_2), 
            this.blood.getComponent(cc.ParticleSystem).resetSystem();
            var n = this.node.parent.convertToNodeSpaceAR(e);
            this.blood.position = n, this.blood.rotation = o, this.node.parent.addChild(this.blood, 1e3);
        }
    }
    update = function(e) {
        this.blood && (this.blood.position = this.node.position);
        
        this.hostageController.roleBody.linearVelocity.mag() > 320 &&
         StageDataMgr.CUR_MODE == MODE_TYPE_STRUCT.MODE3 && 14 ==  StageDataMgr.CUR_LEVEL && !this.hostageController.isHit ? (this.hostageController.isHit ||
             (this.hostageController.isHit = true, 
        AudioManager.instance.playSound("scream"), this.node.dispatchEvent(new cc.Event.EventCustom(Common.eventMessage.gameFail,true))), this.isBlood ||
         (this.isBlood = true, this.blood = cc.instantiate(PrfabsManager.instance.prfabsAry.Blood_2), 
        this.blood.getComponent(cc.ParticleSystem).resetSystem(), this.blood.position = this.hostageController.roleBody.node.position, 
        this.hostageController.roleBody.node.addChild(this.blood, 1e3))) : 37 ==  StageDataMgr.CUR_LEVEL && StageDataMgr.CUR_MODE == MODE_TYPE_STRUCT.MODE3 &&
         this.hostageController.node.getChildByName("role_head").getComponent(cc.RigidBody).linearVelocity.mag() > 300 && (this.hostageController.isHit ||
             (this.hostageController.isHit = true, 
        AudioManager.instance.playSound("scream"), this.node.dispatchEvent(new cc.Event.EventCustom(Common.eventMessage.gameFail,true)), this.isBlood ||
         (this.isBlood = true, this.blood = cc.instantiate(PrfabsManager.instance.prfabsAry.Blood_2), 
        this.blood.getComponent(cc.ParticleSystem).resetSystem(), this.blood.position = this.hostageController.node.getChildByName("role_head").position, 
        this.hostageController.node.getChildByName("role_head").addChild(this.blood, 1e3))));
    }

    start () {
        this.hostageController = this.node.parent.getComponent("HostageController");

    }

    // update (dt) {}
}
