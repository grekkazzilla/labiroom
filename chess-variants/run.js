G_CHESS.start=function(isSaved){
 var col=this.sFen.split(' ');
 if(col[1]=='w') this.isTurn=true;
 else if(col[1]=='b') this.isTurn=false;
 hideG('btnGame');
 hideG('btnRank');
 hideG('btnSide');
 hideG('btnTime');
 hideG('btnStart');
 showG('btnMoveBack');
 showG('btnStop');
 showG(BX_timer);
 if(BX!==null) popBx(BX);
 if(isSaved===true){
  putBoard(this.sFen);
  var sNota=A_hist[0][0];
  G_CHESS.isCheckedOrMated(sNota);
  var nStart=(360/SEC_time)*(SEC_time-SEC_time_left);
  BX_timer.set(nStart);
  if(G_CHESS.isTurn!==G_CHESS.isSide) G_CHESS.think();
  else G_CHESS.ctg='play';
 }
 else if(isSaved===false){
  A_hist.push([null,G_CHESS.sFen]);
  SEC_time_left=SEC_time;
  BX_timer.anm(360,function(){
   if(G_CHESS.isTurn!==G_CHESS.isSide) G_CHESS.think();
   else G_CHESS.ctg='play';
  });
 }
 this.p4wn=p4_fen2state(this.sFen);
 this.squA=null;
 this.squB=null;
 this.nP4wnA=0;
 this.nP4wnB=0;
 if(this.sCountDown===undefined){
  if(this.sTime=='count_down'){
   this.sCountDown=this.nCountDown*60;}
  else if(this.sTime=='increment'){
   this.sCountDown=this.nIncrement;}
 }
 this.upd();
 $('picBot').crlA.setAttribute('fill','lightcoral');
 $('picBot').crlB.setAttribute('fill','lightcoral');
}

G_CHESS.play=function(squ){
 if($('bxGiveUp').isOn===true){
  popBx('bxGiveUp');
 }
 this.remPick();
 if(this.ctg=='play' && this.isTurn===this.isSide){
  if(squ.unt!==null && squ.unt.isSide===this.isSide){
   squ.appendChild(this.rctPick);
   this.squA=squ;
   for(var i in this.aP4wn){
    var res=this.p4wn.move(squ.nP4wn,this.aP4wn[i]);
    if(res.ok===true){
     var squGreen=this.aSqu[this.aPlay[i]];
     if(squGreen.unt===null) var elm=this.getPick('circle',squGreen);
     else var elm=this.getPick('rect',squGreen);
     this.p4wn=p4_fen2state(this.sFen);
    }
   }
  }
  else if(this.squA!==null){
   this.squB=squ;
   for(var i=0;i<this.aPlay.length;i++){
    if(this.aPlay[i]==this.squA.pos) this.nP4wnA=this.aP4wn[i];
    else if(this.aPlay[i]==this.squB.pos) this.nP4wnB=this.aP4wn[i];
   }
   this.sFenPrev=p4_state2fen(this.p4wn);
   var res=this.p4wn.move(this.nP4wnA,this.nP4wnB);
   if(res.ok===true){
    G_CHESS.sNota=res.string;
    this.anmMove(res.flags); 
   }
   if(this.rctPick.parentNode!==null) this.rctPick.parentNode.removeChild(this.rctPick);
  }
 }
}

G_CHESS.think=function(){
 this.ctg='think';
 var resFind=this.p4wn.findmove(this.nRank+1);
 var resMove=this.p4wn.move(resFind[0],resFind[1]);
 G_CHESS.sNota=resMove.string;
 for(var i=0;i<this.aP4wn.length;i++){
  if(this.aP4wn[i]==resFind[0]) this.squA=this.aSqu[this.aPlay[i]];
  else if(this.aP4wn[i]==resFind[1]) this.squB=this.aSqu[this.aPlay[i]];
 }
 setTimeout(function(){
  G_CHESS.anmMove(resMove.flags);
 },1000);
}

