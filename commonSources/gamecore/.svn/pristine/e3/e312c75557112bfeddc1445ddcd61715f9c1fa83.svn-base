import DeerSDK, { DeerAdType, DeerAdVO } from "./DeerSDK";
import DeerSDKEventNames from "./DeerSDKEventNames";
import EventData from "../managers/event/EventData";
import Comp_DeerIconAd from "./Comp_DeerIconAd";
import ItemBase from "../managers/item/ItemBase";

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
 * 猜你喜欢广告列表
 */
@ccclass
export default class Comp_DeerRecommendAdList extends cc.Component {

    @property({
        displayName:"广告显示大小"
    })
    adSize:number = 100;

    @property({
        displayName:"广告显示数"
    })
    adMaxCount:number = 0;

    @property({
        displayName:"水平间距"
    })
    gapH:number = 10;
    
    //item renderer
    @property({
        displayName:"自动更新广告",
        tooltip:"启用后，被点击的广告会自动更新显示另外的广告"
    })
    renewAd:boolean = false;

    //item renderer
    @property({
        type:cc.Prefab,
        displayName:"单个广告预制体"
    })
    adItemPrefab:cc.Prefab = null;

    onLoad () {
        this.node.opacity = 0;
    }

    start () {
        if (DeerSDK.instance.isReady) {
            this.loadAdData();
        } else {
            DeerSDK.instance.addEventListener(DeerSDKEventNames.READY, this.deerSDKReadyHandler, this);
        }

        // let ad:DeerAdVO = new DeerAdVO();
        // ad.id = 5;
        // ad.icon = "https://deer-cdn.youkongwan.com/game/pinyiduo/stageavt/7.png";
        // ad.name = "fefe";
        // let ads:Array<DeerAdVO> = [ad, ad, ad, ad, ad,ad];
        // this.showAds(ads)
    }

    
    private deerSDKReadyHandler(e:EventData):void {
        this.loadAdData();
    }


    /**
     * 请求广告数据
     */
    protected loadAdData():void {
        DeerSDK.instance.removeEventListener(DeerSDKEventNames.READY, this.deerSDKReadyHandler, this);

        DeerSDK.instance.ad_getAdData(DeerAdType.RECOMMEND, (ads:Array<DeerAdVO>) => {
            this.showAds(ads);
        });
    }


    /**
     * 显示数据
     */
    public showAds(ads:Array<DeerAdVO>):void {
        if (!ads || ads.length == 0) return;

        if (this.renewAd) {
            Comp_DeerIconAd.adPool = ads;
        }

        this.node.opacity = 255;

        let len:number = ads.length;
        if (this.adMaxCount > 0) len = Math.min(len, this.adMaxCount);

        for (let i:number = 0; i < len; i++) {
            let item:cc.Node = cc.instantiate(this.adItemPrefab);
            item.width = this.adSize;
            item.height = this.adSize;
            item.x = (item.width + this.gapH) * i + item.width / 2 + this.gapH;
            let data:DeerAdVO = ads[i];
            data["index"] = i;
            item.getComponent(Comp_DeerIconAd).data = data;
            this.node.addChild(item);
        }

        this.node.width = (this.adSize + this.gapH) * len + this.gapH;
    }


    onDestroy() {
        DeerSDK.instance.removeEventListener(DeerSDKEventNames.READY, this.deerSDKReadyHandler, this);
    }
}


