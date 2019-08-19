
import TankDataMgr from "./TankDataMgr";

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
export default class HisDataUI extends cc.Component {
    @property(cc.Label)
    info:cc.Label = null;


    onEnable() {
        this.refresh();
    }
    refresh() {
        var e = parseInt("" + TankDataMgr.instance.totalGameTime / 60);
        0 == e && 0 < TankDataMgr.instance.totalGameTime && (e = 1), this.info.string = "积分：" + TankDataMgr.instance.totalScore +
         "\n击败：" + TankDataMgr.instance.totalKillNum + "\n游戏时间：" + e + "分钟\n";
    }

}
