import Comp_listRenderer from "./Comp_ListRenderer";

// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

/**
 * 列表组件。用于显示列表信息。比如排行榜
 */
@ccclass
export default class Comp_List extends cc.Component {

    @property({
        type: cc.Prefab,
        displayName: "Renderer Prefab",
    })
    rendererPrefab: cc.Prefab = null;

    /**
     * 每个item宽
     */
    private _rendererWidth: number = 0;

    /**
     * 每个item高
     */
    private _rendererHeight: number = 0;

    @property({
        displayName: "垂直间距"
    })
    gapV: number = 10;

    @property({
        displayName: "水平间距"
    })
    gapH: number = 10;

    @property({
        displayName: "列数"
    })
    columnCount: number = 1;

    @property({
        displayName: "顶部间隔"
    })
    topPadding: number = 0;

    @property({
        displayName: "底部间隔"
    })
    bottomPadding: number = 0;

    @property({
        displayName: "左边间隔"
    })
    leftPadding: number = 0;

    @property({
        displayName: "右边间隔"
    })
    rightPadding: number = 0;


    @property({
        displayName: "缓冲大小",
        tooltip:"不在可视区域中item个数"
    })
    bufferSize: number = 3;


    //对象池
    private _itemPool: cc.NodePool = new cc.NodePool(Comp_listRenderer);


