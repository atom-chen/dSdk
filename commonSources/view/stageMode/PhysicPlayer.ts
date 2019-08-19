import StageDataMgr from "../../module/data/StageDataMgr";
import { MODE_TYPE_STRUCT } from "./GameConfig";
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
export default class PhysicPlayer extends cc.Component {
    @property(cc.RigidBody)
    leftFootTopRigBody:cc.RigidBody = null;
    
    @property(cc.RigidBody)
    rightFootTopRigBody:cc.RigidBody = null;
    @property(cc.RigidBody)
    leftFootBottomRigBody:cc.RigidBody = null;
    @property(cc.RigidBody)
    rightFootBottomRigBody:cc.RigidBody = null;

    @property(cc.RigidBody)
    bodyRigBody:cc.RigidBody = null;

    @property(cc.RigidBody)
    headRigBody:cc.RigidBody = null;

    @property(cc.RigidBody)
    leftHandTopRigBody:cc.RigidBody = null;
    


    @property(cc.RigidBody)
    rightHandTopRigBody:cc.RigidBody = null;
    @property(cc.RigidBody)
    leftHandBottomRigBody:cc.RigidBody = null;
    @property(cc.RigidBody)
    rightHandBottomRigBody:cc.RigidBody = null;

    @property(cc.Node)
    leftMoveHand:cc.Node = null;
    
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

    start () {
        //this.loadSkin();
    }

    hitEffct() {
                var e = this;
                this.scheduleOnce(()=> {
                    // console.log(">>>>>hitEffct"), 
                    this.leftFootTopRigBody.type = cc.RigidBodyType.Dynamic, 
                    this.rightFootTopRigBody.type = cc.RigidBodyType.Dynamic, this.leftFootBottomRigBody.type = cc.RigidBodyType.Dynamic, 
                    this.rightFootBottomRigBody.type = cc.RigidBodyType.Dynamic, this.bodyRigBody.type = cc.RigidBodyType.Dynamic, 
                    this.headRigBody.type = cc.RigidBodyType.Dynamic, this.leftHandTopRigBody.type = cc.RigidBodyType.Dynamic, 
                    this.rightHandTopRigBody.type = cc.RigidBodyType.Dynamic, this.leftHandBottomRigBody.type = cc.RigidBodyType.Dynamic, 
                    this.rightHandBottomRigBody.type = cc.RigidBodyType.Dynamic;
                    var t = 6e3;
                    
                    StageDataMgr.CUR_MODE == MODE_TYPE_STRUCT.MODE4 && (t = 3e3), 
                    e.hitJointRgBody.applyLinearImpulse(this.hitDir.mul(t), this.hitPoint, true), 
                    e.runTrigger();
                }, 0);
    }

    playTntEffct() {
        this.scheduleOnce(()=> {
            // console.log(">>>>>tnt"), 
            this.leftFootTopRigBody.type = cc.RigidBodyType.Dynamic, 
            this.rightFootTopRigBody.type = cc.RigidBodyType.Dynamic, this.leftFootBottomRigBody.type = cc.RigidBodyType.Dynamic, 
            this.rightFootBottomRigBody.type = cc.RigidBodyType.Dynamic, this.bodyRigBody.type = cc.RigidBodyType.Dynamic, 
            this.headRigBody.type = cc.RigidBodyType.Dynamic, this.leftHandTopRigBody.type = cc.RigidBodyType.Dynamic, 
            this.rightHandTopRigBody.type = cc.RigidBodyType.Dynamic, this.leftHandBottomRigBody.type = cc.RigidBodyType.Dynamic, 
            this.rightHandBottomRigBody.type = cc.RigidBodyType.Dynamic, 
            this.bodyRigBody.applyLinearImpulse(this.hitDir.mul(6e3), this.bodyRigBody.getWorldCenter(), true);
        }, 0);
    }


    updateRigBody() {
        this.scheduleOnce(() => {
            // console.log(">>>>>Update"), 
            this.leftFootTopRigBody.type = cc.RigidBodyType.Dynamic, 
            this.rightFootTopRigBody.type = cc.RigidBodyType.Dynamic, this.leftFootBottomRigBody.type = cc.RigidBodyType.Dynamic, 
            this.rightFootBottomRigBody.type = cc.RigidBodyType.Dynamic, this.bodyRigBody.type = cc.RigidBodyType.Dynamic, 
            this.headRigBody.type = cc.RigidBodyType.Dynamic, this.leftHandTopRigBody.type = cc.RigidBodyType.Dynamic, 
            this.rightHandTopRigBody.type = cc.RigidBodyType.Dynamic, this.leftHandBottomRigBody.type = cc.RigidBodyType.Dynamic, 
            this.rightHandBottomRigBody.type = cc.RigidBodyType.Dynamic;
        }, 0);
    }

