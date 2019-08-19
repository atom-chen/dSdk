const {ccclass, property} = cc._decorator;

@ccclass
export default class EnemyGeneratePoint extends cc.Component {

    @property(Number)
    enemyType:number = 0;
    

    @property(cc.Sprite)
    sprite:cc.Sprite = null;
    
    start() {
        this.sprite = this.getComponent(cc.Sprite), this.sprite && (this.sprite.enabled = !1);
    }
}