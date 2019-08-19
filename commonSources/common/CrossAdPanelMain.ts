import XYJAPI from "../gamecore/xiaoyaoji/XYJAPI";
import CrossAdItemMain from "./CrossAdItemMain";
import DeerSDK, { DeerAdType, DeerAdVO } from "../gamecore/deer/DeerSDK";
import DeerSDKEventNames from "../gamecore/deer/DeerSDKEventNames";
import EventData from "../gamecore/managers/event/EventData";

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
 * 交叉推广
 */
@ccclass
export default class CrossAdPanelMain extends cc.Component {

    //交叉推广item
    @property(cc.Prefab)
    crossAdItemPrefab:cc.Prefab = null;

    // onLoad () {}

    start() {
        if (DeerSDK.instance.isReady) {
            this.loadAdData();
        } else {
            DeerSDK.instance.addEventListener(DeerSDKEventNames.READY, (e:EventData) => {
                this.loadAdData();
            }, this, 0, true);
        }

        // this.schedule(this.checkData, 0.2, cc.macro.REPEAT_FOREVER);
        // this.checkData();
    }

    // update (dt) {}


    private loadAdData():void {
        DeerSDK.instance.ad_getAdData(DeerAdType.GAME_OVER, (ads:Array<DeerAdVO>) => {
            if (ads) this.showAds(ads.concat());
        });
    }

    private showAds(ads:Array<DeerAdVO>): void {
        if(!ads || ads.length <= 0) return;
        let data:Array<any> = ads;
        if (data && data.length > 0) {
            let len: number = Math.min(6, data.length);
            for (let i: number = 0; i < len; i++) {
                data[i].index = i;
                let item: cc.Node = cc.instantiate(this.crossAdItemPrefab);
                if(item && item.getComponent(CrossAdItemMain)){
                    item.getComponent(CrossAdItemMain).data = data[i];
                    this.node.addChild(item);
                }else{
                    item.destroy();
                }
            }
        }
    }

    // update (dt) {}
}
