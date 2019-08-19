import GameValues from "../base/GameValues";
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
 * 外部加载 配置
 */
@ccclass
export default class ResManager {
    /**资源数据 通过url存放*/
    public data: any;
    /**spine 数据 */
    private dataAry: any[];
    /**场景数据 */
    private mapAry: any[];
    /**其他数据 */
    private otherAry: any[];
    /**加载结束回调 */
    private complete: Function;
    /**执行域 */
    private caller: any;

    private dataLen: number = 0;
    private mapLen: number = 0;

    public constructor() {
        this.data = new Object();
        this.dataAry = new Array();
        this.otherAry = new Array();
        this.readyData = new Array();
    }

    /**
     * 读取配置
     * @param callBack 
     * @param caller 
     */
    public show(resName: string, callBack: Function, caller: any): void {
        this.complete = callBack;
        this.caller = caller;
        this.loadConfig(resName);
    }
    /**
     * 读取配置 开始加载
     */
    private loadConfig(resName) {
        var self = this;
        cc.loader.loadRes(resName, function (err, res) {
            try {
                self.dataAry = res.json.resources;
                self.mapAry = res.json.map;
                self.otherAry = res.json.res;
                self.dataLen = self.dataAry.length;
                self.mapLen = self.mapAry.length;
                self.loaderFile(0);

            } catch (error) {

            }
        });
    }
    /**
     * 加载数据
     */
    private loaderFile(type: number) {
        switch (type) {
            case 0:
                var url: string = this.dataAry[0];
                this.getSkeleton(url, (res) => {
                    this.data[url] = res;
                    this.dataAry.shift();
                    if (this.dataAry.length > 0)
                        this.loaderFile(type)
                    else {
                        this.effectComplete();
                    }
                });
                break;
            case 1:
                // GameManager.eventManager.dispatchEventWith(GameCoreEventNames.RES_PROGRESS, { type: 1, max: this.mapLen, min: this.mapLen - this.mapAry.length });
                var url: string = this.mapAry[0];
                this.getLoadRes(url, (res) => {
                    this.data[url] = res
                    this.mapAry.shift();
                    if (this.mapAry.length > 0)
                        this.loaderFile(type)
                    else {
                        this.loadComplete();
                    }
                });
                break;
            case 2:// 预加载资源 ，不重要的可以放这里加载
                var url: string = this.otherAry[0];
                this.getLoadRes(url, (res) => {
                    this.data[url] = res
                    this.otherAry.shift();
                    if (this.otherAry.length > 0)
                        this.loaderFile(type)
                });
                break;

            case 3:
                var vo: any = this.readyData[0];
                // console.log("??????", vo)
                if (vo.type == 1) {
                    this.getSkeleton(vo.url, (res) => {
                        this.data[vo.url] = res
                        this.readyData.shift();
                        if (this.readyData.length > 0) {
                            this.loaderFile(3)
                        } else {
                            this.readyBack();
                        }

                    });
                } else if (vo.type == 2) {
                    {
                        this.getLoadRes(vo.url, (res) => {
                            this.data[vo.url] = res
                            this.readyData.shift();
                            if (this.readyData.length > 0) {
                                this.loaderFile(3)
                            } else {
                                this.readyBack();
                            }
                        });
                    }
                }
                break;
        }

    }

    /**
     * 动画资源加载完成
     */
    private effectComplete(): void {
        this.loaderFile(1);
    }

    /**
     * 加载完成
     */
    private loadComplete(): void {
        if (this.complete)
            this.complete.apply(this.caller);
        this.loaderFile(2);//这些是预加载的，一些不重要的资源可以放在这里。
    }


    /**
     * 获得 服务器 图片资源
     * @param url 
     * @param callBack 
     */
    private getLoadRes(url: string, callBack: Function) {
        if (typeof url == "undefined")
            return;
        var fileUrl: string = url + '?vesion=' + GameValues.gameVersion;
        // console.log("获得 服务器 图片资源:", fileUrl)
        cc.loader.load({ url: fileUrl, type: 'png' }, function (err, res) {
            if (err) {
                cc.error(err);
                return;
            }
            callBack(res);
        });
    }

