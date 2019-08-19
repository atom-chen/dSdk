import GameConfig, { MODE_TYPE_STRUCT, ModeInfo } from "../stageMode/GameConfig";
import SoundMgr from "../../SoundMgr";
import GameUtils from "../../GameUtils";
import StageDataMgr from "../../module/data/StageDataMgr";
import PrfabsManager from "../stageMode/PrfabsManager";

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
export default class ModeSelectItem extends cc.Component {

    @property(cc.Node)
    newTagNode:cc.Node = null;
    
    @property(cc.Node)
    unlockNode:cc.Node = null;

    @property(cc.Node)
    lock:cc.Node = null;
    
    @property(cc.Label)
    txtNeedStar:cc.Label = null;
    
    @property(cc.Label)
    modeStars:cc.Label = null;

    @property(cc.Sprite)
    modeName:cc.Sprite = null;
    
    
    
    

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
    }

    private curModeInfo:ModeInfo = null;
    private mode:MODE_TYPE_STRUCT = null;
    public init(mode:MODE_TYPE_STRUCT):void{
        // if()
        this.mode = mode;
        this.curModeInfo = GameConfig.instance.getCurModeInfo(mode);
        // console.log(this.curModeInfo,mode,"----");
        if(!this.curModeInfo.lockState){
            this.lock.on(cc.Node.EventType.TOUCH_END,this.enterModeListClickEvent,this);
            this.lock.active = true;
            this.unlockNode.active = false;
            this.txtNeedStar.string = this.curModeInfo.needStars;
        }else{
            this.lock.active = false;
            this.unlockNode.active = true;
            this.modeStars.string = this.curModeInfo.modeStars + "";
            this.newTagNode.active = this.curModeInfo.isNewMode;
        }
    }

    private enterModeListClickEvent(e:cc.Event):void{
        SoundMgr.instance.playTapSound();
        if(this.curModeInfo.lockState){
            StageDataMgr.CUR_MODE = this.mode;
            GameUtils.instance.loadSceneWithOperate("modeListScene");
            GameUtils.buriedPoint(17);
        }else{
            let resultNum:number = Number(this.curModeInfo.needStars.split("/")[1]) - Number(this.curModeInfo.needStars.split("/")[0]);
            GameUtils.showToast("还差" + resultNum + "星即可开启，加油闯关吧!");
        }
        // console.log(resultNum,'==this.curModeInfo.needStars.split("/")==');
    }

    private locked:boolean = false;
    private enterHighestStageClickEvent(e:cc.Event):void{
        
        SoundMgr.instance.playTapSound();
        if(!this.mode){
            this.mode = MODE_TYPE_STRUCT.MODE1;
        }
        let curLevel = StageDataMgr.instance.getHighestStageByMode(this.mode);
        let curHpNum:number = StageDataMgr.instance.getData(StageDataMgr.KEY_USER_HP_NUM);
        if(!this.locked && curHpNum <= 0 && !StageDataMgr.instance.judgeIsFreeStage(this.mode,curLevel)){
            try{
                GameUtils.instance.openKeyGiftEvent(cc.find("Canvas").getChildByName("content").getChildByName("hpContent"));
            }catch{

            }
            return;
        }
        StageDataMgr.CUR_MODE = this.mode;
        StageDataMgr.CUR_LEVEL = curLevel

        // if(StageDataMgr.CUR_MODE != MODE_TYPE_STRUCT.MODE1){
        //     console.error("该模式未配置，默认进入该模式第一关")
        //     StageDataMgr.CUR_LEVEL = 1;
        // }

        
        // GameUtils.instance.loadSceneWithOperate("map" + StageDataMgr.CUR_LEVEL);
        if(e){
            // let hpTipNode = cc.instantiate(PrfabsManager.instance.prfabsAry.hpTipNode);
            // console.log(e)
            // e.currentTarget.addChild(hpTipNode);

            if(this.locked){
                GameUtils.showToast("关卡正在加载中");
            }else{
                this.locked = true;
                //TAG_减体力
                StageDataMgr.NEED_SUB_HP = true;
                // StageDataMgr.instance.setData(StageDataMgr.KEY_USER_HP_NUM,StageDataMgr.instance.getData(StageDataMgr.KEY_USER_HP_NUM) - 1);
            }
            GameUtils.instance.loadSceneWithOperate("map")

        }
        
    }
    

    // update (dt) {}
}
