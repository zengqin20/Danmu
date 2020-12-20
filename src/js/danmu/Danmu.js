//实例化每一条弹幕
import {getTextWidth,getTextPosition} from './util';
class Danmu{
  constructor(danmu,fCtx){//每一条弹幕数据，和父亲就是 ViedoDanmu
    this.content=danmu.content;//之前绑定的默认值
    this.runTime=danmu.runTime;
    this.danmu=danmu;
    this.ctx=fCtx;
    //父类的作用：在父类上找相关的颜色和speed 还有canvas画布
    this.initialize();//每一个弹幕都要初始化一次
    console.log(this);
  }

  
  initialize(){
    this.color=this.danmu.color||this.ctx.color;//如果有color就用 没有就默认值
    this.speed=this.danmu.speed||this.ctx.speed;
    this.fontSize=30;
    this.width=getTextWidth(this.content,this.fontSize);
    getTextPosition(this.ctx.canvas,this.fontSize,this);

  }

  draw(){//父级调用 控制什么时候调用
    this.ctx.canvasCtx.font=this.fontSize+'px Microsoft Yahei';//canvas 字体设置
    this.ctx.canvasCtx.fillStyle=this.color;
    this.ctx.canvasCtx.fillText(this.content,this.X,this.Y);//填充内容
  }
}

export default Danmu;