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
export default class Globaldef {

    public static TagType = cc.Enum({
        BULLET_HERO: 0,
        BULLET_ENEMY: 1,
        WALL: 2,
        ENEMY: 3,
        HERO: 4,
        ITEM: 5,
        DONG: 6
    })
    public static Channel= cc.Enum({
        C_WX: 1e4,
        C_TOUTIAO: 10001,
        C_WEB: 10002
    })
    public static EnemyState= cc.Enum({
        S_IDLE: 0,
        S_FIRE: 1,
        S_PATROL: 2,
        S_DEAD: 3
    })
    public static EnemyType= cc.Enum({
        E_GRAY: 0,
        E_YELLOW: 1,
        E_BLUE: 2,
        E_RED: 3,
        E_BOX: 4,
        E_BOX_XUE: 5,
        E_BOX_NORMAL: 6,
        E_TONG_XUE: 7,
        E_TONG: 8,
        E_DONG: 9,
        E_TREE_1: 10,
        E_TREE_2: 11,
        E_TREE_3: 12,
        E_TREE_4: 13,
        E_TREE_5: 14,
        E_TREE_6: 15,
        E_WALL_1: 16,
        E_WALL_2: 17,
        E_TREE_8: 18,
        E_TREE_9: 19,
        E_MAX: 20,
        E_T_POWER: 30
    })
    public static BULLET_TYPE= cc.Enum({
        E_ONE: 1,
        E_THREE: 2,
        E_BOMB: 3,
        E_FLLOW: 4,
        E_POWER_BOMB: 5,
        E_XX: 6
    })
    public static UI_ID= cc.Enum({
        E_LOGIN_UI: 0,
        E_LEVELLIST_UI: 1,
        E_GAME_END_UI: 2,
        E_WAIT_UI: 3,
        E_RANK_UI: 4
    })
    public static UI_NAME = [ "LoginUI", "LevelListUI", "GameEndUI", "WaitingUI", "RankUI"];
}
