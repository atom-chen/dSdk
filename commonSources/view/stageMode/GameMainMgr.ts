

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
export default class GameMainMgr{

    public static isTryAgain:boolean = false;

    public static gameState = cc.Enum({
          /** 未准备好*/
          UNREADY: "unReady",    
          /**创建完成 */     
          READY: "ready",       
          /**激活状态 */    
          ACTIVE : "active",   
          /**去世 */     
          LOST : "lost", 
          /**过关状态 */
          WIN:"win",
    })

    public static curGameState = GameMainMgr.gameState.UNREADY;
    /**是否已重生 */
    public static isRevive:Boolean = false;

    /**普通子弹数 */
    public static normalBulletCount:number = 0;
    /**高亮子弹数 */
    public static lightBulletCount:number = 0;
    /**子弹总数 */
    public static totalBulletCount:number = 0;

    public static activeBulletCount:number = 0;

    public static enemy_count:number = 0;

    public static init(){

    }

    public static curEarnStars:number = 0;
    public static calcuStars():number{

        let star:number = 0;
        if(GameMainMgr.totalBulletCount >= 3){
            star = 3;
        }else if(GameMainMgr.totalBulletCount >= (3 - 1)){
            star = 2;
        }else if(GameMainMgr.totalBulletCount <= 0){
            star = 0;
        }
        else{
            star = 1;
        }
        this.curEarnStars = star;
        // console.log(star,"星星",levelConfig,GameMainMgr.totalBulletCount)
        return star;
    }

}
