import GameUtils from "../../GameUtils";
import SoundMgr from "../../SoundMgr";
import StageDataMgr, { REFRESH_INFO } from "../../module/data/StageDataMgr";
import GameConfig, { PassStageInfo, MODE_TYPE_STRUCT } from "./GameConfig";
import GameManager from "../../gamecore/managers/GameManager";
import GameCoreEventNames from "../../gamecore/GameCoreEventNames";
import EventData from "../../gamecore/managers/event/EventData";
import DeerSDK from "../../gamecore/deer/DeerSDK";
import WXScreenAdMgr from "../../control/WXScreenAdMgr";
import StageModeMgr from "./StageModeMgr";
import HelpMgr from "./HelpMgr";
import WXUtils from "../../gamecore/wechat/WXUtils";


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
export default class TopContent extends cc.Component {

    @property(cc.Node)
    bulletNormal:cc.Node = null;
    @property(cc.Node)
    bulletLight:cc.Node = null;
    
    @property(cc.Node)
    bulletPanel:cc.Node = null;
    
    @property(cc.Node)
    skipBtn:cc.Node = null;
    
    @property(cc.Label)
    txtStageInfo:cc.Label = null;


    @property(cc.Label)
    txtShareNum:cc.Label = null;
    @property(cc.Label)
    txtVideoNum:cc.Label = null;
    
    @property(cc.Label)
    txtTryTimeNum:cc.Label = null;

    @property(cc.Node)
    addNode:cc.Node = null;
    
    @property(cc.Node)
    freshTip:cc.Node = null;

    @property(cc.Node)
    helpBtnNode:cc.Node = null;
    
    @property(cc.Node)
    helpVideoBtn:cc.Node = null;
    
    
    
    

    onLoad () {
        // this.updateHpBar(0,1);
        this.bulletNormal.active = false;
        this.bulletLight.active = false;
        GameManager.eventManager.addEventListener(GameCoreEventNames.DATA_CHANGE,this.onDataChange,this);
        this.addNode.active = false;
        if(StageDataMgr.CUR_MODE == MODE_TYPE_STRUCT.MODE1 && StageDataMgr.CUR_LEVEL <= 10){
            this.freshTip.active = true;
            this.freshTip.runAction(cc.sequence(cc.delayTime(3),cc.callFunc(()=>{
                this.freshTip.active = false;
            })))
        }
        this.refreshRefreshCount();
        this.txtShareNum.string = "+" + GameConfig.instance.gameMeta.settlementRewardMeta[0].shareRefreshNum;
        this.txtVideoNum.string = "+" + GameConfig.instance.gameMeta.settlementRewardMeta[0].videoRefreshNum;
        if(this.helpBtnNode && StageDataMgr.CUR_MODE == MODE_TYPE_STRUCT.MODE1){
            if(StageDataMgr.CUR_LEVEL <= 16){
                if(StageDataMgr.CUR_LEVEL == 1 || StageDataMgr.CUR_LEVEL == 2|| StageDataMgr.CUR_LEVEL == 5|| StageDataMgr.CUR_LEVEL == 4
                    || StageDataMgr.CUR_LEVEL == 7
                    || StageDataMgr.CUR_LEVEL == 6|| StageDataMgr.CUR_LEVEL == 15){
                        this.helpBtnNode.active = true;
                        this.refreshHelpBtnState();
                        this.helpBtnNode.on(cc.Node.EventType.TOUCH_END,()=>{
                            StageDataMgr.SHOW_HELP_BTN = !StageDataMgr.SHOW_HELP_BTN;
                            this.refreshHelpBtnState();
                        },this.helpBtnNode);
                    }
                else{
                    this.helpBtnNode.active = false;
                }

            }else if(HelpMgr.isHelpValid(StageDataMgr.CUR_MODE,StageDataMgr.CUR_LEVEL)){
                this.helpBtnNode.children[2].active = true;
                this.helpBtnNode.children[0].active = false
                this.helpBtnNode.children[1].active = false
                this.helpBtnNode.active = true;
            }
            else{
                this.helpBtnNode.active = false;
            }
        }else if(this.helpVideoBtn){
            if(HelpMgr.isHelpValid(StageDataMgr.CUR_MODE,StageDataMgr.CUR_LEVEL)){
                this.helpVideoBtn.active = true;
            }else{
                this.helpVideoBtn.active = false;
            }
        }
        
    }

