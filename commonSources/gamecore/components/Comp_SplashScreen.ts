import GameManager from "../managers/GameManager";
import Comp_LoadingSceneMain from "./Comp_LoadingSceneMain";
import WXUtils from "../wechat/WXUtils";

// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

/**
 * 启动屏场景。该脚本请挂载在场景下
 */

@ccclass
export default class Comp_SplashScreen extends cc.Component {

    @property({
        tooltip: "该场景过后进入的场景名称",
        displayName: "主场景名"
    })
    mainSceneName: string = "";



    @property({
        displayName: "停留时间(秒)"
    })
    showTime: number = 2;


    @property({
        displayName: "子包名"
    })
    subPackage: string = "";


    @property({
        tooltip: "如果不需要加载配置请置空",
        displayName: "加载配置"
    })
    resName: string = '';


    // onLoad () {}

    //主场景是否已加载完成
    protected _mainSceneLoaded: boolean;

    start() {
        this.schedule(this.doShowMainScene, 0.1);

        this.loadSubPackage();
    }


    protected _subPackageLoaded: boolean = false;

    /**
     * 加载子包
     */
    protected loadSubPackage(): void {
        if (this.subPackage && typeof wx != "undefined") {
            cc.loader.downloader.loadSubpackage('subp', (err) => {
                //console.log("#########################################");
                //console.log("子包数据", err);
                //console.log("#########################################");
                if (err) {
                    WXUtils.showToast("资源加载失败，请稍后再试", 3);
                    return;
                }

                this._subPackageLoaded = true;

                //不预加载，直接进入主场景
                // this._mainSceneLoaded = true;
                // this.scheduleOnce(this.loadMainScene, 0.5);
                // this.scheduleOnce(() => {this._mainSceneLoaded = true;}, 3);
                this.loadMainScene();
            });
        } else {
            this._subPackageLoaded = true;
            this.loadMainScene();
        }
    }


    /**
     * 加载下一个场景
     */
    protected loadMainScene(): void {
        //console.log("预加载主场景", this.mainSceneName);

        //如果没有要预加载资源 
        if (this.mainSceneName) {
            GameManager.sceneManager.preloadScene(this.mainSceneName, this.mainSceneLoadedCallback.bind(this));
        } else {
            this._mainSceneLoaded = true;
        }
    }


    private mainSceneLoadedCallback(): void {
        //console.log("【mainSceneLoadedCallback】", this);
        this._mainSceneLoaded = true;
    }


    private _passedTime: number = 0;

    /**
     * 获取是否已准备好
     */
    protected checkIsReady(): boolean {
        if (this._passedTime < this.showTime) return false;

        if (this.subPackage && !this._subPackageLoaded) return false;
        if (this.mainSceneName && !this._mainSceneLoaded) return false;

        return true;
    }


    private doShowMainScene(): void {
        this._passedTime += 0.1;

        if (this.checkIsReady()) {
            this.unschedule(this.doShowMainScene);
            this.enterMainScene();
        }
    }


    /**
     * 进入主场景
     */
    protected enterMainScene(): void {
        //移除加载场景
        let loadingScript: Comp_LoadingSceneMain = this.node.getComponent(Comp_LoadingSceneMain);
        if (loadingScript) {
            //尝试将加载场景通过动画方式移除
            //console.log("【sceneLoadedCallback】释放加载场景");
            loadingScript.doPreDestory(0.3);

            this.scheduleOnce(() => {
                GameManager.sceneManager.pushScene(this.mainSceneName);
            }, 0.4);
        } else {
            GameManager.sceneManager.pushScene(this.mainSceneName);
        }
    }


    // update (dt) {}


    onDestroy() {
        this.unschedule(this.doShowMainScene);
    }

}
