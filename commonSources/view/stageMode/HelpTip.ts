import BasePanelComp from "../base/BasePanelComp";
import SoundMgr from "../../SoundMgr";
import GameMainMgr from "./GameMainMgr";
import GameUtils from "../../GameUtils";
import HelpMgr from "./HelpMgr";
import StageDataMgr from "../../module/data/StageDataMgr";

// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class HelpTip extends BasePanelComp {
    @property(cc.Node)
    content:cc.Node = null;

    onLoad(){
        if(StageDataMgr.CUR_LEVEL > 32){
            this.content.scale = 1.44;
        }
    }


    public cancelCallfunc:Function = null;

    private onShowTipClickEvent(e:cc.Event):void{
        if(e){
            SoundMgr.instance.playTapSound();
        }
        this.showVideo();
    }

    private onCloseClickEvent(e:cc.Event):void{
        if(e){
            SoundMgr.instance.playTapSound();
        }
        if(this.cancelCallfunc){
            this.cancelCallfunc();
        }
        this.close();
    }


    private showVideo():void{
        GameUtils.instance.showVideoAd(
            () => {
                // this.onCloseClickEvent(null);
                GameUtils.showToast("恭喜您获得过关提示");
                HelpMgr.setHelpOpenInfo(StageDataMgr.CUR_MODE,StageDataMgr.CUR_LEVEL);
                GameUtils.instance.loadSceneWithOperate("map");
            },
            () => {
              GameUtils.showAlert("观看完整视频可获得过关提示", () => {
                //重新观看
                this.showVideo();
              },() => {
                    // StageDataMgr.GOLDEN_EGG_GOLD_NUM = new MaxValue(0,0);
                    this.onCloseClickEvent(null);
              });
            },
            () => {
                GameUtils.instance.playFailOnShare((res: number) => {
                    switch (res) {
                        case 1:
                            GameUtils.showToast("恭喜您获得过关提示");
                            HelpMgr.setHelpOpenInfo(StageDataMgr.CUR_MODE,StageDataMgr.CUR_LEVEL);
                            GameUtils.instance.loadSceneWithOperate("map");
                        break;
                    }
                }, "showHelpTip");
            }
        );
    }
}
