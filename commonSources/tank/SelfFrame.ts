

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
export default class SelfFrame extends cc.Component {

    interval:number = .2
    loop:boolean = !1
    playTimes:number = 1;
    frames: cc.Sprite[] = []
    curTime:number = 0
    curIdx:number = 0
    isPlay:boolean = !1
    start() {
        this.curTime = 0, this.curIdx = 0, this.play();
    }
    update(n) {
        if (this.isPlay && (this.curTime += n, this.curTime >= this.interval)) {
            if (this.hideAll(), this.curTime = 0, this.curIdx++, this.curIdx >= this.frames.length) {
                if (-1 != this.playTimes) return void this.stop();
                this.curIdx = 0;
            }
            this.frames[this.curIdx].node.active = !0;
        }
    }
    play() {
        this.isPlay = !0;
    }
    stop() {
        this.isPlay = !1;
    }
    hideAll() {
        for (var n = 0; n < this.frames.length; n++) this.frames[n].node.active = !1;
    }
}
