// ***** run.js : start the game
function run(){
 var aText=G_phrase.gInner.getElementsByTagName('text');
 for(var i=aText.length-1;i>=0;i--){
  G_phrase.gInner.removeChild(aText[i]);
 }
 var arrG=$('gCharPad').getElementsByTagName('g');
 for(var i=0;i<arrG.length;i++){
  $$('text',arrG[i]).textContent=arrG[i].chr;
 }
 N_efforts=3;
 var aSpan=$('gEfforts').getElementsByTagName('tspan');
 for(var i=0;i<aSpan.length;i++){
  aSpan[i].setAttribute('fill','#000');
 }
 A_pressed=[];
 hideG('btnNext');
 IS_lock=false;
 if(G_spin.isOn===false) animSpin(true);   // spinner for the async phrase fetch
 reqPhrase();
 saveState();   // reqPhrase sets N_curr_phrase synchronously, so the new phrase gets stored
}
// ***** run.js : request a new phrase from the server async
function reqPhrase(nForce,bNoAnim,bStayLocked){
 if(IS_lock)return;
 IS_lock=true;
 if(A_unguessed.length===0){
  for(var i=0;i<=N_max_phrase;i++) A_unguessed.push(i+'');
  A_unguessed=spliceArrayByMatches(A_unguessed,A_guessed);
  if(A_unguessed.length===0){          // all phrases guessed — start a fresh round
   A_guessed=[];
   A_unguessed=[];
   for(var i=0;i<=N_max_phrase;i++) A_unguessed.push(i+'');
  }
 }
 if(nForce!==undefined) N_curr_phrase=nForce+'';
 else N_curr_phrase=A_unguessed[getRand(0,A_unguessed.length-1)];
 fetch('txt/'+N_curr_phrase+'.txt').then(response=>{
  if(!response.ok) throw new Error('Network response was not ok');
  return response.text();
 }).then(text=>{
  const lines=text.trim().split(/\r?\n/);
  const sPhrase=lines[0]||'';
  const sWho=lines[1]||'';
  putPhrase(sPhrase,sWho,bNoAnim,bStayLocked);
 }).catch(err=>{
  console.error('reqPhrase error:',err);
  stopSpin();      // don't leave the spinner spinning forever
  IS_lock=false;
 });
}
// ***** run.js : show the phrase on the screen and set it up for animation
function putPhrase(sPhrase,sWho,bNoAnim,bStayLocked){
 S_who=sWho;
 IMG_JawOpen.style.visibility='visible';
 G_phrase.gInner.style.visibility='hidden';   // hidden while the layout is being built
 var c=0;
 var txt=getTxt('',G_phrase.gInner,0,30*c,'#fff','start');
 var aWords=sPhrase.split(' ');
 for(var w=0;w<aWords.length;w++){
  var word=aWords[w];
  if(!word.length) continue;                  // skip empty words caused by double spaces
  var spnSpace=null;
  if(w>0){
   spnSpace=getSVG(null,'tspan');
   spnSpace.textContent=' ';
   spnSpace.style.fontSize='28px';
   txt.appendChild(spnSpace);
  }
  // add the word letter by letter — measure in the final state
  var aWordTspans=[];
  for(var i=0;i<word.length;i++){
   var chr=word.charAt(i);
   var spn=getSVG(null,'tspan');
   spn.chr=chr;
   spn.textContent=chr;
   spn.style.fontSize='28px';
   txt.appendChild(spn);
   aWordTspans.push(spn);
  }
  // try-on without temp elements: measured what is already in place
  if(w>0 && txt.getBBox().width>350){
   if(spnSpace) txt.removeChild(spnSpace);    // remove a dangling space from the previous line
   c++;
   txt=getTxt('',G_phrase.gInner,0,30*c,'#fff','start');
   for(var k=0;k<aWordTspans.length;k++) txt.appendChild(aWordTspans[k]); // the same tspans move over
  }
 }
 // all lines assembled: letters -> dots (except letters already pressed by the player)
 var aText=G_phrase.gInner.getElementsByTagName('text');
 for(var j=0;j<aText.length;j++){
  var tspans=aText[j].getElementsByTagName('tspan');
  for(var i=0;i<tspans.length;i++){
   var spn=tspans[i];
   if(spn.chr===undefined) continue;   // skip spaces and service tspans
   if(isInArray(spn.chr.toLowerCase(),A_char)===true &&
      isInArray(spn.chr.toLowerCase(),A_pressed)===false) spn.textContent='•';
  }
 }
 requestAnimationFrame(function(){
  stopSpin();
  centerPhrase();
  if(bNoAnim){ // restored mid-round: the phrase is shown as is, without any flight
   G_phrase.gInner.style.visibility='visible';
   var aText=G_phrase.gInner.getElementsByTagName('text');
   for(var j=0;j<aText.length;j++){
    var tspans=aText[j].getElementsByTagName('tspan');
    for(var i=0;i<tspans.length;i++){
     if(!tspans[i].textContent || !tspans[i].textContent.trim()) continue; // spaces stay untouched
     tspans[i].removeAttribute('dx');
     tspans[i].removeAttribute('dy');
     if(tspans[i].chr!==undefined){
      tspans[i].removeAttribute('x');      // drop the pinned coordinates
      tspans[i].removeAttribute('y');
      tspans[i].setAttribute('fill','#000');
     }
    }
   }
   IMG_JawOpen.style.visibility='hidden';

   if(isInArray(N_curr_phrase,A_guessed)){   // win: bring the author line back, like wonGame does
    var txtAuthor=getTxt(S_who,G_phrase.gInner,350,30*aText.length,'url(#grdPale)','end');
    txtAuthor.style.fontSize='28px';
    for(var i=0;i<aText.length;i++) aText[i].style.fontStyle='italic';
   }
   centerPhrase();   // the author changed the bbox — center everything together

   IS_lock=!!bStayLocked;   // после завершённого раунда панель заблокирована до "дальше"
   return;
  }

  // flight coordinates — measured on the dots in their final positions
  var letterIndex=0;
  var aText=G_phrase.gInner.getElementsByTagName('text');
  for(var j=0;j<aText.length;j++){
   var txtPhrase=aText[j];
   var ptJaw=transformPointBetweenElements(SVG_arena,txtPhrase,233,243);
   var tspans=txtPhrase.getElementsByTagName('tspan');
   // 1st loop : measuring only, no moving
   var positions=[];
   for(var i=0;i<tspans.length;i++){
    var str=tspans[i].textContent;
    if(!str || !str.trim()){positions[i]=null;continue;}
    positions[i]=tspans[i].getStartPositionOfChar(0);
   }
   // 2nd loop : setting dx/dy and starting the animation
   for(var i=0;i<tspans.length;i++){
    if(!positions[i]) continue;
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
    letterIndex++;
   }
  }
  // everything is ready — show and launch
  G_phrase.gInner.style.visibility='visible';
 });
}
// ***** run.js : animate the phrase as if the letters fly along
function animPhrase(unt,nSpeed,fAnimEnd){
 if(unt.dX==0 && unt.dY==0){  // the letter is already at its target — no 0/0 math
  unt.onAnimEnd=fAnimEnd;
  unt.onAnimEnd();
  return;
 }
 if(unt.dX==0) unt.k=0;
 else unt.k=(unt.dY-0)/(unt.dX-0);
 unt.b=unt.dY-unt.k*unt.dX;
 if(unt.dX!=0) unt.dstX=(0-unt.dX)/Math.abs(0-unt.dX);
 if(unt.dY!=0) unt.dstY=(0-unt.dY)/Math.abs(0-unt.dY);
 if(Math.abs(0-unt.dX)>=Math.abs(0-unt.dY)) unt.isMoveX=true;
 else unt.isMoveX=false;
 unt.nSpeed=nSpeed;        // pixels per SECOND now, not per frame
 unt.lastT=null;           // time of the previous tick, filled on the first one
 unt.onAnimEnd=fAnimEnd;
 exeAnim(unt);
}
function exeAnim(unt){
 var now=performance.now();
 if(unt.lastT===null) unt.lastT=now;
 var dt=(now-unt.lastT)/1000;   // seconds elapsed since the previous tick
 unt.lastT=now;
 var move=unt.nSpeed*dt;        // how many pixels to cover in this frame
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
 var txtButton=$$('text',this);
 if(!IS_lock && txtButton.textContent!='•'){
  var isWrongGuess=true;
  txtButton.textContent='•';
  A_pressed.push(this.chr);          // remember the press — successful or not
  var aText=G_phrase.gInner.getElementsByTagName('text');
  var isWon=true;
  for(var i=0;i<aText.length;i++){
   var txt=aText[i];
   var aSpan=txt.getElementsByTagName('tspan');
   for(var j=0;j<aSpan.length;j++){
    var spn=aSpan[j];
    if(spn.textContent=='•'){
     if(this.chr==spn.chr.toLowerCase()){
      isWrongGuess=false;
      spn.textContent=spn.chr;
      spn.style.fontSize='28px';
     }
     else isWon=false;
    }
   }
  }
  if(isWrongGuess) wrongGuess(0,true,undefined);   // saveState is done by wrongGuess after the effort is spent
  else{
   normalizePhrase();
   saveState();
   if(isWon) wonGame(0,true);
  }
 }
}
// ***** run.js : wrong guess
function wrongGuess(c,isSet,spnEfforts){
 if(isSet){
  IS_lock=true;
  switch (N_efforts){
   case 3:var pos=0;break;
   case 2:var pos=1;break;
   case 1:var pos=2;break;
  }
  spnEfforts=$$('tspan',$$('text','gEfforts'),pos);
  N_efforts--;
  if(N_score>0) N_score--;
  putScore();
  saveState();   // stored AFTER the effort is spent, so it won't "come back" after a reload
 }
 if(c%2==0){
  IMG_RedEyes.style.visibility='visible';
  spnEfforts.setAttribute('fill','#ffcccb');
 }
 else{
  IMG_RedEyes.style.visibility='hidden';
  spnEfforts.setAttribute('fill','#000');
 }
 c++;
 if(c<6) setTimeout(function(){wrongGuess(c,false,spnEfforts);},200);
 else{
  spnEfforts.setAttribute('fill','#c0c0c0');
  if(N_efforts==0) lostGame(0,true);
  else IS_lock=false;
 }
}
// ***** run.js : winning a phrase
function wonGame(c,isSet){
 if(isSet){
  IS_lock=true;
  $$('text','gScore').setAttribute('fill','lightgreen');
  IMG_JawOpen.style.visibility='visible';
  // commit the win IMMEDIATELY, before any flash — so a refresh during
  // the animation restores the round as finished, with the button
  N_score+=3;
  putScore();
  A_guessed.push(N_curr_phrase);
  A_unguessed=spliceArrayByMatches(A_unguessed,[N_curr_phrase]);
  saveState();
 }
 c++;
 if(c<4){setTimeout(function(){wonGame(c,false);},400);}
 else{
  IMG_JawOpen.style.visibility='hidden';
  var aText=G_phrase.gInner.getElementsByTagName('text');
  var txt=getTxt(S_who,G_phrase.gInner,350,30*aText.length,'url(#grdPale)','end');
  txt.style.fontSize='28px';
  for(var i=0;i<aText.length;i++) aText[i].style.fontStyle='italic';
  $$('text','gScore').setAttribute('fill','#000');
  centerPhrase();
  showG('btnNext');
 }
}

