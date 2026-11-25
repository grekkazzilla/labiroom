G.set=function(){
 this.setPntQty(6);
}

G.setPntQty=function(qty){
 this.bufPaint=new Array();
 var min=0;
 var max=this.aPaint.length-1;
 if(qty<6){
  do{
   var rnd=getRnd(min,max);
   var pnt=this.aPaint[rnd];
   if(isInArray(pnt,this.bufPaint)===false){
    this.bufPaint.push(pnt);
   }
  }
  while(this.bufPaint.length<qty);
  if(qty==4) var btn=this.btnPnt4;
  else if(qty==5) var btn=this.btnPnt5;
 }
 else if(qty==6){
  for(var i in this.aPaint) this.bufPaint.push(this.aPaint[i]);
  var btn=this.btnPnt6;
 }
 var aCrl=btn.getElementsByTagName('circle');
 for(var i=0;i<aCrl.length;i++){
  aCrl[i].setAttribute('fill','url(#radLines'+this.bufPaint[i]+')');
  aCrl[i].setAttribute('stroke','url(#radLines'+this.bufPaint[i]+')');
 }
 // OUT BTNs
 var arr=[this.btnPnt4,this.btnPnt5,this.btnPnt6];
 for(var i in arr){
  if(arr[i]!=btn){
   var aCrl=arr[i].getElementsByTagName('circle');
   for(var i=0;i<aCrl.length;i++){
    aCrl[i].setAttribute('fill','transparent');
    aCrl[i].setAttribute('stroke','url(#grdPale)');
   }
  }
 }
}
