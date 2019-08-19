import GameManager from "../managers/GameManager";
import XYJAPI from "./XYJAPI";
import WXUtils from "../wechat/WXUtils";
import WXImage from "../wechat/WXImage";

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
 * 小幺鸡更多游戏按钮
 */

@ccclass
export default class XYJMoreGameButton extends cc.Component {

    @property({
        displayName: "微信AppID"
    })
    wxAppID: string = "wx269f9d2cb8130024";

    @property({
        displayName: "跳转页面"
    })
    wxAppPath: string = "";

    @property({
        displayName: "预览图"
    })
    previewImage: string = "";


    start() {
        this.node.on(cc.Node.EventType.TOUCH_END, this.tapHandler, this);
    }


    // update (dt) {}

    /**
     * 广告按钮点击
     * @param e 
     */
    private tapHandler(e: cc.Event.EventTouch): void {
        if (this.node.opacity < 10) return;

        GameManager.soundsManager.playTapSound();

        WXUtils.navigateToMiniProgram(this.wxAppID, this.wxAppPath, null, null, (err) => {
            //预览图片
            if (this.wxAppPath) {
                WXImage.previewImage([this.previewImage]);
            }
        });
    }


    onDestroy() {
    }
}
