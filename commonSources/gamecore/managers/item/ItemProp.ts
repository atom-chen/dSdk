
const {ccclass, property} = cc._decorator;

/**
 * 道具属性
 */
export const enum ItemProp {
    
    //虚拟道具。虚拟道具，不能添加到道具管理其中，仅仅是方便用户扩展。
    ABSTRACT = 1,

    //全局道具。获得后，可一直保留
    GLOBAL = 2,

    //游戏中道具，获得后只能在当局游戏中使用
    IN_GAME = 4

}
