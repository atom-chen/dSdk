
/**
 * 事件
 */
export default class EventData {
    /**
     * 事件名
     */
    public type: string;

    /**
     * 事件携带数据
     */
    public data: any;


    /**
     * 事件派发者
     */
    public target:any;


    private _isStopedPropagation:boolean = false;

    /**
     * 是否已停止派发
     */
    public get isStopedPropagation():boolean {
        return this._isStopedPropagation;
    }

    /**
     * 停止事件派发
     * 
     */
    public stopPropagation():void {
        this._isStopedPropagation = true;
    }

    constructor(type: string, data?: any) {
        this.type = type;
        this.data = data;
    }

    
}