    /**
     * 获得 服务器 图片资源 
     * 只会加载一次
     * @param url 
     * @param callBack 
     */
    public getServerImage(url: string, callBack: Function) {
        var vo = this.data[url]
        if (vo && typeof vo != "undefined" && vo != "" && vo != null) {
            callBack(vo)
        } else {
            this.getLoadRes(url, (res) => {
                this.data[url] = res;
                callBack(res)
            })

        }
    }

    /**
     *  获得 动画数据
     *  如果本地缓存不存在 则 重新加载
     * @param url 
     * @param callBack 
     */
    public getConfig(url: string, callBack: Function) {
        var vo = this.data[url]
        if (vo && typeof vo != "undefined" && vo != "" && vo != null) {
            callBack(vo)
        } else {
            this.getSkeleton(url, (res) => {
                this.data[url] = res;
                callBack(res)
            })

        }
    }

    /**
     * 获得 spine 动画数据
     * @param url 
     * @param callBack 
     */
    private getSkeleton(LoadFilePath: string, callBack: Function) {
        // console.log("getSkeleton:", LoadFilePath)
        // var LoadFilePath = 'https://deer-cdn.youkongwan.com/game/herotale/resources/animation/monster/monster_8001';
        var paths = [LoadFilePath + '.png?vesion=' + GameValues.gameVersion, LoadFilePath + '.atlas?vesion=' + GameValues.gameVersion, LoadFilePath + '.json?vesion=' + GameValues.gameVersion];

        let isRemote: boolean = (paths[0].match(/^https?:\/\//i) != null);
        if (isRemote) {
            cc.loader.load(paths, function (errors, results) {
                if (errors) {
                    for (var i = 0; i < errors.length; i++) {
                        cc.log('Error url [' + errors[i] + ']: ' + results.getError(errors[i]));
                    }
                    return;
                }
                var asset: any = new sp.SkeletonData();
                var urlAry: any[] = LoadFilePath.split('/');
                asset.textureNames = [urlAry[urlAry.length - 1] + '.png']
                asset.textures = [results.getContent(LoadFilePath + '.png?vesion=' + GameValues.gameVersion)];
                asset.atlasText = results.getContent(LoadFilePath + '.atlas?vesion=' + GameValues.gameVersion);
                asset.skeletonJson = results.getContent(LoadFilePath + '.json?vesion=' + GameValues.gameVersion);
                callBack(asset)
            });
        } else {
            cc.loader.loadRes(LoadFilePath, sp.SkeletonData, function (err, results) {
                if (err) {
                    cc.error(err.message || err);
                    return;
                }
                callBack(results)
            });
        }

    }



    private readyData: any[];
    private readyBack: Function;
    /**
     * 加载 图片 spine 动画 数组 ，加载完毕 有回调 
     * 可以使用在预加载窗口 先加载资源 再打开窗口
     * type 1 spine 动画  2 remote资源
     *  resAry.push({ type: 2, url: App.GameConfig.gameCdn + "texture/base/top.png" })
     * @param data 
     * @param callBack 
     */
    public readyRes(data: any, callBack: Function): void {
        this.readyData = data;
        this.readyBack = callBack;
        this.loaderFile(3);
    }



    /**
     * 加载图集
     * @param url 
     * @param callBack 
     */
    public getAtlas(url: string, callBack: Function) {
        var self = this;
        var vo = this.data[url]
        if (vo && typeof vo != "undefined" && vo != "" && vo != null) {
            callBack(vo)
        } else {
            cc.loader.loadRes(url, cc.SpriteAtlas, function (err, res) {
                if (err) {
                    cc.error(err);
                    return;
                }
                self.data[url] = res;
                callBack(res)
            });
        }
    }
    /**
     * 加载单个图片
     * @param url 
     * @param callBack 
     */
    public getRes(url: string, callBack: Function) {
        var self = this;
        var vo = this.data[url]
        if (vo && typeof vo != "undefined" && vo != "" && vo != null) {
            callBack(vo)
        } else {
            cc.loader.loadRes(url, cc.SpriteFrame, function (err, res) {
                if (err) {
                    cc.error(err);
                    return;
                }
                self.data[url] = res;
                callBack(res)
            });
        }
    }

}
