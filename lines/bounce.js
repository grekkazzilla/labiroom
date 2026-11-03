G.bounceUnit=function(unt){

 unt.minY=-5;
 unt.maxY=13;
 unt.spdY=0.7;
 unt.minZ=0.8;
 unt.maxZ=1;
 unt.spdZ=(unt.maxZ-unt.minZ)/((unt.maxY-unt.minY)/unt.spdY);
 var spdZ=(unt.maxZ-unt.minZ)/((unt.maxY-0)/unt.spdY);
 this.anmBounceDown(unt,0,1,spdZ);
}

G.anmBounceUp=function(unt,y,z){
 y=y-unt.spdY;
 z=z+unt.spdZ;
 if(this.squA===null || unt!=this.squA.unt || unt.isAnm===true){
  unt.setAttribute('transform','translate(0,0) scale(1)');
 }
 else if(y>unt.minY && IS_reset===false){
  unt.setAttribute('transform','translate(0,'+y+') scale(1,'+z+')');
  requestAnimationFrame(function(){
   $('G_LINES').anmBounceUp(unt,y,z);
  });
 }
 else{
  unt.setAttribute('transform','translate(0,'+unt.minY+') scale('+unt.maxZ+')');
  $('G_LINES').anmBounceDown(unt,unt.minY,unt.maxZ,unt.spdZ);
 }
}

G.anmBounceDown=function(unt,y,z,spdZ){
 y=y+unt.spdY;
 z=z-spdZ;
 if(this.squA===null || unt!=this.squA.unt || unt.isAnm===true){
  unt.setAttribute('transform','translate(0,0) scale(1)');
 }
 else if(y<unt.maxY && IS_reset===false){
  unt.setAttribute('transform','translate(0,'+y+') scale(1,'+z+')');
  requestAnimationFrame(function(){
   $('G_LINES').anmBounceDown(unt,y,z,spdZ);
  });
 }
 else{
  unt.setAttribute('transform','translate(0,'+unt.maxY+') scale('+unt.minZ+')');
  $('G_LINES').anmBounceUp(unt,unt.maxY,unt.minZ);
 }
}
