import WXBannerAd from "./WXBannerAd";
import Utils from "../managers/Utils";
import WXBannerAdBase from "./WXBannerAdBase";
import WXUtils from "./WXUtils";

// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

/**
 * 靠近右上角菜单按钮
 */
@ccclass
export default class Comp_NearToMenuButton extends cc.Component {

    @property({
        displayName: "间隔距离"
    })
    distanceToMenu: number = 10;

    @property({
        displayName: "调整位置延迟"
    })
    layoutDelay: number = 0.8;


    onLoad() {
    }

    start() {
        if (this.layoutDelay > 0) {
            this.scheduleOnce(() => {
                // this._relayoutWhenUpdate = true;
                this.relayout();
            }, this.layoutDelay);
        } else {
            // this._relayoutWhenUpdate = true;
            this.relayout();
        }
    }

    // update (dt) {}


    // private _relayoutWhenUpdate: boolean = false;

    // update(dt) {
    //     if (this._relayoutWhenUpdate) this.relayout();
    // }

    
    private _adIsShowing: any = null;

    /**
     * 重新布局
     */
    public relayout(): void {
        //调整位置
        let po: cc.Vec2 = new cc.Vec2(cc.winSize.width - 10, cc.winSize.height - 10);
        let rec: {"x":number, "y":number, "width":number, "height":number} = WXUtils.getMenuButtonLayout();
        if (rec && rec.width > 0) {
            po = new cc.Vec2(rec.x, rec.y);
        }

        po = this.node.getParent().convertToNodeSpaceAR(po);
        // this.node.runAction(cc.moveTo(0.3, this.node.x, po.y - this.node.height / 2 - 10));
        this.node.y = po.y - this.node.height * ( 1 - this.node.anchorY) - this.distanceToMenu;
    }
}