// ***** run.js : losing a phrase
function lostGame(c,isSet){
 if(isSet){
  IS_lock=true;
 }
 if(c%2==0){
  IMG_RedEyesJawOpen.style.visibility='visible';
 }
 else{
  IMG_RedEyesJawOpen.style.visibility='hidden';
 }
 c++;
 if(c<10) setTimeout(function(){lostGame(c,false);},100);
 else{
  showG('btnNext');
 }
}
// ***** run.js : show the score as three digits
function putScore(){
 var sScore='';
 if(N_score<10) sScore='00'+N_score;
 else if(N_score<100) sScore='0'+N_score;
 else sScore=N_score+'';
 $$('text','gScore').textContent=sScore;
}
// ***** run.js : write the whole game state to localStorage
function saveState(){
 setLocal('afor_state',JSON.stringify({
  score:N_score,
  efforts:N_efforts,
  phrase:N_curr_phrase,
  pressed:A_pressed,
  guessed:A_guessed
 }));
}
// ***** run.js : restore the state or start fresh
function putState(){
 var sState=getLocal('afor_state','');
 var aState=null;
 if(sState!==''){
  try{ aState=JSON.parse(sState); }catch(e){ aState=null; }
 }
 if(aState===null){ run(); return; }

 N_score=aState.score||0;
 putScore();
 N_efforts=(aState.efforts===undefined)?3:aState.efforts;
 A_pressed=aState.pressed||[];
 A_guessed=aState.guessed||[];

 // rebuild the phrase pool from the stored list of guessed phrases — the single source of truth
 A_unguessed=[];
 for(var i=0;i<=N_max_phrase;i++) A_unguessed.push(i+'');
 A_unguessed=spliceArrayByMatches(A_unguessed,A_guessed);

 // pressed letters — shown as dots on the pad (both hits and misses)
 var arrG=$('gCharPad').getElementsByTagName('g');
 for(var i=0;i<arrG.length;i++){
  if(isInArray(arrG[i].chr,A_pressed)) $$('text',arrG[i]).textContent='•';
 }

 // efforts: used ones (from the left) are gray, the rest are black
 var aSpan=$$('text','gEfforts').getElementsByTagName('tspan');
 for(var i=0;i<aSpan.length;i++){
  aSpan[i].setAttribute('fill', i < (3 - N_efforts) ? '#c0c0c0' : '#000');
 }

 N_curr_phrase=aState.phrase+'';
 if(isInArray(N_curr_phrase,A_guessed) || N_efforts==0){
  IS_lock=false;
  reqPhrase(aState.phrase,true,true);
  showG('btnNext');
  return;
 }
 IS_lock=false;
 reqPhrase(aState.phrase,true);

}
// ***** run.js : remove the leftovers so the line can be laid out again
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
 centerPhrase();
}
// ***** run.js : center the phrase by its actual contents
function centerPhrase(){
 var bb=G_phrase.gInner.getBBox();
 var xText=G_phrase.w/2-bb.width/2-bb.x;
 var yText=G_phrase.h/2-bb.height/2-bb.y;
 G_phrase.gInner.setAttribute('transform','translate('+xText+','+yText+')');
 G_phrase.gInner.xPos=xText;
 G_phrase.gInner.yPos=yText;
}

