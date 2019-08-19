import GameData from "./GameData";
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
export default class LevelListUI extends cc.Component {
    public static instance = null;

    @property(cc.ScrollView)
    scrollView:cc.ScrollView = null;
    
    @property(cc.Node)
    scrollContentNode:cc.Node = null;

    @property(cc.Prefab)
    levelItem:cc.Prefab = null;

    test:number = 11;

    @property(cc.Toggle)
    items:cc.Toggle[] = [];

    curSelectLevel:number = 0;

    @property(cc.Label)
    hisScore:cc.Label = null;

    @property(cc.Node)
    stars:cc.Node[] = [];

    @property(cc.Node)
    itemList:cc.Node[] = [];


    dataArr = null
    onLoad() {}
    start() {}
    onEnable() {
        this.refreshItems();
    }
    onDisable() {}
    refreshItems() {
        var s = 0;
        0 == GameData.instance.m_curMapType ? (this.dataArr = TankDataMgr.instance.levelData, s = TankDataMgr.instance.curMaxLevel) :
         1 == GameData.instance.m_curMapType ? (this.dataArr = TankDataMgr.instance.levelDataXueDi, 
        s = TankDataMgr.instance.curMaxLevelXueDi) : 2 == GameData.instance.m_curMapType && (this.dataArr = TankDataMgr.instance.levelDataGongChang, 
        s = TankDataMgr.instance.curMaxLevelGongChang), 0 == this.dataArr.length && (0 == GameData.instance.m_curMapType ?
             (TankDataMgr.instance.initLevelData(), 
        this.dataArr = TankDataMgr.instance.levelData, s = TankDataMgr.instance.curMaxLevel) : 1 == GameData.instance.m_curMapType ?
         (TankDataMgr.instance.initLevelDataXueDi(), 
        this.dataArr = TankDataMgr.instance.levelDataXueDi, s = TankDataMgr.instance.curMaxLevelXueDi) : 2 == GameData.instance.m_curMapType &&
         (TankDataMgr.instance.initLevelDataGongChang(), 
        this.dataArr = TankDataMgr.instance.levelDataGongChang, s = TankDataMgr.instance.curMaxLevelGongChang));
        for (var e, a = this.dataArr.length, t = 0; t < a; t++) {
            e = this.getItemByIdx(t), e || ((e = cc.instantiate(this.levelItem)).parent = this.scrollContentNode, 
            e.active = !0, this.itemList.push(e)), e.x = 0;
            var n = e.getComponent(cc.Toggle);
            n.isChecked = !1;
            var c = this.dataArr[t], o = e.getComponent("LevelItem");
            o.levelListUI = this, o.refresh(c), this.items.push(n);
        }
        this.scrollContentNode.height = 80 * a, this.curSelectLevel = s;
        var r = this.items[s];
        r.isChecked = !0;
        var p = this.dataArr[this.curSelectLevel];
        this.refreshScore(p);
        var g = r.getComponent("LevelItem");
        g && g.unlock();
        var d = 90 * s;
        if (d <= this.scrollView.node.height / 2) {} else {
            var y = d - this.scrollView.node.height / 2;
            this.scrollView.scrollToOffset(cc.v2(0, y), 3);
        }
    }
    onClickPlayBtn() {
        console.log("this.dataArr",this.dataArr)
        // for(let i = 0;i < this.dataArr.length;i ++){
        //     this.dataArr[i].unLocked = true;
        // }
        if (true != this.dataArr[this.curSelectLevel].unLocked) {
            var n = 0;
            if(0 == GameData.instance.m_curMapType){
                n = TankDataMgr.instance.curMaxLevel;
            }else if( 1 == GameData.instance.m_curMapType){
                n = TankDataMgr.instance.curMaxLevelXueDi
            }else if( 2 == GameData.instance.m_curMapType){
                n = TankDataMgr.instance.curMaxLevelGongChang
            }
            if(this.curSelectLevel != n){
                console.log("当前关卡未解锁");
                return;
            }
        }
        GameData.instance.m_curLevel = this.curSelectLevel,
        cc.director.loadScene("map");

    }
    select(n) {
        if (!(0 > n || n >= this.items.length) && (this.unCheckAll(), this.items[n].isChecked = !0, 
        this.curSelectLevel = n, 0 <= n && n < this.dataArr.length)) {
            var e = this.dataArr[n];
            this.refreshScore(e);
        }
    }
    refreshScore(n) {
        this.hisScore.string = "历史高分：0";
        for (var e = 0; e < this.stars.length; e++) this.stars[e].active = !1;
        if (n && (this.hisScore.string = "历史高分：" + n.score, n.unLocked)) for (e = 0; e < n.star; e++) this.stars[e].active = !0;
    }
    unCheckAll() {
        for (var n = 0; n < this.items.length; n++) this.items[n].isChecked = !1;
    }
    clickBackBtn() {
        this.node.active = !1;
    }
    getItemByIdx(n) {
        return 0 > n || n >= this.itemList.length ? null : this.itemList[n];
    }
}