    // loadSkin() {
    //     return;
    //     var e = i.default.instance.currentSkin;
    //     if (1 != e) {
    //         var t = "sk" + e;
    //         "right" == this.node.name.split("_")[1].toLowerCase() ? (t = "sk" + e + "_right", 
    //         this.loadSkinRight(l.default.instance.skinAry[t])) : this.loadSkinLeft(l.default.instance.skinAry[t]);
    //     }
    // }

    // loadSkinLeft(e) {
    //     return;
    //     for (var t = e.getSpriteFrames(), o = 0; o < t.length; o++) {
    //         var n = t[o];
    //         switch (n.name) {
    //           case "left_hand_top":
    //             this.leftHandTopRigBody.getComponent(cc.Sprite).spriteFrame = n;
    //             break;

    //           case "left_hand_bottom":
    //             this.leftHandBottomRigBody.getComponent(cc.Sprite).spriteFrame = n, this.leftMoveHand.getComponent(cc.Sprite).spriteFrame = n;
    //             break;

    //           case "left_foot_top":
    //             this.leftFootTopRigBody.getComponent(cc.Sprite).spriteFrame = n;
    //             break;

    //           case "left_foot_bottom":
    //             this.leftFootBottomRigBody.getComponent(cc.Sprite).spriteFrame = n;
    //             break;

    //           case "body":
    //             this.bodyRigBody.getComponent(cc.Sprite).spriteFrame = n;
    //             break;

    //           case "head":
    //             this.headRigBody.getComponent(cc.Sprite).spriteFrame = n;
    //             break;

    //           case "right_hand_top":
    //             this.rightHandTopRigBody.getComponent(cc.Sprite).spriteFrame = n;
    //             break;

    //           case "right_hand_bottom":
    //             this.rightHandBottomRigBody.getComponent(cc.Sprite).spriteFrame = n;
    //             break;

    //           case "right_foot_top":
    //             this.rightFootTopRigBody.getComponent(cc.Sprite).spriteFrame = n;
    //             break;

    //           case "right_foot_bottom":
    //             this.rightFootBottomRigBody.getComponent(cc.Sprite).spriteFrame = n;
    //         }
    //     }
    // }
    // loadSkinRight(e) {
    //     return;
    //     for (var t = e.getSpriteFrames(), o = null, n = 0; n < t.length; n++) {
    //         var a = t[n];
    //         switch (a.name) {
    //           case "_2":
    //             o = this.leftHandTopRigBody.getComponent(cc.Sprite);
    //             break;

    //           case "_5":
    //             o = this.leftHandBottomRigBody.getComponent(cc.Sprite), this.leftMoveHand.getComponent(cc.Sprite).spriteFrame = a;
    //             break;

    //           case "_6":
    //             o = this.leftFootTopRigBody.getComponent(cc.Sprite);
    //             break;

    //           case "_9":
    //             o = this.leftFootBottomRigBody.getComponent(cc.Sprite);
    //             break;

    //           case "_3":
    //             o = this.bodyRigBody.getComponent(cc.Sprite);
    //             break;

    //           case "_1":
    //             o = this.headRigBody.getComponent(cc.Sprite);
    //             break;

    //           case "_4":
    //             o = this.rightHandTopRigBody.getComponent(cc.Sprite);
    //             break;

    //           case "_8":
    //             o = this.rightHandBottomRigBody.getComponent(cc.Sprite);
    //             break;

    //           case "_7":
    //             o = this.rightFootTopRigBody.getComponent(cc.Sprite);
    //             break;

    //           case "_10":
    //             o = this.rightFootBottomRigBody.getComponent(cc.Sprite);
    //         }
    //         var l = o.node.getContentSize();
    //         o.spriteFrame = a, o.node.setContentSize(l);
    //     }
    // }



    tntEffct() {
        this.updateRigBody(), 
        this.hitJointRgBody.applyLinearImpulse(this.hitDir.mul(6e3), this.hitPoint, true);
    }


    runTrigger() {
        this.trigger && !this.isTrigger && (this.isTrigger = true, this.scheduleOnce(() => {
            this.trigger.getComponent(cc.RigidBody).type = cc.RigidBodyType.Dynamic, 
            this.trigger.getComponent(cc.PhysicsCircleCollider).tag = Common.Tag.tagCircle, 
            this.trigger.getComponent(cc.PhysicsCircleCollider).apply();
        }, 0));
    }

    // update (dt) {}
}
