const {ccclass, property} = cc._decorator;

@ccclass
export default class ResManager1 extends cc.Component {
    
    array_panel = []
    bg_array_audio = []
    cube_array_audio = []
    prfabs_array = []
    _load_count = 0
    _total_count = 0
    loadFinsh = false
    loadProgressBar = null
    tempCount = 0;

    public static instance = null;

    onLoad = function() {
        ResManager1.instance = this;
         this.loadProgressBar.progress = 0, this.loadProgressBar.node.active = true;
    }
    setText = function(e) {
        this.text = "<b>" + e + "</b>";
    }
}