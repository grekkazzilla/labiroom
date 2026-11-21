// ***** Header.js
var header=$$(document,'header');
header.style.height='auto';
header.style.marginBottom='0';
// ***** Header.js : 1st element -> logo main page link
var svg=$('svgLogo');
var wSvg=60;
svg.style.width=wSvg+'px';
svg.style.height=wSvg+'px';
var pic=getSpin(svg,'url(#grdBtn)',0.5,8,wSvg,wSvg,true);
jumpG(pic,4,pic.y);
// ***** Header.js : 2nd element -> sitename
var div=$$(header,'div');
// ***** Header.js : 3rd element -> navigation button
var svg=$('svgNav');
svg.style.width=wSvg+'px';
svg.style.height=wSvg+'px';
var wButton=40;
var dataPic='M 0 0 L 0 82.375 L 300 82.375 L 300 0 L 0 0 z M 46.84375 18.71875 C 59.251737 18.71875 69.34375 28.779491 69.34375 41.1875 C 69.34375 53.595479 59.251737 63.65625 46.84375 63.65625 C 34.435752 63.65625 24.375 53.595479 24.375 41.1875 C 24.375 28.779491 34.435752 18.71875 46.84375 18.71875 z M 0 107.375 L 0 189.75 L 300 189.75 L 300 107.375 L 0 107.375 z M 46.84375 126.09375 C 59.251737 126.09375 69.34375 136.1545 69.34375 148.5625 C 69.34375 160.97048 59.251737 171.03125 46.84375 171.03125 C 34.435752 171.03125 24.375 160.97048 24.375 148.5625 C 24.375 136.1545 34.435752 126.09375 46.84375 126.09375 z M 0 214.71875 L 0 297.125 L 300 297.125 L 300 214.71875 L 0 214.71875 z M 46.84375 233.46875 C 59.251737 233.46875 69.34375 243.5295 69.34375 255.9375 C 69.34375 268.34548 59.251737 278.40625 46.84375 278.40625 C 34.435752 278.40625 24.375 268.34548 24.375 255.9375 C 24.375 243.5295 34.435752 233.46875 46.84375 233.46875 z';
getButton(svg,wSvg-wButton-2,wSvg/2-wButton/2,wButton,wButton,'aabx',[[dataPic,0.065,null]],function(){},null,true,'btnNav',5,1,8,3);


/* css should be added
 *
header{
 display:flex;
 align-items:center;
 justify-content:space-between;
 height:60px;
 margin-bottom:10px;
}
header div{
 flex-grow:1;
 min-width:0;
 font-size:20px;
}
*/
