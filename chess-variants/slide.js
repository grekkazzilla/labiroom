function getSlider(gRoot,x,y,w,h,pnt,arr,fnc,isOn,id){
 var sld=getG(gRoot,x,y,1,isOn,id);
 var sD_A='M 0 0 H '+w+' V '+h+' H 0 z ';
 var sD_B='M 10 25 C 10 15,15 10,25 10 H '+(w-25)+' C '+(w-15)+' 10,'+(w-10)+' 15,'+(w-10)+' 25 V '+(h-25)+' C '+(w-10)+' '+(h-15)+','+(w-15)+' '+(h-10)+','+(w-25)+' '+(h-10)+' H 25 C 15 '+(h-10)+',10 '+(h-15)+',10 '+(h-25)+' z';
 var pth=getPth(sld,0,0,1,'transparent','#808080',2,sD_B);
 pth.setAttribute('filter','url(#blr2)');
 var pth=getPth(sld,0,0,1,pnt,'none',0,sD_A+sD_B);
 pth.setAttribute('fill-rule','evenodd');
 sld.btn=getG(sld,105,2,1,true);
 var hBtn=h-4,wBtn=hBtn/1.7;
 sld.btn.w=wBtn;
 getRct(sld.btn,0,0,wBtn,hBtn,7,'url(#grdBtn)','none',0);
 getCrl(sld.btn,wBtn/2,hBtn/2,wBtn/2-5,'url(#grdBtnRvs)','none',1);
 sld.style.cursor='pointer';
 //
 sld.arr=new Array();
 sld.rctCurr=null;
 var rct=getRct(sld,0,0,wBtn,h,0,'transparent','green',0);
 var rct=getRct(sld,w-wBtn,0,wBtn,h,0,'transparent','green',0);
 var wRct=(w-wBtn*2)/arr.length;
 for(var i=0;i<arr.length;i++){
  var rct=getRct(sld,wBtn+i*wRct,0,wRct,h,0,'transparent','red',0);
  if(i==0) sld.rctA=rct;
  else if(i==arr.length-1) sld.rctB=rct;
  rct._x=rct.getAttribute('x')*1;
  rct._w=rct.getAttribute('width')*1;
  rct.val=arr[i];
  sld.arr.push(rct);
  //
  if(isTouch()===false){
   rct.onclick=function(){
    setSlider(this.parentNode,null,this);
    this.parentNode.fnc();
   }
  }
 }
 sld.fnc=fnc;
 if(isTouch()===true){
  sld.ontouchmove=function(evt){
   var bx=this.parentNode;
   var x=evt.changedTouches[0].clientX;
   x=x-bx.getBoundingClientRect().left;
   x=Math.round(x/Z);
   for(var i in this.arr){
    var rct=this.arr[i];
    if(x>rct._x && x<(rct._x+rct._w) && this.rctCurr!=rct){
     setSlider(this,null,rct);  
     this.fnc();
    }
   }
  }
 }
 return sld;
}

function setSlider(sld,val,rct){
 if(rct===null){
  for(var i in sld.arr){
   var rct=sld.arr[i];
   if(rct.val==val) break;
  }
 }
 jumpG(sld.btn,(rct._x+(rct._w-sld.btn.w)/2),sld.btn.y);
 sld.rctCurr=rct;
 sld.val=rct.val;
}
