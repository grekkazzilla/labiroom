G.getPath=function(){
 this.aSquPath=new Array();
 this.aSquPath.push(this.squA);
 do{
  var squPath=this.aSquPath[this.aSquPath.length-1];
  var aSelect=new Array();
  for(var i in this.aNumPace){
   var posPace=squPath.pos+this.aNumPace[i];
   var squPace=this.aSqu[posPace];
   if(
   squPace.isBan===false &&
   squPace.nWave!==null &&
   squPath.nWave-squPace.nWave==1){
    aSelect.push(squPace);
   }
  }
  var min=0;
  var max=aSelect.length-1;
  var rnd=getRnd(min,max);
  var squSelect=aSelect[rnd]; 
  this.aSquPath.push(squSelect);
 }
 while(squPath.nWave>1);
 this.aSquPath.shift();
}

G.moveAlongPath=function(fnc){
 var unt=this.squA.unt;	
 this.appendChild(unt);
 jumpG(unt,this.squA.x,this.squA.y,true);
 unt.isAnm=true;
 this.anmAlongPath(unt,fnc);
}

G.anmAlongPath=function(unt,fnc){
 if(this.aSquPath.length>0){ 
  var squ=this.aSquPath.shift();
  unt.onAnmEnd=function(){
   $('G_LINES').anmAlongPath(this,fnc);
  }
  moveG(unt,squ.x,squ.y);
 }
 else{
  this.squB.unt=this.squA.unt;
  this.squA.unt=null;
  this.squB.appendChild(this.squB.unt);
  unt.isAnm=false;
  jumpG(this.squB.unt,0,0,true);
  fnc();
 }
}
