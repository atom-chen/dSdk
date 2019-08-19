import ResManager1 from "./ResManager1";
import SoundMgr from "../../SoundMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class AudioManager extends cc.Component {

    private static _instance: AudioManager = null;
    //====================单例=============================================================
    public static get instance(): AudioManager {
      if (!AudioManager._instance) AudioManager._instance = new AudioManager();
  
      return AudioManager._instance;
    }
    playSound(e:string, t = null) {
        // if (false !== LocalData.instance.sound) {
          if(e.indexOf("scream") != -1){
            e += "_" + Math.floor(Math.random() * 20 + 1);
          }
          SoundMgr.instance.playSound("sounds/" + e);
    }


}