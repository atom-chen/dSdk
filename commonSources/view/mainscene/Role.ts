import StageDataMgr from "../../module/data/StageDataMgr";
import GameConfig, { MODE_TYPE_STRUCT } from "../stageMode/GameConfig";
import MainDataMgr, { RoleSKinInfo } from "../../module/data/MainDataMgr";
import WXUtils from "../../gamecore/wechat/WXUtils";
import GameManager from "../../gamecore/managers/GameManager";
import MainScene from "./MainScene";
import { IImageUpgradeMeta } from "../../module/meta/pbcus";
import GameUtils from "../../GameUtils";
import RoleMgr from "./RoleMgr";
import Player from "./Player";
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
export default class Role extends cc.Component {
    public static UPDATE_ROLE_SKIN_EVENT:string = "updateRoleSkinEvent";

    @property(cc.Label)
    txtUnlockLevel:cc.Label = null;

    @property(cc.Node)
    startGameBtn:cc.Node = null;

    @property(cc.SpriteFrame)
    spfmArr:cc.SpriteFrame[] = [];
    @property(cc.Label)
    roleTitle:cc.Label = null;

    @property(cc.Sprite)
    bg:cc.Sprite = null;

    @property(cc.Sprite)
    bottomBg:cc.Sprite = null;
    
    
    @property(Player)
    playerComp:Player = null;

    @property(cc.Node)
    redPot:cc.Node = null;
    @property(cc.Node)
    lockNode:cc.Node = null;
    
    
    
    

