import GameUtils from "../../GameUtils";
import GameConfig from "./GameConfig";

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
export default class PrfabsManager{
    public prfabsAry = {
        "bullet" : null,
        "GameContinue" : null,
        "Blood_2" : null,
        "gameWinPanel" : null,
        "topContent" : null,
        "topContent2":null,
        "BoxBoomEffectNode" : null,
        "TNTEffectNode" : null,
        "grenade" : null,
        "hpContent":null,
        "hpTipNode": null,
        "adNode":null,
        "showHelpTip":null,
    };

    private bgArrLength = 14;
    public bgArr = {
        "bg_1001" : null,
        "bg_1002" : null,
        "bg_1003" : null,
        "bg_1004" : null,
        "bg_1005" : null,
        "bg_1006" : null,
        "bg_1007" : null,
        "bg_1008" : null,
        "bg_1009" : null,
        "bg_1010" : null,
        "bg_1011" : null,
        "bg_1012" : null,
        "bg_1013" : null,
        "bg_1014" : null,
        // "bg_1015" : null,
    }

    private static _instance: PrfabsManager = null;
    //====================单例=============================================================
    public static get instance(): PrfabsManager {
      if (!PrfabsManager._instance) PrfabsManager._instance = new PrfabsManager();
  
      return PrfabsManager._instance;
    }
    
    public allResLoaded:boolean = false;
    public create_all_prfabs = function(callbackFunc:Function) {
        if(this.allResLoaded){
            return;
        }
        let resArr = [
            "bullet",
            "GameContinue",
            "Blood_2",
            "gameWinPanel",
            "topContent",
            "topContent2",
            "BoxBoomEffectNode",
            "TNTEffectNode",
            "grenade",
            "hpContent",
            "hpTipNode",
            "adNode",
            "showHelpTip"
        ]
        let resIndex:number = 0;


        let reload = setTimeout(() => {
            console.log(PrfabsManager.instance.allResLoaded,"create_all_prfabs进度")
            if(!PrfabsManager.instance.allResLoaded){
                PrfabsManager.instance.create_all_prfabs(null);
            }
        }, 8000);

        let checkResFinsish = () =>{
            if(resIndex == resArr.length){
                PrfabsManager.instance.allResLoaded = true;
                if(reload){
                    clearTimeout(reload);
                }
                if(callbackFunc){
                    callbackFunc();
                    
                }
            }
        }

        for(let i = 0; i < resArr.length;i ++){
            GameUtils.loadRes("prefabs/stage/" + resArr[i],cc.Prefab,false,(pfb) => {
                this.prfabsAry[resArr[i]] = pfb;
                resIndex ++;
                checkResFinsish();
            })
        }


        
        for(let i = 0; i < this.bgArrLength;i ++){
            let name = "bg_10";
            if(i < 9){
                name = name + "0" + (i + 1); 
            }else{
                name = name + (i + 1); 

            }

            GameUtils.loadRes("textures/hall/bg/" + name,cc.SpriteFrame,false,(spfm) => {
                if(i < 9){
                    this.bgArr["bg_100" + (i + 1)] = spfm;
                }else{
                    this.bgArr["bg_10" + (i + 1)] = spfm;
                }

            })
        }
    }

    public heroSKin = {
        right_hand:null,
        body:null,
        left_foot:null,
        right_foot:null,
        head:null,
        left_hand:null,
    };


    public Role_Left_Black = {

    }

    public Role_Right_Black = {
    }
    

    public static loadSkinOK:boolean = false;


    public loadHeroSkin(){
        PrfabsManager.loadSkinOK = false;
        let index = 0;

        let checkOK = () => {
            index ++;
            if(index == 8){
                PrfabsManager.loadSkinOK = true;
            }
        }
        let imgid = GameConfig.instance.getCurRoleSKinInfo().imageId;
        GameUtils.loadRes("textures/players/" + imgid + "/right_hand",cc.SpriteFrame,false,(spfm) =>{
            PrfabsManager.instance.heroSKin.right_hand = spfm;
            checkOK();
        })
        GameUtils.loadRes("textures/players/" + imgid + "/body",cc.SpriteFrame,false,(spfm) =>{
            PrfabsManager.instance.heroSKin.body = spfm;
            checkOK()
        })

        GameUtils.loadRes("textures/players/" + imgid + "/left_foot",cc.SpriteFrame,false,(spfm) =>{
            PrfabsManager.instance.heroSKin.left_foot = spfm;
            checkOK()
        })

        GameUtils.loadRes("textures/players/" + imgid + "/right_foot",cc.SpriteFrame,false,(spfm) =>{
            PrfabsManager.instance.heroSKin.right_foot = spfm;
            checkOK()
        })
        GameUtils.loadRes("textures/players/" + imgid + "/head",cc.SpriteFrame,false,(spfm) =>{
            PrfabsManager.instance.heroSKin.head = spfm;
            checkOK()
        })
        GameUtils.loadRes("textures/players/" + imgid + "/left_hand",cc.SpriteFrame,false,(spfm) =>{
            PrfabsManager.instance.heroSKin.left_hand = spfm;
            checkOK();
        })
        cc.loader.loadResDir("textures/players/enemy1",cc.SpriteFrame,(err,spfmArr) => {
            for(let i = 0;i < spfmArr.length;i ++){
                PrfabsManager.instance.Role_Left_Black[spfmArr[i].name] = spfmArr[i];
            }
            checkOK();
        })

        cc.loader.loadResDir("textures/players/enemy1_right",cc.SpriteFrame,(err,spfmArr) => {
            for(let i = 0;i < spfmArr.length;i ++){
                PrfabsManager.instance.Role_Right_Black[spfmArr[i].name] = spfmArr[i];
            }
            checkOK();
        })
    }

    public loadEnemySkin(){
       
    }

}
