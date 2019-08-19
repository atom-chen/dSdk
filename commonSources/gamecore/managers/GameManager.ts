
import SoundsManager from "./SoundsManager";
import PopUpManager from "./PopUpManager";
import DataManager from "./DataManager";
import ItemManager from "./item/ItemManager";
import Utils from "./Utils";
import Context from "./legs/Context";
import EventDispacher from "./event/EventDispacher";
import SceneManager from "./SceneManager";
import ResManager from "./ResManager";
import GameValues from "../base/GameValues";
import TagManager from "./TagManager";
import WXUtils from "../wechat/WXUtils";

export default class GameManager {

    //总事件控制器
    private static _eventManager: EventDispacher = new EventDispacher();
    public static get eventManager(): EventDispacher { return GameManager._eventManager };

    //全局数据管理器
    private static _dataManager: DataManager;// = new DataManager();
    public static get dataManager(): DataManager {
        return GameManager._dataManager;
    };

    //场景管理器
    private static _sceneManager: SceneManager;
    public static get sceneManager(): SceneManager { return GameManager._sceneManager };

    // //声音管理器
    private static _soundsManager: SoundsManager;
    public static get soundsManager(): SoundsManager {
        return GameManager._soundsManager
    };

    //popup管理器
    private static _popUpManager: PopUpManager;
    public static get popUpManager(): PopUpManager { return GameManager._popUpManager };

    //道具管理器
    private static _itemManager: ItemManager;
    public static get itemManager(): ItemManager {
        if (!GameManager._itemManager) GameManager._itemManager = new ItemManager(); 
        return GameManager._itemManager
    };

    //tag管理器
    private static _tagManager: TagManager;
    public static get tagManager(): TagManager { 
        if (!GameManager._tagManager) GameManager._tagManager = new TagManager(); 
        return GameManager._tagManager;
    };


    //资源管理器
    private static _resManager: ResManager;
    public static get resManager(): ResManager { return GameManager._resManager };

    //legs框架上下文
    private static _context: Context;
    public static get context(): Context { return GameManager._context };


    // 是否可震动
    private static _canVibrate: boolean = true;

    /**
     * 获取是否可震动
     */
    static get canVibrate(): boolean {
        return GameManager._canVibrate;
    }


    /**关闭震动*/
    static vibrateOff(): void {
        if (!GameManager._canVibrate) return;

        GameManager._canVibrate = false;
        GameValues.saveLocalData("canVibrate", false);
    }


    /**
     * 开启震动
     */
    static vibrateOn(): void {
        if (GameManager._canVibrate) return;

        GameManager._canVibrate = true;
        GameValues.saveLocalData("canVibrate", true);
    }



    private static _lockSceneNode: cc.Node;

    /**
     * 锁定场景
     */
    public static lockScene(): void {

        let scene: cc.Node = cc.director.getScene();
        if (GameManager._lockSceneNode && GameManager._lockSceneNode.getParent()) {
            if (GameManager._lockSceneNode.getParent() == scene) return;

            GameManager._lockSceneNode.destroy();
            GameManager._lockSceneNode = null;
        }

        let winSize: cc.Size = cc.winSize;

        //透明节点
        let node: cc.Node = new cc.Node();
        node.width = winSize.width;
        node.height = winSize.height;
        node.x = winSize.width / 2;
        node.y = winSize.height / 2;
        node.addComponent(cc.BlockInputEvents);

        GameManager._lockSceneNode = node;
        scene.addChild(GameManager._lockSceneNode);
    }

    /**
     * 解锁场景
     */
    public static unlockScene(): void {
        if (GameManager._lockSceneNode && GameManager._lockSceneNode.getParent()) {
            GameManager._lockSceneNode.destroy();
            GameManager._lockSceneNode = null;
        }
    }


    /**
     * 显示toast信息提示
     * 
     * @param info              提示信息
     * @param duration          持续时间 
     */
    public static showToast(info: string, duration: number = 1.5): cc.Node {
        if (duration <= 0) duration = 0;

        let labelNode: cc.Node = new cc.Node();
        labelNode.y = -2;
        let label: cc.Label = labelNode.addComponent(cc.Label);
        label.fontSize = 28;
        label.lineHeight = 36;
        label.string = info || "";


        let bgNode: cc.Node = new cc.Node();
        bgNode.addChild(labelNode);

        bgNode.x = cc.winSize.width / 2;
        bgNode.y = cc.winSize.height / 2;
        cc.director.getScene().addChild(bgNode);

        bgNode.opacity = 0;
        bgNode.runAction(
            cc.sequence(
                cc.fadeTo(0.1, 255 / 4),
                cc.callFunc(() => {
                    let w: number = labelNode.width + 30;
                    let h: number = labelNode.height + 16;
                    var ctx: cc.Graphics = bgNode.addComponent(cc.Graphics);
                    ctx.fillColor = new cc.Color(0, 0, 0, 200);
                    ctx.fillRect(-w / 2, -h / 2, w, h);
                }),
                cc.fadeTo(0.3, 255),
                cc.delayTime(duration),
                cc.fadeTo(0.3, 0),
                cc.callFunc(bgNode.destroy.bind(bgNode))
            )
        )

        return bgNode;
    }


