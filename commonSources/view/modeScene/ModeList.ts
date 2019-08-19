import GameUtils from "../../GameUtils";
import SoundMgr from "../../SoundMgr";
import StageDataMgr from "../../module/data/StageDataMgr";
import GameConfig, { MODE_TYPE_STRUCT, PassStageInfo, STAGE_STATE_STRUCT } from "../stageMode/GameConfig";
import ModeListItem from "./ModeListItem";

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
export default class ModeList extends cc.Component {

    @property(cc.Label)
    txtModeStars: cc.Label = null;

    @property(cc.Label)
    txtProgrs:cc.Label = null;

    @property(cc.Node)
    subItem:cc.Node = null;

    @property(cc.Node)
    content:cc.Node = null;

    @property(cc.Node)
    item:cc.Node = null;

    /**星星模板 */
    @property(cc.Node)
    star:cc.Node = null;

    @property(cc.SpriteFrame)
    starSpfmArr:cc.SpriteFrame[] = [];
    
    @property(cc.SpriteFrame)
    stateSpfmArr:cc.SpriteFrame[] = [];

    @property(cc.ScrollView)
    scrollView:cc.ScrollView = null;
    
    
    
    @property(cc.Node)
    freeHpNode:cc.Node = null;
    
    

    

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        
    }

    private modeInfo:Array<PassStageInfo> = null;
    start () {

        let stageNum:number = GameConfig.instance.getModeStageNumByMode(StageDataMgr.CUR_MODE);
        this.txtModeStars.string = StageDataMgr.instance.getStarsByMode(StageDataMgr.CUR_MODE) + "/" + stageNum * 3;
        


        this.modeInfo = StageDataMgr.instance.getInfoByMode(StageDataMgr.CUR_MODE);
        
        let length = this.modeInfo.length;
        
        if(length == stageNum){
            this.txtProgrs.string = "进度：已通关";
        }else{
            this.txtProgrs.string = "进度：第" + (length + 1) + "关";
        }

        let count:number = 0;
        let index = 0;

        let curPercent:number = 0;
        let n = Math.floor(stageNum / 16);
        for(;index < n;index ++){
            let item = cc.instantiate(this.item);

            // GameUtils.loadRes("textures/modeSelect/" + StageDataMgr.CUR_MODE + "/bg" + (index + 1),cc.SpriteFrame,false,(spfm) =>{
            //     item.getChildByName("bg").getComponent(cc.Sprite).spriteFrame = spfm;
            // })
            GameUtils.loadRes("textures/modeSelect/0/bg" + (index + 1),cc.SpriteFrame,false,(spfm) =>{
                if(this.content){
                    item.getChildByName("bg").getComponent(cc.Sprite).spriteFrame = spfm;
                }
            })
            

            this.content.addChild(item);
            if(index == 0 && StageDataMgr.CUR_MODE == MODE_TYPE_STRUCT.MODE1){
                this.freeHpNode.parent = item;
                this.freeHpNode.position = cc.v2(-300,316);
                this.freeHpNode.active = true;
            }

            for(let i = 0; i < 16; i ++){
                let subItem = cc.instantiate(this.subItem);
                item.getChildByName("subContent").addChild(subItem);
                if(!this.modeInfo[count]){
                    this.modeInfo[count] = {
                        skip : STAGE_STATE_STRUCT.LOCK,
                        star : 0,
                        index : count + 1,
                    }
                    if(count == length){
                        this.modeInfo[count].skip = STAGE_STATE_STRUCT.HEIGHTEST;
                        curPercent = index;
                    }
                }
                subItem.getComponent(ModeListItem).ModeListComp = this;
                subItem.getComponent(ModeListItem).init(this.modeInfo[count]);
                count ++;
            }
        }
        if(stageNum % 16 != 0){
            let item = cc.instantiate(this.item);
            this.content.addChild(item);

            GameUtils.loadRes("textures/modeSelect/0/bg" + (index + 1),cc.SpriteFrame,false,(spfm) =>{
                if(this.content){
                    item.getChildByName("bg").getComponent(cc.Sprite).spriteFrame = spfm;
                }
            })


            for(let i = 0; i < stageNum % 16; i ++){
                let subItem = cc.instantiate(this.subItem);
                item.getChildByName("subContent").addChild(subItem);

                if(!this.modeInfo[count]){
                    this.modeInfo[count] = {
                        skip : STAGE_STATE_STRUCT.LOCK,
                        star : 0,
                        index : count + 1,
                    }
                    if(count == length){
                        this.modeInfo[count].skip = STAGE_STATE_STRUCT.HEIGHTEST;
                    }
                }
                subItem.getComponent(ModeListItem).ModeListComp = this;
                subItem.getComponent(ModeListItem).init(this.modeInfo[count]);
                count ++;
            }
        }


        this.scheduleOnce(() => {
            if(curPercent >= this.scrollView.content.children.length){
                return;
            }
            this.scrollView.scrollToOffset(cc.v2(this.scrollView.content.children[curPercent].x,-this.scrollView.content.children[curPercent].y - this.scrollView.content.children[curPercent].height / 2 ));
        })
    }

    private backModeSelectSceneClickEvent(e:cc.Event):void{
        SoundMgr.instance.playTapSound();
        GameUtils.instance.loadSceneWithOperate("modeSelectScene");
    }

    // update (dt) {}
}


