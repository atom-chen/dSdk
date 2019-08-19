import GameUtils from "../../GameUtils";
import SoundMgr from "../../SoundMgr";

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
export default class Player extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    @property(sp.Skeleton)
    man:sp.Skeleton = null;
    
    @property(sp.Skeleton)
    levelup:sp.Skeleton = null;

    start () {
        // console.log(this.man,this.levelup);

        this.node.runAction(cc.repeatForever(cc.sequence(cc.callFunc(() => {
            this.man.setAnimation(0,"idle" + Math.floor(Math.random() * 10),false);
        }),cc.delayTime(6))))
    }
    
    private skinID:string = null;
    public updateSkin(skinID:string):void{
        //TODO
        // console.log(skinID,"更新角色皮肤信息");

        this.man.setSkin(skinID);
        if(this.skinID != null){
            this.levelup.node.active = true;
            this.levelup.setAnimation(0,"idle",false);
            SoundMgr.instance.playSound("sounds/levelUp",false);
        }

        this.skinID = skinID;
        // this.updateLocalSkin("right_hand");
        this.updateLocalSkin(skinID);
    }


    private updateLocalSkin(name:string):void{
        // GameUtils.loadRes("textures/player/" + name,cc.SpriteFrame,false,(spfm) => {
        //     this.node.getComponent(cc.Sprite).spriteFrame = spfm;
        //     this.man.setAnimation(0,"idle" + (Number(name.slice(8)) -1),true);

        // })


    }



    // update (dt) {}
}
