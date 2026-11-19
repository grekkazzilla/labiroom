// ***** DrawSVG.js
function getSVG(gRoot,sElm){
 var elm=document.createElementNS('http://www.w3.org/2000/svg',sElm);
 if(gRoot!==null) gRoot.appendChild(elm);
 return elm;}

function getG(gRoot,x,y,z,isOn,id){
 var g=getSVG(gRoot,'g');
 if(id!==undefined) g.id=id;
 g.x=x,g.y=y,g.z=z;
 if(isOn===true) showG(g);
 else hideG(g);
 return g;}

function getRect(gRoot,x,y,w,h,r,clrFill,clrStroke,wStroke){
 var rct=getSVG(gRoot,'rect');
 rct.setAttribute('x',x);
 rct.setAttribute('y',y);
 rct.setAttribute('width',w);
 rct.setAttribute('height',h);
 rct.setAttribute('rx',r);
 rct.setAttribute('ry',r);
 getStyle(rct,clrFill,clrStroke,wStroke);
 return rct;}

function getLin(gRoot,x0,y0,x1,y1,clrFill,w){
 var lin=getSVG(gRoot,'line');
 lin.setAttribute('x1',x0);
 lin.setAttribute('y1',y0);
 lin.setAttribute('x2',x1);
 lin.setAttribute('y2',y1);
 lin.setAttribute('stroke',clrFill);
 lin.setAttribute('stroke-width',w);
 lin.setAttribute('stroke-linecap','round');
 return lin;}

function getCirc(gRoot,x,y,r,clrFill,clrStroke,nStroke){
 var crl=getSVG(gRoot,'circle');
 crl.setAttribute('cx',x);
 crl.setAttribute('cy',y);
 crl.setAttribute('r',r);
 getStyle(crl,clrFill,clrStroke,nStroke);
 return crl;}

function getStyle(elm,clrFill,clrStroke,wStroke){
 elm.setAttribute('fill',clrFill);
 elm.setAttribute('stroke',clrStroke);
 elm.setAttribute('stroke-width',wStroke);}

function getText(sTxt,gRoot,x,y,clrFill,sHor){
 var txt=getSVG(gRoot,'text');
 txt.setAttribute('x',x);
 txt.setAttribute('y',y);
 txt.setAttribute('font-size','20px');
 txt.setAttribute('fill',clrFill);
 txt.setAttribute('font-family','sans-serif,Arial');
 txt.setAttribute('text-anchor',sHor);
 txt.setAttribute('alignment-baseline','middle');
 txt.setAttribute('dominant-baseline','middle');
 txt.setAttribute('dy','0.1em');
 txt.setAttribute('letter-spacing','0px');
 txt.appendChild(document.createTextNode(sTxt));
 return txt;}

function getPath(gRoot,x,y,z,clrFill,clrStroke,wStroke,sD){
 var pth=getSVG(gRoot,'path');
 getStyle(pth,clrFill,clrStroke,wStroke);
 pth.setAttribute('d',sD);
 pth.setAttribute('stroke-linejoin','round');
 pth.setAttribute('stroke-linecap','round');
 pth.x=x;
 pth.y=y;
 pth.z=z;
 if(x===null) x=0;
 if(y===null) y=0;
 pth.setAttribute('transform','translate('+x+','+y+') scale('+z+')');
 return pth;}

function getLinGrad(id,clr01,clr02,nOpac01,nOpac02,dfs){
 var grd=getSVG(dfs,'linearGradient');
 grd.id=id;
 grd.setAttribute('x1','0');
 grd.setAttribute('x2','0');
 grd.setAttribute('y1','0');
 grd.setAttribute('y2','1');
 var stp=getSVG(grd,'stop');
 stp.setAttribute('offset','0%');
 stp.setAttribute('stop-color',clr01);
 stp.setAttribute('stop-opacity',nOpac01);
 var stp=getSVG(grd,'stop');
 stp.setAttribute('offset','100%');
 stp.setAttribute('stop-color',clr02);
 stp.setAttribute('stop-opacity',nOpac02);
 return grd;}

