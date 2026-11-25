// MAKE TOGGLE BUTTON AND ACTIONS (300x210)
function getToggle(root,x,y,w,h,fncDo,strLabel,xText,yText,strAnchor,id){
var tgl=getG(root,x,y,1,true);
getRct(tgl,0,0,w,h,0,'transparent','#c0c0c0',0);
var z=h/210;
var g=getG(tgl,0,0,z,true);
var pth=getPth(g,0,0,1,'transparent','#000',5,'M 110.0625 24 C 65.9625 24 30 60.3 30 105 C 30 149.7 65.9625 186 110.0625 186 L 188.0625 186 C 233.3625 186 270 149.7 270 105 C 270 60.3 233.3625 24 188.0625 24 L 110.0625 24 z');
pth.setAttribute('filter','url(#blr8)');
getPth(g,0,0,1,'#fff','none',0,'M 37.40625 0 C 16.69923 0 0 20.35021 0 45.65625 L 0 164.34375 C 0 189.64979 16.69923 210 37.40625 210 L 262.59375 210 C 283.30077 210 300 189.64979 300 164.34375 L 300 45.65625 C 300 20.35021 283.30077 0 262.59375 0 L 37.40625 0 z M 110.0625 24 L 188.0625 24 C 233.3625 24 270 60.3 270 105 C 270 149.7 233.3625 186 188.0625 186 L 110.0625 186 C 65.9625 186 30 149.7 30 105 C 30 60.3 65.9625 24 110.0625 24 z');
getCrl(g,115,105,65,'url(#grdSilver)','none',0);
getCrl(g,115,105,45,'url(#grdSilverRvs)','none',0);
getTxt(strLabel,tgl,xText,yText,'url(#grdSilver)',strAnchor); // 60 27 left usually
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


