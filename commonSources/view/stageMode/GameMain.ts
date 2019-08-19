
import PrfabsManager from "./PrfabsManager";
import AudioManager from "./AudioManager";
import BulletController from "./BulletController";
import StageDataMgr from "../../module/data/StageDataMgr";
import GameMainMgr from "./GameMainMgr";
import TopContent from "./TopContent";
// import GrenadeController from "./GrenadeController";
import GameConfig, { LevelConfig, MODE_TYPE_STRUCT, PassStageInfo, STAGE_STATE_STRUCT } from "./GameConfig";
import Common from "./Common";
import Comp_GameClub from "../../gamecore/components/Comp_GameClubButton";
import NodePoolMgr from "../../control/NodePoolMgr";
import GameUtils from "../../GameUtils";
import WXDevice from "../../gamecore/wechat/WXDevice";
import DeerSDK from "../../gamecore/deer/DeerSDK";
import StageEnd from "./StageEnd";
import MainDataMgr from "../../module/data/MainDataMgr";
import HelpMgr from "./HelpMgr";
import MapJson from "../../../resources/helpJson/mapJson";
import Crosshair from "./Crosshair";
import HelpTip from "./HelpTip";

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
export default class GameMain extends cc.Component {

hand:cc.Node = null;

gunLine:cc.Node = null;

zhunxin:cc.Node = null;

playerNode:cc.Node = null;

gun:cc.Node = null;

firedPositionNode:cc.Node = null;

grenadeLine:cc.Node = null;

RoleListNode:cc.Node = null;

content:cc.Node = null;

// grenadeControllerComp:GrenadeController = null;
private dirNode:cc.Node = null;

private TopContentComp:TopContent = null;
firedPosition: any;
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    onLoad() {
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getCollisionManager().enabled = true;
        if(!GameUtils.instance.mapPrefab){
            return;
        }
        
        this.content = cc.instantiate(GameUtils.instance.mapPrefab);
        this.content.position = cc.v2(0,0)
        this.node.addChild(this.content);
        // this.content = this.node.getChildByName("content");
        this.playerNode = this.content.getChildByName("player");
        this.RoleListNode = this.content.getChildByName("RoleListNode");
        this.hand = this.playerNode.getChildByName("left_hand");
        this.gunLine = this.hand.getChildByName("gunLine") || this.hand.getChildByName("line");
        this.zhunxin = this.playerNode.getChildByName("crosshair");
        this.gun = this.hand.getChildByName("gun");
        this.firedPositionNode = this.hand.getChildByName("FirePositionNode");
        this.grenadeLine = this.hand.getChildByName("grenadeLine");



        this.content.getChildByName("background").zIndex = -999;


        this.loadPlayerSkin();
        this.loadEnemySkin();
        let adNode = cc.instantiate(PrfabsManager.instance.prfabsAry.adNode);
        this.node.addChild(adNode);
    }

    start() {
        if(!this.content){
            return;
        }

        this.content.getChildByName("background").getComponent(cc.Widget).enabled = true;
        let bg = this.content.getChildByName("background");
        bg.anchorY = 0;

        bg.getComponent(cc.Widget).isAlignLeft = false;
        bg.getComponent(cc.Widget).isAlignRight = false;
        bg.getComponent(cc.Widget).isAlignTop = false;
        bg.getComponent(cc.Widget).isAlignBottom = true;

        bg.getComponent(cc.Widget).bottom = 0;
        bg.getComponent(cc.Sprite).type = 0;
        if(StageDataMgr.CUR_MODE == MODE_TYPE_STRUCT.MODE1 && StageDataMgr.CUR_LEVEL <= 32){
            bg.scale = 1.07;
        }else{
            bg.scale = 1.45;
        }
        bg.getComponent(cc.Sprite).sizeMode = 1;
        bg.getComponent(cc.Sprite).spriteFrame = PrfabsManager.instance.bgArr["bg_100" + (Math.ceil(StageDataMgr.CUR_LEVEL / 16))]

        this.initUi();
        if(StageDataMgr.IS_FROM_EGGLAYER){
            // if(GameMainMgr.curGameState == GameMainMgr.gameState.LOST){
            //     var GameContinue = cc.instantiate(PrfabsManager.instance.prfabsAry.gameWinPanel);
            //     this.node.addChild(GameContinue,0);
            // }else if(GameMainMgr.curGameState == GameMainMgr.gameState.WIN){
            //     var c = cc.instantiate(PrfabsManager.instance.prfabsAry.gameWinPanel);
            //     this.node.addChild(c,0);
            // }
            StageDataMgr.IS_FROM_EGGLAYER = false;
            var c = cc.instantiate(PrfabsManager.instance.prfabsAry.gameWinPanel);
            this.node.addChild(c,0);
            c.getComponent(StageEnd).showEggReward();
            return;
        }
        this.initListener();

        GameMainMgr.curGameState = GameMainMgr.gameState.READY;
        GameMainMgr.activeBulletCount = 0;
        this.initNodePool();

    }

