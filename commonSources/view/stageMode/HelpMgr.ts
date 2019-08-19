import { MODE_TYPE_STRUCT } from "./GameConfig";
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
export default class HelpMgr {
    public static showHelpEvent:string = "showHelpEvent";


    /**本关有提示 */
    public static isHelpValid(mode:MODE_TYPE_STRUCT,stage:number):boolean{
        if(mode == MODE_TYPE_STRUCT.MODE1 && stage > 16 && stage <= 64){
            return true;
        }
        return false;
    }


    public static isCurStageHelpOpened(mode:MODE_TYPE_STRUCT,stage:number):boolean{
        let stageInfo:number = StageDataMgr.instance.getData(StageDataMgr.KEY_HELP_OPEN_STAGE);
        let openMode:MODE_TYPE_STRUCT = stageInfo > 10000 ? stageInfo % 10000 : 0;
        let openStage:number = stageInfo - openMode * 10000;
        if(mode == openMode && openStage == stage){
            return true;
        }
        return false;
    }


    public static setHelpOpenInfo(mode:MODE_TYPE_STRUCT,stage:number):void{
        let stageInfo = mode * 10000 + stage;
        StageDataMgr.instance.setData(StageDataMgr.KEY_HELP_OPEN_STAGE,stageInfo);
    }
    
}
