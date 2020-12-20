//工具函数 判断options传入
function isObject(value) { 
  const type=Object.prototype.toString.call(value);
  return type==='[object Object]';
 }

 //
 function isArray(value){
   return Array.isArray(value);
 }
 function getTextWidth(content,fontSize) { 
   //创建一个临时元素存储弹幕文本 方便获取width 
   const _span=document.createElement('span');
   //放入弹幕文本
   _span.innerText=content;
   _span.style.fontSize=fontSize+"px";
   //span转换块级
   _span.style.position='absolute';
   //放入span到body 
   document.body.appendChild(_span);
   //获取span的宽度
   let width=_span.offsetWidth;
   //从body上删除该span
   document.body.removeChild(_span);
   return width;
 }

 function getTextPosition(canvas,fontSize,ctx) {  
   let x=canvas.width;//画布的最右边
  let y=canvas.height*Math.random();//画布高度之内
//判断弹幕发送位置是否超出高度
  y<fontSize && (y=fontSize);//弹幕小于画布所在位置 是往下画的
  y>canvas.height-fontSize&&(y=canvas.height-fontSize);//大于所在位置
  
  ctx.X=x;
  ctx.Y=y;
 }
 export{
   isObject,
   isArray,
   getTextWidth,
   getTextPosition
 }