    public refreshHelpBtnState():void{
        this.helpBtnNode.children[0].active = StageDataMgr.SHOW_HELP_BTN;
        this.helpBtnNode.children[1].active = !StageDataMgr.SHOW_HELP_BTN;
        this.helpBtnNode.children[2].active = false;
        if(cc.find("Canvas/content").getChildByName("helpPanel")){
            cc.find("Canvas/content").getChildByName("helpPanel").active = StageDataMgr.SHOW_HELP_BTN;
        }
    }


    private canSkip:boolean = false;
    start () {

        // this.txtStageInfo.string = "当前关卡:" + StageDataMgr.CUR_LEVEL;
        this.txtStageInfo.string = "当前关卡:" + StageDataMgr.CUR_LEVEL;

        let passStage:Array<Array<PassStageInfo>> = StageDataMgr.instance.getData(StageDataMgr.KEY_PASS_STAGE_ARR);
        let passStageArr = passStage[StageDataMgr.CUR_MODE];
        if(!passStageArr[StageDataMgr.CUR_LEVEL -1]){
            // this.skipBtn.active = true;
            this.canSkip = true;
            this.skipBtn.getChildByName("Background").color = cc.color(255,255,255);

            StageDataMgr.IS_NEW_STAGE = true;
            StageDataMgr.CUR_STARS = 0;
        }else{
            // this.skipBtn.active = false;
            this.canSkip = false;
            this.skipBtn.getChildByName("Background").color = cc.color(100,99,99);

            StageDataMgr.IS_NEW_STAGE = false;
            StageDataMgr.CUR_STARS = passStageArr[StageDataMgr.CUR_LEVEL - 1].star;
        }
        if(HelpMgr.isCurStageHelpOpened(StageDataMgr.CUR_MODE,StageDataMgr.CUR_LEVEL)){
            this.showHelpCircle(true);
        }
    }

    private onDataChange(event: EventData) {
        let key: string = event.data;
        if (key == StageDataMgr.KEY_REFRESH_COUNT_ARR) {
          this.refreshRefreshCount();
          return;
        }
        if (key == StageDataMgr.KEY_EARN_REFRESH_COUNT_INFO) {
            this.refreshRefreshCount();
            return;
          }
    
    }

    private refreshCount:number = 0;
    private refreshRefreshCount():void{
        if(StageDataMgr.instance.judgeIsFreeStage(StageDataMgr.CUR_MODE,StageDataMgr.CUR_LEVEL)){
            this.refreshCount = 999;
            this.txtTryTimeNum.string = "";
        }else{
            let extraNum:number = 0;
            let refrshInfo:REFRESH_INFO =  StageDataMgr.instance.getData(StageDataMgr.KEY_EARN_REFRESH_COUNT_INFO);
            if(refrshInfo.curMode == StageDataMgr.CUR_MODE && refrshInfo.curStageNum == StageDataMgr.CUR_LEVEL){
                extraNum =  refrshInfo.refreshCount;
            }else{
                refrshInfo.curMode = StageDataMgr.CUR_MODE;
                refrshInfo.curStageNum = StageDataMgr.CUR_LEVEL;
                refrshInfo.refreshCount = 0;
                StageDataMgr.instance.setData(StageDataMgr.KEY_EARN_REFRESH_COUNT_INFO,{
                    curMode: refrshInfo.curMode,
                    curStageNum: refrshInfo.curStageNum,
                    refreshCount: refrshInfo.refreshCount
                });
                let refreshNumLimit:number = 1;
                // let game_config: any = DeerSDK.instance.game_config;
    
                // if (game_config != undefined) {
                //     refreshNumLimit = game_config.refreshNumLimit
                // }
                refreshNumLimit = GameConfig.instance.gameMeta.newModeUnlockMeta[StageDataMgr.CUR_MODE].refreshNum;
                StageDataMgr.instance.setRefreshCount(StageDataMgr.CUR_MODE,StageDataMgr.CUR_LEVEL,refreshNumLimit);
            }
            this.refreshCount = StageDataMgr.instance.getRefreshCount(StageDataMgr.CUR_MODE,StageDataMgr.CUR_LEVEL) + extraNum;
            this.txtTryTimeNum.string = this.refreshCount + "";
        }
        if(this.refreshCount == 0){
            this.freshTip.active = false;
        }
        if(this.refreshCount > 0){
            this.addNode.active = false;
        }else{
            this.addNode.active = true;
            this.addNode.stopAllActions();
            this.addNode.runAction(cc.sequence(cc.scaleTo(0.1,1.2),cc.scaleTo(0.1,1),cc.delayTime(5),cc.callFunc(() => {
                this.addNode.active = false;
            })));
        }

    }

