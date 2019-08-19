
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

@ccclass
export default class NodePoolMgr {
  private constructor() {}
  private static _data: NodePoolMgr = new NodePoolMgr();
  public static get instance() {
    if (!NodePoolMgr._data) NodePoolMgr._data = new NodePoolMgr();
    return this._data;
  }

  private nodes: any = {};
  private prefabs: any = {};
  /**
   * 创建节点池
   * @param key 根据key取不同预制体的对象池
   * @param item 预制体
   * @param count 该对象池的数量
   */
  public createNodePool(
    key: string,
    item: cc.Prefab,
    count: number,
    newclass?: string
  ) {
    let nodepool: cc.NodePool = this.nodes[key];
    // let item = item;
    if (typeof nodepool == "undefined" || !nodepool) {
      nodepool = new cc.NodePool(newclass);
      for (let i = 0; i < count; ++i) {
        let node = cc.instantiate(item); // 创建节点
        nodepool.put(node); // 通过 putInPool 接口放入对象池
      }
      this.nodes[key] = nodepool;
      this.prefabs[key] = item;
      // console.log("createNodePool", this.nodes[key], nodepool);
    }else{
      for(let i = 0;i < count; ++i){
        let node = cc.instantiate(item);
        this.nodes[key].put(node);
      }
    }
  }

  

  /**
   * 获取节点
   * @param key 取nodepool的key
   *
   */
  public getNodePool(key: string, data?: any): cc.Node {
    let nodepool: cc.NodePool = this.nodes[key];
    let item: cc.Prefab = this.prefabs[key];
    let node: cc.Node = null;
    if (nodepool.size() > 0) {
      // 通过 size 接口判断对象池中是否有空闲的对象
      node = nodepool.get(data);
    } else {
      // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
      node = cc.instantiate(item);
    }
    return node;
  }
  /**
   * 回收节点
   * @param node 节点
   */
  public recycleNodePool(key: string, node: cc.Node) {
    // debugger;
    let nodepool: cc.NodePool = this.nodes[key];
    nodepool.put(node);
  }

  public NodePoolclearUp(key:string){
    let nodepool: cc.NodePool = this.nodes[key];
    if(nodepool){
      nodepool.clear();
      this.nodes[key] = null;
      // nodepool = null;
      // this.nodes[key] = {};    
    }
  }
}