function getRadGrad(id,nOffSet01,nOffSet02,clr01,clr02,nOpac01,nOpac02,dfs){
 var rad=getSVG(dfs,'radialGradient');
 rad.id=id;
 rad.setAttribute('cx','50%');
 rad.setAttribute('cy','50%');
 rad.setAttribute('r','50%');
 rad.setAttribute('fx','50%');
 rad.setAttribute('fy','50%');
 var stp=getSVG(rad,'stop');
 stp.setAttribute('offset',nOffSet01+'%');
 stp.setAttribute('stop-color',clr01);
 stp.setAttribute('stop-opacity',nOpac01);
 var stp=getSVG(rad,'stop');
 stp.setAttribute('offset',nOffSet02+'%');
 stp.setAttribute('stop-color',clr02);
 stp.setAttribute('stop-opacity',nOpac02);
 return rad;}

function getBlur(id,num,dfs){
 var flt=getSVG(dfs,'filter');
 flt.id=id;
 var gaussBlur=getSVG(flt,'feGaussianBlur');
 gaussBlur.setAttribute('stdDeviation',num);
 gaussBlur.setAttribute('in','SourceGraphic');}

// SVG ARC
function getArc(x,y,radius,startAngle,endAngle){
 var start=polarToCartesian(x,y,radius,endAngle);
 var end=polarToCartesian(x,y,radius,startAngle);
 var largeArcFlag=endAngle-startAngle<=180 ? "0" : "1";
 var d=[
  "M",start.x,start.y,
  "A",radius,radius,0,largeArcFlag,0,end.x,end.y
 ].join(" ");
 return d;}
function polarToCartesian(centerX,centerY,radius,angleInDegrees){
 var angleInRadians=(angleInDegrees-90)*Math.PI/180.0;
 return{
  x:centerX+(radius*Math.cos(angleInRadians)),
  y:centerY+(radius*Math.sin(angleInRadians))};}


///////////////////// **** ////////////////////

function showG(arg){
 if(typeof arg=='string') arg=document.getElementById(arg);
 if(arg.z===null) var sZoom='scale('+arg.zx+','+arg.zy+')';
 else var sZoom='scale('+arg.z+')';	
 var sRotate='rotate(0)';
 if(arg.r!==undefined && arg.r!=0){
  sRotate='rotate('+arg.r+','+arg.w/2+','+arg.h/2+')';
 }
 arg.setAttribute('transform','translate('+arg.x+','+arg.y+') '+sZoom+' '+sRotate);
 arg.isOn=true;}

function hideG(arg){
 if(typeof arg=='string') arg=document.getElementById(arg);
 arg.setAttribute('transform','scale(0)');
 arg.isOn=false;}

function jumpG(arg,x,y,isSet){
 if(typeof arg=='string') arg=document.getElementById(arg);
 if(x===null) x=arg.x;
 else if(isSet===true) arg.x=x; 
 if(y===null) y=arg.y;
 else if(isSet===true) arg.y=y; 
 if(arg.z===null) var sZoom='scale('+arg.zx+','+arg.zy+')';
 else var sZoom='scale('+arg.z+')';	
 var sRotate='rotate(0)';
 if(arg.r!==undefined && arg.r!=0){
  sRotate='rotate('+arg.r+','+arg.w/2+','+arg.h/2+')';
 }
 arg.setAttribute('transform','translate('+x+','+y+') '+sZoom+' '+sRotate);
}

function turnG(arg,r,isSet){
 if(typeof arg=='string') arg=document.getElementById(arg);
 if(arg.z===null) var sZoom='scale('+arg.zx+','+arg.zy+')';
 else var sZoom='scale('+arg.z+')';	
 arg.setAttribute('transform','translate('+arg.x+','+arg.y+') '+sZoom+' rotate('+r+','+arg.w/2+','+arg.h/2+')');
 if(isSet===true) arg.r=r;
}

function midG(arg){
 if(typeof arg=='string') arg=document.getElementById(arg);
 if(arg.x===null) arg.x=(arg.parentNode.w-arg.getBBox().width*arg.z)/2;
 if(arg.y===null) arg.y=(arg.parentNode.h-arg.getBBox().height*arg.z)/2;
 arg.setAttribute('transform','translate('+arg.x+','+arg.y+') scale('+arg.z+')');
}

function attachG(gOut,gIn){
 var x=gIn.x-gOut.x;
 var y=gIn.y-gOut.y;
 jumpG(gIn,x,y,true);
 gOut.appendChild(gIn);
}