    private onShareClickEvent(e:cc.Event):void{
        SoundMgr.instance.playTapSound();
        GameUtils.instance.playFailOnShare((res: number) => {
            switch (res) {
              case 1:
                this.addRefreshTime(GameConfig.instance.gameMeta.settlementRewardMeta[0].shareRefreshNum);
                break;
            }
          }, "refreshShare");
    }

    private addRefreshTime(count:number):void{
        if(count > 0){
            GameUtils.showToast("恭喜获得" + count + "次刷新机会!");
        }


        let refrshInfo:REFRESH_INFO = StageDataMgr.instance.getData(StageDataMgr.KEY_EARN_REFRESH_COUNT_INFO);
        if(refrshInfo.curMode == StageDataMgr.CUR_MODE && refrshInfo.curStageNum == StageDataMgr.CUR_LEVEL){
            refrshInfo.refreshCount += count;
        }else{
            refrshInfo.curMode = StageDataMgr.CUR_MODE;
            refrshInfo.curStageNum = StageDataMgr.CUR_LEVEL;
            refrshInfo.refreshCount = count;
        }
        StageDataMgr.instance.setData(StageDataMgr.KEY_EARN_REFRESH_COUNT_INFO,{
            curMode: refrshInfo.curMode,
            curStageNum: refrshInfo.curStageNum,
            refreshCount: refrshInfo.refreshCount
        });
    }


    private watchVideoAd(): void {
        GameUtils.instance.showVideoAd(
        () => {
            this.addRefreshTime(GameConfig.instance.gameMeta.settlementRewardMeta[0].videoRefreshNum);
        },
        () => {
            GameUtils.showAlert(
            "观看完整视频可获得" + GameConfig.instance.gameMeta.settlementRewardMeta[0].videoRefreshNum + "刷新机会" ,
            () => {
                this.watchVideoAd();
            }
            );
        },
        () => {
            GameUtils.instance.playFailOnShare((res: number) => {
                switch (res) {
                  case 1:
                    this.addRefreshTime(GameConfig.instance.gameMeta.settlementRewardMeta[0].videoRefreshNum);
                    break;
                }
              }, "refreshShare");
        }
        );
    }




    public refreshAllBullet(normalNum:number,lightNum:Number):void{

        this.bulletPanel.removeAllChildren();

        for(let i = 0;i < normalNum;i ++){
            this.addNormalBulletItem();
        }
        for(let i = 0; i < lightNum;i ++){
            this.addLightBulletItem();
        }
    }
    

    private onShowHelpClickEvent(e):void{
        if(!HelpMgr.isCurStageHelpOpened(StageDataMgr.CUR_MODE,StageDataMgr.CUR_LEVEL)){
            GameUtils.buriedPoint(30);
            this.watchHelpVideoAd();
            // this.showHelpCircle(true);
        }else{
            this.showHelpCircle(true);
        }
    }

    private showHelpCircle(needAni:boolean):void{
        let event = new cc.Event.EventCustom(HelpMgr.showHelpEvent,true);
        event.detail = needAni;
        this.node.dispatchEvent(event);

    }
    

