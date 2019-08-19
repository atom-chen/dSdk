
const {ccclass, property} = cc._decorator;


/**
 * 抖动效果
 */

@ccclass
export default class Comp_EffectShake extends cc.Component {
    @property({
        displayName:"特效时长(秒)"
    })
    duration:number = 3;
    
    @property({
        displayName:"特效间隔(秒)"
    })
    delay:number = 5;

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
        displayName:"抖动角度"
    })
    shakeAngle:number = 15;


    start () {
        this.duration = Math.max(0.5, this.duration);

        this.playEffect();
    }



    private playEffect():void {
        if (this._isActing === true) return;
        this._isActing = true;

        this.node.runAction(
            cc.sequence(
                cc.rotateTo(0.2, -this.shakeAngle),
                cc.rotateTo(0.2, this.shakeAngle),
                cc.rotateTo(0.15, -this.shakeAngle * 0.8),
                cc.rotateTo(0.15, this.shakeAngle * 0.8),
                cc.rotateTo(0.1, -this.shakeAngle * 0.6),
                cc.rotateTo(0.1, this.shakeAngle * 0.6),
                cc.rotateTo(this.duration - 0.9, 0).easing(cc.easeElasticOut(0.1)),
                cc.callFunc(this.play_complete, this)
            )   
        );
    }


    private play_complete():void {
        this._isActing = false;

        let delay:number = this.delay;
        if (this.randomDelay) delay += 0.5 - Math.random();

        this.scheduleOnce(this.playEffect, delay);
    }



    // update (dt) {}

}
