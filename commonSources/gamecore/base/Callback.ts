import EventData from "../managers/event/EventData";


/**
 * 事件管理
 */
export default class Callback {
    public callback: (evt: EventData) => void;

    public thisObj: any;

    constructor(callback: (evt:EventData) => void, thisObj: any) {
        this.callback = callback;
        this.thisObj = thisObj;
    }
}
