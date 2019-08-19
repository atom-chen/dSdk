import SoundMgr from "../SoundMgr";
import SoundsManager from "../gamecore/managers/SoundsManager";
import GameManager from "../gamecore/managers/GameManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class EffManager extends cc.Component {

    private static _instance: EffManager = null;
    //====================单例=============================================================
    public static get instance(): EffManager {
      if (!EffManager._instance) EffManager._instance = new EffManager();
  
      return EffManager._instance;
    }



    public bombFirePrefab:cc.Prefab = null;
    public bombHitPrefab:cc.Prefab = null;
    public bombDiePrefab:cc.Prefab = null;


    addFireEff(o, e) {
        if (this.bombFirePrefab) {
            var t = cc.instantiate(this.bombFirePrefab);
            t.parent = e.parent, t.zIndex = 600, t.setPosition(o), t.setScale(2, 2);
        } else cc.loader.loadRes("prefabs/bomb_fire", function(t, n) {
            if (t) cc.error(t.message || t); else {
                this.bombFirePrefab = n;
                var a = cc.instantiate(n);
                a.zIndex = 600, a.parent = e.parent, a.setPosition(o), a.setScale(2, 2);
            }
        }.bind(this));
        // GameManager.soundsManager.playSound("canon_fire_a.MP3", !1,"", .5);
    }
    addHitEff(a, e) {
        if (this.bombHitPrefab) {
            var t = cc.instantiate(this.bombHitPrefab);
            t.parent = e.parent, t.zIndex = 600, t.setPosition(a), t.setScale(2, 2);
        } else cc.loader.loadRes("prefabs/bomb_hit", function(t, n) {
            if (t) cc.error(t.message || t); else {
                this.bombHitPrefab = n;
                var o = cc.instantiate(n);
                o.zIndex = 600, o.parent = e.parent, o.setPosition(a), o.setScale(2, 2);
            }
        }.bind(this));
    }
    addDieEff(o, e) {
        if (this.bombDiePrefab) {
            var t = cc.instantiate(this.bombDiePrefab);
            t.parent = e.parent, t.zIndex = 600, t.setPosition(o), t.setScale(2, 2);
        } else cc.loader.loadRes("prefabs/bomb_die", function(t, n) {
            if (t) cc.error(t.message || t); else {
                this.bombDiePrefab = n;
                var a = cc.instantiate(n);
                a.zIndex = 600, a.parent = e.parent, a.setPosition(o), a.setScale(2, 2);
            }
        }.bind(this));
        GameManager.soundsManager.playSound("explosion_a.MP3", !1,"", .5);
    }
}