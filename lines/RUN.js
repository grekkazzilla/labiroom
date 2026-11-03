G.bufPaint=new Array();
G.aNumPace=[-11,+1,+11,-1];
G.aSquPath=new Array();
G.isWon=false;
G.isLost=false;
G.squBufA=null;
G.squBufB=null;
// ************************* STATE *****************************************************
var DATA_state=getLocal('lines_state','');
function saveState(){
 var arr=[];
 for(var i in G.aUnitNew){
  var unt=G.aUnitNew[i];  
  arr.push(unt.pnt);
 }
 var dataNewUnit=arr.join(':');
 //
 var arr=[];
 for(var i in G.aSqu){
  var squ=G.aSqu[i];
  if(squ.isBan===true || squ.unt===null) arr.push('n');
  else arr.push(squ.unt.pnt);
 }
 var dataBoardUnit=arr.join(':');
 //
 var dataState=dataNewUnit+'~'+dataBoardUnit+'~'+G.nScoreB+'~'+G.nCent+'~'+G.nCentMax;
 setLocal('lines_state',dataState);
}
function loadState(){
 for(var i in G.aSqu){
  G.aSqu[i].unt=null;
  G.aSqu[i].nWave=null;
 }
 var row=DATA_state.split('~');
 var aPntNew=row[0].split(':');
 var m=1;
 var w=44.444444;
 var q=3;
 var x=W/2-(w*q+m*(q-1))/2;
 var y=8;
 var r=16;
 for(var i=0;i<3;i++){
  var pnt=aPntNew[i];
  var unt=createUnit(G,x,y,1,r,pnt,w);
  x=x+w+m;
  G.aUnitNew.push(unt);
 }
 //
 var aPntBoard=row[1].split(':');
 for(var i in aPntBoard){
  var pnt=aPntBoard[i];
  if(pnt!='n'){
   var squ=G.aSqu[i];
   var unt=createUnit(squ,0,0,1,r,pnt,w);
   squ.unt=unt;
   unt.squ=squ;
  }
 }
 //
 G.nScoreA=9999;
 G.nScoreB=row[2]*1;
 G.gSnail.x+=G.gSnail.nStep*(G.nScoreA-G.nScoreB);
 G.nScoreA=G.nScoreB;
 jumpG(G.gSnail,G.gSnail.x,G.gSnail.y);
 //
 G.drawScore();
 //
 G.nCent=row[3]*1;
 G.nCentMax=row[4]*1;
 var nStep=390/100;
 var wCent=G.nCent*nStep;
 var wCentMax=G.nCentMax*nStep;
 G.rctCent.setAttribute('width',wCent);
 G.rctCentMax.setAttribute('width',wCentMax);
 G.drawCent(G.gCentTXT,G.nCent);
 if(G.nCent==G.nCentMax){
  for(var i=0;i<3;i++) G.gCentTXT.aPth[i].setAttribute('fill','transparent');	
 }
 G.drawCent(G.gCentMaxTXT,G.nCentMax);
 jumpG(G.gCentMaxTXT,wCentMax+6,G.gCentMaxTXT.y);
 var maxCent=86;
 if(G.nCent>maxCent || G.nCentMax>maxCent){
  for(var i=0;i<3;i++) G.gCentTXT.aPth[i].setAttribute('fill','#fff');	
  for(var i=0;i<3;i++) G.gCentMaxTXT.aPth[i].setAttribute('fill','transparent');	
  G.pthCent.setAttribute('fill','transparent');	
 }
 //
 IS_reset=false;
}
function createUnit(root,x,y,z,r,pnt,wSqu){
 var unt=getG(root,x,y,z,true);
 unt.pnt=pnt;
 unt.w=r*2;
 unt.h=r*2;
 unt.z=z;
 unt.pnt=pnt;
 getCrl(unt,wSqu/2,wSqu/2,r,'url(#radLines'+pnt+')','none',0);
 G.aUnit.push(unt);
 unt.isAnm=false;
 return unt;
}
// **************************************************************************************
G.reset=function(){
 IS_reset=true;
 IS_lock=true;
 if(G_spin.isOn===false){
  hideG(this);
  spin();
 }
 if(DATA_state==''){
  setTimeout(function(){
   $('G_LINES').clearBoard(true);
   $('G_LINES').clearUnit();
   G_spin.isOn=false;
   showG('G_LINES');
   IS_reset=false;
   $('G_LINES').getNewAndZoomIn(function(){
    setTimeout(function(){
     $('G_LINES').moveNewToBoard(function(){
      $('G_LINES').setCent();
      $('G_LINES').getNewAndZoomIn(function(){
       saveState();
       IS_lock=false;
      });
     });
    },100);
   });
  },200);
 }
 else{
  loadState(); 
 }
}

