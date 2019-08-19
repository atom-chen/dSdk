import EventDispacher from "../event/EventDispacher";
import { ItemProp } from "./ItemProp";
import GameManager from "../GameManager";
import GameCoreEventNames from "../../GameCoreEventNames";
import EventData from "../event/EventData";

const {ccclass, property} = cc._decorator;

/**
 * 道具基类
 */
@ccclass
export default class ItemBase extends EventDispacher {
    //道具id
    public id:string;


    constructor() {
        super();
        GameManager.eventManager.addEventListener(GameCoreEventNames.ITEM_USED, this.itemUseHandler, this);
    }

    /**
     * 道具使用事件
     * 
     * @param e 
     */
    private itemUseHandler(e:EventData):void {
        if (e.data == this) {
            this.useItem();

            this._isUsed = true;

            this.destory();
        }
    }


    protected _prop:ItemProp;

    /**
     * 获取道具属性
     * 
     * @see ItemProp;
     * 
     */
    public get property():ItemProp {
        return this._prop;
    }


    protected _type:number;

    /**
     * 获取道具类型
     * 
     * @see ItemTypes;
     * 
     */
    public get type():number {
        return this._type;
    }
    

    protected _name:string;

    /**
     * 道具名称
     */
    public get name():string {
        return this._name;
    }


    protected _desc:string;

    /**
     * 道具描述
     */
    public get desc():string {
        return this._desc;
    }


    private _isUsed:boolean = false;

    /**
     * 是否已使用
     */
    public get isUsed():boolean {
        return this._isUsed;
    }

    /**
     * 使用道具
     */
    protected useItem():void {

    }


    /**
     * 销毁
     */
    public destory():void {
        GameManager.eventManager.removeEventListener(GameCoreEventNames.ITEM_USED, this.itemUseHandler, this);
    }

}
