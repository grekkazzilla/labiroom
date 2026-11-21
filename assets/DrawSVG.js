// ***** DrawSVG.js
function createSVG(root,w,h,isDfs,id){
 var svg=getElem(root,'svg');
 svg.setAttribute('xmlns','http://www.w3.org/2000/svg');
 svg.style.width=w+'px';
 svg.style.height=h+'px';
 svg.setAttribute('width',w);
 svg.setAttribute('height',h);
 if(isDfs===true) getElem(svg,'defs');
 if(id!==undefined) svg.id=id;
 if(root===null) document.body.appendChild(svg);
 return svg;}

function getElem(gRoot,sElm){
 var elm=document.createElementNS('http://www.w3.org/2000/svg',sElm);
 if(gRoot!==null) gRoot.appendChild(elm);
 return elm;}

function getG(gRoot,x,y,z,isOn,id){
 var g=getElem(gRoot,'g');
 if(id!==undefined) g.id=id;
 g.x=x,g.y=y,g.z=z;
 if(isOn===true) showG(g);
 else hideG(g);
 return g;}

function getRect(gRoot,x,y,w,h,r,clrFill,clrStroke,wStroke){
 var rct=getElem(gRoot,'rect');
 rct.setAttribute('x',x);
 rct.setAttribute('y',y);
 rct.setAttribute('width',w);
 rct.setAttribute('height',h);
 rct.setAttribute('rx',r);
 rct.setAttribute('ry',r);
 getStyle(rct,clrFill,clrStroke,wStroke);
 return rct;}

function getLin(gRoot,x0,y0,x1,y1,clrFill,w){
 var lin=getElem(gRoot,'line');
 lin.setAttribute('x1',x0);
 lin.setAttribute('y1',y0);
 lin.setAttribute('x2',x1);
 lin.setAttribute('y2',y1);
 lin.setAttribute('stroke',clrFill);
 lin.setAttribute('stroke-width',w);
 lin.setAttribute('stroke-linecap','round');
 return lin;}

function getCirc(gRoot,x,y,r,clrFill,clrStroke,nStroke){
 var crl=getElem(gRoot,'circle');
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
 var txt=getElem(gRoot,'text');
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
 var pth=getElem(gRoot,'path');
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
 var grd=getElem(dfs,'linearGradient');
 grd.id=id;
 grd.setAttribute('x1','0');
 grd.setAttribute('x2','0');
 grd.setAttribute('y1','0');
 grd.setAttribute('y2','1');
 var stp=getElem(grd,'stop');
 stp.setAttribute('offset','0%');
 stp.setAttribute('stop-color',clr01);
 stp.setAttribute('stop-opacity',nOpac01);
 var stp=getElem(grd,'stop');
 stp.setAttribute('offset','100%');
 stp.setAttribute('stop-color',clr02);
 stp.setAttribute('stop-opacity',nOpac02);
 return grd;}

function getRadGrad(id,nOffSet01,nOffSet02,clr01,clr02,nOpac01,nOpac02,dfs){
 var rad=getElem(dfs,'radialGradient');
 rad.id=id;
 rad.setAttribute('cx','50%');
 rad.setAttribute('cy','50%');
 rad.setAttribute('r','50%');
 rad.setAttribute('fx','50%');
 rad.setAttribute('fy','50%');
 var stp=getElem(rad,'stop');
 stp.setAttribute('offset',nOffSet01+'%');
 stp.setAttribute('stop-color',clr01);
 stp.setAttribute('stop-opacity',nOpac01);
 var stp=getElem(rad,'stop');
 stp.setAttribute('offset',nOffSet02+'%');
 stp.setAttribute('stop-color',clr02);
 stp.setAttribute('stop-opacity',nOpac02);
 return rad;}

