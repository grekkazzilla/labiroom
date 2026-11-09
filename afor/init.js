let IS_prod=false;
var IS_lock=true;
const A_char=['а','б','в','г','д','е','ё','ж','з','и','й','к','л','м','н','о','п','р','с','т','у','ф','х','ц','ч','ш','щ','ъ','ы','ь','э','ю','я'];
let G_phrase=null;
const N_max_phrase=12;
let N_curr_phrase=undefined;
var A_unguessed=[];
for(var i=0;i<=N_max_phrase;i++) A_unguessed.push(i+'');
var A_guessed=getLocal('afor_guessed','').split('~');
if(A_guessed.length===1 && A_guessed[0]==='') A_guessed=[];
A_unguessed=spliceArrayByMatches(A_unguessed,A_guessed);
//
let IMG=[
 ['arena.png',0,0,W,H,SVG_arena,'IMG_arena'],
 ['scull_red_eyes.png',0,41,323,252,SVG_arena,'IMG_RedEyes'],
 ['scull_jaw_open.png',0,41,323,252,SVG_arena,'IMG_JawOpen'],
 ['scull_red_eyes_jaw_open.png',0,41,323,252,SVG_arena,'IMG_RedEyesJawOpen'],
];
downloadImages(
 IMG.map(r=>r[0]),
 images=>{
  const NS='http://www.w3.org/2000/svg';
  images.forEach((r,i)=>{
   if(!r){ttt('FAIL:',IMG[i][0]);return;}
   const row=IMG[i];
   const img=document.createElementNS(NS,'image');
   img.setAttribute('href',URL.createObjectURL(r.blob));
   img.setAttribute('x',row[1]);
   img.setAttribute('y',row[2]);
   img.setAttribute('width',row[3]);
   img.setAttribute('height',row[4]);
   img.style.visibility='hidden';
   row[5].appendChild(img);
   row[7]=img; // element stored back into the row
   if(row[6])window[row[6]]=img; // IMG_RedEyes etc. become globals
  });
  IMG_arena.style.visibility='visible';
  getGrd('grdPale','#fff','#eee8aa',1,1,DFS);
  var clr='url(#grdPale)';
  $$('path',G_spin).setAttribute('fill',clr);
  $$('path',G_spin).setAttribute('stroke',clr);
  jumpG(G_spin,462,78,true);
  SVG_arena.appendChild(G_spin);
  //
  G_phrase=getG(SVG_arena,320,50,1,true);
  G_phrase.w=385;
  G_phrase.h=199;
  getRct(G_phrase,0,0,G_phrase.w,G_phrase.h,20,'transparent','#eee8aa',0);
  G_phrase.gInner=getG(G_phrase,0,0,1,true);
  G_phrase.aTxt=[];
  var dy=30;
  for(var i=0;i<4;i++){
   G_phrase.aTxt[i]=getTxt('',G_phrase.gInner,0,dy*i,'#fff','start');
   G_phrase.aTxt[i].style.fontSize='28px';
   G_phrase.aTxt[i].style.fontStyle='italic';
   G_phrase.aTxt[i].setAttribute('fill','#000');
  }
  // list of chars
  var gChar=getG(SVG_arena,150,293,1,true,'gChar');
  var x=0;
  var y=0;
  var w=30;
  var h=35;
  var m=5;
  var c=0;
  for(var i in A_char){
   var g=getG(gChar,x+(w+m)*c,y,1,true);
   getRct(g,0,0,w,h,5,'transparent','url(#grdPale)',1);
   var txt=getTxt(A_char[i],g,w/2,h/2-2,'#000','middle');
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
  //
  if(!IS_prod){
   var txt=getTxt('not working now',SVG_arena,510,210,'#fff','middle');
   txt.style.fontSize='25px';
   txt.style.fontStyle='italic';
   var txt=getTxt('come back later',SVG_arena,510,240,'#fff','middle');
   txt.style.fontSize='25px';
   txt.style.fontStyle='italic';
   run();
  }
 }
);

