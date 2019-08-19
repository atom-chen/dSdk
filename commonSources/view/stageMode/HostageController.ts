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
export default class HostageController extends cc.Component {
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
    
    @property(cc.Sprite)
    headSprite:cc.Sprite = null;
    @property(cc.SpriteFrame)
    deathSpriteFrame:cc.SpriteFrame = null;

    isRoadDead = false

    isHit = false;

    hitJointRgBody = null
    hitDir = null
    hitPoint = null

    @property(cc.Node)
    trigger:cc.Node = null;

    isTrigger = false;
    triggerType = 1
    grendaBoomNodeName = "";
    
    hitEffct = function() {
        this.headSprite.spriteFrame = this.deathSpriteFrame, this.leftFootBody.gravityScale = 1, 
        this.rightFootBody.gravityScale = 1, this.leftFootBody2.gravityScale = 1, this.rightFootBody2.gravityScale = 1, 
        this.hitJointRgBody.applyLinearImpulse(this.hitDir.mul(6e3), this.hitPoint, true), 
        this.runTrigger();
    }
    tntEffct = function() {
        this.headSprite.spriteFrame = this.deathSpriteFrame, this.leftFootBody.gravityScale = 1, 
        this.rightFootBody.gravityScale = 1, this.leftFootBody2.gravityScale = 1, this.rightFootBody2.gravityScale = 1, 
        this.hitJointRgBody.applyLinearImpulse(this.hitDir.mul(6e3), this.hitPoint, true);
    }

    runTrigger = function() {
        this.trigger && !this.isTrigger && (this.isTrigger = true, this.scheduleOnce(function() {
            this.trigger.getComponent(cc.RigidBody).type = cc.RigidBodyType.Dynamic, this.trigger.getComponent(cc.PhysicsCircleCollider).tag = Common.Tag.tagCircle, 
            this.trigger.getComponent(cc.PhysicsCircleCollider).apply();
        }, 0));
    }

}
