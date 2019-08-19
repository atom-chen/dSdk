// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
import { MODE_TYPE_STRUCT } from "./GameConfig";
import StageDataMgr from "../../module/data/StageDataMgr";


const {ccclass, property} = cc._decorator;

@ccclass
export default class MoveNode extends cc.Component {
    // onLoad () {}



    private actions = {
        [MODE_TYPE_STRUCT.MODE1] : {
            [41] : () => {
                
            }
        }
    }

    start(){
        {
            let e =  StageDataMgr.CUR_LEVEL;
            let t = StageDataMgr.CUR_MODE;
            if (t == MODE_TYPE_STRUCT.MODE1){
            if (41 == e) {
                var o = cc.winSize.width - this.node.width;
                this.node.runAction(cc.sequence(cc.moveBy(10, cc.v2(+o, 0)), cc.moveBy(10, cc.v2(-o, 0))).repeatForever());
            }
            else 49 == e || 25 == e ? this.node.runAction(cc.sequence(cc.moveBy(2, cc.v2(0, 500)), cc.moveBy(2, cc.v2(0, -500))).repeatForever()) :
            50 == e ? this.node.runAction(cc.sequence(cc.moveBy(3, cc.v2(0, -1e3)), cc.moveBy(3, cc.v2(0, 1e3))).repeatForever()) :
            59 == e ? this.node.runAction(cc.sequence(cc.moveBy(1.5, cc.v2(0, 150)), cc.moveBy(1.5, cc.v2(0, -150))).repeatForever()) :
            65 == e ? this.node.runAction(cc.sequence(cc.moveBy(2, cc.v2(0, -300)), cc.moveBy(2, cc.v2(0, 300))).repeatForever()) :
            71 == e ? this.node.runAction(cc.sequence(cc.moveBy(3, cc.v2(700, 0)), cc.moveBy(3, cc.v2(-700, 0))).repeatForever()) : 
            88 == e ? this.node.runAction(cc.sequence(cc.moveBy(2, cc.v2(700, 0)), cc.moveBy(2, cc.v2(-700, 0))).repeatForever()) :
            108 == e ? this.node.runAction(cc.sequence(cc.moveBy(2, cc.v2(300, 0)), cc.moveBy(2, cc.v2(-300, 0))).repeatForever()) :
            114 == e ? this.node.runAction(cc.sequence(cc.moveBy(4, cc.v2(700, 0)), cc.moveBy(4, cc.v2(-700, 0))).repeatForever()) :
            123 == e ? this.node.runAction(cc.sequence(cc.moveBy(2, cc.v2(0, 200)), cc.moveBy(2, cc.v2(0, -200))).repeatForever()) :
            125 == e ? this.node.runAction(cc.sequence(cc.moveBy(2, cc.v2(0, 600)), cc.moveBy(2, cc.v2(0, -600))).repeatForever()) :
            134 == e && "t1" == this.node.name ? this.node.runAction(cc.sequence(cc.moveBy(1.5, cc.v2(-150, 0)), cc.moveBy(1.5, cc.v2(150, 0))).repeatForever()) :
            134 == e && "t2" == this.node.name ? this.node.runAction(cc.sequence(cc.moveBy(1.5, cc.v2(200, 0)), cc.moveBy(1.5, cc.v2(-200, 0))).repeatForever()) : 
            136 == e ? this.node.runAction(cc.sequence(cc.moveBy(2, cc.v2(0, 400)), cc.moveBy(2, cc.v2(0, -400))).repeatForever()) :
            137 == e ? this.node.runAction(cc.sequence(cc.moveBy(2, cc.v2(150, 0)), cc.moveBy(2, cc.v2(-150, 0))).repeatForever()) :
            138 == e && "t1" == this.node.name ? this.node.runAction(cc.sequence(cc.moveBy(1.5, cc.v2(0, -200)),
            cc.moveBy(1.5, cc.v2(0, 200))).repeatForever()) :
            138 == e && "t2" == this.node.name ?this.node.runAction(cc.sequence(cc.moveBy(1.5, cc.v2(0, 200)), cc.moveBy(1.5, cc.v2(0, -200))).repeatForever()) :
            143 == e ? this.node.runAction(cc.sequence(cc.moveBy(4, cc.v2(700, 0)), cc.moveBy(4, cc.v2(-700, 0))).repeatForever()) :
            148 == e ? this.node.runAction(cc.sequence(cc.moveBy(4, cc.v2(0, 700)), cc.moveBy(4, cc.v2(0, -700))).repeatForever()) :
            155 == e && "t2" == this.node.name ? this.node.runAction(cc.sequence(cc.moveBy(4, cc.v2(0, 1030)), cc.moveBy(4, cc.v2(0, -1030))).repeatForever()) :
            155 == e && "t1" == this.node.name ? this.node.runAction(cc.sequence(cc.moveBy(4, cc.v2(0, -1030)), cc.moveBy(4, cc.v2(0, 1030))).repeatForever()) :
            160 == e ? this.node.runAction(cc.sequence(cc.moveBy(3, cc.v2(0, 1030)), cc.moveBy(3, cc.v2(0, -1030))).repeatForever()) :
            166 == e && "t1" == this.node.name ? this.node.runAction(cc.sequence(cc.moveBy(1, cc.v2(0, 550)), cc.moveBy(1, cc.v2(0, -550))).repeatForever()) :
            166 == e && "t2" == this.node.name ? this.node.runAction(cc.sequence(cc.moveBy(1, cc.v2(0, -550)), cc.moveBy(1, cc.v2(0, 550))).repeatForever()) :
            166 == e && "t3" == this.node.name ? this.node.runAction(cc.sequence(cc.moveBy(1, cc.v2(0, 550)), cc.moveBy(1, cc.v2(0, -550))).repeatForever()) :
            166 == e && "t4" == this.node.name ? this.node.runAction(cc.sequence(cc.moveBy(1, cc.v2(0, -550)), cc.moveBy(1, cc.v2(0, 550))).repeatForever()) :
            169 == e && "t1" == this.node.name ? this.node.runAction(cc.sequence(cc.moveBy(1, cc.v2(550, 0)), cc.moveBy(1, cc.v2(-550, 0))).repeatForever()) :
            169 == e && "t2" == this.node.name ? this.node.runAction(cc.sequence(cc.moveBy(1, cc.v2(-550, 0)), cc.moveBy(1, cc.v2(550, 0))).repeatForever()) :
            169 == e && "t3" == this.node.name ? this.node.runAction(cc.sequence(cc.moveBy(1, cc.v2(0, 800)), cc.moveBy(1, cc.v2(0, -800))).repeatForever()) :
            169 == e && "t4" == this.node.name ? this.node.runAction(cc.sequence(cc.moveBy(1, cc.v2(0, -800)), cc.moveBy(1, cc.v2(0, 800))).repeatForever()) :
            171 == e ? this.node.runAction(cc.sequence(cc.moveBy(1, cc.v2(0, 600)), cc.moveBy(1, cc.v2(0, -600))).repeatForever()) :
            175 == e && "t1" == this.node.name ? this.node.runAction(cc.sequence(cc.moveBy(1, cc.v2(-800, 0)), cc.moveBy(1, cc.v2(800, 0))).repeatForever()) :
            175 == e && "t2" == this.node.name ? this.node.runAction(cc.sequence(cc.moveBy(1, cc.v2(800, 0)), cc.moveBy(1, cc.v2(-800, 0))).repeatForever()) :
            196 == e && this.node.runAction(cc.sequence(cc.moveBy(1.5, cc.v2(0, -420)), cc.moveBy(1.5, cc.v2(0, 420))).repeatForever());
            }else if(t == MODE_TYPE_STRUCT.MODE2)
            {5 == e ? this.node.runAction(cc.sequence(cc.moveBy(1, cc.v2(0, -240)), cc.moveBy(1, cc.v2(0, 240))).repeatForever()) :
            30 == e && "cube_1" == this.node.name ? this.node.runAction(cc.sequence(cc.moveBy(1, cc.v2(0, -150)),
            cc.moveBy(1, cc.v2(0, 150))).repeatForever()) : 30 == e && "cube_2" == this.node.name ?
            this.node.runAction(cc.sequence(cc.moveBy(1, cc.v2(0, 150)), cc.moveBy(1, cc.v2(0, -150))).repeatForever()) :
            31 == e ? this.node.runAction(cc.sequence(cc.moveBy(4, cc.v2(0, 640)), cc.moveBy(4, cc.v2(0, -640))).repeatForever()) :
            42 == e ? this.node.runAction(cc.sequence(cc.moveBy(2, cc.v2(0, 1100)), cc.moveBy(2, cc.v2(0, -1100))).repeatForever()) :
            65 == e ? this.node.runAction(cc.sequence(cc.moveBy(1.5, cc.v2(640, 0)), cc.moveBy(1.5, cc.v2(-640, 0))).repeatForever()) :
            70 == e ? this.node.runAction(cc.sequence(cc.moveBy(1.5, cc.v2(-600, 0)), cc.moveBy(1.5, cc.v2(600, 0))).repeatForever()) :
            70 == e ? this.node.runAction(cc.sequence(cc.moveBy(1.5, cc.v2(-600, 0)), cc.moveBy(1.5, cc.v2(600, 0))).repeatForever()) :
            98 == e && "t1" == this.node.name ? this.node.runAction(cc.sequence(cc.moveBy(2, cc.v2(0, -800)),
            cc.moveBy(2, cc.v2(0, 800))).repeatForever()) : 98 == e && "t2" == this.node.name && 
            this.node.runAction(cc.sequence(cc.moveBy(2, cc.v2(0, 800)), cc.moveBy(2, cc.v2(0, -800))).repeatForever())
            }else if(t == MODE_TYPE_STRUCT.MODE3) {  12 == e ? this.node.runAction(cc.sequence(cc.moveBy(5, cc.v2(500, 0)),
            cc.moveBy(5, cc.v2(-500, 0))).repeatForever()) : 65 == e ? this.node.runAction(cc.sequence(cc.moveBy(.4, cc.v2(0, 80)),
            cc.moveBy(.4, cc.v2(0, -80))).repeatForever()) : 114 == e && "t1" == this.node.name ?
            this.node.runAction(cc.sequence(cc.moveBy(4, cc.v2(0, 800)), cc.moveBy(4, cc.v2(0, -800))).repeatForever()) :
            114 == e && "t2" == this.node.name ? this.node.runAction(cc.sequence(cc.moveBy(4, cc.v2(0, -800)),
            cc.moveBy(4, cc.v2(0, 800))).repeatForever()) : 115 == e ? this.node.runAction(cc.sequence(cc.moveBy(1, cc.v2(300, -750)),
            cc.moveBy(1, cc.v2(-300, 750))).repeatForever()) : 136 == StageDataMgr.CUR_LEVEL && "t4" == this.node.name ?
            this.node.runAction(cc.sequence(cc.moveBy(1, cc.v2(490, 0)), cc.moveBy(1, cc.v2(-490, 0))).repeatForever()) :
            133 == StageDataMgr.CUR_LEVEL && "t1" == this.node.name ?
            this.node.runAction(cc.sequence(cc.moveBy(1, cc.v2(750, 0)), cc.moveBy(1, cc.v2(-750, 0))).repeatForever()) :
                133 == StageDataMgr.CUR_LEVEL && "t2" == this.node.name ?
                this.node.runAction(cc.sequence(cc.moveBy(1, cc.v2(-750, 0)), cc.moveBy(1, cc.v2(750, 0))).repeatForever()) :
                126 == StageDataMgr.CUR_LEVEL && this.node.runAction(cc.sequence(cc.moveBy(1, cc.v2(0, 670)), cc.moveBy(1, cc.v2(0, -670))).repeatForever()) :
            }
            else if(t == MODE_TYPE_STRUCT.MODE4){  (39 == e ? this.node.runAction(cc.sequence(cc.moveBy(1, cc.v2(220, 0)),
            cc.moveBy(1, cc.v2(-220, 0))).repeatForever()) : 41 == e ? this.node.runAction(cc.sequence(cc.moveBy(1, cc.v2(0, -670)),
            cc.moveBy(1, cc.v2(0, 670))).repeatForever()) : 43 == e ? this.node.runAction(cc.sequence(cc.moveBy(1, cc.v2(0, 500)),
            cc.moveBy(1, cc.v2(0, -500))).repeatForever()) : 53 == e ? this.scheduleOnce(() => {
            this.node.runAction(cc.sequence(cc.moveBy(1.5, cc.v2(800, 0)), cc.moveBy(1.5, cc.v2(-800, 0))).repeatForever());
            }, .5) : 58 == e && "t1" == this.node.name ? this.node.runAction(cc.sequence(cc.moveBy(1.5, cc.v2(0, 650)), cc.moveBy(1.5, cc.v2(0, -650))).repeatForever()) : 58 == e &&
            "t2" == this.node.name ? this.node.runAction(cc.sequence(cc.moveBy(1.5, cc.v2(0, -650)), cc.moveBy(1.5, cc.v2(0, 650))).repeatForever()) : 76 == e ?
            this.node.runAction(cc.sequence(cc.moveBy(2, cc.v2(0, 300)), cc.moveBy(2, cc.v2(0, -300))).repeatForever()) : 79 == e ?
            this.node.runAction(cc.sequence(cc.moveBy(4, cc.v2(700, 0)), cc.moveBy(4, cc.v2(-700, 0))).repeatForever()) : 94 == e ?
            this.node.runAction(cc.sequence(cc.moveBy(4, cc.v2(730, 0)), cc.moveBy(4, cc.v2(-730, 0))).repeatForever()) : 123 == e &&
            this.node.runAction(cc.sequence(cc.moveTo(1, cc.v2(-158, 477)), cc.moveTo(1, cc.v2(58, -262))).repeatForever()));
        }}
    }

