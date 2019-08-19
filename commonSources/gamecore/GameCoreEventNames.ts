export default class GameCoreEventNames {
    //关闭事件
    static COMMON_CLOSE: string = "commonClose";
    //准备事件
    static COMMON_READY: string = "commonReady";

    //数据改变事件
    static DATA_CHANGE: string = "dataChange";

    //数据存储本地序列化
    static DATA_REMOTE_CHANGE: string = "dataRemoteChange";
    //本地数据被远程数据更新
    static DATA_REMOTE_RETRIVE: string = "dataRemoteRetrive";

    //游戏进度
    static RES_PROGRESS: string = "ResProgress";

    //游戏进度
    static RES_COMPLETE: string = "ResComplete";


    //===============================================================
    //PopUpManager事件
    //===============================================================
    //添加popup
    static POP_UP_ADD:string = "popUpAdd";
    //移除popup
    static POP_UP_REMOVE:string = "popUpRemove";

    //===============================================================
    //道具事件
    //===============================================================

    //获得道具
    static ITEM_ADDED: string = "itemAdded";
    //删除道具
    static ITEM_REMOVED: string = "itemRemoved";
    //使用道具
    static ITEM_USED: string = "itemUsed";
    //===============================================================



    //===============================================================
    //tag事件
    //===============================================================

    //tag改变
    static TAG_CHANGE: string = "tagChange";


    //===============================================================
    //声音控制
    //===============================================================

    //静音背景音乐
    static MUTE_MUSIC: string = "muteMusic";
    //取消静音背景音乐
    static UNMUTE_MUSIC: string = "unmuteMusic";
}
