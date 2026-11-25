G.checkLine=function(squCheck){
 var aNumPace=[1,-1,11,-11,12,-12,10,-10];
 var aReturn=new Array();
  var arrLine=new Array();
  var pntCheck=squCheck.unt.pnt;
  var isSquCheckAdded=false;
  for(var j in aNumPace){
   var nPaceA=aNumPace[j];
   var nPaceB=aNumPace[j];
   do{
    var posLine=squCheck.pos+nPaceA;
    var squLine=this.aSqu[posLine];
    var isFound=false;
   if(
    squLine.isBan===false &&
    squLine.unt!==null &&
    squLine.unt.pnt==pntCheck){
     isFound=true;
     arrLine.push(squLine);
     nPaceA=nPaceA+nPaceB;
    }
   }
   while(isFound===true);
   if(
   nPaceB==-1 || nPaceB==-11 ||
   nPaceB==-12 || nPaceB==-10){
    if(arrLine.length>=4){
     for(var jj in arrLine){
      aReturn.push(arrLine[jj]);
     }
     if(isSquCheckAdded===false){
      aReturn.push(squCheck);
      isSquCheckAdded=true;
     }
    }
    arrLine=new Array();
   }
  }
 return aReturn;
}

G.anmZoomOut=function(arr,cnt,fnc){
 for(var i in arr){
  var squ=arr[i];
  var unt=squ.unt;
  var x=unt.x+squ.w*(1-cnt)/2;
  var y=unt.y+squ.h*(1-cnt)/2;
  unt.setAttribute('transform','translate('+x+','+y+') scale('+cnt+')');
 }
 cnt=cnt-0.05;
 if(cnt>0 && IS_reset===false){
  requestAnimationFrame(function(){
   $('G_LINES').anmZoomOut(arr,cnt,fnc);
  });
 }
 else{
  for(var i in arr){
   var squ=arr[i];
   var unt=squ.unt;
   unt.z=0;
   this.appendChild(unt);
   hideG(unt);
   squ.unt=null;
  }
  fnc();
 }
}
