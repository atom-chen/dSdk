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
export default class Guide extends cc.Component {


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    @property(cc.SpriteFrame)
    guideSpfmArr:cc.SpriteFrame[] = [];

    @property(cc.Sprite)
    guide:cc.Sprite = null;
    
    
    start () {
        SoundMgr.instance.playTapSound();
        this.node.on(cc.Node.EventType.TOUCH_END,()=>{
            this.node.destroy();
        },this)
    }

    // update (dt) {}
}