function zoomG(arg,z,isSet){
 if(typeof arg=='string') arg=document.getElementById(arg);
 var zx=1;
 var zy=1;
 if(typeof z=='number'){
  sZoom='scale('+z+')';
  zx=z;
  zy=z;
  if(isSet===true) arg.z=z;
 }
 else if(typeof z=='object'){
  zx=z[0];
  zy=z[1];
  if(zx===null) zx=arg.z;
  if(zy===null) zy=arg.z;
  sZoom='scale('+zx+','+zy+')';
  if(isSet===true){
   arg.z=null;
   arg.zx=zx;
   arg.zy=zy;
  }
 }
 var x=arg.x+arg.w*(1-zx)/2;
 var y=arg.y+arg.w*(1-zy)/2;
 if(arg.r===undefined) var sRotate='rotate(0)';
 else var sRotate='rotate('+arg.r+','+arg.w/2+','+arg.h/2+')';
 arg.setAttribute('transform','translate('+x+','+y+') '+sZoom+' '+sRotate);
 if(isSet===true){
  arg.x=x;
  arg.y=y;
 }
}

function getGrid(nGrid,clr){
 if(clr===undefined) clr="#c0c0c0";
 for(var i=0;i<W+1;i=i+nGrid) getLin(G_root,i,0,i,H,clr,1);
 for(var i=0;i<H+1;i=i+nGrid) getLin(G_root,0,i,W,i,clr,1);
}

function getPic(id,gRoot,x,y,w,h,aPicData,aFrameStyle,isOn,d){
 var g=getG(gRoot,x,y,1,isOn);
 if(id!='') g.id=id;
 g.w=w;
 g.h=h;
 if(aFrameStyle!==null){
  getRect(g,0,0,w,h,aFrameStyle[3],aFrameStyle[0],aFrameStyle[1],aFrameStyle[2]);
 }
 if(aPicData!==null){
  var zPic=aPicData[0];
  var clrFill=aPicData[1];
  var clrStroke=aPicData[2];
  var wStroke=aPicData[3];
  var pth=getPath(g,null,null,zPic,clrFill,clrStroke,wStroke,d);
  if(pth.x===null) pth.x=(pth.parentNode.w-pth.getBBox().width*pth.z)/2;
  if(pth.y===null) pth.y=(pth.parentNode.h-pth.getBBox().height*pth.z)/2;
  pth.setAttribute('transform','translate('+pth.x+','+pth.y+') scale('+pth.z+')');
 }
 return g;
}
// ***** DrawSVG.js : spinner
function getSpin(gRoot,clr,z,w){
 var gSpin=getG(gRoot,0,0,z,false,'gSpin');
 var pth=getPath(gSpin,0,0,1,clr,clr,w,"M 49.2 0 C 48.5 -0 48 0 47.3 0 C 31.3 0.4 15.7 8.2 6.8 22.8 C -6 43.5 -0.3 72 20.8 84.8 C 39.4 96 64.9 90.9 76.2 71.8 C 86 55.3 81.4 32.7 64.4 22.9 C 50 14.6 30.4 18.7 22.1 33.6 C 15.2 46 18.8 62.6 31.7 69.5 C 41.9 74.9 55.7 71.7 61 60.9 C 64.9 52.8 62.3 41.9 53.6 38.2 C 50.6 36.9 47.1 36.8 44 37.9 C 41 38.9 38.4 41.2 37.3 44.5 C 36.8 46.4 36.9 48.8 37.8 50.7 C 38.6 52.6 40.3 54.1 42.7 54.2 A 0.5 0.5 0 0 0 42.8 53.2 C 40.8 53.1 39.5 51.9 38.7 50.2 C 37.9 48.6 37.8 46.5 38.3 44.8 C 39.2 41.8 41.5 39.8 44.3 38.8 C 47.1 37.8 50.4 38 53.2 39.1 C 61.3 42.6 63.8 52.9 60.1 60.5 C 55 70.8 41.9 73.7 32.1 68.6 C 19.8 62 16.3 46 22.9 34.1 C 31 19.7 50 15.7 63.9 23.8 C 80.4 33.3 84.9 55.3 75.4 71.3 C 64.4 89.9 39.5 94.9 21.3 83.9 C 0.7 71.4 -4.9 43.5 7.6 23.3 C 21.6 0.6 52.4 -5.5 74.8 8.4 C 99.6 23.9 106.1 57.7 90.7 82.1 C 90.1 83.1 89.5 84.1 88.8 85 A 0.5 0.5 0 1 0 89.6 85.6 C 90.3 84.7 91 83.7 91.6 82.7 C 107.3 57.8 100.6 23.4 75.3 7.6 C 67.3 2.6 58.2 0.1 49.2 0 z");
 gSpin.z=z;
 gSpin.w=gSpin.getBBox().width*gSpin.z;
 gSpin.h=gSpin.getBBox().height*gSpin.z;
 gSpin.x=W/2-gSpin.w/2;
 gSpin.y=H/2-gSpin.h/2;
 gSpin.anim=function(isRst){
  if(isRst){
   if(this.isOn===true) return;
   this.isOn=true;
   this.r=0;
   this.nLastTime=performance.now();
  }
  const nCurrTime=performance.now();
  const nDiff=(nCurrTime-this.nLastTime)/1000;
  this.nLastTime=nCurrTime;
  this.r+=175*nDiff;
  this.setAttribute('transform','translate('+this.x+','+this.y+') rotate('+this.r+','+(this.w/2)+','+(this.h/2)+') scale('+this.z+')');
  if(this.isOn===true){
   requestAnimationFrame(function(){gSpin.anim(false);});
  }
  else{
   this.setAttribute('transform','scale(0)');
  }
 }
 gSpin.stop=function(){this.isOn=false;}
 return gSpin;
}
// ***** DrawSVG.js : paints (only after a page gets downloaded)
/*getLinGrad('grdBtnRvs','#bdb76d','#eee8aa',1,1,DFS);
getLinGrad('grdPic','#a0a0a0','#000',1,1,DFS);
getLinGrad('grdPicRvs','#505050','#909090',1,1,DFS);
getLinGrad('grdPale','#fff','#eee8aa',1,1,DFS);
getLinGrad('grdPaleRvs','#eee8aa','#fff',1,1,DFS);
getLinGrad('grdSilver','#ececec','#999999',1,1,DFS);
getLinGrad('grdSilverRvs','#999999','#ececec',1,1,DFS);
getLinGrad('grdRed','#ff8080','#aa0000',1,1,DFS);
getLinGrad('grdRedRvs','#aa0000','#ff8080',1,1,DFS);
getLinGrad('grdGreen','lightgreen','green',1,1,DFS);
getLinGrad('grdGreenRvs','green','lightgreen',1,1,DFS);
getLinGrad('grdGoldA','#ffeeaa','#aa8800',1,1,DFS);
getLinGrad('grdGoldB','#d3bc5f','#2b2200',1,1,DFS);
getLinGrad('grdA','#ddd8aa','#bdb76d',1,1,DFS);
getLinGrad('grdB','#a0a0a0','#808080',1,1,DFS);
getBlur('blr2',2,DFS);
getBlur('blr3',3,DFS);
getBlur('blr4',4,DFS);
getBlur('blr8',8,DFS);
getBlur('blr12',12,DFS);*/
// ***** DrawSVG.js : full screen toggle
/* this line should be inserted in the css file for the svg.fs class:  
 svg.fs{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:100vw;height:100dvh;margin:0 !important;}
 */
