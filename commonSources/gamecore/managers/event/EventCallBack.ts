
import Callback from "./../../base/Callback"


/**
 * 事件回调
 * 
 */
export default class EventCallBack extends Callback {

    public index: number;

    public type: string;

    //是否只接受一次事件派发
    public once:boolean = false;

    constructor(callback: (data?: any) => void, thisObj: any) {
        super(callback, thisObj);
    }

    
    /**
     * 复制
     */
    public clone(): EventCallBack {
        let data: EventCallBack = new EventCallBack(<any>this.callback, this.thisObj);
        data.index = this.index;
        data.type = this.type;
        return data;
    }

}
