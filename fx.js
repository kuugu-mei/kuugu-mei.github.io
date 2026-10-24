/* 新增效果（v19）：背景视频、标题乱码出现、绳结卷轴开场、藏品散落与照片弹窗。
   文字内容全部仍来自 data.js；这个文件只负责动画和排版，不需要修改。 */
(function(){
"use strict";
var html=document.documentElement,R=false;
try{R=matchMedia("(prefers-reduced-motion:reduce)").matches}catch(e){}
function $(i){return document.getElementById(i)}
function clamp(x,a,b){return x<a?a:x>b?b:x}
function ease(p){return p<.5?2*p*p:1-Math.pow(-2*p+2,2)/2}
function safe(f){try{f()}catch(e){console.error("[小站效果]",e)}}
var SS={get:function(k){try{return sessionStorage.getItem(k)}catch(e){return null}},set:function(k,v){try{sessionStorage.setItem(k,v)}catch(e){}},del:function(k){try{sessionStorage.removeItem(k)}catch(e){}}};

/* ---------------- 背景视频 ---------------- */
safe(function(){var v=$("bgv");if(!v)return;v.muted=true;v.setAttribute("muted","");if(R){v.pause();return}var p=v.play();if(p&&p.catch)p.catch(function(){})});

/* ---------------- 标题乱码出现 ---------------- */
var SCR="#@%&*+=?/\\|<>0123456789XZ";
function scramble(node,delay,dur){
  var fin=node.textContent;if(!fin)return;var n=fin.length,st=[],rv=[];
  for(var i=0;i<n;i++){st[i]=delay+i*(dur*.5/Math.max(1,n))+Math.random()*.15;rv[i]=st[i]+.45+Math.random()*.55}
  var t0=performance.now(),last=0;
  node.textContent=" ";
  function f(now){var t=(now-t0)/1000;if(now-last>45||t>rv[n-1]){last=now;var s="",done=true;
    for(var i=0;i<n;i++){var c=fin.charAt(i);if(c===" "||c==="\n"){s+=c;continue}
      if(t>=rv[i])s+=c;else{done=false;s+=t>=st[i]?SCR.charAt(Math.floor(Math.random()*SCR.length)):" "}}
    node.textContent=s;if(done){node.textContent=fin;return}}
    requestAnimationFrame(f)}
  requestAnimationFrame(f)
}
function titleIn(){
  /* 只有大标题用乱码出现；小字稍后淡入 */
  if(R){html.classList.add("ssh");return}
  var h=$("st");if(h)scramble(h,0,1.3);
  setTimeout(function(){html.classList.add("ssh")},650)
}

/* ---------------- 像素卷轴与绳结 ---------------- */
var K={ol:"#5d7a35",lt:"#f6f8ec",bs:"#e0e8c8",sh:"#bccb8f",dk:"#8fa65a",fr:"#6f8c3e",cream:"#fbefd2",tan:"#d3b97e",ed:"#8a6c3a",w:"#ffffff"};
var FRET=["............",".XXXXXXXXXX.",".X........X.",".X.XXXXXX.X.",".X.X......X.",".X.XXXXXXXX.",".X.........."];
var rolled=$("rolled"),rc=$("rc"),rcx=rc&&rc.getContext("2d");
function drawRollP(p,P){
  if(!rc)return;var box=rc.parentNode,cols=Math.max(80,Math.min(150,Math.floor((box.clientWidth||560)/4))),H=29;
  if(rc.width!==cols||rc.height!==H){rc.width=cols;rc.height=H;rc.style.width=cols*4+"px";rc.style.height=H*4+"px"}
  var c=rcx;c.clearRect(0,0,cols,H);
  function px(x,y,col,w,h){c.fillStyle=col;c.fillRect(Math.round(x),Math.round(y),w||1,h||1)}
  var x0=9,x1=cols-10;
  for(var y=3;y<=15;y++){var col=y===3||y===15?P.ol:y<=5?P.lt:y<=10?P.bs:y<=13?P.sh:P.dk;px(x0,y,col,x1-x0+1,1)}
  if(P.pat===2){for(var x=x0;x<=x1;x++){if(x%2===0){px(x,7,P.fr);px(x,12,P.fr)}if((x-x0)%12===5){px(x,9,P.fr);px(x,10,P.fr)}}}else if(P.pat!==0){for(var ty=0;ty<7;ty++)for(var x=x0;x<=x1;x++){if(FRET[ty].charAt((x-x0)%12)==="X")px(x,6+ty,P.fr)}}
  function cap(cx){for(var y=0;y<19;y++)for(var x=cx-9;x<=cx+9;x++){var d=Math.sqrt((x-cx)*(x-cx)+(y-9)*(y-9));if(d>9.4)continue;px(x,y,d>7.8?(P.c0||P.ol):d>6.2?(P.c1||P.dk):d>3.4?(P.c2||P.lt):d>2.2?((x+y)%2?(P.c1||P.dk):(P.c2||P.lt)):(P.c1||P.dk))}}
  cap(9);cap(cols-10);
  var cx=Math.floor(cols/2);
  var a=p==null?0:p;
  function band(x,al,dx){c.globalAlpha=al;for(var y=2;y<=16;y++){px(x+dx,y,P.ed);px(x+dx+1,y,y%2?P.cream:P.tan);px(x+dx+2,y,y%2?P.tan:P.cream);px(x+dx+3,y,P.ed)}c.globalAlpha=1}
  var bAl=1-clamp((a-.2)/.5,0,1);
  if(bAl>0){band(cx-8,bAl,-Math.round(a*18));band(cx+4,bAl,Math.round(a*18))}
  var kAl=1-clamp(a/.35,0,1),sh=a>0&&a<.18?(Math.random()<.5?1:-1):0;
  if(kAl>0){c.globalAlpha=kAl;for(var j=0;j<6;j++)for(var i=0;i<6;i++){var edge=i===0||j===0||i===5||j===5;px(cx-3+i+sh,6+j,edge?P.ed:((i+j)%2?P.cream:P.tan))}c.globalAlpha=1}
  var tAl=1-clamp((a-.25)/.5,0,1);
  if(tAl>0){c.globalAlpha=tAl;var fall=Math.round(a*a*44);
    for(var k=0;k<11;k++){var sx=Math.floor(k*.5)+Math.round(a*8);px(cx-2-sx,12+k+fall,P.ed);px(cx-1-sx,12+k+fall,k%2?P.cream:P.tan);px(cx+2+sx,12+k+fall,P.ed);px(cx+1+sx,12+k+fall,k%2?P.tan:P.cream)}
    px(cx-8-Math.round(a*8),23+fall,P.tan,3,2);px(cx+6+Math.round(a*8),23+fall,P.tan,3,2);c.globalAlpha=1}
}

function drawRoll(p){
  drawRollP(p,K)
}
function animate(from,to,ms,step,done){var t0=null;function f(t){if(t0===null)t0=t;var p=clamp((t-t0)/ms,0,1);step(from+(to-from)*ease(p),p);if(p<1)requestAnimationFrame(f);else if(done)done()}requestAnimationFrame(f)}
var userScrolled=false,opening=false;
["wheel","touchstart","keydown","mousedown"].forEach(function(e){addEventListener(e,function(){if(opening)userScrolled=true},{passive:true})});
function openScroll(){
  var rv=$("rv"),rodt=document.querySelector(".rod.top");if(!rv||!rodt)return;
  opening=true;userScrolled=false;
  rv.style.height="0px";
  var items=document.querySelectorAll(".bar a,.bar button");Array.prototype.forEach.call(items,function(a,i){a.style.setProperty("--i",i)});
  titleIn();html.classList.add("opening");html.classList.remove("intro","hp");
  window.scrollTo(0,0);
  var paper=rv.firstElementChild,H=paper?paper.offsetHeight:600,ms=R?250:clamp(1500+H*.9,2200,3800);
  var topAbs=rodt.getBoundingClientRect().top+window.pageYOffset,rvTop=rv.getBoundingClientRect().top+window.pageYOffset,start=window.pageYOffset;
  var navDone=false;
  function e2(p){return -(Math.cos(Math.PI*p)-1)/2}
  var t0=null;
  function f(t){
    if(t0===null)t0=t;var p=clamp((t-t0)/ms,0,1),h=H*e2(p);
    rv.style.height=h.toFixed(1)+"px";
    if(!userScrolled){var want=Math.max(start,Math.min(rvTop+h+70-innerHeight,topAbs-24));if(want>window.pageYOffset)window.scrollTo(0,want)}
    if(!navDone&&p>.1){navDone=true;html.classList.add("nin")}
    if(p>.16)html.classList.add("sin");
    if(p<1)requestAnimationFrame(f);else{rv.style.height="";opening=false;setTimeout(function(){html.classList.remove("opening","sin","nin")},1700)}
  }
  requestAnimationFrame(f)
}
safe(function(){
  if(!rolled||!html.classList.contains("intro"))return;
  drawRoll();addEventListener("resize",function(){if(html.classList.contains("intro")&&!rolled.classList.contains("go"))drawRoll()});
  var hint=$("hint");
  rolled.addEventListener("click",function(){
    if(rolled.classList.contains("go"))return;rolled.classList.add("go");if(hint)hint.classList.add("gone");
    if(R){rolled.classList.add("gone");openScroll();return}
    animate(0,1,900,function(p){drawRoll(p)},function(){rolled.classList.add("gone");setTimeout(openScroll,200)})
  })
});

/* ---------------- 藏品：散落排列 + 老电视弹窗 ---------------- */
function langOf(o){var l=html.lang==="ja"?"ja":"zh";if(o==null)return"";if(typeof o==="string")return o;var v=o[l];return v!=null?v:(o.zh||"")}
function fd(d){return String(d||"").replace(/^(\d{4})-(\d{1,2})-(\d{1,2})$/,function(m,y,mo,da){return y+"年"+(+mo)+"月"+(+da)+"日"})}
function rng(s){return function(){s|=0;s=s+0x6D2B79F5|0;var t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
var tvm;
function buildTV(){
  tvm=document.createElement("div");tvm.className="tvm";tvm.setAttribute("aria-hidden","true");
  tvm.innerHTML='<div class="tvw" role="dialog" aria-modal="true"><button class="tvx" type="button" aria-label="关闭">×</button>'+
   '<div class="pho"><div class="phi"><img class="im" alt=""><i class="vl"></i><i class="gr"></i></div><div class="no">NO IMAGE</div></div>'+
   '<div class="tvr"><time></time><h3></h3><div class="tvb"></div></div></div>';
  document.body.appendChild(tvm);
  tvm.addEventListener("click",function(e){if(e.target===tvm||e.target.classList.contains("tvx"))closeTV()});
  document.addEventListener("keydown",function(e){if(e.key==="Escape")closeTV()})
}
function openTV(it){
  if(!tvm)buildTV();
  var im=tvm.querySelector(".im"),no=tvm.querySelector(".no"),phi=tvm.querySelector(".phi");
  im.onerror=function(){phi.style.display="none";no.style.display="grid"};
  if(it.img){phi.style.display="";no.style.display="none";im.src=it.img;phi.style.setProperty("--m",'url("'+String(it.img).replace(/"/g,"%22")+'")')}else{im.removeAttribute("src");phi.style.display="none";no.style.display="grid"}
  tvm.querySelector("time").textContent=fd(it.date);tvm.querySelector("h3").textContent=langOf(it.title);
  var b=tvm.querySelector(".tvb");b.textContent="";String(langOf(it.text)).split("\n").forEach(function(s){if(s){var p=document.createElement("p");p.textContent=s;b.appendChild(p)}});
  tvm.removeAttribute("aria-hidden");void tvm.offsetWidth;tvm.classList.remove("on");void tvm.offsetWidth;tvm.classList.add("on");
  document.body.style.overflow="hidden"
}
function closeTV(){if(!tvm||!tvm.classList.contains("on"))return;tvm.classList.remove("on");tvm.setAttribute("aria-hidden","true");document.body.style.overflow=""}
safe(function(){
  var cl=$("coll");if(!cl)return;
  var items=(Array.isArray(window.COLLECTION)?window.COLLECTION:[]).slice().sort(function(a,b){return String(b.date||"").localeCompare(String(a.date||""))});
  cl.textContent="";cl.className="scat";var els=[];
  items.forEach(function(it,i){
    var b=document.createElement("button");b.type="button";b.className="sc";b.title=langOf(it.title);
    function ph(){b.textContent="";var d=document.createElement("div");d.className="ph";d.textContent=langOf(it.title)||"图片";b.appendChild(d);appendNo()}
    function appendNo(){var n=document.createElement("i");n.textContent=(i<9?"0":"")+(i+1)+".";b.appendChild(n)}
    if(it.img){var im=new Image();im.className="im";im.alt=langOf(it.title);im.src=it.img;im.loading="lazy";im.onerror=ph;b.appendChild(im);appendNo()}else ph();
    b.addEventListener("click",function(){openTV(it)});cl.appendChild(b);els.push(b)});
  function layout(){
    var W=cl.clientWidth||600,N=els.length;if(!N)return;
    var cols=clamp(Math.round(Math.sqrt(N*2.4)),1,Math.max(1,Math.floor(W/90))),rows=Math.ceil(N/cols),cw=W/cols,s=Math.min(cw*.5,104),ch=s*1.3;
    els.forEach(function(e,i){var r=Math.floor(i/cols),c=i%cols,rnd=rng(i*97+13),
      x=c*cw+(cw-s)/2+(rnd()*2-1)*(cw-s)*.4+((r%2)?cw*.08:-cw*.04),y=r*ch+(ch-s)/2+(rnd()*2-1)*(ch-s)*.45+((c%2)?ch*.08:-ch*.03);
      x=clamp(x,0,Math.max(0,W-s-24));y=Math.max(6,y);e.style.cssText+=";left:"+x.toFixed(1)+"px;top:"+y.toFixed(1)+"px;width:"+s.toFixed(1)+"px;height:"+s.toFixed(1)+"px"});
    cl.style.height=Math.ceil(rows*ch+s*.3+24)+"px"}
  layout();addEventListener("resize",layout);setTimeout(layout,300)
});

/* ---------------- 启动 ---------------- */
SS.set("seen","1");
if(!html.classList.contains("intro"))html.classList.add("ssh");
})();
