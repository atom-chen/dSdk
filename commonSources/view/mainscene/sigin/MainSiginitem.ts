import GameManager from "../../../gamecore/managers/GameManager";
import GameCoreEventNames from "../../../gamecore/GameCoreEventNames";
import EventData from "../../../gamecore/managers/event/EventData";
import MainDataMgr from "../../../module/data/MainDataMgr";
import GameConfig from "../../stageMode/GameConfig";
import MainSigin from "./MainSigin";

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
export default class MainSiginItem extends cc.Component {
  // LIFE-CYCLE CALLBACKS:
  @property(cc.Label)
  day: cc.Label = null;
  @property(cc.Label)
  award: cc.Label = null;

  @property(cc.Sprite)
  iconbg:cc.Sprite = null;
  
  @property(cc.Sprite)
  shadow:cc.Sprite = null;
  



  onLoad() {
    GameManager.eventManager.addEventListener(
      GameCoreEventNames.DATA_CHANGE,
      this.onDataChange,
      this
    );
  }
  private onDataChange(event: EventData) {
    let key: string = event.data;
    if (key == MainDataMgr.KEY_USER_SIGIN_RECORD) {
      this.init();
    }
  }

  id: number = 0;
  start() { }

 

  public MainSiginComp:MainSigin = null;
  //日期 type 1:从未签到 2：已经签到 3:当前签到 4:当天已签到 5 未签到
  init() {
    let type: number = GameConfig.instance.getItemState(this.id);
    this.day.string = "" + (this.id + 1);
    this.award.string = GameConfig.instance.getAward(this.id) + "";
    console.log("签到数据", type, this.id);



    switch (type) {
      case 1:
        if (this.id == 0) {
          // this.node.getChildByName("waixuan").active = true;
          this.iconbg.spriteFrame = this.MainSiginComp.spfmArr[1];
          this.settingUi(1);
        } else {
          // this.day.node.color = cc.color(119, 112, 0);
          // this.node.getChildByName("waixuan").active = false;
          this.iconbg.spriteFrame = this.MainSiginComp.spfmArr[0];

          this.settingUi(3);
        }
        break;
      case 2:
        this.settingUi(2);
        // this.node.getChildByName("waixuan").active = false;
        this.iconbg.spriteFrame = this.MainSiginComp.spfmArr[0];

        break;
      case 3:
        // this.node.getChildByName("waixuan").active = true;
        this.iconbg.spriteFrame = this.MainSiginComp.spfmArr[1];

        this.settingUi(1);
        break;
      case 4:
        // this.day.node.color = cc.color(119, 112, 0);
        // this.node.getChildByName("waixuan").active = false;
        this.iconbg.spriteFrame = this.MainSiginComp.spfmArr[0];
        this.settingUi(3);
        break;
      case 5:
        // this.day.node.color = cc.color(119, 112, 0);
        // this.node.getChildByName("waixuan").active = false;
        this.iconbg.spriteFrame = this.MainSiginComp.spfmArr[0];
        this.settingUi(3);
        break;
    }
  }

  /**
   * 
   * @param type 1:当前签到，2结束签到，3还未签到
   */
  private settingUi(type: number) {
    
    // console.log("数据", this.id);
    // this.node.getChildByName("iconbg").getChildByName("now").active = false;
    // this.node.getChildByName("iconbg").getChildByName("end").active = false;
    // this.node.getChildByName("iconbg").getChildByName("future").active = false;
    switch (type) {
      case 1:
        // this.node.getChildByName("iconbg").getChildByName("now").active = true;
        this.shadow.node.active = false;
        break;
      case 2:
        // this.node.getChildByName("iconbg").getChildByName("end").active = true;
        if(this.id == 6){
          this.shadow.spriteFrame = this.MainSiginComp.spfmArr[3];
        }else{
          this.shadow.spriteFrame = this.MainSiginComp.spfmArr[2];
        }
        this.iconbg.spriteFrame = this.MainSiginComp.spfmArr[0];
        this.shadow.node.active = true;
        break;
      case 3:
        this.iconbg.spriteFrame = this.MainSiginComp.spfmArr[0];
        this.shadow.node.active = false;
    }
  }

  onDestroy() {
    GameManager.eventManager.removeEventListener(
      GameCoreEventNames.DATA_CHANGE,
      this.onDataChange,
      this
    );
  }

  // update (dt) {}
}