G_CHESS.anmMove=function(nP4wnFlag){
 // en passant
 if(this.squB.unt===null && (nP4wnFlag==9 || nP4wnFlag==11 || nP4wnFlag==15)){
  if(this.squA.unt.sNota=='P') this.posEnPassant=this.squB.pos+12;
  else if(this.squA.unt.sNota=='p') this.posEnPassant=this.squB.pos-12;
 }
 //
 this.ctg='anm';
 if(this.crlCheck.parentNode!==null) this.crlCheck.parentNode.removeChild(this.crlCheck);
 this.aAnm=new Array();
 this.anmLin(this.squA,this.squB);
 this.nP4wnFlag=nP4wnFlag;
 // king side castle
 if(nP4wnFlag==17 || nP4wnFlag==19){
  if(this.isTurn===true) this.anmLin(this.aSqu[117],this.aSqu[115]);
  else this.anmLin(this.aSqu[33],this.aSqu[31]);
 }
 else if(nP4wnFlag==33 || nP4wnFlag==35){ // queen side castle
  if(this.isTurn===true) this.anmLin(this.aSqu[110],this.aSqu[113]);
  else this.anmLin(this.aSqu[26],this.aSqu[29]);
 }
 this.anmStart();
}

G_CHESS.anmLin=function(squA,squB){
 var unt=squA.unt;
 unt.x0=squA.x;
 unt.x1=squB.x;
 unt.y0=squA.y;
 unt.y1=squB.y;
 if(squA.x==squB.x) unt.k=0;
 else unt.k=(squA.y-squB.y)/(squA.x-squB.x);
 unt.b=squA.y-unt.k*squA.x;
 unt.dx=(squB.x-squA.x)/Math.abs(squB.x-squA.x);
 unt.dy=(squB.y-squA.y)/Math.abs(squB.y-squA.y);
 unt.squA=squA;
 unt.squB=squB;
 unt.go=function(){G_CHESS.gBoard.appendChild(this);}
 unt.run=function(){
  this.squB.appendChild(this);
  this.setAttribute('transform','translate(0,0) rotate('+this.r+',25,25)');
  if(this.squB.unt!==null) hideG(this.squB.unt);
  this.squB.unt=this;
  this.squA.unt=null;
  // en passant
  if(G_CHESS.posEnPassant!==null){
   hideG(G_CHESS.aSqu[G_CHESS.posEnPassant].unt);
   G_CHESS.aSqu[G_CHESS.posEnPassant].unt=null;
   G_CHESS.posEnPassant=null;
  }
 }
 this.aAnm.push(unt);
}

G_CHESS.anmStart=function(){
 if(this.aAnm.length>0){
  var unt=this.aAnm.shift();
  if(unt.go!==null) unt.go();
  if(Math.abs(unt.x1-unt.x0)>=Math.abs(unt.y1-unt.y0)) this.anmX(unt);
  else this.anmY(unt);
 }
 else{
  this.anmEnd();
 }
}

G_CHESS.anmX=function(unt){
 unt.x0=unt.x0+5*unt.dx;
 unt.y0=unt.k*unt.x0+unt.b;
 unt.setAttribute('transform','translate('+unt.x0+' '+unt.y0+') rotate('+unt.r+',25,25)');
 if((unt.x0<unt.x1 && unt.dx<0)||(unt.x0>unt.x1 && unt.dx>0)){
  if(unt.run!==null) unt.run();
  this.anmStart();
 }
 else requestAnimationFrame(function(){
  G_CHESS.anmX(unt);
 });
}

G_CHESS.anmY=function(unt){
 unt.y0=unt.y0+5*unt.dy;
 if(unt.k!=0) unt.x0=(unt.y0-unt.b)/unt.k;
 else unt.x0=unt.x0;
 unt.setAttribute('transform','translate('+unt.x0+' '+unt.y0+') rotate('+unt.r+',25,25)');
 if((unt.y0<unt.y1 && unt.dy<0) || (unt.y0>unt.y1 && unt.dy>0)){
  if(unt.run!==null) unt.run();
  this.anmStart();
 }
 else requestAnimationFrame(function(){
  G_CHESS.anmY(unt);
 });
}

G_CHESS.anmR=function(unt,cnt){
 setLocal('mzgb_chess_hist','none');
 if(
 this.ctg=='mate' ||
 this.ctg=='given_up' ||
 this.ctg=='time_is_up'){
  unt.r+=6;
  cnt++;
  unt.setAttribute('transform','translate(0,0) rotate('+unt.r+',25,25)');
  if(cnt<30){
   requestAnimationFrame(function(){
    G_CHESS.anmR(unt,cnt);
   });
  }
  else{
   G_CHESS.ctg='standby';
   hideG('btnMoveBack');
   hideG('btnStop');
   hideG(BX_timer);
   if(unt.isSide===this.isSide){
    showG('btnLost');
    setLocal('chess_hist','none');
   }
   else{
    showG('btnWon');
    $('picBot').crlA.setAttribute('fill','transparent');
    $('picBot').crlB.setAttribute('fill','transparent');
    setLocal('chess_hist','none');
   }
  }
 }
}

