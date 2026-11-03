function run(){
 // ***** hide all
 hideG('gShirt');
 hideG('btnMoveBack');
 hideG('btnEnd');
 hideG('btnThink');
 if($('bxEnd').isOn===true) popBx('bxEnd');
 hideG(G_select);
 hideG(G_score);
 for(var i in A_unit) hideG(A_unit[i]);
 // ***** hide the cellar border and borders of all other empty playable spots
 var arr=[52,0,1,10,11,20,21,30,31];
 for(var i in arr) $$('rect',A_spot[arr[i]]).setAttribute('stroke-width',0);
 hideG(ARN);
 // ***** spin if not
 if(G_spin.isOn===false) spin();
 // ***** resetting play spots
 SPT_playA=null;
 SPT_playB=null;
 for(var i in A_spot){A_spot[i].aUnit=new Array();}
 // ***** clearing
 A_state=new Array();
 Othink.aChainMove=new Array();
 Othink.isExe=false;
 Othink.isFound=false;
 // ***** either new or saved
 DATA_state=getLocal('master_state','none');
 if(DATA_state=='none'){
  S_state='none';
  C_state=0;
  C_move_back=0;
  /* shuffle remade from php to js */
  A_shuffle_id=[];
  var arrSuit=Array('h','s','d','c');
  for(var j=0;j<4;j++){
   for(var i=2;i<15;i++) A_shuffle_id.push(arrSuit[j]+i);
  }
  shuffle(A_shuffle_id);
  G_spin.isOn=false;
  showG(ARN);
  showG('gShirt');
  anmLayOutNew(0,0,48);
  /*getAsync('shuffle.php','',function(){
   var asw=XHR.responseText.split('~');
   if(asw[0]=='shuffle_1'){
    var rsp=asw[1].split('^');
    for(var i in rsp){
     A_shuffle_id[i]=rsp[i];
    }
   }
   G_spin.isOn=false;
   showG(ARN);
   showG('gShirt');
   anmLayOutNew(0,0,48);
  });*/
 }
 else if(DATA_state!='none'){
  var row=DATA_state.split('~');
  S_state=row[0];
  // will be incremented back when the move is ended and the state is saved
  C_state=row[1]-1;
  C_move_back=row[2];
  G_spin.isOn=false;
  showG(ARN);
  putLayOutSaved();
 }
}
// *******************************************************************************************
function moveBack(){
 for(var i in A_spot) A_spot[i].aUnit=new Array();
 A_state.pop();
 var data=A_state.pop();
 var row=data.split('~');
 S_state=row[0];
 // will be incremented back when the move is ended and the state is saved
 C_state=row[1]-1;
 // one score down if moved back only once
 if(C_move_back==0){
  N_score--;
  //putScore();
  setLocal('master_score',N_score);
 }
 C_move_back++;
 // S_state & C_state have been defined on the moveBack button clicked
 putLayOutSaved();
}
// *******************************************************************************************
function anmLayOutNew(c,cPlay,cHome){
var unt=$(A_shuffle_id[c]);
// deploying cards at start
jumpG(unt,X_start,Y_start,true);
// if aces or not
if(unt.nValue==14){
 unt.x1=A_spot[cHome].x;
 unt.y1=A_spot[cHome].y;
 unt.spt=A_spot[cHome];
 cHome++;}
else{
 unt.x1=A_spot[cPlay].x;
 unt.y1=A_spot[cPlay].y;
 unt.spt=A_spot[cPlay];
 cPlay++;}
 unt.spt.aUnit.push(unt);
if(c<51){
 // each unit animation start setting (except the last)
 unt.isLast=false;}
else if(c==51){
 // last unit animation start setting
 hideG('gShirt');
 // define the last unit for all animation end setting
 unt.isLast=true;}
// execute animation
animate(unt,50,function(){
 // each unit animation end setting
 // -- nothing here -- 
 // all animation end setting
 if(unt.isLast===true){
  endLayOut();
 }});	
c++;
if(c<52) setTimeout('anmLayOutNew('+c+','+cPlay+','+cHome+')',10);
}
// *******************************************************************************************
function putLayOutSaved(){
var aSpotData=S_state.split(':');
for(var i in A_spot){
 var spt=A_spot[i];
 if(aSpotData[i]!='none'){
  var aUnitID=aSpotData[i].split('`');
  for(var j in aUnitID){
   var unt=$(aUnitID[j]);
   unt.spt=spt;
   ARN.appendChild(unt);
   jumpG(unt,spt.x*1+D*spt.aUnit.length*spt.p,spt.y,true);
   spt.aUnit.push(unt);
  }
 }
}
endLayOut();
} // *******************************************************************************************
function endLayOut(){
hideG('gShirt');
showG('btnMoveBack');
showG('btnEnd');
// show the cellar border and borders of all other empty playable spots
var arr=[52,0,1,10,11,20,21,30,31];
for(var i in arr) $$('rect',A_spot[arr[i]]).setAttribute('stroke-width',5);
// txt score
showG(G_score);
ARN.appendChild(G_score);
putScore();
G_score.onclick=function(){play(A_spot[52]);}
endMove();
} // *******************************************************************************************
function endMove(){
 // check if won it
 var nWon=Othink.ifWon(A_spot);
 if(nWon>0){
  IS_lock=true;
  setTimeout(function(){won(nWon);},200);
 }
 else{
  // save state
  var aStateData=new Array();
  for(var i in A_spot){
   var spt=A_spot[i];
   if(spt.aUnit.length==0){
    var sSpotData='none';}
   else{
    var aSpotID=new Array();
    for(var j in spt.aUnit){
     var unt=spt.aUnit[j];
     aSpotID.push(unt.id);}
    var sSpotData=aSpotID.join('`');}
    aStateData.push(sSpotData);}
  var sStateData=aStateData.join(':');
  C_state++;
  A_state.push(sStateData+'~'+C_state+'~'+C_move_back);
  setLocal('master_state',sStateData+'~'+C_state+'~'+C_move_back);
  // check state
  Othink.setSpot(A_spot);
  // moveback view
  if(A_state.length==1) var pnt='#909090';
  else var pnt='#c0c0c0';
  $$('rect','btnMoveBack').setAttribute('stroke',pnt);
  $$('path','btnMoveBack').setAttribute('stroke',pnt);
  // txt score view
  if(A_spot[52].aUnit==0){
   $$('rect',G_score).setAttribute('fill','transparent');
   $$('rect',G_score).setAttribute('stroke','none');
   $$('rect',G_score).setAttribute('stroke-width','0');
   var pnt='#c0c0c0';
  }
  else{
   $$('rect',G_score).setAttribute('fill','#fff');
   $$('rect',G_score).setAttribute('stroke','green');
   $$('rect',G_score).setAttribute('stroke-width','5');
   var pnt='#000';
   ARN.appendChild(G_score);
  }
  $$('path',G_score,0).setAttribute('fill',pnt);
  $$('path',G_score,1).setAttribute('fill',pnt);
  $$('path',G_score,2).setAttribute('fill',pnt);
  //
  if(Othink.isExe===true){
   IS_lock=true;
   setTimeout('Othink.exe()',100);
  }
  else if(
  A_spot[48].aUnit.length>1 &&
  A_spot[49].aUnit.length>1 &&
  A_spot[50].aUnit.length>1 &&
  A_spot[51].aUnit.length>1){
   Othink.run();
  }
  else IS_lock=false;
 }
} // *******************************************************************************************
function play(spt){
 if(IS_lock===false){
  if($('bxEnd').isOn===true) popBx(BX);
  //if($('btnMenuA').isOn===true){
   //hideG('btnMenuA');
   //showG('btnEnd');
  //}
  if(spt.isLock===false){ // if card selected is not locked (is playable)
   // SELECTING A
   if(
   SPT_playA===null &&       // if none selected before
   spt.ctg!='home' &&        // if central home not selected
   spt.aUnit.length>0){      // if holds cards as empty playable spots
    spt.aUnit[spt.aUnit.length-1].appendChild(G_select); // mark the selected card 
    showG(G_select);
    if($('btnThink').isOn===true){
     hideG('btnThink');
     showG('btnEnd');
    }
    SPT_playA=spt; // memorize globally the first selected card
   }
   // SELECTING B
   else if(SPT_playA!==null){
    var isGood=false; // check conditions and agree if met
    // empty playable spot
    if(spt.isEmptyPlayable===true && spt.aUnit.length==0){
     isGood=true;
    }
    // both spots with cards  
    else if(
    spt.ctg!='cellar' &&
    (
    spt.aUnit[spt.aUnit.length-1].sSuit==SPT_playA.aUnit[SPT_playA.aUnit.length-1].sSuit && // the suits of both the selected cards match
    (
    Math.abs(spt.aUnit[spt.aUnit.length-1].nValue-SPT_playA.aUnit[SPT_playA.aUnit.length-1].nValue)==1 || // the values of both the selected cards are one point different 
    Math.abs(spt.aUnit[spt.aUnit.length-1].nValue-SPT_playA.aUnit[SPT_playA.aUnit.length-1].nValue)==12 // kings and two-valued cards are one point different with aces
    ))){
     isGood=true;
    }
    else if(
    spt.ctg=='cellar' &&
    spt.aUnit.length==0
    ){
     isGood=true;
    }
    if(isGood===true){
     SPT_playB=spt; // if all matched then memorize the second selected card
     hideG(G_select); // remove the selection (the marking circle)
     if(Othink.isFound===true){hideG('btnEnd');showG('btnThink');}
     IS_lock=true;
     move(); // start transferring the selected cards by popping from array
    }
    else if(isGood===false){ // if matching failed
     var sptTemp=SPT_playA; // keep the first memorized card for a while locally
     SPT_playA=null; // forget the first memorized card globally
     hideG(G_select); // remove the selection (the marking circle)
     if(Othink.isFound===true){hideG('btnEnd');showG('btnThink');}
     if(spt!=sptTemp){
      play(spt); // if not one and the same card selected then select and mark a different card immediately
     }
    }
   }
  }
  else{ // clear & cancel all
   SPT_playA=null;
   SPT_playB=null;
   hideG(G_select);
   if(Othink.isFound===true){hideG('btnEnd');showG('btnThink');}
  }
 }
} // *******************************************************************************************
function move(){
// for a short reference
var sptA=SPT_playA;
var sptB=SPT_playB;
var nUnit=sptA.aUnit.length-1;
var unt=sptA.aUnit.pop();
// place the selected card above all while being moved
ARN.appendChild(unt);
// define the destination XY
unt.x1=sptB.x*1+D*sptB.aUnit.length*sptB.p;
unt.y1=sptB.y;
unt.spt=sptB;
sptB.aUnit.push(unt);
// define the last unit for all animation end setting
// animation is also interrupted if the movement target is the cellar (only one card can be transferred onto the cellar by rules)
if(nUnit==0 || sptB.ctg=='cellar') unt.isLast=true;
else unt.isLast=false;
// execute animation
animate(unt,50,function(){
 // all animation end setting
 if(this.isLast===true){
  // cancel onmouseover highlighting
  for(var i in SPT_playB.aUnit){
   $$('rect',SPT_playB.aUnit[i]).setAttribute('stroke','green');
   $$('rect',SPT_playB.aUnit[i]).setAttribute('stroke-width','0.75');}
  SPT_playA=null;
  SPT_playB=null;
  endMove();
 }
});
// animation keeps going if
// there are still cards to transfer and
// the target is not the cellar spot which
// can hold only one card by rules 
if(nUnit>0 && sptB.ctg!='cellar') setTimeout('move()',150);
} // *******************************************************************************************
function lost(nDown){
N_score-=nDown;
if(N_score<0) N_score=0;	
putScore();
setLocal('master_score',N_score);
setLocal('master_state','none');
setTimeout('run()',250);
} // *******************************************************************************************
