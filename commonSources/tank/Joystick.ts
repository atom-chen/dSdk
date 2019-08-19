
import JoystickBG from "./JoystickBG";
import JoystickCommon from "./JoystickCommon";

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
export default class Joystick extends cc.Component {
    @property(cc.Component)
    ring:cc.Component = null;

    @property({
        type: cc.Node,
        // displayName: "摇杆节点"
    })
    dot: cc.Node = null;

    // @property({
    //     type: JoystickBG,
    //     // displayName: "摇杆背景节点"
    // })

    
    // ring:JoystickBG = null;

    @property({
        displayName:"摇杆X位置"
    })
    stickX = 0;

    @property({
        displayName:"摇杆Y位置"
    })
    stickY = 0;


    @property({
        type: JoystickCommon.TouchType,
        displayName: "触摸类型"
    })
    touchType = JoystickCommon.TouchType.DEFAULT;

    @property({
        type: JoystickCommon.DirectionType,
        displayName: "方向类型"
    })
    directionType = JoystickCommon.DirectionType.ALL;

    @property({
        type: cc.Vec2,
        displayName: "摇杆当前位置"
    })
    _stickPos: cc.Vec2 = null;

    @property({
        type: cc.Vec2,
        displayName: "摇杆当前位置"
    })
    _touchLocation: cc.Vec2 = null;

    onLoad() {
    }
    start(){
        this._createStickSprite(), this.touchType == JoystickCommon.TouchType.FOLLOW && this._initTouchEvent();
    }
    _createStickSprite() {
        // return;
        this.scheduleOnce(() => {
            this.ring.node.setPosition(this.stickX, this.stickY), this.dot.setPosition(this.stickX, this.stickY);
        })
    }
    _initTouchEvent() {
        // return;
        this.node.on(cc.Node.EventType.TOUCH_START, this._touchStartEvent, this),
         this.node.on(cc.Node.EventType.TOUCH_MOVE, this._touchMoveEvent, this), 
        this.node.on(cc.Node.EventType.TOUCH_END, this._touchEndEvent, this), 
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._touchEndEvent, this);

    }

    _touchStartEvent(n) {
        this._touchLocation = n.getLocation();
        var e = this.node.convertToNodeSpaceAR(n.getLocation());
        this.ring.node.setPosition(e), this.dot.setPosition(e), this._stickPos = e;
    }
    _touchMoveEvent(r) {
        if (this._touchLocation.x == r.getLocation().x && this._touchLocation.y == r.getLocation().y) return !1;
        var e = this.ring.node.convertToNodeSpaceAR(r.getLocation()), t = this.ring._getDistance(e, cc.v2(0, 0)), n = this.ring.node.width / 2,
         i = this._stickPos.x + e.x, s = this._stickPos.y + e.y;
        if (n > t) this.dot.setPosition(cc.v2(i, s)); else {
            var a = this._stickPos.x + Math.cos(this.ring._getRadian(cc.v2(i, s))) * n, l = this._stickPos.y + Math.sin(this.ring._getRadian(cc.v2(i, s))) * n;
            this.dot.setPosition(cc.v2(a, l));
        }
        this.ring._getAngle(cc.v2(i, s)), this.ring._setSpeed(cc.v2(i, s));
    }
    _touchEndEvent() {
        this.dot.setPosition(this.ring.node.getPosition()), this.ring._speed = 0;
    }

}
