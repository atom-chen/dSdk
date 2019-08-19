
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
export default class Common {
    static Tag = {
        "tagNone" : 0,
        "tagBullet" : 1,
        "tagPlat" : 2,
        "tagBodyJoint" : 3,
        "tagCubeBox" : 4,
        "tagTNT" : 5,
        "tagMoveBox" : 6,
        "tagTNTBorder" : 7,
        "tagSwitch" : 8,
        "tagTrigger" : 9,
        "tagTransparent" : 10,
        "tagCircle" : 11,
        "tagGrenade" : 12,
        "tagDeath" : 13,
        "tagMoveCube" : 14,
        "tagHostage" : 15,
    };

    static eventMessage = {
        "revive" : "revive",
        "gameFail" : "gameFail",
        "gameWin" : "gameWin",
        "enemyDie" : "enemyDie",
        "bulletRemove" : "bulletRemove",
        "addBullet" : "addBullet",
        "grendaDestroy":"grendaDestroy",
    }
}
