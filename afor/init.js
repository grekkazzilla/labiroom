// ***** init.js ***** //
var IS_lock=true;
const A_char=['а','б','в','г','д','е','ё','ж','з','и','й','к','л','м','н','о','п','р','с','т','у','ф','х','ц','ч','ш','щ','ъ','ы','ь','э','ю','я'];
let G_phrase=null;
const N_max_phrase=12;
let N_curr_phrase=undefined;
var A_unguessed=[];
for(var i=0;i<=N_max_phrase;i++) A_unguessed.push(i+'');
// the list of guessed phrases lives in afor_state now — it is restored by putState()
var A_guessed=[];
let N_efforts=3;
let N_score=0;
let S_who='';
var A_pressed=[];   // every letter the player has pressed in the current phrase
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
  // list of chars
  var gCharPad=getG(SVG_arena,150,293,1,true,'gCharPad');
  var x=0;
  var y=0;
  var w=30;
  var h=35;
  var m=5;
  var c=0;
  for(var i in A_char){
   var btn=getG(gCharPad,x+(w+m)*c,y,1,true);
   getRct(btn,0,0,w,h,5,'transparent','url(#grdPale)',1);
   var txt=getTxt(A_char[i],btn,w/2,h/2-2,'#000','middle');
   txt.style.fontSize='28px';
   txt.style.fontStyle='italic';
   c++;
   if(i==16){
    x=(w+m)/2;
    y+=h+m;
    c=0;
   }
   btn.chr=A_char[i];
   btn.style.cursor='pointer';
   btn.onclick=play; // function play() in run.js
  }
  // g score
  var gScore=getG(SVG_arena,85,310,1,true,'gScore');
  var txt=getTxt('000',gScore,0,0,'#000','middle');
  txt.style.fontSize='28px';
  // ***** init.js : three dots showing how many efforts there are left to try
  var gEffort=getG(SVG_arena,85,350,1,true,'gEfforts');
  var txt=getTxt('',gEffort,0,0,'#000','middle');
  for(var i=0;i<3;i++){
   var spn=getSVG(txt,'tspan');
   spn.textContent='• ';
   spn.style.fontSize='45px';
  }
  // btn next
  var btn=getG(SVG_arena,435,240,1,false,'btnNext');
  getRct(btn,0,0,150,35,5,'transparent','#fff',1);
  txt=getTxt('дальше >',btn,75,16,'url(#grdPale)','middle');
  txt.style.fontSize='28px';
  txt.style.fontStyle='italic';
  btn.onclick=run;
  btn.style.cursor='pointer';
  //
  if(!IS_prod){
   // restore the saved state, or start a fresh game if there is none
   //putState();
  }
 }
);

