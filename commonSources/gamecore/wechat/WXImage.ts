import { QQCM_getAvatarFromOpenId } from "../platforms/QQCM_getAvatarFromOpenId";
import GameValues, { PlatformName } from "../base/GameValues";
import WXEventNames from "./WXEventNames";
import WXUtils from "./WXUtils";

/**
 * 微信和图片相关的接口
 */

export default class WXImage {

    /**
     * 创建图片
     * 
     */
    public static createImage(imageURL: string): cc.SpriteFrame {
        console.log("----  WXImage ----");
        console.log("-  createImage  -");

        if (!imageURL) return null;
        if (imageURL.length < 1000)
        console.log(imageURL);

        let sf: cc.SpriteFrame = new cc.SpriteFrame();

        if (GameValues.currentPlatform == PlatformName.IOS || typeof wx == "undefined") {
            cc.loader.load(imageURL, (error, tex: cc.Texture2D) => {
                if (tex) {
                    sf.setTexture(tex);
                }
            });
        } else if (GameValues.currentPlatform == PlatformName.QQCM && imageURL.indexOf("/") == -1) {
            //QQ厘米秀特殊处理的头像，特殊处理
            //open id
            QQCM_getAvatarFromOpenId(imageURL, (filePath) => {
                cc.loader.load(filePath, (error, tex: cc.Texture2D) => {
                    sf.setTexture(tex);
                });
            })
        } else {
            if (typeof wx != "undefined") {
                let tex: cc.Texture2D = new cc.Texture2D();

                let icon = wx.createImage();
                icon.src = imageURL;
                icon.onload = function () {
                    tex.initWithElement(icon);
                    tex.handleLoadedTexture();
                }

                sf.setTexture(tex);
            }
        }

        return sf;
    }

    /**
     * 保存图片到相册
     * 
     * @param imagePath 
     * @param success               保存成功回调
     * @param fail                  保存失败回调
     * @param complete              完成回调
     */
    public static saveImageToPhotosAlbum(imagePath: string, success: Function = null, fail: Function = null, complete: Function = null): void {
        console.log("----  WXImage ----");
        console.log("-  saveImageToPhotosAlbum  -");
        console.log(imagePath);

        if (typeof wx == "undefined") return;

        try {
            wx.saveImageToPhotosAlbum(
                {
                    "filePath": imagePath,
                    "success": success,
                    "fail": fail,
                    "complete": complete,
                }
            );
        } catch (error) {

        }
    }


    /**
     * 预览图片
     * 
     * @param images 图片的url列表
     */
    public static previewImage(images: Array<string>): void {
        console.log("----  WXImage ----");
        console.log("-  previewImage  -");
        console.log(images);

        if (typeof wx == "undefined") return;

        try {
            wx.previewImage(
                {
                    "urls": images
                }
            );
        } catch (error) {

        }
    }


    /**
     * 
     * @param rect      矩形区域   如果为null，则对整个屏幕截图
     * @param scale     缩放系数
     * 
     * @return  截图保存的临时文件目录
     */
    // public static getSnapshotFileNow(rect: cc.Rect = null, scale: number = 1): string {
    //     console.log("----  WXImage ----");
    //     console.log("-  getSnapshotFileNow  -");

    //     if (typeof wx == "undefined") {
    //         return null;
    //     }

    //     //开始截图事件
    //     GameManager.eventManager.dispatchEventWith(WXEventNames.IMAGE_SNAPSHOT_START);

    //     if (rect == null) {
    //         let frameSize: cc.Size = cc.view.getFrameSize();
    //         rect = new cc.Rect(0, 0, frameSize.width, frameSize.height);
    //     }

    //     console.log("@@@@@@@ cc.view.getFrameSize() = " + JSON.stringify(cc.view.getFrameSize()));
    //     console.log("@@@@@@@ cc.view.getDevicePixelRatio() = " + cc.view.getDevicePixelRatio());

    //     let ratio: number = cc.view.getDevicePixelRatio();
    //     rect.x *= ratio;
    //     rect.y *= ratio;
    //     rect.width *= ratio;
    //     rect.height *= ratio;

    //     let canvas: any = GameValues.canvas;
    //     let filePath:string = canvas.toTempFilePathSync({
    //         x: rect.x,
    //         y: rect.y,
    //         width: rect.width,
    //         height: rect.height,
    //         destWidth: rect.width * scale,
    //         destHeight: rect.height * scale
    //     });

    //     //结束截图事件
    //     GameManager.eventManager.dispatchEventWith(WXEventNames.IMAGE_SNAPSHOT_END);

    //     return filePath;
    // }



