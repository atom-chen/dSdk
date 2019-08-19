import TankDataMgr from "./TankDataMgr";
import GameData from "./GameData";
import JoystickBG from "./JoystickBG";
import Globaldef from "./Globaldef";
import EffManager from "./EffManager";
import GameUI from "./GameUI";
import Bullet_fllow from "./Bullet_fllow";
import Raycast from "./Raycast";
import UIManager from "./UIManager";
import Bullet_power from "./Bullet_power";
import Bullet from "./Bullet";
import Bullet_pao from "./Bullet_pao";


const {ccclass, property} = cc._decorator;



@ccclass
export default class Hero_physic extends cc.Component {

    @property(cc.RigidBody)
    body:cc.RigidBody = null;
    
    @property(cc.Sprite)
    sprite:cc.Sprite = null;

    @property(cc.Sprite)
    top:cc.Sprite = null;

    @property(cc.Prefab)
    bulletPrefab:cc.Prefab = null;
    @property(cc.Prefab)
    bulletThreePrefab:cc.Prefab = null;
    @property(cc.Prefab)
    bulletPaoPrefab:cc.Prefab = null;
    @property(cc.Prefab)
    bulletFollowPrefab:cc.Prefab = null;
    @property(cc.Prefab)
    bulletBombPrefab:cc.Prefab = null;

    @property(cc.Node)
    bulletList:cc.Node[] = [];

    @property(cc.Prefab)
    rayPrefab:cc.Prefab = null;

    @property(cc.Node)
    arrNode:cc.Node = null;

    @property(cc.Vec2)
    originPos:cc.Vec2 = cc.v2(0,0);


    gameCtrl:any = null
    ray:any = null
    curHp:number = 3
    isDead:boolean = false
    keyDownMove:boolean = false
    joyStickBg:JoystickBG = null
    fllow_move: boolean = true
    notFllowCurTime:number =  0
    notFllowIntervalTime:number = 1


    @property(cc.Node)
    arrow_direction:cc.Node = null;

    onLoad() {
        this.originPos = this.node.getPosition(), this.node.on("mousedown", function() {
            console.log("Hello!");
        }), cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this), 
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this), cc.director.getPhysicsManager().enabled = !0, 
        cc.director.getPhysicsManager().debugDrawFlags = 0, this.body = this.getComponent(cc.RigidBody), 
        this.body.fixedRotation = !0;
        var n = cc.find("Canvas/GameUI");
        n || (n = cc.find("Canvas/GameNewUI"));
        var e = n.getComponent(GameUI);
        // e || (e = n.getComponent("GameNewUI")),
        this.joyStickBg = e.joyStickBG;
        this.arrow_direction.opacity = 0;
    }
    onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this), cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    init(n) {
        this.gameCtrl = n;
    }
    reborn() {
        this.curHp = 3, this.node.x = this.originPos.x, this.node.y = this.originPos.y, 
        GameData.instance.m_curBlood = this.curHp, GameData.instance.m_isDirty = !0, this.isDead = !1, 
        this.node.active = !0, this.body.linearVelocity = cc.v2(0, 0);
        for (var n = 0; n < this.bulletList.length; n++) this.bulletList[n].active = !1;
    }


    tiledMapCom:cc.TiledMap = null;
    tiledPointGroup:any = null;
    reset() {
        this.scheduleOnce(()=>{
            this.curHp = 3, this.isDead = !1;

        this.node.active = !0, this.body.linearVelocity = cc.v2(0, 0);
        var a = cc.find("Canvas/bg/TiledMap");
        this.tiledMapCom = a.getComponent(cc.TiledMap);

        this.tiledPointGroup = this.tiledMapCom.getObjectGroup("point");

        let bFind = false
        for (var e = this.tiledPointGroup.getObjects(), t = 0; t < e.length; t++) 
            if ("hero" == e[t].name) {
                var n = e[t].x + a.x, o = e[t].y;


                this.node.x = n, this.node.y = o,
                
                this.originPos.x = n, this.originPos.y = o;
                bFind = true;
                break;
            }

        if(!bFind){
            this.node.x = this.originPos.x, this.node.y = this.originPos.y
        }
        for (t = 0; t < this.bulletList.length; t++) this.bulletList[t].active = !1;
        })
    }
    update(n) {
        
        this.joyStickBg && this.joyStickBg._startMove ? this.move(this.joyStickBg._dir, this.joyStickBg._angle) : true == this.keyDownMove ||
         (this.body.linearVelocity = cc.v2(0, 0)), 
        false == this.fllow_move && (this.notFllowCurTime += n, this.notFllowCurTime >= this.notFllowIntervalTime && (this.notFllowCurTime = 0, 
        this.fllow_move = !0));
    }
    stopMove() {
        this.body.linearVelocity = cc.v2(0, 0);
    }
    curMoveDir:cc.Vec2 = null;


    move(n, e) {
        this.body && (0 == n.x && 0 == n.y || (this.curMoveDir = cc.v2(n.x, n.y)),
        this.body.linearVelocity = n.mulSelf(.7)
        ,this.sprite.node.rotation = -e
        ,this.setFireAngleByMove(-e)
        // ,true == this.fllow_move && this.setFireAngleByMove(-e)
        // ,true == this.fllow_move && this.setFireAngle(this.top.node.rotation + 2 * e)



        );
    }


    setFireAngleByMove(angle):void{
        // console.log(this.node.rotation,this.top.node.rotation)
        


        this.top.node.rotation = this.curFireAngle - angle;

    }

