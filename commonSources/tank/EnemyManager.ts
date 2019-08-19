import GameCtrl from "./GameCtrl";
import GameData from "./GameData";
import Globaldef from "./Globaldef";

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
export default class EnemyManager extends cc.Component {
    @property(cc.Prefab)
    m_bullet:cc.Prefab = null;
    
    @property(cc.Prefab)
    m_prefab_dong:cc.Prefab = null;

    @property(GameCtrl)
    m_gameCtrl:GameCtrl = null;

    @property(Number)
    maxEnemyNum:number = 2;
    
    @property(cc.Node)
    enemyGeneratePoint:cc.Node[] = [];
    
    @property(cc.Node)
    m_enemyList:cc.Node[] = [];

    @property(cc.TiledMap)
    tiledMapCom:cc.TiledMap = null;
    
    tiledPointGroup:any = null;
    

    init(n) {
        this.m_gameCtrl = n, cc.director.getPhysicsManager().enabled = !0;
    }
    reset() {
        var i = cc.find("Canvas/bg/TiledMap");
        40 > GameData.instance.m_curLevel && (i.x = 350), this.tiledMapCom = i.getComponent(cc.TiledMap), 
        this.tiledPointGroup = this.tiledMapCom.getObjectGroup("point"), this.tiledPointGroup.enabled = !1, 
        this.setTerrainLevel(), this.removeAll();
        var e = this.tiledPointGroup.getObjects();
        GameData.instance.m_curMaxMon = e.length;
        for (var t = 0; t < GameData.instance.m_curMaxMon; t++) if ("hero" != e[t].name) {
            var n = e[t].x + this.node.x, s = e[t].y + this.node.y, a = cc.v2(n, s), c = e[t].mon_type, o = e[t].self, r = e[t].next, l = this.getEnemyByType(c);
            l ? (l.node.active = !0, l.reset(), l.node.setPosition(a)) : this.addEnemy(a, c, o, r);
        }
    }

    private m_prefab:cc.Prefab = null;
    private m_prefab_yellow:cc.Prefab = null;
    private m_prefab_blue:cc.Prefab = null;
    private m_prefab_red:cc.Prefab = null;
    private m_prefab_power:cc.Prefab = null;
    private m_prefab_box:cc.Prefab = null;
    private m_prefab_box_xue:cc.Prefab = null;
    private m_prefab_box_normal:cc.Prefab = null;
    private m_prefab_tong_xue:cc.Prefab = null;
    private m_prefab_tong:cc.Prefab = null;
    private m_prefab_tree_1:cc.Prefab = null;
    private m_prefab_tree_2:cc.Prefab = null;
    private m_prefab_tree_3:cc.Prefab = null;
    private m_prefab_tree_4:cc.Prefab = null;
    private m_prefab_tree_5:cc.Prefab = null;
    private m_prefab_tree_6:cc.Prefab = null;
    private m_prefab_wall_1:cc.Prefab = null;
    private m_prefab_wall_2:cc.Prefab = null;
    private m_prefab_tree_8:cc.Prefab = null;
    private m_prefab_tree_9:cc.Prefab = null;



