import Utils from "../gamecore/managers/Utils";
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
export default class MoveAction extends cc.Component {
  // LIFE-CYCLE CALLBACKS:

  // onLoad () {}
  @property()
  movedistance: number = 0;
  @property()
  time: number = 0;
  @property()
  movetype: boolean = false;

  start() {
    this.init();
  }

  private init() {
    let move: cc.ActionInterval = null;
    let moveback: cc.ActionInterval = null;
    if (this.movetype == false) {
      move = cc.moveBy(1, cc.v2(this.movedistance, 0));
      moveback = cc.moveBy(1, cc.v2(-this.movedistance, 0));
    } else {
      move = cc.moveBy(1, cc.v2(0, this.movedistance));
      moveback = cc.moveBy(1, cc.v2(0, -this.movedistance));
    }
    let se = cc.sequence(
      move,
      moveback,
      cc.callFunc(() => {
        this.init();
      })
    );
    this.node.runAction(se);
  }

  // update (dt) {}
}
