import GameData from "./GameData";
import UIManager from "./UIManager";


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
    
    curMapType:number = 0;

    @property(cc.Label)
    curSelectType:cc.Label = null;

  
    @property(cc.Toggle)
    caoDiToggle:cc.Toggle = null;

    @property(cc.Toggle)
    xueDiToggle:cc.Toggle = null;

    @property(cc.Toggle)
    gongChangToggle:cc.Toggle = null;

    uiMgr:UIManager = null;

    start() {
        var n = cc.find("Canvas");
        this.uiMgr = n.getComponent(UIManager);
    }
    onEnable() {
        this.refresh();
    }
    // refresh() {
    //     var n;
    //     (this.xueDiToggle.interactable = !1, this.xueDiToggle.isChecked = !1, this.gongChangToggle.interactable = !1, 
    //     this.gongChangToggle.isChecked = !1, this.caoDiToggle.isChecked = !0, a.instance.m_curMapType = 0, 
    //     this.curMapType = 0, this.curSelectType.string = "当前选择：草地", t.instance.isOpenXueDi()) && (this.xueDiToggle.interactable = !0, 
    //     this.gongChangToggle.isChecked = !1, this.caoDiToggle.isChecked = !1, this.xueDiToggle.isChecked = !0, 
    //     (n = this.xueDiToggle.node.getChildByName("lock")) && (n.active = !1), a.instance.m_curMapType = 1, 
    //     this.curMapType = 1, this.curSelectType.string = "当前选择：雪地"), t.instance.isOpenGongChang() && (this.gongChangToggle.interactable = !0, 
    //     this.xueDiToggle.isChecked = !1, this.caoDiToggle.isChecked = !1, this.gongChangToggle.isChecked = !0, 
    //     (n = this.gongChangToggle.node.getChildByName("lock")) && (n.active = !1), a.instance.m_curMapType = 2, 
    //     this.curMapType = 2, this.curSelectType.string = "当前选择：工厂");
    // }

    refresh() {
        var n;
        (this.xueDiToggle.interactable = !1, this.xueDiToggle.isChecked = !1, this.gongChangToggle.interactable = !1, 
        this.gongChangToggle.isChecked = !1, this.caoDiToggle.isChecked = !0, GameData.instance.m_curMapType = 0, 
        this.curMapType = 0, this.curSelectType.string = "当前选择：草地", true) && (this.xueDiToggle.interactable = !0, 
        this.gongChangToggle.isChecked = !1, this.caoDiToggle.isChecked = !1, this.xueDiToggle.isChecked = !0, 
        (n = this.xueDiToggle.node.getChildByName("lock")) && (n.active = !1), GameData.instance.m_curMapType = 1, 
        this.curMapType = 1, this.curSelectType.string = "当前选择：雪地"), true && (this.gongChangToggle.interactable = !0, 
        this.xueDiToggle.isChecked = !1, this.caoDiToggle.isChecked = !1, this.gongChangToggle.isChecked = !0, 
        (n = this.gongChangToggle.node.getChildByName("lock")) && (n.active = !1), GameData.instance.m_curMapType = 2, 
        this.curMapType = 2, this.curSelectType.string = "当前选择：工厂");
    }
    clickMapType(n, e) {
        this.curMapType = parseInt(e), 0 == this.curMapType ? (this.curSelectType.string = "当前选择：草地", 
        GameData.instance.m_curMapType = 0) : 1 == this.curMapType ? (this.curSelectType.string = "当前选择：雪地", 
        GameData.instance.m_curMapType = 1) : 2 == this.curMapType && (this.curSelectType.string = "当前选择：工厂", 
        GameData.instance.m_curMapType = 2);
    }
    clickOkBtn() {
        0 == this.curMapType || 1 == this.curMapType || this.curMapType, GameData.instance.m_curMapType = this.curMapType;
        var n = cc.find("Canvas");
        this.uiMgr = n.getComponent(UIManager), this.uiMgr.showUI("LevelListUI");
    }
    clickBackBtn() {
        this.node.active = !1;
        var n = cc.find("Canvas/LoginUI");
        if (n) {
            var e = n.getComponent("LoginUI");
            e && e.showBannerAD();
        }
    }

}