    private loadPlayerSkin():void{
        let player = this.playerNode;
        player.getChildByName("left_hand").getChildByName("gun").active = true;
        // console.log(GameConfig.instance.getCurRoleSKinInfo().imageId,'sssssssss');
        player.getChildByName("right_hand").getComponent(cc.Sprite).sizeMode = 0;
        player.getChildByName("body").getComponent(cc.Sprite).sizeMode = 0;
        player.getChildByName("left_foot").getComponent(cc.Sprite).sizeMode = 0;
        player.getChildByName("right_foot").getComponent(cc.Sprite).sizeMode = 0;
        player.getChildByName("head").getComponent(cc.Sprite).sizeMode = 0;
        player.getChildByName("left_hand").getComponent(cc.Sprite).sizeMode = 0;

        player.getChildByName("right_hand").getComponent(cc.Sprite).spriteFrame = PrfabsManager.instance.heroSKin.right_hand;
        player.getChildByName("body").getComponent(cc.Sprite).spriteFrame = PrfabsManager.instance.heroSKin.body;
        player.getChildByName("left_foot").getComponent(cc.Sprite).spriteFrame = PrfabsManager.instance.heroSKin.left_foot;
        player.getChildByName("right_foot").getComponent(cc.Sprite).spriteFrame = PrfabsManager.instance.heroSKin.right_foot;
        player.getChildByName("head").getComponent(cc.Sprite).spriteFrame = PrfabsManager.instance.heroSKin.head;
        player.getChildByName("left_hand").getComponent(cc.Sprite).spriteFrame = PrfabsManager.instance.heroSKin.left_hand;
    }

    private loadEnemySkin():void{
        let list = this.RoleListNode;
        for(let i = 0; i < list.childrenCount;i ++){
            if(list.children[i].name == "Role_Left_Black"){
                let player = list.children[i];
                for(let j = 0; j < player.childrenCount;j ++){
                    let node = player.children[j];
                    node.getComponent(cc.Sprite).sizeMode = 0;
                    node.getComponent(cc.Sprite).spriteFrame = PrfabsManager.instance.Role_Left_Black[node.name];

                    // GameUtils.loadRes("textures/players/enemy1/" + node.name,cc.SpriteFrame,false,(spfm) => {
                    //     node.getComponent(cc.Sprite).sizeMode = 0;
                    //     node.getComponent(cc.Sprite).spriteFrame = spfm;
                    // })
                }
            }else if(list.children[i].name == "Role_Right_Black"){
                    let player = list.children[i];
                    for(let j = 0; j < player.childrenCount;j ++){
                        let node = player.children[j];
                        node.getComponent(cc.Sprite).sizeMode = 0;
                        node.getComponent(cc.Sprite).spriteFrame = PrfabsManager.instance.Role_Right_Black[node.name];


                        // GameUtils.loadRes("textures/players/enemy1_right/" + node.name,cc.SpriteFrame,false,(spfm) => {
                        //     node.getComponent(cc.Sprite).sizeMode = 0;
                        //     node.getComponent(cc.Sprite).spriteFrame = spfm;
                        // })
                    }
                }
        }
    }


