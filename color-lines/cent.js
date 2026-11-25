G.nCent=0;
G.nCentMax=0;
G.isAnmCent=false;
G.rctCent,G.rctCentMax;

G.getCent=function(gRoot){
 this.rctCentMax=getRct(gRoot,0,0,0,22,0,'#eee8aa','none',0);
 this.rctCent=getRct(gRoot,0,0,0,22,0,'#bdb76d','none',0);
 this.pthCent=getPth(gRoot,370,2.75,0.215,'#bdb76d','none',0,'M 16.65 0 C 14.28 0 12.08 0.42 10.05 1.26 C 8.03 2.09 6.25 3.35 4.71 5.03 C 3.25 6.63 2.09 8.62 1.26 11 C 0.42 13.37 0 16.13 0 19.27 C 0 22.41 0.42 25.17 1.26 27.54 C 2.09 29.91 3.25 31.94 4.71 33.61 C 6.25 35.22 8.03 36.44 10.05 37.28 C 12.08 38.12 14.28 38.54 16.65 38.54 C 19.02 38.54 21.22 38.12 23.25 37.28 C 25.27 36.44 27.02 35.22 28.48 33.61 C 30.02 31.94 31.21 29.91 32.04 27.54 C 32.88 25.17 33.3 22.41 33.3 19.27 C 33.3 16.13 32.88 13.37 32.04 11 C 31.21 8.62 30.02 6.63 28.48 5.03 C 27.02 3.35 25.27 2.09 23.25 1.26 C 21.22 0.42 19.02 -0 16.65 0 z M 55.39 1.57 L 14.45 74.14 L 23.98 74.14 L 64.92 1.57 L 55.39 1.57 z M 16.65 7.23 C 19.37 7.23 21.47 8.31 22.93 10.47 C 24.4 12.57 25.13 15.5 25.13 19.27 C 25.13 23.04 24.4 26 22.93 28.17 C 21.47 30.26 19.37 31.31 16.65 31.31 C 13.93 31.31 11.83 30.26 10.37 28.17 C 8.9 26 8.17 23.04 8.17 19.27 C 8.17 15.5 8.9 12.57 10.37 10.47 C 11.83 8.31 13.93 7.23 16.65 7.23 z M 62.72 37.17 C 60.35 37.17 58.15 37.59 56.13 38.43 C 54.1 39.27 52.32 40.53 50.79 42.2 C 49.32 43.81 48.17 45.8 47.33 48.17 C 46.49 50.54 46.08 53.3 46.08 56.44 C 46.08 59.58 46.49 62.34 47.33 64.71 C 48.17 67.09 49.32 69.11 50.79 70.79 C 52.32 72.39 54.1 73.62 56.13 74.45 C 58.15 75.29 60.35 75.71 62.72 75.71 C 65.1 75.71 67.3 75.29 69.32 74.45 C 71.35 73.62 73.09 72.39 74.56 70.79 C 76.09 69.11 77.28 67.09 78.12 64.71 C 78.96 62.34 79.38 59.58 79.38 56.44 C 79.38 53.3 78.96 50.54 78.12 48.17 C 77.28 45.8 76.09 43.81 74.56 42.2 C 73.09 40.53 71.35 39.27 69.32 38.43 C 67.3 37.59 65.1 37.17 62.72 37.17 z M 62.72 44.4 C 65.45 44.4 67.54 45.48 69.01 47.65 C 70.47 49.74 71.21 52.67 71.21 56.44 C 71.21 60.21 70.47 63.18 69.01 65.34 C 67.54 67.44 65.45 68.48 62.72 68.48 C 60 68.48 57.91 67.44 56.44 65.34 C 54.98 63.18 54.24 60.21 54.24 56.44 C 54.24 52.67 54.98 49.74 56.44 47.65 C 57.91 45.48 60 44.4 62.72 44.4 z');
 this.gCentMaxTXT=getG(gRoot,0,3,1,true);
 this.gCentMaxTXT.aPth=new Array();
 for(var i=0;i<3;i++){
  var pth=getPth(this.gCentMaxTXT,0,0,0,'#bdb76d','none',0,'');
  this.gCentMaxTXT.aPth.push(pth);
 }
 this.gCentTXT=getG(gRoot,0,3,1,true);
 this.gCentTXT.aPth=new Array();
 for(var i=0;i<3;i++){
  var pth=getPth(this.gCentTXT,0,0,0,'#fff','none',0,'');
  this.gCentTXT.aPth.push(pth);
 }
}

