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
export default class Crosshair extends cc.Component {
    @property(cc.Node)
    crosshair:cc.Node = null;
    


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    origPos:cc.Vec2 = null;

    init(pos:cc.Vec2):void{
        this.origPos = cc.v2(pos.x,pos.y);
        this.node.position = this.origPos;
        this.crosshair.scale = 8;
        this.crosshair.position = cc.v2(0,360);
    }
    start () {
        this.schedule(this.run,0,cc.macro.REPEAT_FOREVER);

    }

    run():void{
        this.node.rotation += 3;
        this.crosshair.rotation -= 3;
        let difY = 5;
        this.crosshair.y -= difY;
        let time = 360 / difY;
        this.crosshair.scale -= 7/time;
        if(this.crosshair.y <= 0){
            this.unschedule(this.run);
            this.crosshair.runAction(cc.repeatForever(cc.sequence(cc.fadeTo(0.6,10),cc.fadeTo(0.6,255))));
        }
    }

    update (dt) {

    }
}
