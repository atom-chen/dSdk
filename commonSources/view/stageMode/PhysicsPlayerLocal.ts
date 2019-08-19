import StageDataMgr from "../../module/data/StageDataMgr";
import { MODE_TYPE_STRUCT } from "./GameConfig";
import Common from "./Common";
import PhysicPlayer from "./PhysicPlayer";
import AudioManager from "./AudioManager";
import PrfabsManager from "./PrfabsManager";
import GrenadeController from "./GrenadeController";
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
export default class PhysicsPlayerLocal extends cc.Component {

    // update (dt) {}

    playerController:PhysicPlayer = null;
    isBlood = false;
    blood = null;
    tntTrigger = false;
    roleBody = null;


    onLoad() {
           
    }
    start(){
        this.playerController = this.node.parent.getComponent(PhysicPlayer); 
    }
    onBeginContact(e, t, o) {

        var l = e.getWorldManifold().points;
        if (o.tag == Common.Tag.tagBullet) e.disabled = true, this.playerController.isHit || (AudioManager.instance.playSound("scream"), 
        this.node.dispatchEvent(new cc.Event.EventCustom(Common.eventMessage.gameFail,true))
        
        ), t.name.indexOf("hand") < 0 && l[0] && this.playBloodEffct(l[0], o.node.getComponent(cc.RigidBody).linearVelocity), 
        this.playerController.isHit = true, this.playerController.hitJointRgBody = t.node.getComponent(cc.RigidBody), 
        this.playerController.hitDir = o.node.getComponent(cc.RigidBody).linearVelocity.normalize(), 
        this.playerController.hitPoint = e.getWorldManifold().points[0], l[0] && this.playerController.hitEffct();
        else if (o.tag == Common.Tag.tagCubeBox) if (o.node.getComponent(CubeBox).isCollider || this.playerController.isHit) {
            var r = StageDataMgr.CUR_LEVEL, c = StageDataMgr.CUR_MODE;
            38 != r && 45 != r && 68 != r || c != MODE_TYPE_STRUCT.MODE3 || (AudioManager.instance.playSound("scream"), 
            this.node.dispatchEvent(new cc.Event.EventCustom(Common.eventMessage.gameFail,true))
            , l[0] && this.playBloodEffct(l[0], o.node.getComponent(cc.RigidBody).linearVelocity));
        } else o.node.getComponent(CubeBox).isCollider = true, this.playerController.isHit = true, 
        AudioManager.instance.playSound("scream"), this.node.dispatchEvent(new cc.Event.EventCustom(Common.eventMessage.gameFail,true))
        , l[0] && this.playBloodEffct(l[0], o.node.getComponent(cc.RigidBody).linearVelocity);
         else if (o.tag == Common.Tag.tagCircle) this.playerController.isHit ||
         (this.playerController.isHit = true, 
        AudioManager.instance.playSound("scream"), this.node.dispatchEvent(new cc.Event.EventCustom(Common.eventMessage.gameFail,true))
        , this.playBloodEffct(l[0], o.node.getComponent(cc.RigidBody).linearVelocity));
         else if (o.tag == Common.Tag.tagMoveBox) o.node.getComponent(CubeBox).isCollider ||
         (o.node.getComponent(CubeBox).isCollider = true, 
        AudioManager.instance.playSound("scream"),
         this.scheduleOnce(()=> {
            if(this.node){
                this.node.dispatchEvent(new cc.Event.EventCustom(Common.eventMessage.gameFail,true)),
                o.node.getComponent(cc.RigidBody).linearDamping = 1;
            }
        }, .5), this.playBloodEffct(l[0], o.node.getComponent(cc.RigidBody).linearVelocity));
         else if (o.tag == Common.Tag.tagPlat) this.playerController.isRoadDead &&
         !this.playerController.isHit && (this.playerController.isHit = true, 
        AudioManager.instance.playSound("scream"), this.node.dispatchEvent(new cc.Event.EventCustom(Common.eventMessage.gameFail,true)),
         this.playBloodEffct(l[0], o.node.getComponent(cc.RigidBody).linearVelocity)); 
         else if (o.tag == Common.Tag.tagTNT) {
            if(o.enabled == false){
                return;
            }

            if (this.playerController.isHit || (this.playerController.isHit = true, AudioManager.instance.playSound("scream"), 
            this.node.dispatchEvent(new cc.Event.EventCustom(Common.eventMessage.gameFail,true))
            // console.log("PhysicsPlayerLocal fail")
            ),
             !this.tntTrigger) {
                this.tntTrigger = true;
                var s = o.node.parent.convertToWorldSpaceAR(o.node.position);
                // console.log("TNT>>>>><<<<<");
                var d = this.playerController.bodyRigBody.node.parent.convertToWorldSpaceAR(this.playerController.bodyRigBody.node.position).sub(s).normalize();
                o.node.getComponent(TNTBox).isLink ? this.playerController.bodyRigBody.applyLinearImpulse(cc.v2(0, 1e4), this.playerController.bodyRigBody.getWorldCenter(), true) :
                 (this.playerController.hitDir = d, 
                this.playerController.playTntEffct());
            }
            this.playBloodEffct();
        } else if (o.tag == Common.Tag.tagGrenade && o.node.parent.getComponent(GrenadeController).isBoom) {
            if (this.playerController.isHit || (this.playerController.isHit = true, AudioManager.instance.playSound("scream"), 
            this.node.dispatchEvent(new cc.Event.EventCustom(Common.eventMessage.gameFail,true))),
             -1 == this.playerController.grendaBoomNodeName.indexOf(o.node.parent.name)) {
                this.playerController.grendaBoomNodeName += o.node.parent.name + ",";
                s = o.node.parent.convertToWorldSpaceAR(o.node.position),
                 d = this.playerController.bodyRigBody.node.parent.convertToWorldSpaceAR(this.playerController.bodyRigBody.node.position).sub(s).normalize();
                var u = this.playerController.grendaBoomNodeName.split(",").length;
                2 == u ? this.playerController.bodyRigBody.applyLinearImpulse(d.mul(5e4), this.playerController.bodyRigBody.getWorldCenter(), true) :
                 this.playerController.bodyRigBody.applyLinearImpulse(d.mul(5e4 * u), this.playerController.bodyRigBody.getWorldCenter(), true);
            }
            this.playBloodEffct();
        } else o.tag == Common.Tag.tagDeath && t.tag == Common.Tag.tagBodyJoint && (this.playerController.isHit || (this.playerController.isHit = true, 
        AudioManager.instance.playSound("scream"), this.node.dispatchEvent(new cc.Event.EventCustom(Common.eventMessage.gameFail,true))),
         this.playBloodEffct());
    }

    playBloodEffct(e = null, t = null) {
        if (!this.isBlood) {
            if (this.isBlood = true, this.blood = cc.instantiate(PrfabsManager.instance.prfabsAry.Blood_2),
            this.blood.getComponent(cc.ParticleSystem).resetSystem(), t && e) {
                var o = t.signAngle(cc.v2(1, 0));
                o = cc.misc.radiansToDegrees(o);
                var n = this.node.parent.convertToNodeSpaceAR(e);
                this.blood.position = n, this.blood.rotation = o;
            } else this.blood.position = this.node.position;
            this.node.parent.addChild(this.blood, 1e3);
        }
    }

    update = function(e) {
        this.blood && (this.blood.position = this.node.position);
    }
}

