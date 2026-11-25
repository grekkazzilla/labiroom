// ****************************************************
// *************  GAME LIST (VARIANTS) ****************
// ****************************************************

G_CHESS.sFen='';
G_CHESS.sGame=getLocal('chess_game','QUE');
var A_hist=new Array();

var dataPic='M 0 0 L 0 82.375 L 300 82.375 L 300 0 L 0 0 z M 46.84375 18.71875 C 59.251737 18.71875 69.34375 28.779491 69.34375 41.1875 C 69.34375 53.595479 59.251737 63.65625 46.84375 63.65625 C 34.435752 63.65625 24.375 53.595479 24.375 41.1875 C 24.375 28.779491 34.435752 18.71875 46.84375 18.71875 z M 0 107.375 L 0 189.75 L 300 189.75 L 300 107.375 L 0 107.375 z M 46.84375 126.09375 C 59.251737 126.09375 69.34375 136.1545 69.34375 148.5625 C 69.34375 160.97048 59.251737 171.03125 46.84375 171.03125 C 34.435752 171.03125 24.375 160.97048 24.375 148.5625 C 24.375 136.1545 34.435752 126.09375 46.84375 126.09375 z M 0 214.71875 L 0 297.125 L 300 297.125 L 300 214.71875 L 0 214.71875 z M 46.84375 233.46875 C 59.251737 233.46875 69.34375 243.5295 69.34375 255.9375 C 69.34375 268.34548 59.251737 278.40625 46.84375 278.40625 C 34.435752 278.40625 24.375 268.34548 24.375 255.9375 C 24.375 243.5295 34.435752 233.46875 46.84375 233.46875 z';
getBtn(G_CHESS,0,0,40,40,'abax',[[dataPic,0.08,null]],function(){
 popBx('bxGame');	
},null,true,'btnGame');
var bx=getBox(null,null,[150,40,2,6,10],10,null,false,G_CHESS,'bxGame');
var dataPic='M 71.0625,0 C 31.87854,0 0,31.87854 0,71.0625 l 0,157.875 C 0,268.12081 31.87208,300 71.0625,300 l 157.875,0 C 268.12082,300 300,268.12146 300,228.9375 l 0,-157.875 C 299.99935,31.87854 268.12081,0 228.9375,0 L 71.0625,0 z m 8.5625,18.53125 70.375,0 0,61.09375 70.375,0 0,-61.09375 8.5625,0 c 28.96212,0 52.53125,23.56784 52.53125,52.53125 l 0,8.5625 -61.09375,0 0,70.375 61.09375,0 0,70.34375 -61.125,0 0,-70.34375 -70.34375,0 0,70.34375 -70.375,0 0,-70.34375 -61.09375,0 0,-70.375 61.09375,0 0,-61.09375 z m 0,61.09375 0,70.375 70.375,0 0,-70.375 -70.375,0 z m -61.09375,140.75 61.09375,0 0,61.09375 -8.5625,0 c -28.96276,0 -52.53125,-23.56849 -52.53125,-52.53125 l 0,-8.5625 z m 131.46875,0 70.375,0 0,61.09375 -70.375,0 0,-61.09375 z';
getPic('',bx,10,10,40,40,[0.11,'url(#grdBtn)','none',0],null,true,dataPic);
getTxt('Variants:',bx,bx.w/2,30,'url(#grdBtn)','middle');
var arr=new Array(['QUE','3Queens'],['REV','Revolt'],['WHI','Wh Horde'],['BLA','Bl Horde'],['PRO','Promotion'],['UNF','Unfair!'],['SCR','Scramble'],['WED','Wedge'],['STA','Standard'],['SHU','Shuffle']);
bx.aBtn=new Array();
var x=0;
var y=bx.y0;
for(var i=0;i<arr.length;i++){
 if(i%2==0){
  x=bx.x0;
  y+=50;
 }
 else{
  x=bx.x1;
 }
 var btn=getBtn(bx,x,y,bx.w1,bx.h1,'abxb',null,function(){
  setGame(this.sGame,true);
  setTimeout(function(){
   popBx('bxGame');
  },250);
 },[[arr[i][1],[40,null]],null,'start'],true);
 getCrl(btn,20,bx.hBtn/2,10,'url(#grdBtnRvs)','none',0);
 getCrl(btn,20,bx.hBtn/2,3,'transparent','none',0);
 btn.aOn.push(['circle','0','fill','url(#grdBtnRvs)','#fff']);
 btn.sGame=arr[i][0];
 bx.aBtn.push(btn);
}
getBtn(bx,bx.w-50,10,40,40,'abcx',[[dataPicCross,0.07,null]],function(){
 popBx('bxGame');
},[['ok',null],null,'middle'],true);