    /**
     * 获取屏幕截图。为兼容QQ厘米秀平台，必须使用回调来获得文件保存的路径
     * 
     * @param rect      矩形区域   如果为null，则对整个屏幕截图
     * @param scale     缩放系数
     * 
     * @param callback  返回文件保存的路径
     * @param canvas    指定canvas，如果不指定。使用默认的
     * 
     * 
     * @return  截图保存的临时文件目录
     */
    public static getSnapshotFile(rect: cc.Rect = null,
        scale: number = 1,
        callback: (filePath: string) => void = null,
        canvas: any = null
    ): void {
        console.log("----  WXImage ----");
        console.log("-  getSnapshotFile  -");

        if (typeof wx == "undefined") {
            if (callback != null) callback(null);
            return;
        }

        WXImage._getSnapshotRect = rect;
        WXImage._getSnapshotScale = scale;
        WXImage._getSnapshotCallback = callback;
        WXImage._getSnapshotCanvas = canvas;

        //开始截图事件
        WXUtils.eventManager.dispatchEventWith(WXEventNames.IMAGE_SNAPSHOT_START);

        cc.director.on(cc.Director.EVENT_AFTER_DRAW, WXImage.drawHandler, WXImage);
    }


    private static _getSnapshotRect: cc.Rect;
    private static _getSnapshotScale: number;
    private static _getSnapshotCallback: Function;
    private static _getSnapshotCanvas: any;

    private static drawHandler(e: cc.Event): void {
        cc.director.off(cc.Director.EVENT_AFTER_DRAW, WXImage.drawHandler, WXImage);

        let canvas: any = WXImage._getSnapshotCanvas || GameValues.canvas;


        let rect: cc.Rect = WXImage._getSnapshotRect;
        let scale: number = WXImage._getSnapshotScale;
        let callback: Function = WXImage._getSnapshotCallback;

        if (rect == null) {
            if (canvas != GameValues.canvas) {
                //如果不是默认canvas，使用canvas本身尺寸
                rect = new cc.Rect(0, 0, canvas.width, canvas.height);
            } else {
                let frameSize: cc.Size = cc.view.getFrameSize();
                rect = new cc.Rect(0, 0, frameSize.width, frameSize.height);
            }
        }

        console.log("@@@@@@@ cc.view.getFrameSize() = " + JSON.stringify(cc.view.getFrameSize()));
        console.log("@@@@@@@ cc.view.getDevicePixelRatio() = " + cc.view.getDevicePixelRatio());


        //默认canvas，需要缩放
        if (canvas == GameValues.canvas) {
            let ratio: number = cc.view.getDevicePixelRatio();
            rect.x *= ratio;
            rect.y *= ratio;
            rect.width *= ratio;
            rect.height *= ratio;
        }


        WXImage._getSnapshotRect = null;
        WXImage._getSnapshotScale = 1;
        WXImage._getSnapshotCallback = null;
        WXImage._getSnapshotCanvas = null;

        // let v: string = canvas.toDataURL();
        // // let v = 'data:image/png;base64,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';
        // console.log("toDataURL length = " + v.length, v.substr(0, 50));
        // let node: cc.Node = new cc.Node();
        // let sprite: cc.Sprite = node.addComponent(cc.Sprite);
        // sprite.spriteFrame = WXImage.createImage(v);
        // node.width = 300;
        // node.height = 300;
        // node.x = cc.winSize.width / 2;
        // node.y = cc.winSize.height / 2;
        // cc.director.getScene().addChild(node);

        canvas.toTempFilePath({
            x: rect.x,
            y: rect.y,
            width: rect.width,
            height: rect.height,
            destWidth: rect.width * scale,
            destHeight: rect.height * scale,
            success: (res: any) => {
                if (callback) {
                    if (res) callback(res.tempFilePath);
                    else callback(null);
                }
            },

            fail: () => {
                if (callback) callback(null);
            },

            complete: () => {
                //结束截图事件
                WXUtils.eventManager.dispatchEventWith(WXEventNames.IMAGE_SNAPSHOT_END);
            }
        });

    }


    /**
     * 读取截图文件
     * 
     * @param filePath 
     */
    static readSnapshotFileAsSpriteFrame(filePath: string): cc.SpriteFrame {
        console.log("----  WXImage ----");
        console.log("-  readSnapshotFileAsSpriteFrame  -");

        try {
            let FileSystemManager = wx.getFileSystemManager();
            let base64Value: string = FileSystemManager.readFileSync(filePath, "base64");
            // console.log(base64Value);
            return WXImage.createImage("data:image/jpg;base64," + base64Value);
        } catch (error) {
            console.log(error);
        }

        return null;
    }

    /**
     * 获取屏幕截图
     * 
     */
    static getSnapshotImage(): cc.SpriteFrame {
        console.log("----  WXImage ----");
        console.log("-  getSnapshotImage  -");

        if (typeof wx == "undefined") return null;

        // let frameSize:cc.Size = cc.view.getFrameSize();
        // let ratio:number = cc.view.getDevicePixelRatio();

        let canvas: any = GameValues.canvas;
        let data: string = canvas.toDataURL();
        return WXImage.createImage(data);
    }



}


