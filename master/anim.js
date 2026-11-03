function animate(unt,nSpeed,fAnimEnd){
if(unt.x==unt.x1) unt.k=0;
else unt.k=(unt.y-unt.y1)/(unt.x-unt.x1);
unt.b=unt.y-unt.k*unt.x;
unt.dx=(unt.x1-unt.x)/Math.abs(unt.x1-unt.x);
unt.dy=(unt.y1-unt.y)/Math.abs(unt.y1-unt.y);
if(Math.abs(unt.x1-unt.x)>=Math.abs(unt.y1-unt.y)) unt.isMoveX=true;
else unt.isMoveX=false;
unt.nSpeed=nSpeed;
unt.onAnimEnd=fAnimEnd;
exeAnim(unt);
} // *******************************************************************************************
function exeAnim(unt){
if(unt.isMoveX===true){
 unt.x=unt.x+unt.nSpeed*unt.dx;
 unt.y=unt.k*unt.x+unt.b;
 if((unt.x<unt.x1 && unt.dx<0)||(unt.x>unt.x1 && unt.dx>0)){
  unt.x=unt.x1;
  unt.y=unt.y1;
  unt.setAttribute('transform','translate('+unt.x+' '+unt.y+')');
  unt.onAnimEnd();}
 else{
  unt.setAttribute('transform','translate('+unt.x+' '+unt.y+')');
  requestAnimationFrame(function(){exeAnim(unt);});}}
else if(unt.isMoveX===false){
 unt.y=unt.y+unt.nSpeed*unt.dy;
 if(unt.k!=0) unt.x=(unt.y-unt.b)/unt.k;
 else unt.x=unt.x;
 if((unt.y<unt.y1 && unt.dy<0) || (unt.y>unt.y1 && unt.dy>0)){
  unt.x=unt.x1;
  unt.y=unt.y1;
  unt.setAttribute('transform','translate('+unt.x+' '+unt.y+')');
  unt.onAnimEnd();}
 else{
  unt.setAttribute('transform','translate('+unt.x+' '+unt.y+')');
  requestAnimationFrame(function(){exeAnim(unt);});}}
}
