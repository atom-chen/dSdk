import WXImage from "../gamecore/wechat/WXImage";
import WXShare from "../gamecore/wechat/WXShare";
import WXUtils from "../gamecore/wechat/WXUtils";
import GameManager from "../gamecore/managers/GameManager";
import XYJAPI from "../gamecore/xiaoyaoji/XYJAPI";
import { DeerAdVO } from "../gamecore/deer/DeerSDK";
// import GameScoreData from "../gameScene/GameScoreData";

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
 * 交叉推广item
 */
@ccclass
export default class CrossAdItemMain extends cc.Component {

    //预览图
    @property(cc.Sprite)
    imgSprite: cc.Sprite = null;

    //信息条背景
    @property(cc.Sprite)
    infoBgSprite: cc.Sprite = null;

    //name
    @property(cc.Label)
    nameLabel: cc.Label = null;

    //info
    @property(cc.Label)
    infoLabel: cc.Label = null;


    @property([cc.SpriteFrame])
    infoBgSFs: cc.SpriteFrame[] = [];



    public data: DeerAdVO;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    private _imageOriginalSize: cc.Size;

    start() {
        this._imageOriginalSize = new cc.Size(this.imgSprite.node.width, this.imgSprite.node.height);

        this.refreshUI();

        this.node.on(cc.Node.EventType.TOUCH_END, this.tapHandler, this);
    }

    // update (dt) {}


    private refreshUI(): void {
        if (!this.data) return;

        let index: number = this.data["index"];
        index = index % this.infoBgSFs.length;

        this.infoBgSprite.spriteFrame = this.infoBgSFs[index];
        this.nameLabel.string = this.data.name;
        // this.infoLabel.string = "" + this.data["ad_count"] + "人正在玩";
        this.infoLabel.string = Math.floor(Math.random() * 1000000 + 2000000) + "人正在玩";


        // this.imgSprite.spriteFrame = WXImage.createImage(this.data["imageurl"]);
        // this.imgSprite.spriteFrame
        let imageURL: string = this.data.img_256_129;
        if (imageURL) {
            cc.loader.load(imageURL, (err, texture: cc.Texture2D) => {
                // console.log(err, texture);
                if (!err && this.imgSprite) {
                this.imgSprite.spriteFrame = new cc.SpriteFrame(texture);
                this.imgSprite.node.width = texture.width;
                this.imgSprite.node.height = texture.height;
                this.imgSprite.node.scaleX = this._imageOriginalSize.width / texture.width;
                this.imgSprite.node.scaleY = this._imageOriginalSize.height / texture.height;
                }
            });
        }
    }



    private tapHandler(e: cc.Event): void {
        // GameScoreData.settingPoint(25);
        GameManager.soundsManager.playTapSound();

        if (this.data) this.data.navigate();
    }
}
