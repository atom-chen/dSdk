import TankDataMgr from "./TankDataMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameData extends cc.Component {

    private static _instance: GameData = null;
    //====================单例=============================================================
    public static get instance(): GameData {
      if (!GameData._instance) GameData._instance = new GameData();
  
      return GameData._instance;
    }



    public m_curMapType:number = 0
    public m_curLevelType:number = 0
    public m_curLevel:number = 0
    public m_curMaxMon:number = 2
    public m_acuracyRating:number = 0
    public m_acuracyRatingMax:number = 0
    public m_healthRatinig:number = 0
    public m_levelScore:number = 0
    public m_killRating:number = 0
    public m_fireNum:number = 0
    public m_killNum:number = 0
    public m_curBlood:number = 3
    public m_isWin:boolean = false;
    public isPause:boolean = false;
    public m_isDirty:boolean = false;



  

    private _gameUI = null;

    get gameUI(){
        if (!this._gameUI) {
            var n = cc.find("Canvas/GameUI");
            if (!n) return null;
            this._gameUI = n.getComponent("GameUI");
        }
        return this._gameUI;
    }
    
    set gameUI(ui){
        this._gameUI = ui;
    }

    public curStep:number = 0


    onLoad() {
        cc.log("GameData ");
    }
    onDestroy() {
        this.gameUI = null;
    }
    start() {
        var n = cc.find("Canvas/GameUI");
        this.gameUI = n.getComponent("GameUI"), this.m_isDirty = !0;
    }
    reset() {
        this.m_fireNum = 0;
        this.m_killNum = 0,
         this.m_curBlood = 3, 
         this.m_isWin = false, 
        this.m_killRating = 0,
         this.m_isDirty = true;
    }
    addScore(n) {
        this.m_killRating += n, this.m_isDirty = !0;
    }
}