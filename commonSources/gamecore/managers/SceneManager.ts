import GameManager from "./GameManager";
import Comp_LoadingSceneMain from "../components/Comp_LoadingSceneMain";

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
 * 场景管理器
 */

@ccclass
export default class SceneManager {

    //加载场景最小显示时间(毫秒)
    private static MIN_LOADING_TIME: number = 2000;

    //场景队列
    private _sceneStack: Array<string> = [];


    //加载场景。
    //如果有设置加载场景，再切换场景时，会先进入加载场景
    public loadingSceneName: string;

    //当前场景
    private _currentSceneName: string;


    constructor() {
    }

    /**
     * 获取当前场景名称
     */
    public get currentSceneName(): string {
        return this._currentSceneName;
    }


    /**
     * 设置当前场景
     */
    public set currentScene(sceneName: string) {
        this._sceneStack = [sceneName]
        this._currentSceneName = sceneName;

        this.loadScene(sceneName);
    }

    /**
     * 推入场景
     * 
     * @param sceneName 场景名称
     */
    public pushScene(sceneName: string): void {
        this._sceneStack.push(sceneName);

        this.loadScene(sceneName);
    }

    /**
     * 预加载场景
     * 
     * @param sceneName 场景名称
     */
    public preloadScene(sceneName: string, success: Function = null, fail: Function = null): void {
        //预加载场景
        cc.director.preloadScene(sceneName,
            (completedCount: number, totalCount: number, item: any) => {
                // console.log("预加载场景ing", "" + completedCount + "/" + totalCount, item);
            },
            (err: any) => {
                console.log("预加载场景完成", sceneName, err);
                if (!err) {
                    if (success != null) success();
                } else {
                    console.log("场景" + GameManager.sceneManager.currentSceneName + "加载失败");
                    if (fail != null) fail();
                }
            });
    }



    /**
     * 推出场景，回到上一个场景
     */
    public popScene(): string {
        if (this._sceneStack.length > 1) {
            let v: string = this._sceneStack.pop();

            let toScene: string = this._sceneStack[this._sceneStack.length - 1];
            this.loadScene(toScene);
            return v;
        }

        return null;
    }


    /**
     * 丢弃一个场景。让该场景不再在场景栈中。如果丢弃的是最后一个场景，效果和popScene一样。
     */
    public dropScene(sceneName: string): void {
        let index: number = this._sceneStack.indexOf(sceneName);
        if (index > -1) {
            if (index == this._sceneStack.length - 1) {
                this.popScene();
            } else {
                this._sceneStack.splice(index, 1);
            }
        }
    }


    /**
     * 重置
     * 
     */
    public reset(): void {
        this._sceneStack = [];
        this._currentSceneName = null;
    }



    /**
     * 加载场景
     * 
     * @param sceneName 
     */
    private loadScene(sceneName: string) {
        // if (this._currentSceneName == sceneName) return;

        //如果有设置加载场景
        if (this.loadingSceneName) {
            //不能同时加载多个场景
            if (this._isLoading) return;

            this._currentSceneName = sceneName;
            this.showLoadingScene();

            //预加载场景
            cc.director.preloadScene(sceneName, function (err: any): void {
                console.log("err", err);
                if (!err) {
                    GameManager.sceneManager.sceneLoadedCallback(sceneName);
                } else {
                    console.log("场景" + GameManager.sceneManager.currentSceneName + "加载失败");

                    //返回到上一个场景
                    GameManager.sceneManager._isLoading = false;
                    GameManager.sceneManager.popScene();
                }
            })
        } else {
            this._currentSceneName = sceneName;
            cc.director.loadScene(sceneName);
        }
    }



    /**
     * 场景加载完毕回调
     * 
     * @param sceneName 加载的场景名
     */
    private sceneLoadedCallback(sceneName: string): void {
        if (this._currentSceneName != sceneName) return;

        //检查最小时间
        let now: number = new Date().getTime();
        console.log("【SceneManager】sceneLoadedCallback", now - this._startLoadingTime);
        if (this.loadingSceneName && (now - this._startLoadingTime < SceneManager.MIN_LOADING_TIME)) {
            setTimeout(function (): void {
                GameManager.sceneManager.sceneLoadedCallback(sceneName);
            }, 1000);
            return;
        }

        //====================================================================
        //尝试将加载场景通过动画方式移除
        //====================================================================
        //移除加载场景
        let canvas: cc.Node = cc.find("Canvas");
        if (canvas) {
            let loadingScript: Comp_LoadingSceneMain = canvas.getComponent(Comp_LoadingSceneMain);
            if (loadingScript) {
                console.log("【sceneLoadedCallback】释放加载场景");
                loadingScript.doPreDestory(0.3);

                setTimeout(function (): void {
                    GameManager.sceneManager.showCurrentScene();
                }, 400);
                return;
            }
        }
        //====================================================================

        this.showCurrentScene();
    }


    /**
     * 显示当前场景
     */
    private showCurrentScene(): void {
        this._isLoading = false;
        cc.director.loadScene(this._currentSceneName);
    }


    private _isLoading: boolean;

    //开始加载的时间（毫秒）
    private _startLoadingTime: number = 0;


    /**
     * 是否正在加载场景
     */
    public get isLoading(): boolean {
        return this._isLoading;
    }

    /**
     * 显示加载场景
     */
    private showLoadingScene(): void {
        //记录开始显示加载场景的时间
        this._startLoadingTime = new Date().getTime();

        if (this._isLoading) return;
        this._isLoading = true;

        cc.director.loadScene(this.loadingSceneName);
    }



    /**
     * 锁定场景不接受任何输入
     */
    public lockSence(): void {
        GameManager.lockScene();
    }


    /**
     * 是否解除所有锁定
     * 
     * @param unlockAll 
     */
    public unlockSence(unlockAll: boolean): void {
        GameManager.unlockScene();
    }

}
