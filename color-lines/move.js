function moveG(unt,x,y){
 unt.xMove=x;
 unt.yMove=y;
 if(unt.x==unt.xMove) unt.k=0;
 else unt.k=(unt.y-unt.yMove)/(unt.x-unt.xMove);
 unt.b=unt.y-unt.k*unt.x;
 unt.dx=(unt.xMove-unt.x)/Math.abs(unt.xMove-unt.x);
 unt.dy=(unt.yMove-unt.y)/Math.abs(unt.yMove-unt.y);
 unt.isAnm=true;
 if(Math.abs(unt.xMove-unt.x)>=Math.abs(unt.yMove-unt.y)) moveX(unt);
 else moveY(unt);
}

function moveX(unt){
 unt.x=unt.x+9*unt.dx;
 unt.y=unt.k*unt.x+unt.b;
 if((unt.x<unt.xMove && unt.dx<0)||(unt.x>unt.xMove && unt.dx>0)){
  endMove(unt);
 }
 else if(IS_reset===false){
  unt.setAttribute('transform','translate('+unt.x+' '+unt.y+')');
  requestAnimationFrame(function(){
   moveX(unt);
  });
 }
}

function moveY(unt){
 unt.y=unt.y+9*unt.dy;
 if(unt.k!=0) unt.x=(unt.y-unt.b)/unt.k;
 else unt.x=unt.x;
 if((unt.y<unt.yMove && unt.dy<0) || (unt.y>unt.yMove && unt.dy>0)){
  endMove(unt);
 }
 else if(IS_reset===false){
  unt.setAttribute('transform','translate('+unt.x+' '+unt.y+')');
  requestAnimationFrame(function(){
   moveY(unt);
  });
 }
}

function endMove(unt){
 unt.x=unt.xMove;
 unt.y=unt.yMove;
 unt.setAttribute('transform','translate('+unt.x+' '+unt.y+')');
 unt.isAnm=false;
 unt.onAnmEnd(this);
}

function parabola_move(gElem,nFactor,xCurr,nSpeed,xEnd,fncBack,isTest,rot){
 var xDif=gElem.x-xCurr;
 var yDif=gElem.y-nFactor*xCurr*xCurr;
 if(xCurr>xEnd) nSpeed*=-1;
 var dst=Math.abs(xEnd-xCurr);
 var qtyStep=dst/Math.abs(nSpeed);
 var spdR=360*rot/qtyStep;
 gElem.r=0;
 gElem.w=gElem.getBBox().width;
 gElem.h=gElem.getBBox().height;
 if(isTest===false) parabola_anm(gElem,nFactor,xCurr,xDif,yDif,nSpeed,xEnd,fncBack,spdR);
 else{
  while(
  (nSpeed<0 && xCurr>xEnd) ||
  (nSpeed>0 && xCurr<xEnd)){
   var yCurr=nFactor*xCurr*xCurr;
   getCrl(gElem.parentNode,xDif+xCurr,yDif+yCurr,3,'green','none',0);
   xCurr+=nSpeed;
  }
 }
}

function parabola_anm(gElem,nFactor,xCurr,xDif,yDif,nSpeed,xEnd,fncBack,spdR){
 var yCurr=nFactor*xCurr*xCurr;
 gElem.setAttribute('transform',
  'translate('+(xDif+xCurr)+','+(yDif+yCurr)+') rotate('+gElem.r+','+gElem.w/2+','+gElem.h/2+')');
 xCurr+=nSpeed;
 gElem.r+=spdR;
 if(
 (nSpeed<0 && xCurr>xEnd) ||
 (nSpeed>0 && xCurr<xEnd)){
  requestAnimationFrame(function(){
   parabola_anm(gElem,nFactor,xCurr,xDif,yDif,nSpeed,xEnd,fncBack,spdR);
  });
 }
 else{
  gElem.x=xDif+xCurr;
  gElem.y=yDif+yCurr;
  fncBack();
 }
}

