import BasePanelComp from "../base/BasePanelComp";
import { RoleSKinInfo } from "../../module/data/MainDataMgr";
import RoleSelectItem from "./RoleSelectItem";
import GameConfig from "../stageMode/GameConfig";
import GameManager from "../../gamecore/managers/GameManager";
import RoleMgr from "./RoleMgr";
import GameUtils from "../../GameUtils";
import StageDataMgr from "../../module/data/StageDataMgr";

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
export default class RoleSelect extends BasePanelComp {
    public static STATE_CHANGE_EVENT :string =  "stateChangeEvent";

    public static btnSpfmArr :cc.SpriteFrame[] = [];

    @property(cc.SpriteFrame)
    btnSpfmArr:cc.SpriteFrame[] = [];
    

    @property(cc.Node)
    item:cc.Node = null;
    
    @property(cc.Node)
    content:cc.Node = null;

    @property(cc.Label)
    txtTotalStars: cc.Label = null;

    


    onLoad(){
        RoleSelect.btnSpfmArr = this.btnSpfmArr;
        this.updateInfo();
        this.node.on(RoleSelect.STATE_CHANGE_EVENT,this.onStateChangedEvent,this);
    }


    start () {
        this.init();
        GameUtils.buriedPoint(12);
        this.txtTotalStars.string = StageDataMgr.instance.getAllModeStars() + "";

    }


    private updateInfo():void{
        let arr:Array<RoleSKinInfo> = RoleMgr.calcuRoleData();

        this.item.getComponent(RoleSelectItem).updateInfo(arr[0], GameConfig.instance.gameMeta.imageUpgradeMeta[0]);

        let i = 1;

        this.schedule(()=>{
            if(this.content){
                let item = cc.instantiate(this.item);
                this.content.addChild(item);
               item.getComponent(RoleSelectItem).updateInfo(arr[i] ? arr[i] : null, GameConfig.instance.gameMeta.imageUpgradeMeta[i]);
               i ++;
            }else{
            }
        },0.1,GameConfig.instance.gameMeta.imageUpgradeMeta.length -2)
    }


    private onStateChangedEvent():void{
        let arr:Array<RoleSKinInfo> = RoleMgr.calcuRoleData();

        for(let i = 1;i < this.content.childrenCount;i ++){
            this.content.children[i].getComponent(RoleSelectItem).updateBtnState(arr[i],GameConfig.instance.gameMeta.imageUpgradeMeta[i]);
        }
    }

    private onCloseClickEvent(e:cc.Event):void{
        // GameManager.soundsManager.playTapSound();
        this.close();
    }

    // update (dt) {}
}
