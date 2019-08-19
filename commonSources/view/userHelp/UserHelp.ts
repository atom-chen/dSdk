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
export default class UserHelp extends cc.Component {
    @property(cc.Node)
    arrow:cc.Node = null;
    
    @property(cc.Node)
    crosshair:cc.Node = null;
    

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.active = StageDataMgr.SHOW_HELP_BTN;
    }
    start () {
        // if(StageDataMgr.CUR_LEVEL == 5 || StageDataMgr.CUR_LEVEL == 10 || StageDataMgr.CUR_LEVEL == 15){
        if(StageDataMgr.CUR_LEVEL == 5 || StageDataMgr.CUR_LEVEL == 10){

            this.arrow.runAction(cc.repeatForever(cc.sequence(cc.moveBy(0.3,cc.v2(-10,0)),cc.moveBy(0.6,cc.v2(20,0)),cc.moveBy(0.3,cc.v2(-10,0)))));
        }else{
            this.arrow.runAction(cc.repeatForever(cc.sequence(cc.moveBy(0.3,cc.v2(0,-10)),cc.moveBy(0.6,cc.v2(0,20)),cc.moveBy(0.3,cc.v2(0,-10)))));
        }
        this.crosshair.runAction(cc.repeatForever(cc.sequence(cc.fadeTo(0.6,10),cc.fadeTo(0.6,255))));
    }

    // update (dt) {}
}
