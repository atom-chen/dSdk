
import JoystickCommon from "./JoystickCommon";
import GameData from "./GameData";
import Joystick from "./Joystick";

var d = Math.sqrt, m = Math.pow, p = Math.sin, g = Math.cos, y = Math.PI, _ = Math.atan2;

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
export default class JoystickBG extends cc.Component {


    @property({
        type: cc.Node,
        // displayName: "摇杆区域"
    })
    area: cc.Node = null;

    @property({
        type: cc.Node,
        // displayName: "摇杆节点"
    })
    dot: cc.Node = null;

    @property({
        type:Joystick,
        displayName:"joy Node"
    })
    _joyCom:Joystick = null;

    @property({
        displayName:"被操作的目标Node"
    })
    _playerNode = null;

    @property({
        displayName:"当前触摸的角度"
    })
    _angle = null;

    @property({
        displayName:"弧度"
    })
    _radian = null;

    _speed:number = 0
    _speed1:number = 100
    _speed2:number = 200
    _opacity:number = 0
    _startMove:Boolean = false;
    _dir: cc.Vec2;

    _stickPos = null;
    onLoad() {
        this._joyCom = this.node.parent.getComponent(Joystick),
        //  this._playerNode = this._joyCom.sprite, 
        this._joyCom.touchType == JoystickCommon.TouchType.DEFAULT && this._initTouchEvent();
    }
    start(){

    }
    _initTouchEvent() {
        // return;
        this.area.on(cc.Node.EventType.TOUCH_START, this._touchAreaStartEvent, this), this.area.on(cc.Node.EventType.TOUCH_MOVE, this._touchMoveEvent, this), 
        this.area.on(cc.Node.EventType.TOUCH_END, this._touchEndEvent, this), this.area.on(cc.Node.EventType.TOUCH_CANCEL, this._touchEndEvent, this);
    }
    update() {
        switch (this._joyCom.directionType) {
          case JoystickCommon.DirectionType.ALL:
            this._startMove ? this._allDirectionsMove() : this._dir = cc.v2(0, 0);
        }
    }
    _allDirectionsMove() {
        var n = 2 * (g(this._angle * (y / 180)) * this._speed), e = 2 * (p(this._angle * (y / 180)) * this._speed);
        0 == n && 0 == e || (this._dir = cc.v2(n, e));

    }
    _getDistance(n, e) {
        return d(m(n.x - e.x, 2) + m(n.y - e.y, 2));
    }
    _getRadian(n) {
        return this._radian = y / 180 * this._getAngle(n), this._radian;
    }
    _getAngle(n) {
        var e = this.node.getPosition();
        return this._angle = Math.atan2(n.y - e.y, n.x - e.x) * (180 / y), this._angle;
    }

    _radius:number = 0;
    _setSpeed(n) {
        this._speed = this._getDistance(n, this.node.getPosition()) < this._radius ? this._speed1 : this._speed2;
    }
    _touchAreaStartEvent(n) {
        var e = this._joyCom.node.convertToNodeSpaceAR(n.getLocation());
        cc.log("touchPos: " + n.getLocation().x + " " + n.getLocation().y), cc.log("touchPos: " + e.x + " " + e.y), 
        40 > GameData.instance.m_curLevel && (this.node.x = e.x, this.node.y = e.y), this.dot.x = e.x, 
        this.dot.y = e.y, this._startMove = !0;
    }
    _touchStartEvent(o) {
        var e = this.node.convertToNodeSpaceAR(o.getLocation()), t = this._getDistance(e, cc.v2(0, 0)), n = this.node.width / 2;
        this._stickPos = e;
        var i = this.node.getPosition().x + e.x, r = this.node.getPosition().y + e.y;
        return this._startMove = !0, n > t && (this.dot.setPosition(cc.v2(i, r)), !0);
    }
    _touchMoveEvent(r) {
        var e = this.node.convertToNodeSpaceAR(r.getLocation()), t = this._getDistance(e, cc.v2(0, 0)), n = this.node.width / 2, i = this.node.getPosition().x + e.x, s = this.node.getPosition().y + e.y;
        if (n > t) this.dot.setPosition(cc.v2(i, s)); else {
            var a = this.node.getPosition().x + g(this._getRadian(cc.v2(i, s))) * n, l = this.node.getPosition().y + p(this._getRadian(cc.v2(i, s))) * n;
            this.dot.setPosition(cc.v2(a, l));
        }
        this._getAngle(cc.v2(i, s)), this._setSpeed(cc.v2(i, s));
    }
    _touchEndEvent() {
        this.dot.setPosition(this.node.getPosition()), this._speed = 0, this._startMove = !1;
    }


}
