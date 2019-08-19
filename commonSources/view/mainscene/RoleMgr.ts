

import MainDataMgr, { RoleSKinInfo } from "../../module/data/MainDataMgr";
import StageDataMgr from "../../module/data/StageDataMgr";
import GameConfig from "../stageMode/GameConfig";

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
export default class RoleMgr  {



    private static bestStageNum:number = null;
    public static calcuRoleData(): Array<RoleSKinInfo>{
        let bestStageNum = StageDataMgr.instance.getAllModeStars();
        let curRoleSkinArr:Array<RoleSKinInfo> = MainDataMgr.instance.getData(MainDataMgr.KEY_ROLE_SKIN_ARR);

        if(bestStageNum == RoleMgr.bestStageNum){
            return curRoleSkinArr;
        }
        RoleMgr.bestStageNum = bestStageNum;

        let imageUpgradeMeta = GameConfig.instance.gameMeta.imageUpgradeMeta;
        for(let i = 1;i < imageUpgradeMeta.length; i ++){
            if(bestStageNum >= imageUpgradeMeta[i].starsNum){
                if(!curRoleSkinArr[i]){
                    // curRoleSkinArr[i]:RoleSKinInfo = new RoleSKinInfo(i,0,false);
                    curRoleSkinArr[i] = {
                        id:i,
                        state:0,
                        equip:false,
                    }
                }
            }else{
                break;
            }
        }
        // console.log(curRoleSkinArr,"玩家装备信息");
        MainDataMgr.instance.setData(MainDataMgr.KEY_ROLE_SKIN_ARR,curRoleSkinArr);
        return curRoleSkinArr;
    }

    
}
