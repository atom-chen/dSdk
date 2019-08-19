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
export default class LoadMap1 extends cc.Component {

    tiledMap:cc.TiledMap = null;
    onLoad () {

    }

    start() {
        this.node.position = StageDataMgr.MAP_POS;
        this.tiledMap = this.node.getComponent(cc.TiledMap);
        if(GameUtils.instance.tiledMapAsset != null){
            this.tiledMap.tmxAsset = GameUtils.instance.tiledMapAsset;
        }
        this.loadMap();
    }

    index = 1;

    onBeginContact(e, t, o) {
        if(o.tag == Common.Tag.tagCubeBox){
            if(o.getComponent(cc.RigidBody).linearVelocity.mag() >= 300){
                AudioManager.instance.playSound("road_pz");
            }
        }
        // o.tag == Common.Tag.tagCubeBox && o.getComponent(cc.RigidBody).linearVelocity.mag() >= 300 && 
    }
    loadMap() {
        // return;
        var obj = this.tiledMap.getObjectGroup("obj");
        // debugger;

        // let offSet= cc.v2(0,0);
        // if(StageDataMgr.CUR_LEVEL <= 32 && StageDataMgr.CUR_MODE == MODE_TYPE_STRUCT.MODE1){
        //     offSet.x = -400;
        //     offSet.y = -896;
        // }else{
        //     offSet.x = - 540 - 256;
        //     offSet.y = -960 - 512 + 32;
        // }

        // console.log(offSet,"fffff")
        if(obj){
            var objects = obj.getObjects();
            let tileSize = this.tiledMap.getTileSize();
            let mapSize = this.tiledMap.getMapSize();
            for(let i = 0; i < objects.length; i ++){
                let objectItem = objects[i];
                let points = objects[i].points;
                let pointsArr = [];
                let physicsPolygonCollider = this.node.addComponent(cc.PhysicsPolygonCollider);
                for(let count = 0;count < points.length;count ++){
                    pointsArr.push(cc.v2(points[count].x + objectItem.offset.x, -points[count].y + (tileSize.height * mapSize.height - objectItem.offset.y)));
                }
                physicsPolygonCollider.tag = Common.Tag.tagPlat;

                var p = StageDataMgr.CUR_LEVEL, h = StageDataMgr.CUR_MODE;
                    55 == p && h ==MODE_TYPE_STRUCT.MODE1 ? physicsPolygonCollider.restitution = 1 :
                     51 != p && 54 != p && 68 != p && 69 != p || h != MODE_TYPE_STRUCT.MODE2 ?
                     77 == p && h == MODE_TYPE_STRUCT.MODE2 ? physicsPolygonCollider.restitution = .3 :
                      physicsPolygonCollider.restitution = 0 : physicsPolygonCollider.restitution = .45, 
                    physicsPolygonCollider.friction = .5,

                physicsPolygonCollider.points = pointsArr;
                physicsPolygonCollider.apply();
            }
        }

    }


    // update (dt) {}
}