    addEnemy(o, e, t, n) {
        e == Globaldef.EnemyType.E_GRAY ? this.m_prefab ? this.createEnemy(o, this.m_prefab, e) :
         
cc.loader.loadRes("prefabs/enemy", function(t, n) {
            t ? cc.error(t.message || t) : (this.m_prefab = n, this.createEnemy(o, n, e));
        }.bind(this)) : e == Globaldef.EnemyType.E_YELLOW ? this.m_prefab_yellow ? this.createEnemy(o, this.m_prefab_yellow, e) :
         
cc.loader.loadRes("prefabs/enemy_yellow", function(t, n) {
            t ? cc.error(t.message || t) : (this.m_prefab_yellow = n, this.createEnemy(o, n, e));
        }.bind(this)) : e == Globaldef.EnemyType.E_BLUE ? this.m_prefab_blue ? this.createEnemy(o, this.m_prefab_blue, e) :
         
cc.loader.loadRes("prefabs/enemy_blue", function(t, n) {
            t ? cc.error(t.message || t) : (this.m_prefab_blue = n, this.createEnemy(o, n, e));
        }.bind(this)) : e == Globaldef.EnemyType.E_RED ? this.m_prefab_red ? this.createEnemy(o, this.m_prefab_red, e) :
         
cc.loader.loadRes("prefabs/enemy_red", function(t, n) {
            t ? cc.error(t.message || t) : (this.m_prefab_red = n, this.createEnemy(o, n, e));
        }.bind(this)) : e == Globaldef.EnemyType.E_T_POWER ? this.m_prefab_power ? this.createEnemy(o, this.m_prefab_power, e) :
         
cc.loader.loadRes("prefabs/enemy_power", function(t, n) {
            t ? cc.error(t.message || t) : (this.m_prefab_power = n, this.createEnemy(o, n, e));
        }.bind(this)) : e == Globaldef.EnemyType.E_BOX ? this.m_prefab_box ? this.createEnemy(o, this.m_prefab_box, e) : 
cc.loader.loadRes("prefabs/item_box", function(t, n) {
            t ? cc.error(t.message || t) : (this.m_prefab_box = n, this.createEnemy(o, n, e));
        }.bind(this)) : e == Globaldef.EnemyType.E_BOX_XUE ? this.m_prefab_box_xue ? this.createEnemy(o, this.m_prefab_box_xue, e) : 
cc.loader.loadRes("prefabs/item_xiangzi_xue", function(t, n) {
            t ? cc.error(t.message || t) : (this.m_prefab_box_xue = n, this.createEnemy(o, n, e));
        }.bind(this)) : e == Globaldef.EnemyType.E_BOX_NORMAL ? this.m_prefab_box_normal ? this.createEnemy(o, this.m_prefab_box_normal, e) : 
cc.loader.loadRes("prefabs/item_xiangzi", function(t, n) {
            t ? cc.error(t.message || t) : (this.m_prefab_box_normal = n, this.createEnemy(o, n, e));
        }.bind(this)) : e == Globaldef.EnemyType.E_TONG_XUE ? this.m_prefab_tong_xue ? this.createEnemy(o, this.m_prefab_tong_xue, e) : 
cc.loader.loadRes("prefabs/item_youtong_xue", function(t, n) {
            t ? cc.error(t.message || t) : (this.m_prefab_tong_xue = n, this.createEnemy(o, n, e));
        }.bind(this)) : e == Globaldef.EnemyType.E_TONG ? this.m_prefab_tong ? this.createEnemy(o, this.m_prefab_tong, e) : 
cc.loader.loadRes("prefabs/item_youtong", function(t, n) {
            t ? cc.error(t.message || t) : (this.m_prefab_tong = n, this.createEnemy(o, n, e));
        }.bind(this)) : e == Globaldef.EnemyType.E_DONG ? this.m_prefab_dong ? this.createEnemy(o, this.m_prefab_dong, e, t, n) : 
cc.loader.loadRes("prefabs/item_dong", function(i, r) {
            i ? cc.error(i.message || i) : (this.m_prefab_dong = r, this.createEnemy(o, r, e, t, n));
        }.bind(this)) : e == Globaldef.EnemyType.E_TREE_1 ? this.m_prefab_tree_1 ? this.createEnemy(o, this.m_prefab_tree_1, e) : 
cc.loader.loadRes("prefabs/item_tree", function(t, n) {
            t ? cc.error(t.message || t) : (this.m_prefab_tree_1 = n, this.createEnemy(o, n, e));
        }.bind(this)) : e == Globaldef.EnemyType.E_TREE_2 ? this.m_prefab_tree_2 ? this.createEnemy(o, this.m_prefab_tree_2, e) : 
cc.loader.loadRes("prefabs/item_tree1", function(t, n) {
            t ? cc.error(t.message || t) : (this.m_prefab_tree_2 = n, this.createEnemy(o, n, e));
        }.bind(this)) : e == Globaldef.EnemyType.E_TREE_3 ? this.m_prefab_tree_3 ? this.createEnemy(o, this.m_prefab_tree_3, e) : 
cc.loader.loadRes("prefabs/item_tree2", function(t, n) {
            t ? cc.error(t.message || t) : (this.m_prefab_tree_3 = n, this.createEnemy(o, n, e));
        }.bind(this)) : e == Globaldef.EnemyType.E_TREE_4 ? this.m_prefab_tree_4 ? this.createEnemy(o, this.m_prefab_tree_4, e) : 
cc.loader.loadRes("prefabs/item_tree_xueren", function(t, n) {
            t ? cc.error(t.message || t) : (this.m_prefab_tree_4 = n, this.createEnemy(o, n, e));
        }.bind(this)) : e == Globaldef.EnemyType.E_TREE_5 ? this.m_prefab_tree_5 ? this.createEnemy(o, this.m_prefab_tree_5, e) : 
cc.loader.loadRes("prefabs/item_tree_wuzi", function(t, n) {
            t ? cc.error(t.message || t) : (this.m_prefab_tree_5 = n, this.createEnemy(o, n, e));
        }.bind(this)) : e == Globaldef.EnemyType.E_TREE_6 ? this.m_prefab_tree_6 ? this.createEnemy(o, this.m_prefab_tree_6, e) : 
cc.loader.loadRes("prefabs/item_tree4", function(t, n) {
            t ? cc.error(t.message || t) : (this.m_prefab_tree_6 = n, this.createEnemy(o, n, e));
        }.bind(this)) : e == Globaldef.EnemyType.E_WALL_1 ? this.m_prefab_wall_1 ? this.createEnemy(o, this.m_prefab_wall_1, e) : 
cc.loader.loadRes("prefabs/item_wall", function(t, n) {
            t ? cc.error(t.message || t) : (this.m_prefab_wall_1 = n, this.createEnemy(o, n, e));
        }.bind(this)) : e == Globaldef.EnemyType.E_WALL_2 ? this.m_prefab_wall_2 ? this.createEnemy(o, this.m_prefab_wall_2, e) : 
cc.loader.loadRes("prefabs/item_wall_2", function(t, n) {
            t ? cc.error(t.message || t) : (this.m_prefab_wall_2 = n, this.createEnemy(o, n, e));
        }.bind(this)) : e == Globaldef.EnemyType.E_TREE_8 ? this.m_prefab_tree_8 ? this.createEnemy(o, this.m_prefab_tree_8, e) : 
cc.loader.loadRes("prefabs/item_tree8", function(t, n) {
            t ? cc.error(t.message || t) : (this.m_prefab_tree_8 = n, this.createEnemy(o, n, e));
        }.bind(this)) : e == Globaldef.EnemyType.E_TREE_9 && (this.m_prefab_tree_9 ? this.createEnemy(o, this.m_prefab_tree_9, e) : 
cc.loader.loadRes("prefabs/item_tree9", function(t, n) {
            t ? cc.error(t.message || t) : (this.m_prefab_tree_9 = n, this.createEnemy(o, n, e));
        }.bind(this)));
    }
    createEnemy(s, e, t, n:any = null, i:any = null) {
        var a = cc.instantiate(e);
        a.parent = this.m_gameCtrl.bgImg.node, a.setPosition(s), a.active = !0, a.zIndex = 500;
        var l = a.getComponent("Enemy");
        l || (l = a.getComponent("EnemyItem")), 4 <= t && t <= Globaldef.EnemyType.E_MAX && (a.zIndex = 1220 - s.y), 
        t == Globaldef.EnemyType.E_DONG && (a.zIndex = 1, l.selfIdx = n, l.nextIdx = i), l.enemy_type = t, 
        l.init(s, this.m_gameCtrl, this), this.m_enemyList.push(a);
    }
    getEnemyByIdx(n) {
        return 0 > n || n >= this.m_enemyList.length ? null : this.m_enemyList[n];
    }
    getEnemyNearest(s) {
        for (var e = null, t = 1e3, n = 0; n < this.m_enemyList.length; n++) {
            var i = this.m_enemyList[n], a = i.getComponent("Enemy");
            if (a && (a.enemy_type == Globaldef.EnemyType.E_GRAY || a.enemy_type == Globaldef.EnemyType.E_YELLOW ||
                 a.enemy_type == Globaldef.EnemyType.E_BLUE || a.enemy_type == Globaldef.EnemyType.E_RED) && a && true == i.active) {
                if (null == e) {
                    e = a;
                    continue;
                }
                var l = cc.v2(s.x, s.y).sub(a.node.getPosition()).mag();
                l < t && (t = l, e = a);
            }
        }
        return e;
    }
    getEnemyByType(a) {
        for (var e = 0; e < this.m_enemyList.length; e++) {
            var t = this.m_enemyList[e],
            
            n = t.getComponent("Enemy");
            if (n || (n = t.getComponent("EnemyItem")), n && n.enemy_type == a && false == t.active) return n;
        }
        return null;
    }
    getDongByIdx(a) {
        for (var e, n = 0; n < this.m_enemyList.length; n++) if (e = this.m_enemyList[n].getComponent("EnemyItem"), 
        e && e.enemy_type == Globaldef.EnemyType.E_DONG && e.selfIdx == a) return e;
        return null;
    }
    getEnemyCount() {
        return this.m_enemyList.length;
    }
    removeEnemy(a) {
        if (a) {
            for (var e = !0, t = 0; t < this.m_enemyList.length; t++) if (this.m_enemyList[t] == a) {
                this.m_enemyList.splice(t, 1), a.active = !1;
                var n = a.getComponent("Enemy");
                n || (e = !1, n = a.getComponent("EnemyItem")), GameData.instance.addScore(n.selfScore);
                break;
            }
            true == e && this.m_gameCtrl.checkGameState();
        }
    }
    removeAll() {
        for (var n, t = 0; t < this.m_enemyList.length; t++) n = this.m_enemyList[t].getComponent("Enemy"), 
        n && n.removeAllBullet(), this.m_enemyList[t].active = !1;
    }
    removeAllBullet() {
        for (var n, t = 0; t < this.m_enemyList.length; t++) n = this.m_enemyList[t].getComponent("Enemy"), 
        n && n.removeAllBullet();
    }
    checkState() {
        for (var n, t = 0; t < this.m_enemyList.length; t++) n = this.m_enemyList[t].getComponent("Enemy"), 
        n && n.checkState();
    }
    isAllDead() {
        for (var n, t = 0; t < this.m_enemyList.length; t++) if (n = this.m_enemyList[t].getComponent("Enemy"), 
        n || (n = this.m_enemyList[t].getComponent("EnemyItem")), !(n.enemy_type >= Globaldef.EnemyType.E_BOX && n.enemy_type < Globaldef.EnemyType.E_MAX) &&
         true == this.m_enemyList[t].active) return !1;
        return !0;
    }
    setTerrainLevel() {
        var a = cc.find("Canvas/bg/TiledMap/terrain");
        a ? a.setSiblingIndex(0) : cc.log("Get terrain Error!");
        var e = cc.find("Canvas/bg/TiledMap/shadow");
        e && e.setSiblingIndex(1);
        var t = cc.find("Canvas/bg/TiledMap/石头");
        t && t.setSiblingIndex(2);
        var n = cc.find("Canvas/bg/TiledMap/石头2");
        n && n.setSiblingIndex(3);
        var o = cc.find("Canvas/bg/TiledMap/tree");
        o || (o = cc.find("Canvas/bg/TiledMap/树")), o && o.setSiblingIndex(4);
    }




}
