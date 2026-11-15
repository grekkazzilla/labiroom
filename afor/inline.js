const W=766;
const H=386;
//
const BTN_fs=document.getElementById('btnFS');
//
const SVG_arena=document.getElementById('svgArena');
SVG_arena.setAttribute('viewBox', '0 0 '+W+' '+H);
SVG_arena.style.maxWidth=W+'px';
SVG_arena.style.maxHeight=H+'px';
// pale gradient
const DFS=document.createElementNS('http://www.w3.org/2000/svg','defs');
var grd=document.createElementNS('http://www.w3.org/2000/svg','linearGradient');
grd.setAttribute('id','grdPic');
grd.setAttribute('x1','0');
grd.setAttribute('y1','0');
grd.setAttribute('x2','0');
grd.setAttribute('y2','1');
var stp=document.createElementNS('http://www.w3.org/2000/svg','stop');
stp.setAttribute('offset', '0%');
stp.setAttribute('stop-color', '#a0a0a0');
stp.setAttribute('stop-opacity', '1');
grd.appendChild(stp);
var stp=document.createElementNS('http://www.w3.org/2000/svg','stop');
stp.setAttribute('offset','100%');
stp.setAttribute('stop-color','#000');
stp.setAttribute('stop-opacity','1');
grd.appendChild(stp);
DFS.appendChild(grd);
SVG_arena.appendChild(DFS);
// load spin
const G_spin=document.createElementNS('http://www.w3.org/2000/svg','g');
var pth=document.createElementNS('http://www.w3.org/2000/svg','path');
G_spin.appendChild(pth);
var clr='url(#grdPic)';
SVG_arena.appendChild(G_spin);
pth.setAttribute('fill',clr);
pth.setAttribute('stroke',clr);
pth.setAttribute('stroke-width',3);
pth.setAttribute('d','M 49.2 0 C 48.5 -0 48 0 47.3 0 C 31.3 0.4 15.7 8.2 6.8 22.8 C -6 43.5 -0.3 72 20.8 84.8 C 39.4 96 64.9 90.9 76.2 71.8 C 86 55.3 81.4 32.7 64.4 22.9 C 50 14.6 30.4 18.7 22.1 33.6 C 15.2 46 18.8 62.6 31.7 69.5 C 41.9 74.9 55.7 71.7 61 60.9 C 64.9 52.8 62.3 41.9 53.6 38.2 C 50.6 36.9 47.1 36.8 44 37.9 C 41 38.9 38.4 41.2 37.3 44.5 C 36.8 46.4 36.9 48.8 37.8 50.7 C 38.6 52.6 40.3 54.1 42.7 54.2 A 0.5 0.5 0 0 0 42.8 53.2 C 40.8 53.1 39.5 51.9 38.7 50.2 C 37.9 48.6 37.8 46.5 38.3 44.8 C 39.2 41.8 41.5 39.8 44.3 38.8 C 47.1 37.8 50.4 38 53.2 39.1 C 61.3 42.6 63.8 52.9 60.1 60.5 C 55 70.8 41.9 73.7 32.1 68.6 C 19.8 62 16.3 46 22.9 34.1 C 31 19.7 50 15.7 63.9 23.8 C 80.4 33.3 84.9 55.3 75.4 71.3 C 64.4 89.9 39.5 94.9 21.3 83.9 C 0.7 71.4 -4.9 43.5 7.6 23.3 C 21.6 0.6 52.4 -5.5 74.8 8.4 C 99.6 23.9 106.1 57.7 90.7 82.1 C 90.1 83.1 89.5 84.1 88.8 85 A 0.5 0.5 0 1 0 89.6 85.6 C 90.3 84.7 91 83.7 91.6 82.7 C 107.3 57.8 100.6 23.4 75.3 7.6 C 67.3 2.6 58.2 0.1 49.2 0 z');
G_spin.isOn=true;
G_spin.z=1;
G_spin.w=G_spin.getBBox().width*G_spin.z;
G_spin.h=G_spin.getBBox().height*G_spin.z;
G_spin.x=W/2-G_spin.w/2;
G_spin.y=H/2-G_spin.h/2;
G_spin.setAttribute('transform','translate('+G_spin.x+','+G_spin.y+') scale('+G_spin.z+')');
//
function animSpin(isReset){
 if(isReset){
  G_spin.r=0;
  G_spin.isOn=true;
  G_spin.nLastTime=performance.now();
 }
 const nCurrTime=performance.now();
 const nDiff=(nCurrTime-G_spin.nLastTime)/1000;
 G_spin.nLastTime=nCurrTime;
 G_spin.r+=175*nDiff;
 G_spin.setAttribute('transform','translate('+G_spin.x+','+G_spin.y+') rotate('+G_spin.r+','+(G_spin.w/2)+','+(G_spin.h/2)+') scale('+G_spin.z+')');
 if(G_spin.isOn===true){
  requestAnimationFrame(function(){animSpin(false);});
 }
 else{
  G_spin.setAttribute('transform','scale(0)');
 }
}
function stopSpin(){G_spin.isOn=false;}
animSpin(true);
//
const A_display=[
 document.getElementsByTagName('h1')[0],
 document.getElementsByTagName('header')[0],
 document.getElementsByTagName('footer')[0],
 ...document.querySelectorAll('h2,p')
].filter(el=>el!==undefined);
//
BTN_fs.addEventListener('click',()=>{
 const elem=document.documentElement;
 if (elem.requestFullscreen) {
  elem.requestFullscreen();
 }
 else if(elem.webkitRequestFullscreen){
  elem.webkitRequestFullscreen();
 }
 else if(elem.msRequestFullscreen){
  elem.msRequestFullscreen();
 }
 window.scrollTo({top:0,behavior:'auto'});
});
//
document.addEventListener('fullscreenchange',()=>{
 if (document.fullscreenElement) {
  A_display.forEach(el=>{if(el)el.style.display='none'});
  SVG_arena.classList.add('svg-fullscreen-centered');
  document.body.style.height='95vh';
  document.body.style.background='radial-gradient(white 0%, white 50%, #eee8aa 100%)';
 }
 else {
  A_display.forEach(el=>{if(el)el.style.display=''});
  SVG_arena.classList.remove('svg-fullscreen-centered');
  SVG_arena.style.maxWidth=W+'px';
  SVG_arena.style.maxHeight=H+'px';
  document.body.style.height='';
  document.body.style.background='';
 }
});
