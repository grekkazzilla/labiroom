<?php
$arrSuit=Array('h','s','d','c');
$arrCard=Array();
for($j=0;$j<4;$j++){
 for($i=2;$i<15;$i++) $arrCard[]=$arrSuit[$j].$i;
}
shuffle($arrCard);
$strShuffle=trim(implode('^',$arrCard));
// for test
/*
$strShuffle='s14^c14^d14^h14^';
$strShuffle.='h13^d13^h12^d12^h11^d11^h10^d10^h9^d9^';
$strShuffle.='h8^d8^h7^d7^h6^d6^h5^d5^h4^d4^';
$strShuffle.='h3^d3^h2^d2^s13^c13^s12^c12^s11^c11^';
$strShuffle.='s10^c10^s9^c9^s8^c8^s7^c7^s6^c6^';
$strShuffle.='s5^c5^s4^c4^s3^c3^s2^c2';
*/
echo('shuffle_1~'.$strShuffle);
?>
