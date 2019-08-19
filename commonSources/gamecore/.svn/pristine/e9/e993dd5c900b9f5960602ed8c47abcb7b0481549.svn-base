import WXDevice from "../wechat/WXDevice";


/**
 * 功能管理
 */
export default class Utils {

    //============================================================================

    //iphone x 顶部条高度
    static get iphoneXTopBarHeight(): number {
        return 44;
    }

    //iphone x 底部条高度(屏幕高度)
    static get iphoneBottomBarHeight(): number {
        // iPhone X、iPhone XS
        let isIPhoneX: boolean = /iphone/gi.test(navigator.userAgent) && devicePixelRatio && devicePixelRatio === 3 && screen.width === 375 && screen.height === 812;
        if (isIPhoneX) return 34;

        // iPhone XS Max
        let isIPhoneXSMax: boolean = /iphone/gi.test(navigator.userAgent) && devicePixelRatio && devicePixelRatio === 3 && screen.width === 414 && screen.height === 896;
        if (isIPhoneXSMax) return 34;

        // iPhone XR
        let isIPhoneXR: boolean = /iphone/gi.test(navigator.userAgent) && devicePixelRatio && devicePixelRatio === 2 && screen.width === 414 && screen.height === 896;
        if (isIPhoneXR) return 34;
        // console.log("@@@@@@@@@@@@@@@@@@@@", isIPhoneX, isIPhoneXSMax , isIPhoneXR)

        return 0;
    }



    /**
     * 检查是否是iphoneX iPhone XS
     * 
     */
    static get isIphoneX(): boolean {
        try {
            return /iphone/gi.test(navigator.userAgent) && (screen.height == 812 && screen.width == 375);
        } catch (error) {

        }
        return false;
    }


    /**
     * 检查是否是iphoneXR iPhone XS Max
     * 
     */
    static get isIphoneXR(): boolean {
        try {
            return /iphone/gi.test(navigator.userAgent) && (screen.height == 896 && screen.width == 414);
        } catch (error) {

        }
        return false;
    }


    /**
   * 检查是否是iphone6 iphone6 plue
   * 
   */
    static get isIphone6(): boolean {
        try {
            if (/iphone/gi.test(navigator.userAgent)) {
                if (WXDevice.systemInfo['model'].indexOf('iPhone 6') != -1)
                    return true;
            }
        } catch (error) {

        }
        return false;
    }




    /**
     * 创建舞台截图
     * 
     */
    public static getSnapshot(): cc.Node {
        let snapshotNode: cc.Node = new cc.Node();
        snapshotNode.width = cc.winSize.width;
        snapshotNode.height = cc.winSize.height;

        let sprite: cc.Sprite = snapshotNode.addComponent(cc.Sprite);

        // node.parent = cc.director.getScene();
        let camera: cc.Camera = cc.Camera.findCamera(cc.director.getScene());

        // 新建一个 RenderTexture，并且设置 camera 的 targetTexture 为新建的 RenderTexture，这样 camera 的内容将会渲染到新建的 RenderTexture 中。
        let gl = cc.game["_renderContext"];

        let texture: cc.RenderTexture = new cc.RenderTexture();
        texture.initWithSize(
            cc.winSize.width,
            cc.winSize.height,
            gl.STENCIL_INDEX8);
        camera.targetTexture = texture;

        sprite.spriteFrame = new cc.SpriteFrame(texture);

        // 渲染一次摄像机，即更新一次内容到 RenderTexture 中
        camera.render(cc.director.getScene());
        //不再需要渲染
        camera.targetTexture = null;

        return snapshotNode;
    }




    /**
     * 将cocos中canvas的rect数据转换为屏幕中的rect数据
     * 
     * @param rect 
     */
    static toScreenRect(rect: any): any {
        // console.log("!!!!!!!!!!!!!!!!!!!!!!");
        let winSize: cc.Size = cc.winSize;

        let newRect: cc.Rect = new cc.Rect(rect.x, rect.y, rect.width, rect.height);
        console.log(newRect.x, newRect.y, newRect.width, newRect.height);
        //转换为左上角作为(0, 0)点的坐标
        newRect.x = rect.x;
        newRect.y = winSize.height - (newRect.y + newRect.height);
        // console.log(newRect.x, newRect.y, newRect.width, newRect.height);

        //获取屏幕尺寸
        // let screenSize: cc.Size = cc.view.getFrameSize();
        // console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
        // console.log(screenSize.width, screenSize.height);

        //计算缩放比例
        let s: number = Utils.getCanvasScaleFactor();
        newRect.x *= s;
        newRect.y *= s;
        newRect.width *= s;
        newRect.height *= s;
        // console.log(newRect.x, newRect.y, newRect.width, newRect.height);

        return newRect;
    }


