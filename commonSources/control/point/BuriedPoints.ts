// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class BuriedPoints {
  public static pointsname = [
    "主界面-进入界面",
    "主界面-体力补给",
    "体力补给-视频兑换成功",
    "体力补给-金币兑换成功",
    "主界面-更多金币",
    "更多金币-领取成功",
    "主界面-钥匙补给",
    "钥匙补给-视频兑换成功",
    "钥匙补给-金币兑换成功",
    "主界面-设置",
    "主界面-排行榜",
    "主界面-图鉴查看",
    "主界面-添加到我的小程序",
    "添加到我的小程序-领取成功",
    "主界面-开始游戏",
    "主界面-升级形象",
    "模式界面-关卡选择",
    "模式界面-开始游戏",
    "游戏界面-主页",
    "游戏界面-重来",
    "游戏界面-跳过",
    "跳过-跳过关卡成功",
    "结算-主页",
    "结算-重玩",
    "结算-更多奖励",
    "结算-继续游戏",
    "结算-下一关",
    "结算-挑战好友",
    "新用户通关",
    "主界面-过关提示",
    "过关提示-提示成功",
  ];

  public static pointwhil = [
"进入主界面",
"点击体力补给按钮",
"视频兑换成功",
"金币兑换成功",
"点击更多金币按钮",
"金币领取成功",
"点击要是补给按钮",
"视频兑换成功",
"金币兑换成功",
"点击设置按钮",
"点击排行榜按钮",
"点击图鉴查看按钮",
"点击添加到我的小程序按钮",
"领取成功",
"点击开始游戏按钮",
"点击升级形象按钮",
"开始游戏（把关卡数作为参数）",
"点击主页按钮",
"点击重来按钮",
"点击跳过按钮",
"跳过关卡成功",
"点击主页按钮",
"点击重玩按钮",
"点击更多奖励按钮",
"点击继续游戏按钮",
"点击下一关按钮",
"点击挑战好友按钮",
"新用户通关",
"主界面-过关提示",
"过关提示-提示成功",
  ];
}
