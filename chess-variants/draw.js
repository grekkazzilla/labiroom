///////////////////// DRAW ////////////////////

function makeSVG(root,w,h,isDfs,id){
 var svg=getSVG(root,'svg');
 svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
 svg.style.width=w+'px';
 svg.style.height=h+'px';
 svg.setAttribute('width',w);
 svg.setAttribute('height',h);
 if(isDfs===true) getSVG(svg,'defs');
 if(id!==undefined) svg.id=id;
 if(root===null) document.body.appendChild(svg);
 return svg;}

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

function getRct(gRoot,x,y,w,h,r,pnt,pntStroke,wStroke){
 var rct=getSVG(gRoot,'rect');
 rct.setAttribute('x',x);
 rct.setAttribute('y',y);
 rct.setAttribute('width',w);
 rct.setAttribute('height',h);
 rct.setAttribute('rx',r);
 rct.setAttribute('ry',r);
 getStyle(rct,pnt,pntStroke,wStroke);
 return rct;}

function getLin(gRoot,x0,y0,x1,y1,pnt,w){
 var lin=getSVG(gRoot,'line');
 lin.setAttribute('x1',x0);
 lin.setAttribute('y1',y0);
 lin.setAttribute('x2',x1);
 lin.setAttribute('y2',y1);
 lin.setAttribute('stroke',pnt);
 lin.setAttribute('stroke-width',w);
 lin.setAttribute('stroke-linecap','round');
 return lin;}

function getCrl(gRoot,x,y,r,pnt,pntStroke,nStroke){
 var crl=getSVG(gRoot,'circle');
 crl.setAttribute('cx',x);
 crl.setAttribute('cy',y);
 crl.setAttribute('r',r);
 getStyle(crl,pnt,pntStroke,nStroke);
 return crl;}

function getStyle(elm,pnt,pntStroke,wStroke){
 elm.setAttribute('fill',pnt);
 elm.setAttribute('stroke',pntStroke);
 elm.setAttribute('stroke-width',wStroke);}

function getTxt(sTxt,gRoot,x,y,pnt,sHor){
 var txt=getSVG(gRoot,'text');
 txt.setAttribute('x',x);
 txt.setAttribute('y',y);
 txt.setAttribute('font-size','20px');
 txt.setAttribute('fill',pnt);
 txt.setAttribute('font-family','sans-serif,Arial');
 txt.setAttribute('text-anchor',sHor);
 txt.setAttribute('alignment-baseline','middle');
 txt.setAttribute('dominant-baseline','middle');
 txt.setAttribute('dy','0.1em');
 txt.setAttribute('letter-spacing','0px');
 txt.appendChild(document.createTextNode(sTxt));
 return txt;}

function getPth(gRoot,x,y,z,pnt,pntStroke,wStroke,sD){
 var pth=getSVG(gRoot,'path');
 getStyle(pth,pnt,pntStroke,wStroke);
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

function getGrd(id,pnt01,pnt02,nOpac01,nOpac02,dfs){
 var grd=getSVG(dfs,'linearGradient');
 grd.id=id;
 grd.setAttribute('x1','0');
 grd.setAttribute('x2','0');
 grd.setAttribute('y1','0');
 grd.setAttribute('y2','1');
 var stp=getSVG(grd,'stop');
 stp.setAttribute('offset','0%');
 stp.setAttribute('stop-color',pnt01);
 stp.setAttribute('stop-opacity',nOpac01);
 var stp=getSVG(grd,'stop');
 stp.setAttribute('offset','100%');
 stp.setAttribute('stop-color',pnt02);
 stp.setAttribute('stop-opacity',nOpac02);
 return grd;}

function getRad(id,nOffSet01,nOffSet02,pnt01,pnt02,nOpac01,nOpac02,dfs){
 var rad=getSVG(dfs,'radialGradient');
 rad.id=id;
 rad.setAttribute('cx','50%');
 rad.setAttribute('cy','50%');
 rad.setAttribute('r','50%');
 rad.setAttribute('fx','50%');
 rad.setAttribute('fy','50%');
 var stp=getSVG(rad,'stop');
 stp.setAttribute('offset',nOffSet01+'%');
 stp.setAttribute('stop-color',pnt01);
 stp.setAttribute('stop-opacity',nOpac01);
 var stp=getSVG(rad,'stop');
 stp.setAttribute('offset',nOffSet02+'%');
 stp.setAttribute('stop-color',pnt02);
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

function getGrid(nGrid,pnt){
 if(pnt===undefined) pnt="#c0c0c0";
 for(var i=0;i<W+1;i=i+nGrid) getLin(G_root,i,0,i,H,pnt,1);
 for(var i=0;i<H+1;i=i+nGrid) getLin(G_root,0,i,W,i,pnt,1);
}

function getPic(id,gRoot,x,y,w,h,aPicData,aFrameStyle,isOn,d){
 var g=getG(gRoot,x,y,1,isOn);
 if(id!='') g.id=id;
 g.w=w;
 g.h=h;
 if(aFrameStyle!==null){
  getRct(g,0,0,w,h,aFrameStyle[3],aFrameStyle[0],aFrameStyle[1],aFrameStyle[2]);
 }
 if(aPicData!==null){
  var zPic=aPicData[0];
  var pntFill=aPicData[1];
  var pntStroke=aPicData[2];
  var wStroke=aPicData[3];
  var pth=getPth(g,null,null,zPic,pntFill,pntStroke,wStroke,d);
  if(pth.x===null) pth.x=(pth.parentNode.w-pth.getBBox().width*pth.z)/2;
  if(pth.y===null) pth.y=(pth.parentNode.h-pth.getBBox().height*pth.z)/2;
  pth.setAttribute('transform','translate('+pth.x+','+pth.y+') scale('+pth.z+')');
 }
 return g;
}
