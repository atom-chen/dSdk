
const {ccclass, property} = cc._decorator;


/**
 * 放大效果
 */

@ccclass
export default class Comp_EffectZoomIn extends cc.Component {
    @property({
        displayName:"特效时长(秒)"
    })
    duration:number = 1;
    
    @property({
        displayName:"特效间隔(秒)"
    })
    delay:number = 3;

    @property({
        displayName:"随机间隔时间",
        tooltip:"勾选后，特效间隔时间有一定幅度的小随机"
    })
    randomDelay:boolean = true;

    //是否正在播放动作
    protected _isActing:boolean = false;


    public get isActing():boolean {
        return this._isActing;
    }


    @property({
        displayName:"放大系数"
    })
    zoomInFactor:number = 1.2;


    start () {
        this.duration = Math.max(0.5, this.duration);

        this.playEffect();
    }



    private playEffect():void {
        if (this._isActing === true) return;
        this._isActing = true;

        let oScaleX:number = this.node.scaleX;
        let oScaleY:number = this.node.scaleY;
        let toScaleX:number = this.node.scaleX * this.zoomInFactor;
        let toScaleY:number = this.node.scaleY * this.zoomInFactor;

        this.node.stopAllActions();

        this.node.runAction(
            cc.sequence(
                cc.scaleTo(this.duration / 2, toScaleX, toScaleY).easing(cc.easeQuarticActionIn()),
                cc.scaleTo(this.duration / 2, oScaleX, oScaleY).easing(cc.easeQuarticActionOut()),
                cc.callFunc(this.play_complete, this)
            )   
        );
    }


    private play_complete():void {
        this._isActing = false;

        let delay:number = this.delay;
        if (this.randomDelay) delay += 0.5 - Math.random();

        if (delay > 0) {
            this.scheduleOnce(this.playEffect, delay);
        } else {
            this.playEffect();
        }
    }



    // update (dt) {}

}