    trigger() {
        StageDataMgr.CUR_MODE == MODE_TYPE_STRUCT.MODE1 ? 165 == StageDataMgr.CUR_LEVEL && "t1" == this.node.name ? this.node.runAction(cc.moveBy(1.5, cc.v2(0, 440))) :
         165 == StageDataMgr.CUR_LEVEL && "t2" == this.node.name ? this.node.runAction(cc.moveBy(1.5, cc.v2(-540, 0))) :
          191 == StageDataMgr.CUR_LEVEL && "t1" == this.node.name ? this.node.runAction(cc.moveBy(1, cc.v2(0, 1170))) :
           191 == StageDataMgr.CUR_LEVEL && "t2" == this.node.name && this.node.runAction(cc.moveBy(1, cc.v2(-760, 0))) :
           StageDataMgr.CUR_MODE == MODE_TYPE_STRUCT.MODE3 && (117 == StageDataMgr.CUR_LEVEL && "t1" == this.node.name ?
             this.node.runAction(cc.moveBy(1, cc.v2(0, 420))) : 117 == StageDataMgr.CUR_LEVEL && "t2" == this.node.name ? 
             this.node.runAction(cc.moveBy(1, cc.v2(-620, 0))) : 117 == StageDataMgr.CUR_LEVEL && "t3" == this.node.name ?
              this.node.runAction(cc.moveBy(1, cc.v2(0, -350))) : 136 == StageDataMgr.CUR_LEVEL && "t1" == this.node.name ?
               this.node.runAction(cc.moveBy(.5, cc.v2(150, 0))) : 136 == StageDataMgr.CUR_LEVEL && "t2" == this.node.name ?
                this.node.runAction(cc.moveBy(.5, cc.v2(150, 0))) : 136 == StageDataMgr.CUR_LEVEL && "t3" == this.node.name &&
                 this.node.runAction(cc.moveBy(.5, cc.v2(120, 0))));
    }

    // update (dt) {}
}
