var BX=null;

//////////////// BOX MENU ///////////////////

function getBox(dataXY,dataWH,dataBtn,r,dataPnt,isOn,gRoot,id){
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
  getRct(bx,0,0,wBx,hBx,r,'#808080','none',0).setAttribute('filter','url(#blr2)');
  getRct(bx,0,0,wBx,hBx,r,'#fff','none',0);}
 else getRct(bx,0,0,wBx,hBx,r,dataPnt[0],dataPnt[1],dataPnt[2]);
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

function getBoxBtnX(n,wBtn,mBtn){return mBtn+(wBtn+mBtn)*n;}
function getBoxBtnY(n,hBtn,mBtn){return mBtn+(hBtn+mBtn)*n;}
function getBoxBtnW(n,wBtn,mBtn){return wBtn*n+mBtn*(n-1);}
function getBoxBtnH(n,hBtn,mBtn){return hBtn*n+mBtn*(n-1);}

function popBx(arg){
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
