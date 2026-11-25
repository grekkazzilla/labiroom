function getBtn(gRoot,x,y,w,h,ctg,dIcn,go,dTxt,isOn,id){
var btn=getG(gRoot,x,y,1,isOn);
if(id!==undefined) btn.id=id;
btn.w=w,btn.h=h;
getRct(btn,0,0,w,h,6,'transparent','none',1);
getRct(btn,3,3,w-6,h-6,5,'transparent','none',1);
if(dIcn!==null){
 for(var i=0;i<dIcn.length;i++){
  var e=dIcn[i];
  var s=e[0],z=e[1],x=null,y=null;
  if(e[2]!==null){
   x=e[2][0];
   y=e[2][1];}
  var pth=getPth(btn,x,y,z,'transparent','none',20,s);
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
 getTxt(sA,btn,xA,yA,'transparent',sPos);
 if(dTxt[1]!==null){
  var sB=dTxt[1][0],xB=0,yB=0;
  if(dTxt[1][1]==null || dTxt[1][1][0]==null) xB=w/2;
  else xB=dTxt[1][1][0];
  if(dTxt[1][1]==null || dTxt[1][1][1]==null) yB=2*h/2.8;
  else yB=dTxt[1][1][1];
  getTxt(sB,btn,xB,yB,'transparent',sPos);}}
btn.go=go;
btn.onclick=function(){pushBtn(this);}
setBtn(btn,ctg);
btn.style.cursor='pointer';
return btn;}

function setBtn(btn,ctg){
if(ctg=='a'){
 var pnt='url(#grdBtn)',pntStroke='url(#grdBtn)',pntFrame='url(#grdBtnRvs)',pntIcn='url(#grdPale)',pntIcnStroke='none',pntTxt='url(#grdPic)';
 btn.aOn=new Array(['rect',0,'fill','url(#grdBtn)','#bdb76d'],['rect',1,'stroke','url(#grdBtnRvs)','#fff']);
 for(var i=0;i<btn.getElementsByTagName('path').length;i++) btn.aOn.push(['path',i,'fill','url(#grdPale)','#fff']);
 for(var i=0;i<btn.getElementsByTagName('text').length;i++) btn.aOn.push(['text',i,'fill','url(#grdPic)','#fff']);}
else if(ctg=='b'){
 var pnt='url(#grdBtn)',pntStroke='none',pntFrame='url(#grdBtnRvs)',pntIcn='transparent',pntIcnStroke='url(#grdPale)',pntTxt='url(#grdPale)';
 btn.aOn=new Array(['rect',0,'fill','url(#grdBtn)','#bdb76d'],['rect',1,'stroke','url(#grdBtnRvs)','#fff']);
 for(var i=0;i<btn.getElementsByTagName('path').length;i++) btn.aOn.push(['path',i,'stroke','url(#grdPale)','#fff']);
 for(var i=0;i<btn.getElementsByTagName('text').length;i++) btn.aOn.push(['text',i,'fill','url(#grdPale)','#fff']);}
else if(ctg=='g'){
 var pnt='url(#grdPic)',pntStroke='none',pntFrame='url(#grdPicRvs)',pntIcn='#fff',pntIcnStroke='none',pntTxt='url(#grdPale)';
 btn.aOn=new Array(['rect',0,'fill','url(#grdPic)','#000'],['rect',1,'stroke','url(#grdPicRvs)','#fff']);
 for(var i=0;i<btn.getElementsByTagName('path').length;i++) btn.aOn.push(['path',i,'fill','url(#grdPale)','#fff']);
 for(var i=0;i<btn.getElementsByTagName('text').length;i++) btn.aOn.push(['text',i,'fill','url(#grdPale)','#fff']);}
var aRct=btn.getElementsByTagName('rect');
aRct[0].setAttribute('fill',pnt);
aRct[0].setAttribute('stroke',pntStroke);
aRct[1].setAttribute('stroke',pntFrame);
var aPth=btn.getElementsByTagName('path');
for(var i=0;i<aPth.length;i++){
 aPth[i].setAttribute('fill',pntIcn);
 aPth[i].setAttribute('stroke',pntIcnStroke);}
var aTxt=btn.getElementsByTagName('text');
for(var i=0;i<aTxt.length;i++) aTxt[i].setAttribute('fill',pntTxt);
}

function pushBtn(btn){
 if(IS_lock===false || btn.isLockIgnored===true){
  IS_lock=true;
  onBtn(btn,1);
  setTimeout(function(){
   onBtn(btn,0);
   btn.go();
   if(btn.isToKeepLocked===true) IS_lock=true;
   else IS_lock=false;
  },200);
 }
}

function onBtn(btn,a){ // a: 0 - released button (off/out) look, 1 - pushed button (on) look
if(btn.aOn){
 for(var i=0;i<btn.aOn.length;i++){
  var arr=btn.aOn[i];
  for(var j=0;j<arr.length;j++){
   btn.getElementsByTagName(arr[0])[arr[1]].setAttribute(arr[2],arr[a*1+3]);}}}}


