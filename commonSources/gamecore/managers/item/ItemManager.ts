import ItemBase from "./ItemBase";
import GameManager from "../GameManager";
import GameCoreEventNames from "../../GameCoreEventNames";
import { ItemProp } from "./ItemProp";

// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;


//道具数据保存字段
const ITEM_DATA_KEY:string = "__im_items";

/**
 * 道具管理器
 */

@ccclass
export default class ItemManager {


    private _itemFactor:(type:number) => ItemBase = null;

    //设置道具工厂方法
    //该方法再反序列化道具数据时，需要使用
    public set itemFactor(fun:(type:number) => ItemBase) {
        if (this._itemFactor != null) throw new Error("请勿重复设置道具工厂方法");

        this._itemFactor = fun;

        //反序列化数据
        this.unserializeData();
    }

    
    //道具
    private _allItems:Array<ItemBase> = [];


    /**
     * 获取道具
     */
    public get allItems():Array<ItemBase> {
        return this._allItems.concat();
    }

    /**
     * 根据道具名称获取道具
     * 
     * @param itemName 道具名称
     */
    public getItemsByName(itemName:string):Array<ItemBase> {
        let items:Array<ItemBase> = [];

        this._allItems.forEach(function(ele:ItemBase):void {
            if (ele.name == itemName) {
                items.push(ele);
            }
        })
        return items;
    }


    /**
     * 获取道具数量
     * 
     * @param type 
     */
    public getItemCount(type:number):number {
        let v:number = 0;

        this._allItems.forEach( (item:ItemBase) => {
            if (item.type == type) v++;
        })

        return v;
    }

    /**
     * 道具被使用次数
     */
    private _inGameItemUsedCount:object = {};
    private _itemUsedCountTotal:object = {};


    /**
     * 获取某个游戏中道具在一句游戏中使用的次数
     * 
     * @param type 
     */
    public getItemUsedCountInGame(type:number):number {
        let v:number;
        if (this._inGameItemUsedCount[type] != undefined) {
            v = this._inGameItemUsedCount[type];
        }

        // console.log("getItemUsedCountInGame");
        // console.log(JSON.stringify(this._inGameItemUsedCount));

        if (isNaN(v) || v < 0) v = 0;

        return v;
    }

    /**
     * 获取某个游戏中道具在整个游戏中使用的次数
     * 
     * @param type 
     */
    public getItemUsedCountTotal(type:number):number {
        let v:number;
        if (this._itemUsedCountTotal[type] != undefined) {
            v = this._itemUsedCountTotal[type];
        }

        if (isNaN(v) || v < 0) v = 0;

        return v;
    }


    /**
     * 根据类型获得一个已经存在的道具。
     * 
     * @param type 
     */
    public getAItemByType(type:number):ItemBase {
        for (let i:number = 0, len:number = this._allItems.length; i < len; i++) {
            let item:ItemBase = this._allItems[i];
            if (item.type == type) return item;
        }

        return null;
    }


    /**
     * 使用道具
     * 
     * @param item 
     */
    public useItem(item:ItemBase):void {
        if (item.isUsed) throw new Error("This item had been used!");

        //检查道具是否存在
        let index:number = this._allItems.indexOf(item);
        if (index == -1) return;
        
        let type:number = item.type;
        //console.log("used item type is " + type + ", name is " + item.name);

        let v:number = this._inGameItemUsedCount[type];
        if (isNaN(v) || v < 0) v = 0;
        this._inGameItemUsedCount[type] = v + 1;

        v = this._itemUsedCountTotal[type];
        if (isNaN(v) || v < 0) v = 0;
        this._itemUsedCountTotal[type] = v + 1;

        //删除
        this._allItems.splice(index, 1);

        //抛出事件
        GameManager.eventManager.dispatchEventWith(GameCoreEventNames.ITEM_USED, item);

        //销毁
        item.destory();

        //序列化数据
        this.doSerializeLater();
    }


    /**
     * 使用一个指定类型的道具
     * 
     * @param type 
     */
    public useItemByType(type:number):void {
        let item:ItemBase = this.getAItemByType(type);
        if (item) this.useItem(item);
    }



    /**
     * 添加道具
     * 
     * @param item 
     */
    public addItem(item:ItemBase):void {
        if (item.isUsed) throw new Error("This item had been used!");

        if (!item || item.property == ItemProp.ABSTRACT) return;

        if (this._allItems.indexOf(item) == -1) {
            this._allItems.push(item);

            //console.log("添加道具", item.name);

            //抛出事件
            GameManager.eventManager.dispatchEventWith(GameCoreEventNames.ITEM_ADDED, item);

            //序列化数据
            this.doSerializeLater();
        }
    }


    /**
     * 移除道具
     * 
     * @param item 
     */
    public removeItem(item:ItemBase):void {
        if (item.isUsed) throw new Error("This item had been used!");

        let index:number = this.allItems.indexOf(item);
        if (index != -1) {
            this._allItems.splice(index, 1);

            //销毁
            item.destory();

            //抛出事件
            GameManager.eventManager.dispatchEventWith(GameCoreEventNames.ITEM_REMOVED, item);

            //序列化数据
            this.doSerializeLater();
        }

    }



    /**
     * 当游戏结束时，调用该方法，让游戏中道具数据清空。
     */
    public gameOver():void {
        for (let i:number = 0; i < this._allItems.length; i++) {
            let item:ItemBase = this._allItems[i];
            if (item.type == ItemProp.IN_GAME) {
                this._allItems.splice(i, 1);
                i--;
            }
        }

        this._inGameItemUsedCount = {};

        //序列化数据
        this.doSerializeLater();
    }



    private _timeOut:any = -1;

    private doSerializeLater():void {
        if (this._timeOut >= 0) {
            clearTimeout(this._timeOut);
        }


        //5秒后，序列化数据
        this._timeOut = setTimeout(()=>{
            GameManager.itemManager.serializeData();
        }, 5000);
    }


    /**
     * 序列化数据
     */
    public serializeData():void {
        let v:Array<number> = [];
        this._allItems.forEach( (item:ItemBase) => {
            v.push(item.type);
        });


        //保存数据
        GameManager.dataManager.setData(ITEM_DATA_KEY, {"items":v}, true);
    }




    private _unserialized:boolean;

    /**
     * 反序列化道具数据
     * 
     */
    private unserializeData():void {
        if (this._itemFactor == null) return;

        if (this._unserialized === true) return;
        this._unserialized = true;

        let data:object = GameManager.dataManager.getData(ITEM_DATA_KEY);
        if (!data) return;

        let itemTypes:Array<number> = data["items"];
        if (!itemTypes || itemTypes.length == 0) return;

        itemTypes.forEach( (type:number) => {
           let item:ItemBase = this._itemFactor.call(null, type);
           if (item) this.addItem(item);
        });


    }
}