G.play=function(squPlay){
 if(IS_lock===false && this.bxMenu.isOn===false){
  if(this.squA==squPlay) this.squA=null;
  else if(this.squA!==null && squPlay.unt===null){
   this.squB=squPlay;
   var isFound=this.getWave();
   if(isFound===true){
    IS_lock=true;
    this.getPath();
    this.moveAlongPath(function(){
     var aZoomOut=$('G_LINES').checkLine($('G_LINES').squB);
     if(aZoomOut.length>0){
      $('G_LINES').isWon=$('G_LINES').setScore(aZoomOut.length,function(){
       if($('G_LINES').isWon===true){
        //*** WON *********************************//
        G.won_start();
	//******************************************//
       }
      });
      $('G_LINES').anmZoomOut(aZoomOut,1,function(){
       $('G_LINES').clearBoard(false);
       $('G_LINES').setCent();
       if($('G_LINES').isWon===false && $('G_LINES').isLost===false){
        saveState();
        IS_lock=false;
       }
      });
     }
     else{
      $('G_LINES').clearBoard(false);
      $('G_LINES').setCent();
      var nOpen=$('G_LINES').board_check_open();
      if(nOpen>2){
       $('G_LINES').moveNewToBoard(function(){
        $('G_LINES').checkThreeLines(); 
       });
      }
      else{
       $('G_LINES').run_lost();
      }
     }
    });
   }
   else{
    this.clearBoard(false);
   }
  }
  else if(squPlay.unt!==null){
   this.squA=squPlay;
   this.bounceUnit(this.squA.unt);
  }
 }
 else{
  if(
  (this.squBufA===null && this.squBufB===null) ||
  (this.squBufA!==null && this.squBufB!==null)){
   this.squBufA=squPlay;
   this.squBufB=null;
  }
  else if(this.squBufA!==null && this.squBufB===null){
   this.squBufB=squPlay;
  }
 }
}

G.checkThreeLines=function(){
 if(this.aUnitNew.length>0){
  var unt=this.aUnitNew.shift();
  if(unt.isOn===true){
   var squCheck=unt.squ;
   var aZoomOut=this.checkLine(squCheck);
   if(aZoomOut.length>0){
    $('G_LINES').isWon=$('G_LINES').setScore(aZoomOut.length,function(){
     if($('G_LINES').isWon===true){
     //*** WON *********************************//
     G.won_start();
     //******************************************//
     }
    });
    this.anmZoomOut(aZoomOut,1,function(){
     $('G_LINES').checkThreeLines();  
    });
   }
   else this.checkThreeLines();
  }
  else this.checkThreeLines();
 }
 else{
  this.setCent();
  this.getNewAndZoomIn(function(){
   saveState();
   IS_lock=false;
   var squA=$('G_LINES').squBufA;
   var squB=$('G_LINES').squBufB;
   $('G_LINES').squBufA=null;
   $('G_LINES').squBufB=null;
   if(squA!==null) $('G_LINES').play(squA);
   if(squB!==null) $('G_LINES').play(squB);
   var nOpen=$('G_LINES').board_check_open();
   if(nOpen==0){
    $('G_LINES').run_lost();
   }
  });
 }
}

G.run_lost=function(){
 // clear history
 DATA_state='';
 setLocal('lines_state',DATA_state);
 //
 setBtn($('btnReSet'),'g');
 //
 for(var i in this.aUnit){
  var unt=this.aUnit[i];
  var crl=$$('circle',unt);
  crl.setAttribute('fill','url(#radBlack)');
 }
 $$('path',this.gSnail,1).setAttribute('fill','url(#grdPic)');
 $$('path',this.gApple,1).setAttribute('fill','url(#grdPic)');
 $$('path',this.gApple,2).setAttribute('fill','url(#radBlack)');
 this.rctCent.setAttribute('fill','#909090');
 $$('rect',this.gCent).setAttribute('stroke','#c0c0c0');
}
