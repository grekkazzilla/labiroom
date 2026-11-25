G_CHESS.getBoard=function(){
 this.gBoard=getG(this,0,100,1,true,'gBoard');
 this.aSqu=new Array(); // squares both banned and playable
 this.assUnit=new Array(); // asset of units both on board and out
 this.assPick=new Array(); // asset of green circles and squares showing allowed moves
 this.aPlay=new Array(); // numbers of playable squares
 this.aP4wn=new Array(91,92,93,94,95,96,97,98,81,82,83,84,85,86,87,88,71,72,73,74,75,76,77,78,61,62,63,64,65,66,67,68,51,52,53,54,55,56,57,58,41,42,43,44,45,46,47,48,31,32,33,34,35,36,37,38,21,22,23,24,25,26,27,28);
 var qHor=8; // quantity of horizontal playable squares (8 in a row)
 var qVer=8; // quantity of vertical playable squares (8 in a row)
 var qBan=2; // quantity of unplayable rows around the board
 this.qMove=qVer+qBan*2; // vertical full distance of both banned and playable squares
 //
 //    111111111111 | 000 001 002 003 004 005 006 007 008 009 010 011
 //    111111111111 | 012 013 014 015 016 017 018 019 020 021 022 023  
 // 8  110000000011 | 024 025 026 027 028 029 030 031 032 033 034 035
 // 7  110000000011 | 036 037 038 039 040 041 042 043 044 045 046 047
 // 6  110000000011 | 048 049 050 051 052 053 054 055 056 057 058 059
 // 5  110000000011 | 060 061 062 063 064 065 066 067 068 069 070 071
 // 4  110000000011 | 072 073 074 075 076 077 078 079 080 081 082 083 
 // 3  110000000011 | 084 085 086 087 088 089 090 091 092 093 094 095
 // 2  110000000011 | 096 097 098 099 100 101 102 103 104 105 106 107
 // 1  110000000011 | 108 109 110 111 112 113 114 115 116 117 118 119
 //    111111111111 | 120 121 122 123 124 125 126 127 128 129 130 131
 //    111111111111 | 132 133 134 135 136 137 138 139 140 141 142 143
 //
 //      abcdefgh
 //      
 var pntLight='#eee8aa';
 var pntDark='#bdb76d';
 var wSqu=50;
 this.gBoard.w=400;
 this.gBoard.h=400;
 var xSqu=0;
 var ySqu=0-wSqu*qBan;
 var pos=0;
 var num=0;
 for(var i=0;i<qVer+qBan*2;i++){
  for(var j=0;j<qHor+qBan*2;j++){
   var squ=new Object();
   squ.isBan=true;
   if(i>=qBan && i<=qBan+qVer-1 && j>=qBan && j<=qBan+qHor-1){
    squ=getG(this.gBoard,xSqu,ySqu,1,true);
    squ.isBan=false;
    var pnt=pntDark;
    if((i%2==0 && j%2==0) || (i%2>0 && j%2>0)) pnt=pntLight;
    getRct(squ,0,0,wSqu,wSqu,0,pnt,'none',0);
    xSqu+=wSqu;
    squ.pos=pos;
    squ.unt=null;
    this.aPlay.push(pos);
    squ.nPlay=pos; // playable position
    squ.nP4wn=this.aP4wn[num];
    num++;
    squ.onclick=function(){G_CHESS.play(this);}
    squ.style.cursor='pointer';
   }
   this.aSqu.push(squ);
   pos++;
  }
  xSqu=0;
  ySqu+=wSqu;
 }
 this.rctPick=getRct(null,2,2,46,46,5,'transparent','olivedrab',1); // selection rectangle showing a unit ready to move
 this.crlCheck=getCrl(null,25,25,20,'#ff4d4d','none',0); // blurred red circle showing a king under check
 this.crlCheck.setAttribute('filter','url(#blr4)');
 this.posEnPassant=null;
}
G_CHESS.getBoard();
