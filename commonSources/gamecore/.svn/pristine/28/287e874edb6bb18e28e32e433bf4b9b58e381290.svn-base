import GameManager from "../managers/GameManager";
import WXDevice from "../wechat/WXDevice";

// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

/**
 * 震动控制按钮
 */
@ccclass
export default class Comp_VibrateButton extends cc.Component {

    @property({
        type:cc.SpriteFrame,
        displayName:"震动已开启"
    })
    onSpriteFrame: cc.SpriteFrame = null;

    @property({
        type:cc.SpriteFrame,
        displayName:"震动已关闭"
    })
    offSpriteFrame: cc.SpriteFrame = null;

    

    start () {
        this.node.on(cc.Node.EventType.TOUCH_END, this.tapHandler, this);

        this.refreshU();
    }

    // update (dt) {}


    private tapHandler(e:cc.Event):void {
        GameManager.soundsManager.playTapSound();

        if (GameManager.canVibrate) {
            GameManager.vibrateOff();
        } else {
            GameManager.vibrateOn();

            //震动一次
            WXDevice.vibrateShort();
        }

        this.refreshU();
    }


    private refreshU():void {
        let sprite:cc.Sprite = this.node.getComponent(cc.Sprite);
        if (!sprite) return;

        if (GameManager.canVibrate) {
            sprite.spriteFrame = this.onSpriteFrame;
        } else {
            sprite.spriteFrame = this.offSpriteFrame;
        }
    }
}
