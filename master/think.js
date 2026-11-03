var Othink=new Object();
// *******************************************************************************************
Othink.run=function(){
 this.nodeUp(A_spot,-1);
}
// *******************************************************************************************
Othink.exe=function(){
 if(this.aChainMove.length>0){
  var aMove=this.aChainMove.shift();
  SPT_playA=A_spot[aMove[0]];
  SPT_playB=A_spot[aMove[1]];
  setTimeout('move()',200);
 }
 else{
  this.isExe=false;
  IS_lock=false;
 }
}
// *******************************************************************************************
Othink.nodeUp=function(aSpotToCopy,posToCopy){
 var oNode=new Object();
 oNode.aSpot=this.copySpot(aSpotToCopy);
 oNode.pos=posToCopy*1+1;
 if(oNode.pos>0){
  var aPos=this.oNodeCurr.aFoundMovePos;
  oNode.posSpotA=aPos[0];
  oNode.posSpotB=aPos[1];
  var arrA=oNode.aSpot[oNode.posSpotA].aUnit;
  var arrB=oNode.aSpot[oNode.posSpotB].aUnit;
  if(oNode.posSpotB==52){
   oNode.aSpot[oNode.posSpotB].aUnit.push(arrA.pop());
  }
  else{
   oNode.aSpot[oNode.posSpotB].aUnit=arrB.concat(arrA.splice(0,arrA.length).reverse());
  }
  this.setSpot(oNode.aSpot);
  if(this.ifWon(oNode.aSpot)>0){
   showG('btnThink');
   hideG('btnEnd');
   this.isFound=true;
   IS_lock=false;
  }
  else if($('btnThink').isOn===true){
   hideG('btnThink');
   showG('btnEnd');
   this.isFound=false;
   IS_lock=false;
  }
  else IS_lock=false;
  oNode.oRoot=this.oNodeCurr;
 }
 else IS_lock=false;
 this.oNodeCurr=oNode;
 oNode.dataSpot=this.getDataBySpot(oNode.aSpot);
 oNode.aFoundMovePos=this.findMove(oNode.aSpot);
 if(oNode.aFoundMovePos.length>0){
  this.nodeUp(oNode.aSpot,oNode.pos);
 }
 else if(oNode.pos>0){
  this.aChainMove=new Array();
  this.chainMove(oNode);
 }
}
// *******************************************************************************************
Othink.chainMove=function(oNode){
 this.aChainMove.push([oNode.posSpotA,oNode.posSpotB]);
 if(oNode.pos>1){
  this.chainMove(oNode.oRoot);
 }
 else{
  this.aChainMove.reverse();
 }
}
// *******************************************************************************************
Othink.findMove=function(aSpot){
 var aFoundMovePos=new Array();
 var aSpotPlay=new Array();
 for(var i in aSpot){
  var sptA=aSpot[i]; 
  if(this.ifPlaySpotA(sptA)===true){
   aSpotPlay.push(sptA);
   var posB=undefined;
   if(this.ifPlaySpotB(sptA,aSpot[48])===true) posB=48;
   else if(this.ifPlaySpotB(sptA,aSpot[49])===true) posB=49;
   else if(this.ifPlaySpotB(sptA,aSpot[50])===true) posB=50;
   else if(this.ifPlaySpotB(sptA,aSpot[51])===true) posB=51;
   if(posB!==undefined){
    var sptB=aSpot[posB];
    aFoundMovePos.push(sptA.pos);
    aFoundMovePos.push(sptB.pos);
    return aFoundMovePos;
   }
  }
 }

 for(var i in aSpotPlay){
  var sptA=aSpotPlay[i];
  sptA.aUnit.reverse();
  if(
  this.ifPlaySpotB(sptA,aSpot[48])===true ||
  this.ifPlaySpotB(sptA,aSpot[49])===true ||
  this.ifPlaySpotB(sptA,aSpot[50])===true ||
  this.ifPlaySpotB(sptA,aSpot[51])===true){
   sptA.aUnit.reverse();
   for(var j in aSpot){
    var sptB=aSpot[j];
    if(this.ifPlaySpotB(sptA,sptB)===true){
     aFoundMovePos.push(sptA.pos);
     aFoundMovePos.push(sptB.pos);
     return aFoundMovePos;
    }
   }
  }
  sptA.aUnit.reverse();
 }

 for(var i in aSpotPlay){
  var sptA=aSpotPlay[i];
  if(sptA.nLockOn!==undefined){
   var sptLocked=aSpot[sptA.nLockOn]
   if(
   this.ifPlaySpotB(sptLocked,aSpot[48])===true ||
   this.ifPlaySpotB(sptLocked,aSpot[49])===true ||
   this.ifPlaySpotB(sptLocked,aSpot[50])===true ||
   this.ifPlaySpotB(sptLocked,aSpot[51])===true){
    for(var j in aSpot){
     var sptB=aSpot[j];
     if(this.ifPlaySpotB(sptA,sptB)===true){
      aFoundMovePos.push(sptA.pos);
      aFoundMovePos.push(sptB.pos);
      return aFoundMovePos;
     }
    }
   }
  }
 }

 return aFoundMovePos;
}
// *******************************************************************************************
Othink.copySpot=function(aSpot){
 var arr=new Array();
 for(var i in aSpot){
  var spt=new Object();
  spt.pos=aSpot[i].pos;
  spt.ctg=aSpot[i].ctg;
  spt.isEmptyPlayable=aSpot[i].isEmptyPlayable;
  spt.isStartable=aSpot[i].isStartable;
  spt.nLockOn=aSpot[i].nLockOn;
  spt.nLockedBy=aSpot[i].nLockedBy;
  spt.isLock=aSpot[i].isLock;
  spt.aUnit=new Array();
  for(var j in aSpot[i].aUnit){
   var unt=new Object();
   unt.id=aSpot[i].aUnit[j].id;
   unt.sSuit=aSpot[i].aUnit[j].sSuit;
   unt.nValue=aSpot[i].aUnit[j].nValue;
   spt.aUnit.push(unt);
  }
  arr.push(spt);
 }
 return arr;
}
// *******************************************************************************************
// *******************************************************************************************
// *******************************************************************************************

