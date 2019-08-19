// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

/**
 * 分享目的地组件
 */
@ccclass
export default class Comp_EffectFlyTo extends cc.Component {

    @property({
        displayName: "开启小随机"
    })
    public hasRandom: boolean = true;

    @property({
        displayName: "掉落高度",
        tooltip: "0或者小于0，则不掉落，直接飞向目的地"
    })
    public height: number = 100;

    @property({
        displayName: "掉落距离"
    })
    public distance: number = 100;

    @property({
        displayName: "掉落时长"
    })
    public duration: number = 1;

    @property({
        displayName: "开始延迟时间"
    })
    public startDelay: number = 0.5;


    @property({
        displayName: "飞回的x增量"
    })
    public flyDeltaDistance: number = 50;

    @property({
        displayName: "自动销毁",
        tooltip:"到达目的后，是否自动销毁"
    })
    public destroyWhenComplete:boolean = true;


    //携带数据
    public data: any = null;

    /**
     * 飞向目的地
     */
    public destination: cc.Vec2;



    /**
     * 完成飞翔后回调。回调时，传递data数据。
     */
    public completeCallback:Function;


    // onLoad () {}

    start() {
        if (this.destination) this.go();
    }

    // update (dt) {}


    protected _isFlying: boolean = false;

    /**
     * 是否正在飞翔
     * 
     */
    public get isFlying(): boolean {
        return this._isFlying;
    }


    /**
     * 开始跌落
     * 
     * @param destination     飞向目的地
     */
    public go(destination: cc.Vec2 = null): void {
        if (this._isFlying) return;
        this._isFlying = true;

        if (destination) this.destination = destination;

        let delay: number = this.startDelay;
        if (this.hasRandom) delay += Math.min(0.5, this.startDelay / 3 * Math.random());

        //如果跌落高度小于或等于0
        if (this.height <= 0) {
            this.scheduleOnce(this.flyToDestination, delay);
            // this.flyToDestination();
            return;
        }

        this.node.runAction(
            cc.sequence(
                cc.delayTime(delay),
                cc.spawn(
                    cc.moveBy(this.duration, 0, -this.height).easing(cc.easeBounceOut()),
                    cc.moveBy(this.duration, this.distance, 0)
                ),

                cc.delayTime(0.5 + Math.random() * 0.5),

                cc.callFunc(() => {
                    this.flyToDestination();
                })
            )
        );
    }


    /**
     * 飞向目的地
     */
    private flyToDestination(): void {
        let targetPo: cc.Vec2 = this.destination;
        if (!targetPo) {
            this.doComplete();
            return;
        }

        let po: cc.Vec2 = new cc.Vec2(0, 0);
        po = this.node.convertToWorldSpaceAR(po);

        this.node.x = po.x;
        this.node.y = po.y;
        this.node.removeFromParent(false);
        cc.director.getScene().addChild(this.node);

        let deltaX: number = this.flyDeltaDistance;
        if (this.hasRandom) deltaX += this.flyDeltaDistance / 3 * Math.random();

        let t: number = Math.random() * 0.3 + 0.6;
        this.node.runAction(
            cc.sequence(
                cc.spawn(
                    cc.sequence(
                        cc.moveBy(t / 2, targetPo.x - this.node.x + deltaX, 0).easing(cc.easeCubicActionOut()),
                        cc.moveBy(t / 2, -deltaX, 0).easing(cc.easeCubicActionIn()),
                    ),
                    cc.moveBy(t, 0, targetPo.y - this.node.y).easing(cc.easeQuadraticActionIn()),
                ),
                cc.scaleTo(0.2, 1.3, 1.3),
                cc.scaleTo(0.2, 1, 1),
                cc.callFunc(() => {
                    this.doComplete();
                })
            )
        )
    }


    /**
     * 完成
     */
    private doComplete(): void {
        if (this.completeCallback != null) {
            try {
                this.completeCallback(this.data);
            } catch (error) {
                
            }
        }

        if (this.destroyWhenComplete) {
            //销毁节点
            this.node.destroy();
        }
    }


    onDestroy() {
        this.completeCallback = null;
        this.data = null;
        this.destination = null;
    }
}
