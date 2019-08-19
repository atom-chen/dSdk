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
 * Comp_List节点渲染器
 */
@ccclass
export default class Comp_ListRenderer extends cc.Component {
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    //激活区域。在该区域外，节点回收
    activedRect:cc.Rect;

    start () {
    }

    // update (dt) {}


    //在list中的索引，从0开始。
    public index:number = -1;


    /**
     * 渲染数据
     */
    protected _data:any;

    /**
     * 渲染数据
     */
    public set data(value:any) {
        if (this._data == value) return;
        this._data = value;

        this.refreshUI();
    }


    public get data() {
        return this._data;
    }


    /**
     * 根据渲染数据刷新UI
     */
    protected refreshUI():void {

    }
}