//30  30 

// 40  20



    public curFireAngle:number = 0;
    setFireAngle(n) {
        n += this.node.rotation;
        this.top.node.rotation = -n, 1 == TankDataMgr.instance.useFightBtn && (this.arrNode.rotation = -n);
        this.curFireAngle = this.top.node.rotation + this.node.rotation
    }
    addRay() {
        this.ray = cc.instantiate(this.rayPrefab), this.ray.parent = this.gameCtrl.bgImg.node;
        var n = this.ray.getComponent(Raycast);
        n.setCenter(this.node.x, this.node.y), n.setTarget(500, 500), this.ray && this.ray.setPosition(0, 0);
    }
    onKeyDown(n) {
        switch (n.keyCode) {
          case cc.macro.KEY.w:
            this.keyDownMove = !0, this.move(cc.v2(0, 200), 0);
            break;

          case cc.macro.KEY.s:
            this.keyDownMove = !0, this.move(cc.v2(0, -200), 0);
            break;

          case cc.macro.KEY.a:
            this.keyDownMove = !0, this.move(cc.v2(-200, 0), 0);
            break;

          case cc.macro.KEY.d:
            this.keyDownMove = !0, this.move(cc.v2(200, 0), 0);
            break;

          case cc.macro.KEY.e:
            var e = cc.find("Canvas").getComponent(UIManager);
            GameData.instance.m_isWin = !0, GameData.instance.isPause = !0, e.showUI(Globaldef.UI_NAME[Globaldef.UI_ID.E_GAME_END_UI]);
        }
    }
    onKeyUp(n) {
        switch (n.keyCode) {
          case cc.macro.KEY.w:
          case cc.macro.KEY.s:
          case cc.macro.KEY.a:
          case cc.macro.KEY.d:
            this.keyDownMove = !1, this.body.linearVelocity = cc.v2(0, 0);
        }
    }
    onHP(n) {
        if (this.curHp += n, GameData.instance.m_curBlood = this.curHp, GameData.instance.m_isDirty = !0, 
        0 >= this.curHp) {
            this.gameCtrl.checkGameState(), this.node.active = !1, this.isDead = !0;
            for (var e = 0; e < this.bulletList.length; e++) this.bulletList[e].active = !1;
            EffManager.instance.addDieEff(this.node.getPosition(), this.node);
        }
    }
    fire(i, e, t, n, s) {
        if (!this.isDead) {
            if (this.fllow_move = !1, i = i.normalize(), !(a = this.getBulllet(Globaldef.BULLET_TYPE.E_ONE))) {
                s || (s = this.bulletPrefab);
                var a = cc.instantiate(s);
                this.bulletList.push(a);
            }
            if (a.active = !0, a.parent = t, this.node.getPosition(), n) a.setPosition(n.x, n.y); else {
                var o = cc.v2(i.x, i.y), r = this.node.getPosition().addSelf(o.mulSelf(50));
                a.setPosition(r.x, r.y);
            }
            var l = a.getComponent(cc.RigidBody);
            l.linearVelocity = cc.v2(350 * i.x, 350 * i.y), l.fixedRotation = !0;
            var c = a.getComponent(Bullet);
            c.bullet_type = Globaldef.BULLET_TYPE.E_ONE, c.canColNum = 2, c.refreshAngle(), EffManager.instance.addFireEff(a.getPosition(), this.node);
        }
    }
    fire_2(i, e, t, n, s:any = null) {
        if (!this.isDead) {
            if (this.fllow_move = !1, i = i.normalize(), !(a = this.getBulllet(Globaldef.BULLET_TYPE.E_ONE))) {
                s || (s = this.bulletPrefab);
                var a = cc.instantiate(s);
                this.bulletList.push(a);
            }
            if (a.active = !0, a.parent = t, this.node.getPosition(), n) a.setPosition(n.x, n.y); else {
                var c = cc.v2(i.x, i.y), o = this.node.getPosition().addSelf(c.mulSelf(50));
                a.setPosition(o.x, o.y);
            }
            var r = a.getComponent(cc.RigidBody);
            r.linearVelocity = cc.v2(350 * i.x, 350 * i.y), r.fixedRotation = !0;
            var l = a.getComponent(Bullet);
            return l.bullet_type = Globaldef.BULLET_TYPE.E_ONE, l.canColNum = 2, l.refreshAngle(), a.getPosition();
        }
    }
    fireThree(r, e, t) {
        if (!this.isDead) {
            this.fllow_move = !1;
            var n = cc.v2(r.x, r.y).rotateSelf(.1), i = cc.v2(r.x, r.y).rotateSelf(-.1), s = this.node.getPosition().addSelf(r.mulSelf(50));
            this.fire_2(r, e, t, s), this.fire_2(n, e, t, s);
            var a = this.fire_2(i, e, t, s);
            EffManager.instance.addFireEff(a, this.node);
        }
    }
    firePao(i, e, t, n) {
        e = this.top.node.convertToWorldSpaceAR(cc.v2(220,0));
        e = cc.find("Canvas/bg").convertToNodeSpaceAR(e);
        if (!this.isDead) {
            this.fllow_move = !1;
            var s = this.node.parent.convertToNodeSpaceAR(e),
            a = this.gameCtrl.hero.node.parent.convertToWorldSpaceAR(s),
            c = cc.instantiate(this.bulletPaoPrefab);
            this.bulletList.push(c), c.parent = t, c.active = !0;
            var o = i.mulSelf(50);
            a = a.subSelf(o);
            var r = this.node.getPosition().addSelf(o);
            n ? c.setPosition(n.x, n.y) : c.setPosition(r.x, r.y);
            var l = c.getComponent(Bullet_pao);
            l.bullet_type = Globaldef.BULLET_TYPE.E_BOMB,
            l.setTargetType(Globaldef.TagType.ENEMY),
            l.setTarget(e, e);
        }
    }
    fireFllow(i, e, t, n) {
        if (!this.isDead) {
            this.fllow_move = !1, i = i.normalize();
            var r = cc.instantiate(this.bulletFollowPrefab);
            this.bulletList.push(r), r.parent = t, r.active = !0;
            var a = this.node.getPosition();
            n ? r.setPosition(n.x, n.y) : r.setPosition(a.x, a.y), r.getComponent(cc.RigidBody).fixedRotation = !0;
            var s = r.getComponent(Bullet_fllow);
            s.moveDir = i, s.startMove = !0, s.bullet_type = Globaldef.BULLET_TYPE.E_FLLOW, s.refreshAngle();
        }
    }
    firePowerBomb(i, e, t, n, s) {
        if (!this.isDead) {
            if (this.fllow_move = !1, i = i.normalize(), !(a = this.getBulllet(Globaldef.BULLET_TYPE.E_POWER_BOMB))) {
                s || (s = this.bulletBombPrefab);
                var a = cc.instantiate(s);
                this.bulletList.push(a);
            }
            if (a.active = !0, a.parent = t, this.node.getPosition(), n) a.setPosition(n.x, n.y); else {
                var o = cc.v2(i.x, i.y), r = this.node.getPosition().addSelf(o.mulSelf(50));
                a.setPosition(r.x, r.y);
            }
            var l = a.getComponent(cc.RigidBody);
            l.linearVelocity = cc.v2(350 * i.x, 350 * i.y), l.fixedRotation = !0;
            var c = a.getComponent(Bullet_power);
            c.bullet_type = Globaldef.BULLET_TYPE.E_POWER_BOMB,
             c.canColNum = 2, c.refreshAngle(),
              EffManager.instance.addFireEff(a.getPosition(), this.node);
        }
    }
    getBulllet(n) {
        for (var e = 0; e < this.bulletList.length; e++) if (true != this.bulletList[e].active) {
            if (n == Globaldef.BULLET_TYPE.E_ONE) {
                if (!this.bulletList[e].getComponent(Bullet)) continue;
                return this.bulletList[e];
            }
            if (n == Globaldef.BULLET_TYPE.E_BOMB) {
                if (!this.bulletList[e].getComponent(Bullet_pao)) continue;
                return this.bulletList[e];
            }
            if (n == Globaldef.BULLET_TYPE.E_FLLOW) {
                if (!this.bulletList[e].getComponent(Bullet_fllow)) continue;
                return this.bulletList[e];
            }
        }
        return null;
    }
}