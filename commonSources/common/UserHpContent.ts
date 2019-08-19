import StageDataMgr from "../module/data/StageDataMgr";

import EventData from "../gamecore/managers/event/EventData";
import GameManager from "../gamecore/managers/GameManager";
import GameCoreEventNames from "../gamecore/GameCoreEventNames";
import SoundMgr from "../SoundMgr";
import GameUtils from "../GameUtils";
import GameConfig, { MODE_TYPE_STRUCT } from "../view/stageMode/GameConfig";

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
export default class UserHpContent extends cc.Component {

    @property(cc.Label)
    txtHp:cc.Label = null;

    @property(cc.Label)
    txtTimer:cc.Label = null;
    
    

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        GameManager.eventManager.addEventListener(GameCoreEventNames.DATA_CHANGE,this.onDataChange,this);
        this.refreshHpNum();
    }

    start () {
        if(this.txtTimer){
            this.txtTimer.string = GameUtils.timeFormat(GameConfig.instance.gameMeta.energyMeta[0].recoverInterval * 1000 - StageDataMgr.HP_TIMER);

            this.schedule(()=>{
                if(StageDataMgr.instance.getData(StageDataMgr.KEY_USER_HP_NUM) >= GameConfig.instance.gameMeta.energyMeta[0].upperLimit){
                    this.txtTimer.string = '体力已满';
                    return;
                }
                if(StageDataMgr.HP_TIMER > GameConfig.instance.gameMeta.energyMeta[0].recoverInterval * 1000){
                    StageDataMgr.HP_TIMER = GameConfig.instance.gameMeta.energyMeta[0].recoverInterval * 1000;
                }
                this.txtTimer.string = GameUtils.timeFormat(GameConfig.instance.gameMeta.energyMeta[0].recoverInterval * 1000 - StageDataMgr.HP_TIMER);
            },1,cc.macro.REPEAT_FOREVER);
        }
    }

    private onDataChange(event: EventData) {
        let key: string = event.data;
        if(key == StageDataMgr.KEY_USER_HP_NUM){
            this.refreshHpNum();
            return;
        }
    }
    private refreshHpNum():void{
        let data: number = StageDataMgr.instance.getData(StageDataMgr.KEY_USER_HP_NUM);
        this.txtHp.string = data + "/" + GameConfig.instance.gameMeta.energyMeta[0].upperLimit;
    }

    private addHpClickEvent(e:cc.Event):void{

        if(e){
            SoundMgr.instance.playTapSound();

            if(StageDataMgr.instance.getData(StageDataMgr.KEY_USER_HP_NUM) >= GameConfig.instance.gameMeta.energyMeta[0].upperLimit){
                GameUtils.showToast("体力已满");
                return;
            }
            GameUtils.buriedPoint(2);

        }
        GameUtils.instance.openKeyGiftEvent(this.node);
    }

    onDestroy(){
        GameManager.eventManager.removeEventListener(GameCoreEventNames.DATA_CHANGE,this.onDataChange,this);
    }
    // update (dt) {}
}
