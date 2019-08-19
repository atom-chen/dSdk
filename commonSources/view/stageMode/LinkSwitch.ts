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
import StageDataMgr from "../../module/data/StageDataMgr";
import { MODE_TYPE_STRUCT } from "./GameConfig";
import TNTBox from "./TNTBox";
import MoveNode from "./MoveNode";
const {ccclass, property} = cc._decorator;

@ccclass
export default class LinkSwitch extends cc.Component {

    @property(cc.Node)
    linkNode:cc.Node = null;
    
    @property(Boolean)
    isOpen:Boolean = false;
    
    @property(Number)
    linkType:Number = 0;
    
    @property(cc.SpriteFrame)
    offSpriteFrame:cc.SpriteFrame = null;


    onBeginContact(e, t, o) {
        (o.tag != Common.Tag.tagBullet || this.isOpen) && (o.tag != Common.Tag.tagBodyJoint || this.isOpen) && (o.tag != Common.Tag.tagCircle || this.isOpen) && 
        (o.tag != Common.Tag.tagGrenade || o.node.parent.getComponent("GrenadeController").isBoom ||
         this.isOpen) && (o.tag != Common.Tag.tagCubeBox || this.isOpen) || (AudioManager.instance.playSound("link"), 
        this.isOpen = true, this.switchEffct());
    }
    // switchEffct() {
    //     var e = StageDataMgr.CUR_LEVEL, t = StageDataMgr.CUR_MODE;
    //     if (this.scheduleOnce(function() {
    //         0 == this.node.rotation ? this.node.y += 30 : 180 == this.node.rotation ? this.node.y -= 30 :
    //          90 == this.node.rotation ? this.node.x += 20 : -90 == this.node.rotation ? this.node.x -= 20 :
    //           -90 == this.node.rotation ? this.node.x -= 20 : -41 == this.node.rotation ? (this.node.x = -320, 
    //         this.node.y = 708) : 32 == this.node.rotation && (this.node.x = 296, this.node.y = 729), 
    //         7 == e && 45 == this.node.rotation && t == MODE_TYPE_STRUCT.MODE2 ? (this.node.x = 360, 
    //         this.node.y = 560) : 7 == e && -41 == this.node.rotation && t == MODE_TYPE_STRUCT.MODE2 ? (this.node.x = -352, 
    //         this.node.y = 557) : 26 == e && t == MODE_TYPE_STRUCT.MODE2 ? (this.node.x = 259.2, this.node.y = 439) : 50 == e && t == MODE_TYPE_STRUCT.MODE2 && "LinkSwitch2" == this.node.name ? (this.node.x = 384, 
    //         this.node.y = 424) : 50 == e && t == MODE_TYPE_STRUCT.MODE2 && "LinkSwitch" == this.node.name ? (this.node.x = -210, 
    //         this.node.y = 422) : 116 == e && t == MODE_TYPE_STRUCT.MODE1 ? (this.node.x = -65, this.node.y = -116) : 116 == e && t == MODE_TYPE_STRUCT.MODE1 ? (this.node.x = -65, 
    //         this.node.y = -116) : 131 == e && t == MODE_TYPE_STRUCT.MODE1 && "Link1" == this.node.name ? (this.node.x = -399, 
    //         this.node.y = 566) : 131 == e && t == MODE_TYPE_STRUCT.MODE1 && "Link2" == this.node.name ? (this.node.x = -26, 
    //         this.node.y = 714) : 131 == e && t == MODE_TYPE_STRUCT.MODE1 && "Link3" == this.node.name && (this.node.x = 357, 
    //         this.node.y = 558), this.node.getComponent(cc.Sprite).spriteFrame = this.offSpriteFrame, 
    //         this.getComponent(cc.PhysicsBoxCollider).sensor = true, this.getComponent(cc.PhysicsBoxCollider).apply();
    //     }, 0), 1 == this.linkType) this.linkNode.getComponent(TNTBox).boomEffct(); else if (2 == this.linkType) this.linkNode.runAction(cc.sequence(cc.fadeOut(.1), cc.removeSelf())); else if (3 == this.linkType) {
    //         this.linkNode.opacity = 0, this.linkNode.active = true, "link_line" == this.linkNode.parent.name && (this.linkNode.parent.getComponent(cc.Sprite).spriteFrame = null), 
    //         this.linkNode.runAction(cc.fadeIn(.3)), this.linkNode.getComponent(cc.RigidBody) && (this.linkNode.getComponent(cc.RigidBody).gravityScale = 3);
    //     } else if (4 == this.linkType) {
    //         var o = this, l = this.linkNode.children[0];
    //         this.linkNode.getComponent(cc.PhysicsCollider).sensor = true, this.linkNode.getComponent(cc.PhysicsCollider).apply(), 
    //         this.linkNode.runAction(cc.sequence(cc.callFunc(function() {
    //             if (l) for (var e = 0; e < l.childrenCount; e++) l.children[e].getComponent(cc.RigidBody) && (l.children[e].getComponent(cc.RigidBody).fixedRotation = false);
    //         }), cc.callFunc(function() {
    //             o.linkNode.getComponent(cc.Sprite).spriteFrame = null;
    //         })));
    //     }
    // }