function setGame(sGame,isSave){
 switch(sGame){
  case 'STA':
   G_CHESS.sFen='rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
   break;
  case 'SHU':
   G_CHESS.sFen=getShuffle();
   break;
  case 'QUE':
   G_CHESS.sFen='nnnnknnn/pppppppp/8/8/8/8/PPPPPPPP/1Q1QK1Q1 w - - 0 1';
   break;
  case 'REV':
   G_CHESS.sFen='1nn1knn1/4p3/8/8/8/8/PPPPPPPP/4K3 w - - 0 1';
   break;
  case 'WHI':
   G_CHESS.sFen='rnbqkbnr/pppppppp/8/8/PPPPPPPP/PPPPPPPP/PPPPPPPP/PPPPKPPP w kq - 0 1';
   break;
  case 'BLA':
   G_CHESS.sFen='nnnnknnn/pppppppp/2p2p2/1pppppp1/8/8/PPPPPPPP/RNBQKBNR w KQ - 0 1';
   break;
  case 'SCR':
   G_CHESS.sFen='rbbrkqnb/n6b/r1pppp1q/n6n/B6N/B1PPPP1B/Q6N/NRRQKNBR w - - 0 1';
   break;
  case 'WED':
   G_CHESS.sFen='brkqrbp1/1pnpnp2/2ppp3/3p4/4P3/3PPP2/2PNPNP1/1PBRKQRB w - - 0 1';
   break;
  case 'UNF':
   G_CHESS.sFen=getUnfair();
   break;
  case 'PRO':
   G_CHESS.sFen=getGameEnd();
   break;
  case 'GMB':
   G_CHESS.sFen=getGamble();
   break;
  default:
   G_CHESS.sFen='rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
 }
 //G_CHESS.sFen='4k3/p7/7P/8/8/8/8/Q3K3 w KQkq - 0 1';
 putBoard(G_CHESS.sFen);
 if(isSave===true){
  G_CHESS.sGame=sGame;
  setLocal('chess_game',sGame);
 }
 for(var i=0;i<this.bxGame.aBtn.length;i++){
  var btn=this.bxGame.aBtn[i];
  var crl=btn.getElementsByTagName('circle')[1];
  if(sGame==btn.sGame) var pnt='url(#grdPic)';
  else var pnt='transparent';
  crl.setAttribute('fill',pnt);
 }
}

function putBoard(sFen){
 var sPut=sFen.split(' ')[0];
 sPut=sPut.replace(new RegExp('8','g'),'00000000');
 sPut=sPut.replace(new RegExp('7','g'),'0000000');
 sPut=sPut.replace(new RegExp('6','g'),'000000');
 sPut=sPut.replace(new RegExp('5','g'),'00000');
 sPut=sPut.replace(new RegExp('4','g'),'0000');
 sPut=sPut.replace(new RegExp('3','g'),'000');
 sPut=sPut.replace(new RegExp('2','g'),'00');
 sPut=sPut.replace(new RegExp('1','g'),'0');
 for(var i in G_CHESS.assUnit){
  var unt=G_CHESS.assUnit[i];
  hideG(unt);
 }
 var s=sPut.split('/');
 var pos=0;
 for(var i=0;i<8;i++){
  for(var j=0;j<8;j++){
   var squ=G_CHESS.aSqu[G_CHESS.aPlay[pos]];
   var chr=s[i].charAt(j);
   if(chr!='0'){
    var unt=this.getUnit(chr,squ);
    squ.unt=unt;
   }
   else squ.unt=null;
   pos++;
  }
 }
}