    private initNodePool():void{
        if(StageDataMgr.CUR_MODE != MODE_TYPE_STRUCT.MODE2){
            NodePoolMgr.instance.createNodePool(PrfabsManager.instance.prfabsAry.bullet.name,PrfabsManager.instance.prfabsAry.bullet,GameMainMgr.totalBulletCount);
        }
    }

    initUi() {

        this.dirNode = new cc.Node();
        this.dirNode.name = "dirNode";
        this.dirNode.width = 46;
        this.dirNode.height = 46;

        GameMainMgr.enemy_count = this.RoleListNode.childrenCount;

        let topContent:cc.Node = null;
        if(StageDataMgr.CUR_LEVEL <= 32){
            topContent = cc.instantiate(PrfabsManager.instance.prfabsAry.topContent);
        }else{
            topContent = cc.instantiate(PrfabsManager.instance.prfabsAry.topContent2); 
        }
        this.content.addChild(topContent,0); 
        this.TopContentComp = topContent.getComponent(TopContent);

        // let hpContent = cc.instantiate(PrfabsManager.instance.prfabsAry.hpContent);
        // if(StageDataMgr.CUR_MODE == MODE_TYPE_STRUCT.MODE1 && StageDataMgr.CUR_LEVEL <= 32){
        // }else{
        //     hpContent.scaleX = 1.45;
        //     hpContent.scaleY = 1.45;
        // }
        // this.content.addChild(hpContent,0); 

        this.initTopBulletInfo();
    }

    private initTopBulletInfo():void {
        // if(StageDataMgr.CUR_MODE == MODE_TYPE_STRUCT.MODE1){
        if(true){
            // let levelConfig:LevelConfig = GameConfig.LevelConfig["level_" + StageDataMgr.instance.getData(StageDataMgr.KEY_CUR_STAGE_NUM)].bullets;
            GameMainMgr.normalBulletCount = 3;

            let data = GameConfig.instance.gameMeta.classicalModeLevelMeta;
            if(StageDataMgr.CUR_MODE == MODE_TYPE_STRUCT.MODE1){
               
              }else if(StageDataMgr.CUR_MODE == MODE_TYPE_STRUCT.MODE2){
                data = GameConfig.instance.gameMeta.grenadeModeLevelMeta;
              }else if(StageDataMgr.CUR_MODE == MODE_TYPE_STRUCT.MODE3){
                data = GameConfig.instance.gameMeta.hostageModeLevelMeta;
              }else if(StageDataMgr.CUR_MODE == MODE_TYPE_STRUCT.MODE4){
                data = GameConfig.instance.gameMeta.survivalModeLevelMeta;
              }
            if(data.length < StageDataMgr.CUR_LEVEL){
                GameMainMgr.lightBulletCount = 2; 
            }else{
                GameMainMgr.lightBulletCount = data[StageDataMgr.CUR_LEVEL - 1].goldBulletNum;
            }
        }
        if(StageDataMgr.IS_REVIVE_STATE == true){
            StageDataMgr.IS_REVIVE_STATE = false;
            GameMainMgr.lightBulletCount += GameConfig.instance.gameMeta.settlementRewardMeta[0].lose;
            GameUtils.showToast("恭喜复活，子弹数量+" + GameConfig.instance.gameMeta.settlementRewardMeta[0].lose);
        }

        GameMainMgr.totalBulletCount = GameMainMgr.normalBulletCount + GameMainMgr.lightBulletCount;

       this.TopContentComp.refreshAllBullet(GameMainMgr.normalBulletCount,GameMainMgr.lightBulletCount);
    }
    /**添加子弹 */
    addBulletEvent(e:cc.Event.EventCustom) {
        if(e) e.stopPropagation();
        GameMainMgr.totalBulletCount ++;
        GameMainMgr.normalBulletCount ++;
        this.TopContentComp.addNormalBulletItem();
    }
    /**复活 */
    // public reviveEvent(e:cc.Event.EventCustom):void {
    //     // if(e) e.stopPropagation();
    //     // GameMainMgr.isRevive = true;
    //     // if(GameMainMgr.curGameState == GameMainMgr.gameState.LOST){
    //     //     GameMainMgr.curGameState = GameMainMgr.gameState.READY;
    //     //     console.log('复活')
    //     // }
    //     // GameMainMgr.totalBulletCount = GameConfig.instance.gameMeta.settlementRewardMeta[0].lose;
    //     // GameMainMgr.normalBulletCount = GameConfig.instance.gameMeta.settlementRewardMeta[0].lose;
    //     // this.TopContentComp.addNormalBulletItem();
    //     // this.TopContentComp.addNormalBulletItem();

