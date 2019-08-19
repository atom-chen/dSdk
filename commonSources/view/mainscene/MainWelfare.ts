import BasePanelComp from "../base/BasePanelComp";
import GameUtils from "../../GameUtils";
import MainDataMgr from "../../module/data/MainDataMgr";
import DeerSDK from "../../gamecore/deer/DeerSDK";
import GameConfig from "../stageMode/GameConfig";
import StageDataMgr from "../../module/data/StageDataMgr";


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

@ccclass
export default class MainWelfare extends BasePanelComp {


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    @property(cc.Node)
    bt1:cc.Node = null;
    
    @property(cc.Label)
    txtCoinNum:cc.Label = null;
    onLoad(){
        GameUtils.instance.wxOnshow();
    }

    start(){
        this.init();
        this.txtCoinNum.string = "x" + GameConfig.instance.gameMeta.welfareCentreMeta[0].coinReward;
    }

    /** 
    我的小程序：1104
    */
    getAward() {
        // GameUtils.buriedPoint(12);
        let iswelfare: number = MainDataMgr.instance.getData(MainDataMgr.KEY_WELFAREDAY);
        if (iswelfare === DeerSDK.instance.serverTime.getDate()) {
            GameUtils.showToast("今日已领取");
            return;
        }
        let scene: string = GameConfig.instance.scene;
        if (scene == "1001" || scene == "1089") {
            // GameConfig.instance.saveDimond(new MaxValue(3, 0));
            StageDataMgr.instance.setData(StageDataMgr.KEY_USER_HP_NUM, StageDataMgr.instance.getData(StageDataMgr.KEY_USER_HP_NUM) + GameConfig.instance.gameMeta.welfareCentreMeta[0].coinReward);
            GameUtils.showToast("恭喜获得" + GameConfig.instance.gameMeta.welfareCentreMeta[0].coinReward + "体力")
            MainDataMgr.instance.setData(MainDataMgr.KEY_WELFAREDAY, DeerSDK.instance.serverTime.getDate(), false);

            // this.showFlyGoldEvent(this.bt1,cc.find("Canvas/leftnode/dimondbg/dimondtext"),0);
            this.showFlyGoldEvent(this.bt1,cc.find("Canvas/leftnode/hpContent"),2);
            GameUtils.buriedPoint(14);

            this.scheduleOnce(()=>{
                if(this.node){
                    this.close();
                }
            },1)
        } else {
            GameUtils.showToast("请从我的小程序打开游戏");
        }
    }

}
