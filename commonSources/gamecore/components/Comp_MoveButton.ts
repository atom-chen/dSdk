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

@ccclass
export default class Comp_MoveButton extends cc.Component {

    private maxx: number;
    private maxy: number;
    private jude: boolean = false;
    private delx: number = 0;
    private dely: number = 0;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.setTouchStart, this);
    }
    start() {
        // console.log("宽度", cc.winSize);
        this.maxx = (cc.winSize.width / 2 - this.node.width / 2)
        this.maxy = (cc.winSize.height / 2 - this.node.height / 2);
        // this.node.x = 0;
        // this.node.y = 0;
    }


    private addEvends(): void {
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.setTouchMove, this)
        this.node.on(cc.Node.EventType.TOUCH_END, this.setTouchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.setTouchCancel, this);
    }
    private removeEvends(): void {
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this.setTouchMove, this)
        this.node.off(cc.Node.EventType.TOUCH_END, this.setTouchEnd, this);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL, this.setTouchCancel, this);
    }


    private setTouchStart() {
        this.delx = 0;
        this.dely = 0;
        this.addEvends();
    }

    private setTouchEnd(event: cc.Event) {
        // console.log("fefe")
        if (this.jude == true) {
            event.stopPropagationImmediate()
            event.stopPropagation();
            // console.log("被拦截");
        }
        this.startMove();
        this.removeEvends();
    }

    private setTouchCancel(event: cc.Event.EventTouch) {
        this.startMove();
    }
    /**
     * 开始移动
     */
    private startMove() {
        let x: number = this.node.x;
        let y: number = this.node.y;
        if (y > 0) {
            if (y > this.maxy) {
                y = this.maxy;
            }
        } else {
            if (y < -this.maxy) {
                y = -this.maxy;
            }

        }
        let p: cc.Vec2 = cc.v2(this.maxx, y);
        if (x < 0) {
            p = cc.v2(-this.maxx, y);
        }
        let cp = cc.moveTo(0.3, p).easing(cc.easeIn(0.3));
        var self = this;
        let se = cc.sequence(cp, cc.callFunc(() => {
            self.jude = false;
        }))
        this.node.runAction(se);
    }

    /**
     *  移动
     * @param event 
     */
    private setTouchMove(event: cc.Event.EventTouch) {
        let dex: number = event.getDeltaX();
        let dey: number = event.getDeltaY();
        this.node.x += dex;
        this.node.y += dey;
        // console.log("坐标", this.node.x, this.node.y)
        this.delx += dex;
        this.dely += dey;

        if (Math.abs(Math.max(this.delx, this.dely)) > 10) {
            this.jude = true;
        }

    }

    onDestroy() {
        this.node.off(cc.Node.EventType.TOUCH_START, this.setTouchStart, this);
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this.setTouchMove, this)
        this.node.off(cc.Node.EventType.TOUCH_END, this.setTouchEnd, this);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL, this.setTouchCancel, this);
    }
    // update (dt) {}
}