G_CHESS.anmEnd=function(){
 if(this.isReset===true){
  this.ctg='play';
  this.reset(); 
 }
 else{
  if((this.isSide===true && this.squB.unt.sNota=='p' && this.squB.pos>107) || (this.isSide===false && this.squB.unt.sNota=='P' && this.squB.pos<36)){ // opp pawn promotion
   hideG(this.squB.unt);
   if(this.isSide===true) this.squB.unt=getUnit('q',this.squB);
   else if(this.isSide===false) this.squB.unt=getUnit('Q',this.squB);
  }
  else if((this.isSide===false && this.squB.unt.sNota=='p' && this.squB.pos>107) || (this.isSide===true && this.squB.unt.sNota=='P' && this.squB.pos<36)){ // host pawn promotion
   this.ctg='promote';
   hideG('btnMoveBack');
   hideG('btnStop');
   popBx('bxPromote');
  } 
  if(this.ctg!='promote'){
   this.turnMove(this.nP4wnFlag);
  }
 }
}

G_CHESS.turnMove=function(nP4wnFlag){
 // king under check
 if(nP4wnFlag==3 || nP4wnFlag==11 || nP4wnFlag==19 || nP4wnFlag==35){
  for(var i in this.assUnit){
   var unt=this.assUnit[i];
   if(unt.name=='king' && unt.isSide!==this.isTurn){
    var squ=unt.parentNode;
    squ.insertBefore(this.crlCheck,unt);
   }
  }
 }
 // king checkmated
 else if(nP4wnFlag==7 || nP4wnFlag==15){
  this.ctg='mate';
  for(var i in this.assUnit){
   var unt=this.assUnit[i];
   if(unt.name=='king' && unt.isSide!==this.isTurn){
    this.anmR(unt,0);
   }
  }
 }
 else if(nP4wnFlag==64 || nP4wnFlag==65 || nP4wnFlag==73){
  this.ctg='a_draw';
  showG('btnDraw');
  setLocal('chess_hist','none');
  hideG('btnMoveBack');
  hideG('btnStop');
  hideG(BX_timer);
 }
 else if(nP4wnFlag==5 || nP4wnFlag==13){
  this.ctg='stale';
  showG('btnDraw');
  setLocal('chess_hist','none');
  hideG('btnMoveBack');
  hideG('btnStop');
  hideG(BX_timer);
 }
 this.sFen=p4_state2fen(this.p4wn,false);
 A_hist.push([G_CHESS.sNota,this.sFen]);
 if(this.ctg!='mate' && this.ctg!='a_draw' && this.ctg!='stale' && this.ctg!='time_is_up'){
  setLocal('chess_hist',G_CHESS.sNota+'~'+this.sFen);
  this.isTurn=!this.isTurn;
  if(this.isTurn!==this.isSide) setTimeout(function(){G_CHESS.think();},100);
  else this.ctg='play';
 }
}

G_CHESS.getPick=function(sTag,squ){
 if(squ.getElementsByTagName('rect')[0].getAttribute('fill')=='#bdb76d') var pnt='#eee8aa';
 else var pnt='#bdb76d';
 for(var i in this.assPick){
  var elm=this.assPick[i];
  if(elm.tagName==sTag && elm.parentNode===null){
   elm.setAttribute('stroke',pnt);
   squ.appendChild(elm);
   return elm;
  }
 }
 if(sTag=='circle') var elm=getCrl(squ,25,25,7,'transparent',pnt,1);
 else if(sTag=='rect') var elm=getRct(squ,2,2,46,46,5,'transparent',pnt,1);
 this.assPick.push(elm);
 return elm;
}

G_CHESS.remPick=function(){
 for(var i in this.assPick){
  var elm=this.assPick[i];
  if(elm.parentNode!==null){
   elm.parentNode.removeChild(elm);
  }
 }
}