function getBlur(id,num,dfs){
 var flt=getElem(dfs,'filter');
 flt.id=id;
 var gaussBlur=getElem(flt,'feGaussianBlur');
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
 /*
 aPicData[z,clrFill,clrStroke,wStroke]
 aFrameStyle[clrFill,clrStroke,wStroke,nRoundCorner]
 */
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
const DATA_spin="M 49.2 0 C 48.5 -0 48 0 47.3 0 C 31.3 0.4 15.7 8.2 6.8 22.8 C -6 43.5 -0.3 72 20.8 84.8 C 39.4 96 64.9 90.9 76.2 71.8 C 86 55.3 81.4 32.7 64.4 22.9 C 50 14.6 30.4 18.7 22.1 33.6 C 15.2 46 18.8 62.6 31.7 69.5 C 41.9 74.9 55.7 71.7 61 60.9 C 64.9 52.8 62.3 41.9 53.6 38.2 C 50.6 36.9 47.1 36.8 44 37.9 C 41 38.9 38.4 41.2 37.3 44.5 C 36.8 46.4 36.9 48.8 37.8 50.7 C 38.6 52.6 40.3 54.1 42.7 54.2 A 0.5 0.5 0 0 0 42.8 53.2 C 40.8 53.1 39.5 51.9 38.7 50.2 C 37.9 48.6 37.8 46.5 38.3 44.8 C 39.2 41.8 41.5 39.8 44.3 38.8 C 47.1 37.8 50.4 38 53.2 39.1 C 61.3 42.6 63.8 52.9 60.1 60.5 C 55 70.8 41.9 73.7 32.1 68.6 C 19.8 62 16.3 46 22.9 34.1 C 31 19.7 50 15.7 63.9 23.8 C 80.4 33.3 84.9 55.3 75.4 71.3 C 64.4 89.9 39.5 94.9 21.3 83.9 C 0.7 71.4 -4.9 43.5 7.6 23.3 C 21.6 0.6 52.4 -5.5 74.8 8.4 C 99.6 23.9 106.1 57.7 90.7 82.1 C 90.1 83.1 89.5 84.1 88.8 85 A 0.5 0.5 0 1 0 89.6 85.6 C 90.3 84.7 91 83.7 91.6 82.7 C 107.3 57.8 100.6 23.4 75.3 7.6 C 67.3 2.6 58.2 0.1 49.2 0 z";
function getSpin(gRoot,clr,z,wStroke,w,h,isOn,id){
 var gSpin=getG(gRoot,0,0,z,isOn,id);
 var pth=getPath(gSpin,0,0,1,clr,clr,wStroke,DATA_spin);
 gSpin.z=z;
 gSpin.w=gSpin.getBBox().width*gSpin.z;
 gSpin.h=gSpin.getBBox().height*gSpin.z;
 gSpin.x=w/2-gSpin.w/2;
 gSpin.y=h/2-gSpin.h/2;
 jumpG(gSpin,gSpin.x,gSpin.y);
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
function getPaint(dfs){
 getLinGrad('grdBtn','#eee8aa','#bdb76d',1,1,dfs);
 getLinGrad('grdBtnRvs','#bdb76d','#eee8aa',1,1,dfs);
 getLinGrad('grdPic','#a0a0a0','#000',1,1,dfs);
 getLinGrad('grdPicRvs','#505050','#909090',1,1,dfs);
 getLinGrad('grdPale','#fff','#eee8aa',1,1,dfs);
 getLinGrad('grdPaleRvs','#eee8aa','#fff',1,1,dfs);
 getLinGrad('grdSilver','#ececec','#999999',1,1,dfs);
 getLinGrad('grdSilverRvs','#999999','#ececec',1,1,dfs);
 getLinGrad('grdRed','#ff8080','#aa0000',1,1,dfs);
 getLinGrad('grdRedRvs','#aa0000','#ff8080',1,1,dfs);
 getLinGrad('grdGreen','lightgreen','green',1,1,dfs);
 getLinGrad('grdGreenRvs','green','lightgreen',1,1,dfs);
 //getLinGrad('grdGoldA','#ffeeaa','#aa8800',1,1,dfs);
 //getLinGrad('grdGoldB','#d3bc5f','#2b2200',1,1,dfs);
 //getLinGrad('grdA','#ddd8aa','#bdb76d',1,1,dfs);
 //getLinGrad('grdB','#a0a0a0','#808080',1,1,dfs);
 getBlur('blr2',2,dfs);
 //getBlur('blr3',3,dfs);
 //getBlur('blr4',4,dfs);
 //getBlur('blr8',8,dfs);
 //getBlur('blr12',12,dfs);
}
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
// ***** DrawSVG.js : console messages
function ttt(){console.log(...arguments);}
// ***** DrawSVG.js : box
var BOX=null;
function makeBox(dataXY,dataWH,dataBtn,r,dataPnt,isOn,gRoot,id){
 if(dataBtn===null) var wBx=dataWH[0],hBx=dataWH[1];
 else{
  var wBtn=dataBtn[0];
  var hBtn=dataBtn[1];
  var qW=dataBtn[2];
  var qH=dataBtn[3];
  var mBtn=dataBtn[4];
  if(mBtn===null) mBtn=(dataWH[0]-qW*wBtn)/(qW+1);
  if(dataWH===null || dataWH[0]===null) var wBx=wBtn*qW+mBtn*(qW+1); 
  else var wBx=dataWH[0];
  if(dataWH===null || dataWH[1]===null) var hBx=hBtn*qH+mBtn*(qH+1);
  else var hBx=dataWH[1];}
 if(dataXY===null || dataXY[0]===null) var x=(W-wBx)/2;
 else var x=dataXY[0];
 if(dataXY===null || dataXY[1]===null) var y=(H-hBx)/2;
 else var y=dataXY[1];
 var bx=getG(gRoot,x,y,1,isOn);
 if(dataPnt===null){
  getRect(bx,0,0,wBx,hBx,r,'#808080','none',0).setAttribute('filter','url(#blr2)');
  getRect(bx,0,0,wBx,hBx,r,'#fff','none',0);}
 else getRect(bx,0,0,wBx,hBx,r,dataPnt[0],dataPnt[1],dataPnt[2]);
 if(dataBtn!==null){
  bx.mBtn=mBtn;
  bx.x0=getBoxBtnX(0,wBtn,mBtn);
  bx.x1=getBoxBtnX(1,wBtn,mBtn);
  bx.x2=getBoxBtnX(2,wBtn,mBtn);
  bx.x3=getBoxBtnX(3,wBtn,mBtn);
  bx.x4=getBoxBtnX(4,wBtn,mBtn);
  bx.x5=getBoxBtnX(5,wBtn,mBtn);
  bx.x6=getBoxBtnX(6,wBtn,mBtn);
  bx.x7=getBoxBtnX(7,wBtn,mBtn);
  bx.x8=getBoxBtnX(8,wBtn,mBtn);
  bx.x9=getBoxBtnX(9,wBtn,mBtn);
  bx.y0=getBoxBtnY(0,hBtn,mBtn);
  bx.y1=getBoxBtnY(1,hBtn,mBtn);
  bx.y2=getBoxBtnY(2,hBtn,mBtn);
  bx.y3=getBoxBtnY(3,hBtn,mBtn);
  bx.y4=getBoxBtnY(4,hBtn,mBtn);
  bx.y5=getBoxBtnY(5,hBtn,mBtn);
  bx.y6=getBoxBtnY(6,hBtn,mBtn);
  bx.y7=getBoxBtnY(7,hBtn,mBtn);
  bx.y8=getBoxBtnY(8,hBtn,mBtn);
  bx.y9=getBoxBtnY(9,hBtn,mBtn);
  bx.w1=getBoxBtnW(1,wBtn,mBtn);
  bx.w2=getBoxBtnW(2,wBtn,mBtn);
  bx.w3=getBoxBtnW(3,wBtn,mBtn);
  bx.w4=getBoxBtnW(4,wBtn,mBtn);
  bx.w5=getBoxBtnW(5,wBtn,mBtn);
  bx.w6=getBoxBtnW(6,wBtn,mBtn);
  bx.w7=getBoxBtnW(7,wBtn,mBtn);
  bx.w8=getBoxBtnW(8,wBtn,mBtn);
  bx.h1=getBoxBtnW(1,hBtn,mBtn);
  bx.h2=getBoxBtnW(2,hBtn,mBtn);
  bx.h3=getBoxBtnW(3,hBtn,mBtn);
  bx.h4=getBoxBtnW(4,hBtn,mBtn);
  bx.h5=getBoxBtnW(5,hBtn,mBtn);}
 bx.w=wBx,bx.h=hBx;
 bx.wBtn=wBtn,bx.hBtn=hBtn;
 if(id!==undefined) bx.id=id;
 return bx;}
function getBoxButtonX(n,wBtn,mBtn){return mBtn+(wBtn+mBtn)*n;}
function getBoxButtonY(n,hBtn,mBtn){return mBtn+(hBtn+mBtn)*n;}
function getBoxButtonW(n,wBtn,mBtn){return wBtn*n+mBtn*(n-1);}
function getBoxButtonH(n,hBtn,mBtn){return hBtn*n+mBtn*(n-1);}
function popBox(arg){
 if(typeof arg=='string') arg=document.getElementById(arg);
 if(arg==BX){
  hideG(arg);
  BX=null;
 }
 else{
  if(BX!==null) hideG(BX);
  showG(arg);
  BX=arg;
 }
}
// ***** DrawSVG.js : button
function getButton(gRoot,x,y,w,h,ctg,dataPic,go,dTxt,isOn,id,mFrame,wFrame,nRadiusOut,nRadiusIn){
var btn=getG(gRoot,x,y,1,isOn);
if(id!==undefined) btn.id=id;
btn.w=w,btn.h=h;
if(mFrame==undefined) mFrame=3;
if(wFrame==undefined) wFrame=1;
if(nRadiusOut==undefined) nRadiusOut=6;
if(nRadiusIn==undefined) nRadiusIn=5;
getRect(btn,0,0,w,h,nRadiusOut,'transparent','none',1);
getRect(btn,mFrame,mFrame,w-mFrame*2,h-mFrame*2,nRadiusIn,'transparent','none',wFrame);
if(dataPic!==null){
 for(var i=0;i<dataPic.length;i++){
  var e=dataPic[i];
  var s=e[0],z=e[1],x=null,y=null;
  if(e[2]!==null){
   x=e[2][0];
   y=e[2][1];}
  var pth=getPath(btn,x,y,z,'red','none',25,s);
  if(pth.x===null) pth.x=(pth.parentNode.w-pth.getBBox().width*pth.z)/2;
  if(pth.y===null) pth.y=(pth.parentNode.h-pth.getBBox().height*pth.z)/2;
  pth.setAttribute('transform','translate('+pth.x+','+pth.y+') scale('+pth.z+')');
 }
}

if(dTxt!==null){
 var sPos=dTxt[2];
 var sA=dTxt[0][0],xA=0,yA=0;
 if(dTxt[0][1]==null || dTxt[0][1][0]==null) xA=w/2;
 else xA=dTxt[0][1][0];
 if(dTxt[0][1]==null || dTxt[0][1][1]==null){
  if(dTxt[1]===null) yA=h/2;
  else yA=h/3.2;}
 else yA=dTxt[0][1][1];
 getText(sA,btn,xA,yA,'transparent',sPos);
 if(dTxt[1]!==null){
  var sB=dTxt[1][0],xB=0,yB=0;
  if(dTxt[1][1]==null || dTxt[1][1][0]==null) xB=w/2;
  else xB=dTxt[1][1][0];
  if(dTxt[1][1]==null || dTxt[1][1][1]==null) yB=2*h/2.8;
  else yB=dTxt[1][1][1];
  getText(sB,btn,xB,yB,'transparent',sPos);}}

btn.go=go;
btn.onclick=function(){pushButton(this);}
setButton(btn,ctg);
btn.style.cursor='pointer';
return btn;}

function setButton(btn,ctg){
 btn.aOn=new Array();
 if(ctg.charAt(0)=='a'){
  $$(btn,'rect',0).setAttribute('fill','url(#grdBtn)');
  btn.aOn.push(['rect',0,'fill','url(#grdBtn)','#bdb76d'])
  if(ctg.charAt(1)=='a'){
   $$(btn,'rect',1).setAttribute('stroke','url(#grdBtnRvs)');
   btn.aOn.push(['rect',1,'stroke','url(#grdBtnRvs)','#fff'])
  }
  var aPth=btn.getElementsByTagName('path');
  for(var i=0;i<aPth.length;i++){
   if(ctg.charAt(2)=='a'){ 
    aPth[i].setAttribute('fill','url(#grdPic)');
    btn.aOn.push(['path',i,'fill','url(#grdPic)','#fff'])
   } 
   else if(ctg.charAt(2)=='b'){ 
    aPth[i].setAttribute('fill','url(#grdPale)');
    btn.aOn.push(['path',i,'fill','url(#grdPale)','#fff'])
   }
   else if(ctg.charAt(2)=='c'){ 
    aPth[i].setAttribute('fill','transparent');
    aPth[i].setAttribute('stroke','url(#grdPic)');
    btn.aOn.push(['path',i,'stroke','url(#grdPic)','#fff'])
   }
   else if(ctg.charAt(2)=='d'){ 
    aPth[i].setAttribute('fill','transparent');
    aPth[i].setAttribute('stroke','url(#grdPale)');
    btn.aOn.push(['path',i,'stroke','url(#grdPale)','#fff'])
   }
  }
  var aTxt=btn.getElementsByTagName('text');
  for(var i=0;i<aTxt.length;i++){
   if(ctg.charAt(3)=='a'){ 
    aTxt[i].setAttribute('fill','url(#grdPic)');
    btn.aOn.push(['text',i,'fill','url(#grdPic)','#fff'])
   }
   if(ctg.charAt(3)=='b'){ 
    aTxt[i].setAttribute('fill','url(#grdPale)');
    btn.aOn.push(['text',i,'fill','url(#grdPale)','#fff'])
   }
  }
 }
 if(ctg.charAt(0)=='b'){
  $$('rect',btn,0).setAttribute('fill','url(#grdPic)');
  btn.aOn.push(['rect',0,'fill','url(#grdPic)','#000'])
  if(ctg.charAt(1)=='b'){
   $$('rect',btn,1).setAttribute('stroke','url(#grdPicRvs)');
   btn.aOn.push(['rect',1,'stroke','url(#grdPicRvs)','#fff'])
  }
  var aPth=btn.getElementsByTagName('path');
  for(var i=0;i<aPth.length;i++){
   if(ctg.charAt(2)=='a'){ 
    aPth[i].setAttribute('fill','url(#grdPale)');
    btn.aOn.push(['path',i,'fill','url(#grdPale)','#fff'])
   }
  }
 }
}

function pushButton(btn){
 if(IS_lock===false || btn.isLockIgnored===true){
  IS_lock=true;
  onButton(btn,1);
  setTimeout(function(){
   onButton(btn,0);
   btn.go();
   if(btn.isToKeepLocked===true) IS_lock=true;
   else IS_lock=false;
  },200);
 }
}

function onButton(btn,a){ // a: 0 - released button (off/out) look, 1 - pushed button (on) look
if(btn.aOn){
 for(var i=0;i<btn.aOn.length;i++){
  var arr=btn.aOn[i];
  for(var j=0;j<arr.length;j++){
   btn.getElementsByTagName(arr[0])[arr[1]].setAttribute(arr[2],arr[a*1+3]);}}}}
// ***** DrawSVG.js : slider
function getSlider(gRoot,x,y,w,h,pnt,arr,fnc,isOn,id){
 var sld=getG(gRoot,x,y,1,isOn,id);
 var sD_A='M 0 0 H '+w+' V '+h+' H 0 z ';
 var sD_B='M 10 25 C 10 15,15 10,25 10 H '+(w-25)+' C '+(w-15)+' 10,'+(w-10)+' 15,'+(w-10)+' 25 V '+(h-25)+' C '+(w-10)+' '+(h-15)+','+(w-15)+' '+(h-10)+','+(w-25)+' '+(h-10)+' H 25 C 15 '+(h-10)+',10 '+(h-15)+',10 '+(h-25)+' z';
 var pth=getPath(sld,0,0,1,'transparent','#808080',2,sD_B);
 pth.setAttribute('filter','url(#blr2)');
 var pth=getPath(sld,0,0,1,pnt,'none',0,sD_A+sD_B);
 pth.setAttribute('fill-rule','evenodd');
 sld.btn=getG(sld,105,2,1,true);
 var hBtn=h-4,wBtn=hBtn/1.7;
 sld.btn.w=wBtn;
 getRect(sld.btn,0,0,wBtn,hBtn,7,'url(#grdBtn)','none',0);
 getCrl(sld.btn,wBtn/2,hBtn/2,wBtn/2-5,'url(#grdBtnRvs)','none',1);
 sld.style.cursor='pointer';
 //
 sld.arr=new Array();
 sld.rctCurr=null;
 var rct=getRect(sld,0,0,wBtn,h,0,'transparent','green',0);
 var rct=getRect(sld,w-wBtn,0,wBtn,h,0,'transparent','green',0);
 var wRct=(w-wBtn*2)/arr.length;
 for(var i=0;i<arr.length;i++){
  var rct=getRect(sld,wBtn+i*wRct,0,wRct,h,0,'transparent','red',0);
  if(i==0) sld.rctA=rct;
  else if(i==arr.length-1) sld.rctB=rct;
  rct._x=rct.getAttribute('x')*1;
  rct._w=rct.getAttribute('width')*1;
  rct.val=arr[i];
  sld.arr.push(rct);
  //
  if(isTouch()===false){
   rct.onclick=function(){
    setSlider(this.parentNode,null,this);
    this.parentNode.fnc();
   }
  }
 }
 sld.fnc=fnc;
 if(isTouch()===true){
  sld.ontouchmove=function(evt){
   var bx=this.parentNode;
   var x=evt.changedTouches[0].clientX;
   x=x-bx.getBoundingClientRect().left;
   x=Math.round(x/Z);
   for(var i in this.arr){
    var rct=this.arr[i];
    if(x>rct._x && x<(rct._x+rct._w) && this.rctCurr!=rct){
     setSlider(this,null,rct);  
     this.fnc();
    }
   }
  }
 }
 return sld;
}

function setSlider(sld,val,rct){
 if(rct===null){
  for(var i in sld.arr){
   var rct=sld.arr[i];
   if(rct.val==val) break;
  }
 }
 jumpG(sld.btn,(rct._x+(rct._w-sld.btn.w)/2),sld.btn.y);
 sld.rctCurr=rct;
 sld.val=rct.val;
}
// ***** DrawSVG.js : toggler
// MAKE TOGGLE BUTTON AND ACTIONS (300x210)
function getToggle(root,x,y,w,h,fncDo,strLabel,xText,yText,strAnchor,id){
var tgl=getG(root,x,y,1,true);
getRect(tgl,0,0,w,h,0,'transparent','#c0c0c0',0);
var z=h/210;
var g=getG(tgl,0,0,z,true);
var pth=getPath(g,0,0,1,'transparent','#000',5,'M 110.0625 24 C 65.9625 24 30 60.3 30 105 C 30 149.7 65.9625 186 110.0625 186 L 188.0625 186 C 233.3625 186 270 149.7 270 105 C 270 60.3 233.3625 24 188.0625 24 L 110.0625 24 z');
pth.setAttribute('filter','url(#blr8)');
getPath(g,0,0,1,'#fff','none',0,'M 37.40625 0 C 16.69923 0 0 20.35021 0 45.65625 L 0 164.34375 C 0 189.64979 16.69923 210 37.40625 210 L 262.59375 210 C 283.30077 210 300 189.64979 300 164.34375 L 300 45.65625 C 300 20.35021 283.30077 0 262.59375 0 L 37.40625 0 z M 110.0625 24 L 188.0625 24 C 233.3625 24 270 60.3 270 105 C 270 149.7 233.3625 186 188.0625 186 L 110.0625 186 C 65.9625 186 30 149.7 30 105 C 30 60.3 65.9625 24 110.0625 24 z');
getCrl(g,115,105,65,'url(#grdSilver)','none',0);
getCrl(g,115,105,45,'url(#grdSilverRvs)','none',0);
getText(strLabel,tgl,xText,yText,'url(#grdSilver)',strAnchor); // 60 27 left usually
tgl.isOn=false;
tgl.isLock=false;
tgl.isUnlock=false;
tgl.style.cursor='pointer';
tgl.do=fncDo;
tgl.onclick=function(){pushTgl(this,undefined);}
if(id!==undefined) tgl.id=id;
return tgl;}

function pushTgl(tgl,bln){
if(typeof(tgl)=='string') tgl=$(tgl);
if((IS_lock===false || tgl.isUnlock===true) && tgl.isLock===false){
 if(bln===undefined){
  tgl.isOn=!tgl.isOn;
  tgl.do();}
 else tgl.isOn=bln;
 if(tgl.isOn===true){
  var strSdw='olive';
  var strBtn='url(#grdBtn)';
  var strRvs='url(#grdBtnRvs)';
  var strTxt='url(#grdPic)';
  var x=185;}
 else{
  var strSdw='#000';
  var strBtn='url(#grdSilver)';
  var strRvs='url(#grdSilverRvs)';
  var strTxt='#c0c0c0';
  var x=115;}
 tgl.getElementsByTagName('path')[0].setAttribute('stroke',strSdw);
 tgl.getElementsByTagName('circle')[0].setAttribute('cx',x);
 tgl.getElementsByTagName('circle')[0].setAttribute('fill',strBtn);
 tgl.getElementsByTagName('circle')[1].setAttribute('cx',x);
 tgl.getElementsByTagName('circle')[1].setAttribute('fill',strRvs);
 tgl.getElementsByTagName('text')[0].setAttribute('fill',strTxt);}}
