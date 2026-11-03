G.getWave=function(){
 this.squB.nWave=0;
 var nWave=1;
 var aSquWave=new Array();
 aSquWave.push(this.squB);
 var aSquPace=new Array();
 while(aSquWave.length>0){
  while(aSquWave.length>0){
   var squWave=aSquWave.pop();
   for(var i in this.aNumPace){
    var nPace=this.aNumPace[i];
    var posPace=squWave.pos+nPace;
    var squPace=this.aSqu[posPace];
    if(squPace==this.squA){
     this.squA.nWave=nWave;
     return true;
    }
    if(
    squPace.isBan===false &&
    squPace.nWave===null &&
    squPace.unt===null){
     squPace.nWave=nWave;
     aSquPace.push(squPace);
    }
   }
  }
  while(aSquPace.length>0){
   var squPace=aSquPace.pop();
   aSquWave.push(squPace);
  }
  nWave++;
 }
 return false;
}
