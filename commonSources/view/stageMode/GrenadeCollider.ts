import Common from "./Common";
import AudioManager from "./AudioManager";
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
export default class GrenadeCollider extends cc.Component {
    
    @property(GrenadeController)
    grenadeController:GrenadeController = null;

    soundCount = 0;
    // LIFE-CYCLE CALLBACKS:

    onBeginContact = function(e, t, o) {
        if (o.tag == Common.Tag.tagBodyJoint && this.grenadeController.isBoom && (e.disabled = true), 
        o.tag == Common.Tag.tagPlat) {
            var a = this.grenadeController.grenadeBody.getMass();
            this.grenadeController.isBoom || a < 1.5 && this.soundCount <= 3 && (AudioManager.instance.playSound("plat"), 
            this.soundCount++);
        }
    }
    // update (dt) {}
}
