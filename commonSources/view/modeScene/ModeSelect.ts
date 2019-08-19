import GameUtils from "../../GameUtils";
import StageDataMgr from "../../module/data/StageDataMgr";
import ModeSelectItem from "./ModeSelectItem";
import SoundMgr from "../../SoundMgr";
import GameConfig from "../stageMode/GameConfig";
import DeerSDK from "../../gamecore/deer/DeerSDK";
import WXScreenAdMgr from "../../control/WXScreenAdMgr";

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
export default class ModeSelect extends cc.Component {

    @property(cc.Label)
    txtTotalStars: cc.Label = null;

    @property(cc.Node)
    content:cc.Node = null;

    @property(cc.Node)
    item:cc.Node = null;
    
    @property(cc.Node)
    moreMode:cc.Node = null;
    
    

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.txtTotalStars.string = StageDataMgr.instance.getAllModeStars() + "";

        // for(let i = 1;i < 3;i ++){
        //     let node = cc.instantiate(this.item);
        //     this.content.addChild(node);
        //     node.getComponent(ModeSelectItem).init(i);
        // }
        this.item.getComponent(ModeSelectItem).init(0);

        let imgid = GameConfig.instance.getCurRoleSKinInfo().imageId;
        GameUtils.loadRes("textures/player/" + imgid,cc.SpriteFrame,false,(spfm) => {
            try{
                this.item.getChildByName("self").getComponent(cc.Sprite).spriteFrame = spfm;
            }catch{
                spfm = null;
            }
        })

        this.moreMode.parent = this.content;
        
        for(let i = 1; i < this.content.childrenCount - 1;i ++){
            if(!DeerSDK.instance.isOnline){
                this.content.children[i].active = false;
            }
            // else{
            //     this.content.children[i].getComponent(ModeSelectItem).init(i);
            // }
        }

        this.content.children[1].getComponent(ModeSelectItem).init(2);
        this.content.children[2].getComponent(ModeSelectItem).init(1);
        this.content.children[3].getComponent(ModeSelectItem).init(3);
        
        cc.director.preloadScene("modeListScene");
    }

    private backMainSceneClickEvent(e:cc.Event):void{
        SoundMgr.instance.playTapSound();
        GameUtils.instance.loadSceneWithOperate("mainScene");
        // console.log("微信插屏广告");
        WXScreenAdMgr.instance.showRandAd();
    }

    // update (dt) {}
}
