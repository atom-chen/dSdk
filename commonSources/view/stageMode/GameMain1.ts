
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
import GrenadeController from "./GrenadeController";
import PhysicPlayer from "./PhysicPlayer";
import WXDevice from "../../gamecore/wechat/WXDevice";
import DeerSDK from "../../gamecore/deer/DeerSDK";
import StageEnd from "./StageEnd";
import MainDataMgr from "../../module/data/MainDataMgr";
import StageModeMgr from "./StageModeMgr";
import Guide from "./Guide";

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
export default class GameMain1 extends cc.Component {

@property(cc.Node)
hand:cc.Node = null;

@property(cc.Node)
gunLine:cc.Node = null;

@property(cc.Node)
zhunxin:cc.Node = null;

@property(cc.Node)
playerNode:cc.Node = null;

@property(cc.Node)
gun:cc.Node = null;

@property(cc.Node)
firedPositionNode:cc.Node = null;

@property(cc.Node)
grenadeLine:cc.Node = null;

@property(BulletController)
bulletControllerComp:BulletController = null;

@property(cc.Node)
RoleListNode:cc.Node = null;

@property(cc.Node)
content:cc.Node = null;



// grenadeControllerComp:GrenadeController = null;

private dirNode:cc.Node = null;

private TopContentComp:TopContent = null;

firedPosition: any;
    grenadeControllerComp: any;
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}

    onLoad() {
        let adNode = cc.instantiate(PrfabsManager.instance.prfabsAry.adNode);
        this.node.addChild(adNode);

        if(StageDataMgr.CUR_LEVEL == 1){
            GameUtils.loadRes("prefabs/stage/guide",cc.Prefab,true,(pfb) => {
                let guideNode:cc.Node = cc.instantiate(pfb);
                guideNode.getComponent(Guide).guide.spriteFrame = guideNode.getComponent(Guide).guideSpfmArr[StageDataMgr.CUR_MODE - 1];
                cc.find("Canvas").addChild(guideNode);
            })
        }
    }

    init() {
        this.content = this.node.getChildByName("content");
        if(StageDataMgr.CUR_MODE == MODE_TYPE_STRUCT.MODE4){
            if(this.content.getChildByName("Player_Left")){
                this.playerNode = this.content.getChildByName("Player_Left")

            }else if(this.content.getChildByName("Player_Right")){
                this.playerNode = this.content.getChildByName("Player_Right")
                // this.playerNode.getChildByName("left_hand").x = - 35; 
            }
            this.playerController = this.playerNode.getComponent(PhysicPlayer);
            // console.log(this.playerNode,"nnnnn")
        }else{
            this.playerNode = this.content.getChildByName("Player");
        }
        this.hand = this.playerNode.getChildByName("left_hand");
        this.gunLine = this.hand.getChildByName("line");
        this.zhunxin = this.playerNode.getChildByName("crosshair")
        this.gun = this.hand.getChildByName("gun");
        this.firedPositionNode = this.hand.getChildByName("FirePositionNode");

        // console.log(this.hand,"hand")
        if(this.hand.getChildByName("line")){
            this.grenadeLine = this.hand.getChildByName("line");
        }
        this.RoleListNode = this.content.getChildByName("RoleListNode");

        this.scheduleOnce(()=>{
            this.loadPlayerSkin();
            this.loadEnemySkin();
            // if(StageDataMgr.IS_ANI == false){
            //     StageDataMgr.USER_OP.mode = StageDataMgr.CUR_MODE,
            //     StageDataMgr.USER_OP.level = StageDataMgr.CUR_LEVEL,
            //     StageDataMgr.USER_OP.location = [];
            //     StageDataMgr.USER_OP.time = [];
            //     StageDataMgr.USER_OP.beginTime = new Date().getTime();
            // }else{
            //     StageDataMgr.IS_ANI = true;
            //     console.log('uuuuuuuuuuuuuuuuu1')
            //     // this.showAni();
            // }

        })




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
            var c:cc.Node = cc.instantiate(PrfabsManager.instance.prfabsAry.gameWinPanel);
            this.node.addChild(c,0);
            c.getComponent(StageEnd).showEggReward();
            return;
        }

        this.initListener();
        GameMainMgr.curGameState = GameMainMgr.gameState.READY;
        GameMainMgr.activeBulletCount = 0;
        this.initNodePool();
    }

    start(){

        
        let bg = this.node.getChildByName("content").getChildByName("background");
        let widget = bg.getComponent(cc.Widget);
        widget.enabled = true;

        bg.zIndex = - 999;
        bg.getComponent(cc.Sprite).type = 1;
        bg.getComponent(cc.Sprite).sizeMode = 0;

        let bgIndex = Math.ceil(StageDataMgr.CUR_LEVEL / 16);
        let data = "bg_10";

        if(bgIndex < 10){
            data = data + "0" + bgIndex;
        }else{
            data = data + bgIndex;
        }

        bg.getComponent(cc.Sprite).spriteFrame = PrfabsManager.instance.bgArr[data];

        widget.isAlignTop = true;
        widget.isAlignBottom = true;
        widget.isAlignRight = true;
        widget.isAlignLeft = true;
        widget.top = 0;
        widget.bottom = 0;
        // console.log(bg)
    }

    @property(PhysicPlayer)
    playerController:PhysicPlayer = null;
    



    private loadPlayerSkin():void{
        

        if(StageDataMgr.CUR_MODE != MODE_TYPE_STRUCT.MODE4){
            let player = this.playerNode;
            this.hand.getChildByName("gun").active = true;
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

        }else{
            let imgid = GameConfig.instance.getCurRoleSKinInfo().imageId;
            let dirName = imgid + "/";
            if( -1 !== this.playerNode.name.indexOf("Right")){
                dirName = imgid + "_right/";
            }
            for(let i = 0;i <this.playerNode.childrenCount;i ++){
                if(this.playerNode.children[i].name != "crosshair" && this.playerNode.children[i].name != "left_hand" && this.playerNode.children[i].name != "Blood_2"){
                    GameUtils.loadRes("textures/players/live/" + dirName + this.playerNode.children[i].name,cc.SpriteFrame,false,(spfm:cc.SpriteFrame) =>{
                        // let size = this.playerNode.children[i].getContentSize();
                        this.playerNode.children[i].getComponent(cc.Sprite).sizeMode = 0;
            
                        this.playerNode.children[i].getComponent(cc.Sprite).spriteFrame = spfm;
                        // this.playerNode.children[i].setContentSize(size);
                    })
                }else if(this.playerNode.children[i].name == "left_hand"){
                    GameUtils.loadRes("textures/players/" + imgid + "/left_hand",cc.SpriteFrame,false,(spfm) =>{
                        // let size = this.playerNode.children[i].getContentSize();

                        this.playerNode.children[i].getComponent(cc.Sprite).sizeMode = 0;
            
                        this.playerNode.children[i].getComponent(cc.Sprite).spriteFrame = spfm;
                        // this.playerNode.children[i].setContentSize(size);

                    })
                }
            }
        }


        // return;

    }
    //Trane
    private loadEnemySkin():void{
        let list = this.content.getChildByName("RoleListNode");
        for(let i = 0; i < list.childrenCount;i ++){
            if(list.children[i].name.indexOf("Role_Left_Black") != -1){
                let player = list.children[i];
                for(let j = 0; j < player.childrenCount;j ++){
                    let node = player.children[j];
                    node.getComponent(cc.Sprite).sizeMode = 0;
                    node.getComponent(cc.Sprite).spriteFrame = PrfabsManager.instance.Role_Left_Black[node.name];
                }
            }else if(list.children[i].name.indexOf("Role_Right_Black") != -1){
                    let player = list.children[i];
                    for(let j = 0; j < player.childrenCount;j ++){
                        let node = player.children[j];
                        // node.getComponent(cc.RigidBody). = false;

                        node.getComponent(cc.Sprite).sizeMode = 0;
                        node.getComponent(cc.Sprite).spriteFrame = PrfabsManager.instance.Role_Right_Black[node.name];
                    }
            }else if(list.children[i].name.indexOf("Trane") != -1){
                let player = list.children[0].children[0];
                for(let j = 0; j < player.childrenCount;j ++){
                    let node = player.children[j];
                    // node.getComponent(cc.RigidBody). = false;

                    node.getComponent(cc.Sprite).sizeMode = 0;
                    node.getComponent(cc.Sprite).spriteFrame = PrfabsManager.instance.Role_Right_Black[node.name];
                }
        }

        }
        
    }


    private initNodePool():void{
        if(StageDataMgr.CUR_MODE != MODE_TYPE_STRUCT.MODE2){
            // console.log(PrfabsManager.instance.prfabsAry.bullet,'====');
            NodePoolMgr.instance.createNodePool(PrfabsManager.instance.prfabsAry.bullet.name,PrfabsManager.instance.prfabsAry.bullet,GameMainMgr.totalBulletCount);
        }
    }


    private gameStart:boolean = false;
    initUi() {

        this.dirNode = new cc.Node();
        this.dirNode.name = "dirNode";
        this.dirNode.width = 46;
        this.dirNode.height = 46;

        this.scheduleOnce(()=>{
            GameMainMgr.enemy_count = this.RoleListNode.childrenCount;
            this.gameStart = true;
        })

        let topContent = cc.instantiate(PrfabsManager.instance.prfabsAry.topContent2);
        this.content.addChild(topContent,0); 
        this.TopContentComp = topContent.getComponent(TopContent);

        // let win = cc.instantiate(PrfabsManager.instance.prfabsAry.hpContent);
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
    public reviveEvent(e:cc.Event.EventCustom):void {
        if(e) e.stopPropagation();
        GameMainMgr.isRevive = true;
        if(GameMainMgr.curGameState == GameMainMgr.gameState.LOST){
            GameMainMgr.curGameState = GameMainMgr.gameState.READY;
            console.log('复活')
        }
        GameMainMgr.totalBulletCount = GameConfig.instance.gameMeta.settlementRewardMeta[0].lose;
        GameMainMgr.normalBulletCount = GameConfig.instance.gameMeta.settlementRewardMeta[0].lose;

        this.TopContentComp.addNormalBulletItem();
        this.TopContentComp.addNormalBulletItem();

    }

    initListener() {
        // this.node.on(Common.eventMessage.revive,this.reviveEvent,this);
        this.node.on(Common.eventMessage.addBullet,this.addBulletEvent,this);
        this.node.on(Common.eventMessage.bulletRemove,this.bulletRemoveEvent,this);
        this.node.on(Common.eventMessage.enemyDie,this.enemyDieEvent,this);
        this.node.on(Common.eventMessage.gameFail,this.showGameLostEvent,this);
        this.node.on(Common.eventMessage.gameWin,this.showGameWinEvent,this);
        this.node.on(Common.eventMessage.grendaDestroy,this.bulletRemoveEvent,this);


        if(!StageDataMgr.IS_ANI){
            this.node.getChildByName("content").on(cc.Node.EventType.TOUCH_START, this.onTouchStartEvent, this);
            this.node.getChildByName("content").on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMoveEvent, this);
            this.node.getChildByName("content").on(cc.Node.EventType.TOUCH_END, this.onTouchEndEvent, this);
            this.node.getChildByName("content").on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEndEvent, this);
        }
        // console.log(StageDataMgr.USER_OP.beginTime,"tittttttttttttttt")


    }
    

    onTouchStartEvent(e,pos:cc.Vec2) {
        // console.log(GameMainMgr.totalBulletCount,'开始点击')
        if(e){
            WXDevice.vibrateShort();
        }
        let touchPositon = e ? e.getLocation():pos;

        if(GameMainMgr.curGameState == GameMainMgr.gameState.READY){
            GameMainMgr.curGameState = GameMainMgr.gameState.ACTIVE
        }

        if(GameMainMgr.totalBulletCount > 0 && GameMainMgr.curGameState == GameMainMgr.gameState.ACTIVE){
            this.rotateHand(touchPositon);
            if(StageDataMgr.CUR_MODE == MODE_TYPE_STRUCT.MODE2){
                this.changeCrossLine(touchPositon);
            }else if(StageDataMgr.CUR_MODE == MODE_TYPE_STRUCT.MODE4){
                if(GameMainMgr.curGameState == GameMainMgr.gameState.LOST){
                }else{
                    this.hand.active = true;
                    if( -1 == this.playerNode.name.indexOf("Right")){
                        this.playerController.leftHandTopRigBody.node.getComponent(cc.Sprite).enabled = false, 
                        this.playerController.leftHandBottomRigBody.node.getComponent(cc.Sprite).enabled = false
                    }else{
                        this.playerController.leftHandTopRigBody.node.getComponent(cc.Sprite).enabled = false, 
                        this.playerController.leftHandBottomRigBody.node.getComponent(cc.Sprite).enabled = false
                    }
                }
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

    /**播放演示动画 */
    private showAni(){
        let func1 = (time,index) => {
            this.scheduleOnce(() => {


                let pos = StageDataMgr.USER_OP.location[index];
                let realPos = this.content.getChildByName("map").convertToWorldSpaceAR(pos);


                this.onTouchStartEvent(null,cc.v2(realPos.x,realPos.y));
                this.onTouchEndEvent(null,cc.v2(realPos.x,realPos.y));

                // if(index == (StageDataMgr.USER_OP.location.length - 1)){
                //     StageDataMgr.USER_OP.beginTime = 0;
                //     StageDataMgr.USER_OP.location = [];
                //     StageDataMgr.USER_OP.time = [];
                // }
            },time / 1000)
        }
        // console.log(StageDataMgr.USER_OP.location.length,"uuuuuuuuuuuuu3",StageDataMgr.USER_OP)
        for(let i = 0; i < StageDataMgr.USER_OP.location.length;i ++){
            func1(StageDataMgr.USER_OP.time[i],i);
        }
    }


    onTouchEndEvent(e,pos:cc.Vec2) {
        if(GameMainMgr.curGameState != GameMainMgr.gameState.ACTIVE){
            return;
        }


        let touchPositon = e ? e.getLocation():pos;
        if(e){
            WXDevice.vibrateShort();
            if(true == StageDataMgr.NEED_SUB_HP){
                let hpTipNode = cc.instantiate(PrfabsManager.instance.prfabsAry.hpTipNode);
                cc.find("Canvas").addChild(hpTipNode);

                StageDataMgr.instance.setData(StageDataMgr.KEY_USER_HP_NUM,StageDataMgr.instance.getData(StageDataMgr.KEY_USER_HP_NUM) - 1);
                StageDataMgr.NEED_SUB_HP = false;
            }
        }
        // if(!StageDataMgr.IS_ANI){
        //     StageDataMgr.USER_OP.time.push(new Date().getTime() - StageDataMgr.USER_OP.beginTime);

        //     let pos = this.content.getChildByName("map").convertToNodeSpaceAR(touchPositon);

        //     StageDataMgr.USER_OP.location.push(cc.v2(pos.x,pos.y));
        // }



        
        this.rotateHand(touchPositon);
        if(StageDataMgr.CUR_MODE == MODE_TYPE_STRUCT.MODE2){
            this.changeCrossLine(touchPositon);
            this.throwGrenade(touchPositon);
        }else{
            this.fired();
        }
        StageDataMgr.CUR_MODE == MODE_TYPE_STRUCT.MODE4 && (GameMainMgr.curGameState !== GameMainMgr.gameState.ACTIVE ||
        (-1 == this.playerNode.name.indexOf("Right") ?
        (this.playerController.leftHandTopRigBody.node.getComponent(cc.Sprite).enabled = true, 
        this.playerController.leftHandBottomRigBody.node.getComponent(cc.Sprite).enabled = true) :
        (this.playerController.rightHandTopRigBody.node.getComponent(cc.Sprite).enabled = true, 
        this.playerController.rightHandBottomRigBody.node.getComponent(cc.Sprite).enabled = true), 
        this.hand.active = false))

        this.gunLine.active = false;
        this.zhunxin.active = false;
        
    }

    showGameLostEvent(e:cc.Event.EventCustom) {
        console.log("游戏失败")
        if(e) e.stopPropagation();
        if (GameMainMgr.curGameState == GameMainMgr.gameState.ACTIVE || StageDataMgr.CUR_MODE == MODE_TYPE_STRUCT.MODE3) {

            if(StageDataMgr.CUR_MODE == MODE_TYPE_STRUCT.MODE3 && GameMainMgr.activeBulletCount <= 0 && GameMainMgr.curGameState == GameMainMgr.gameState.WIN){
                return;
            }

            GameMainMgr.curGameState = GameMainMgr.gameState.LOST;

            let policy: boolean = DeerSDK.instance.canUseEasingPolicy;


            // policy = true;
            // DeerSDK.instance["_game_config"] = {
            //     goldenEggSwitch:true,
            //     goldenEggInterval:2,
            //     goldenEggLimit:3,
            //     goldenEggEnergyBonus:3
            // }

            
            //console.log("安全模式2:",policy,"data:",DeerSDK.instance.game_config,"当天金蛋次数:",StageDataMgr.instance.getData(StageDataMgr.KEY_GOLD_EGG_LIMIT))
            // if (policy == true) {
            if(false){
                let data: any = DeerSDK.instance.game_config;
                if (data != undefined && StageDataMgr.CUR_LEVEL % data.goldenEggInterval == 0 && data.goldenEggSwitch && StageDataMgr.instance.goldEggLimit < data.goldenEggLimit) {
                    this.scheduleOnce(() => {
                        // WXDevice.vibrateLong();
                        GameUtils.instance.loadSceneWithOperate("giftScene");
                    },StageDataMgr.CUR_MODE == MODE_TYPE_STRUCT.MODE3 ? 1.5:1)
                }else{
                    var GameContinue = cc.instantiate(PrfabsManager.instance.prfabsAry.gameWinPanel);
                    this.scheduleOnce(() => {
                        // WXDevice.vibrateLong();
                        if(this.node){
                            this.node.addChild(GameContinue,0);
                        }else{
                            GameContinue.destroy();
                        }
                    },StageDataMgr.CUR_MODE == MODE_TYPE_STRUCT.MODE3 ? 1.5:1)
                }
            }else{
                var GameContinue = cc.instantiate(PrfabsManager.instance.prfabsAry.gameWinPanel);
                this.scheduleOnce(() => {
                    // WXDevice.vibrateLong();
                    if(this.node){
                        this.node.addChild(GameContinue,0);
                    }else{
                        GameContinue.destroy();
                    }
                },StageDataMgr.CUR_MODE == MODE_TYPE_STRUCT.MODE3 ? 1.5:1)
            }
        }
    }

    showGameWinEvent(e:cc.Event.EventCustom) {
        // console.log(e,'==gameStart==',this.gameStart);

        if(StageDataMgr.CUR_MODE == MODE_TYPE_STRUCT.MODE4){
            this.hand.active = false;
        }
        if(e) e.stopPropagation();
        console.log("游戏胜利");
        if (GameMainMgr.curGameState == GameMainMgr.gameState.ACTIVE) {

            let canPreLoad:boolean = false;
                if(StageDataMgr.CUR_MODE == MODE_TYPE_STRUCT.MODE1 && StageDataMgr.CUR_LEVEL >= 64){
                    if(StageDataMgr.CUR_LEVEL < GameConfig.instance.gameMeta.classicalModeLevelMeta.length - 3){
                        canPreLoad = true;
                    }
                }else if(StageDataMgr.CUR_MODE == MODE_TYPE_STRUCT.MODE2){
                    if(StageDataMgr.CUR_LEVEL < GameConfig.instance.gameMeta.grenadeModeLevelMeta.length - 3){
                        canPreLoad = true;
                    }
                }else if(StageDataMgr.CUR_MODE == MODE_TYPE_STRUCT.MODE3){
                    if(StageDataMgr.CUR_LEVEL < GameConfig.instance.gameMeta.hostageModeLevelMeta.length - 3){
                        canPreLoad = true;
                    }
                }else if(StageDataMgr.CUR_MODE == MODE_TYPE_STRUCT.MODE4){
                    if(StageDataMgr.CUR_LEVEL < GameConfig.instance.gameMeta.survivalModeLevelMeta.length - 3){
                        canPreLoad = true;
                    }
                }
                if(canPreLoad){
                    for(let i = 1; i < 5;i ++){
                        let  tiledMapAssetName = "mode/" + (StageDataMgr.CUR_MODE + 1) + "tmx" + (StageDataMgr.CUR_LEVEL + 1);
                        GameUtils.loadRes(tiledMapAssetName,cc.TiledMapAsset,false)
                    }

                    
                }


            GameMainMgr.curGameState = GameMainMgr.gameState.WIN;
            // let curStageNum = StageDataMgr.instance.getData(StageDataMgr.KEY_CUR_STAGE_NUM);
            let curStageNum = StageDataMgr.CUR_LEVEL;
            // let levelConfig:LevelConfig = GameConfig.LevelConfig["level_" + curStageNum].bullets

            StageDataMgr.instance.savePassStage(curStageNum,STAGE_STATE_STRUCT.UNLOCK,GameMainMgr.calcuStars(),StageDataMgr.CUR_MODE);
            
            
            StageDataMgr.instance.totalStage = 0;
            GameConfig.instance.saveScoreToService(StageDataMgr.instance.getBestStageNum());

            if(MainDataMgr.instance.getData(MainDataMgr.KEY_LOGIN_DAY) == (new Date().getMonth() + "月" +  new Date().getDate())){
                let mode = 0 + StageDataMgr.CUR_MODE;
                let level = 0 + StageDataMgr.CUR_LEVEL;
                let data = JSON.stringify({mode:mode, level:level,loginUpDay: new Date().getMonth() + "月" +  new Date().getDate()});
                GameUtils.buriedPoint(29,data);
            }

            curStageNum ++;


            if(StageDataMgr.CUR_MODE == MODE_TYPE_STRUCT.MODE1){
                if(curStageNum > GameConfig.instance.gameMeta.classicalModeLevelMeta.length){
                    curStageNum = GameConfig.instance.gameMeta.classicalModeLevelMeta.length;
                }
            }else if(StageDataMgr.CUR_MODE == MODE_TYPE_STRUCT.MODE2){
                if(curStageNum > GameConfig.instance.gameMeta.grenadeModeLevelMeta.length){
                    curStageNum = GameConfig.instance.gameMeta.grenadeModeLevelMeta.length;
                }
            }else if(StageDataMgr.CUR_MODE == MODE_TYPE_STRUCT.MODE3){
                if(curStageNum > GameConfig.instance.gameMeta.hostageModeLevelMeta.length){
                    curStageNum = GameConfig.instance.gameMeta.hostageModeLevelMeta.length;
                }
            }else if(StageDataMgr.CUR_MODE == MODE_TYPE_STRUCT.MODE4){
                if(curStageNum > GameConfig.instance.gameMeta.survivalModeLevelMeta.length){
                    curStageNum = GameConfig.instance.gameMeta.survivalModeLevelMeta.length;
                }
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



            //console.log("安全模式1:",policy,"data:",DeerSDK.instance.game_config,"当天金蛋次数:",StageDataMgr.instance.getData(StageDataMgr.KEY_GOLD_EGG_LIMIT))
            // if (policy == true) {
            if(false){
                let data: any = DeerSDK.instance.game_config;
                if (data != undefined && StageDataMgr.CUR_LEVEL % data.goldenEggInterval == 0 && data.goldenEggSwitch && StageDataMgr.instance.goldEggLimit < data.goldenEggLimit) {

                    this.scheduleOnce(() => {
                        // WXDevice.vibrateLong();
                        GameUtils.instance.loadSceneWithOperate("giftScene");
                    }, StageDataMgr.CUR_MODE == MODE_TYPE_STRUCT.MODE3 ? (StageDataMgr.CUR_LEVEL == 35 ? 3:1.6):1.1);
                }else{

                    var c = cc.instantiate(PrfabsManager.instance.prfabsAry.gameWinPanel);
                    this.scheduleOnce(() => {
                       // WXDevice.vibrateLong();
                       if(this.node){
                        this.node.addChild(c,0);
                       }else{
                           c.destroy();
                       }

                   }, StageDataMgr.CUR_MODE == MODE_TYPE_STRUCT.MODE3 ? (StageDataMgr.CUR_LEVEL == 35 ? 3:1.6):1.1);
                }
            }else{
                var c = cc.instantiate(PrfabsManager.instance.prfabsAry.gameWinPanel);

                this.scheduleOnce(() => {
                   // WXDevice.vibrateLong();
                   if(this.node){
                    this.node.addChild(c,0);
                   }else{
                       c.destroy();
                   }
               }, StageDataMgr.CUR_MODE == MODE_TYPE_STRUCT.MODE3 ? (StageDataMgr.CUR_LEVEL == 35 ? 3:1.6):1.1);
            }
        }
    }

    

    public bulletRemoveEvent(e:cc.Event.EventCustom):void{
        if(e){
            e.stopPropagation();
        }
        GameMainMgr.activeBulletCount --;
        console.log(GameMainMgr.totalBulletCount,GameMainMgr.activeBulletCount)
        if(GameMainMgr.totalBulletCount == 0 && GameMainMgr.activeBulletCount <= 0){
            console.log(GameMainMgr.activeBulletCount,'==子弹打完==');
            if(StageDataMgr.CUR_MODE == MODE_TYPE_STRUCT.MODE4){
                this.scheduleOnce(()=>{
                    this.showGameLostEvent(null);
                },1.9)
                
            }else{
                this.scheduleOnce(()=>{
                    this.showGameLostEvent(null);
                },1)
            }


        }
        
    }


    enemyDieEvent(e:cc.Event.EventCustom):void{
        if(e){
            e.stopPropagation();
        }
        GameMainMgr.enemy_count --;
        if(GameMainMgr.enemy_count == 0){
            if(StageDataMgr.CUR_MODE == MODE_TYPE_STRUCT.MODE3){
                if(StageDataMgr.CUR_LEVEL == 69){
                    this.scheduleOnce(()=>{
                        this.showGameWinEvent(null);
                    },3);
                }else{
                    this.scheduleOnce(()=>{
                        this.showGameWinEvent(null);
                    },1);
                }
                return;
            }else if(StageDataMgr.CUR_MODE == MODE_TYPE_STRUCT.MODE4){
                if(StageDataMgr.CUR_LEVEL == 56 || StageDataMgr.CUR_LEVEL == 65 || StageDataMgr.CUR_LEVEL == 67){
                    this.scheduleOnce(()=>{
                        this.showGameWinEvent(null);
                    },5);
                }else{
                    this.scheduleOnce(()=>{
                        this.showGameWinEvent(null);
                    },1.9);
                }
                return;
            }
            this.scheduleOnce(()=>{
                this.showGameWinEvent(null);
            })
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

    throwGrenade(e) {
        if(GameMainMgr.totalBulletCount < 1){
            AudioManager.instance.playSound("nobullet")
        }else{
            GameMainMgr.totalBulletCount--;
            GameMainMgr.activeBulletCount ++;
            this.TopContentComp.removeBulletItem();
            var t = this;
            this.hand.runAction(cc.sequence(cc.rotateBy(.1, 360), cc.callFunc(() => {
                var o = t.firedPositionNode.parent.convertToWorldSpaceAR(t.firedPositionNode.position);
                var n = cc.instantiate(PrfabsManager.instance.prfabsAry.grenade);
                n.position = t.node.convertToNodeSpaceAR(o);
                n.name = new Date().getTime().toString();
                cc.find("Canvas").addChild(n);
                t.grenadeControllerComp = n.getComponent(GrenadeController);
                var l = t.hand.getChildByName("dirNode");
                o = l.parent.convertToWorldSpaceAR(l.position).sub(o);
                var i = t.grenadeLine.parent.convertToWorldSpaceAR(t.grenadeLine.position);
                var r = Math.sqrt(e.sub(i).mag()) * 175;
                if(r < 1100){
                    r /= 2;
                }else if(r > 3500){
                    r *= 1.1;
                }else if(r > 5000){
                    r *= 1.55;
                }
                o = o.normalize().mul(r),
                t.grenadeControllerComp.grenadeBody.applyLinearImpulse(o, t.grenadeControllerComp.grenadeBody.getWorldCenter(), true);
                // console.log(e,r,o,t.grenadeControllerComp.grenadeBody.getWorldCenter(),"=======================")
            })));
        }
    }

    onDestroy() {
        cc.director.getPhysicsManager().enabled = false;
        cc.director.getCollisionManager().enabled = false;
        NodePoolMgr.instance.NodePoolclearUp(PrfabsManager.instance.prfabsAry.bullet.name);
    }


    // update (dt) {}
}