    // }

    initListener() {
        // this.node.on(Common.eventMessage.revive,this.reviveEvent,this);
        this.node.on(Common.eventMessage.addBullet,this.addBulletEvent,this);
        this.node.on(Common.eventMessage.bulletRemove,this.bulletRemoveEvent,this);
        this.node.on(Common.eventMessage.enemyDie,this.enemyDieEvent,this);
        this.node.on(Common.eventMessage.gameFail,this.showGameLostEvent,this);
        this.node.on(Common.eventMessage.gameWin,this.showGameWinEvent,this);

        this.node.on(HelpMgr.showHelpEvent,this.showHelpEvent,this);


        this.content.on(cc.Node.EventType.TOUCH_START, this.onTouchStartEvent, this);
        this.content.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMoveEvent, this);
        this.content.on(cc.Node.EventType.TOUCH_END, this.onTouchEndEvent, this);
        this.content.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEndEvent, this);
    }
    

    onTouchStartEvent(e) {
        console.log(GameMainMgr.totalBulletCount,'开始点击')
        if(e){
            WXDevice.vibrateShort();
        }
        if(GameMainMgr.curGameState == GameMainMgr.gameState.READY){
            GameMainMgr.curGameState = GameMainMgr.gameState.ACTIVE
        }

        if(GameMainMgr.totalBulletCount > 0 && GameMainMgr.curGameState == GameMainMgr.gameState.ACTIVE){
            this.rotateHand(e.getLocation());
            if(StageDataMgr.CUR_MODE == MODE_TYPE_STRUCT.MODE2){
                this.changeCrossLine(e.getLocation());
            }
        }else if(GameMainMgr.totalBulletCount <= 0){
            this.scheduleOnce(()=>{
                this.showGameLostEvent(null);
            },6)
        }
    }
    onTouchMoveEvent(e) {
        this.rotateHand(e.getLocation());
        if(StageDataMgr.CUR_MODE == MODE_TYPE_STRUCT.MODE2){
            this.changeCrossLine(e.getLocation());
        }
    }

    
    onTouchEndEvent(e) {
        // console.log(GameMainMgr.curGameState,e == null,"aaaaaaaaaaaaaaaaa")
        if(e){
            WXDevice.vibrateShort();
            if(true == StageDataMgr.NEED_SUB_HP){
                if(StageDataMgr.CUR_MODE == MODE_TYPE_STRUCT.MODE1 && StageDataMgr.CUR_LEVEL <= 16){
                }else{
                    let hpTipNode = cc.instantiate(PrfabsManager.instance.prfabsAry.hpTipNode);
                    cc.find("Canvas").addChild(hpTipNode);
                    StageDataMgr.instance.setData(StageDataMgr.KEY_USER_HP_NUM,StageDataMgr.instance.getData(StageDataMgr.KEY_USER_HP_NUM) - 1);
                }
                StageDataMgr.NEED_SUB_HP = false;
            }
            if(StageDataMgr.CUR_MODE == MODE_TYPE_STRUCT.MODE1 && StageDataMgr.CUR_LEVEL <= 16){
                if(this.content.getChildByName("helpPanel")){
                    this.content.getChildByName("helpPanel").destroy();
                }
            }

            // StageDataMgr.instance.setData(StageDataMgr.KEY_USER_HP_NUM,StageDataMgr.instance.getData(StageDataMgr.KEY_USER_HP_NUM) - 1);
        }
        // let pos = this.content.convertToNodeSpaceAR(e.getLocation());
        // console.log(StageDataMgr.CUR_LEVEL + ":cc.v2(" + Math.floor(pos.x)+ "," + Math.floor(pos.y) + "),");
        if(this.helpNode){
            this.helpNode.destroy();
            this.helpNode = null;
        }

        this.rotateHand(e.getLocation());
        if(StageDataMgr.CUR_MODE == MODE_TYPE_STRUCT.MODE2){
        }else{
            this.fired();
            this.gunLine.active = false;
            this.zhunxin.active = false;
        }


        let lightBulletCount = 2;
        let data = GameConfig.instance.gameMeta.classicalModeLevelMeta;
        if(data.length < StageDataMgr.CUR_LEVEL){
        }else{
            lightBulletCount = data[StageDataMgr.CUR_LEVEL - 1].goldBulletNum;
        }

    }

    showGameLostEvent(e:cc.Event.EventCustom) {
        if(e) e.stopPropagation();
        if (GameMainMgr.curGameState == GameMainMgr.gameState.ACTIVE) {
            GameMainMgr.curGameState = GameMainMgr.gameState.LOST;

            // let policy: boolean = DeerSDK.instance.canUseEasingPolicy;

            // policy = true;
            // DeerSDK.instance["_game_config"] = {
            //     goldenEggSwitch:true,
            //     goldenEggInterval:2,
            //     goldenEggLimit:3,
            //     goldenEggEnergyBonus:3
            // }
            
            //console.log("安全模式:",policy,"data:",DeerSDK.instance.game_config,"当天金蛋次数:",StageDataMgr.instance.getData(StageDataMgr.KEY_GOLD_EGG_LIMIT))
            // if (policy == true) {
            if(false){
                let data: any = DeerSDK.instance.game_config;
                    if (data != undefined && StageDataMgr.CUR_LEVEL % data.goldenEggInterval == 0 && data.goldenEggSwitch && StageDataMgr.instance.goldEggLimit < data.goldenEggLimit) {
                    this.scheduleOnce(()=>{
                        GameUtils.instance.loadSceneWithOperate("giftScene");
                    },1)
                }else{
                    var GameContinue = cc.instantiate(PrfabsManager.instance.prfabsAry.gameWinPanel);
                    this.node.addChild(GameContinue);
                }
            }else{
                if(StageDataMgr.CUR_LEVEL > 16 && StageDataMgr.CUR_LEVEL <= 64){
                    if(StageDataMgr.LAST_TIP_STAGE != StageDataMgr.CUR_LEVEL && !HelpMgr.isCurStageHelpOpened(StageDataMgr.CUR_MODE,StageDataMgr.CUR_LEVEL)){
                       
                            var showHelpTip = cc.instantiate(PrfabsManager.instance.prfabsAry.showHelpTip);
                            this.node.addChild(showHelpTip);
                            showHelpTip.getComponent(HelpTip).cancelCallfunc = ()=>{
                                if(this.node){
                                    var GameContinue = cc.instantiate(PrfabsManager.instance.prfabsAry.gameWinPanel);
                                    this.node.addChild(GameContinue);
                                }
                            }
                            StageDataMgr.LAST_TIP_STAGE = StageDataMgr.CUR_LEVEL;
                    }else{
                        var GameContinue = cc.instantiate(PrfabsManager.instance.prfabsAry.gameWinPanel);
                        this.node.addChild(GameContinue);
                    }
                }
                else{
                    var GameContinue = cc.instantiate(PrfabsManager.instance.prfabsAry.gameWinPanel);
                    this.node.addChild(GameContinue);
                }



                // if(StageDataMgr.CUR_LEVEL > 16 && StageDataMgr.CUR_LEVEL <= 64){
                //     if(StageDataMgr.LAST_TIP_STAGE != StageDataMgr.CUR_LEVEL && !HelpMgr.isCurStageHelpOpened(StageDataMgr.CUR_MODE,StageDataMgr.CUR_LEVEL)){
                //         StageDataMgr.TEMP_REFRESH_INFO.curMode = StageDataMgr.CUR_MODE,
                //         StageDataMgr.TEMP_REFRESH_INFO.curStageNum = StageDataMgr.CUR_LEVEL;
                //         StageDataMgr.TEMP_REFRESH_INFO.refreshCount = StageDataMgr.instance.getRefreshCount(StageDataMgr.CUR_MODE,StageDataMgr.CUR_LEVEL);
                //         let data = 1;
                //         let game_config: any = DeerSDK.instance.game_config;
                //         if (game_config != undefined) {
                //             data = game_config.refreshNumLimit;
                //         }
                //         if(StageDataMgr.TEMP_REFRESH_INFO.refreshCount == (data - 1)){
                //             var showHelpTip = cc.instantiate(PrfabsManager.instance.prfabsAry.showHelpTip);
                //             this.node.addChild(showHelpTip);
                //             showHelpTip.getComponent(HelpTip).cancelCallfunc = ()=>{
                //                 if(this.node){
                //                     var GameContinue = cc.instantiate(PrfabsManager.instance.prfabsAry.gameWinPanel);
                //                     this.node.addChild(GameContinue);
                //                 }
                //             }
                //             StageDataMgr.LAST_TIP_STAGE = StageDataMgr.CUR_LEVEL;
                //         }else if(StageDataMgr.RETRY_STAGE == StageDataMgr.CUR_LEVEL){
                //             var showHelpTip = cc.instantiate(PrfabsManager.instance.prfabsAry.showHelpTip);
                //             this.node.addChild(showHelpTip);
                //             showHelpTip.getComponent(HelpTip).cancelCallfunc = ()=>{
                //                 if(this.node){
                //                     var GameContinue = cc.instantiate(PrfabsManager.instance.prfabsAry.gameWinPanel);
                //                     this.node.addChild(GameContinue);
                //                 }
                //             }
                //             StageDataMgr.LAST_TIP_STAGE = StageDataMgr.CUR_LEVEL;
                //         }else{
                //             var GameContinue = cc.instantiate(PrfabsManager.instance.prfabsAry.gameWinPanel);
                //             this.node.addChild(GameContinue);
                //         }
                //     }else{
                //         var GameContinue = cc.instantiate(PrfabsManager.instance.prfabsAry.gameWinPanel);
                //         this.node.addChild(GameContinue);
                //     }
                // }
                // else{
                //     var GameContinue = cc.instantiate(PrfabsManager.instance.prfabsAry.gameWinPanel);
                //     this.node.addChild(GameContinue);
                // }

            }



            // WXDevice.vibrateShort();

        }
    }

    showGameWinEvent(e:cc.Event.EventCustom) {
        if(e) e.stopPropagation();
        console.log("游戏胜利");
        if (GameMainMgr.curGameState == GameMainMgr.gameState.ACTIVE) {
            if(StageDataMgr.CUR_LEVEL < 63){
                // cc.director.preloadScene("map" + (StageDataMgr.CUR_LEVEL + 2));
                // cc.director.preloadScene("map" + (StageDataMgr.CUR_LEVEL + 1));
                GameUtils.loadRes("prefabs/map/map" + (StageDataMgr.CUR_LEVEL + 1),cc.Prefab,true);
                GameUtils.loadRes("prefabs/map/map" + (StageDataMgr.CUR_LEVEL + 2),cc.Prefab,true);
            }
            GameMainMgr.curGameState = GameMainMgr.gameState.WIN;
            // let curStageNum = StageDataMgr.instance.getData(StageDataMgr.KEY_CUR_STAGE_NUM);
            let curStageNum = StageDataMgr.CUR_LEVEL;
            // let levelConfig:LevelConfig = GameConfig.LevelConfig["level_" + curStageNum].bullets;


            StageDataMgr.instance.savePassStage(curStageNum,STAGE_STATE_STRUCT.UNLOCK,GameMainMgr.calcuStars(),StageDataMgr.CUR_MODE);
            

            StageDataMgr.instance.totalStage = 0;
            GameConfig.instance.saveScoreToService(StageDataMgr.instance.getBestStageNum());

            let loginDay = MainDataMgr.instance.getData(MainDataMgr.KEY_LOGIN_DAY)
            // if( loginDay == (new Date().getMonth() + "月" +  new Date().getDate())){
            //     let mode = 0 + StageDataMgr.CUR_MODE;
            //     let level = 0 + StageDataMgr.CUR_LEVEL;
            //     let data = JSON.stringify({mode:mode, level:level,loginUpDay: new Date().getMonth() + "月" +  new Date().getDate()});
            //     GameUtils.buriedPoint(29,data);
            // }
            let mode = 0 + StageDataMgr.CUR_MODE;
            let level = 0 + StageDataMgr.CUR_LEVEL;
            let data = JSON.stringify({mode:mode, level:level,loginUpDay: loginDay});
            GameUtils.buriedPoint(29,data);

            curStageNum ++;
            if(curStageNum > GameConfig.instance.gameMeta.classicalModeLevelMeta.length){
                curStageNum = GameConfig.instance.gameMeta.classicalModeLevelMeta.length;
            }
            StageDataMgr.instance.setData(StageDataMgr.KEY_CUR_STAGE_NUM,curStageNum);

            console.log("初始化游戏胜利页面");

            let policy: boolean = DeerSDK.instance.canUseEasingPolicy;


            // policy = true;
            // DeerSDK.instance["_game_config"] = {
            //     goldenEggSwitch:true,
            //     goldenEggInterval:2,
            //     goldenEggLimit:3,
            //     goldenEggEnergyBonus:3
            // }




            // console.log("安全模式1:",policy,"data:",DeerSDK.instance.game_config,"当天金蛋次数:",StageDataMgr.instance.goldEggLimit)
            // if (policy == true) {
            if(false){ 
                let data: any = DeerSDK.instance.game_config;
                if (data != undefined && StageDataMgr.CUR_LEVEL % data.goldenEggInterval == 0 && data.goldenEggSwitch && StageDataMgr.instance.goldEggLimit < data.goldenEggLimit) {
                    this.scheduleOnce(()=>{
                        GameUtils.instance.loadSceneWithOperate("giftScene");
                    },1.5)
                }else{
                    var c = cc.instantiate(PrfabsManager.instance.prfabsAry.gameWinPanel);
                    this.scheduleOnce(() => {
                       // WXDevice.vibrateLong();
                       if(this.node){
                        this.node.addChild(c);
                       }else{
                        c.destroy();
                       }
                   }, 1.5);
                }
            }else{
                var c = cc.instantiate(PrfabsManager.instance.prfabsAry.gameWinPanel);
                this.scheduleOnce(() => {
                   // WXDevice.vibrateLong();
                   if(this.node){
                    this.node.addChild(c);
                   }else{
                    c.destroy();
                   }
               }, 1.5);
            }
        }
    }


    private helpNode:cc.Node = null;
    private showHelpEvent(e:cc.Event.EventCustom):void{
        if(this.helpNode){
            return;
        }
        let mode:number = StageDataMgr.CUR_MODE + 0;
        let level:number = StageDataMgr.CUR_LEVEL + 0;
        GameUtils.loadRes("prefabs/stage/crosshair",cc.Prefab,true,(pfb) => {
            let pos:cc.Vec2 = MapJson[mode][level];
            if(mode == StageDataMgr.CUR_MODE && level == StageDataMgr.CUR_LEVEL && pos && this.content){
                this.helpNode = cc.instantiate(pfb);
                this.helpNode.getComponent(Crosshair).init(pos);
                this.content.addChild(this.helpNode);
            }
        })
    }
    

    bulletRemoveEvent(e:cc.Event.EventCustom):void{
        if(e){
            e.stopPropagation();
        }
        GameMainMgr.activeBulletCount --;
        console.log(GameMainMgr.totalBulletCount,GameMainMgr.activeBulletCount)
        if(GameMainMgr.totalBulletCount == 0 && GameMainMgr.activeBulletCount <= 0){
            console.log(GameMainMgr.activeBulletCount,'==子弹打完==');
            this.scheduleOnce(()=>{
                this.showGameLostEvent(null);
            },1)
        }
    }


    enemyDieEvent(e:cc.Event.EventCustom):void{
        if(e){
            e.stopPropagation();
        }
        GameMainMgr.enemy_count --;
        if(GameMainMgr.enemy_count == 0){
            this.showGameWinEvent(null);
        }
    }



    rotateHand(e) {
        
        if (GameMainMgr.curGameState === GameMainMgr.gameState.ACTIVE) {
            this.gunLine.active = true;
            this.zhunxin.active = true;
            this.firedPosition = e;
            var t = this.hand.parent.convertToWorldSpaceAR(this.hand.position);
            var o = this.gun.parent.convertToWorldSpaceAR(this.gun.position);
            var n = e;
            var l = this.firedPositionNode.parent.convertToWorldSpaceAR(this.firedPositionNode.position);
            var a = n.sub(t);
            var i = o.sub(t);
            var c = n.sub(t);
            var s = 1 * cc.misc.radiansToDegrees(c.signAngle(cc.v2(0, -1)));
            if (-1 == this.playerNode.scaleX && (s = -s), this.hand.setRotation(s), a.mag() < i.mag()) {
                var d = this.playerNode.convertToNodeSpaceAR(l);
                s < 0 ? d.x += 21 : d.x -= 21, this.zhunxin.setPosition(d);
            }else {
                (d = this.playerNode.convertToNodeSpaceAR(e)).x -= 21, this.zhunxin.setPosition(d);
            }
        }
    }

    changeCrossLine(e) {
        this.grenadeLine.active = true;
        var t = this.grenadeLine.parent.convertToWorldSpaceAR(this.grenadeLine.position), o = e.sub(t).mag();
        o > 220 && (o = 220), this.grenadeLine.width = o;
    }
    bulletControllerComp:BulletController = null;
    fired() {
        if(GameMainMgr.totalBulletCount < 1){
            AudioManager.instance.playSound("nobullet")
        } else {
            GameMainMgr.totalBulletCount--;
            GameMainMgr.activeBulletCount ++;
            this.TopContentComp.removeBulletItem();
            AudioManager.instance.playSound("fired");
            var e = this.firedPositionNode.parent.convertToWorldSpaceAR(this.firedPositionNode.position);
            var t = NodePoolMgr.instance.getNodePool(PrfabsManager.instance.prfabsAry.bullet.name);
            t.position = this.node.convertToNodeSpaceAR(e);
            cc.find("Canvas").addChild(t);

            this.bulletControllerComp = t.getComponent(BulletController);
            var o = this.hand.getChildByName("dirNode");
            e = (e = o.parent.convertToWorldSpaceAR(o.position).sub(e)).normalize().mul(5e3), 
            StageDataMgr.CUR_MODE == MODE_TYPE_STRUCT.MODE3 && (e = e.normalize().mul(1e7)), 
            this.bulletControllerComp.bulletBody.applyLinearImpulse(e, this.bulletControllerComp.bulletBody.getWorldCenter(), true);
        }
    }

    // throwGrenade(e) {
    //     if(GameMainMgr.totalBulletCount < 1){
    //         AudioManager.instance.playSound("noBullet")
    //     }else{
    //         this.TopContentComp.removeBulletItem();
    //         GameMainMgr.totalBulletCount--;
    //         var t = this;
    //         this.hand.runAction(cc.sequence(cc.rotateBy(.1, 360), cc.callFunc(() => {
    //             var o = t.firedPositionNode.parent.convertToWorldSpaceAR(t.firedPositionNode.position);
    //             var n = cc.instantiate(PrfabsManager.instance.prfabsAry.grenade);
    //             n.position = t.node.convertToNodeSpaceAR(o);
    //             n.name = new Date().getTime().toString();
    //             cc.find("Canvas").addChild(n);
    //             t.grenadeControllerComp = n.getComponent(GrenadeController);
    //             var l = t.hand.getChildByName("dirNode");
    //             o = l.parent.convertToWorldSpaceAR(l.position).sub(o);
    //             var i = t.grenadeLine.parent.convertToWorldSpaceAR(t.grenadeLine.position);
    //             var r = e.sub(i).mag();
    //             console.log(.5 * r), o = o.normalize().mul(10 * r),
    //              t.grenadeControllerComp.grenadeBody.applyLinearImpulse(o, t.grenadeControllerComp.grenadeBody.getWorldCenter(), true);
    //         })));
    //     }
    // }

    onDestroy() {
        cc.director.getPhysicsManager().enabled = false;
        cc.director.getCollisionManager().enabled = false;
        NodePoolMgr.instance.NodePoolclearUp(PrfabsManager.instance.prfabsAry.bullet.name);
    }


    // update (dt) {}
}
