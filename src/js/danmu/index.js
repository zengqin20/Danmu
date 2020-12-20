////弹幕类处理
import { isObject, isArray } from './util';
import Danmu from './Danmu';
class VideoDanmu {
  constructor(video, canvas, options) {
    if (!video || !canvas || !options || !isObject(options))
      return;
    if (!isArray(options.danmuData) || !options.danmuData )
     return ;

    this.video = video;
    this.canvas = canvas;
    this.canvasCtx = canvas.getContext("2d");
    this.canvas.width = video.offsetWidth;
    this.canvas.height = video.offsetHeight;
    this.danmuPaused = true;
//全部合并到实例上
    Object.assign(this,options,{
      speed:2,
      runtime:0,
      color:'#fff'
    });

    this.danmuPool=this.createDanmuPool();
    this.render();
    console.log(this);
  }
  createDanmuPool () {//通过map包装每一条弹幕数据
    return this.danmuData.map(dm=>new Danmu(dm,this));
    //所有东西作为父类都在this上也得传过去 
    //返回的是一个Danmu数组
    //danmuData是一个对象数组
  }
  render(){//渲染之后再清除 再画
    this.clearRect();//canvas的api
    this.drawDanmu();
    !this.danmuPaused&&requestAnimationFrame(this.render.bind(this));//视频没暂停才画
   }
  drawDanmu(){
    let currentTime=this.video.currentTime;//获取时间

    this.danmuPool.map((danmu)=>{//遍历每一个弹幕实例
      if(!danmu.stopDrawing && currentTime>=danmu.runTime){//弹幕执行时间
        //给每一个弹幕挂一个stop 因为没赋值所以undefined 就是false
        if(!danmu.isInitialized){//弹幕是否初始化 弹幕循环时就不会再次初始化了
          danmu.initialize();
          danmu.isInitialized=true;
        }
        danmu.X-=danmu.speed;//移动
        danmu.draw();//坐标移了就绘制

        if(danmu.X<=danmu.width*-1){//移动出了canvas画布 停止绘制
          danmu.stopDrawing=true;
        }
      }
    })
  }

  reset (){
    this.clearRect();
    let currentTime=this.video.currentTime;
    this.danmuPool.map((danmu)=>{
      danmu.stopDrawing=false;

      if(currentTime<=danmu.runTime){
        danmu.isInitialized=false;//重新初始化
      }else{
        danmu.stopDrawing=true;
      }
    })
  }
  addDanmu(data){
    this.danmuPool.push(new Danmu(data,this));
  }
  clearRect(){
    this.canvasCtx.clearRect(0,0,this.canvas.width,this.canvas.height);
  }

}

export default VideoDanmu;