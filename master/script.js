function getRnd(min,max){return Math.floor(Math.random()*(max-min+1))+min;}
function shuffle(array) {
  var currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function isTouch(){return ('ontouchstart' in window);}
function $(s){return document.getElementById(s);}
function $$(s,root,num){
 if(typeof root=='string') root=$(root);
 if(num===undefined) num=0;
 return root.getElementsByTagName(s)[num];}
function $txt(g,str,num){
 if(num===undefined) num=0;
 g.getElementsByTagName('text')[num].firstChild.nodeValue=str;}

function getTest(){
 var dv=document.createElement('div');
 dv.id='dvTest';
 $('dvRoot').appendChild(dv);
 dv.style.position='absolute';
 dv.style.left='0';
 dv.style.right='0';
 dv.style.width='100%';
 dv.style.height='50px';
 dv.style.backgroundColor='#fff';
 dv.style.zIndex='100';
 for(var i=0;i<5;i++){
  var p=document.createElement('p');
  if(i==0) p.innerHTML='test';
  dv.appendChild(p);}
 dv.style.fontSize='25px';
 dv.style.fontFamily='Courier';
}

function ttt(msg){console.log(msg);}
function tst(str_00,str_01,str_02,str_03,str_04){
 var dv=$('dvTest');
 if(dv===null) alert('test div not found!');
 var arrP=dv.getElementsByTagName('p');
 arrP[0].innerHTML=str_00;
 if(str_01!==undefined) arrP[1].innerHTML=str_01;
 if(str_02!==undefined) arrP[2].innerHTML=str_02;
 if(str_03!==undefined) arrP[3].innerHTML=str_03;
 if(str_04!==undefined) arrP[4].innerHTML=str_04;
}

function rndStr(qty){
 var sFrom='qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890';
 var sRand='';
 while(sRand.length<qty) sRand+=sFrom.charAt(getRnd(0,sFrom.length));
 return sRand;}

function isInArray(e,arr){for(var i in arr) if(e==arr[i]) return true;return false;}

function isLocal(){ // if local storage available
 try {return 'localStorage' in window && window['localStorage'] !== null;}
 catch(e) {return false;}
}
function getLocal(storage_name, default_value){
 if(isLocal()===true){
  var val=localStorage.getItem(storage_name);
  if(val===false || val===undefined || val===null) return default_value;
  else if(val=='true') return true;
  else if(val=='false') return false;
  else return val;
 }
 else return default_value;
}
function setLocal(storage_name,stored_value){
 if(isLocal()===true){
  if(stored_value===true) stored_value='true';
  else if(stored_value===false) stored_value='false';
  localStorage.setItem(storage_name,stored_value);
  return true;
 }
 else return false;
}

// ***************** //

function appendScript(str){
  var head=document.getElementsByTagName('head')[0];
  var script=document.createElement('script');
  script.innerHTML=str;
  head.appendChild(script);
}

// ***** ASYNC ***** //

var XHR=new XMLHttpRequest();
XHR.run=null;

function getAsync(doc,param,run){
 XHR.run=run;
 XHR.open('POST',doc,true);
 XHR.onreadystatechange=XHR.check;
 XHR.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
 XHR.send(param);}

XHR.check=function(){
 if(this.readyState==4){
  if(this.status==200){
   if(this.run!==null){
    this.run();
   }
  }
 }
}

// ***************** //
