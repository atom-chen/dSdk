import Common from "./Common";
import AudioManager from "./AudioManager";
import PrfabsManager from "./PrfabsManager";
import GrenadeCollider from "./GrenadeCollider";
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
export default class BoomBox extends cc.Component {
    @property(cc.Node)
    BoxSpriteNode:cc.Node = null;
    
    @property(Boolean)
    isBoom:Boolean = false;

    @property(Boolean)
    isTnt:Boolean = true;


    /**新参数0703 */
    @property(cc.Node)
    countNode:cc.Node = null;
    
    @property(cc.Label)
    countLabel:cc.Label = null;

    @property(Number)
    colliderTotalCount:number = 0;

    colliderCount = 0;

    start(){

        if(this.colliderTotalCount > 0){
            this.scheduleOnce(() => {
                this.countNode.active = true;
                this.countLabel.string = this.colliderTotalCount.toString();
            })
        }

    }
    
    

    boomEffct = function() {
        if (this.BoxSpriteNode.runAction(cc.fadeOut(.2)), this.colliderTotalCount > 0 && (this.countNode.active = false)){

        }

        var e = cc.instantiate(PrfabsManager.instance.prfabsAry.BoxBoomEffectNode);
        e.getComponent(cc.ParticleSystem).resetSystem(), e.position = this.node.position, 
        cc.find("Canvas").addChild(e);
    
        this.node.getComponent(cc.PhysicsCollider) && (this.node.group = "rope", this.node.getComponent(cc.PhysicsCollider).sensor = true, 
        this.node.getComponent(cc.PhysicsCollider).apply());

    }

    onCollisionEnter(e, t) {
        e.tag == Common.Tag.tagBullet && (AudioManager.instance.playSound("boombox"), this.boomEffct(), 
        t.enabled = false, e.node.destroy(),this.node.dispatchEvent(new cc.Event.EventCustom(Common.eventMessage.bulletRemove,true)));
    }

    onBeginContact(e, t, o) {
        if(!o.enabled){
            return;
        }
        if(this.isBoom){
            e.disabled = true;
        }else{
            if(o.tag == Common.Tag.tagBullet){
                if(this.colliderTotalCount > 0){
                    this.colliderCount ++;
                    this.countLabel.string = (this.colliderTotalCount - this.colliderCount).toString()
                }
                if(this.colliderCount >= this.colliderTotalCount){
                    this.isBoom = true;
                    AudioManager.instance.playSound("boombox");
                    this.boomEffct();
                    this.node.dispatchEvent(new cc.Event.EventCustom(Common.eventMessage.bulletRemove,true));
                }
            }
            else if(o.tag == Common.Tag.tagGrenade && o.node.parent.getComponent(GrenadeController).isBoom){
                this.isBoom = true;
                AudioManager.instance.playSound("boombox");
                this.boomEffct();
            }else if(o.tag == Common.Tag.tagTNT){
                this.isBoom = true;
                AudioManager.instance.playSound("boombox");
                this.boomEffct();
            }
        }


    

    }



    // update (dt) {}
}