    switchEffct() {
        var e = StageDataMgr.CUR_LEVEL, t = StageDataMgr.CUR_MODE;
        var o = this;
        if (this.scheduleOnce(() => {
            0 == o.node.rotation ? o.node.y += 30 : 180 == o.node.rotation ? o.node.y -= 30 : 90 == o.node.rotation ?
             o.node.x += 20 : -90 == o.node.rotation ? o.node.x -= 20 : -90 == o.node.rotation ? o.node.x -= 20 :
              -41 == o.node.rotation ? (o.node.x = -320, 
            o.node.y = 708) : 32 == o.node.rotation && (o.node.x = 296, o.node.y = 729), 7 == e && 45 == o.node.rotation &&
             t == MODE_TYPE_STRUCT.MODE2 ? (o.node.x = 360, 
            o.node.y = 560) : 7 == e && -41 == o.node.rotation && t == MODE_TYPE_STRUCT.MODE2 ? (o.node.x = -352, 
            o.node.y = 557) : 26 == e && t == MODE_TYPE_STRUCT.MODE2 ? (o.node.x = 259.2, o.node.y = 439) : 50 == e &&
             t == MODE_TYPE_STRUCT.MODE2 && "LinkSwitch2" == o.node.name ? (o.node.x = 384, 
            o.node.y = 424) : 50 == e && t == MODE_TYPE_STRUCT.MODE2 && "LinkSwitch" == o.node.name ? (o.node.x = -210, 
            o.node.y = 422) : 116 == e && t == MODE_TYPE_STRUCT.MODE1 ? (o.node.x = -65, o.node.y = -116) : 116 == e &&
             t == MODE_TYPE_STRUCT.MODE1 ? (o.node.x = -65, 
            o.node.y = -116) : 131 == e && t == MODE_TYPE_STRUCT.MODE1 && "Link1" == o.node.name ? (o.node.x = -399, 
            o.node.y = 566) : 131 == e && t == MODE_TYPE_STRUCT.MODE1 && "Link2" == o.node.name ? (o.node.x = -26, 
            o.node.y = 714) : 131 == e && t == MODE_TYPE_STRUCT.MODE1 && "Link3" == o.node.name ? (o.node.x = 357, 
            o.node.y = 558) : 134 == e && t == MODE_TYPE_STRUCT.MODE4 && "Link1" == o.node.name ? (o.node.x = -133, 
            o.node.y = 727) : 134 == e && t == MODE_TYPE_STRUCT.MODE4 && "Link2" == o.node.name && (o.node.x = 153, 
            o.node.y = 727), o.node.getComponent(cc.Sprite).spriteFrame = o.offSpriteFrame, 
            o.getComponent(cc.PhysicsBoxCollider).sensor = true, o.getComponent(cc.PhysicsBoxCollider).apply();
        }, 0), 1 == this.linkType) try {
            this.linkNode && this.linkNode.getComponent(TNTBox) && this.linkNode.getComponent(TNTBox).boomEffct();
        } catch (e) {
        } else if (2 == this.linkType) this.linkNode.runAction(cc.sequence(cc.fadeOut(.1), cc.removeSelf()));
         else if (3 == this.linkType) {
            this.linkNode.opacity = 0, this.linkNode.active = true, "link_line" == this.linkNode.parent.name &&
             (this.linkNode.parent.getComponent(cc.Sprite).spriteFrame = null), 
            this.linkNode.runAction(cc.fadeIn(.3)), this.linkNode.getComponent(cc.RigidBody) &&
             (this.linkNode.getComponent(cc.RigidBody).gravityScale = 3);
        } else if (4 == this.linkType) {
            var a = this, i = this.linkNode.children[0];
            this.linkNode.getComponent(cc.PhysicsCollider).sensor = true, this.linkNode.getComponent(cc.PhysicsCollider).apply(), 
            this.linkNode.runAction(cc.sequence(cc.callFunc(function() {
                if (i) for (var e = 0; e < i.childrenCount; e++) i.children[e].getComponent(cc.RigidBody) &&
                (i.children[e].getComponent(cc.RigidBody).fixedRotation = false);
            }), cc.callFunc(function() {
                a.linkNode.getComponent(cc.Sprite).spriteFrame = null;
            })));
        } else 5 == this.linkType && this.linkNode.getComponent(MoveNode).trigger();
    }

    start () {

    }

    // update (dt) {}
}
