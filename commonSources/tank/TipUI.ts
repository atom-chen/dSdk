


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
export default class TipUI extends cc.Component {


    @property(cc.Label)
    info: cc.Label = null

    @property(cc.Button)
    okBtn1: cc.Button

    @property(cc.Button)
    okBtn2: cc.Button

    @property(cc.Button)
    cancelBtn: cc.Button

    @property(cc.Label)
    okBtnLabel: cc.Label

    @property(cc.Label)
    okBtnLabel2: cc.Label

    @property(cc.Label)
    cancelBtnLabel: cc.Label
    

    start() {}

    okCB = null;
    cancelCB = null;
    setTip(a, e, t) {
        this.info.string = a, this.okCB = e, t && 0 < t.length && (this.okBtnLabel.string = t, 
        this.okBtnLabel2.string = t), this.okBtn1.node.active = !0, this.okBtn2.node.active = !1, 
        this.cancelBtn.node.active = !1;
    }
    setTipOKCancel(a, e, t, n, o) {
        this.info.string = a, this.okCB = e, this.cancelCB = t, n && 0 < n.length && (this.okBtnLabel.string = n, 
        this.okBtnLabel2.string = n), o && 0 < o.length && (this.cancelBtnLabel.string = o), 
        this.okBtn1.node.active = !1, this.okBtn2.node.active = !0, this.cancelBtn.node.active = !0;
    }
    clickOkBtn() {
        this.okCB && this.okCB(), this.node.active = !1;
    }
    clickCancelBtn() {
        this.cancelCB && this.cancelCB(), this.node.active = !1;
    }
    onEnable() {
        this.showBannerAd();
    }
    onDisable() {
        this.hideBannerAD();
    }
    showBannerAd() {
        
    }
    hideBannerAD() {
        
    }
}