    //虚拟节点
    private _virtualNodes: Array<VirtualNode> = [];

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        if (this.columnCount < 1) this.columnCount = 1;
    }


    start() {
        this.refreshUI();
    }

    private _lastY: number = 0;

    update(dt) {
        let frames: number = cc.director.getTotalFrames();
        if (frames % 10 == 0) {
            if (Math.abs(this.node.y - this._lastY) > this._rendererHeight / 2) {
                this._lastY = this.node.y;
                this.refreshUI();
            }
        }
    }


    protected _data: Array<any>;


    /**
     * 设置数据
     */
    public set data(value: Array<any>) {
        if (this._data == value) return;
        
        this._data = value;
        this.refreshVirtualNodes();
        this.refreshUI();
    }


    public get data(): Array<any> {
        return this._data;
    }



    /**
     * 第一个激活的item数据
     */
    protected _firstActiveItemData:any;


    /**
     * 获取第一个激活的item的数据
     */
    public get firstActiveItemData():any {
        return this._firstActiveItemData;
    }

    
    /**
     * 设置第一个激活的数据（即自动滚动至）
     */
    public set firstActiveItemData(v:any) {
        if (!this._virtualNodes) return;

        for (let i:number = 0, len:number = this._virtualNodes.length; i < len; i++) {
            let vn:VirtualNode = this._virtualNodes[i];
            if (vn.data == v) {
                this._firstActiveItemData = v;

                //尝试获取scrollView
                try {
                    let node:cc.Node = this.node.getParent().getParent();
                    let scrollView:cc.ScrollView = node.getComponent(cc.ScrollView);
                    scrollView.scrollToOffset(new cc.Vec2(0, -vn.y - this._rendererHeight / 2 - this.gapV), 1);
                } catch (error) {
                    
                }

                break;
            }
        }
    }





    private refreshVirtualNodes(): void {
        if (this._rendererHeight == 0) {
            this.moreItems();
        }

        //刷新虚拟节点数据
        while(this.node.children.length > 0) {
            let ele:cc.Node = this.node.children[0]
            this._itemPool.put(ele);
            ele.removeFromParent(false);
        }

        this._virtualNodes = [];


        if (this._data) {
            let totalRaw: number = Math.ceil(this._data.length / this.columnCount);
            this.node.height = (this._rendererHeight + this.gapV) * totalRaw - this.gapV + this.topPadding + this.bottomPadding;

            for (let i: number = 0; i < this._data.length; i++) {
                let vn: VirtualNode = new VirtualNode();
                vn.index = i;
                vn.data = this._data[i];
                vn.width = this._rendererWidth;
                vn.height = this._rendererHeight;

                let raw: number = Math.ceil((i + 1) / this.columnCount);
                let colomn: number = i % this.columnCount + 1;

                vn.y = -(raw - 1) * (this._rendererHeight + this.gapV) - this._rendererHeight / 2 - this.topPadding;
                vn.x = (colomn - 1) * (this._rendererWidth + this.gapH) + this._rendererWidth / 2 + this.leftPadding - this.node.width * this.node.anchorX;

                vn.activeChangeCallback = this.virtualNodeActiveChangeCallback.bind(this);
                this._virtualNodes.push(vn);
            }
        }
    }



    private _viewRect: cc.Rect;


    /**
     * 刷新list
     * 
     */
    public refreshUI(): void {
        if (this.node && this.node.getParent()) {
            let pn: cc.Node = this.node.getParent();
            this._viewRect = new cc.Rect(-pn.width * pn.anchorX - this._rendererWidth, -pn.height * pn.anchorY - this._rendererHeight * this.bufferSize, pn.width + this._rendererWidth * 2, pn.height + this._rendererHeight * 2 * this.bufferSize);
        }


        let activeIndex:number = 0;
        this._firstActiveItemData = null;

        this._virtualNodes.forEach((ele: VirtualNode) => {
            let top: number = ele.y + this.node.y + this._rendererHeight / 2 + this.gapV;
            let bottom: number = ele.y + this.node.y - this._rendererHeight / 2 - this.gapV;

            if (bottom > this._viewRect.yMax || top < this._viewRect.yMin) {
                ele.unactive();
            } else {
                if (this._firstActiveItemData == null && activeIndex == 1) {
                    this._firstActiveItemData = ele.data;
                }

                ele.active();
                let renderer: Comp_listRenderer = ele.ui.getComponent(Comp_listRenderer);
                if (renderer) {
                    renderer.index = ele.index;
                    renderer.data = ele.data;
                } else {
                    //console.log("渲染item请绑定Comp_ListRenderer组件（或子组件）")
                }

                activeIndex++;
            }
        });
    }


    /**
     * 
     * @param vn 
     */
    private virtualNodeActiveChangeCallback(vn: VirtualNode): void {
        //console.log("item显示、影藏", vn.index, vn.isActived);

        if (vn.isActived) {
            if (!vn.ui) {
                if (this._itemPool.size() <= 0) this.moreItems();
                vn.ui = this._itemPool.get();
                this.node.addChild(vn.ui);
            }

            vn.ui.x = vn.x;
            vn.ui.y = vn.y;
        } else {
            if (vn.ui) {
                vn.ui.removeFromParent(false);
                //console.log("【comp_list】回收 " + vn.ui.uuid);
                this._itemPool.put(vn.ui);

                vn.ui = null;
            }
        }
    }


    /**
     * 更多item renderer
     * 
     * @param data 
     */
    protected moreItems(): void {
        let colomnWidth: number = (this.node.width - this.gapH * (this.columnCount - 1) - this.leftPadding - this.rightPadding) / this.columnCount;
        if (colomnWidth < 1) colomnWidth = 1;

        //console.log("【comp_list】more 5 items")

        for (let i = 0; i < 5; ++i) {
            let item: cc.Node = cc.instantiate(this.rendererPrefab); // 创建节点
            this._itemPool.put(item);

            item.scale = colomnWidth / item.width;

            //第一次，计算item实际宽、高
            if (this._rendererWidth == 0) {
                this._rendererWidth = colomnWidth;
                this._rendererHeight = item.height * item.scale;
            }
        }
    }


    onDestroy() {
        if (this._itemPool) {
            this._itemPool.clear();
            this._itemPool = null;
        }
    }

}



/**
 * 虚拟节点。anchorX:0.5, anchorY:0.5
 * 
 */
class VirtualNode {
    public index: number = 0;

    public data: any;

    public x: number = 0;
    public y: number = 0;

    public width: number = 0;
    public height: number = 0;

    //ui
    public ui: cc.Node;

    public activeChangeCallback: Function;
    public _isActived: boolean = false;

    public get isActived(): boolean {
        return this._isActived;
    }

    public active(): void {
        if (this._isActived === true) return;
        this._isActived = true;

        this.activeChangeCallback.call(null, this);
    }


    public unactive(): void {
        if (this._isActived === false) return;
        this._isActived = false;

        if (this.activeChangeCallback) this.activeChangeCallback(this);
    }

}
