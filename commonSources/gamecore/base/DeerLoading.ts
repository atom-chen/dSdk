import GameManager from "../managers/GameManager";


/**
 * DeerLoading 窗口
 */
export default class DeerLoading {
    /**node 节点 */
    private container: cc.Node;
    /**DeerLoading */
    private static instance: DeerLoading;
    public static getInstance(): DeerLoading {
        if (this.instance == null) {
            this.instance = new DeerLoading();
        }
        return this.instance;
    }


    /**
     * 打开 loading 界面
     * @param content 
     */
    public addPop(content: string) {
        let centerPoint: cc.Vec2 = new cc.Vec2(0, 0);
        var scene = cc.director.getScene().children[0];
        scene.children.forEach((ele: cc.Node) => {
            ele.zIndex = 0;
        })
        this.container = new cc.Node();
        scene.addChild(this.container);

        let bg: cc.Node = null;
        bg = this.createPopUpBg();
        bg.y = centerPoint.y;
        bg.x = centerPoint.x;
        this.container.addChild(bg);
        let imgNode: cc.Node = new cc.Node();
        var sp: cc.Sprite = imgNode.addComponent(cc.Sprite);
        GameManager.resManager.getServerImage("https://deer-cdn.youkongwan.com/common/loadingicon.png", (res) => {
            if (sp)
                sp.spriteFrame = new cc.SpriteFrame(res);
        })

        var action = cc.repeatForever(cc.rotateBy(3, 360, 360));
        imgNode.runAction(action);
        this.container.addChild(imgNode);

        var txtNode: cc.Node = new cc.Node();
        var txt: cc.Label = txtNode.addComponent(cc.Label);
        txt.string = content;
        txt.fontSize = 30;
        this.container.addChild(txtNode);
        txtNode.y = -100;

    }

    /**
     * 移除loading 界面
     * 
     * @param node 
     */
    public removePop(): void {
        if (this.container && this.container.isValid) {
            this.container.destroy();
        }
    }


    /**
    * 创建背景
    */
    private createPopUpBg(alpha: number = 160): cc.Node {
        let winSize: cc.Size = cc.winSize;
        //半透明节点
        let alphaNode: cc.Node = new cc.Node();
        alphaNode.width = winSize.width;
        alphaNode.height = winSize.height;
        var ctx: cc.Graphics = alphaNode.addComponent(cc.Graphics);
        ctx.fillColor = new cc.Color(0, 0, 0, alpha);
        ctx.lineWidth = 0;
        if (cc.ENGINE_VERSION >= "2.0.0") {
            ctx.fillRect(-winSize.width / 2, -winSize.height / 2, winSize.width, winSize.height);
        } else {
            ctx.fillRect(0, 0, winSize.width, winSize.height);
        }
        ctx.stroke();
        let bg: cc.Node = new cc.Node();
        bg.width = winSize.width;
        bg.height = winSize.height;
        //半透明节点
        bg.addChild(alphaNode);
        bg.addComponent(cc.BlockInputEvents);
        return bg;
    }


    // update (dt) {}
}
