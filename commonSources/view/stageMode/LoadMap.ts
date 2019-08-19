// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
import Common from "./Common";
import AudioManager from "./AudioManager";
import GameUtils from "../../GameUtils";
import StageDataMgr from "../../module/data/StageDataMgr";
import { MODE_TYPE_STRUCT } from "./GameConfig";


const {ccclass, property} = cc._decorator;

@ccclass
export default class LoadMap extends cc.Component {

    tiledMap:cc.TiledMap = null;
    // onLoad () {}

    start() {
        this.tiledMap = this.node.getComponent(cc.TiledMap);
        this.loadMap();
    }
    index = 1;

    onBeginContact(e, t, o) {
        if(o.tag == Common.Tag.tagCubeBox){
            if(o.getComponent(cc.RigidBody).linearVelocity.mag() >= 300){
                AudioManager.instance.playSound("road_pz");
            }
        }
    }
    loadMap = function() {
        var e = this.tiledMap.getObjectGroup("obj");
        // debugger;

        let offSet= cc.v2(0,0);
        if(StageDataMgr.CUR_LEVEL <= 32 && StageDataMgr.CUR_MODE == MODE_TYPE_STRUCT.MODE1){
            offSet.x = -400;
            offSet.y = -896;
        }else{
            offSet.x = - 540 - 256;
            offSet.y = -960 - 512 + 32;
        }

        if(e){
            var t = e.getObjects();
            let r = this.tiledMap.getTileSize();
            let c = this.tiledMap.getMapSize();
            for(let o = 0; o < t.length; o ++){
                let l = t[o],i = t[o].points;
                let s = [];
                let d = this.node.addComponent(cc.PhysicsPolygonCollider);

                for(let u = 0;u < i.length;u ++){
                    // s.push(cc.v2(i[u].x + l.offset.x - 400, -i[u].y + (r.height * c.height - l.offset.y - 896)));
                    // s.push(cc.v2(i[u].x + l.offset.x - 1080 + 256, -i[u].y + (r.height * c.height - l.offset.y - 1920 + 512)));
                    s.push(cc.v2(i[u].x + l.offset.x + offSet.x, -i[u].y + (r.height * c.height - l.offset.y + offSet.y)));
                }
                d.tag = Common.Tag.tagPlat;
                d.points = s, d.apply();
            }
        }
    }
    // update (dt) {}
}
