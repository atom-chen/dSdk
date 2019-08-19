import GameManager from "../../gamecore/managers/GameManager";
import DeerSDK from "../../gamecore/deer/DeerSDK";
import GameUtils from "../../GameUtils";
import BasePanelComp from "../base/BasePanelComp";

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
export default class MainFeedBack extends BasePanelComp {
  // LIFE-CYCLE CALLBACKS:

  @property(cc.EditBox)
  wx_Edit: cc.EditBox = null;
  @property(cc.EditBox)
  phone_Edit: cc.EditBox = null;
  @property(cc.EditBox)
  question_Edit: cc.EditBox = null;
  // onLoad () {}

  

  

  private submitInfo() {
    // // debugger;
    GameManager.soundsManager.playTapSound();
    let wxcard: string = this.wx_Edit.string.trim();
    let phonenumber: string = this.phone_Edit.string.trim();
    let question: string = this.question_Edit.string.trim();
    if (wxcard.trim() == "" || question.trim() == "") {
       //空
       GameUtils.showToast("内容不能为空")
    } else {
      if (phonenumber != "") {
        this.saveFeedBackInfo(
          wxcard,
          phonenumber,
          question
        );
      } else {
        this.saveFeedBackInfo(wxcard, "", question);
      }
    }
  }

   /**
     * 
     * @param wx 微信号
     * @param phone 手机号
     * @param question 问题描述
     * @param saveSucces 成功
     * @param saveFail 失败
     */
    public saveFeedBackInfo(wx: string, phone: string, question: string) {
      DeerSDK.instance.sendFeedback({ cellphone: question, wx: wx, content: phone }, () => {
         //成功
         GameUtils.showToast("提交成功")
         this.close();
      }, () => {
         //失败
         GameUtils.showToast("提交失败")
         //将内容置空
         this.wx_Edit.string = "";
         this.wx_Edit.string = "";
         this.wx_Edit.string = "";
      })
  }
  // update (dt) {}
}
