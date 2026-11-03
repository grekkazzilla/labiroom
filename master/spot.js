function getSpot(){
// four top horizontal lines
var cSpot=0;
for(var i=0;i<4;i++){
 var y=Y_top+(H_unit+M_spot)*i;
 for(var j=0;j<5;j++){
  if(j==0) var isEmptyPlayable=true; // when a row is off the inner empty spots become playable
  else var isEmptyPlayable=false; // all other outer spots remain unplayable
  if(j==4) var isStartable=true; // the spot is not locked at the start and can be played
  else var isStartable=false; // the spot is locked at the start
  // 5 left
  var x=W/2-W_unit/2-M_spot*3-W_unit-(W_unit+M_spot)*j;
  specSpot(x,y,'play_regular',-1,isStartable,isEmptyPlayable,cSpot);
  cSpot++;
  // 5 right
  var x=W/2+W_unit/2+M_spot*3+(W_unit+M_spot)*j;
  specSpot(x,y,'play_regular',1,isStartable,isEmptyPlayable,cSpot);
  cSpot++;}}
// one bottom horizontal line (cellar walls)
var y=Y_top+(H_unit+M_spot)*4+M_spot*2;
for(var i=0;i<4;i++){
 if(i==3) var isStartable=true; // the spot is not locked at the start and can be played
 else var isStartable=false; // the spot is locked at the start
 // 4 left
 var x=W/2-W_unit/2-M_spot*3-W_unit-(W_unit+M_spot)*i;
 specSpot(x,y,'play_cellar',-1,isStartable,false,cSpot);
 cSpot++;
 // 4 right
 var x=W/2+W_unit/2+M_spot*3+(W_unit+M_spot)*i;
 specSpot(x,y,'play_cellar',1,isStartable,false,cSpot);
 cSpot++;}
// four central vertical home spots
// where units go to win
for(var i=0;i<4;i++){
 var x=W/2-W_unit/2;
 var y=Y_top+(H_unit+M_spot)*i;
 specSpot(x,y,'home',0,false,false,cSpot);
 cSpot++;}
// cellar bottom spot
var x=W/2-W_unit/2
var y=Y_top+(H_unit+M_spot)*4+M_spot*2;
specSpot(x,y,'cellar',0,false,false,cSpot);
// inverse appending consequence
for(var i=A_spot.length-1;i>=0;i--){
 ARN.appendChild(A_spot[i]);}
} // *******************************************************************************************
function specSpot(x,y,ctg,p,isStartable,isEmptyPlayable,pos){
var spt=getG(ARN,x,y,1,true);
spt.w=W_unit;spt.h=H_unit;
// spot border
getRct(spt,10,10,W_unit-20,H_unit-20,18,'transparent','#c0c0c0',0);
// spot number
//getTxt(A_spot.length,spt,W_unit/2,50,'#c0c0c0','middle');
// category play || cellar || home 
spt.ctg=ctg;
// spot number
spt.pos=pos;
// pointer along x (shift direction)
// when the spot gets units
// -1 for left
//  0 for no shift
// +1 for right
spt.p=p;
// if the empty spot can play
// when it has no units
spt.isEmptyPlayable=isEmptyPlayable;
// one can start playing with these cards;
spt.isStartable=isStartable;
// units which the spot has
A_spot.push(spt);
spt.onclick=function(){
 if(IS_lock===false) play(this);}
// spt.nLockOn  : array number of the other spot locked by this spot
switch(pos){
// 1st left line
case 0:spt.nLockOn=undefined;spt.nLockedBy=2;break;
case 2:spt.nLockOn=0;spt.nLockedBy=4;break;
case 4:spt.nLockOn=2;spt.nLockedBy=6;break;
case 6:spt.nLockOn=4;spt.nLockedBy=8;break;
case 8:spt.nLockOn=6;spt.nLockedBy=undefined;break;
// 1st right line
case 1:spt.nLockOn=undefined;spt.nLockedBy=3;break;
case 3:spt.nLockOn=1;spt.nLockedBy=5;break;
case 5:spt.nLockOn=3;spt.nLockedBy=7;break;
case 7:spt.nLockOn=5;spt.nLockedBy=9;break;
case 9:spt.nLockOn=7;spt.nLockedBy=undefined;break;
// 2nd left line
case 10:spt.nLockOn=undefined;spt.nLockedBy=12;break;
case 12:spt.nLockOn=10;spt.nLockedBy=14;break;
case 14:spt.nLockOn=12;spt.nLockedBy=16;break;
case 16:spt.nLockOn=14;spt.nLockedBy=18;break;
case 18:spt.nLockOn=16;spt.nLockedBy=undefined;break;
// 2nd right line 
case 11:spt.nLockOn=undefined;spt.nLockedBy=13;break;
case 13:spt.nLockOn=11;spt.nLockedBy=15;break;
case 15:spt.nLockOn=13;spt.nLockedBy=17;break;
case 17:spt.nLockOn=15;spt.nLockedBy=19;break;
case 19:spt.nLockOn=17;spt.nLockedBy=undefined;break;
// 3rd left line
case 20:spt.nLockOn=undefined;spt.nLockedBy=22;break;
case 22:spt.nLockOn=20;spt.nLockedBy=24;break;
case 24:spt.nLockOn=22;spt.nLockedBy=26;break;
case 26:spt.nLockOn=24;spt.nLockedBy=28;break;
case 28:spt.nLockOn=26;spt.nLockedBy=undefined;break;
// 3rd right line
case 21:spt.nLockOn=undefined;spt.nLockedBy=23;break;
case 23:spt.nLockOn=21;spt.nLockedBy=25;break;
case 25:spt.nLockOn=23;spt.nLockedBy=27;break;
case 27:spt.nLockOn=25;spt.nLockedBy=29;break;
case 29:spt.nLockOn=27;spt.nLockedBy=undefined;break;
// 4th left line
case 30:spt.nLockOn=undefined;spt.nLockedBy=32;break;
case 32:spt.nLockOn=30;spt.nLockedBy=34;break;
case 34:spt.nLockOn=32;spt.nLockedBy=36;break;
case 36:spt.nLockOn=34;spt.nLockedBy=38;break;
case 38:spt.nLockOn=36;spt.nLockedBy=undefined;break;
// 4th right line
case 31:spt.nLockOn=undefined;spt.nLockedBy=33;break;
case 33:spt.nLockOn=31;spt.nLockedBy=35;break;
case 35:spt.nLockOn=33;spt.nLockedBy=37;break;
case 37:spt.nLockOn=35;spt.nLockedBy=39;break;
case 39:spt.nLockOn=37;spt.nLockedBy=undefined;break;
// left cellar walls
case 40:spt.nLockOn=undefined;spt.nLockedBy=42;break;
case 42:spt.nLockOn=40;spt.nLockedBy=44;break;
case 44:spt.nLockOn=42;spt.nLockedBy=46;break;
case 46:spt.nLockOn=44;spt.nLockedBy=undefined;break;
// right cellar walls
case 41:spt.nLockOn=undefined;spt.nLockedBy=43;break;
case 43:spt.nLockOn=41;spt.nLockedBy=45;break;
case 45:spt.nLockOn=43;spt.nLockedBy=47;break;
case 47:spt.nLockOn=45;spt.nLockedBy=undefined;break;
// central vertical home spots
case 48:spt.nLockOn=undefined;spt.nLockedBy=undefined;break;
case 49:spt.nLockOn=undefined;spt.nLockedBy=undefined;break;
case 50:spt.nLockOn=undefined;spt.nLockedBy=undefined;break;
case 51:spt.nLockOn=undefined;spt.nLockedBy=undefined;break;
// cellar bottom spot
case 52:spt.nLockOn=undefined;spt.nLockedBy=undefined;break;}
} // *******************************************************************************************
