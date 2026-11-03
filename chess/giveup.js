function getGiveUp(){
 // ******* GIVEUP BUTTON *******************
 var btn=getBtn(G_CHESS,360,550,40,40,'abxx',[['',0,null]],function(){
  popBx('bxGiveUp');
  var bx=$('bxGiveUp');
  bx.anim(undefined,0,bx);
 },null,false,'btnStop');
 getCrl(btn,20,20,8,'transparent','url(#grdPale)',2);
 btn.aOn.push(['circle',0,'stroke','url(#grdPale)','#fff']);
 // ******* GIVEUP BOX **********************
 var bx=getBox(null,null,[60,40,1,1,10],10,null,false,G_CHESS,'bxGiveUp');
 var zPic=0.085;
 var dataPic='M 174.29883 0.001953125 C 121.87993 -0.41247688 86.155553 51.110012 32.623047 47.232422 C 28.262379 46.695092 25.460722 48.967201 26.525391 52.894531 C 36.354061 89.175881 46.106332 125.47893 56.013672 161.73828 C 57.603672 167.55761 61.604797 169.76083 65.966797 170.29883 C 121.22481 174.3015 157.51146 119.27272 212.77148 123.27539 C 217.13149 123.81139 219.93186 121.54128 218.86719 117.61328 C 209.04119 81.331258 199.20496 45.051541 189.37695 8.7695312 C 188.31162 4.8421913 186.44383 0.63031438 179.42383 0.20898438 C 177.69699 0.083914375 175.98976 0.015323125 174.29883 0.001953125 z M 9.6132812 43.652344 C 9.3483373 43.641439 9.0824225 43.641933 8.8144531 43.654297 C 8.2019511 43.682597 7.5823438 43.773438 6.9648438 43.929688 C 2.0228418 45.182347 -0.96684375 50.203191 0.28515625 55.144531 L 60.578125 293.03711 C 61.637455 297.21778 65.394248 300 69.517578 300 C 70.268918 300 71.031639 299.90749 71.792969 299.71484 C 76.732309 298.4635 79.722703 293.44195 78.470703 288.50195 L 18.177734 50.607422 C 17.15125 46.555069 13.587441 43.815916 9.6132812 43.652344 z';
 var btn=getBtn(bx,bx.x0,bx.y0,bx.w1,bx.h1,'bbax',[[dataPic,zPic,[0,0]]],function(){
  G_CHESS.giveUp();
 },null,true,'btnGiveUp');
 bx.pth=$$('path',btn,0);
 bx.pth.w=bx.pth.getBBox().width*zPic;
 bx.pth.h=bx.pth.getBBox().height*zPic;
 bx.pth.z=zPic;
 bx.isAnm=false;
 bx.g=getG(btn,btn.w/2-bx.pth.w/2,btn.h/2-bx.pth.h/2,1,true);
 bx.g.w=bx.pth.w;
 bx.g.h=bx.pth.h;
 getRct(bx.g,0,0,bx.pth.w,bx.pth.h,0,'transparent','red',0);
 bx.g.appendChild(bx.pth);
 // ******* BOX ANIMATION *******************
 bx.anim=function(pnt,deg,eThis){
  if(pnt===undefined){
   this.pth.setAttribute('transform','translate(0,0) scale('+this.pth.z+')');
   pnt=-1;
   this.mult=1;
  }  
  if(pnt==-1){
   if(deg>=35){
    this.mult+=0.1; 
    if(this.mult>1) this.mult=1;
    this.pth.setAttribute('transform','translate('+(this.pth.w-this.pth.w*this.mult)/2+',0) scale('+(this.pth.z*this.mult)+','+this.pth.z+')');
   }
   else if(deg<=-45){
    pnt=1;
    this.mult=1;
   }
   else if(deg<=-35){
    this.mult-=0.1; 
    if(this.mult<0) this.mult=0;
    this.pth.setAttribute('transform','translate('+(this.pth.w-this.pth.w*this.mult)/2+',0) scale('+(this.pth.z*this.mult)+','+this.pth.z+')');
   }
  }
  else if(pnt==1){
   if(deg<=-35){
    this.mult+=0.1; 
    if(this.mult>1) this.mult=1;
    this.pth.setAttribute('transform','translate('+(this.pth.w-this.pth.w*this.mult*-1)/2+',0) scale('+(this.pth.z*this.mult*-1)+','+this.pth.z+')');
   }
   else if(deg>=45){
    pnt=-1;
    this.mult=1;
   }
   else if(deg>=35){
    this.mult-=0.1;
    if(this.mult<0) this.mult=0;
    this.pth.setAttribute('transform','translate('+(this.pth.w-this.pth.w*this.mult*-1)/2+',0) scale('+(this.pth.z*this.mult*-1)+','+this.pth.z+')');
   }
  }
  deg+=1*pnt
  this.g.setAttribute('transform','translate('+this.g.x+','+this.g.y+') rotate('+deg+','+(this.g.w/2)*1+','+(this.g.h)*1+')');
  if(bx.isOn===true) requestAnimationFrame(function(){eThis.anim(pnt,deg,eThis);});
 }
}
// *********************************************//
// *********************************************//
// *********************************************//
getGiveUp();