    // @property(MainBg)
    // mainBgComp:MainBg = null;
    
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on(Role.UPDATE_ROLE_SKIN_EVENT,this.updateRoleSkinInfo,this);
        this.startGameBtn.on(cc.Node.EventType.TOUCH_END,(e) =>{
            if(this.needRoleUpdate == true){
                PrfabsManager.loadSkinOK = false;
                let data:Array<RoleSKinInfo> = MainDataMgr.instance.getData(MainDataMgr.KEY_ROLE_SKIN_ARR);
                // let roleSkinInfo:RoleSKinInfo = null;
                let find:number = -1;
                for(let i = 0;i < data.length;i ++){
                    if(data[i].state != 1 && find == -1){
                        find = i;
                        data[i].state = 1;
                    }
                    if(data[i].equip == true){
                        data[i].equip = false;
                    }
                }
                if(find != -1){
                    data[find].equip = true;
                    MainDataMgr.instance.setData(MainDataMgr.KEY_ROLE_SKIN_ARR,data);
                    WXUtils.showToast("恭喜解锁新形象，已为您自动替换该形象");
                    GameUtils.buriedPoint(16);
                    let event = new cc.Event.EventCustom(Role.UPDATE_ROLE_SKIN_EVENT,true);
                    this.node.dispatchEvent(event);
                    this.checkNeedUpdate(RoleMgr.calcuRoleData());
                    if(!PrfabsManager.loadSkinOK){
                        PrfabsManager.instance.loadHeroSkin();
                        return;
                    }

                }else{
                    this.onStartGameClickEvent(e);
                }
            }else{
                this.onStartGameClickEvent(e);
            }
        },this);
    }

    private needRoleUpdate:boolean = false;

    public onStartGameClickEvent(e:cc.Event) {
        GameManager.soundsManager.playTapSound();
        this.onStartGame();
      }

    private locked:boolean = false; 
    private onStartGame(){
        GameUtils.buriedPoint(15);
        if(!PrfabsManager.loadSkinOK){
            PrfabsManager.instance.loadHeroSkin();
            GameUtils.showToast("加载皮肤中");
            return;
        }
        if(MainDataMgr.instance.newPlayer == true){
            StageDataMgr.CUR_MODE = MODE_TYPE_STRUCT.MODE1;
            StageDataMgr.CUR_LEVEL = 1;
            if(this.locked){
                GameUtils.showToast("关卡正在加载中");
            }else{
                this.locked = true;
                //TAG_减体力
                StageDataMgr.NEED_SUB_HP = true;
                // StageDataMgr.instance.setData(StageDataMgr.KEY_USER_HP_NUM,StageDataMgr.instance.getData(StageDataMgr.KEY_USER_HP_NUM) - 1);
            }
            if(!PrfabsManager.instance.allResLoaded){
                GameUtils.showToast("资源正在加载中");
                return;
            }
            GameUtils.instance.loadSceneWithOperate("map");
            MainDataMgr.instance.setData(MainDataMgr.KEY_NEW_PLAYER,false);
        }else{
            if(!PrfabsManager.instance.allResLoaded){
                GameUtils.showToast("资源正在加载中");
                return;
            }
            if(MainDataMgr.instance.getData(MainDataMgr.KEY_LOGIN_DAY) == (new Date().getMonth() + "月" +  new Date().getDate())){
                let curHpNum:number = StageDataMgr.instance.getData(StageDataMgr.KEY_USER_HP_NUM);
                if(curHpNum <= 0 && !StageDataMgr.instance.judgeIsFreeStage(StageDataMgr.CUR_MODE,StageDataMgr.CUR_LEVEL)){
                    GameUtils.instance.openKeyGiftEvent(cc.find("Canvas/leftnode/hpContent"), 1001);
                    return;
                }
                console.log("是当天新玩家");
                StageDataMgr.CUR_MODE = MODE_TYPE_STRUCT.MODE1;
                StageDataMgr.CUR_LEVEL = StageDataMgr.instance.getHighestStageByMode(MODE_TYPE_STRUCT.MODE1);
                console.log(StageDataMgr.CUR_LEVEL,"当前最高关卡");
                if(this.locked){
                    GameUtils.showToast("关卡正在加载中");
                }else{
                    this.locked = true;
                    StageDataMgr.NEED_SUB_HP = true;
                }
                if(!PrfabsManager.instance.allResLoaded){
                    GameUtils.showToast("资源正在加载中");
                    return;
                }
                GameUtils.instance.loadSceneWithOperate("map");
            }else{
                GameUtils.instance.loadSceneWithOperate("modeSelectScene");
            }
            MainDataMgr.instance.setData(MainDataMgr.KEY_NEW_PLAYER,false);
        }
    }

    start () {
         // let bestStageNum = StageDataMgr.instance.getData(StageDataMgr.KEY_BEST_STAGE_NUM);

         let totalStars = StageDataMgr.instance.getAllModeStars();

         let targetStageNum:number = 0;
         for(let i = 0;i < GameConfig.instance.gameMeta.imageUpgradeMeta.length; i ++){
             if(totalStars < GameConfig.instance.gameMeta.imageUpgradeMeta[i].starsNum){
                 targetStageNum = GameConfig.instance.gameMeta.imageUpgradeMeta[i].starsNum;
                 break;
             }
         }
         if(targetStageNum == 0){
             this.txtUnlockLevel.node.parent.active = false;
         }else{
             this.txtUnlockLevel.string = (targetStageNum - totalStars) + "";
         }
         this.updateRoleSkinInfo();

         // console.log(arr,'aaaaaaaaaaaa')

    }

    private checkNeedUpdate(arr:Array<RoleSKinInfo>):void{
        for(let i = 1;i < arr.length;i ++){
            if(arr[i].state == 0){
                this.needRoleUpdate = true;
                this.startGameBtn.getComponent(cc.Sprite).spriteFrame = this.spfmArr[1];
                this.redPot.active = true;
                // this.startGameBtn.getChildByName("lock").active = false;
                this.lockNode.active = false;
                this.startGameBtn.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(0.5,1.2),cc.scaleTo(0.5,1))));
                return;
            }
        }
        this.needRoleUpdate = false;
        // this.startGameBtn.getChildByName("lock").active = true;
        this.lockNode.active = true;
        this.startGameBtn.stopAllActions();
        this.startGameBtn.scale = 1;
        this.startGameBtn.getComponent(cc.Sprite).spriteFrame = this.spfmArr[0];
        this.redPot.active = false;
    }


    public updateRoleSkinInfo():void{
        let arr:Array<RoleSKinInfo> = RoleMgr.calcuRoleData();
        this.checkNeedUpdate(arr);


        /**当前皮肤和主页背景图信息 */
        let curRoleSkinInfo:IImageUpgradeMeta = GameConfig.instance.getCurRoleSKinInfo();

        // GameUtils.loadRes("textures/roleTitle/" + curRoleSkinInfo.imageId,cc.SpriteFrame,false,(spfm) => {
        //     try{
        //         this.roleTitle.spriteFrame = spfm;
        //     }catch{
                
        //     }
        // })

        this.roleTitle.string = curRoleSkinInfo.name;

        // this.mainBgComp.updateBg(curRoleSkinInfo.backgroundId);
        let id:number = Number(curRoleSkinInfo.backgroundId.slice(curRoleSkinInfo.backgroundId.indexOf("_") + 1));
        if(id > 1010){
            id = 1010;
        }
        GameUtils.loadRes("textures/background/bg_" + id,cc.SpriteFrame,false,(spfm) => {
            try{
                this.bg.spriteFrame = spfm;
            }catch{
                spfm = null;
            }
        })

        GameUtils.loadRes("textures/background/bg_" + id + "_bottom",cc.SpriteFrame,false,(spfm) => {
            try{
                this.bottomBg.spriteFrame = spfm;
            }catch{
                spfm = null;
            }
        })
        this.playerComp.updateSkin(curRoleSkinInfo.imageId);

        // this.node.getComponent(MainScene).updateHeroInfo(null);
    }

}
