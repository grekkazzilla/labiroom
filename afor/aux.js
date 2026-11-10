function getRand(min,max){return Math.floor(Math.random()*(max-min+1))+min;}
function shuffle(array) {
  var currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function isTouch(){return ('ontouchstart' in window);}


function $(s){
 const el=document.getElementById(s);
 if(!el){
  const msg='⚠️ Не найден ID: '+s;
  if(!IS_prod) alert(msg);
  ttt(msg);
 }
 return el;
}

function $$(s,root,num){
 if(typeof root=='string') root=$(root);
 if(!root) return null;
 if(num===undefined) num=0;
 const list=root.getElementsByTagName(s);
 const el=list[num];
 if(!el){
  const msg='⚠️ $$ не нашёл: <'+s+'> в '+(root.id||'[root]');
  if(!IS_prod) alert(msg);
  ttt(msg);
 }
 return el;
}

function ttt(){console.log(...arguments);}

function $txt(g,str,num){
 if(num===undefined) num=0;
 g.getElementsByTagName('text')[num].firstChild.nodeValue=str;}

function getTest(){
 var dv=document.createElement('div');
 dv.id='dvTest';
 $('dvRoot').appendChild(dv);
 dv.style.position='absolute';
 dv.style.left='0';
 dv.style.right='0';
 dv.style.width='100%';
 dv.style.height='50px';
 dv.style.backgroundColor='#fff';
 dv.style.zIndex='100';
 for(var i=0;i<5;i++){
  var p=document.createElement('p');
  if(i==0) p.innerHTML='test';
  dv.appendChild(p);}
 dv.style.fontSize='25px';
 dv.style.fontFamily='Courier';
}
function tst(str_00,str_01,str_02,str_03,str_04){
 var dv=$('dvTest');
 if(dv===null) alert('test div not found!');
 var arrP=dv.getElementsByTagName('p');
 arrP[0].innerHTML=str_00;
 if(str_01!==undefined) arrP[1].innerHTML=str_01;
 if(str_02!==undefined) arrP[2].innerHTML=str_02;
 if(str_03!==undefined) arrP[3].innerHTML=str_03;
 if(str_04!==undefined) arrP[4].innerHTML=str_04;
}

function rndStr(qty){
 var sFrom='qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890';
 var sRand='';
 while(sRand.length<qty) sRand+=sFrom.charAt(getRand(0,sFrom.length));
 return sRand;}

function isInArray(e,arr){for(var i in arr) if(e==arr[i]) return true;return false;}

function isLocal(){
 try{return'localStorage'in window&&window['localStorage']!==null;}
 catch(e){return false;}
}

function getLocal(storage_name,default_value){
 if(!isLocal()){return default_value;}
 var val=localStorage.getItem(storage_name);
 if(typeof val!=='string'){return default_value;}
 if(val==='true')return true;
 if(val==='false')return false;
 return val;
}

function setLocal(storage_name,stored_value){
 if(!isLocal())return false;
 if(stored_value===true)stored_value='true';
 else if(stored_value===false)stored_value='false';
 else stored_value=String(stored_value);
 localStorage.setItem(storage_name,stored_value);
 return true;
}

// ***************** //

function appendScript(str){
  var head=document.getElementsByTagName('head')[0];
  var script=document.createElement('script');
  script.innerHTML=str;
  head.appendChild(script);
}

/************************************************************************************
 * Transforms a point (x, y) from the coordinate system of one SVG element
 * into the local coordinate system of another element within the same SVG.
 *
 * @param {SVGElement} fromEl - Element whose coordinate system contains x, y
 * @param {SVGElement} toEl   - Element whose coordinate system to transform into
 * @param {number} x
 * @param {number} y
 * @returns {SVGPoint}        - Point with x and y fields in toEl's local system
 */
function transformPointBetweenElements(fromEl, toEl, x, y) {
  // Root <svg>: if fromEl IS the root, ownerSVGElement is null
  const svgRoot = fromEl.ownerSVGElement || fromEl;

  const pt = svgRoot.createSVGPoint();
  pt.x = x;
  pt.y = y;

  const fromMatrix = fromEl.getScreenCTM();
  const toMatrix = toEl.getScreenCTM();

  // Elements are hidden or not in the DOM yet — return the point unchanged
  if (!fromMatrix || !toMatrix) {
    console.warn('transformPointBetweenElements: elements are not rendered');
    return pt;
  }

  // Transition matrix: fromEl's system → toEl's system
  const matrix = toMatrix.inverse().multiply(fromMatrix);

  return pt.matrixTransform(matrix);
}
/************************************************************************************
 * Downloads a set of images.
 * @param {string[]} urls - array of image links
 * @param {(images: Array<{ url: string, blob: Blob } | null>) => void} callback
 *   called with an array of results (same order as `urls`).
 *   Failed downloads come back as `null`.
 */
function downloadImages(urls, callback) {
  const images = new Array(urls.length);
  let pending = urls.length;

  if (pending === 0) {
    callback([]);
    return;
  }

  urls.forEach((url, i) => {
    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.blob();
      })
      .then(blob => {
        images[i] = { url, blob };
      })
      .catch(err => {
        console.warn(`Failed to download ${url}:`, err);
        images[i] = null;
      })
      .finally(() => {
        if (--pending === 0) callback(images);
      });
  });
}
/************************************************************************************/
function spliceArrayByMatches(arr,matches){
 for(var i=0;i<matches.length;i++){
  var j=arr.indexOf(matches[i]);
  if(j!==-1)arr.splice(j,1);
 }
 return arr;
}
