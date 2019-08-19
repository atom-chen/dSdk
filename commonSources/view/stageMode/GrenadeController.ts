// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
import AudioManager from "./AudioManager";
import PrfabsManager from "./PrfabsManager";
import GameConfig, { MODE_TYPE_STRUCT } from "./GameConfig";
import StageDataMgr from "../../module/data/StageDataMgr";
import Common from "./Common";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GrenadeController extends cc.Component {
    
    @property(cc.RigidBody)
    grenadeBody:cc.RigidBody = null;
    @property(cc.Node)
    bomImg:cc.Node = null;
    
    @property(cc.MotionStreak)
    motionStreak:cc.MotionStreak = null;
    
    @property(cc.Node)
    colliderNode:cc.Node = null;
    finshTime = 3;
    isBoom = false
    particleNode = null
    colliderSize = 200
    circleSize = 2
    isDestroy = false

    // onLoad () {}
    start() {

        StageDataMgr.CUR_LEVEL >= 21 && (this.finshTime = 2);

        
        77 == StageDataMgr.CUR_LEVEL ? (this.circleSize = 5, 
        this.finshTime = 1, this.colliderSize = 250): 42 == StageDataMgr.CUR_LEVEL ? (this.finshTime = 3.2,this.colliderSize = 450) : 80 ==  StageDataMgr.CUR_LEVEL && (this.finshTime = 1.5), 
        this.scheduleOnce(this.boomEffct, this.finshTime), 7 ==  StageDataMgr.CUR_LEVEL && (this.circleSize = 5, 
        this.bomImg.scale = 0, this.circleSize = .2);
    }
    boomEffct() {
        if (this.isBoom = true, this.colliderNode.getComponent(cc.PhysicsBoxCollider) && (this.colliderNode.getComponent(cc.PhysicsBoxCollider).sensor = true, 
        this.colliderNode.getComponent(cc.PhysicsBoxCollider).apply()), this.colliderNode.getComponent(cc.PhysicsCircleCollider)) {
            this.colliderNode.getComponent(cc.PhysicsCircleCollider).sensor = true, this.colliderNode.getComponent(cc.PhysicsCircleCollider).apply();
            var e = StageDataMgr.CUR_LEVEL;
            7 != e && 22 != e && 25 != e && 27 != e && 32 != e && 33 != e && 46 != e && 47 != e && 48 != e && 49 != e && 50 != e && 53 != e &&
            58 != e && 59 != e && 60 != e && 61 != e && 65 != e && 66 != e && 68 != e && 71 != e && 72 != e && 74 != e && 75 != e && 77 != e &&
             78 != e && 80 != e && 81 != e && 90 != e && 95 != e && 94 != e && 97 != e && 82 != e && 83 != e && 84 != e && 85 != e && 88
              != e && 89 != e && 91 != e && 86 != e && 87 != e && 100 != e || StageDataMgr.CUR_MODE != MODE_TYPE_STRUCT.MODE2 ||
               (this.colliderNode.getComponent(cc.RigidBody).type = cc.RigidBodyType.Animated);
        }
        AudioManager.instance.playSound("bomb"), this.particleNode = cc.instantiate(PrfabsManager.instance.prfabsAry.TNTEffectNode), 
        this.particleNode.getComponent(cc.ParticleSystem).resetSystem(), this.colliderNode.addChild(this.particleNode), 
        this.particleNode.active = true, this.bomImg.active = true, this.node.runAction(cc.fadeOut(.2));
    }

    update(e) {
        this.motionStreak.node.position = this.colliderNode.position, this.isBoom && (this.colliderNode.getComponent(cc.PhysicsCircleCollider).radius = cc.misc.lerp(this.colliderNode.getComponent(cc.PhysicsCircleCollider).radius, this.colliderSize, .2), 
        this.colliderNode.getComponent(cc.PhysicsCircleCollider).apply(), this.bomImg.scale = cc.misc.lerp(this.bomImg.scale, this.circleSize, .1), 
        this.colliderNode.getComponent(cc.PhysicsCircleCollider).radius >= this.colliderSize - .1 && (this.isDestroy || (this.isDestroy = true, 
        this.node.destroy(), this.node.dispatchEvent(new cc.Event.EventCustom(Common.eventMessage.grendaDestroy,true))

        )));
    }

    

    // update (dt) {}
}
