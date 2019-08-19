import { ImageUpgradeMeta, IImageUpgradeMeta } from "../../module/meta/pbcus";
import MainDataMgr, { RoleSKinInfo } from "../../module/data/MainDataMgr";
import RoleSelect from "./RoleSelect";
import GameUtils from "../../GameUtils";
import WXUtils from "../../gamecore/wechat/WXUtils";
import SoundMgr from "../../SoundMgr";
import Role from "./Role";
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
export default class RoleSelectItem extends cc.Component {

    @property(cc.Label)
    txtName: cc.Label = null;

    @property(cc.Node)
    btn:cc.Node = null;
    
    @property(cc.Sprite)
    head:cc.Sprite = null;
    

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    private roleSkinInfo:RoleSKinInfo = null;
    private finalStage:number = null;
    public updateInfo(arg1:RoleSKinInfo,arg2:IImageUpgradeMeta):void{
        // this.txtName.string = arg2.name;
        this.updateBtnState(arg1,arg2);
    }

    public updateBtnState(arg1:RoleSKinInfo,arg2:IImageUpgradeMeta):void{
        this.roleSkinInfo = arg1;
        if(arg1){
            GameUtils.loadRes("textures/heroHead/" + arg2.imageId,cc.SpriteFrame,true,(spfm) => {
                try{
                    this.head.node.scale = 1;
                    this.head.spriteFrame = spfm;
                }catch{
                    
                }
                
            })
            this.btn.getComponent(cc.Sprite).spriteFrame = RoleSelect.btnSpfmArr[arg1.state];
            //TODO
            if(this.roleSkinInfo.state == 0){
                this.btn.getChildByName("txt").getComponent(cc.Label).string = "可解锁";
            }else{
                this.btn.getChildByName("txt").getComponent(cc.Label).string = "已拥有";
            }
            this.txtName.string = arg2.name;

        }else{
            GameUtils.loadRes("textures/heroHead/role_xxx",cc.SpriteFrame,true,(spfm) => {
                try{
                    this.head.node.scale = 379 / 93;
                    this.head.spriteFrame = spfm;
                }catch{
                    
                }
                
            })
            this.btn.getComponent(cc.Sprite).spriteFrame = RoleSelect.btnSpfmArr[2];
            this.btn.getChildByName("txt").getComponent(cc.Label).string = "获得" + arg2.starsNum + "星";
            this.txtName.string = "???";
            this.finalStage = arg2.starsNum;
        }
    }


    private onClickEvent():void{
        SoundMgr.instance.playTapSound(); 
        if(this.roleSkinInfo == null){
            WXUtils.showToast("累计获得"  + this.finalStage + "星解锁");
            return;
        }
        if(this.roleSkinInfo.state == 0){
            this.roleSkinInfo.state = 1;
            // this.roleSkinInfo.equip = true;

            let data:Array<RoleSKinInfo> = MainDataMgr.instance.getData(MainDataMgr.KEY_ROLE_SKIN_ARR);
            // let roleSkinInfo:RoleSKinInfo = null;
            for(let i = 0;i < data.length;i ++){
                data[i].state = 1;
                if(data[i].equip == true){
                    data[i].equip = false;
                }else if( data[i].id == this.roleSkinInfo.id){
                    data[i].equip = true;
                    break;
                }
            }
            MainDataMgr.instance.setData(MainDataMgr.KEY_ROLE_SKIN_ARR,data);
            WXUtils.showToast("恭喜解锁新形象，已为您自动替换该形象");
            let event = new cc.Event.EventCustom(Role.UPDATE_ROLE_SKIN_EVENT,true);
            this.node.dispatchEvent(event);

            let event1 = new cc.Event.EventCustom(RoleSelect.STATE_CHANGE_EVENT,true);
            this.node.dispatchEvent(event1);

        }else {

            let data:Array<RoleSKinInfo> = MainDataMgr.instance.getData(MainDataMgr.KEY_ROLE_SKIN_ARR);
            // let roleSkinInfo:RoleSKinInfo = null;
            for(let i = 0;i < data.length;i ++){
                data[i].state = 1;
                if(data[i].equip == true){
                    data[i].equip = false;
                }else if( data[i].id == this.roleSkinInfo.id){
                    data[i].equip = true;
                }
            }
            MainDataMgr.instance.setData(MainDataMgr.KEY_ROLE_SKIN_ARR,data);
            WXUtils.showToast("已为您替换该形象");
            let event = new cc.Event.EventCustom(Role.UPDATE_ROLE_SKIN_EVENT,true);
            this.node.dispatchEvent(event);

            let event1 = new cc.Event.EventCustom(RoleSelect.STATE_CHANGE_EVENT,true);
            this.node.dispatchEvent(event1);
            
            PrfabsManager.instance.loadHeroSkin();

        }
    }

    // update (dt) {}
}