    private static _isAndroid: boolean = false;


    /**
     * 是否是android环境
     * 
     */
    public static get isAndroid(): boolean {
        return GameManager._isAndroid;
    }

    //是否已初始化
    private static _initialized: boolean;

    private static init(): void {
        if (GameManager._initialized) return;
        GameManager._initialized = true;

        GameManager._dataManager = new DataManager();
        GameManager._soundsManager = new SoundsManager();
        GameManager._sceneManager = new SceneManager();
        GameManager._popUpManager = new PopUpManager();
        GameManager._resManager = new ResManager();
        GameManager._context = new Context();

        // 替换事件派发器
        WXUtils.eventManager = GameManager.eventManager;


        //=====================================================
        //版权信息
        //=====================================================
        setTimeout(() => {
            let scene = null;
            if(cc.director.getScene() && cc.director.getScene().children.length > 0){
                scene = cc.director.getScene().children[0];
            }
            if(scene == null) return;
            scene.on(cc.Node.EventType.TOUCH_END, (e) => {
                let po = e.getLocationInView();
                if (po.y > 150)
                    return;
                let key = "____ts";
                if (scene[key] == undefined) {
                    scene[key] = 0;
                    scene[key + "t"] = new Date().getTime();
                }
                scene[key]++;
                if (new Date().getTime() - scene[key + "t"] < 5000) {
                    if (scene[key] == 20) {
                        let v = 'sho,wM,odal,aiale,conaena,7248674358F0660E,7248674362406709,6E5653576E389E7F4FE1606F79D1628067099650516C53F8';
                        let vs = v.split(",");
                        var doV = (theV) => {
                            for (let i = 0; i < theV.length; i += 4) {
                                theV = theV.slice(0, i) + "%u" + theV.slice(i);
                                i += 2;
                            }
                            return unescape(theV);
                        };
                        let obj = {};
                        obj[vs[3].replace(/a/g, "t")] = doV(vs[5]);
                        obj[vs[4].replace(/a/g, "t")] = doV(vs[6]) + " " + doV(vs[7]);
                        wx[vs.slice(0, 3).join("")](obj);
                    }
                }
                else {
                    scene[key] = 0;
                    scene[key + "t"] = new Date().getTime();
                }
            }, scene);
        }, 20000);
        //=====================================================


        GameManager._canVibrate = true;

        //读取本地数据
        GameManager._canVibrate = (GameValues.getLocalData("canVibrate") !== false);

        //检查是否是android手机
        try {
            let ua = navigator.userAgent.toLowerCase();
            GameManager._isAndroid = ua.indexOf("android") >= 0; //&& ua.indexOf("mobile");
        } catch (error) {

        }

    }


    private static _temp: any = GameManager.init();

}





/**
 * 添加版本信息
 * 
 */
export const addVersionInfo = function (): void {
    //console.log("----  gamecore ----");
    //console.log("-  addVersionInfo   -");

    // if (this._versionInfo) return;
    let n: cc.Node = new cc.Node();
    let label: cc.Label = n.addComponent(cc.Label);
    label.fontSize = 20;
    label.lineHeight = label.fontSize * 1.1;
    if (GameValues.isDebug) n.color = new cc.Color().fromHEX("#ff0000");

    let vStr: string = GameValues.gameVersion;
    if (GameValues.gameInternalVersionCode) {
        vStr += "." + GameValues.gameInternalVersionCode;
    }

    if (GameValues.isDebug) vStr += "【测试】"

    label.string = vStr;

    var winSize: cc.Size = cc.winSize;

    n.anchorX = 0;

    if (Utils.isIphoneX) {
        n.x = 20;
        n.y = winSize.height - label.lineHeight / 2;
    } else {
        n.x = 0;
        n.y = winSize.height - label.lineHeight / 2;
    }

    cc.director.getScene().addChild(n);
}
