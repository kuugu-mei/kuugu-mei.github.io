/* 新增效果（v18）：背景视频、标题乱码出现、绳结卷轴开场、水墨转场、藏品散落与老电视弹窗。
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
var K={ol:"#5b749a",lt:"#f1f5fa",bs:"#d9e3f1",sh:"#b8c9e0",dk:"#8ba3c6",fr:"#6f89b0",cream:"#fbefd2",tan:"#d3b97e",ed:"#8a6c3a",w:"#ffffff"};
var FRET=["............",".XXXXXXXXXX.",".X........X.",".X.XXXXXX.X.",".X.X......X.",".X.XXXXXXXX.",".X.........."];
var rolled=$("rolled"),rc=$("rc"),rcx=rc&&rc.getContext("2d");
function drawRoll(p){
  if(!rc)return;var box=rc.parentNode,cols=Math.max(80,Math.min(150,Math.floor((box.clientWidth||560)/4))),H=29;
  if(rc.width!==cols||rc.height!==H){rc.width=cols;rc.height=H;rc.style.width=cols*4+"px";rc.style.height=H*4+"px"}
  var c=rcx;c.clearRect(0,0,cols,H);
  function px(x,y,col,w,h){c.fillStyle=col;c.fillRect(Math.round(x),Math.round(y),w||1,h||1)}
  var x0=9,x1=cols-10;
  for(var y=3;y<=15;y++){var col=y===3||y===15?K.ol:y<=5?K.lt:y<=10?K.bs:y<=13?K.sh:K.dk;px(x0,y,col,x1-x0+1,1)}
  for(var ty=0;ty<7;ty++)for(var x=x0;x<=x1;x++){if(FRET[ty].charAt((x-x0)%12)==="X")px(x,6+ty,K.fr)}
  function cap(cx){for(var y=0;y<19;y++)for(var x=cx-9;x<=cx+9;x++){var d=Math.sqrt((x-cx)*(x-cx)+(y-9)*(y-9));if(d>9.4)continue;px(x,y,d>7.8?K.ol:d>6.2?K.dk:d>3.4?K.lt:d>2.2?((x+y)%2?K.dk:K.lt):K.dk)}}
  cap(9);cap(cols-10);
  var cx=Math.floor(cols/2);
  var a=p==null?0:p;
  function band(x,al,dx){c.globalAlpha=al;for(var y=2;y<=16;y++){px(x+dx,y,K.ed);px(x+dx+1,y,y%2?K.cream:K.tan);px(x+dx+2,y,y%2?K.tan:K.cream);px(x+dx+3,y,K.ed)}c.globalAlpha=1}
  var bAl=1-clamp((a-.2)/.5,0,1);
  if(bAl>0){band(cx-8,bAl,-Math.round(a*18));band(cx+4,bAl,Math.round(a*18))}
  var kAl=1-clamp(a/.35,0,1),sh=a>0&&a<.18?(Math.random()<.5?1:-1):0;
  if(kAl>0){c.globalAlpha=kAl;for(var j=0;j<6;j++)for(var i=0;i<6;i++){var edge=i===0||j===0||i===5||j===5;px(cx-3+i+sh,6+j,edge?K.ed:((i+j)%2?K.cream:K.tan))}c.globalAlpha=1}
  var tAl=1-clamp((a-.25)/.5,0,1);
  if(tAl>0){c.globalAlpha=tAl;var fall=Math.round(a*a*44);
    for(var k=0;k<11;k++){var sx=Math.floor(k*.5)+Math.round(a*8);px(cx-2-sx,12+k+fall,K.ed);px(cx-1-sx,12+k+fall,k%2?K.cream:K.tan);px(cx+2+sx,12+k+fall,K.ed);px(cx+1+sx,12+k+fall,k%2?K.tan:K.cream)}
    px(cx-8-Math.round(a*8),23+fall,K.tan,3,2);px(cx+6+Math.round(a*8),23+fall,K.tan,3,2);c.globalAlpha=1}
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

/* ---------------- 水墨转场（只用于去「首页」「关于我」） ---------------- */
var ink,inkx,SP=null;
var RAMP=" .:-=+*#%@";
function sprites(cell){
  if(SP&&SP.cell===cell)return SP;
  var cols=["rgba(150,200,255,1)","rgba(232,242,255,1)"],A=[];
  cols.forEach(function(col){var row=[];for(var g=0;g<RAMP.length;g++){var c=document.createElement("canvas");c.width=c.height=cell;var x=c.getContext("2d");x.font="bold "+(cell+1)+"px ui-monospace,Menlo,Consolas,monospace";x.textAlign="center";x.textBaseline="middle";x.fillStyle=col;x.fillText(RAMP.charAt(g),cell/2,cell/2);row.push(c)}A.push(row)});
  SP={cell:cell,a:A};return SP
}
function inkSetup(){
  if(!ink){ink=document.createElement("canvas");ink.id="ink";document.body.appendChild(ink)}
  var cell=16,W=innerWidth,H=innerHeight,cols=Math.ceil(W/cell),rows=Math.ceil(H/cell),N=cols*rows;
  ink.width=cols*cell;ink.height=rows*cell;inkx=ink.getContext("2d");
  var n=4+Math.floor(Math.random()*3),O=[];for(var i=0;i<n;i++)O.push([Math.random()*W,Math.random()*H,Math.random()*.2]);
  var maxD=Math.hypot(W,H)*.6,dist=new Float32Array(N),nz=new Float32Array(N);
  function lat(sz){var gw=Math.ceil(cols/sz)+2,gh=Math.ceil(rows/sz)+2,g=[];for(var i=0;i<gw*gh;i++)g.push(Math.random());
    return function(x,y){var fx=x/sz,fy=y/sz,ix=Math.floor(fx),iy=Math.floor(fy),tx=fx-ix,ty=fy-iy;tx=tx*tx*(3-2*tx);ty=ty*ty*(3-2*ty);var a=g[iy*gw+ix],b=g[iy*gw+ix+1],d=g[(iy+1)*gw+ix],e=g[(iy+1)*gw+ix+1];return(a+(b-a)*tx)*(1-ty)+(d+(e-d)*tx)*ty}}
  var A=lat(8),B=lat(3.2),C=lat(1.5);
  for(var y=0;y<rows;y++)for(var x=0;x<cols;x++){var k=y*cols+x,m=9;for(var j=0;j<n;j++){var d=Math.hypot((x+.5)*cell-O[j][0],(y+.5)*cell-O[j][1])/maxD+O[j][2];if(d<m)m=d}dist[k]=m;nz[k]=A(x,y)*.6+B(x,y)*.3+C(x,y)*.1}
  return{cell:cell,cols:cols,rows:rows,dist:dist,nz:nz,sp:sprites(cell)}
}
function inkDraw(S,f,cover){
  var c=inkx,cell=S.cell,cols=S.cols,rows=S.rows,dist=S.dist,nz=S.nz,sp=S.sp.a;
  c.clearRect(0,0,ink.width,ink.height);
  var fr=Math.floor(f*40);
  for(var y=0;y<rows;y++)for(var x=0;x<cols;x++){var k=y*cols+x,a=(f-dist[k]-nz[k]*.3)/.24;a=a<0?0:a>1?1:a;if(!cover)a=1-a;
    if(a<.03)continue;var px=x*cell,py=y*cell;
    c.globalAlpha=.5*a;c.fillStyle="rgb(8,16,36)";c.fillRect(px,py,cell,cell);
    if(a>.97){var g=((x*7+y*13+fr)%13+13)%13;if(g<2){c.globalAlpha=.3;c.drawImage(sp[1][3+g*3],px,py)}continue}
    c.globalAlpha=a<.35?.35+a*1.2:.5+a*.45;c.drawImage(sp[a<.35?0:1][Math.min(9,Math.floor(a*10))],px,py)}
  c.globalAlpha=1
}
function warm(href){try{var l=document.createElement("link");l.rel="prefetch";l.href=href;document.head.appendChild(l)}catch(e){}try{fetch(href,{credentials:"same-origin"}).catch(function(){})}catch(e){}}
function inkOut(href){
  warm(href);
  var S=inkSetup(),t0=null,D=620;
  function f(t){if(t0===null)t0=t;var p=clamp((t-t0)/D,0,1);inkDraw(S,-.3+1.7*p,true);
    if(p<1)requestAnimationFrame(f);else{SS.set("ink","1");location.href=href}}
  requestAnimationFrame(f)
}
safe(function(){
  if(!html.classList.contains("inkin"))return;
  SS.del("ink");
  if(R){html.classList.remove("inkin");return}
  var S=inkSetup();inkDraw(S,2,true);html.classList.remove("inkin");
  var t0=null,D=800;function f(t){if(t0===null)t0=t;var p=clamp((t-t0)/D,0,1);inkDraw(S,-.3+1.7*p,false);
    if(p<1)requestAnimationFrame(f);else{inkx.clearRect(0,0,ink.width,ink.height)}}requestAnimationFrame(f)
});
document.addEventListener("pointerover",function(e){var a=e.target.closest&&e.target.closest(".bar a");if(a&&/(^|\/)(index|about)\.html/.test(a.getAttribute("href")||"")&&!a.__w){a.__w=1;try{var l=document.createElement("link");l.rel="prefetch";l.href=a.href;document.head.appendChild(l)}catch(x){}}},{passive:true});
document.addEventListener("click",function(e){
  var a=e.target.closest&&e.target.closest(".bar a");if(!a||e.defaultPrevented||e.metaKey||e.ctrlKey||e.shiftKey||e.button)return;
  var h=a.getAttribute("href")||"";if(!/(^|\/)(index|about)\.html(\?.*)?$/.test(h))return;
  if(a.pathname===location.pathname||R)return;
  e.preventDefault();safe(function(){inkOut(a.href)})
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
    var cols=clamp(Math.round(Math.sqrt(N*1.5)),1,Math.max(1,Math.floor(W/110))),rows=Math.ceil(N/cols),cw=W/cols,s=Math.min(cw*.76,200),ch=s*1.22;
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
