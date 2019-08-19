

const {ccclass, property} = cc._decorator;

@ccclass
export default class FrameAni extends cc.Component {

    @property(Number)
    col:number = 8;
    
    @property(Number)
    row:number = 8;

    @property(Number)
    maxFrame:number = 64;


    @property(Number)
    playTimes:number = -1;

    @property(cc.Sprite)
    frame:cc.Sprite = null;

    @property(Number)
    curTime:number = 0;

    @property(Number)
    interval:number = 0.05;

    @property(Number)
    curIdx:number = 0;

    @property(Boolean)
    autoDestroy:boolean = true;


    public isEnd:boolean = false;
    onLoad() {
        this.isEnd = !1;
    }
    start() {}
    
    onEnable() {
        // console.error("this.frame",this.frame)
        // this.frame.x = 0, this.frame.y = 0,
         this.curTime = 0;
    }
    update(a) {
        if ((-1 == this.playTimes || true != this.isEnd) && (this.curTime += a, this.curTime >= this.interval)) {
            if (this.curTime = 0, this.curIdx >= this.maxFrame && (this.curIdx = 0, -1 != this.playTimes && (this.playTimes--, 
            0 >= this.playTimes))) return true == this.autoDestroy ? void this.node.destroy() : void (this.isEnd = !0);
            var e = this.curIdx % this.col, o = parseInt("" + this.curIdx / this.col);
            this.frame.node.x = -e * this.node.width - this.node.width * this.node.anchorX, 
            this.frame.node.y = o * this.node.height + this.node.height * this.node.anchorY, 
            this.curIdx++;
        }
    }


}
