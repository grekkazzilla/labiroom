G.won_start=function(){
 IS_lock=true;
 // clear history
 DATA_state='';
 setLocal('lines_state',DATA_state);
 // show victory hand
 var pic=$('picVictory');
 showG(pic);
 pic.anim(0,pic);
 //
 hideG('gGrid');
 hideG(this.gScore);
 hideG(this.gCent);
 for(var i in this.aUnit){
  var unt=this.aUnit[i];
  if(unt.isOn===true) hideG(unt);
 }
 this.clearBoard(true);
 // APPLE JUMPING ON SNAIL
 jumpG(this.gSnail,280,null,true);
 var xStart=35;
 var nFactor=0.2;
 var xEnd=-32.5;
 var nSpeed=0.5;
 parabola_move(this.gApple,nFactor,xStart,nSpeed,xEnd,function(){
  var dv=$('G_LINES');
  attachG(dv.gSnail,dv.gApple);
  dv.won_snail_around(dv.gSnail.z,function(){
   var dv=$('G_LINES');
   dv.won_snail_runaway(dv.gSnail.x,function(){
    IS_lock=false;
   });
  });
  showG('picWonIt');
 },false,-1.01);
 // RAINBOW
 var arr=new Array();
 var aPnt=['red','yellow','green','blue'];
 for(var i=0;i<4;i++){
  var arc=getArc(200,400,320-i*20,-60,60);
  var pth=getPth(this,0,0,1,'transparent',aPnt[i],0,arc);
  pth.setAttribute('opacity',0);
  arr.push(pth);
 }
 this.won_rainbow_anm(arr,0,0);
 // GRASS
 var x=-50;
 var arr=new Array();
 while(x<450){
  var pth=getPth(this,x,585,1,'transparent','url(#grdGreen)',2,'');
  var rCurr=-100;
  pth.rEnd=getRnd(-35,-45);
  arr.push(pth);
  x+=5;
 }
 this.won_grass_anm(arr,rCurr);
}

G.won_snail_around=function(z,fncBack){
 z-=0.1;
 zoomG(this.gSnail,[z,null]);
 if(z>-1){
  requestAnimationFrame(function(){
   $('G_LINES').won_snail_around(z,fncBack);
  });
 }	
 else{
  zoomG(this.gSnail,[-1,null],true);
  fncBack();
 }
}

G.won_snail_runaway=function(x,fncBack){
 x-=2;
 jumpG(this.gSnail,x,null);
 if(x>-100) requestAnimationFrame(function(){
  $('G_LINES').won_snail_runaway(x,fncBack);
 });
 else{
  fncBack();
 }
}

G.won_rainbow_anm=function(arr,nWid,nOpac){
 for(var i in arr){
  arr[i].setAttribute('stroke-width',nWid);
  arr[i].setAttribute('opacity',nOpac);
 }
 nWid+=0.1;
 nOpac+=0.0025;
 if(nWid<=18) requestAnimationFrame(function(){
  $('G_LINES').won_rainbow_anm(arr,nWid,nOpac);
 });
}

G.won_grass_anm=function(arr,rCurr){
 rCurr+=1;
 for(var i in arr){
  var pth=arr[i];
  if(rCurr<pth.rEnd) pth.setAttribute('d',getArc(0,0,40,-100,rCurr));
 }
 if(rCurr<-35) requestAnimationFrame(function(){
  $('G_LINES').won_grass_anm(arr,rCurr);
 });
}
