function getBtn(gRoot,x,y,w,h,ctg,dataPic,go,dTxt,isOn,id){
var btn=getG(gRoot,x,y,1,isOn);
if(id!==undefined) btn.id=id;
btn.w=w,btn.h=h;
getRct(btn,0,0,w,h,25,'transparent','none',0);
getRct(btn,10,10,w-20,h-20,20,'transparent','none',5);
if(dataPic!==null){
 for(var i=0;i<dataPic.length;i++){
  var e=dataPic[i];
  var s=e[0],z=e[1],x=null,y=null;
  if(e[2]!==null){
   x=e[2][0];
   y=e[2][1];}
  var pth=getPth(btn,x,y,z,'red','none',25,s);
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
 btn.aOn=new Array();
 if(ctg.charAt(0)=='a'){
  $$('rect',btn,0).setAttribute('fill','url(#grdBtn)');
  btn.aOn.push(['rect',0,'fill','url(#grdBtn)','#bdb76d'])
  if(ctg.charAt(1)=='b'){
   $$('rect',btn,1).setAttribute('stroke','url(#grdBtnRvs)');
   btn.aOn.push(['rect',1,'stroke','url(#grdBtnRvs)','#fff'])
  }
  var aPth=btn.getElementsByTagName('path');
  for(var i=0;i<aPth.length;i++){
   if(ctg.charAt(2)=='a'){ 
    aPth[i].setAttribute('fill','url(#grdPale)');
    btn.aOn.push(['path',i,'fill','url(#grdPale)','#fff'])
   }
   if(ctg.charAt(2)=='b'){ 
    aPth[i].setAttribute('fill','url(#grdPic)');
    btn.aOn.push(['path',i,'fill','url(#grdPic)','#fff'])
   } 
   if(ctg.charAt(2)=='c'){ 
    aPth[i].setAttribute('fill','transparent');
    aPth[i].setAttribute('stroke','url(#grdPale)');
    btn.aOn.push(['path',i,'stroke','url(#grdPale)','#fff'])
   }
  }
  var aTxt=btn.getElementsByTagName('text');
  for(var i=0;i<aTxt.length;i++){
   if(ctg.charAt(3)=='a'){ 
    aTxt[i].setAttribute('fill','url(#grdPale)');
    btn.aOn.push(['text',i,'fill','url(#grdPale)','#fff'])
   }
   if(ctg.charAt(3)=='b'){ 
    aTxt[i].setAttribute('fill','url(#grdPic)');
    btn.aOn.push(['text',i,'fill','url(#grdPic)','#fff'])
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
