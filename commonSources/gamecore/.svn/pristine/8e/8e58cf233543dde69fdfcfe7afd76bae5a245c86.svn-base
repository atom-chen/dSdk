import GameManager from "../managers/GameManager";
import GameValues, { PlatformName } from "../base/GameValues";

// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

/**
 * 平台节点
 */
@ccclass
export default class Comp_PlatformContent extends cc.Component {

    @property({
        type:[cc.Node],
        displayName:"微信内容"
    })
    weiXinNodes:Array<cc.Node> = []

    @property({
        type:[cc.Node],
        displayName:"今日头条内容"
    })
    touTiaoNodes:Array<cc.Node> = []

    onLoad () {
        this.weiXinNodes.forEach( (ele:cc.Node) => {
            if (ele) ele.active = (GameValues.currentPlatform == PlatformName.WECHAT);
        })
        
        this.touTiaoNodes.forEach( (ele:cc.Node) => {
            if (ele) ele.active = (GameValues.currentPlatform == PlatformName.TOUTIAO);
        })
    }

    start () {

    }

    // update (dt) {}
}
