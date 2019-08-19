import BasePanelComp from "../base/BasePanelComp";
import GameConfig from "../stageMode/GameConfig";
import GameUtils from "../../GameUtils";
import StageDataMgr from "../../module/data/StageDataMgr";
import DeerSDK from "../../gamecore/deer/DeerSDK";
import GameManager from "../../gamecore/managers/GameManager";

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
export default class MainGoldGift extends BasePanelComp {
  // LIFE-CYCLE CALLBACKS:

  // onLoad () {}

  @property(cc.Label)
  coin: cc.Label = null;

  @property(cc.Node)
  coins:cc.Node = null;

  @property(cc.Node)
  shine:cc.Node = null;
  
  

  start() {
    this.setCoin();
    this.init();
    
    this.shine.runAction(cc.repeatForever(cc.rotateBy(1,540)));
  }

  // private nowcoin: MaxValue = null;
  private setCoin() {
    // this.nowcoin = GameConfig.instance.glodNotAward();
    // this.coin.string = MaxCount.instance.formatVlue(this.nowcoin);
    this.coin.string = GameConfig.instance.gameMeta.coinRewardMeta[0].rewardNum + "";
  }

  private getCoin(e) {
    // if(!DeerSDK.instance.isOnline){
    //   StageDataMgr.instance.setData(StageDataMgr.KEY_USER_GOLD_NUM,StageDataMgr.instance.getData(StageDataMgr.KEY_USER_GOLD_NUM) + GameConfig.instance.gameMeta.coinRewardMeta[0].rewardNum);
    //   this.showFlyGoldEvent(this.coins,cc.find("Canvas/leftnode/coinbg/goldtext"));
    //   GameUtils.showToast(
    //     "恭喜您获得金币:" + GameConfig.instance.gameMeta.coinRewardMeta[0].rewardNum
    //   );
    //   this.close();
    //   return;
    // }
    GameManager.soundsManager.playTapSound();

    GameUtils.instance.showVideoAd(
      () => {
        StageDataMgr.instance.setData(StageDataMgr.KEY_USER_GOLD_NUM,StageDataMgr.instance.getData(StageDataMgr.KEY_USER_GOLD_NUM) + GameConfig.instance.gameMeta.coinRewardMeta[0].rewardNum);
        
        if(this.node && this.coins){
          this.showFlyGoldEvent(this.coins,cc.find("Canvas/leftnode/coinbg/goldtext"));
          this.close();
        }
        GameUtils.buriedPoint(6);
        GameUtils.showToast(
          "恭喜您获得金币:" + GameConfig.instance.gameMeta.coinRewardMeta[0].rewardNum
        );
        GameUtils.buriedPoint(6);
      },
      () => {
        GameUtils.showAlert(
          "观看完整视频可获得金币" + GameConfig.instance.gameMeta.coinRewardMeta[0].rewardNum,
          () => {
            //重新观看
            this.getCoin(null);
          }
        );
      },
      () => {
        GameUtils.instance.playFailOnShare((res: number) => {
          switch (res) {
            case 1:
              StageDataMgr.instance.setData(StageDataMgr.KEY_USER_GOLD_NUM,StageDataMgr.instance.getData(StageDataMgr.KEY_USER_GOLD_NUM) + GameConfig.instance.gameMeta.coinRewardMeta[0].rewardNum);
              if(this.node && this.coins){
                this.showFlyGoldEvent(this.coins,cc.find("Canvas/leftnode/coinbg/goldtext"));
                this.close();
              }
              GameUtils.buriedPoint(6);
              GameUtils.showToast(
                "恭喜您获得金币:" + GameConfig.instance.gameMeta.coinRewardMeta[0].rewardNum
              );
              break;
          }
        }, "MainGoldGift");
      }
    );
  }

  // update (dt) {}
}
