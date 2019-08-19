import EventData from "./EventData";
import EventCallBack from "./EventCallBack";
import Dictionary from "../../base/Dictionary";



/**
 * 事件管理
 */
export default class EventDispacher {

    private _callbackMaps: Dictionary<EventCallBack[]>;
    private _sendBuffer: EventData[];

    public constructor() {
        this._callbackMaps = new Dictionary<EventCallBack[]>();
        this._sendBuffer = [];
    }

    /**
     * 注册事件监听
     * 
     * @param   type
     * @param   callback
     * @param   thisObj
     * 
     * @param   priority               权重。数值越大，优先级越高。默认为0
     * @param   once                   只执行一次派发接收
     * 
     */
    public addEventListener(type: string,
        callback: (data: EventData) => void,
        thisObj: any,
        priority: number = 0,
        once: boolean = false): void {
        if (callback && thisObj) {
            let data: EventCallBack = new EventCallBack(callback, thisObj);
            data.type = type;
            data.index = priority;
            data.once = once;

            let callbacks: EventCallBack[] = this._callbackMaps.get(type);
            if (callbacks) {
                //检查是否存在相同的
                let hasSame: boolean = false;
                for (let i: number = callbacks.length - 1; i >= 0; i--) {
                    let theCB: EventCallBack = callbacks[i];
                    if (theCB.thisObj === thisObj && theCB.callback === callback) {
                        theCB.once = once;
                        theCB.index = priority;

                        hasSame = true;
                        break;
                    }
                }

                if (!hasSame) {
                    callbacks.push(data);
                    callbacks.sort(this.sortPriority);
                }
            } else {
                this._callbackMaps.add(type, [data]);
            }
        }
    }

    /**
     * 根据权重排序
     * 
     * @param a 
     * @param b 
     */
    private sortPriority(a: EventCallBack, b: EventCallBack): number {
        return b.index - a.index;
    }



    /**
     * 检查是否存在事件监听
     * 
     * @param type 
     * @param callback 
     * @param thisObj 
     */
    public hasEventListener(type: string, callback: (evt: EventData) => void = null, thisObj: any = null): boolean {
        let callbacks: EventCallBack[] = this._callbackMaps.get(type);
        if (callbacks) {
            if (callback && thisObj) {
                for (let i: number = 0, iLen: number = callbacks.length; i < iLen; i++) {
                    let data: EventCallBack = callbacks[i];
                    if (data.callback === callback && data.thisObj === thisObj) {
                        return true;
                    }
                }
            } else {
                return true;
            }
        }

        return false;
    }


    /**
     * 移除事件监听
     * 
     * 
     */
    public removeEventListener(type: string, callback: (evt: EventData) => void, thisObj: any): void {
        let callbacks: EventCallBack[] = this._callbackMaps.get(type);
        if (callbacks) {
            for (let i: number = 0, iLen: number = callbacks.length; i < iLen; i++) {
                let data: EventCallBack = callbacks[i];
                if (data.callback === callback && data.thisObj === thisObj) {
                    callbacks.splice(i, 1);

                    iLen--;
                    i--;
                }
            }
        }
    }

    /**
     * 发送消息
     * 
     * @param event         需要派发的事件
     */
    public dispatchEvent(event: EventData): void {
        event.target = this;

        this._sendBuffer.push(event);

        while (this._sendBuffer.length > 0) {
            event = this._sendBuffer.shift();

            let dataList: EventCallBack[] = this._callbackMaps.get(event.type);
            if (dataList) {
                let copyList: EventCallBack[] = dataList.concat();

                for (let i: number = 0, iLen: number = copyList.length; i < iLen; i++) {
                    let data: EventCallBack = copyList[i];
                    if (dataList.indexOf(data) == -1) continue;

                    data.callback.call(data.thisObj, event);

                    if (data.once) this.removeEventListener(event.type, data.callback, data.thisObj);

                    //如果有设置停止派发
                    if (event.isStopedPropagation) {
                        break;
                    }
                }
            } else {
                //console.log("事件ID:" + event.type + "无监听回调");
            }
        }
    }



    /**
     * 派发事件。自动生成EventData对象。
     * 
     * @param eventName         事件名称
     * @param data              携带数据
     */
    public dispatchEventWith(eventName: string, data: any = null): void {
        let eventData: EventData = new EventData(eventName, data);
        this.dispatchEvent(eventData);
    }




    /**
     * 销毁
     * 
     */
    public destory(): void {
        this._callbackMaps = new Dictionary<EventCallBack[]>();
        this._sendBuffer = [];
    }

}
