import BasePanelComp from "../base/BasePanelComp";
import GameUtils from "../../GameUtils";
import GameConfig from "../stageMode/GameConfig";
import StageDataMgr from "../../module/data/StageDataMgr";
import { IKeyRewardMeta } from "../../module/meta/pbcus";
import GameManager from "../../gamecore/managers/GameManager";
import SoundMgr from "../../SoundMgr";
import MainDataMgr from "../../module/data/MainDataMgr";
import DeerSDK from "../../gamecore/deer/DeerSDK";
import MainWelfare from "./MainWelfare";

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
export default class HpGift extends BasePanelComp {

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
  @property(cc.Label)
  txtVideoNum:cc.Label = null;
  
  @property(cc.Label)
  txtGoldHpNum:cc.Label = null;

  @property(cc.Node)
  welfareNode:cc.Node = null;
  
  
    public tarAniNode:cc.Node = null;

    private goldenergyExchange:number = 1;

    onLoad(){

      let iswelfare: number = MainDataMgr.instance.getData(MainDataMgr.KEY_WELFAREDAY);
      if (iswelfare === DeerSDK.instance.serverTime.getDate() || StageDataMgr.instance.getData(StageDataMgr.KEY_USER_HP_NUM) !== 0
      || MainDataMgr.instance.getData(MainDataMgr.KEY_SHOW_WELFARE_DAY) == new Date().getDate()) {
        this.welfareNode.destroy();
      }else{
        var self = this;
        this.welfareNode.getComponent(MainWelfare).getAward = () => {
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
              self.showFlyGoldEvent(self.node,self.tarAniNode,2);
              GameUtils.buriedPoint(14);
              self.scheduleOnce(()=>{
                if(self.welfareNode){
                  self.welfareNode.getComponent(MainWelfare).close();
                  self.close();
                } 
              },1)
          } else {
              GameUtils.showToast("请从我的小程序打开游戏");
          }
        }
        self.welfareNode.active = true;
        MainDataMgr.instance.setData(MainDataMgr.KEY_SHOW_WELFARE_DAY,new Date().getDate());
      }
    }

    start () {
        this.init();

        this.info = GameConfig.instance.getHpNumByGoldNum();
        this.info.num = GameConfig.instance.gameMeta.energyMeta[0].energyExchange;
        this.goldenergyExchange = GameConfig.instance.gameMeta.energyMeta[0].goldenergyExchange;
        this.txtVideoNum.string = "x" + this.info.num;
        this.txtGoldHpNum.string = "x" + this.goldenergyExchange;

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
            StageDataMgr.instance.setData(StageDataMgr.KEY_USER_HP_NUM,StageDataMgr.instance.getData(StageDataMgr.KEY_USER_HP_NUM) + this.goldenergyExchange);
            GameUtils.showToast( "恭喜您获得" + this.goldenergyExchange + "体力");
            this.showFlyGoldEvent(this.node,this.tarAniNode,2);
            GameUtils.buriedPoint(4);
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
                this.showFlyGoldEvent(this.node,this.tarAniNode,2);
                this.close();
              }
              StageDataMgr.instance.setData(StageDataMgr.KEY_USER_HP_NUM,StageDataMgr.instance.getData(StageDataMgr.KEY_USER_HP_NUM) + rewardNum);      
              GameUtils.showToast( "恭喜您获得:" + rewardNum + "体力");
              GameUtils.buriedPoint(3);
            },
            () => {
              if(this.info && this.info.num){
                GameUtils.showAlert(
                  "观看完整视频可获得" + this.info.num + "体力",
                  () => {
                    console.log("重新观看");
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
                      this.showFlyGoldEvent(this.node,this.tarAniNode,2);
                      this.close();
                    }
                    StageDataMgr.instance.setData(StageDataMgr.KEY_USER_HP_NUM,StageDataMgr.instance.getData(StageDataMgr.KEY_USER_HP_NUM) + rewardNum);
                    GameUtils.showToast( "恭喜您获得:" + rewardNum + "体力");
                    break;
                }
              }, "mainHpGift");
            }
          );
    }




    // update (dt) {}
}
