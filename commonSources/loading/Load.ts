import MainDataMgr from "../module/data/MainDataMgr";
import GameSystem from "../GameSystem";
import PBManager from "../module/meta/PBManager";
import GameCoreEventNames from "../gamecore/GameCoreEventNames";
import DeerSDK from "../gamecore/deer/DeerSDK";
import DeerSDKEventNames from "../gamecore/deer/DeerSDKEventNames";
import GameUtils from "../GameUtils";
import WXShare from "../gamecore/wechat/WXShare";
import GameConfig from "../view/stageMode/GameConfig";
import SyncDataToWXCloud from "../gamecore/base/SyncDataToWXCloud";
import GameManager from "../gamecore/managers/GameManager";
import XYJEventNames from "../gamecore/xiaoyaoji/XYJEventNames";
import XYJAPI from "../gamecore/xiaoyaoji/XYJAPI";
import GameValues from "../gamecore/base/GameValues";
import StageDataMgr from "../module/data/StageDataMgr";
import SplashMain from "../../Script/gamecoreUI/splashads/SplashMain";
import PrfabsManager from "../view/stageMode/PrfabsManager";
import SyncDataToServerByDeerSDK from "../gamecore/base/SyncDataToServerByDeerSDK";


// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class Load extends cc.Component {
    @property(cc.Node)
    progre: cc.Node = null;

    private resIndex:number = 0;
    private totalResIndex:number = 3;

    private adComplete:boolean = false;
    
    @property(cc.Label)
    txtDownload:cc.Label = null;
    onLoad () {
        //初始化游戏系统配置
        GameSystem.init();
        this.txtDownload.string = "资源下载中";
        this.node.once(SplashMain.ADCompleteEvent,()=>{
            console.log("收到回调");
            if(!this.adComplete){
                this.adComplete = true;
                this.checkEnterGame();
            }
        },this)
        if(cc.sys.platform === cc.sys.WECHAT_GAME){
            this.loadSubPackage();
        }else{
            this.totalResIndex -=1;
        }

        //初始化pb
        //游戏核心数据
        if (PBManager.instance.isReady) {
            this.pbCallBack();
        } else {
            PBManager.instance.addEventListener(GameCoreEventNames.COMMON_READY,this.pbCallBack,this);
        }
        if(MainDataMgr.instance.getData(MainDataMgr.KEY_NEW_PLAYER) == false){
            console.log("禁止下载");
            SyncDataToWXCloud.instance.forbidToSyncDataFromRemote = true;
        }else{
            SyncDataToServerByDeerSDK.instance.forbidToUseDataFromRemoteAuto = true;
        }

        GameUtils.instance.wxGetLaunchOptionsSync();
    }
    start() {
        cc.director.preloadScene("mainScene",(ccount,totalCount) => {
            this.prog = ccount / totalCount;
        },()=>{});
    }

    private loadSubPackage():void{
        cc.loader.downloader.loadSubpackage('sounds',  (err) => {
            if (!err) {
                this.checkEnterGame();
                this.txtDownload.string = "资源下载完毕";
            } else {
                console.error("subpkg download failed");
                this.loadSubPackage();
            }
        });
    }


    public checkEnterGame(){
        this.resIndex ++;
        if(this.resIndex >= this.totalResIndex){
            if(this.adComplete == true){
                this.loadScene("mainScene");
            }else{
                this.scheduleOnce(() => {
                    this.loadScene("mainScene");
                },5000);
            }
        }
    }
    
    public WXdownLoad(fileName){
        let fileManager = wx.getFileSystemManager();
        // 下载资源
        let downloadTask = wx.downloadFile({
          url: GameUtils.MAP_REMOTE_URL + "/import/" + fileName + ".zip",
          success:(res) =>{ // 下载成功
                this.txtDownload.string = "资源解压中"
                let filePath = res.tempFilePath; // 下载路径
                    fileManager.unzip({
                                zipFilePath:filePath,   // 资源下载后路径
                                targetPath:wx.env.USER_DATA_PATH + '/res',  // 解压资源存放路径
                                success : (res) =>{// 解压成功
                                      console.log('解压缩成功',res)
                                      this.txtDownload.string = "资源解压完成";
                                      MainDataMgr.instance.setData(MainDataMgr.KEY_FILE_UNZIP_OK,1);
                                },
                                fail : (res)=>{// 解压失败
                                    // this.resIndex ++;
                                    this.txtDownload.string = "资源解压失败";
                                      console.log('解压缩失败',res);
                                },
                    })
          },
          fail : (res)=>{ // 下载失败
                console.log('下载失败') // 下载的进度
                this.txtDownload.string = "资源下载失败";
                // this.resIndex ++;
          },
          })
            // 下载资源进度
          downloadTask.onProgressUpdate((res) => {
            this.txtDownload.string = "资源下载中.." +  res.progress + "%";
        })
    }

    private pbCallBack():void{
        //所有游戏数据
        if(!GameConfig.instance.gameMeta){
            GameConfig.instance.gameMeta = PBManager.instance.gameMeta;
            GameConfig.bulletReboundNum = GameConfig.instance.gameMeta.settlementRewardMeta[0].bulletReboundNum;
        }
        this.checkEnterGame();
    }

    private prog:number = 0;

    update(dt) {
        // console.log(this.prog)
        this.progre.getComponent(cc.ProgressBar).progress = this.prog;

    }

    private loadScene(sceneName:string):void{
        GameConfig.instance.lastscene = "loading";
        GameConfig.instance.nowscene = sceneName;
        cc.director.loadScene(sceneName,(err) => {
            if(!err){
                if(!PrfabsManager.loadSkinOK){
                    PrfabsManager.instance.loadHeroSkin();
                    PrfabsManager.instance.loadEnemySkin();
                }
                if(MainDataMgr.instance.getData(MainDataMgr.KEY_NEW_PLAYER) == true){
                    GameConfig.instance.saveScoreToService(0);
                    StageDataMgr.instance.setData(StageDataMgr.KEY_USER_HP_NUM,GameConfig.instance.gameMeta.energyMeta[0].initialNum);
                    MainDataMgr.IS_FIRST_OPEN = true;
                    MainDataMgr.instance.setData(MainDataMgr.KEY_LOGIN_DAY,new Date().getMonth() + "月" +  new Date().getDate());
                }
                StageDataMgr.instance.initHpTimer();
                GameUtils.buriedPoint(1);
            }else{
                this.loadScene(sceneName);
            }
        });
    }
}
