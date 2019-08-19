import GameManager from "./GameManager";
import GameValues, { PlatformName } from "../base/GameValues";
import GameCoreEventNames from "../GameCoreEventNames";
import EventData from "./event/EventData";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SoundsManager {
    //====================================================================================
    //常用音效设置
    //====================================================================================

    //面板弹出声效素材地址
    popUpSoundSource: string = null;

    //点击音效
    tapSoundSource: string = null;
    //====================================================================================

    //场景背景音乐
    private sceneBgSounds: Array<cc.AudioSource> = [];
    private sceneBgSoundURLs: Array<string> = [];


    //QQ厘米秀音效
    private effectContext: any;
    private musicContext: any;

    /**
     *
     */
    constructor() {
        setTimeout(this.init.bind(this), 500);
    }


    private init(): void {
        //读取本地数据
        let v: any = GameValues.getLocalData("soundMuted");
        //console.log("【__deer__soundMuted】", v);
        if (v === true) {
            this.muteSound();
        }

        v = GameValues.getLocalData("musicMuted");
        if (v === true) {
            this.muteMusic();
        }

        //初始化微信模块。需要延迟监听onHide onClose。
        // QQ平台在游戏启动时，有些手机上会自动回调onHide onClose，导致声音静音
        setTimeout(this.initForWXModule.bind(this), 2000);


        //监听事件
        GameManager.eventManager.addEventListener(GameCoreEventNames.MUTE_MUSIC, (e:EventData)=>{
            this.muteMusic();
        }, this);

        GameManager.eventManager.addEventListener(GameCoreEventNames.UNMUTE_MUSIC, (e:EventData)=>{
            this.unmuteMusic();
        }, this);
    }


    private _originalMusicMuted: boolean = false;
    // private _onShowMuteMusicTimeout: number = 0;
    // private _onShowUnmuteMusicTimeout: number = 0;

    private initForWXModule(): void {
        var self = this;
        if (typeof wx != "undefined") {
            wx.onHide(() => {
                //console.log("【SoundsManager】onHide");
                self._originalMusicMuted = self._musicMuted;
                self.muteMusic();
            });

            wx.onShow(() => {
                //console.log("【SoundsManager】onShow");
                if (!self._originalMusicMuted) {
                    self.unmuteMusic();
                }
                if (GameValues.currentPlatform == PlatformName.QQCM) {
                    self.musicContext.play();
                }
            });

            wx.onAudioInterruptionEnd(() => {
                //强行暂停音乐 如果不暂停，调用resumeMusic是无效的，因为是微信让声音消失了
                cc.audioEngine.pauseMusic();

                //console.log("【SoundsManager】onAudioInterruptionEnd");
                if (!self._originalMusicMuted) {
                    self.unmuteMusic();
                }
                if (GameValues.currentPlatform == PlatformName.QQCM) {
                    self.musicContext.play();
                }
            });
        } else {
            //初始化微信模块
            setTimeout(this.initForWXModule.bind(this), 2000);
        }
    }

    //推入场景背景音乐
    public pushSceneBgMusic(sourceURL: string) {
        let lastURL: string;
        var self = this;
        if (this.sceneBgSoundURLs.length > 0) {
            lastURL = this.sceneBgSoundURLs[this.sceneBgSoundURLs.length - 1];
        }

        if (lastURL == sourceURL) return;

        //如果当前有背景音乐，需要暂停
        if (this.sceneBgSoundURLs.length > 0) {
            let bgAudio: cc.AudioSource = this.sceneBgSounds[this.sceneBgSounds.length - 1];
            console.log("暂停背景音乐", this.sceneBgSoundURLs[this.sceneBgSoundURLs.length - 1]);
            if (bgAudio) bgAudio.pause();
        }

        //记录数据
        this.sceneBgSounds.push(null);
        this.sceneBgSoundURLs.push(sourceURL);

        let isRemote: boolean = (sourceURL.match(/^https?:\/\//i) != null);
        if (isRemote) {
            var fileUrl: string = sourceURL + '.mp3?vesion=' + GameValues.gameVersion
            cc.loader.load({ url: fileUrl, type: 'mp3' }, (err, audioClip: cc.AudioClip) => {
                self.sceneBgLoadedCallback(sourceURL, audioClip);
            });
        } else {
            let realURL: string = sourceURL.replace(/^\/?resources\//, "");
            //加载资源
            realURL = realURL.replace(/\.mp3$/, "");

            cc.loader.loadRes(realURL, (err, audioClip: cc.AudioClip) => {
                self.sceneBgLoadedCallback(sourceURL, audioClip);
            });
        }
    }



    private sceneBgLoadedCallback(sourceURL: string, audioClip: cc.AudioClip): void {
        if (audioClip) {
            let bgAudio: cc.AudioSource = new cc.AudioSource()

            //========================================================================
            //QQ厘米秀特殊处理
            //========================================================================
            if (GameValues.currentPlatform == PlatformName.QQCM && (typeof BK != "undefined")) {
                if (!this.musicContext) this.musicContext = BK.createAudioContext();
                //添加mp3后缀
                if (sourceURL.match(/\.mp3$/i) == null) sourceURL += ".mp3";

                this.musicContext.src = "GameRes://" + cc.url.raw("resources/" + sourceURL);
                console.log("【播放音乐】" + "GameRes://" + cc.url.raw("resources/" + sourceURL));
                this.musicContext.loop = true;
                this.musicContext.play();
            } else {
                bgAudio.clip = audioClip;
                bgAudio.loop = true;
                if (this._musicMuted) bgAudio.volume = 0;
                bgAudio.play();
            }

            let index: number = this.sceneBgSoundURLs.indexOf(sourceURL);
            if (index == -1) {
                bgAudio.stop();
            } else {
                if (index >= 0) this.sceneBgSounds[index] = bgAudio;

                //如果不是最后一个，暂停
                if (index != this.sceneBgSoundURLs.length - 1) {
                    bgAudio.pause();
                }
            }
            // this.sceneBgSounds.push(bgAudio);
            // this.sceneBgSoundURLs.push(sourceURL);
            //console.log("播放背景音乐", sourceURL);

            //如果已静音
            if (this._musicMuted) {
                this.refreshBgMusic();
            }
        }
    }

    //推出场景背景音乐（回到上一个场景的背景音乐）
    public popSceneBgMusic() {
        if (this.sceneBgSoundURLs.length <= 1) return;

        //如果当前有背景音乐，需要暂停
        let bgAudio: cc.AudioSource = this.sceneBgSounds.pop();
        if (bgAudio) bgAudio.stop();

        this.sceneBgSoundURLs.pop();

        this.refreshBgMusic();
    }

    //更新背景音乐
    private refreshBgMusic() {
        //如果当前有背景音乐，需要暂停
        if (this.sceneBgSoundURLs.length == 0) return;

        let bgAudio: cc.AudioSource = this.sceneBgSounds[this.sceneBgSounds.length - 1];
        if (!bgAudio) return;

        console.log("【SoundsManager】refreshBgMusic")
        console.log("\tbgAudio.isPlaying=" + bgAudio.isPlaying)
        console.log("\tbgAudio.volume=" + bgAudio.volume)

        if (this._musicMuted) {
            bgAudio.volume = 0;
            if (GameValues.currentPlatform == PlatformName.QQCM) {
                //TODO: 后续cocos creator版本升级可能不需要了
                //兼容QQ厘米秀平台。直接设置。
                console.log("####### QQQQQQQQQQQ #######", this.musicContext, this.musicContext.muted)
                if (this.musicContext) {
                    this.musicContext.volume = 0;
                }
            } else {
                bgAudio.pause();
            }
        } else {
            bgAudio.volume = this._musicVolume;

            if (GameValues.currentPlatform == PlatformName.QQCM) {
                //兼容QQ厘米秀平台。直接设置。
                //TODO: 后续cocos creator版本升级可能不需要了
                console.log("####### QQQQQQQQQQQ #######")
                if (this.musicContext) {
                    this.musicContext.volume = this._musicVolume;
                }
            } else {
                bgAudio.resume();
            }
        }

        console.log("bgAudio.volume=" + bgAudio.volume);
    }





    //是否已静音背景音乐
    private _musicMuted: boolean = false;

    public get musicMuted(): boolean {
        return this._musicMuted;
    }

    //是否已静音特效声音
    private _soundMuted: boolean = false;

    public get soundMuted(): boolean {
        return this._soundMuted;
    }

    //静音背景音乐
    public muteMusic() {
        if (this._musicMuted) return;

        this._musicMuted = true;
        this.refreshBgMusic();

        //本地保存
        GameValues.saveLocalData("musicMuted", this._musicMuted);
    }

    //取消静音背景音乐
    public unmuteMusic() {
        if (!this._musicMuted) return;

        this._musicMuted = false;
        this.refreshBgMusic();

        //本地保存
        GameValues.saveLocalData("musicMuted", this._musicMuted);
    }


    //背景音乐音量
    private _musicVolume: number = 1;


    public get musicVolume(): number {
        return this._musicVolume;
    }


    //设置背景音乐音量
    public set musicVolume(value: number) {
        if (value >= 0 && this._musicVolume != value) {
            this._musicVolume = value;

            this.refreshBgMusic();
        }
    }



    //静音特效音乐
    public muteSound() {
        if (this._soundMuted) return;

        this._soundMuted = true;

        //本地保存
        GameValues.saveLocalData("soundMuted", this._soundMuted);
    }


    //取消静音特效音乐
    public unmuteSound() {
        if (!this._soundMuted) return;

        this._soundMuted = false;

        //本地保存
        GameValues.saveLocalData("soundMuted", this._soundMuted);
    }

    //音效音量
    private _soundVolume: number = 1;


    public get soundVolume(): number {
        return this._soundVolume;
    }


    //设置音效音量
    public set soundVolume(value: number) {
        if (value >= 0 && this._soundVolume != value) {
            this._soundVolume = value;
        }
    }



    //音频资源
    //每个数据为 {"audio":cc.AudioClip, "volume":number}
    private _audioClipMap: object = {};

    //音效组
    private _groupMap: object = {};

    /**
     * 播放音效
     * 
     * @param   sourceURL           音乐url
     * @param   loop                是否循环播放
     * @param   groupName           音效组名称。同一个音效组只能有一个声音在播放；新播放都音效会替换同一组之前的播放的音效。
     * @param   volume              该音效音量 0-1。如果不设置，则使用默认音效音量。
     */
    public playSound(sourceURL: string, loop: boolean = false, groupName: string = null, volume: number = NaN): void {
        if (!sourceURL) return;
        if (this._soundMuted) return;

        var self = this;
        //如果已经存在AudioClip，直接使用
        if (this._audioClipMap[sourceURL] != undefined) {
            let audioClipData: { "audio": cc.AudioClip, "volume": number } = this._audioClipMap[sourceURL];
            if (!isNaN(volume)) audioClipData.volume = volume;
            this.playSound_do(sourceURL, loop, groupName);
        } else {
            console.log("【playSound】load sound", sourceURL, loop, groupName);

            if (sourceURL.indexOf("https") != -1) {
                var fileUrl: string = sourceURL + '.mp3?vesion=' + GameValues.gameVersion
                cc.loader.load({ url: fileUrl, type: 'mp3' }, function (err, res) {
                    if (res) {
                        self._audioClipMap[sourceURL] = { "audio": res, "volume": volume };
                        self.playSound_do(sourceURL, loop, groupName);
                    }
                });

            } else {
                //加载资源
                let realURL: string = sourceURL.replace(/^\/?resources\//, "");

                //========================================================================
                //QQ厘米秀特殊处理
                //========================================================================
                if (GameValues.currentPlatform == PlatformName.QQCM && (typeof BK != "undefined")) {
                    if (!this.effectContext) {
                        this.effectContext = BK.createAudioContext({ "type": "effect" });
                    }

                    //添加mp3后缀
                    if (realURL.match(/\.mp3$/i) == null) realURL += ".mp3";

                    this.effectContext.src = "GameRes://" + cc.url.raw("resources/" + realURL);
                    console.log("【播放音效】" + "GameRes://" + cc.url.raw("resources/" + realURL));
                    this.effectContext.play({
                        // complete: (result) => {
                        // this.effectContext.pause({ id: result.id });
                        // }
                    });
                    return;
                }
                //========================================================================

                realURL = realURL.replace(/\.mp3$/, "");
                // console.log("playSound:", realURL)
                cc.loader.loadRes(realURL, (err, audio: cc.AudioClip) => {
                    if (audio) {
                        this._audioClipMap[sourceURL] = { "audio": audio, "volume": volume };
                        this.playSound_do(sourceURL, loop, groupName);
                    }
                });
            }

        }

    }


    private playSound_do(sourceURL: string, loop: boolean = false, groupName: string = null): void {
        let audioClipData:{"audio":cc.AudioClip, "volume":number} = this._audioClipMap[sourceURL];
        if (!audioClipData) return;

        let clip: cc.AudioClip = audioClipData.audio;
        if (!clip) return;

        //停止播放
        this.stopSound(sourceURL);

        let theAS: cc.AudioSource = new cc.AudioSource();
        theAS.clip = clip;
        if (loop) {
            theAS.loop = true;

            //自动建立组，以便停止循环播放
            if (!groupName) groupName = "loop__" + Math.random();
        }

        //组
        if (typeof (groupName) == "string" && groupName.length > 0) {
            let lastAudio: cc.AudioSource = this._groupMap[groupName];
            if (lastAudio) {
                lastAudio.stop();
            }

            this._groupMap[groupName] = theAS;
        }


        if (!isNaN(audioClipData.volume)) theAS.volume = audioClipData.volume;
        else theAS.volume = this._soundVolume;

        theAS.play();
    }


    /**
     * 停止播放音效。只有设置了循环播放的音效才能被停止
     * 
     * @param sourceURLOrGroupName 
     */
    public stopSound(sourceURLOrGroupName: string): void {
        let audioClipData:{"audio":cc.AudioClip, "volume":number} = this._audioClipMap[sourceURLOrGroupName];
        if (audioClipData && audioClipData.audio) {
            //组音乐中对应的音乐
            for (let key in this._groupMap) {
                let groupAS: cc.AudioSource = this._groupMap[key];
                if (groupAS && groupAS.clip == audioClipData.audio) {
                    groupAS.stop();
                    delete this._groupMap[key];
                }
            }
        }

        let theAS:cc.AudioSource = this._groupMap[sourceURLOrGroupName];
        if (theAS) {
            theAS.stop();
            delete this._groupMap[sourceURLOrGroupName];
        }

    }


    /**
     * 重置所有音效数据；清空缓存数据。
     * 
     */
    public reset(): void {
        //音频资源
        this._audioClipMap = {};

        //停止所有组音乐
        for (let key in this._groupMap) {
            let theAS: cc.AudioSource = this._groupMap[key];
            if (theAS) theAS.stop();
        }
        this._groupMap = {};

    }

    /**
     * 播放点击音效。前提是已经设置了 SoundsManager.tapSoundSource;
     */
    public playTapSound(): void {
        if (this.tapSoundSource) {
            this.playSound(this.tapSoundSource);
        }
    }
}