    private watchHelpVideoAd(): void {
        GameUtils.instance.showVideoAd(
        () => {
            if(this.node){
                HelpMgr.setHelpOpenInfo(StageDataMgr.CUR_MODE,StageDataMgr.CUR_LEVEL);
                this.showHelpCircle(true);
                GameUtils.buriedPoint(31);
            }
        },
        () => {
            GameUtils.showAlert(
            "观看完整视频可查看提示",
            () => {
                if(this.node){
                    this.watchHelpVideoAd();
                }
            }
            );
        },
        () => {
            GameUtils.instance.playFailOnShare((res: number) => {
                switch (res) {
                  case 1:
                    if(this.node){
                        HelpMgr.setHelpOpenInfo(StageDataMgr.CUR_MODE,StageDataMgr.CUR_LEVEL);
                        this.showHelpCircle(true);
                        GameUtils.buriedPoint(31);
                    }
                    break;
                }
              }, "watchHelpVideoAd");
        }
        );
    }





    /**
     * 增加上方普通子弹图标
     * @param num 数量
     */
    public addNormalBulletItem():void{
        let bullet = cc.instantiate(this.bulletNormal);
        bullet.active = true;
        this.bulletPanel.addChild(bullet);
    }



    /**移除上方子弹图标 */
    public removeBulletItem():void{
        this.bulletPanel.removeChild(this.bulletPanel.children[this.bulletPanel.childrenCount - 1]);
    }
        /**
     * 增加上方子弹图标
     * @param num 数量
     */
    public addLightBulletItem():void{
        let bullet = cc.instantiate(this.bulletLight);
        bullet.active = true;
        this.bulletPanel.addChild(bullet);
    }

    /**返回首页 */
    private onBackSceneClickEvent(e: cc.Event): void {
        SoundMgr.instance.playTapSound();
        GameUtils.instance.loadSceneWithOperate("modeListScene");
        GameUtils.buriedPoint(19);

    }
    /**重新开始 */
    private locked:boolean = false;
    private restartClickEvent(e:cc.Event):void{

        SoundMgr.instance.playTapSound();

        if(StageDataMgr.instance.judgeIsFreeStage(StageDataMgr.CUR_MODE,StageDataMgr.CUR_LEVEL)){
        }else{
            if(this.refreshCount <= 0){
                this.addNode.active = true;
                this.addNode.stopAllActions();
                this.addNode.runAction(cc.sequence(cc.scaleTo(0.1,1.2),cc.scaleTo(0.1,1),cc.delayTime(5),cc.callFunc(() => {
                    this.addNode.active = false;
                })));
                GameUtils.showToast("刷新次数不足");
                return;
            }
            if(this.locked){
                return;
            }
            this.locked = true;
            if(this.refreshCount <= StageDataMgr.instance.getData(StageDataMgr.KEY_EARN_REFRESH_COUNT_INFO).refreshCount){
                this.addRefreshTime(-1);
            }else{
                StageDataMgr.instance.setRefreshCount(StageDataMgr.CUR_MODE,StageDataMgr.CUR_LEVEL,StageDataMgr.instance.getRefreshCount(StageDataMgr.CUR_MODE,StageDataMgr.CUR_LEVEL) - 1);
            }    
        }

        GameUtils.instance.loadSceneWithOperate("map");
        GameUtils.buriedPoint(20);

        // if(StageDataMgr.CUR_MODE != MODE_TYPE_STRUCT.MODE1){
        // GameUtils.instance.loadSceneWithOperate(StageDataMgr.CUR_MODE + "map" + StageDataMgr.CUR_LEVEL);
        // }else{
        //     GameUtils.instance.loadSceneWithOperate("map" + StageDataMgr.CUR_LEVEL);
        // }
    }

    private share():void{

    }



    private skipStageClickEvent(e:cc.Event):void{
        SoundMgr.instance.playTapSound();
        if(!this.canSkip){
            GameUtils.showToast("此关已通过");
            return;
        }

        GameUtils.loadRes("prefabs/stage/skipPanel",cc.Prefab,true,(pfb) =>{
            cc.find("Canvas").addChild(cc.instantiate(pfb));
        })
        GameUtils.buriedPoint(21);

        
    }

    onDestroy(){
        GameManager.eventManager.removeEventListener(GameCoreEventNames.DATA_CHANGE,this.onDataChange,this);

    }


    // update (dt) {}
}
