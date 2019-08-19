import GameData from "./GameData";
import TankDataMgr from "./TankDataMgr";
import Globaldef from "./Globaldef";
import GameManager from "../gamecore/managers/GameManager";
import Hero_physic from "./Hero_physic";
import EnemyManager from "./EnemyManager";
import GameStart from "../GameStart";
import RebornUI from "./RebornUI";
import UIManager from "./UIManager";

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
export default class GameCtrl extends cc.Component {


    


    hero:any =  null
    enemyManager:any = null


    @property(cc.Sprite)
    bgImg:cc.Sprite = null;
    
    @property(cc.Prefab)
    bullet:cc.Prefab = null;

    


    levelCol:any = null
    startWaitFire:boolean = !1;
    fireContinueCnt:number = 0
    fireContinueMaxCnt:number = 10
    fireContinueTime:number = 0
    fireContinueInterval:number = .2
    fireTime:number = 0
    fireTimeInterval:number = 1

    @property(cc.Node)
    shootArea:cc.Node = null;


    @property(cc.Node)
    touchArea:cc.Node = null;
    
    


    onload(){
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getCollisionManager().enabled = true;

        GameData.instance.m_curMapType = 0


        let curStageNum = TankDataMgr.instance.getData(TankDataMgr.KEY_CUR_STAGE_NUM);
        if(curStageNum > 40){
            GameData.instance.m_curMapType = 1
        }else if(curStageNum > 80){
            GameData.instance.m_curMapType = 2
        }

    }



    

    start() {
        // cc.loader.loadResDir("map_col",(e,resArr) =>{
        //     console.log(resArr,"arr");
        //     for(let i = 0;i < resArr.length;i ++){

        //     }
        // })


        this.fireContinueInterval = .4;
        var a = cc.find("Canvas/bg");
        this.bgImg = a.getComponent(cc.Sprite),
        this.shootArea.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.shootArea.on(cc.Node.EventType.TOUCH_MOVE, this.onTouch, this);
        this.shootArea.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.shootArea.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);


