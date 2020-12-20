import VideoDanmu from './danmu';

//弹幕数据
const danmuData = [
  {
    content: 'hhhhhhhhh9232',
    speed: 2,
    runTime: 0,
    color: 'red'
  },
  {
    content: 'hhhhhhhh323',
    speed: 3,
    runTime: 8,
    color: 'green'
  },
  {
    content: 'hasndkjhhhh22',
    speed: 2,
    runTime: 2,
    color: 'red'
  },
  {
    content: 'asdhakhdl12',
    speed: 2,
    runTime: 6,
    color: 'red'
  },
  {
    content: 'hhhhhhhhh65',
    speed: 2,
    runTime: 8,
    color: 'red'
  },
  {
    content: 'hhhashdahhh334',
    speed: 4,
    runTime: 5,
    color: 'red'
  },
];

//;以免打包时错误
; ((doc) => {
  //获取video和canvas的节点对象
  const oDanmuCanvas = doc.getElementById('danmuCanvas'),
        oDanmuVideo = doc.getElementById('danmuVideo'),
        oDanmuInput=doc.getElementsByClassName("danmuInput")[0],
        oDanmuBtn=doc.getElementsByClassName('danmu-btn')[0],
        oDanmuColor=doc.getElementsByClassName('colorInput')[0];


  //模块初始化函数
  const init = () => {
    //复用 用类来写 并且挂在window上 作用域外也可以用到
    //实例化弹幕差价
    window.videoDanmu = new VideoDanmu(
      oDanmuVideo,
      oDanmuCanvas,
      {
        danmuData

      }
    );
    bindEvent();

  }
  //绑定事件处理函数的管理函数
  function bindEvent() {
    oDanmuVideo.addEventListener("play",handleVideoPlay,false);
    oDanmuVideo.addEventListener("pause",handleVideoPause,false);
    oDanmuVideo.addEventListener("seeked",handleVideoSeek,false);
    oDanmuBtn.addEventListener("click",handleDanmuBtnClick,false);
  }
  function handleDanmuBtnClick(){
    if(videoDanmu.danmuPaused) return ;//判断是否暂停 暂停就不能发
    const inputValue=oDanmuInput.value.trim();

    if(!inputValue.length) return;//有没有内容

    const colorValue=oDanmuColor.value,
          currentTime=oDanmuVideo.currentTime;
    //组装数据
    const _data={
      content:inputValue,
      color:colorValue,
      runTime:currentTime
    }

    videoDanmu.addDanmu(_data);
    oDanmuInput.value='';
  }
  function handleVideoPlay() {  
    videoDanmu.danmuPaused=false;
    videoDanmu.render();
  }
  function handleVideoPause() {  
    videoDanmu.danmuPaused=true;
  }
  function handleVideoSeek(){
    videoDanmu.reset();
  }

  //执行模块初始化函数
  init();
})(document);//临时参数