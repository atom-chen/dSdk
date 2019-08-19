import WXUtils from "../wechat/WXUtils";
import WXImage from "../wechat/WXImage";

// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;


/**
 * by 徐剑飞
 */
@ccclass
export default class TextureRenderUtils {
  // LIFE-CYCLE CALLBACKS:

  private constructor() { }
  private static textureRenderUtils: TextureRenderUtils = new TextureRenderUtils();
  public static get instance() {
    return this.textureRenderUtils;
  }
  private camera: cc.Camera;
  private _canvas: any = null;
  private texture: cc.RenderTexture;

  private init(camera: cc.Camera, node: cc.Node) {
    this.camera = null;
    this._canvas = null;
    this.texture = null;
    let texture = new cc.RenderTexture();
    let gl = cc.game["_renderContext"];
    let width = Math.floor(node.width);
    let height = Math.floor(node.height);
    texture.initWithSize(width, height, gl.STENCIL_INDEX8);
    this.camera = camera;
    this.camera.targetTexture = texture;
    this.texture = texture;
  }
  // create the img element
  private initImage() {
    // return the type and dataUrl
    var dataURL = this._canvas.toDataURL("image/png");
    var img = document.createElement("img");
    img.src = dataURL;
    return dataURL;
  }

  // create the canvas and context, filpY the image Data
  private async createSprite(node: cc.Node, callbackFunc: Function) {
    let width = this.texture.width;
    let height = this.texture.height;
    if (!this._canvas) {
      this._canvas = document.createElement('canvas');

      this._canvas.width = width;
      this._canvas.height = height;
    }
    else {
      this.clearCanvas();
    }
    let ctx = this._canvas.getContext('2d');
    this.camera.render(node);
    let data = this.texture.readPixels();
    let imageData = ctx.createImageData(width, height);
    setTimeout(() => {
      let rowBytes = width * 4;
      for (let row = 0; row < height; row++) {
        let srow = height - 1 - row;
        let start = srow * width * 4;
        let start2 = row * width * 4;
        for (let i = 0; i < rowBytes; i++) {
          imageData.data[start2 + i] = data[start + i];
        }
      }
      ctx.putImageData(imageData, 0, 0);
      setTimeout(() => {
        callbackFunc(this._canvas);
      }, 0.1);
    }, 0.1)

  }

  private saveFile(
    tempCanvas,
    width: number,
    height: number,
    success: Function
  ) {
    if (cc.sys.platform === cc.sys.WECHAT_GAME) {
      let data = {
        x: 0,
        y: 0,
        width: Math.floor(width),
        height: Math.floor(height),
        destWidth: Math.floor(width),
        destHeight: Math.floor(height),
        fileType: "png",
        quality: 0.8,
        success: res => {
          //返回在微信缓存中的图片绝对路径
          success(res.tempFilePath);
          WXUtils.hideLoading();
          this.camera = null;
        }
      };
      tempCanvas.toTempFilePath(data);
    }
  }
  private succ: Function = null;
  /**
   * 截图
   * @param node 需要截图的node
   * @param success 回调函数
   */
  public async startScreen(node: cc.Node, success: Function) {
    this.succ = success;
    WXUtils.showLoading("加载中");
    let newnode: cc.Node = new cc.Node();
    let camera = newnode.addComponent(cc.Camera);
    node.addChild(newnode);
    this.init(camera, node);
    this.createSprite(node, (canvas) => {
      this.saveFile(canvas, node.width, node.height, this.succ);
      node.removeChild(newnode);
      // newnode = null;
    });
    // return path;
  }

  /**
   *
   * @param path 保存到手机本地相册
   */
  public saveScreen(path: string) {
    WXImage.saveImageToPhotosAlbum(path);
  }
  /**
   * 清除canvas
   */
  private clearCanvas() {
    let ctx = this._canvas.getContext("2d");
    ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
  }
  /**
   * 读取相册图片utf8值
   * @param callbackfunc 
   */
  public readBase64File(fileName: string, callbackfunc: Function): void {
    wx.getFileSystemManager().readFile({
      filePath: this.getPhotoFromLocalByName(fileName),
      encoding: "utf8",
      success: function (e) {
        console.log(e);
        if (callbackfunc) {
          callbackfunc(e.data);
        }
      },
      fail: function (e) {
        //TODO:对加载图片信息失败进行处理;
        console.log('photo data error')
        // callbackfunc("photo data error");
      }
    });
  }
  /**
   * 将图片写入微信用户本地文件(utf8格式)
   * @param data 图片转成文本值
   * @param callbackfunc 
   */
  public writeBase64File(fileName: string, data: string, callbackfunc: Function): void {
    let filePath = this.getPhotoFromLocalByName(fileName);
    // console.log(filePath,"filepath");
    wx.getFileSystemManager().writeFile({
      filePath: filePath,
      data: data,
      encoding: "utf8",
      success: function (e) {
        console.log("截图保存成功");
        if (callbackfunc) {
          callbackfunc();
        }
      },
      fail: function (e) {
        console.log("截图保存失败", e);
      }
    });
  }
  /**
   * 将微信缓存文件图片保存到微信本地
   * @param tmpPath 微信缓存文件路径
   * @param fileName 需要保存到微信的路径，默认wx.env.USER_DATA_PATH下
   * @param callbackfunc 保存成功回调函数
   */
  public saveFileToLocal(tmpPath: string, fileName: string, callbackfunc: Function): void {
    let save = () => {
      wx.getFileSystemManager().saveFile({
        tempFilePath: tmpPath,
        filePath: filePath,
        success: (e) => {
          console.log("截图保存成功", filePath);
          if (callbackfunc) {
            callbackfunc(filePath);
          }
        },
        fail: (e) => {
          console.log("截图保存失败", e);
        }
      })
    }

    let filePath = this.getPhotoFromLocalByName(fileName);
    /**判断文件是否存在 */
    wx.getFileSystemManager().access({
      path: filePath,
      success: (e) => {
        console.log("文件存在");
        // func();
        this.unlinkPhotoFile(fileName, save);

      },
      fail: (e) => {
        console.log("文件不存在", e);
        save();
      }
    })
  }

  /**
   * 判断文件是否存在
   * @param fileName 图片文件名
   * @param callbackFunc 返回参数，必须返回bool值
   */
  public judgeAccessFile(fileName: string, callbackFunc: Function): void {
    let filePath = this.getPhotoFromLocalByName(fileName);
    wx.getFileSystemManager().access({
      path: filePath,
      success: (e) => {
        // console.log("文件存在");
        // func();
        if (callbackFunc) {
          callbackFunc(true);
        }

      },
      fail: (e) => {
        if (callbackFunc) {
          callbackFunc(false);
        }
      }
    })
  }

  /**
   * 通过文件名来获得完整微信本地保存路径，路径可以根据需求自定义
   * @param fileName 图片文件名
   */
  public getPhotoFromLocalByName(fileName: string): string {
    return wx.env.USER_DATA_PATH + "/" + fileName + ".png";
  }
  /**
   * 删除微信本地的图片
   * @param fileName 删除的文件名
   * @param callbackFunc 删除成功回调
   */
  public unlinkPhotoFile(fileName: string, callbackFunc: Function): void {
    let filePath = this.getPhotoFromLocalByName(fileName);

    wx.getFileSystemManager().unlink({
      filePath: filePath,
      success: (e) => {
        console.log("删除文件成功");
        if (callbackFunc) {
          callbackFunc();
        }
      },
      fail: (e) => {
        console.log("删除文件失败", e);
      }
    })
  }
}
