import BasePanelComp from "../base/BasePanelComp";
import GameUtils from "../../GameUtils";
import GameConfig from "../stageMode/GameConfig";
import StageDataMgr from "../../module/data/StageDataMgr";
import { IKeyRewardMeta } from "../../module/meta/pbcus";
import GameManager from "../../gamecore/managers/GameManager";
import SoundMgr from "../../SoundMgr";

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
export default class KeyGift extends BasePanelComp {

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}


    start () {
        this.init();
        this.info = GameConfig.instance.getKeyNumByGoldNum();

    }

    private info:IKeyRewardMeta = null;
    private getKeyByGoldClick(e:cc.Event):void{
        let curGoldNum :number = StageDataMgr.instance.getData(StageDataMgr.KEY_USER_GOLD_NUM);
        if(curGoldNum < this.info.price){
            GameUtils.showToast("您的金币不足");
            return;
        }else{
            StageDataMgr.instance.setData(StageDataMgr.KEY_USER_GOLD_NUM,curGoldNum - this.info.price);
            SoundMgr.instance.playSound("sounds/useMoney");

            StageDataMgr.instance.setData(StageDataMgr.KEY_USER_DIMOND_NUM,StageDataMgr.instance.getData(StageDataMgr.KEY_USER_DIMOND_NUM) + this.info.num);
            GameUtils.showToast( "恭喜您获得钥匙:" + this.info.num + "把");
            this.showFlyGoldEvent(this.node,cc.find("Canvas/leftnode/dimondbg/dimondtext"),0);

            GameUtils.buriedPoint(9);
            this.close();

        }
    }


    private getCoinVideoClick(e:cc.Event):void{
        if(e){
            GameManager.soundsManager.playTapSound();
        }
        let rewardNum = 0 + this.info.num;
        GameUtils.instance.showVideoAd(
            () => {
              if(this.node){
                this.showFlyGoldEvent(this.node,cc.find("Canvas/leftnode/dimondbg/dimondtext"),0);
                this.close();
              }
              StageDataMgr.instance.setData(StageDataMgr.KEY_USER_DIMOND_NUM,StageDataMgr.instance.getData(StageDataMgr.KEY_USER_DIMOND_NUM) + rewardNum);      
              GameUtils.showToast( "恭喜您获得钥匙:" + rewardNum + "把");
              GameUtils.buriedPoint(8);
            },
            () => {
              if(this.info && this.info.num){
                GameUtils.showAlert(
                  "观看完整视频可获得钥匙" + this.info.num + "把",
                 () => {
                   //重新观看
                   this.getCoinVideoClick(null);
                 }
               )
              }
            },
            () => {
              GameUtils.instance.playFailOnShare((res: number) => {
                switch (res) {
                  case 1:
                    if(this.node){
                      this.showFlyGoldEvent(this.node,cc.find("Canvas/leftnode/dimondbg/dimondtext"),0);
                      this.close();
                    }
                    StageDataMgr.instance.setData(StageDataMgr.KEY_USER_DIMOND_NUM,StageDataMgr.instance.getData(StageDataMgr.KEY_USER_DIMOND_NUM) + rewardNum);
                    GameUtils.showToast( "恭喜您获得钥匙:" + rewardNum + "把");
                    GameUtils.buriedPoint(8);
                    break;
                }
              }, "mainKeyGift");
            }
          );
    }




    // update (dt) {}
}
