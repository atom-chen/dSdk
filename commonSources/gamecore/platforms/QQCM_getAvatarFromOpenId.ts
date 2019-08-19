//========================================================================
//QQ头像获取
//========================================================================
var QQCM_getAvatarFromOpenIdStack: Array<any> = [];
//是否正在进行中
var QQCM_gettingAvatarFromOpenId: boolean = false;
var QQCM_getAvatarFromOpenIdNext = function (): void {
    if (QQCM_gettingAvatarFromOpenId === true) return;
    if (QQCM_getAvatarFromOpenIdStack.length == 0) return;

    let openId: string = QQCM_getAvatarFromOpenIdStack.shift();
    let callback: Function = QQCM_getAvatarFromOpenIdStack.shift();

    //openId为图片对应openid
    //imgPath为头像保存至本地的路径
    QQCM_gettingAvatarFromOpenId = true;
    BK.MQQ.Account.getHeadEx(openId, (openId: string, imgPath: string) => {
        QQCM_gettingAvatarFromOpenId = false;

        if (callback) callback(imgPath);
        QQCM_getAvatarFromOpenIdNext();
    });
}

/**
 * 根据用户openid获得头像（保存在本地）
 */
export function QQCM_getAvatarFromOpenId(openId: string, callback: (filePath:string) => void): void {
    console.log("------【QQCM】 QQCM_getAvatarFromOpenId-------");
    console.log(openId)

    if (typeof BK == "undefined") return;

    let absolutePath = "GameSandBox://_head/" + openId + ".jpg";
    let isExit = BK.FileUtil.isFileExist(absolutePath);
    console.log(absolutePath + " is exit :" + isExit);
    if (isExit) {
        if (callback) callback(absolutePath);
        return;
    }

    QQCM_getAvatarFromOpenIdStack.push(openId, callback);
    QQCM_getAvatarFromOpenIdNext();
}
//========================================================================
