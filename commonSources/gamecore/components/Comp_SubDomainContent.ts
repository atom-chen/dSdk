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
 * 显示子域内容组件。需要显示子域内容时，请挂载该组件到一个空节点
 * 
 */
@ccclass
export default class Comp_SubDomainContent extends cc.Component {

    @property({
        displayName: "刷新间隔(秒)",
        tooltip: "如果设置为0，则每帧刷新"
    })
    delayTime: number = 0;

    private _sprite: cc.Sprite = null;

    private _tex: cc.Texture2D = null;

    private _context: any;

    onLoad() {
        this._sprite = null;
        this._tex = new cc.Texture2D();
        this._context = null;

        //设置节点尺寸
        var winSize: cc.Size = cc.winSize;
        this.node.width = winSize.width;
        this.node.height = winSize.height;

        if (typeof wx != "undefined" && wx.getOpenDataContext) {
            this._context = wx.getOpenDataContext();
            let sharedCanvas = this._context.canvas;
            if (sharedCanvas) {
                sharedCanvas.width = this.node.width;
                sharedCanvas.height = this.node.height;
            }
            this._tex.setPremultiplyAlpha(true);
            this._tex.initWithElement(sharedCanvas);

            this._sprite = this.node.getComponent(cc.Sprite);
            if (!this._sprite) {
                this._sprite = this.node.addComponent(cc.Sprite);
                this._sprite["srcBlendFactor"] = cc.macro.BlendFactor.ONE;
            }
            this._sprite.spriteFrame = new cc.SpriteFrame(this._tex);
        }
        else {
            this.enabled = false;
        }
    }

    start() {
        //console.log("【Comp_SubDomainContent】 start");
        this.updateSubContextViewport();
    }

    onEnable():void {
        this.updateSubContextViewport();
    }

    /**
     * @method updateSubContextViewport
     */
    private updateSubContextViewport():void {
        if (this._context) {
            let box = this.node.getBoundingBoxToWorld();
            let sx = cc.view["_scaleX"];
            let sy = cc.view["_scaleY"];
            this._context.postMessage({
                fromEngine: true,
                event: 'viewport',
                x: box.x * sx + cc.view["_viewportRect"].x,
                y: box.y * sy + cc.view["_viewportRect"].y,
                width: box.width * sx,
                height: box.height * sy
            });
        }
    }


    //记录上一次刷新子域内容时间点
    private _lastUpdateTime: number = 0;

    update(dt) {
        try {
            if (this.delayTime > 0) {
                let now: number = new Date().getTime();
                if (now - this._lastUpdateTime < this.delayTime * 1000) {
                    return;
                }
                this._lastUpdateTime = now;
            }

            this._tex.initWithElement(this._context.canvas);
            this._sprite["_activateMaterial"]();
        } catch (err) {

        }

    }


    // private _contentScale: number;
    // /**
    //  * 更新子域内容
    //  */
    // public updateSubDomainContent() {
    //     // console.log("刷新子域~~~");
    //     if (typeof wx == "undefined") return;
    // 
    //     console.log("【Comp_SubDomainContent】刷新子域内容");
    //     let openDataContext = wx.getOpenDataContext();
    //     let sharedCanvas = openDataContext.canvas;
    //     this._tex.setPremultiplyAlpha(true);
    //     this._tex.initWithElement(sharedCanvas);
    //     this._tex.handleLoadedTexture();
    //     this._sprite.spriteFrame = new cc.SpriteFrame(this._tex);
    // 
    //     //缩放内容
    //     if (isNaN(this._contentScale)) {
    //         let w: number = sharedCanvas.width;
    //         let h: number = sharedCanvas.height;
    // 
    //         console.log("shared canvas width is", w);
    //         console.log("shared canvas height is", h);
    // 
    //         let winSize: cc.Size = cc.director.getWinSize();
    //         this._contentScale = winSize.width / w;
    //         this.node.scale = this._contentScale;
    //     }
    // }

}
