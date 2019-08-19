
/*
    "roomId": "0",
    "svrIp": "180.163.32.167",
    "port": 10060,
    "spriteDesignHeight": 368,
    "gameId": 3738,
    "freeMemory": 104600576,
    "totalMemory": 402653184,
    "osVersion": "6.0",
    "model": "HUAWEI CAZ-AL10",
    "cpuType": " AArch64 Processor rev 4 (aarch64) 0 1 2 3 4 5 6 7  :   : half thumb fastmult vfp edsp neon vfpv3 tls vfpv4 idiva idivt lpae evtstrm aes pmull sha1 sha2 crc32  : 8",
    "cpuNumber": 8,
    "cpuFrequency": 1968,
    "gameVersion": "1001.0",
    "QQVer": "7.8.2.3750",
    "platform": "android",
    "gameMode": 0,
    "openId": "368467763D3B9F1E6CF459AE2B2A36A8",
    "isWhiteUser": 1,
    "src": 222,
    "networkType": 1,
    "connType": 1,
    "accessTokenCode": 0,
    "accessToken": "",
    "commFlagBits": 0,
    "isFirstPlay": 1,
    "isFirstInstall": false,
    "sessionId": "55389",
    "aioType": 0,
    "isMaster": 1,
    "sex": 1,
    "apolloStatus": 1,
    "gameType": 0
    */
// @see https://hudong.qq.com/docs/engine/engine/native/login/intro.html


/**
 * QQ厘米秀游戏数据
 */
const QQCM_gameInfo: {
    //游戏ID
    gameId: string,
    //游戏名
    gameName: string,
    roomId: string,
    openId: string,
    seesionId: string,
    //男：1，女：0
    sex: number,
    accessTokenCode: number,
    accessToken: string,
    gameParam: string,
    //默认没有，需要通过fetchOpenKey方法获取
    // openKey:string,
    QQVer: string,
    platform: string,
    model: string,
} = {
    gameId: null,
    gameName: null,
    roomId: null,
    openId: null,
    seesionId: null,
    sex: 0,
    accessTokenCode: 0,
    accessToken: null,
    gameParam: null,
    QQVer: null,
    platform: null,
    model: null,
};

export default QQCM_gameInfo;