G_CHESS.giveUp=function(){
 if(G_CHESS.ctg=='play'){
  G_CHESS.ctg='given_up';
  popBx('bxGiveUp');
  G_CHESS.remPick();
  if(this.rctPick.parentNode!==null) this.rctPick.parentNode.removeChild(this.rctPick);
  if(this.crlCheck.parentNode!==null) this.crlCheck.parentNode.removeChild(this.crlCheck);
  for(var i in G_CHESS.assUnit){
   var unt=G_CHESS.assUnit[i];
   if(
   unt.name=='king' &&
   unt.isOn===true &&
   unt.isSide==G_CHESS.isTurn){
    G_CHESS.anmR(unt,0);
   }
  }
 }
}

function moveBack(){
 if(G_CHESS.ctg=='play' && G_CHESS.isTurn===G_CHESS.isSide && A_hist.length>2){
  G_CHESS.ctg='move_back';
  G_CHESS.remPick();
  if(G_CHESS.rctPick.parentNode!==null) G_CHESS.rctPick.parentNode.removeChild(G_CHESS.rctPick);
  if(G_CHESS.crlCheck.parentNode!==null) G_CHESS.crlCheck.parentNode.removeChild(G_CHESS.crlCheck);
  A_hist.pop();
  A_hist.pop();
  var sNota=A_hist[A_hist.length-1][0];
  G_CHESS.sFen=A_hist[A_hist.length-1][1];
  G_CHESS.p4wn=p4_fen2state(G_CHESS.sFen);
  setLocal('chess_hist',sNota+'~'+G_CHESS.sFen);
  putBoard(G_CHESS.sFen);
  if(sNota!==null) G_CHESS.isCheckedOrMated(sNota);
  G_CHESS.squA=null;
  G_CHESS.squB=null;
  G_CHESS.nP4wnA=0;
  G_CHESS.nP4wnB=0;
  G_CHESS.ctg='play';
 }
}

G_CHESS.isCheckedOrMated=function(sNota){
 var ctg='none';
 if(sNota.charAt(sNota.length-1)=='+') ctg='checked';
 else if(sNota.charAt(sNota.length-1)=='#') ctg='mated';;
 if(ctg!='none'){
  for(var i in this.assUnit){
   var unt=this.assUnit[i];
   if(
   unt.isOn===true &&
   ((unt.sNota=='K' && this.isTurn===true) ||
   (unt.sNota=='k' && this.isTurn===false))){
    if(ctg=='checked'){
     var squ=unt.parentNode;
     squ.insertBefore(G_CHESS.crlCheck,unt);}
    else if(ctg=='mated'){
     if(unt.r==0) var r=180;
     else if(unt.r==180) var r=0;
     unt.setAttribute('transform','translate(0,0) scale(1) rotate('+r+',25,25)');
    }
   }
  }
 }
}

G_CHESS.upd=function(){
 if(this.ctg=='play'){
  SEC_time_left--;
  var nStart=(360/SEC_time)*(SEC_time-SEC_time_left);
  BX_timer.set(nStart);
  setLocal('chess_time_left',SEC_time_left);
 }
 if(SEC_time_left>0) setTimeout('G_CHESS.upd()',1000);
 else{
  this.ctg='time_is_up';
  for(var i in this.assUnit){
   var unt=this.assUnit[i];
   if(unt.name=='king' && unt.isSide==this.isTurn){
    this.anmR(unt,0);
   }
  }
 }
}

///////////////////////////////////////////////// p4wn.js notes ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//   + 0123456789
//   0 ##########
//  10 ##########
//  20 #RNBQKBNR#
//  30 #PPPPPPPP#
//  40 #........#
//  50 #........#
//  60 #........#
//  70 #........#
//  80 #pppppppp#
//  90 #rnbqkbnr#
// 100 ##########
// 110 ##########
//
// state.move() return value
// {
//  flags: <integer flags>,
//  string: <algebraic notation>,
//  ok: <boolean>
// }
// P4_MOVE_FLAG_OK = 1             the move is OK
// P4_MOVE_FLAG_CHECK = 2          a king is in check
// P4_MOVE_FLAG_MATE = 4           checkmate or stalemate
// P4_MOVE_FLAG_CAPTURE = 8        a piece has been taken
// P4_MOVE_FLAG_CASTLE_KING = 16   king side castle
// P4_MOVE_FLAG_CASTLE_QUEEN = 32  queen side castle
// P4_MOVE_FLAG_DRAW = 64          a draw is available
//

