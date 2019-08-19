import GameManager from "../managers/GameManager";

// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

/**
 * 音效控制按钮
 */
@ccclass
export default class Comp_MusicButton extends cc.Component {

    @property({
        type: cc.SpriteFrame,
        displayName: "音效已关闭"
    })
    muteSpriteFrame: cc.SpriteFrame = null;

    @property({
        type: cc.SpriteFrame,
        displayName: "音效已开启"
    })
    unmuteSpriteFrame: cc.SpriteFrame = null;




    start() {

        this.node.on(cc.Node.EventType.TOUCH_END, this.tapHandler, this);

        this.refreshU();
    }

    // update (dt) {}


    private tapHandler(e: cc.Event): void {
        GameManager.soundsManager.playTapSound();

        if (GameManager.soundsManager.soundMuted) {
            GameManager.soundsManager.unmuteSound();

        } else {
            GameManager.soundsManager.muteSound();
        }

        this.refreshU();
    }


    private refreshU(): void {
        let sprite: cc.Sprite = this.node.getComponent(cc.Sprite);
        if (!sprite) return;

        if (GameManager.soundsManager.soundMuted) {
            sprite.spriteFrame = this.muteSpriteFrame;
        } else {
            sprite.spriteFrame = this.unmuteSpriteFrame;
        }
    }
}
