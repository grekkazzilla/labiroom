function won(nWon){
 if(nWon==2) var numUp=5;
 else var numUp=0;
 hideG('btnReShuffle');
 hideG('btnLost');
 if($('btnThink').isOn===true) hideG('btnThink');
 showG('btnWon');
 setLocal('master_state','none');
 N_score+=numUp*1;
 if(N_score<1000){
  putScore();
  setLocal('master_score',N_score);
 }
 // hide shirt and buttons
 //jumpG('gCaption',0,-200);
 hideG('gShirt');
 hideG('btnMoveBack');
 hideG('btnEnd');
 // score view
 jumpG(G_score,G_score.x,935);
 $$('rect',G_score).setAttribute('fill','transparent');
 $$('rect',G_score).setAttribute('stroke','lightgreen');
 $$('rect',G_score).setAttribute('stroke-width','5');
 $$('path',G_score,0).setAttribute('fill','lightgreen');
 $$('path',G_score,1).setAttribute('fill','lightgreen');
 $$('path',G_score,2).setAttribute('fill','lightgreen');
 // hide the cellar border and borders of all other empty playable spots
 var arr=[52,0,1,10,11,20,21,30,31];
 for(var i in arr) $$('rect',A_spot[arr[i]]).setAttribute('stroke-width',0);
 //	
 var nCorrect=-90;
 var x0=W/2;
 var y0=2125;
 for(var i=0;i<13;i++){
  for(var j=0;j<4;j++){
   var nDegStart=-15-j*2;
   var nPath=nDegStart*-2;
   var d=nPath/12;
   nDegStartCorrected=nDegStart+nCorrect;
   var nDeg=nDegStartCorrected*1+i*d;
   var nRad=getRadFromDeg(nDeg);
   var nRadius=2000-j*125;
   var x=nRadius*Math.cos(nRad)+x0;	
   var y=nRadius*Math.sin(nRad)+y0;	
   var unt=A_spot[48+j].aUnit[12-i];
   if(i==12 && j==3) unt.isLast=true;
   else unt.isLast=false;
   unt.x1=x-unt.w/2;
   unt.y1=y-unt.h/2+95*j;
   unt.r=nDegStart+(Math.abs(nDegStart)*2)/12*i;
   animate(unt,50,function(){
    this.setAttribute('transform','translate('+this.x+','+this.y+') rotate('+this.r+','+this.w/2+','+this.h/2+')');
    this.r=0;
    if(this.isLast===true){
     popBx('bxEnd');
     ARN.appendChild($('bxEnd'));
     IS_lock=false; 
     ifWonMax();
    }
   });
  }
 }
} // *******************************************************************************************
function getRadFromDeg(nDeg){
 return (3.14*nDeg)/180;
} // *******************************************************************************************
function ifWonMax(){
 if(N_score>999){
  setLocal('master_score','0');
  for(var i in A_unit) hideG(A_unit[i]);
  hideG(G_score);
  if($('bxEnd').isOn===true) popBx('bxEnd');
  spin();
  getAsync('laurel.txt','',function(){
   G_spin.isOn=false; 
   var picMaxWon=getPic('picMaxWon',ARN,0,0,W,H,[12,'lightgreen','none',0],['transparent','none',0,0],true,XHR.responseText);
   var pth=getPth(picMaxWon,null,260,0.7,'#e1cf20','none',0,'M 256 0 C 251.41 0 246.83 1.89 244 5.67 L 154 125.67 C 150.59 130.21 150.05 136.29 152.58 141.37 C 155.13 146.46 160.31 149.66 166 149.66 C 190.81 149.66 211 169.85 211 194.66 C 211 219.48 190.81 239.66 166 239.66 C 139.24 239.66 115.46 214.88 122.17 184.82 C 123.78 177.63 119.92 170.32 113.06 167.61 C 83.43 155.87 48.87 149.66 15 149.66 C 9.46 149.66 4.38 152.71 1.77 157.59 C -0.84 162.47 -0.54 168.38 2.52 172.98 C 23.45 203.74 41.11 234.38 51.02 269.67 L 106 269.67 C 114.29 269.67 121 276.38 121 284.67 C 121 292.96 114.29 299.67 106 299.67 L 57.46 299.67 C 59.67 313.8 61 328.63 61 344.67 C 61 352.96 67.71 359.65 76 359.65 L 256 359.65 C 231.19 359.65 211 339.48 211 314.67 C 211 289.85 231.19 269.67 256 269.67 C 280.81 269.67 301 289.85 301 314.67 C 301 339.48 280.81 359.65 256 359.65 L 436 359.65 C 444.29 359.65 451 352.96 451 344.67 C 451 328.81 452.31 313.93 454.59 299.67 L 406 299.67 C 397.71 299.67 391 292.96 391 284.67 C 391 276.38 397.71 269.67 406 269.67 L 461.22 269.67 C 471 235.15 488.3 204.1 509.48 172.98 C 512.54 168.38 512.83 162.47 510.23 157.59 C 507.62 152.71 502.54 149.66 497 149.66 C 463.13 149.66 428.57 155.87 398.94 167.61 C 392.08 170.32 388.21 177.63 389.83 184.84 C 396.61 215.19 372.75 239.66 346 239.66 C 321.18 239.66 301 219.48 301 194.66 C 301 169.85 321.18 149.66 346 149.66 C 351.68 149.66 356.87 146.46 359.42 141.37 C 361.95 136.29 361.41 130.21 358 125.67 L 268 5.67 C 265.17 1.89 260.58 0 256 0 z M 256 299.66 A 15 15 0 0 0 241 314.66 A 15 15 0 0 0 256 329.66 A 15 15 0 0 0 271 314.66 A 15 15 0 0 0 256 299.66 z');
   midG(pth);
   var pic999=getG(picMaxWon,null,590,3,true);
   var data='M 10.91 0 C 7.79 0 5.29 0.76 3.37 2.31 C 1.14 4.14 0 6.87 0 10.5 C 0 13.57 1.09 15.96 3.28 17.62 C 5.08 18.99 7.23 19.66 9.69 19.66 C 10.4 19.66 11.32 19.48 12.47 19.12 C 13.61 18.77 14.55 18.42 15.28 18 L 14.44 19.66 C 13.47 21.62 12.42 23.15 11.25 24.22 C 10.08 25.29 8.46 26.24 6.44 27.06 L 3.19 28.16 C 2.3 28.55 1.87 29.14 1.87 29.91 C 1.87 30.43 2.03 30.89 2.38 31.28 C 2.72 31.67 3.15 31.84 3.69 31.84 C 4.6 31.84 6.23 31.31 8.56 30.19 C 10.66 29.2 12.17 28.33 13.12 27.63 C 15.4 25.93 17.2 23.42 18.53 20.06 C 19.77 16.95 20.39 13.74 20.37 10.44 C 20.36 7.51 19.35 5.01 17.34 2.94 C 15.44 0.98 13.3 0 10.91 0 z M 10.34 3.34 C 11.75 3.34 13.14 4.11 14.5 5.66 C 15.86 7.21 16.55 8.81 16.56 10.44 C 16.56 11.1 16.48 11.99 16.31 13.12 C 14.96 14.13 14.02 14.78 13.5 15.06 C 12.37 15.69 11.29 16 10.25 16 C 8.45 16 6.97 15.52 5.78 14.59 C 4.44 13.54 3.75 12.07 3.75 10.16 C 3.76 7.88 4.34 6.16 5.44 5.03 C 6.54 3.9 8.16 3.34 10.34 3.34 z';
   for(var i=0;i<3;i++){
    getPth(pic999,25*i,0,1,'#c0c0c0','none',0,data);
   }
   midG(pic999);
   return true;
  });
 }
 else return false;
}
