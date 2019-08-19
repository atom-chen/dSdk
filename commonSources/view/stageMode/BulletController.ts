import Common from "./Common";

import AudioManager from "./AudioManager";
import GameMainMgr from "./GameMainMgr";
import GameConfig from "./GameConfig";

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
export default class BulletController extends cc.Component {

    @property(cc.RigidBody)
    bulletBody:cc.RigidBody = null;
    
    
    public finshCount = 0;
    // LIFE-CYCLE CALLBACKS:

    isRemoved:boolean = false;
    onEndContact(e, t, o) {
        if(o.tag == Common.Tag.tagPlat){
            AudioManager.instance.playSound("plat")
        }
        if(o.tag != Common.Tag.tagBodyJoint){
            if(o.tag != Common.Tag.tagHostage){
                if(o.tag != 0){
                    this.finshCount ++;
                    if(this.finshCount >= GameConfig.bulletReboundNum){
                        if(this.isRemoved){
                            return;
                        }
                        this.isRemoved = true;
                        this.node.dispatchEvent(new cc.Event.EventCustom(Common.eventMessage.bulletRemove,true));
                        this.node.active = false;
                    }
                }
            }
        }
    }
    update(e) {
        if(Math.abs(this.node.x) > 540 || Math.abs(this.node.y) > 1920){
            if(this.isRemoved){
                return;
            }
            this.isRemoved = true;
            if(GameMainMgr.curGameState == GameMainMgr.gameState.ACTIVE){
                this.node.dispatchEvent(new cc.Event.EventCustom(Common.eventMessage.bulletRemove,true));
            }
            this.node.active = false;
        }
    }

    start () {
    }

    // update (dt) {}
}
