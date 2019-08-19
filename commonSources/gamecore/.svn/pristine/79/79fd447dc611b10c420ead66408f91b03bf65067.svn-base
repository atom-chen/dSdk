import EventData from "../managers/event/EventData";
import DeerSDK, { DeerAdVO, DeerAdType } from "./DeerSDK";
import DeerSDKEventNames from "./DeerSDKEventNames";
import Utils from "../managers/Utils";

// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

/**
 *  icon广告显示
 */
@ccclass
export default class Comp_DeerIconAd extends cc.Component {
    private static _adPool: Array<DeerAdVO>;

    //猜你喜欢广告池。当用户点击广告后，会从池子中再取得一个更新
    public static set adPool(v: Array<DeerAdVO>) {
        if (v) {
            //一定要复制数据
            Comp_DeerIconAd._adPool = v.concat();
        }
    }

    @property({
        displayName: "广告图标",
        type: cc.Sprite
    })
    adSprite: cc.Sprite = null;

    @property({
        displayName: "广告名称",
        type: cc.Label
    })
    adNameLabel: cc.Label = null;

    @property({
        displayName: "点击后更换",
    })
    renewWhenTap: boolean = true;

    @property({
        displayName: "开启缓动效果",
    })
    enableEffect: boolean = false;


    protected _adOriginalWidth: number;
    protected _adOriginalHeight: number;


    //是否是第一次显示
    private _isFirstTimeShow: boolean = true;

    onLoad() {
        if (this.enableEffect) this.node.opacity = 0;
    }

    start() {
        if (!this.adSprite) {
            this.adSprite = this.node.getComponent(cc.Sprite);
            if (!this.adSprite) this.adSprite = this.node.addComponent(cc.Sprite);
        }

        this._adOriginalHeight = this.adSprite.node.height;
        this._adOriginalWidth = this.adSprite.node.width;

        this.node.on(cc.Node.EventType.TOUCH_END, this.touchEndHandler, this);

        if (this._data) this.showAd();

        if (typeof wx != "undefined") {
            wx.onShow(this.wxOnShowCallback.bind(this));
        }
    }


    protected _data: DeerAdVO;

    /**
     * 设置广告数据
     */
    public set data(v: DeerAdVO) {
        if (this._data == v) return;
        this._data = v;

        this.showAd();
    }

    public get data(): DeerAdVO {
        return this._data;
    }



    private touchEndHandler(e: cc.Event): void {
        if (this._data) {
            //广告跳转
            this._data.navigate();

            //刷新广告
            if (this.renewWhenTap) {
                this.tryRenew();
            }
        }
    }

    // update (dt) {}


    protected _needToRenew: boolean = false;
    /**
     * 尝试更新广告
     */
    private tryRenew(): void {
        this._needToRenew = true;

        //再次回到游戏时，刷新广告
        // cc.game.on(cc.game.EVENT_SHOW, this.gameShowHandler, this);
    }



    // private gameShowHandler(e: cc.Event): void {
    //     cc.game.off(cc.game.EVENT_SHOW, this.gameShowHandler, this);

    //     this.renew();
    // }


    /**
     * 更新广告
     */
    public renew(): void {
        this._needToRenew = false;

        if (Comp_DeerIconAd._adPool && Comp_DeerIconAd._adPool.length > 0) {
            this.data = Comp_DeerIconAd._adPool[0];
        }
    }


    /**
     * 显示广告
     * 
     */
    public showAd(): void {
        if (!this._isOnLoadCalled) return;
        if (!this._data) return;


        var self = this;
        cc.loader.load({ "url": this._data.icon, "type": "png" }, (error, texture) => {
            if (!self.node || !self.node.isValid) return;
            
            if (texture && self.adSprite) {
                self.adSprite.spriteFrame = new cc.SpriteFrame(texture);
                self.adSprite.node.width = self._adOriginalWidth;
                self.adSprite.node.height = self._adOriginalHeight;

                if (self._isFirstTimeShow && self.enableEffect) {
                    self._isFirstTimeShow = false;
                    let delay: number = 0.1;
                    if (self.data["index"]) delay += 0.1 * self.data["index"];

                    //显示时，用动画
                    self.node.scale = 0.8;
                    self.node.opacity = 1;
                    // this.node.opacity = 0;
                    self.node.runAction(
                        cc.sequence(
                            cc.delayTime(delay),
                            cc.spawn(
                                cc.fadeTo(0.5, 255),
                                cc.scaleTo(0.5, 1, 1).easing(cc.easeBackOut())
                            )
                        )
                    );
                }
            }

            //发送展现统计
            if (self._data) self._data.reportShown();
        });

        if (this.adNameLabel) {
            this.adNameLabel.string = "" + this._data.name;
        }

        if (Comp_DeerIconAd._adPool) {
            let index: number = Comp_DeerIconAd._adPool.indexOf(this._data);
            Comp_DeerIconAd._adPool.splice(index, 1);
        }
    }

    /**
     * 微信onshow回调
     * 
     */
    private wxOnShowCallback(): void {
        if (this._needToRenew) {
            this.renew();
        }
    }

    onDestroy() {
        if (typeof wx != "undefined") {
            wx.offShow(this.wxOnShowCallback.bind(this));
        }
        // cc.game.off(cc.game.EVENT_SHOW, this.gameShowHandler, this);
    }
}
