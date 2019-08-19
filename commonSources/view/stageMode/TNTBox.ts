import Common from "./Common";
import AudioManager from "./AudioManager";
import PrfabsManager from "./PrfabsManager";
import StageDataMgr from "../../module/data/StageDataMgr";
import { MODE_TYPE_STRUCT } from "./GameConfig";
import BulletController from "./BulletController";
import GrenadeController from "./GrenadeController";

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
export default class TNTBox extends cc.Component {
    
    isHit = false
    isBoom = false
    particleNode = null

    @property(cc.Node)
    bomImg:cc.Node = null

    @property(Boolean)
    isLink:Boolean = false;
    
    @property(Number)
    circleSize:Number = 360;
       
    @property(Number)
    colliderSize:number = 3.4;

    @property(Boolean)
    hitSwitch:Boolean = false;

    @property(Boolean)
    isOpenBoom:Boolean = false;

    @property(Boolean)
    isReboundBullet:Boolean = false;

    
    @property(Boolean)
    isRoadBoom:Boolean = false;

    start(){
    }
                    

    onBeginContact(e, t, o) {
        if(t.enabled == false || o.enabled == false){
            // console.log(t.node.name,t.tag,o.node.name,o.tag,"TNTBox",t.enabled,o.enabled);
            return;

        }else{
            // console.log(t.node.name,t.tag,o.node.name,o.tag,"TNTBox",t.enabled,o.enabled);
        }

         t.tag == Common.Tag.tagTNTBorder && (o.tag == Common.Tag.tagBullet || this.hitSwitch && o.tag == Common.Tag.tagBodyJoint) ?
          StageDataMgr.CUR_MODE != MODE_TYPE_STRUCT.MODE3 || 14 != StageDataMgr.CUR_LEVEL || this.isBoom ? e.disabled = true : this.boomEffct() :
           o.tag != Common.Tag.tagTNT || this.isBoom ? o.tag == Common.Tag.tagBullet && t.tag == Common.Tag.tagTNT ? this.isReboundBullet ?
            this.isBoom || this.boomEffct() : (e.disabled = true, 
            this.isBoom || (this.boomEffct(), o.node.destroy(), 

            this.node.dispatchEvent(new cc.Event.EventCustom(Common.eventMessage.bulletRemove,true))
            )) : o.tag == Common.Tag.tagBodyJoint ? this.hitSwitch && (this.isBoom || this.boomEffct()) : o.tag == Common.Tag.tagTrigger ?
             this.isBoom ||
             this.boomEffct() : o.tag == Common.Tag.tagGrenade && o.node.parent.getComponent(GrenadeController).isBoom ? this.isBoom ||
              this.boomEffct() :
              o.tag == Common.Tag.tagBullet && this.hitSwitch ? this.isBoom || this.boomEffct() : t.tag == Common.Tag.tagTNTBorder &&
               o.tag == Common.Tag.tagPlat &&
               this.isRoadBoom ? this.isBoom || this.boomEffct() : o.tag == Common.Tag.tagNone &&
                (this.isBoom || StageDataMgr.CUR_MODE == MODE_TYPE_STRUCT.MODE3 &&
                83 == StageDataMgr.CUR_LEVEL && o.node.getComponent(cc.RigidBody).linearVelocity.mag() > 3.5 && this.boomEffct()) : this.boomEffct();
    }
    boomEffct() {
         this.isBoom = true, this.node.getComponent(cc.Sprite).spriteFrame = null, this.node.getComponent(cc.PhysicsCircleCollider).enabled = true, 
         this.node.getComponent(cc.PhysicsCircleCollider).apply(), this.node.getComponent(cc.PhysicsPolygonCollider) &&
          (this.node.getComponent(cc.PhysicsPolygonCollider).sensor = true, 
         this.node.getComponent(cc.PhysicsPolygonCollider).apply());
         var e = this;
        //  console.log("boomEffct >>>"),
          AudioManager.instance.playSound("bomb");
         var t = cc.instantiate(PrfabsManager.instance.prfabsAry.TNTEffectNode);
         t.getComponent(cc.ParticleSystem).resetSystem(), this.node.addChild(t), t.active = true;
         this.bomImg.active = true, this.bomImg.runAction(cc.spawn(cc.scaleTo(.3, this.colliderSize), cc.fadeOut(.2))), 
         this.scheduleOnce(() => {
             if(e && e.node){
                e.node.destroy();
             }
         }, .3);
    }


    // update (dt) {}
}
