var CNT=0;
var BUF_pic=new Array();
var A_pic=new Array();
$('G_LINES').get(); 
downPic();

function downPic(){
 if(CNT<BUF_pic.length){
  var sPic=BUF_pic[CNT][0];
  var isFound=false;
  for(var i in A_pic){
   if(sPic==A_pic[i][0]){
    isFound=true;
    break;
   }
  }
  if(isFound===false){
   var doc='./'+BUF_pic[CNT][0]+'.txt';
   getAsync(doc,'',function(){
    putPic(BUF_pic[CNT][1],XHR.responseText);
    A_pic.push([BUF_pic[CNT][0],XHR.responseText]);
    CNT++
    downPic();
   });
  }
  else if(isFound===true){
   putPic(BUF_pic[CNT][1],A_pic[i][1]);
   CNT++;
   downPic();
  }
 }
 else{
  $('G_LINES').set(); 
  $('G_LINES').reset(); 
  G_spin.isOn=false;
  showG($('G_LINES'));
  IS_lock=false;
 }
}