function getUnit(sNota,squ){
 var isFound=false;
 for(var i in G_CHESS.assUnit){
  var unt=G_CHESS.assUnit[i];
  if(unt.sNota==sNota && unt.getAttribute('transform')=='scale(0)'){
   isFound=true;
   break;
  }
 }
 if(isFound===false){
  switch(sNota){
   case 'K':var unt=getWKing();break;
   case 'Q':var unt=getWQueen();break;
   case 'R':var unt=getWRook();break;
   case 'N':var unt=getWKnight();break;
   case 'B':var unt=getWBishop();break;
   case 'P':var unt=getWPawn();break;
   case 'k':var unt=getBKing();break;
   case 'q':var unt=getBQueen();break;
   case 'r':var unt=getBRook();break;
   case 'b':var unt=getBBishop();break;
   case 'n':var unt=getBKnight();break;
   case 'p':var unt=getBPawn();break;
  }
  G_CHESS.assUnit.push(unt);
 }
 squ.appendChild(unt);
 if(G_CHESS.isSide===true) unt.r=0;
 else if(G_CHESS.isSide===false) unt.r=180;
 unt.setAttribute('transform','translate(0,0) scale(1) rotate('+unt.r+',25,25)');
 unt.isOn=true;
 return unt;
}

function getShuffle(){
 var arr=['r','n','b','q','k','b','n','r'];
 //
 do{
  arr=shuffle(arr);
  var tmpA=new Array();
  var aCompare=new Array();
  for(var i=0;i<8;i++){
   if(arr[i]=='b' && i%2==0) aCompare.push('w');
   else if(arr[i]=='b' && i%2>0) aCompare.push('b');
   tmpA.push(arr[i]);
  }
 }
 while(aCompare[0]==aCompare[1]);
 //
 do{
  arr=shuffle(arr);
  var tmpB=new Array();
  var aCompare=new Array();
  for(var i=0;i<8;i++){
   if(arr[i]=='b' && i%2==0) aCompare.push('b');
   else if(arr[i]=='b' && i%2>0) aCompare.push('w');
   tmpB.push(arr[i]);
  }
 }
 while(aCompare[0]==aCompare[1]);
 //
 return tmpA.join('')+'/pppppppp/8/8/8/8/PPPPPPPP/'+tmpB.join('').toUpperCase()+' w - - 0 1';
}

function getUnfair(){
 var arr=new Array('p','r','n','b','q');
 var aW=new Array();
 var aB=new Array();
 for(var i=0;i<15;i++) aW.push(arr[getRnd(0,4)].toUpperCase());
 for(var i=0;i<15;i++) aB.push(arr[getRnd(0,4)]);
 return aB[0]+aB[1]+aB[2]+aB[3]+'k'+aB[4]+aB[5]+aB[6]+'/'+aB[7]+aB[8]+aB[9]+aB[10]+aB[11]+aB[12]+aB[13]+aB[14]+'/8/8/8/8/'+aW[7]+aW[8]+aW[9]+aW[10]+aW[11]+aW[12]+aW[13]+aW[14]+'/'+aW[0]+aW[1]+aW[2]+aW[3]+'K'+aW[4]+aW[5]+aW[6]+' w - - 0 1';
}

