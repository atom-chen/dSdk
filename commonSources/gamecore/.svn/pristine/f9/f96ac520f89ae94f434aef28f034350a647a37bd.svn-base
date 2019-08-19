import GameManager from "./GameManager";
import GameCoreEventNames from "../GameCoreEventNames";

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
 * tag管理器。用于ui上的信息提示。比如有新邮件了，需要提示用户。
 * 
 *  
 * 
 */
@ccclass
export default class TagManager {
    /**
     * 渠道表
     * 
     *  
     */
    protected _channelMap: object;

    /**
     * 渠道数据 
     */
    protected _channelValueMap: object;

    /**
     * 永久删除项 
     */
    protected _removeForeverMap: object;


    constructor() {
        this._channelMap = {};
        this._channelValueMap = {};
        this._removeForeverMap = {};
    }



    /**
     * 设置标签
     * 
     * @param tagChannel
     * @param tagData
     * 
     */
    public setTag(tagChannel: string, tagData: any = null): void {
        if (this._removeForeverMap.hasOwnProperty(tagChannel)) return;

        if (this._channelValueMap.hasOwnProperty(tagChannel) && this._channelValueMap[tagChannel] == tagData) return;

        this._channelValueMap[tagChannel] = tagData;

        GameManager.eventManager.dispatchEventWith(GameCoreEventNames.TAG_CHANGE, tagChannel);
    }

    /**
     * 移除tag
     *  
     * 
     * @param tagChannel
     * @param forever			是否永久删除。如果是，则再次设置该tagChannel时会被忽略。 reset()方法可以重置所有永久删除项。
     * 
     */
    public removeTag(tagChannel: string, forever: boolean = false): void {
        if (this._removeForeverMap.hasOwnProperty(tagChannel)) return;

        if (this._channelValueMap.hasOwnProperty(tagChannel)) {
            delete this._channelValueMap[tagChannel];

            GameManager.eventManager.dispatchEventWith(GameCoreEventNames.TAG_CHANGE, tagChannel);
        }

        if (forever) {
            this._removeForeverMap[tagChannel] = true;
        }
    }

    /**
     * 是否存在标签。会搜索子渠道
     *  
     * @param tagChannel
     * @return 
     * 
     */
    public hasTag(tagChannel: string): boolean {
        if (this._channelValueMap.hasOwnProperty(tagChannel)) return true;

        var channels: Array<string> = this.getAllSubTagChannels(tagChannel);

        for (let i: number = 0, len: number = channels.length; i < len; i++) {
            let channel: string = channels[i];
            if (this._channelValueMap.hasOwnProperty(channel)) return true;
        }

        return false;
    }

    /**
     * 获取一个渠道的所有父级渠道
     *  
     * @param tagChannel
     * @return 
     * 
     */
    public getAllParentTagChannels(tagChannel: string): Array<string> {
        var channels: Array<string> = new Array<string>();

        while (tagChannel) {
            if (channels.indexOf(tagChannel) != -1) break;

            if (this._channelMap.hasOwnProperty(tagChannel)) {
                tagChannel = this._channelMap[tagChannel];

                if (tagChannel) {
                    channels.push(tagChannel);
                }
            } else {
                break;
            }
        }

        return channels;
    }


    /**
     * 获取一个渠道的所有子渠道
     *  
     * @param tagChannel
     * @return 
     * 
     */
    public getAllSubTagChannels(tagChannel: string): Array<string> {
        let channels: Array<string> = new Array<string>();
        if (!tagChannel) return channels;

        let checkChannel = (channel: string, checked: Array<string>) => {
            if (!channel || checked.indexOf(channel) >= 0) return;

            let pChannel: string = this._channelMap[channel];
            checked.push(channel);

            if (pChannel == tagChannel) {
                checked.forEach((checkedChannel: string) => {
                    channelsMap[checkedChannel] = true;
                })
            } else {
                checkChannel(pChannel, checked);
            }
        }


        let channelsMap: object = {};
        let keys: Array<string> = Object.keys(this._channelMap);
        keys.forEach((key: string) => {
            if (key != tagChannel) {
                checkChannel(key, new Array<string>());
            }
        });

        return Object.keys(channelsMap);
    }

    /**
     * 获取标签数据
     *  
     * @param tagChannel
     * @param tagName
     * @return 
     * 
     */
    public getTagData(tagChannel: string): any {
        if (this._channelValueMap.hasOwnProperty(tagChannel)) {
            return this._channelValueMap[tagChannel];
        }

        return null;
    }

    /**
     * 注册一个渠道
     *  
     * @param tagChannel
     * @param parentTack		渠道上级
     * 
     */
    public registerTag(tagChannel: string, parentChannel: string): void {
        if (this._channelMap.hasOwnProperty(tagChannel) && this._channelMap[tagChannel] != parentChannel) {
            throw new Error(tagChannel + "'s parent has set to " + this._channelMap[tagChannel]);
        }
        this._channelMap[tagChannel] = parentChannel;
    }


    /**
     * 添加渠道链。比如A, B, C, D，表示A的父级是B，B的父级是C，以此类推
     *  
     * @param channelStack
     * 
     */
    public registerTags(...channelStack): void {
        for (var i: number = 0; i < channelStack.length - 1; i++) {
            this.registerTag(channelStack[i], channelStack[i + 1]);
        }
    }

    /**
     * 取消注册一个渠道
     *  
     * @param tagChannel
     * 
     */
    public unregisterTag(tagChannel: string): void {
        if (this._channelMap.hasOwnProperty(tagChannel)) {
            delete this._channelMap[tagChannel];

            GameManager.eventManager.dispatchEventWith(GameCoreEventNames.TAG_CHANGE, tagChannel);
        }
    }

    public reset(): void {
        //			this._channelMap = {};
        this._channelValueMap = {};
        this._removeForeverMap = {};

        GameManager.eventManager.dispatchEventWith(GameCoreEventNames.TAG_CHANGE);
    }
}