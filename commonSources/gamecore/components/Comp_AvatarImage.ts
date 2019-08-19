import WXImage from "../wechat/WXImage";
import WXUser from "../wechat/WXUser";

// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

/**
 * 头像图片
 */
@ccclass
export default class Comp_AvatarImage extends cc.Component {

    @property({
        displayName:"默认头像URL"
    })
    imageURL:string = "https://deer-cdn.youkongwan.com/common/gamesdeer2_128.png";

    // onLoad () {}

    private _sprite:cc.Sprite;

    start () {
        this._sprite = this.node.getComponent(cc.Sprite);
        if (!this._sprite) {
            this._sprite = this.node.addComponent(cc.Sprite);
        }

        
        this.refreshImage();

        if (!WXUser.userInfo) {
            WXUser.onUserInfo(this.userInfoCallback.bind(this));
        }
    }


    private userInfoCallback():void {
        WXUser.offUserInfo(this.userInfoCallback.bind(this));

        this.refreshImage();
    }

    // update (dt) {}


    private refreshImage():void {
        if (WXUser.userInfo && WXUser.userInfo.avatarUrl) {
            this._sprite.spriteFrame = WXImage.createImage(WXUser.userInfo.avatarUrl);
        } else {
            if (this.imageURL) {
                this._sprite.spriteFrame = WXImage.createImage(this.imageURL);
            }
        }
    }



    onDestroy() {
        WXUser.offUserInfo(this.userInfoCallback.bind(this));
    }

}