/*function getGamble(){
 var aUnit=new Array('p','p','p','p','r','n','b','q','P','P','P','P','R','N','B','Q');
 var aExclude=new Array();
 var aAssigned=new Array();
 for(var i=0;i<64;i++){
  aExclude[i]=['x'];
  aAssigned.push('0');
 }
 var posWKing=getRnd(0,63);
 aAssigned[posWKing]='K';
 var arr=[posWKing+1,posWKing-1,posWKing+7,posWKing+8,posWKing+9,,posWKing-7,posWKing-8,posWKing-9];
 do{
  var posBKing=getRnd(0,63);
 }
 while(isInArray(posBKing,arr));
 aAssigned[posBKing]='k';
 var pos=posWKing-9;
 if(pos>=0 && pos<=63) aExclude[pos].push(...['p','b','q']);
 var pos=posWKing-8;
 if(pos>=0 && pos<=63) aExclude[pos].push(...['r','q']);
 var pos=posWKing-7;
 if(pos>=0 && pos<=63) aExclude[pos].push(...['p','b','q']);
 var pos=posWKing-1;
 if(pos>=0 && pos<=63) aExclude[pos].push(...['r','q']);
 var pos=posWKing+1;
 if(pos>=0 && pos<=63) aExclude[pos].push(...['r','q']);
 var pos=posWKing+7;
 if(pos>=0 && pos<=63) aExclude[pos].push(...['b','q']);
 var pos=posWKing+8;
 if(pos>=0 && pos<=63) aExclude[pos].push(...['r','q']);
 var pos=posWKing+9;
 if(pos>=0 && pos<=63) aExclude[pos].push(...['b','q']);
 var pos=posWKing-17;
 if(pos>=0 && pos<=63) aExclude[pos].push(...['n']);
 var pos=posWKing-15;
 if(pos>=0 && pos<=63) aExclude[pos].push(...['n']);
 var pos=posWKing-10;
 if(pos>=0 && pos<=63) aExclude[pos].push(...['n']);
 var pos=posWKing-6;
 if(pos>=0 && pos<=63) aExclude[pos].push(...['n']);
 var pos=posWKing+10;
 if(pos>=0 && pos<=63) aExclude[pos].push(...['n']);
 var pos=posWKing+6;
 if(pos>=0 && pos<=63) aExclude[pos].push(...['n']);
 var pos=posWKing+17;
 if(pos>=0 && pos<=63) aExclude[pos].push(...['n']);
 var pos=posWKing+15;
 if(pos>=0 && pos<=63) aExclude[pos].push(...['n']);
 var pos=posBKing-9;
 if(pos>=0 && pos<=63) aExclude[pos].push(...['B','Q']);
 var pos=posBKing-8;
 if(pos>=0 && pos<=63) aExclude[pos].push(...['R','Q']);
 var pos=posBKing-7;
 if(pos>=0 && pos<=63) aExclude[pos].push(...['B','Q']);
 var pos=posBKing-1;
 if(pos>=0 && pos<=63) aExclude[pos].push(...['R','Q']);
 var pos=posBKing+1;
 if(pos>=0 && pos<=63) aExclude[pos].push(...['R','Q']);
 var pos=posBKing+7;
 if(pos>=0 && pos<=63) aExclude[pos].push(...['P','B','Q']);
 var pos=posBKing+8;
 if(pos>=0 && pos<=63) aExclude[pos].push(...['R','Q']);
 var pos=posBKing+9;
 if(pos>=0 && pos<=63) aExclude[pos].push(...['P','B','Q']);
 var pos=posBKing-17;
 if(pos>=0 && pos<=63) aExclude[pos].push(...['N']);
 var pos=posBKing-15;
 if(pos>=0 && pos<=63) aExclude[pos].push(...['N']);
 var pos=posBKing-10;
 if(pos>=0 && pos<=63) aExclude[pos].push(...['N']);
 var pos=posBKing-6;
 if(pos>=0 && pos<=63) aExclude[pos].push(...['N']);
 var pos=posBKing+10;
 if(pos>=0 && pos<=63) aExclude[pos].push(...['N']);
 var pos=posBKing+6;
 if(pos>=0 && pos<=63) aExclude[pos].push(...['N']);
 var pos=posBKing+17;
 if(pos>=0 && pos<=63) aExclude[pos].push(...['N']);
 var pos=posBKing+15;
 if(pos>=0 && pos<=63) aExclude[pos].push(...['N']);
 var sFen='';
 var sChar='';
 for(var i=0;i<64;i++){
  sChar=aAssigned[i];
  if(sChar=='0'){
   do{
    sChar=aUnit[getRnd(0,9)];
   }
   while(isInArray(sChar,aExclude[i]));
  }
  sFen+=sChar;
  if((i+1)%8==0) sFen+='/';
 }
 console.log(sFen);
 return sFen+' w - - 0 1';
}*/

function getGameEnd(){
 var sSideA=shuffle(['r','k','1','1','1','1','1','1']).join('')+'/'+shuffle(['ppp','p','1','1','1','1']).join('');
 var sSideB=shuffle(['n','k','b','1','1','1','1','1']).join('')+'/'+shuffle(['pp','p','1','1','1','1','1']).join('');
 if(getRnd(0,1)==0){
  var sWhite=sSideA.toUpperCase();
  var sBlack=sSideB;
 }
 else{
  var sWhite=sSideB.toUpperCase();
  var sBlack=sSideA;
 }
 sWhite=sWhite.split('').reverse().join('');
 return sBlack+'/8/8/8/8/'+sWhite+' w - - 0 1';
}

setGame(G_CHESS.sGame,false);

var S_hist=getLocal('chess_hist','none');
if(S_hist!=='none'){
 var col=S_hist.split('~');
 var sNota=col[0];
 G_CHESS.sFen=col[1];
 A_hist.push([sNota,G_CHESS.sFen]);
 G_CHESS.start(true);
}

