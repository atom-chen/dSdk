import WXUser from "../wechat/WXUser";
import Utils from "../managers/Utils";
import GameValues from "../base/GameValues";
import WXUtils from "../wechat/WXUtils";
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
 * 用户按钮
 */
@ccclass
export default class Comp_UserInfoButton extends cc.Component {

    @property({
        displayName: "图片URL"
    })
    buttonBG: string = "https://deer-cdn.youkongwan.com/common/blank.png"

    @property({
        displayName: "延迟时间"
    })
    delay: number = 0;

    @property({
        displayName: "有弹出层时自动隐藏"
    })
    hideWhenHasPopUp: boolean = true;

    @property({
        displayName: "必须授权"
    })
    must: boolean = false;


    /**
     * 回调
     */
    callback: Function;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    private _button: any;

    start() {
        if (GameValues.isDebug) {
            this.buttonBG = "https://deer-cdn.youkongwan.com/common/blank_debug.png";
            // this.buttonBG = "https://deer-cdn.youkongwan.com/game/pinyiduo/stageavt/7.png";
        }

        this._lastPosition = this.node.convertToWorldSpaceAR(new cc.Vec2(0, 0));
        
        if (this.delay <= 0) {
            this.createButton();
        } else {
            this.scheduleOnce(this.createButton, this.delay);
        }
    }


    private createButton(): void {
        if (WXUser.userInfo) {
            return;
        }

        let rec: cc.Rect = this.node.getBoundingBoxToWorld();
        rec = Utils.toScreenRect(rec);

        this._button = WXUser.createUserInfoButton(this.buttonBG, rec, this.createButtonTapCallback.bind(this));
    }

    // update (dt) {}


    /**
     * 刷新UI
     */
    public refresh(): void {
        if (this._button) {
            WXUser.destroyUserInfoButton(this._button);
            this._button = null;

            this.createButton();
        }
    }


    private createButtonTapCallback(res: any): void {
        if (this.must && !WXUser.userInfo) {
            //如果有设定必须授权
            WXUtils.showToast("请允许获得您的昵称和头像", 2000);
            return;
        }

        if (this.callback) this.callback(res);
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

        //================================================
        //检查是否隐藏，或者销毁
        
        //该方法无效。向上递归
        // this.node.activeInHierarchy
        //================================================
        let targetNode:cc.Node = this.node;
        let currentScene:cc.Node = cc.director.getScene();
        while(targetNode) {
            if (!targetNode.active || targetNode.opacity <= 0) {
                toShow = false;
                break;
            }
            
            targetNode = targetNode.getParent();
            if(targetNode == currentScene) {
                break;
            }
        }
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
            WXUser.destroyUserInfoButton(this._button);
            this._button = null;
        }
    }
}
