// ****************************************************
// ****************** TIME CONTROL ********************
// ****************************************************
var SEC_time=getLocal('chess_time','900')*1;
var SEC_time_left=getLocal('chess_time_left','900')*1;
var btn=getBtn(G_CHESS,140,550,120,40,'abxb',null,function(){
 popBx('bxTime');
},[['0000',null],null,'middle'],true,'btnTime');
var bx=getBox(null,null,[40,40,7,3,10],10,null,false,G_CHESS,'bxTime');
var dataPic='M 103.20898 0.001953125 A 13.922862 13.922862 0 1 0 103.20898 27.84375 L 158.89453 27.84375 A 13.922862 13.922862 0 1 0 158.89453 0.001953125 L 103.20898 0.001953125 z M 131.05273 37.896484 C 58.784409 37.896484 1.8947806e-14 96.678927 0 168.94727 C 0 241.21559 58.784409 300 131.05273 300 C 203.32106 300 262.10352 241.21559 262.10352 168.94727 C 262.10352 96.678927 203.32106 37.896484 131.05273 37.896484 z M 131.05273 56.457031 C 193.28944 56.457031 243.54297 106.71055 243.54297 168.94727 C 243.54297 231.18396 193.28944 281.4375 131.05273 281.4375 C 68.816034 281.4375 18.5625 231.18396 18.5625 168.94727 C 18.5625 106.71055 68.816034 56.457031 131.05273 56.457031 z M 132.34375 68.480469 C 93.172409 68.103382 55.485088 90.752393 38.902344 128.73242 C 16.792016 179.37247 40.176356 239.0049 90.816406 261.11523 C 141.45645 283.22555 201.09084 259.84122 223.20117 209.20117 C 245.31149 158.56113 221.92325 98.928689 171.2832 76.818359 C 158.6232 71.290778 145.40086 68.606161 132.34375 68.480469 z M 131.60742 114.73047 C 138.64337 114.83636 145.80078 116.32885 152.71484 119.34766 C 180.37107 131.42284 192.74704 162.97463 180.67188 190.63086 C 168.59667 218.28709 137.04101 230.66308 109.38477 218.58789 C 81.728542 206.5127 69.354493 174.95701 81.429688 147.30078 C 90.486076 126.55861 110.49956 114.41279 131.60742 114.73047 z M 131.05273 129.75195 C 109.51593 129.75195 91.855469 147.41045 91.855469 168.94727 C 91.855469 190.48407 109.51593 208.14258 131.05273 208.14258 C 152.58954 208.14258 170.24609 190.48406 170.24609 168.94727 C 170.24609 147.41045 152.58954 129.75195 131.05273 129.75195 z M 131.05273 148.31445 C 142.55791 148.31445 151.68359 157.44209 151.68359 168.94727 C 151.68359 180.45245 142.55791 189.58008 131.05273 189.58008 C 119.54755 189.58008 110.41797 180.45244 110.41797 168.94727 C 110.41797 157.44208 119.54755 148.31445 131.05273 148.31445 z';
getPic('',bx,15,15,60,60,[0.2,'url(#grdBtn)','none',0],['transparent','#c0c0c0',0,5],true,dataPic);
getTxt('Time Control:',bx,bx.w/2,45,'url(#grdBtn)','middle');
var arr=new Array(3,4,5,6,7,8,9,10,11,12,13,14,15,20,25,30,45,60,90,120);
for(var i in arr) arr[i]*=60;
var sld=getSlider(bx,bx.x0,90,bx.w-17,50,'#fff',arr,function(){
 setTime(this.val,true);
},true,'sldTime');

getBtn(bx,bx.w-59,25,40,40,'abcx',[[dataPicCross,0.07,null]],function(){
 popBx('bxTime');
},null,true,'btnTimeOk');



function setTime(secTime,isSave){
 $$('text','btnTime').firstChild.nodeValue=(secTime/60)+' min';
 if(isSave===true){
  SEC_time=secTime;
  SEC_time_left=secTime;
  setLocal('chess_time',SEC_time);
  setLocal('chess_time_left',SEC_time_left);
 } 
 else{
  setSlider($('sldTime'),secTime,null);
 }	
}

setTime(SEC_time,false);

// ****************************************************
// ****************** CLOCK TIMER *********************
// ****************************************************

function getTimer(gRoot,xBox,yBox,wBox,hBox,isShown){
 var box=getG(gRoot,xBox,yBox,1,isShown);
 box.w=wBox;
 box.h=hBox;
 var dY=6;
 getRct(box,0,0,wBox,hBox,10,'transparent','url(#grdBtn)',0);
 getCrl(box,wBox/2,hBox/2+dY,28,'transparent','url(#grdBtn)',5);
 getCrl(box,wBox/2,hBox/2+dY,5,'transparent','url(#grdBtn)',5);
 box.pthPush=getPth(box,wBox/2-5,7,1,'transparent','#eee8aa',5,'M 0 0 h 10');
 box.pthFace=getPth(box,wBox/2,hBox/2+dY,1,'transparent','url(#grdBtn)',14,'');
 box.pthFace.setAttribute('stroke-linecap','corner');
 box.set=function(nStart){
  var dataArc=getArc(0,0,16.5,nStart,360)+'M 0 25';
  this.pthFace.setAttribute('d',dataArc);
 }
 box.anm=function(deg,fnc){
  if(deg!==null){
   this.deg=deg;
   this.fnc=fnc;
  }
  this.deg-=5;
  if(this.deg>1){
   this.set(this.deg);
   requestAnimationFrame(function(){
    box.anm(null);
   });
  }
  else if(this.deg<=1){
   this.deg=1;
   this.set(this.deg);
   if(this.fnc!==null) this.fnc();
  }
 }
 return box;
}

var BX_timer=getTimer(G_CHESS,W/2-80/2,H-80-5,80,80,false);
