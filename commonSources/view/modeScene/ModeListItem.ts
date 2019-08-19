import { PassStageInfo, STAGE_STATE_STRUCT, MODE_TYPE_STRUCT } from "../stageMode/GameConfig";
import ModeList from "./ModeList";
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
export default class ModeListItem extends cc.Component {

    @property(cc.Label)
    txtIndex: cc.Label = null;

    @property(cc.Sprite)
    itemBg:cc.Sprite = null;
    
    

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
    }

    start () {
        
    }
    public ModeListComp: ModeList = null;
    private passStageInfo:PassStageInfo = null;
    public init(passStageInfo:PassStageInfo):void{
        this.txtIndex.string = passStageInfo.index + "";
        this.passStageInfo = passStageInfo;
        this.itemBg.spriteFrame = this.ModeListComp.stateSpfmArr[passStageInfo.skip];
        if(passStageInfo.skip == STAGE_STATE_STRUCT.UNLOCK){
            let posArr = [
                cc.v2(-44,37),
                cc.v2(0,57),
                cc.v2(44,37)
            ]
            for(let i = 0;i < 3;i ++){
                let star = cc.instantiate(this.ModeListComp.star);
                this.node.addChild(star);
                star.getComponent(cc.Sprite).spriteFrame = this.ModeListComp.starSpfmArr[i >= passStageInfo.star ? 1: 0];
                star.position = posArr[i];
            }
        }else if(passStageInfo.skip == STAGE_STATE_STRUCT.HEIGHTEST){
            this.txtIndex.node.color = cc.color(136,52,13,255);
        }else if(passStageInfo.skip == STAGE_STATE_STRUCT.LOCK){
            this.node.opacity = 180;
        }
    }

    private locked:boolean = false;
    private enterMapClickEvent(e:cc.Event):void{
        SoundMgr.instance.playTapSound();

        let curHpNum:number = StageDataMgr.instance.getData(StageDataMgr.KEY_USER_HP_NUM);
        if(curHpNum <= 0 && !StageDataMgr.instance.judgeIsFreeStage(StageDataMgr.CUR_MODE,this.passStageInfo.index)){
            if(this.locked){
                GameUtils.instance.loadSceneWithOperate("map");
                return;
            }
            try{
                GameUtils.instance.openKeyGiftEvent(cc.find("Canvas").getChildByName("content").getChildByName("hpContent"));
            }catch{
                
            }
            return;
        }
        if(this.passStageInfo.skip != STAGE_STATE_STRUCT.LOCK){
        // if(true){
            if(!StageDataMgr.CUR_MODE){
                StageDataMgr.CUR_MODE = MODE_TYPE_STRUCT.MODE1;
            }
            StageDataMgr.CUR_LEVEL = this.passStageInfo.index;


            // let hpTipNode = cc.instantiate(PrfabsManager.instance.prfabsAry.hpTipNode);
            // console.log(e)
            // e.currentTarget.addChild(hpTipNode);
            if(!this.locked){
                this.locked = true;
                //TAG_减体力
                StageDataMgr.NEED_SUB_HP = true;
                // StageDataMgr.instance.setData(StageDataMgr.KEY_USER_HP_NUM,StageDataMgr.instance.getData(StageDataMgr.KEY_USER_HP_NUM) - 1);
            }
            // StageDataMgr.CUR_LEVEL = 65;

            GameUtils.instance.loadSceneWithOperate("map");
            return;


        }else{
            GameUtils.showToast("当前关卡尚未解锁，请先完成前面的关卡。");
        }
    }
    // update (dt) {}
}


if(!window["gotoStage"]){
    window["gotoStage"] = (curModel = 0,curLevel = 1,specialStage) =>{
        StageDataMgr.CUR_MODE = curModel;
        StageDataMgr.CUR_LEVEL = curLevel;
        if(specialStage == "1map1"){
            cc.director.loadScene(specialStage);
            return;
        }
    
        GameUtils.instance.loadSceneWithOperate("map");
        return;
    }
}
if(!window["showAni"]){
    window["showAni"] = (curModel = 0,curLevel = 1, bShow:boolean,go:boolean = false) => {
        var fileUrl: string = "http://192.168.3.6/map/" +curModel + "map" + curLevel + ".json";
    
        cc.loader.load(fileUrl,(e,res)=>{
            console.log(e,res,"uuuuuuuu0");
        
            StageDataMgr.CUR_MODE = res.mode;
            StageDataMgr.CUR_MODE = res.level;
            StageDataMgr.USER_OP.location = res.location;
            StageDataMgr.USER_OP.time = res.time;
            console.log(StageDataMgr.USER_OP,"uuuuuuuuuuuuuuuuuuuuuuuu")
    
            if(!e){
                StageDataMgr.IS_ANI = bShow;
                if(go){
                    gotoStage(curModel,curLevel);
                }
            }else{
                console.log(fileUrl,"不存在");
                debugger;
            }
        })
    }
}