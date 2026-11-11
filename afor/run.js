// ***** run.js : start the game
function run(){
 IS_lock=false;
 reqPhrase();
}
// ***** run.js : request a new phrase from the server async
function reqPhrase(){
 if(IS_lock)return;
 IS_lock=true;
 if(A_unguessed.length===0){
  for(var i=0;i<=N_max_phrase;i++) A_unguessed.push(i+'');
  A_guessed=[];
  setLocal('afor_guessed','');
 }
 N_curr_phrase=A_unguessed[getRand(0,A_unguessed.length-1)];
 fetch('txt/'+N_curr_phrase+'.txt').then(response=>{
  if(!response.ok) throw new Error('Network response was not ok');
  return response.text();
 }).then(text=>{
  const lines=text.trim().split(/\r?\n/);
  const sPhrase=lines[0]||'';
  const sWho=lines[1]||'';
  putPhrase(sPhrase,sWho);
 }).catch(err=>{
  console.error('reqPhrase error:',err);
  IS_lock=false;   // unlocked
 });
}
// ***** run.js : show the phrase on the screen and set it up for animation
function putPhrase(sPhrase,sWho){
 IMG_JawOpen.style.visibility='visible';
 var c=0;
 var txt=getTxt('',G_phrase.gInner,0,30*c,'#fff','start');
 for(var i=0;i<sPhrase.length;i++){
  var chr=sPhrase.charAt(i);
  var spn=getSVG(null,'tspan');
  spn.chr=chr;
  if(isInArray(chr.toLowerCase(),A_char)===true){
   spn.textContent='•';
   //spn.style.fontSize='45px';    
   spn.style.fontSize='28px';
  } else {
   spn.textContent=chr;
   spn.style.fontSize='28px';
  }
  var wPhrase=txt.getBBox().width;
  if(wPhrase>250 && chr==' '){
   c++;
   var txt=getTxt('',G_phrase.gInner,0,30*c,'#fff','start');
  }
  txt.appendChild(spn);
 }
 requestAnimationFrame(function(){
  stopSpin();
  // align
  //var wText=G_phrase.gInner.getBBox().width;
  //var hText=G_phrase.gInner.getBBox().height;
  //var xText=G_phrase.w/2-wText/2;
  //var yText=G_phrase.h/2-hText/2;
  //G_phrase.gInner.setAttribute('transform','translate('+xText+','+yText+')');
  //G_phrase.gInner.xPos=xText;
  //G_phrase.gInner.yPos=yText;
  centerPhrase();
  // setting chars ready to fly
  var letterIndex=0; // one general counter for all lines
  var aText=G_phrase.gInner.getElementsByTagName('text');
  for(var j=0;j<aText.length;j++){
   var txtPhrase=aText[j];
   var ptJaw=transformPointBetweenElements(SVG_arena,txtPhrase,233,243);
   var tspans=txtPhrase.getElementsByTagName('tspan');
   // 1st loop : only measuring, no moving
   var positions=[];
   for(var i=0;i<tspans.length;i++){
    var str=tspans[i].textContent;
    if(!str || !str.trim()){positions[i]=null;continue;}
    positions[i]=tspans[i].getStartPositionOfChar(0);
   }
   // 2nd loop : setting dx/dy and starting animation
   for(var i=0;i<tspans.length;i++){
    if (!positions[i]) continue;
    let tspan=tspans[i];
    var pt=positions[i];
    tspan.setAttribute('x',pt.x);
    tspan.setAttribute('y',pt.y);
    var dx=ptJaw.x-pt.x;
    var dy=ptJaw.y-pt.y;
    tspan.setAttribute('dx',dx);
    tspan.setAttribute('dy',dy);
    tspan.setAttribute('fill','transparent');
    tspan.dX=dx;
    tspan.dY=dy;
    if(j==aText.length-1 && i==tspans.length-1) tspan.isAnimEnd=true;
    else tspan.isAnimEnd=false;
    (function(span,delay){
     setTimeout(function(){
      span.setAttribute('fill','#000');
      animPhrase(span,500,function(){
       if(span.isAnimEnd===true){
        IMG_JawOpen.style.visibility='hidden';
	IS_lock=false;
       }
      });
     },delay);
    })(tspan,60*letterIndex);
    letterIndex++; // incrementing the general counter
   }
  }
 });
}
// ***** run.js : animate the phrase as if the letters fly along
function animPhrase(unt,nSpeed,fAnimEnd){
 if(unt.dX==0 && unt.dY==0){  // буква уже в цели — не считаем 0/0
  unt.onAnimEnd=fAnimEnd;
  unt.onAnimEnd();
  return;
 }
 if(unt.dX==0) unt.k=0;
 else unt.k=(unt.dY-0)/(unt.dX-0);
 unt.b=unt.dY-unt.k*unt.dX;
 unt.dstX=(0-unt.dX)/Math.abs(0-unt.dX);
 unt.dstY=(0-unt.dY)/Math.abs(0-unt.dY);
 if(Math.abs(0-unt.dX)>=Math.abs(0-unt.dY)) unt.isMoveX=true;
 else unt.isMoveX=false;
 unt.nSpeed=nSpeed;        // теперь пикселей в СЕКУНДУ, а не за кадр
 unt.lastT=null;           // время прошлого кадра, заполнится на первом тике
 unt.onAnimEnd=fAnimEnd;
 exeAnim(unt);
}
function exeAnim(unt){
 var now=performance.now();
 if(unt.lastT===null) unt.lastT=now;
 var dt=(now-unt.lastT)/1000;   // сколько секунд прошло с прошлого кадра
 unt.lastT=now;
 var move=unt.nSpeed*dt;        // сколько пикселей пройти за это время
 if(unt.isMoveX===true){
  unt.dX=unt.dX+move*unt.dstX;
  unt.dY=unt.k*unt.dX+unt.b;
  if((unt.dX<0 && unt.dstX<0)||(unt.dX>0 && unt.dstX>0)){
   unt.dX=0;
   unt.dY=0;
   unt.setAttribute('dx',unt.dX);
   unt.setAttribute('dy',unt.dY);
   unt.onAnimEnd();
  }
  else{
   unt.setAttribute('dx',unt.dX);
   unt.setAttribute('dy',unt.dY);
   requestAnimationFrame(function(){exeAnim(unt);});
  }
 }
 else if(unt.isMoveX===false){
  unt.dY=unt.dY+move*unt.dstY;
  if(unt.k!=0) unt.dX=(unt.dY-unt.b)/unt.k;
  else unt.dX=unt.dX;
  if((unt.dY<0 && unt.dstY<0) || (unt.dY>0 && unt.dstY>0)){
   unt.dX=0;
   unt.dY=0;
   unt.setAttribute('dx',unt.dX);
   unt.setAttribute('dy',unt.dY);
   unt.onAnimEnd();}
  else{
   unt.setAttribute('dx',unt.dX);
   unt.setAttribute('dy',unt.dY);
   requestAnimationFrame(function(){exeAnim(unt);});
  }
 }
}
// ***** run.js : guessing the letters by entering keys from the char pad 
function play(){
 if(!IS_lock){
  var aText=G_phrase.gInner.getElementsByTagName('text');
  for(var i=0;i<aText.length;i++){
   var txt=aText[i];
   var aSpan=txt.getElementsByTagName('tspan');
   for(var j=0;j<aSpan.length;j++){
    var spn=aSpan[j];
    if(spn.textContent=='•' && this.chr==spn.chr.toLowerCase()){
     spn.textContent=spn.chr;
     spn.style.fontSize='28px';         
    }
   }
  }
  normalizePhrase();
 }
}
// ***** run.js : снять следы, строка разложится заново
function normalizePhrase(){
 var aText=G_phrase.gInner.getElementsByTagName('text');
 for(var j=0;j<aText.length;j++){
  var txt=aText[j];
  txt.removeAttribute('dy');
  txt.style.alignmentBaseline='auto';
  txt.style.dominantBaseline='auto';
  var tspans=txt.getElementsByTagName('tspan');
  for(var i=0;i<tspans.length;i++){
   tspans[i].removeAttribute('x');
   tspans[i].removeAttribute('y');
   tspans[i].removeAttribute('dx');
   tspans[i].removeAttribute('dy');
  }
 }
 // пересобрать центровку под новую (натуральную) раскладку
 //var wText=G_phrase.gInner.getBBox().width;
 //var hText=G_phrase.gInner.getBBox().height;
 //var xText=G_phrase.w/2-wText/2;
 //var yText=G_phrase.h/2-hText/2;
 //G_phrase.gInner.setAttribute('transform','translate('+xText+','+yText+')');
 //G_phrase.gInner.xPos=xText;
 //G_phrase.gInner.yPos=yText;
 centerPhrase();
}
// ***** run.js : центровка по фактическому содержимому
function centerPhrase(){
 var bb=G_phrase.gInner.getBBox();
 var xText=G_phrase.w/2-bb.width/2-bb.x;
 var yText=G_phrase.h/2-bb.height/2-bb.y;
 G_phrase.gInner.setAttribute('transform','translate('+xText+','+yText+')');
 G_phrase.gInner.xPos=xText;
 G_phrase.gInner.yPos=yText;
}