        var e = cc.find("Canvas/bg/hero");
        this.hero = e.getComponent(Hero_physic);
        var t = cc.find("Canvas/bg/EnemyManager");
        this.enemyManager = t.getComponent(EnemyManager), this.enemyManager.init(this), 
        this.hero.init(this), this.hero.node.zIndex = 10,

        
        this.loadLevel(TankDataMgr.instance.getData(TankDataMgr.KEY_CUR_STAGE_NUM)), 
        GameData.instance.m_isDirty = !0;
    }
    testDirRota(d) {
        var e = cc.v2(600, 200), t = cc.instantiate(d), n = cc.instantiate(d), i = cc.instantiate(d), s = cc.instantiate(d);
        t.parent = this.bgImg.node, n.parent = this.bgImg.node, i.parent = this.bgImg.node, 
        s.parent = this.bgImg.node, t.setPosition(e), n.setPosition(0, 0), i.setPosition(0, 0), 
        s.setPosition(0, 0);
        var a = cc.v2(1, 0);
        e = cc.v2(600, 200), (a = cc.v2(1, 0)).normalizeSelf();
        var c = 45 * (y / 180), o = a.x * g(c) - a.y * p(c), r = a.x * p(c) + a.y * g(c), l = cc.v2(o, r).normalizeSelf();
        i.setPosition(e.addSelf(l.mulSelf(50))), l = cc.v2(a.x, a.y), a.normalizeSelf(), 
        l.normalizeSelf();
        var m = Math.atan2(l.y, l.x) - Math.atan2(a.y, a.x);
        cc.log("B " + c + " A " + m + " angel: " + 180 * m / y);
    }
    reset() {
        GameData.instance.reset(),
        this.hero && this.hero.reset(),
        this.enemyManager && this.enemyManager.reset();
    }
    onDestroy() {}
    update(n) {
        TankDataMgr.instance.totalGameTime += n, this.fireContinueTime += n, true == this.startWaitFire && (this.fireTime += n, 
        this.fireTime >= this.fireTimeInterval && (this.startWaitFire = !1, this.fireContinueCnt = 0, 
        this.fireTime = 0));
    }


    onTouchStart(o){
        if (!this.hero.isDead && 1 != TankDataMgr.instance.useFightBtn) {
            this.touchBeginTime = new Date().getTime();
            var e = o.getLocation();
            let rect:cc.Rect = this.shootArea.getBoundingBox();
            rect.x += rect.width / 4;
            rect.y += rect.height / 4;
            rect.width -= this.shootArea.width / 2;
            rect.height -= this.shootArea.height /2;

            e = this.shootArea.parent.convertToNodeSpaceAR(e);
            if(!rect.contains(e)){
                if(this.touchArea.getBoundingBox().contains(e)){
                    this.shootArea.setPosition(e);
                }
            }else{
                this.onTouch(o);
            }
        }

    }


    private touchBeginTime:number = 0;
    onTouch(o) {
        if (!this.hero.isDead && 1 != TankDataMgr.instance.useFightBtn) {
            if(this.hero.arrow_direction.opacity == 0){
                this.hero.arrow_direction.opacity = 255;
            }


            // this.fireContinueTime < this.fireContinueInterval && (this.fireContinueCnt++, this.fireContinueCnt >= this.fireContinueMaxCnt && 
            //     (this.startWaitFire = !0, 
            // this.fireTime = 0))
            // , this.fireContinueTime = 0;
            var e = o.getLocation();
            e = this.shootArea.convertToNodeSpaceAR(e);

            let node = this.shootArea.getChildByName("Joystick");

            // node.position = e;
            if(Math.sqrt(e.x * e.x + e.y * e.y) < 48){
                return;
            }

            var a = Math.atan2(e.y, e.x);

            let lenX = Math.abs(e.x);
            let lenY = Math.abs(e.y);

            let x = Math.cos(a) * (lenX > 118 ? 118 : lenX);
            let y = Math.sin(a) * (lenY > 118 ? 118 : lenY);
            node.position = cc.v2(x,y);
            this.hero.setFireAngle(a * 180 / Math.PI);
        }
    }
    onTouchEnd(o){
        if (!this.hero.isDead && 1 != TankDataMgr.instance.useFightBtn && true != this.startWaitFire) {
            this.fireContinueTime < this.fireContinueInterval && (this.fireContinueCnt++, this.fireContinueCnt >= this.fireContinueMaxCnt && 
                (this.startWaitFire = !0, 
            this.fireTime = 0)), this.fireContinueTime = 0;
            var e = o.getLocation();

            e = this.shootArea.convertToNodeSpaceAR(e);

            let node = this.shootArea.getChildByName("Joystick");
            var n = null;

            if(Math.sqrt(e.x * e.x + e.y * e.y) < 48 || (new Date().getTime() - this.touchBeginTime < 360)){
                let curFireAngle = -this.hero.curFireAngle;
                console.log(curFireAngle,'==curFireAngle==');
                let value = curFireAngle * Math.PI / 180;
                n = cc.v2(Math.cos(value),Math.sin(value));
                e = cc.v2(n.x,n.y);
            }else{
                 n = e.sub(cc.v2(0,0));
                n.normalizeSelf()

            }

            TankDataMgr.instance.bulletType == Globaldef.BULLET_TYPE.E_ONE ? this.hero.fire(n, e, this.bgImg.node) :
             TankDataMgr.instance.bulletType == Globaldef.BULLET_TYPE.E_THREE ? this.hero.fireThree(n, e, this.bgImg.node) :
              TankDataMgr.instance.bulletType == Globaldef.BULLET_TYPE.E_BOMB ? this.hero.firePao(n, e, this.bgImg.node) :
               TankDataMgr.instance.bulletType == Globaldef.BULLET_TYPE.E_FLLOW ? this.hero.fireFllow(n, e, this.bgImg.node) :
                TankDataMgr.instance.bulletType == Globaldef.BULLET_TYPE.E_POWER_BOMB && this.hero.firePowerBomb(n, e, this.bgImg.node);
            var a = Math.atan2(e.y, e.x) * (180 / Math.PI);
            this.hero.setFireAngle(a);

            // console.log(n,e,"nnnnnnnn",a,this.hero.curFireAngle)

            node.position = cc.v2(0,0)

            if(this.hero.arrow_direction.opacity > 0){
                this.hero.arrow_direction.opacity = 0;
            }
        }
    }




    checkGameState() {
        // this.scheduleOnce(this.timerCallBack, 1, 0);
        this.scheduleOnce(this.timerCallBack, 1);
    }
    timerCallBack() {
        if (this.hero.isDead) {
            var n = (e = cc.find("Canvas")).getComponent(UIManager);
            return e.getComponent(GameCtrl), GameData.instance.isPause = true, n.showUI("RebornUI"), 
            void cc.director.pause();
        }
        if (this.enemyManager.isAllDead()) {
            var e;
            return n = (e = cc.find("Canvas")).getComponent(UIManager), GameData.instance.m_isWin = !0, 
            GameData.instance.isPause = !0, void n.showUI(Globaldef.UI_NAME[Globaldef.UI_ID.E_GAME_END_UI]);
        }
    }
    reBorn() {
        this.enemyManager && this.enemyManager.removeAllBullet(), this.hero.reborn(), GameData.instance.isPause = !1;
    }


    mapRes = null;
    jsonRes = null;
    loadLevel(c) {
        GameData.instance.m_curMapType = 0

        let curStageNum = TankDataMgr.instance.getData(TankDataMgr.KEY_CUR_STAGE_NUM);
        console.log(curStageNum,"stage")
        if(curStageNum > 40){
            GameData.instance.m_curMapType = 1
        }else if(curStageNum > 80){
            GameData.instance.m_curMapType = 2
        }
        c = curStageNum % 40;
        
        


        var e = cc.find("Canvas/bg/TiledMap");
        if(c < 40){
            e.x = 35;
        }

        // if(0 == GameData.instance.m_curMapType){
        //     if(c <= 14){
        //         c = 14 - c;
        //     }
        // }



        var n = "level_" + c;

        var t = "level_col_" + c;



        
        1 == GameData.instance.m_curMapType ? (n = "x_level_" + c, t = "x_level_col_" + c) : 2 == GameData.instance.m_curMapType && (n = "y_level_" + c, t = "y_level_col_" + c);




        let index = 0;
        this.mapRes = null;
        this.jsonRes = null;

        let checkRes =()=>{
            index ++;
            if(index == 2){

                let m = cc.find("Canvas/bg/TiledMap").addComponent(cc.TiledMap);

                m.tmxAsset = this.mapRes,

                // console.log(m.tmxAsset,"asssssss")

                // this.hero && this.hero.reset()
                // this.enemyManager && this.enemyManager.reset();
                this.scheduleOnce(() =>{
                    this.hero && this.hero.reset()
                    this.enemyManager && this.enemyManager.reset();
                    this.levelCol = new cc.Node(this.jsonRes.name);
                    let comp:GameStart = this.levelCol.addComponent(GameStart);
                    comp.init(this.jsonRes.json,this.levelCol);
                    this.levelCol.active = true;
                    cc.find("Canvas/bg/TiledMap").addChild(this.levelCol);
                })
            }
        }
        cc.loader.loadRes("map/" + n, (err, res) => {
            if(err){
            }else{
                this.mapRes = res;
                checkRes();
            }
        });
        if(this.levelCol){
            this.levelCol.destroy();
            this.levelCol = null;
        }
        // console.log(t,"ttttttttttttttt")
        cc.loader.loadRes("jsonData/" + t,cc.JsonAsset,(n, e) => {
            if(n){
                // console.log(e,"eeeeeeeeeeeeee")
            }else{
                this.jsonRes = e;
                // console.log(t,"JSON资源名")
                checkRes();
        }});
        var o = cc.find("Canvas").getComponent(UIManager);
        if (o.hideUI(Globaldef.UI_NAME[Globaldef.UI_ID.E_GAME_END_UI]),
         GameManager.soundsManager.pushSceneBgMusic("sounds/bgm/bigrock.mp3"),
        0 != GameData.instance.m_curMapType || false != TankDataMgr.instance.finish_xinshou || 0 != c) {
            var r, l = cc.find("Canvas/GameUI");
            l ? (r = l.getComponent("GameUI")) && r.countDownAni() : (l = cc.find("Canvas/GameNewUI")) && (r = l.getComponent("GameNewUI")) && r.countDownAni();
        } else o.showUI("XinShou");
    }





    lookRebornAD() {
        TankDataMgr.instance.curAdType = 2;
        var a = this, e = wx.createRewardedVideoAd({
            adUnitId: "adunit-24b79ea75ae00e48"
        });
        e.load().then(function() {
            return e.show();
        }).catch(function() {
            e.load().then(function() {
                return e.show();
            });
        }), e.onError(function(n) {
            (console.log(n), 2 == TankDataMgr.instance.curAdType) && cc.find("Canvas").getComponent("UIManager").showTip("广告播放错误！请从新尝试", function() {
                cc.director.resume(), GameData.instance.m_isWin = !1, GameData.instance.isPause = !0, cc.find("Canvas").getComponent("UIManager").showUI(Globaldef.UI_NAME[Globaldef.UI_ID.E_GAME_END_UI]);
            });
        }), e.onClose(function(e) {
            if (2 == TankDataMgr.instance.curAdType) if (cc.director.resume(), (e && e.isEnded || void 0 === e) && 2 == TankDataMgr.instance.curAdType) {
                var t = cc.find("Canvas/GameUI");
                if (t) {
                    a && a.enemyManager && a.enemyManager.removeAllBullet();
                    var n = t.getComponent("GameUI");
                    n && n.countDownAniReBorn();
                }
            } else GameData.instance.m_isWin = !1, GameData.instance.isPause = !0, cc.find("Canvas").getComponent("UIManager").showUI(Globaldef.UI_NAME[Globaldef.UI_ID.E_GAME_END_UI]);
        });
    }


}

