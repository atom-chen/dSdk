import GameManager from "../../gamecore/managers/GameManager";
import GameUtils from "../../GameUtils";



const { ccclass, property } = cc._decorator;

// 金币
@ccclass
export default class CoinAnimComp extends cc.Component {
    public static SHOW_FLY_ANI:"showFlyAni";

    // 金币对象池
    static coinPool = new cc.NodePool();
    // 钻石对象池
    static diamondPool = new cc.NodePool();

    static hpPool = new cc.NodePool();

    // 金币放入对象池
    static coinPut(coin: cc.Node) {
        CoinAnimComp.coinPool.put(coin);
    }

    // 从对象池里获取金币
    static coinGet(): cc.Node | null {
        let coin = CoinAnimComp.coinPool.get();
        if (null != coin) {
            coin.x = 0;
            coin.y = 0;
            coin.rotation = 0;
        }
        return coin;
    }
    // 钻石放入对象池
    static diamondPut(diamond: cc.Node) {
        CoinAnimComp.diamondPool.put(diamond);
    }

    // 从对象池里获取金币
    static diamondGet(): cc.Node | null {
        let diamond = CoinAnimComp.diamondPool.get();
        if (null != diamond) {
            diamond.x = 0;
            diamond.y = 0;
            diamond.rotation = 0;
        }
        return diamond;
    }

    // 钻石放入对象池
    static hpPut(hp: cc.Node) {
        CoinAnimComp.hpPool.put(hp);
    }

    // 从对象池里获取金币
    static hpGet(): cc.Node | null {
        let hp = CoinAnimComp.hpPool.get();
        if (null != hp) {
            hp.x = 0;
            hp.y = 0;
            hp.rotation = 0;
        }
        return hp;
    }


    // 金币预制体
    @property(cc.Prefab)
    private coinPrefab: cc.Prefab = null;
    //钻石预制体
    @property(cc.Prefab)
    private diamondPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    private hpPrefab: cc.Prefab = null;
    
    start(){
        if(!this.hpPrefab){
            GameUtils.loadRes("prefabs/template/flyHp",cc.Prefab,false,(pfb) => {
                this.hpPrefab = pfb;
            })
        }
    }

    /**
     * 批量执行金币动画
     * @param type 2 体力 1 金币 0 钻石
     * @param start 起点
     * @param end   终点
     * @param callback 动画执行完回调
     */
    public batchExecuteAnim(type: number, start: cc.Vec2, end: cc.Vec2, callback: Function = null, duration: number = 1) {
        // 开始执行金币动画
        this.schedule(() => {
            let coin = CoinAnimComp.coinGet();
            let diamond = CoinAnimComp.diamondGet();

            let hp = CoinAnimComp.hpGet();
            
            if (coin == null) coin = cc.instantiate(this.coinPrefab);
            if (diamond == null) diamond = cc.instantiate(this.diamondPrefab);

            if (hp == null) hp = cc.instantiate(this.hpPrefab);
            switch (type) {
                case 0:
                    diamond.setPosition(start);
                    this.node.addChild(diamond);
                    GameManager.soundsManager.playSound("sounds/getMoney");
                    this.executeDiamondAnim(diamond, start, end);
                    break;
                case 1:
                    coin.setPosition(start);
                    this.node.addChild(coin);
                    GameManager.soundsManager.playSound("sounds/getMoney");
                    this.executeCoinAnim(coin, start, end);
                    break;
                case 2:
                        hp.setPosition(start);
                        this.node.addChild(hp,9999);
                        GameManager.soundsManager.playSound("sounds/getHp");
                        this.executeHpAnim(hp, start, end);
                    break;
                
            }

        }, 0.1, cc.macro.REPEAT_FOREVER);
        // 动画结束
        this.scheduleOnce(() => {
            this.unscheduleAllCallbacks();
            if (callback) {
                callback();
            }
        }, duration);
    }

    /**
     * 执行金币动画
     * @param start 起点
     * @param end   终点
     */
    private executeCoinAnim(coinNode: cc.Node, start: cc.Vec2, end: cc.Vec2) {
        let duration: number = 0.5;
        let ry = start.y + (end.y - start.y) * Math.random();
        let rx = start.x + (end.x - start.x) * Math.random();
        //let rx = -50 + (end.x - start.x + 100)*Math.random();
        let point: cc.Vec2 = cc.v2(rx, ry);
        let points: Array<cc.Vec2> = [start, point, end];
        let ba = cc.bezierTo(duration, points);
        let rot = cc.rotateBy(duration, 720);
        let swp = cc.spawn(ba, rot);
        let se = cc.sequence(ba, cc.callFunc(() => {
            coinNode.removeFromParent();
            CoinAnimComp.coinPut(coinNode);
        }));
        coinNode.runAction(se);
    }
    /**
     * 执行钻石动画
     * @param start 起点
     * @param end   终点
     */
    private executeDiamondAnim(coinNode: cc.Node, start: cc.Vec2, end: cc.Vec2) {
        let duration: number = 0.5;
        let ry = start.y + (end.y - start.y) * Math.random();
        let rx = start.x + (end.x - start.x) * Math.random();
        //let rx = -50 + (end.x - start.x + 100)*Math.random();
        let point: cc.Vec2 = cc.v2(rx, ry);
        let points: Array<cc.Vec2> = [start, point, end];
        let ba = cc.bezierTo(duration, points);
        let rot = cc.rotateBy(duration, 720);
        let swp = cc.spawn(ba, rot);
        let se = cc.sequence(ba, cc.callFunc(() => {
            coinNode.removeFromParent();
            CoinAnimComp.diamondPut(coinNode);
        }));
        coinNode.runAction(se);
    }

    /**
     * 执行体力动画
     * @param start 起点
     * @param end   终点
     */
    private executeHpAnim(hpNode: cc.Node, start: cc.Vec2, end: cc.Vec2) {
        let duration: number = 0.5;
        let ry = start.y + (end.y - start.y) * Math.random();
        let rx = start.x + (end.x - start.x) * Math.random();
        //let rx = -50 + (end.x - start.x + 100)*Math.random();
        let point: cc.Vec2 = cc.v2(rx, ry);
        let points: Array<cc.Vec2> = [start, point, end];
        let ba = cc.bezierTo(duration, points);
        let rot = cc.rotateBy(duration, 720);
        let swp = cc.spawn(ba, rot);
        let se = cc.sequence(ba, cc.callFunc(() => {
            hpNode.removeFromParent();
            CoinAnimComp.hpPut(hpNode);
        }));
        hpNode.runAction(se);
    }

    onLoad(){
        // type: number, start: cc.Vec2, end: cc.Vec2, callback: Function = null, duration: number = 3)

        this.node.on(CoinAnimComp.SHOW_FLY_ANI,(e:cc.Event.EventCustom) =>{
            if(e){
                e.stopPropagation();
                this.batchExecuteAnim(e.detail.type,e.detail.start,e.detail.end,e.detail.callback,e.detail.duration);
            }
        },this);
    }
}

    /**
     *
     * @param type 1 金币 0 钻石
     * @param start 起点
     * @param end   终点
     * @param callback 动画执行完回调
     */
export class FlyStruct {

    type:number;
    start:cc.Vec2;
    end:cc.Vec2;
    callback:Function;
    duration:number
}