G.drawCent=function(elem,num){
 var z=0.5;
 var m=2;
 var str=num+'';
 if(str.length==2) str='x'+str;
 else if(str.length==1) str='xx'+str;
 for(var i=0;i<str.length;i++){
  var pth=elem.aPth[i];
  var chr=str.charAt(i);
  if(chr=='x') pth.setAttribute('d','');
  else pth.setAttribute('d',comicnum(chr));
  pth.w=pth.getBBox().width*z;
  if(i>0){
   pth.x=elem.aPth[i-1].x+elem.aPth[i-1].w+m;
  }
  pth.setAttribute('transform','translate('+pth.x+',0) scale('+z+')');
  elem.w=elem.getBBox().width;
  if(elem==this.gCentTXT) var x=this.rctCent.getAttribute('width')*1-elem.w-8;
  else if(elem==this.gCentMaxTXT){
   var wA=this.rctCent.getAttribute('width')*1;
   var nDir=1;
   var wCent=wA+1*nDir;
   var xMaxA=wCent;
   var x=xMaxA+5;
  }
  jumpG(elem,x,elem.y);
 }
}

G.setCent=function(){
 var qtyUnit=0;
 for(var i in this.aPosOpen){
  var pos=this.aPosOpen[i];
  var squ=this.aSqu[pos];
  if(squ.unt!==null) qtyUnit++;
 }
 this.nCent=Math.round(100/(81/qtyUnit));
 if(this.isAnmCent===false){
  this.isAnmCent=true;
  this.anmCent();
 }
}

G.anmCent=function(){
 var nStep=390/100;
 var wA=this.rctCent.getAttribute('width')*1;
 var wB=this.nCent*nStep;
 var nDif=Math.round(wB-wA);
 if(nDif==0){
  this.isAnmCent=false;
  if(this.nCent>this.nCentMax) this.nCentMax=this.nCent;
 }
 else{
  var nDir=1;
  if(nDif<0) nDir=-1
  var wCent=wA+1*nDir;
  this.rctCent.setAttribute('width',wCent);
  var nCent=Math.round(wA/(nStep)*1);
  var xMaxA=wCent;
  var xMaxB=this.nCentMax*nStep;
  var wMax=xMaxB-xMaxA;
  this.rctCentMax.setAttribute('x',xMaxA);
  if(wMax<0) wMax=0;
  this.rctCentMax.setAttribute('width',wMax);
  //
  this.drawCent(this.gCentTXT,nCent);
  if(nCent<this.nCentMax){
   for(var i=0;i<3;i++) this.gCentTXT.aPth[i].setAttribute('fill','#fff');	
  }
  else{
   for(var i=0;i<3;i++) this.gCentTXT.aPth[i].setAttribute('fill','transparent');	
   this.drawCent(this.gCentMaxTXT,nCent);
  }
  var maxCent=86;
  if(nCent>maxCent || this.nCentMax>maxCent){
   for(var i=0;i<3;i++) this.gCentTXT.aPth[i].setAttribute('fill','#fff');	
   for(var i=0;i<3;i++) this.gCentMaxTXT.aPth[i].setAttribute('fill','transparent');	
   this.pthCent.setAttribute('fill','transparent');	
  }
  requestAnimationFrame(function(){$('G_LINES').anmCent();});
 } 
}
