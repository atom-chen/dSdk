import GameCtrl from "./GameCtrl";
import Globaldef from "./Globaldef";
import GameData from "./GameData";
import EnemyManager from "./EnemyManager";
import EffManager from "./EffManager";
import Hero_physic from "./Hero_physic";
import Enemy from "./Enemy";

const {ccclass, property} = cc._decorator;

@ccclass
export default class EnemyItem extends cc.Component {

    @property(GameCtrl)
    gameCtrl:GameCtrl = null;
    
    @property(EnemyManager)
    enemyManager:EnemyManager = null;
    
    @property(cc.RigidBody)
    body:cc.RigidBody = null;
    
    @property(cc.PhysicsBoxCollider)
    collider:cc.PhysicsBoxCollider = null;

    @property(Number)
    curState:number = 2
    // curState: Globaldef.EnemyState.S_PATROL,

    @property(Number)
    enemy_type:number = 0

    @property(Number)
    curHp:number = 2


    @property(Boolean)
    isDead:boolean = false;
    

    @property(Number)
    selfScore:number = 2

    @property(cc.Node)
    normalImg:cc.Node = null;
    @property(cc.Node)

    brokeImg:cc.Node = null;

    private startCD:any = false;
    private transTime:number = 0.5;
    private curTime:number = 0;
    public canNotTrans:any = false;
    public lastTransObj:cc.Node = null;
    public canNotTransCD:boolean = false;
    public canNotTransInterval:number = 1;
    public canNotTransCurTime:number = 0;

    onLoad() {
        this.body = this.getComponent(cc.RigidBody),
         this.collider = this.getComponent(cc.PhysicsBoxCollider), 
        this.body.fixedRotation = !0, this.startCD = !1, this.transTime = .5,
         this.curTime = 0, 
        this.canNotTrans = !1, this.lastTransObj = null, this.canNotTransCD = !1,
         this.canNotTransInterval = 1, 
        this.canNotTransCurTime = 0;
    }
    onDestroy() {}
    start() {}
    update(n) {
        if (true != GameData.instance.isPause) return 1 == this.canNotTrans ? (this.canNotTransCurTime += n, 
        void (this.canNotTransCurTime >= this.canNotTransInterval && (this.canNotTransCurTime = 0, 
        this.canNotTrans = !1))) : void (1 == this.startCD && (this.curTime += n, this.curTime >= this.transTime && (this.startCD = !1, 
        this.curTime = 0, this.transPos())));
    }
    init(a, e, t) {
        this.gameCtrl = e, this.enemyManager = t, this.isDead = !1, this.curHp = this.getMaxHp(), 
        this.selfScore = 0;
        var n = parseInt("" + a.x / 40), o = parseInt("" + a.y / 40);
        this.node.x = 40 * n + 10, this.node.y = 40 * o + 20;
    }
    reset() {
        this.curHp = this.getMaxHp(), this.isDead = !1, this.body && (this.body.linearVelocity = cc.v2(0, 0)), 
        this.showNormal();
    }
    getMaxHp() {
        return this.enemy_type == Globaldef.EnemyType.E_BOX ? 2 : this.enemy_type == Globaldef.EnemyType.E_BOX_XUE ? 2 :
         this.enemy_type == Globaldef.EnemyType.E_BOX_NORMAL ? 2 : this.enemy_type == Globaldef.EnemyType.E_TONG_XUE ? 2 : (this.enemy_type, 
        Globaldef.EnemyType.E_TONG, 2);
    }
    onHP(n) {
        this.curHp += n, 0 >= this.curHp && (this.enemyManager && this.enemyManager.removeEnemy(this.node), 
        this.isDead = !0, EffManager.instance.addDieEff(this.node.getPosition(), this.node), this.node.active = !1), 
        this.curHp < this.getMaxHp() && this.showBroke();
    }
    showNormal() {
        this.normalImg && (this.normalImg.active = !0), this.brokeImg && (this.brokeImg.active = !1);
    }
    showBroke() {
        this.normalImg && (this.normalImg.active = !1), this.brokeImg && (this.brokeImg.active = !0);
    }
    public hitObj:Hero_physic = null;
    onBeginContact(a, e, t) {
        switch (e.tag) {
          case Globaldef.TagType.DONG:
            var n = t.node.getComponent(Hero_physic);
            n || (n = t.node.getComponent(Enemy)), 1 == this.canNotTrans ? (this.startCD = !1, 
            this.curTime = 0) : (this.hitObj = n, this.startCD = !0, this.curTime = 0);
        }
    }
    onEndContact(n, e) {
        switch (e.tag) {
          case Globaldef.TagType.DONG:
            this.startCD = !1, this.curTime = 0;
        }
    }
    private nextIdx:any = null;
    transPos() {
        if (this.enemyManager) {
            var n = this.enemyManager.getDongByIdx(this.nextIdx);
            if (n && this.hitObj) {
                this.startCD = !1, this.curTime = 0, n.canNotTrans = !0, n.lastTransObj = this.hitObj.node, 
                this.hitObj.stopMove(), this.hitObj.node.scaleX = .1, this.hitObj.node.scaleY = .1, 
                this.hitObj.node.stopAllActions();
                var e = cc.scaleTo(.3, 1);
                this.hitObj.node.runAction(e), this.hitObj.node.setPosition(n.node.getPosition());
            }
        }
    }

}