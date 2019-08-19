import GameCtrl from "./GameCtrl";
import Globaldef from "./Globaldef";
import GameData from "./GameData";
import Raycast from "./Raycast";
import EnemyManager from "./EnemyManager";
import EffManager from "./EffManager";
import TankDataMgr from "./TankDataMgr";
import Bullet from "./Bullet";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Enemy extends cc.Component {
    @property(cc.Prefab)
    rayPrefab:cc.Prefab = null;
    
    @property(cc.Node)
    bulletList:cc.Node[] = [];


    @property(GameCtrl)
    gameCtrl:GameCtrl = null;
    

    @property(EnemyManager)
    enemyManager:EnemyManager = null;
    
    @property(cc.RigidBody)
    body:cc.RigidBody = null;


    
    @property(cc.PhysicsBoxCollider)
    collider:cc.PhysicsBoxCollider = null;


    @property(cc.Sprite)
    tank_bottom:cc.Sprite = null;
    @property(cc.Sprite)
    tank_fire:cc.Sprite = null;


    @property(Number)
    curState:number = 2;
    
    
    @property(Number)
    enemy_type:number = 0;

    @property(Number)
    curTime:number = 2;

    @property(Number)
    checkInterval:number = 2;

    @property(Number)
    curFireTime:number = 2;

    @property(Number)
    checkFireInterval:number = 2;

    public ray:cc.Node = null
    public rayComPonent:Raycast = null

    @property(Number)
    curHp:number = 1;

    @property(Boolean)
    isDead:boolean = false;

    @property(Number)
    selfScore:number = 1;

    @property(Number)
    tempTime:number = 1;

    @property(Number)
    tempInterval:number = 1;


    onLoad() {
        this.body = this.getComponent(cc.RigidBody), this.collider = this.getComponent(cc.PhysicsBoxCollider), 
        this.body.fixedRotation = !0;
    }
    onDestroy() {}
    start() {
        this.enemy_type == Globaldef.EnemyType.E_RED && (this.checkFireInterval = 100 * Math.random() % 5 + 2), 
        this.checkState();
    }
    update(r) {
        
        if (true != GameData.instance.isPause && this.gameCtrl) {
            if (this.rayComPonent && this.gameCtrl) {
                var e = this.node.getPosition(),
                t = (n = this.gameCtrl.hero.node.getPosition()).sub(e);
                t.normalizeSelf();
                this.rayComPonent.setCenter(e.addSelf(t.mulSelf(10)))
                if (this.gameCtrl.hero.isDead)
                    this.rayComPonent.setTarget(0, 0); 
                else {
                    var n = this.gameCtrl.hero.node.getPosition();
                    this.rayComPonent.setTarget(n.x, n.y);
                }
            }
            if (this.curFireTime += r, this.curFireTime >= this.checkFireInterval && !this.gameCtrl.hero.isDead && this.enemy_type == Globaldef.EnemyType.E_RED)
             return this.curState = Globaldef.EnemyState.S_FIRE, 
            this.curFireTime = 0, void this.checkState();
            if (this.rayComPonent && this.rayComPonent.curCollider) switch (this.rayComPonent.curCollider.tag) {
              case Globaldef.TagType.WALL:
              case Globaldef.TagType.ENEMY:
                break;

              case Globaldef.TagType.HERO:
              case Globaldef.TagType.ITEM:
                return void (this.curFireTime >= this.checkFireInterval && (this.curState = Globaldef.EnemyState.S_FIRE, 
                this.curFireTime = 0, this.checkState()));
            }
            if (this.curTime += r, this.curTime >= this.checkInterval) return this.curTime = 0, 
            void this.checkState();
            if (this.gameCtrl) {
                var a = this.gameCtrl.hero.node.getPosition(), s = this.node.getPosition();
                400 > a.sub(s).mag() && this.refreshPaoAngle();
            }
        } else this.body.linearVelocity = cc.v2(0, 0);
    }
    init(a, e, t) {
        this.gameCtrl = e, this.enemyManager = t, this.isDead = !1, this.curHp = this.getMaxHp(),
        this.addRay();
    }
    reset() {
        this.curHp = this.getMaxHp(), this.isDead = !1, this.removeAllBullet(), this.body && (this.body.linearVelocity = cc.v2(0, 0));
    }
    getMaxHp() {
        return this.enemy_type == Globaldef.EnemyType.E_GRAY ? 2 : this.enemy_type == Globaldef.EnemyType.E_YELLOW ? 3 :
         this.enemy_type == Globaldef.EnemyType.E_BLUE ? 4 : this.enemy_type == Globaldef.EnemyType.E_RED ? 5 : (this.enemy_type, 
        Globaldef.EnemyType.E_T_POWER, 6);
    }
    onHP(n) {
        this.curHp += n, 0 >= this.curHp && (this.enemyManager.removeEnemy(this.node), this.ray.active = !1, 
        this.isDead = !0, this.removeAllBullet(), EffManager.instance.addDieEff(this.node.getPosition(), this.node), 
        TankDataMgr.instance.totalKillNum++);
    }
    removeAllBullet() {
        for (var n = 0; n < this.bulletList.length; n++) this.bulletList[n].active = !1;
        this.curFireTime = 0;
    }
    checkState() {
        if (true != GameData.instance.isPause) switch (this.curState) {
          case Globaldef.EnemyState.S_FIRE:
            var a = this.gameCtrl.hero.node.getPosition(), e = this.node.getPosition(), t = a.sub(e);
            t.normalizeSelf(), this.fire(t, e), this.curState = Globaldef.EnemyState.S_PATROL;
            break;

          case Globaldef.EnemyState.S_IDLE:
          case Globaldef.EnemyState.S_PATROL:
            this.changeMoveDir();
            break;

          case Globaldef.EnemyState.S_DEAD:
        } else console.log("can not checkState, game is pause");
    }

    private bullet_prefab:cc.Prefab = null;
    private bullet_prefab_yellow:cc.Prefab = null;

    private bullet_prefab_blue:cc.Prefab = null;
    private bullet_prefab_pao:cc.Prefab = null;
    private bullet_prefab_power:cc.Prefab = null;


    fire(a, e) {
        // return;

        this.enemy_type == Globaldef.EnemyType.E_GRAY ? this.bullet_prefab ? this.createBullet(this.bullet_prefab, a, e) : cc.loader.loadRes("prefabs/bullet_gray", function(t, n) {
            t ? cc.error(t.message || t) : (this.bullet_prefab = n, this.createBullet(this.bullet_prefab, a, e));
        }.bind(this)) : this.enemy_type == Globaldef.EnemyType.E_YELLOW ? this.bullet_prefab_yellow ? this.createBullet(this.bullet_prefab_yellow, a, e) : cc.loader.loadRes("prefabs/bullet_yellow", function(t, n) {
            t ? cc.error(t.message || t) : (this.bullet_prefab_yellow = n, this.createBullet(this.bullet_prefab_yellow, a, e));
        }.bind(this)) : this.enemy_type == Globaldef.EnemyType.E_BLUE ? this.bullet_prefab_blue ? this.fireThree(this.bullet_prefab_blue, a, e, this.gameCtrl.bgImg.node) : cc.loader.loadRes("prefabs/bullet_blue", function(t, n) {
            t ? cc.error(t.message || t) : (this.bullet_prefab_blue = n, this.fireThree(this.bullet_prefab_blue, a, e, this.gameCtrl.bgImg.node));
        }.bind(this)) : this.enemy_type == Globaldef.EnemyType.E_RED ? this.bullet_prefab_pao ? this.firePao(this.bullet_prefab_pao, a, e, this.gameCtrl.bgImg.node) : cc.loader.loadRes("prefabs/bullet_pao", function(t, n) {
            t ? cc.error(t.message || t) : (this.bullet_prefab_pao = n, this.firePao(this.bullet_prefab_pao, a, e, this.gameCtrl.bgImg.node));
        }.bind(this)) : this.enemy_type == Globaldef.EnemyType.E_T_POWER && (this.bullet_prefab_power ? this.firePowerBomb(this.bullet_prefab_power, a, e, this.gameCtrl.bgImg.node) : cc.loader.loadRes("prefabs/bullet_bomb_enemy", function(t, n) {
            t ? cc.error(t.message || t) : (this.bullet_prefab_power = n, this.firePowerBomb(this.bullet_prefab_power, a, e, this.gameCtrl.bgImg.node));
        }.bind(this)));
    }
    fireThree(r, e, t, n) {
        if (!this.isDead) {
            var i = cc.v2(e.x, e.y), s = cc.v2(e.x, e.y).rotateSelf(.1), a = cc.v2(e.x, e.y).rotateSelf(-.1), l = this.node.getPosition().addSelf(i.mulSelf(50));
            this.createBullet(r, e, t, n, l), this.createBullet(r, s, t, n, l), this.createBullet(r, a, t, n, l);
        }
    }
    firePao(i, e, t, n, s:any = null) {
        if (!this.isDead) {
            var a = this.gameCtrl.hero.node.getPosition(), c = this.gameCtrl.hero.node.parent.convertToWorldSpaceAR(a), o = this.node.convertToNodeSpaceAR(c), r = cc.instantiate(i);
            r.parent = n;
            var l = e.mulSelf(50);
            o = o.subSelf(l);
            var p = this.node.getPosition().addSelf(l);
            s ? r.setPosition(s.x, s.y) : r.setPosition(p.x, p.y), this.bulletList.push(r);
            var g = r.getComponent("Bullet_pao");
            g.setTargetType(Globaldef.TagType.HERO), g.setTarget(o, a), this.refreshPaoAngle();
        }
    }
    fllow_move:boolean = false;
    firePowerBomb(i, e, t, n) {
        if (!this.isDead) {
            this.fllow_move = !1, e = e.normalize();
            var s = this.gameCtrl.hero.node.getPosition(), a = this.gameCtrl.hero.node.parent.convertToWorldSpaceAR(s), o = this.node.convertToNodeSpaceAR(a), r = cc.instantiate(i);
            this.bulletList.push(r), r.active = !0, r.parent = n;
            var l = e.mul(50);
            o = o.subSelf(l);
            var c = this.node.getPosition().addSelf(l);
            r.setPosition(c.x, c.y);
            var g = r.getComponent(cc.RigidBody);
            g.linearVelocity = cc.v2(300 * e.x, 300 * e.y), g.fixedRotation = !0;
            var d = r.getComponent("Bullet_power");
            d.bullet_type = Globaldef.BULLET_TYPE.E_POWER_BOMB, d.refreshAngle(), EffManager.instance.addFireEff(r.getPosition(), this.node), 
            this.refreshPaoAngle();
        }
    }
    createBullet(n, e:any = null,x = null,y = null,z = null) {
        var t = cc.instantiate(n);
        t.parent = this.gameCtrl.bgImg.node, t.group = "bullet_enemy";
        var o = this.node.getPosition();
        o.x += 30 * e.x, o.y += 30 * e.y, t.setPosition(o.x, o.y), this.bulletList.push(t);
        var i = t.getComponent(cc.RigidBody);
        i.linearVelocity = cc.v2(300 * e.x, 300 * e.y), i.fixedRotation = !0, t.getComponent(Bullet).refreshAngle(), 
        this.refreshPaoAngle();

        console.log(t,"bullet");
    }
    refreshPaoAngle() {
        var a = this.gameCtrl.hero.node.getPosition(), e = this.node.getPosition(), t = a.sub(e), n = cc.v2(1, 0), o = Math.atan2(t.y - n.y, t.x - n.x) * (180 / Math.PI);
        this.tank_fire.node.rotation = -o;
    }
    changeMoveDir() {
        var o = 1280 * Math.random() % 1135 + this.node.x - 500, e = 720 * Math.random() % 720 + this.node.y - 500, t = this.node.getPosition(), n = cc.v2(o, e).sub(t).normalizeSelf();
        this.body.linearVelocity = cc.v2(100 * n.x, 100 * n.y);
        var i = cc.v2(this.body.linearVelocity.x, this.body.linearVelocity.y), r = cc.v2(1, 0), a = Math.atan2(i.y - r.y, i.x - r.x) * (180 / Math.PI);
        // console.log(this.tank_bottom);
        this.tank_bottom &&this.tank_bottom.node.rotation = -a;
    }
    stopMove() {
        this.body.linearVelocity = cc.v2(0, 0);
    }

    private sprite:cc.Sprite = null;

    move(n, e) {
        console.log(this.sprite,'==this.sprite==');
        this.body.linearVelocity = n.mulSelf(.7), this.sprite.node.rotation = -e;
    }

    onPostSolve(n) {
        var e = n.colliderA.tag;
        // console.log("碰撞",e)

        switch (this.collider == n.colliderA && (e = n.colliderB.tag), e) {

          case Globaldef.TagType.WALL:
            var t = Date.now() / 1e3;
            if (0 == this.tempTime && (this.tempTime = t), t - this.tempTime < this.tempInterval) return;
            this.tempTime = t, this.changeMoveDir();
            break;

          case Globaldef.TagType.ENEMY:
          case Globaldef.TagType.HERO:
        }
    }

    

    addRay() {
        this.ray = cc.instantiate(this.rayPrefab), this.ray.parent = this.gameCtrl.bgImg.node, 
        this.rayComPonent = this.ray.getComponent(Raycast), this.node.getPosition(), 
        this.node.convertToWorldSpaceAR(cc.v2(0, 0)),
        console.log("cncdf",this.node.x,this.node.y)
        this.rayComPonent.setCenter(this.node.x, this.node.y);
        var n = this.gameCtrl.hero.node.getPosition();
        this.rayComPonent.setTarget(n.x, n.y), this.ray.setPosition(0, 0);
    }

}