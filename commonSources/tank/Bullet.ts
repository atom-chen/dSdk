import Globaldef from "./Globaldef";
import EffManager from "./EffManager";
import Enemy from "./Enemy";
import Hero_physic from "./Hero_physic";
import EnemyItem from "./EnemyItem";

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
export default class Bullet extends cc.Component {
    @property(cc.Prefab)
    bombPrefab:cc.Prefab = null;
    
    @property(Number)
    canColNum:number = 2;
    
    @property(cc.Sprite)
    sprite:cc.Sprite = null;

    @property(cc.RigidBody)
    body:cc.RigidBody = null;
    
    @property(cc.PhysicsBoxCollider)
    collider:cc.PhysicsBoxCollider = null;


    onLoad() {
        this.body = this.getComponent(cc.RigidBody), this.collider = this.getComponent(cc.PhysicsBoxCollider);
    }

    private bullet_type:number = 0;
    start() {
        this.bullet_type = 0;
    }
    refreshAngle() {
        var a = cc.v2(this.body.linearVelocity.x, this.body.linearVelocity.y),
        e = cc.v2(1, 0), t = Math.atan2(a.y - e.y, a.x - e.x) * (180 / Math.PI);
        this.sprite.node.rotation = -t;
    }

    onEndContact() {
        this.refreshAngle();
    }
    onPreSolve(s, e, l) {
        var n = s.colliderA.tag;
        this.collider == s.colliderA && (n = s.colliderB.tag);
        switch (n) {
        //   case Globaldef.TagType.BULLET:
          case Globaldef.TagType.WALL:
            break;

          case Globaldef.TagType.ENEMY:
            if (this.collider.tag == Globaldef.TagType.BULLET_HERO) {
                EffManager.instance.addHitEff(this.node.getPosition(), this.node), this.node.active = !1;
                var a = l.getComponent(Enemy);
                return void (a && a.onHP(-1));
            }
            this.collider.tag, Globaldef.TagType.BULLET_ENEMY;
            break;

          case Globaldef.TagType.HERO:
            if (this.collider.tag == Globaldef.TagType.BULLET_HERO) {} else if (this.collider.tag == Globaldef.TagType.BULLET_ENEMY) {
                EffManager.instance.addHitEff(this.node.getPosition(), this.node), this.node.active = !1;
                var d = l.getComponent(Hero_physic);
                d && d.onHP(-1);
            }
            break;

          case Globaldef.TagType.ITEM:
            if (this.collider.tag == Globaldef.TagType.BULLET_HERO || this.collider.tag == Globaldef.TagType.BULLET_ENEMY) {
                EffManager.instance.addHitEff(this.node.getPosition(), this.node), this.node.active = !1;
                var o = l.getComponent(EnemyItem);
                o && o.onHP(-1);
            }
        }

        this.canColNum--;
        0 >= this.canColNum && (EffManager.instance.addHitEff(this.node.getPosition(), this.node)
        , 



        this.node.active = false)
        
        ;
    }

}