    /**
     * 将屏幕中的矩形区域，转换为cocos中canvas的矩形区域
     * 
     * @param rect      cc.Rect对象 
     */
    static fromScreenRect(rect:any): any {
        // console.log("!!!!!!!!!!!!!!!!!!!!!!");
        // console.log("fromScreenRect");
        if (!rect) return null;


        // let newRect: cc.Rect = rect.clone();
        let newRect: cc.Rect = new cc.Rect(rect.x, rect.y, rect.width, rect.height);
        // console.log(newRect.x, newRect.y, newRect.width, newRect.height);

        //获取屏幕尺寸
        let screenSize: cc.Size = cc.view.getFrameSize();
        // console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
        // console.log(screenSize.width, screenSize.height);
        newRect.y = screenSize.height - newRect.y - newRect.height;

        //计算缩放比例
        let s: number = Utils.getCanvasScaleFactor();

        newRect.x /= s;
        newRect.y /= s;
        newRect.width /= s;
        newRect.height /= s;


        // return {"x":newRect.x, "y":newRect.y, "width":newRect.width, "height":newRect.height};
        let canvasRect: cc.Rect = new cc.Rect(newRect.x, newRect.y, newRect.width, newRect.height);
        // console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@", s);
        // console.log(canvasRect.x, canvasRect.y, canvasRect.width, canvasRect.height)
        return canvasRect;
    }



    /**
     * 将一个值转换为整型。如果失败，则返回0
     * 
     * @param value
     */
    static toInt(value: any): number {
        let v: number = parseInt("" + value);
        if (isNaN(v)) v = 0;
        return v;
    }



    /**
     * 自动缩放内容
     * 
     * @param content 
     */
    static scaleContentAuto(content: cc.Node): void {
        let desS: number = 1334 / 750;//设计比例

        var winSize: cc.Size = cc.winSize;
        let winS: number = winSize.height / winSize.width;
        console.log("【scaleContentAuto】", desS, winS);
        if (winS > desS) {
            content.scale = winSize.width / 750;
        }
    }


    /**
     * canvas缩放因子
     * 
     */
    static getCanvasScaleFactor(): number {
        //是否是高度适配
        let fitHeight: boolean = true;

        try {
            //获取canvas
            let canvas: cc.Canvas = cc.director.getScene().children[0].getComponent(cc.Canvas);
            fitHeight = canvas.fitHeight;
        } catch (error) {

        }

        let screenSize: cc.Size = cc.view.getFrameSize();

        //计算缩放比例
        let s: number = 1;
        if (fitHeight) {
            s = screenSize.height / cc.winSize.height;
        } else {
            s = screenSize.width / cc.winSize.width;
        }

        return s;
    }


    //==============================================================
    private static _labelToValueMap: object = {};

    /**
     * 将一个label的值增加到或减少到另外一个值。
     * 比如是整数。
     * 
     * @param label 
     * @param v 
     * @param duration          动画时间
     */
    static labelStringToValue(label: cc.Label, v: number, duration: number = 0.5): void {
        if (isNaN(v)) return;

        let currentV: number = parseInt(label.string);
        if (isNaN(currentV) || currentV < 0) currentV = 0;
        if (currentV == v) return;

        let uuid: string = label.uuid;
        clearInterval(this._labelToValueMap[uuid]);

        let stepV: number = (v - currentV) / 10;
        let step: number = 0;

        this._labelToValueMap[uuid] = setInterval(function (): void {
            step++;
            if (step == 10) {
                label.string = "" + v;
                // console.log("label to value", v, label.string);

                clearInterval(Utils._labelToValueMap[uuid]);
            } else {
                label.string = "" + (currentV + Math.floor(stepV * step));
                // console.log(v, label.string);
            }

        }, 50);
    }


    /**
     * 创建一个带颜色的点
     * 
     */
    static newPoint(fullSize: boolean = false): cc.Node {
        let theNode: cc.Node = new cc.Node();

        let sprite: cc.Sprite = theNode.addComponent(cc.Sprite);
        sprite.spriteFrame = new cc.SpriteFrame("https://deer-cdn.youkongwan.com/common/blank_debug.png");

        theNode.width = 2;
        theNode.height = 2;

        if (fullSize) {
            let widget: cc.Widget = theNode.addComponent(cc.Widget);
            widget.isAlignTop = true;
            widget.top = 0;
            widget.isAlignLeft = true;
            widget.left = 0;
            widget.isAlignRight = true;
            widget.right = 0;
            widget.isAlignBottom = true;
            widget.bottom = 0;
            widget.alignMode = cc.Widget.AlignMode.ALWAYS;
        }
        // var ctx: cc.Graphics = theNode.addComponent(cc.Graphics);
        // if (color == null) color = new cc.Color(255, 0, 0, 160);
        // ctx.fillColor = color;
        // ctx.fillRect(0, 0, theNode.width, theNode.height);
        // ctx.stroke();

        return theNode;
    }

    /**
  * 将fromNode节点的一个点，转换为toNode节点中的位置
  * 
  * @param po 
  * @param fromNode 
  * @param toNode 
  */
    static positionToPosition(po: cc.Vec2, fromNode: cc.Node, toNode: cc.Node): cc.Vec2 {
        // console.log("【positionToPosition】")
        // console.log("original point", po.x, po.y);

        po = new cc.Vec2(po.x, po.x);
        po.x += fromNode.width * fromNode.anchorX;
        po.y += fromNode.height * fromNode.anchorY;

        po = fromNode.convertToWorldSpace(po);
        // console.log("world point", po.x, po.y);
        if (toNode) {
            po = toNode.convertToNodeSpace(po);
            po.x -= toNode.width * toNode.anchorX;
            po.y -= toNode.height * toNode.anchorY;
        }

        // console.log("to node point", po.x, po.y);

        return po;
    }
}
