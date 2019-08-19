
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
export default class Bullet_pao_target extends cc.Component {




    start() {
        this.actBig();
    }
    actBig() {
        var n = cc.scaleTo(.5, 1.1, 1.1), e = cc.sequence(n, cc.callFunc(function() {
            this.actSmall();
        }.bind(this)));
        this.node.runAction(e);
    }
    actSmall() {
        var n = cc.scaleTo(.5, .9, .9), e = cc.sequence(n, cc.callFunc(function() {
            this.actBig();
        }.bind(this)));
        this.node.runAction(e);
    }
}