Othink.start=function(){
 this.aSpotData=[];
 this.nodeUp(A_spot,-1);
}
// *******************************************************************************************
Othink.getDataBySpot=function(aSpot){
 var aData=new Array();
 for(var i in aSpot){
  var spt=aSpot[i];
  if(spt.aUnit.length>0){
   var aStr=new Array();
   for(var j in spt.aUnit){
    var unt=spt.aUnit[j];
    aStr.push(unt.id);   
   }
   aData.push(aStr.join('`'));
  }
  else{
   aData.push('none');
  }
 }
 var dataSpot=aData.join('~');
 return dataSpot;
}
// *******************************************************************************************
Othink.ifPlaySpotA=function(spt){
 if(
 spt.isLock===false &&
 spt.ctg!='home' &&
 spt.aUnit.length>0
 ){
  return true;
 }
 else{
  return false;
 }
}
// *******************************************************************************************
Othink.ifPlaySpotB=function(sptA,sptB){
 if(sptB.isLock===false){
  // check conditions and agree if met
  var isGood=false; 
  // empty playable spot
  if(
  sptB.isEmptyPlayable===true &&
  sptB.aUnit.length==0
  ){
   isGood=true;
  }
  // both spots with cards  
  else if(
  sptB.ctg!='cellar' &&
  (
  // the suits of both the selected cards match
  getLastU(sptA).sSuit==getLastU(sptB).sSuit &&
  (
  // the values of both the selected cards are one point different
  Math.abs(getLastU(sptA).nValue-getLastU(sptB).nValue)==1 ||
  // or twelve points different between two and aces
  Math.abs(getLastU(sptA).nValue-getLastU(sptB).nValue)==12
  ))){
   isGood=true;
  }
  else if(
  sptB.ctg=='cellar' &&
  sptB.aUnit.length==0
  ){
   isGood=true;
  }
  return isGood;
 }
 else return false;
}
// *******************************************************************************************
function getLastU(spt){
 if(spt.aUnit.length>0){
  return spt.aUnit[spt.aUnit.length-1];
 }
 else return 0;
}
// *******************************************************************************************
Othink.setSpot=function(aSpot){
 for(var i in aSpot){
  var spt=aSpot[i];
  if(spt.ctg=='home'){spt.isLock=false;}
  else if(spt.ctg=='cellar'){
   // check the cellar spot and 
   // lock it if the cellar is not empty and
   // both its walls are still there
   if(
   aSpot[52].aUnit.length>0 &&
   aSpot[40].aUnit.length>0 &&
   aSpot[41].aUnit.length>0){
    aSpot[52].isLock=true;
   }
   else{
    aSpot[52].isLock=false;
   }
  }
  else{
   spt.isLock=true;
   if(
   spt.aUnit.length>0 &&
   (
   spt.isStartable===true ||
   aSpot[spt.nLockedBy].aUnit.length==0
   )
   ){
    spt.isLock=false
   }
   else if(
   spt.isEmptyPlayable===true &&
   aSpot[spt.nLockedBy].aUnit.length==0){
    spt.isLock=false;
   }
  }
 }
}
// *******************************************************************************************
Othink.ifWon=function(aSpot){
 if(
 aSpot[48].aUnit.length==13 &&
 aSpot[49].aUnit.length==13 &&
 aSpot[50].aUnit.length==13 &&
 aSpot[51].aUnit.length==13){
  var sum=aSpot[48].aUnit[1].nValue*1+aSpot[49].aUnit[1].nValue*1+aSpot[50].aUnit[1].nValue*1+aSpot[51].aUnit[1].nValue*1;
  if(sum==2*4 || sum==13*4) return 2;
  else return 1;
 }
 else return 0;
}
// *******************************************************************************************
