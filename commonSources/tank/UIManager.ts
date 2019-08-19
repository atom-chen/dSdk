import GameData from "./GameData";


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
export default class UIManager extends cc.Component {
    public static instance: null;

    @property(cc.Prefab)
    listPrefab:cc.Prefab[] = [];
    
    @property(cc.Node)
    listUI:cc.Node[] = [];

    start() {
        for (var n = 0; n < this.listPrefab.length; n++) this.listPrefab[n] && cc.log(this.listPrefab[n].name);
    }
    showUI(a) {
        if (e = this.hasUI(a)) return e.active = !0, e.parent = null, e.parent = this.node, 
        e;
        var e, t = this.getPrefabByName(a);
        return t ? ((e = cc.instantiate(t)).parent = this.node, e.active = !0, this.listUI.push(e), 
        e) : void cc.log("have not prefab: ", a);
    }
    hideUI(n) {
        for (var e = 0; e < this.listUI.length; e++) if (this.listUI[e].name == n) return void (this.listUI[e].active = !1);
    }
    hasUI(n) {
        for (var e = 0; e < this.listUI.length; e++) if (this.listUI[e].name == n) return this.listUI[e];
        return null;
    }
    getUI(n) {
        for (var e = 0; e < this.listUI.length; e++) if (this.listUI[e].name == n) return this.listUI[e];
        return null;
    }
    hideAll() {
        for (var n = 0; n < this.listUI.length; n++) this.listUI[n].active = !1;
    }
    getPrefabByName(n) {
        for (var e = 0; e < this.listPrefab.length; e++) if (this.listPrefab[e].name == n) return this.listPrefab[e];
        return null;
    }
    showTip(a, e) {
        var t = this.showUI("TipUI");
        t && t.getComponent("TipUI").setTip(a, e);
    }
    showTipOKCancel(o, e, t, n, i) {
        var r = this.showUI("TipUI");
        r && r.getComponent("TipUI").setTipOKCancel(o, e, t, n, i);
    }

}