function getFS(){
 document.body.insertBefore(SVG_arena,$$(document,'header'));
  setTimeout(function(){
  const elem=document.documentElement;
  if(elem.requestFullscreen){elem.requestFullscreen();}
  else if(elem.webkitRequestFullscreen){elem.webkitRequestFullscreen();}
  else if(elem.msRequestFullscreen){elem.msRequestFullscreen();}
  window.scrollTo({top:0,behavior:'auto'});
 },10);
}
document.addEventListener('fullscreenchange',()=>{
 const arr=[...document.querySelectorAll('header,main,footer')].filter(el=>el!==undefined);
 if (document.fullscreenElement) {
  arr.forEach(el=>{if(el)el.style.display='none'});
  SVG_arena.classList.add('fs');
  document.body.style.height='95vh';
  document.body.style.padding='0';
 }
 else {
  var eMain=document.getElementsByTagName('main')[0];
  document.body.style.padding='10px';
  arr.forEach(el=>{if(el)el.style.display=''});
  SVG_arena.classList.remove('fs');
  if(SVG_arena.isMaxWH===true){
   SVG_arena.style.maxWidth=SVG_arena.sMaxW;
   SVG_arena.style.maxHeight=SVG_arena.sMaxH;
  }
  document.body.style.height='';
  document.body.style.padding='10px';
  $$(document,'main').insertBefore(SVG_arena,$('btnFS'));
 }
});
// ***** DrawSVG.js : selectors
function $(id){return document.getElementById(id)}
function $$(root,sTag,pos){
 if(typeof root=='string') root=$(root);
 if(pos===undefined) pos=0;return root.getElementsByTagName(sTag)[pos];
}
function $$$(root,sTag){
 if(typeof root=='string') root=$(root);
 return root.getElementsByTagName(sTag);
}
