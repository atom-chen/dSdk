import GameManager from "../../gamecore/managers/GameManager";
import GameCoreEventNames from "../../gamecore/GameCoreEventNames";
import GameUtils from "../../GameUtils";
import EventData from "../../gamecore/managers/event/EventData";
import GameConfig, { MODE_TYPE_STRUCT } from "../../view/stageMode/GameConfig";
import PrfabsManager from "../stageMode/PrfabsManager";
import Test from "../../Test";
import StageDataMgr from "../../module/data/StageDataMgr";
import BoardAdsPanel from "../../../Script/gamecoreUI/boardads/BoardAdsPanel";
import DeerSDK from "../../gamecore/deer/DeerSDK";
import WXUtils from "../../gamecore/wechat/WXUtils";
import CoinAnimComp from "../base/CoinAnimComp";
import MainDataMgr from "../../module/data/MainDataMgr";
import Comp_UserInfoButton from "../../gamecore/components/Comp_UserInfoButton";
import WXBannerAd from "../../gamecore/wechat/WXBannerAd";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MainScene extends cc.Component {

  @property(cc.Label)
  gold:cc.Label = null;

  @property(cc.Label)
  diamond:cc.Label = null;

  @property(cc.Prefab)
  BoardAdsPanelPfb:cc.Prefab = null;

  @property(cc.Node)
  guessLikeNode:cc.Node = null;
  
  @property(cc.Node)
  tuijian:cc.Node = null;

  @property(cc.Node)
  baokuanNode:cc.Node = null;
  
  
  
  

  @property(Comp_UserInfoButton)
  userInfoButtonComp:Comp_UserInfoButton = null;
  

  

  onLoad() {
    if(!DeerSDK.instance.isOnline){
      this.guessLikeNode.destroy();
      this.tuijian.destroy();
      this.baokuanNode.destroy();
    }


    GameManager.eventManager.addEventListener(GameCoreEventNames.DATA_CHANGE,this.onDataChange,this);

    GameUtils.instance.wxOnshow();
    
  }

  start() {
    // let testNode = cc.find("Canvas").getChildByName("test");
    // // testNode.getComponent(cc.Sprite).
    // GameUtils.loadRes("test",cc.Texture2D,true,(tex) => {
    //   testNode.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(tex,new cc.Rect(2,2,72,78),true,cc.v2(0,0),new cc.Size(72,78));
    // })



    GameManager.soundsManager.pushSceneBgMusic("sounds/bgm/bg_sound");

    this.refreshDimond();
    this.refreshGold();
    // this.txtCurstage.string = "进入第" + StageDataMgr.instance.getData(StageDataMgr.KEY_CUR_STAGE_NUM) + "关";
    //默认声音和音效都为打开状态
    // if (GameConfig.instance.lastscene == "loading") {
    //   GameManager.soundsManager.unmuteSound();
    //   GameManager.soundsManager.unmuteMusic();
    // }
    //监听小游戏隐藏到后台事件。锁屏、按 HOME 键退到桌面、显示在聊天顶部等操作会触发此事件。
    GameUtils.instance.isWXonHide();
    this.scheduleOnce(() => {
      GameUtils.instance.setWXItemLocation(this.node.getChildByName("add"));
    })

    PrfabsManager.instance.create_all_prfabs(() => {
      console.log("create_all_prfabs success");
    });


    if(!GameConfig.instance.isSigin()){
      this.showSignClickEvent(null);
    }
    
    if(this.userInfoButtonComp){
      this.userInfoButtonComp.must = true;
      this.userInfoButtonComp.callback = ()=>{
        this.showRank();
      }
    }

    if(MainDataMgr.instance.newPlayer == true){
      cc.director.preloadScene("map1",()=>{},(err)=>{
        console.log(err,"场景加载失败");
      });
    }else{
      // cc.director.preloadScene("modeSelectScene",()=>{},(err)=>{
      //   console.log(err,"场景加载失败");
      // });
    }

  }


  private onDataChange(event: EventData) {
    let key: string = event.data;
    if (key == StageDataMgr.KEY_USER_GOLD_NUM) {
      this.refreshGold();
      return;
    }
    if (key == StageDataMgr.KEY_USER_DIMOND_NUM) {
      this.refreshDimond();
      return;
    }

  }

  private showRank() {

    GameUtils.loadRes("prefabs/rank/rank", cc.Prefab, true, (prefab: cc.Prefab) => {
      let rank = cc.instantiate(prefab);
      this.node && this.node.addChild(rank);
    })
    GameUtils.buriedPoint(11);

  }

  private refreshGold() {

    let data:number = StageDataMgr.instance.getData(StageDataMgr.KEY_USER_GOLD_NUM);
    
    this.gold.string = data + "";
  }
  
  private refreshDimond() {
    let data: number = StageDataMgr.instance.getData(StageDataMgr.KEY_USER_DIMOND_NUM);
    this.diamond.string = data + "";
  }



  onDestroy() {
    GameManager.eventManager.removeEventListener(GameCoreEventNames.DATA_CHANGE,this.onDataChange,this);
  }

  private boardIdPanel: cc.Node = null;
  
  private onAddPointlayout() {
    GameManager.soundsManager.playTapSound();
    if (this.boardIdPanel) {
      this.boardIdPanel.getComponent(BoardAdsPanel).show();
    } else {
      this.boardIdPanel = cc.instantiate(this.BoardAdsPanelPfb);
      this.node.addChild(this.boardIdPanel);
      this.boardIdPanel.getComponent(BoardAdsPanel).show();
    }
    // GameUtils.buriedPoint(5);
  }

  /**小程序福利 */
  private showWelfareClickEvent(e:cc.Event):void {
    GameUtils.buriedPoint(13);
    GameManager.soundsManager.playTapSound();

    GameUtils.loadRes("prefabs/hall/welfare", cc.Prefab, true, (prefab: cc.Prefab) => {
      let setting = cc.instantiate(prefab);
      this.node.addChild(setting);
    })


    // cc.loader.loadRes("prefabs/welfare", cc.Prefab, (err, prefab) => {
    //   if (!err) {
    //     let setting = cc.instantiate(prefab);
    //     this.node.addChild(setting);
    //   }
    // });
  }
  /**设置界面 */
  private showSettingPanelClickEvent(e:cc.Event) {
    GameManager.soundsManager.playTapSound();

    GameUtils.loadRes("prefabs/hall/setting", cc.Prefab, true, (prefab: cc.Prefab) => {
      let setting = cc.instantiate(prefab);
      this.node.addChild(setting);
    })
    GameUtils.buriedPoint(10);

    // cc.loader.loadRes("prefabs/setting", cc.Prefab, (err, prefab) => {
    //   if (!err) {
    //     let setting = cc.instantiate(prefab);
    //     this.node.addChild(setting);
    //   }
    // });
  }


   /**加载角色显示页面 */
   public showRoleSelectClickEvent(e:cc.Event):void{
    GameManager.soundsManager.playTapSound();
    GameUtils.loadRes("prefabs/hall/roleSelectPanel",cc.Prefab,true,(prefab) => {
        let node = cc.instantiate(prefab);
        try{
          this.node.addChild(node)
        }catch{
          node.destroy();
        }
    })
  }


  /**领取钥匙奖励 */
  public showKeyGiftClickEvent(e:cc.Event):void{
    GameManager.soundsManager.playTapSound();
    GameUtils.loadRes("prefabs/hall/keyGiftPanel",cc.Prefab,true,(prefab) => {
        let node = cc.instantiate(prefab);
        try{
          this.node.addChild(node)
        }catch{
          node.destroy();
        }
    })
    GameUtils.buriedPoint(7);

  }

  private showGoldGiftClickEvent(e:cc.Event):void {
    // GameUtils.buriedPoint(8);
    GameManager.soundsManager.playTapSound();

    GameUtils.loadRes("prefabs/hall/goldGift", cc.Prefab, true, (prefab: cc.Prefab) => {
      let setting = cc.instantiate(prefab);
      this.node.addChild(setting);
    })

    GameUtils.buriedPoint(5);

    // cc.loader.loadRes("prefabs/goldnot", cc.Prefab, (err, prefab) => {
    //   if (!err) {
    //     let setting = cc.instantiate(prefab);
    //     this.node.addChild(setting);
    //   }
    // });
  }


  private showSignClickEvent(e:cc.Event):void {
    if(e){
      GameManager.soundsManager.playTapSound();
    }
    // GameUtils.buriedPoint(9);
    if (DeerSDK.instance.isOnline == false) {
      // WXUtils.showToast("敬请期待");
      return
    }

    GameUtils.loadRes("prefabs/sigin/sigin", cc.Prefab, true, (prefab: cc.Prefab) => {
      try{
        if (WXBannerAd.currentAd) WXBannerAd.currentAd.hide();
        
        let sigin = cc.instantiate(prefab);
        this.node && this.node.addChild(sigin);
      }catch{
        prefab = null;
        if (WXBannerAd.currentAd) WXBannerAd.currentAd.show();
      }

    })
  }


  update(dt) {
    
    // console.log(GameManager.popUpManager["_popUpCount"],'====');
  }

}
