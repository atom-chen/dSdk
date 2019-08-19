import GameValues from "../base/GameValues";
import Utils from "../managers/Utils";
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
 * 游戏圈组件
 */
@ccclass
export default class Comp_GameClub extends cc.Component {


    @property({
        displayName: "图片URL"
    })
    buttonBG: string = "https://deer-cdn.youkongwan.com/common/blank.png"

    @property({
        displayName: "有弹出层时自动隐藏"
    })
    hideWhenHasPopUp: boolean = true;

    @property({
        displayName: "延迟时间"
    })
    delay: number = 0;

    // onLoad () {}

    private _button: any;

    start() {
        if (GameValues.isDebug) {
            this.buttonBG = "https://deer-cdn.youkongwan.com/common/blank_debug.png";
        }

        this._lastPosition = this.node.convertToWorldSpaceAR(new cc.Vec2(0, 0));

        if (this.delay <= 0) {
            this.createButton();
        } else {
            this.scheduleOnce(this.createButton, this.delay);
        }
    }


    private createButton(): void {
        if (typeof wx == "undefined") return;

        let rect: cc.Rect = this.node.getBoundingBoxToWorld();
        rect = Utils.toScreenRect(rect);

        this._button = wx.createGameClubButton({
            type: 'image',
            image: this.buttonBG,
            style: {
                left: rect.xMin,
                top: rect.yMin,
                width: rect.width,
                height: rect.height,
                lineHeight: 40
            }
        });

    }

    // update (dt) {}


    /**
     * 刷新UI
     */
    public refresh(): void {
        if (this._button) {
            this._button.destroy();
            this._button = null;

            this.createButton();
        }
    }


    

    
    update(dt) {
        let frames: number = cc.director.getTotalFrames();
        if (frames % 60 == 0) {
            this.updateButton(true);
        }
    }
    
    onDisable() {
        this.updateButton(false);
    }
    
    private _lastPosition: cc.Vec2;


    private updateButton(v:boolean):void {
        if (!this._button) return;

        let toShow: boolean = v;

        //检查是否有弹出层
        if (this.hideWhenHasPopUp && GameManager.popUpManager.popUpCount > 0) {
            toShow = false;
        }

        if (toShow) toShow = this.enabled;
        //console.log("RESULT", "toshow", toShow)
        //================================================

        let po: cc.Vec2 = this.node.convertToWorldSpaceAR(new cc.Vec2(0, 0));
        if (toShow) {
            if (po.x < 0 || po.x > cc.winSize.width || po.y < 0 || po.y > cc.winSize.height) {
                toShow = false;
            }
        }

        if (toShow) {
            //最小移动距离检测
            let dis:number = Math.sqrt((po.x - this._lastPosition.x) * (po.x - this._lastPosition.x) + (po.y - this._lastPosition.y) * (po.y - this._lastPosition.y));
            if (dis > 10) {
                this.refresh();
            } else {
                if (this._button) this._button.show();
            }

            this._lastPosition = po;
        } else {
            if (this._button) this._button.hide();
        }
    }


    onDestroy() {
        if (this._button) {
            this._button.destroy();
            this._button = null;
        }
    }
}
