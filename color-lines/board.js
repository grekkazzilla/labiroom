G.aSqu=new Array();
G.aPosOpen=new Array();
G.squA=null;
G.squB=null;

G.getBoard=function(){
 var wSqu=44.444444,nSqu=0,xSqu=0,ySqu=2;
 // draw grid
 var gGrid=getG(this,0,wSqu*2,1,true,'gGrid');
 getRct(gGrid,1,0,W-2,wSqu*9,8,'transparent','#d0d0d0',1);
 for(var i=0;i<11;i++){
  if(i>0 && i<9) getLin(gGrid,1,wSqu*(i),W-1,wSqu*(i),'#c0c0c0',1);
  if(i>0 && i<9) getLin(gGrid,wSqu*(i),1,wSqu*(i),wSqu*9-1,'#c0c0c0',1);
 }
 // draw square spots
 for(var i=0;i<11;i++){
  xSqu=0;
  for(var j=0;j<11;j++){
   var squ=new Object();
   if(i<1 || i>9 || j==0 || j==10) squ.isBan=true;
   else{		 
    squ=getG(this,xSqu*wSqu,ySqu*wSqu,1,true,'squ'+nSqu);
    squ.isBan=false;
    squ.onclick=function(){$('G_LINES').play(this);}
    squ.style.cursor='pointer';
    squ.w=wSqu;
    squ.h=wSqu;
    xSqu++;
    getRct(squ,0,0,wSqu,wSqu,0,'transparent','transparent',1);
    getTxt('',squ,9,9,'#c0c0c0','middle').setAttribute('font-size','10px');
    getTxt('',squ,25,25,'#000','middle');
    this.aPosOpen.push(nSqu);
   }
   squ.pos=nSqu;
   this.aSqu.push(squ);
   nSqu++;
  }
  if(i>0 && i<10) ySqu++;
 }
}

G.clearBoard=function(isReset){
 for(var i in this.aPosOpen){
  var pos=this.aPosOpen[i];
  var squ=this.aSqu[pos];
  squ.nWave=null;
  if(isReset===true) squ.unt=null;
  this.squA=null;
  this.squB=null;
 }
}

G.board_check_open=function(){
 var cnt=0;
 for(var i in this.aPosOpen){
  var pos=this.aPosOpen[i];
  var squ=this.aSqu[pos];
  if(squ.unt===null) cnt++;
  if(cnt>2) return cnt;
 }
 return cnt;
}
