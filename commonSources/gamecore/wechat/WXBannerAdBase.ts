import { GameCoreLocation } from "../GameCoreLocation";
import EventDispacher from "../managers/event/EventDispacher";

/**
 * 微信条形广告基础类
 * 
 */
export default class WXBannerAdBase extends EventDispacher {
    //当前banner广告
    protected static _ads: WXBannerAdBase[] = [];

    static get currentAd(): WXBannerAdBase {
        if (WXBannerAdBase._ads.length == 0) return null;
        return WXBannerAdBase._ads[WXBannerAdBase._ads.length - 1];
    }

    //最大高度
    //如果设置了最大高度，再广告resize时，超出该高度时，会自动调节_verticalIndent属性。
    //此时，会忽略_verticalIndent的设置
    protected _maxHeight: number = 0;

    protected _maxWidth: number = 0;

    //广告边框宽
    public borderWeight: number = 2;

    
    //广告对象
    protected _bannerAd: any;

    public get bannerAd():any {
        return this._bannerAd;
    }

    //广告对象表
    protected _adID: string;


    //广告位置
    protected _location: GameCoreLocation;


    //垂直方向上偏移像素
    protected _vertialIndent: number = 0;
    //水平方向上偏移像素
    protected _horizontalIndent: number = 0;

    /**
     *  
     * @param adID                  广告ID
     * @param location              广告位置
     * @param verticalIndent        广告垂直方向上偏移像素
     * @param horizontalIndent      广告水平方向上偏移像素
     */
    constructor(adID: string,
        location: GameCoreLocation = GameCoreLocation.BOTTOM_CENTER,
        verticalIndent: number = 0,
        horizontalIndent: number = 0,
        maxHeight:number = 0,
        maxWidth:number = 0
    ) {
        super();

        //记录当前banner ad
        WXBannerAdBase._ads.push(this);

        this._adID = adID;
        this._location = location;
        this._vertialIndent = verticalIndent;
        this._horizontalIndent = horizontalIndent;
        this._maxHeight = maxHeight;
        this._maxWidth = maxWidth;

        this.createAd();
    }


    /**
     * 创建广告
     * 
     */
    protected createAd(): void {
    }


    protected _adRect: {"x":number, "y":number, "width":number, "height":number};


    /**
     * 获取广告在屏幕上的矩形区域
     */
    get adRect(): {"x":number, "y":number, "width":number, "height":number} {
        return this._adRect;
    }

    public get adWidth():number {
        if (this._adRect) return this._adRect.width;
        return 0;
    }

    public get adHeight():number {
        if (this._adRect) return this._adRect.height;
        return 0;
    }
    
    /**
     * 重新布局
     */
    public relayout(): void {
    }


    protected _isShowing: boolean = false;


    /**
     * 广告是否正在显示
     * 
     */
    public get isShowing(): boolean {
        return this._isShowing;
    }


    public next(): void {
    }


    /**
     * 显示广告
     */
    public show(): void {
    }


    /**
     * 隐藏广告
     */
    public hide(): void {
    }




    protected _destoried: boolean;

    /**
     * 销毁广告
     * 
     * 
     */
    public destory(): void {
        if (this._destoried) return;
        this._destoried = true;

        //重置当前广告索引
        let index: number = WXBannerAdBase._ads.indexOf(this);
        if (index >= 0) WXBannerAdBase._ads.splice(index, 1);

        super.destory();
    }

}
