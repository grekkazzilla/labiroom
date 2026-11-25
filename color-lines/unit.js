G.aUnit=new Array();
G.aUnitNew=new Array();

G.getNewAndZoomIn=function(fnc){
 this.aUnitNew=new Array();
 var min=0;
 var max=this.bufPaint.length-1;
 //var max=this.bufPaint.length-6;
 var m=1;
 var w=44.444444;
 var q=3;
 var x=W/2-(w*q+m*(q-1))/2;
 var y=8;
 for(var i=0;i<q;i++){
  var rnd=getRnd(min,max);
  var pnt=this.bufPaint[rnd];
  //*** GET NEW UNIT ***//
  var r=16;
  var isFound=false;
  for(var j in this.aUnit){
   var unt=this.aUnit[j];
   if(unt.pnt==pnt && unt.isOn===false){
    isFound=true;
    break;
   }
  }
  if(isFound===false){
   var unt=getG(this,0,0,0,true);
   unt.pnt=pnt;
   unt.w=r*2;
   unt.h=r*2;
   getCrl(unt,w/2,w/2,r,'url(#radLines'+pnt+')','none',0);
   this.aUnit.push(unt);
  }
  ////////////////////////
  unt.x=x;
  unt.y=y;
  showG(unt);
  this.aUnitNew.push(unt);
  x=x+w+m;
 }
 this.anmZoomIn(0,fnc);
}

G.anmZoomIn=function(cntZ,fnc){
 for(var i in this.aUnitNew){
  var unt=this.aUnitNew[i];
  var x=unt.x+unt.w*(1-cntZ)/2;
  var y=unt.y+unt.h*(1-cntZ)/2;
  unt.setAttribute('transform','translate('+x+','+y+') scale('+cntZ+')');
 }
 cntZ=cntZ+0.05;
 if(cntZ<=1 && IS_reset===false){
  requestAnimationFrame(function(){
   $('G_LINES').anmZoomIn(cntZ,fnc);
  });
 }
 else{
  for(var i in this.aUnitNew){
   var unt=this.aUnitNew[i];
   unt.z=1;
   jumpG(unt,unt.x,unt.y);
  }
  fnc();
 }
}

G.moveNewToBoard=function(fnc){
 var min=0;
 var max=this.aPosOpen.length-1;
 for(var i=0;i<3;i++){
  var unt=this.aUnitNew[i];
  do{
   var rnd=getRnd(min,max);
   var pos=this.aPosOpen[rnd];
   var squ=this.aSqu[pos];
  }
  while(squ.unt!==null);
  squ.unt=unt;
  unt.squ=squ;
  unt.onAnmEnd=function(){
   var squ=this.squ;
   jumpG(this,0,0,true);
   squ.appendChild(this);
   var isAnm=false;
   for(var i in $('G_LINES').aUnitNew){
    var unt=$('G_LINES').aUnitNew[i];
    if(unt.isAnm===true) isAnm=true;
   }
   if(isAnm===false) fnc();
  }
  moveG(unt,squ.x,squ.y);
 }
}

G.clearUnit=function(){
 for(var i in this.aUnit){
  var unt=this.aUnit[i];
  this.appendChild(unt);
  unt.x=0;
  unt.y=0;
  unt.z=0;
  unt.squ=null;
  unt.xAnm=null;
  unt.yAnm=null;
  unt.isAnm=false;
  hideG(unt);
 }
}
