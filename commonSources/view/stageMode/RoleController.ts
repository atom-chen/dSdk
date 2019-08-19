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
export default class RoleController extends cc.Component {

    @property(cc.RigidBody)
     leftFootBody:cc.RigidBody = null;

    @property(cc.RigidBody)
     rightFootBody:cc.RigidBody = null;

    @property(cc.RigidBody)
     leftFootBody2:cc.RigidBody = null;

    @property(cc.RigidBody)
     rightFootBody2:cc.RigidBody = null;

     @property(cc.RigidBody)
     roleBody:cc.RigidBody = null;
    
    @property(Boolean)
    isRoadDead:Boolean = false;
    public isHit = false;
    private hitJointRgBody = null;
    private hitDir = null;

    private hitPoint = null;

    @property(cc.Node)
    trigger:cc.Node = null;

    private isTrigger = false;

    @property(Number)
    triggerType:Number = 1;
    
    private grendaBoomNodeName = "";

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }



    hitEffct(){
        this.leftFootBody.gravityScale = 1;
        this.rightFootBody.gravityScale = 1;
        this.leftFootBody2.gravityScale = 1; 
        this.rightFootBody2.gravityScale = 1;
        this.hitJointRgBody.applyLinearImpulse(this.hitDir.mul(6e3), this.hitPoint, true); 
        this.runTrigger();
    }

    tntEffct(){
        this.leftFootBody.gravityScale = 1;
        this.rightFootBody.gravityScale = 1;
        this.leftFootBody2.gravityScale = 1; 
        this.rightFootBody2.gravityScale = 1;
        this.hitJointRgBody.applyLinearImpulse(this.hitDir.mul(6e3), this.hitPoint, true);
    }

    runTrigger(){
        this.trigger && !this.isTrigger && (this.isTrigger = true, this.scheduleOnce(function() {
            this.trigger.getComponent(cc.RigidBody).type = cc.RigidBodyType.Dynamic, this.trigger.getComponent(cc.PhysicsCircleCollider).tag = Common.Tag.tagCircle, 
            this.trigger.getComponent(cc.PhysicsCircleCollider).apply();
        }, 0));
    }

    // update (dt) {}
}
