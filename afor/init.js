var IS_lock=true;
//
function init(){
//
var txt=getTxt('not working now ...',SVG_arena,520,210,'#fff','middle');
txt.style.fontSize='25px';
var txt=getTxt('come back later',SVG_arena,520,240,'#fff','middle');
txt.style.fontSize='25px';
// list of chars
getGrd('grdPic','#a0a0a0','#000',1,1,DFS);
var aChar=['а','б','в','г','д','е','ё','ж','з','и','й','к','л','м','н','о','п','р','с','т','у','ф','х','ц','ч','ш','щ','ъ','ы','ь','э','ю','я'];
var gChar=getG(SVG_arena,150,293,1,true,'gChars');
var x=0;
var y=0;
var w=30;
var h=35;
var m=5;
var c=0;
for(var i in aChar){
 var g=getG(gChar,x+(w+m)*c,y,1,true);
 getRct(g,0,0,w,h,5,'transparent','url(#grdPale)',1);
 var txt=getTxt(aChar[i],g,w/2,h/2-2,'#000','middle');
 txt.style.fontSize='28px';
 txt.style.fontStyle='italic';
 c++;
 if(i==16){
  x=(w+m)/2;
  y+=h+m;
  c=0;
 }
}
// g score
var gScore=getG(SVG_arena,85,310,1,true,'gScore');
var txt=getTxt('000',gScore,0,0,'#000','middle');
txt.style.fontSize='28px';
// g efforts
var gEffort=getG(SVG_arena,85,350,1,true,'gEffort');
var txt=getTxt('• • •',gEffort,0,0,'#000','middle');
txt.style.fontSize='45px';
}
//
init();
