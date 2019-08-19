
import LevelListUI from "./LevelListUI";

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
export default class LevelItem extends cc.Component {


    @property(cc.Label)
    levelLabel:cc.Label = null;
    
    @property(cc.Toggle)
    toggle:cc.Toggle = null;

    @property(LevelListUI)
    levelListUI:LevelListUI = null;

    @property(cc.Sprite)
    lockImg:cc.Sprite = null;

    level:number = 0
    levelStar:number = 0
    levelOpened:boolean = !1
    levelPassed:boolean = !1
    levelScore:number = 0
    start() {
        this.toggle = this.node.getComponent(cc.Toggle), this.levelLabel.string = "关卡 " + (this.level + 1);
    }
    onChange() {
        this.levelListUI.select(this.level);
    }
    refresh(n) {
        this.level = n.level, this.levelStar = 0, this.levelOpened = 0 != n.unLocked, this.levelScore = n.score, 
        this.lockImg.node.active = !this.levelOpened;
    }
    unlock() {
        this.lockImg.node.active = !1;
    }
}
