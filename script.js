(function(){var S=document.currentScript.src,d=document.body,h=document.documentElement,l="zh",R=matchMedia("(prefers-reduced-motion:reduce)").matches;
try{l=localStorage.getItem("lang")||"zh"}catch(e){}
function set(){d.setAttribute("data-lang",l);h.lang=l}set();
document.getElementById("lang").onclick=function(){l=l==="zh"?"ja":"zh";set();try{localStorage.setItem("lang",l)}catch(e){}};
// 像素音符背景
var N=[["..XX..","..X.X.","..X..X","..X...","..X...","XXX...","XXX...",".X...."],["..XXXXX","..X...X","..X...X","..X...X","XXX.XXX","XXX.XXX",".X...X."]],
C=["#6fb3a4","#7fb0d6","#8fd0a0","#5fa0c0"],cv=document.getElementById("notes"),x=cv.getContext("2d"),A=[],W,H;
function rs(){W=cv.width=innerWidth;H=cv.height=innerHeight}rs();addEventListener("resize",rs);
for(var i=0;i<24;i++)A.push({x:Math.random()*W,y:Math.random()*H,s:3+(i%2),v:.35+Math.random()*.45,k:i%2,c:C[i%4],p:Math.random()*6});
function dr(){x.clearRect(0,0,W,H);A.forEach(function(a){var g=N[a.k],p=Math.round(a.x+Math.sin(a.y/60+a.p)*10);x.globalAlpha=.7;x.fillStyle=a.c;
g.forEach(function(r,j){for(var m=0;m<r.length;m++)if(r[m]=="X")x.fillRect(p+m*a.s,Math.round(a.y)+j*a.s,a.s,a.s)});
if(!R){a.y+=a.v;if(a.y>H){a.y=-40;a.x=Math.random()*W}}});if(!R)requestAnimationFrame(dr)}dr();
// 彩色星星碎片；光标图案已写在样式文件里
if(matchMedia("(pointer:fine)").matches){
var SC=["#4da3ff","#4fd6a0","#ffcf4d","#ff8fb8","#a58bff","#3fd0d8"],lt=0;if(!R)addEventListener("mousemove",function(e){var n=Date.now();if(n-lt<70)return;lt=n;var s=document.createElement("i");s.className="spk";s.style.setProperty("--c",SC[Math.floor(Math.random()*SC.length)]);
s.style.left=e.clientX+(Math.random()*16-8)+"px";s.style.top=e.clientY+(Math.random()*12)+"px";s.style.setProperty("--dx",(Math.random()*20-10)+"px");
s.onanimationend=function(){s.remove()};document.body.appendChild(s)})}
// 日志 / 丝竹渲染
function el(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e}
function srt(a,k){return a.slice().sort(function(p,q){return (q[k]+" "+(q.time||"")).localeCompare(p[k]+" "+(p.time||""))})}
function pid(p){return "p-"+(p.id||(p.date+"-"+(p.time||"")).replace(/[^0-9a-z-]/gi,""))}
var PS=srt(window.POSTS||[],"date"),lat=document.getElementById("latest"),bp=document.getElementById("posts");
if(lat)PS.slice(0,3).forEach(function(p){var a=el("a","box"),t=String(p.text||"").replace(/\s+/g," ");a.href="blog.html#"+pid(p);a.appendChild(el("h3",0,p.title));a.appendChild(el("p",0,p.date+" "+(p.time||"")+" · "+t.slice(0,36)+(t.length>36?"…":"")));lat.appendChild(a)});
if(bp){PS.forEach(function(p){var a=el("article","post");a.id=pid(p);a.appendChild(el("time",0,p.date+" "+(p.time||"")));a.appendChild(el("h3",0,p.title));String(p.text||"").split("\n").forEach(function(t){if(t)a.appendChild(el("p",0,t))});[].concat(p.img||[]).forEach(function(s){var i=new Image();i.src=s;i.alt="";a.appendChild(i)});bp.appendChild(a)});
if(location.hash){var tg=document.getElementById(location.hash.slice(1));if(tg){tg.classList.add("hit");setTimeout(function(){tg.scrollIntoView({block:"center"})},60)}}}
var SZ=window.SIZHU||{tops:[],entries:[]},tp=document.getElementById("tops"),se=document.getElementById("sentries");
if(tp)SZ.tops.slice().sort(function(a,b){return b.month.localeCompare(a.month)}).forEach(function(m,i){var bx=el(i?"details":"div","post");bx.appendChild(i?el("summary",0,m.month+" Top Tracks"):el("h3",0,m.month+" Top Tracks"));var ol=el("ol","rank");m.tracks.forEach(function(s){ol.appendChild(el("li",0,s))});bx.appendChild(ol);tp.appendChild(bx)});
if(se)srt(SZ.entries,"date").forEach(function(e){var a=el("article","post"),ul=el("ul","plain");a.appendChild(el("time",0,e.date+" "+(e.time||"")));e.songs.forEach(function(s){ul.appendChild(el("li",0,"♪ "+s))});a.appendChild(ul);String(e.text||"").split("\n").forEach(function(t){if(t)a.appendChild(el("p",0,t))});se.appendChild(a)});
// 背景音乐：依次尝试 mp3 / m4a / ogg / wav
var names=["qingmeng.mp3","qingmeng.m4a","qingmeng.ogg","qingmeng.wav","qingmeng.mp3.mp3","青梦.mp3","青梦 - Youzee Music.mp3"],ni=0,bad=false,au=new Audio(),b=document.getElementById("bgm"),on=true;
try{on=localStorage.getItem("bgm")!=="off"}catch(e){}
au.loop=true;au.volume=.4;au.preload="auto";
function ui(){b.textContent=bad?"♪ 没找到音乐":(au.paused?"♪ OFF":"♪ ON");b.title=bad?"请把音乐文件放进 music 文件夹，命名为 qingmeng.mp3":"背景音乐"}
function go(){if(on&&!bad)au.play().catch(function(){})}
function load(){au.src=new URL("music/"+names[ni],S).href}
au.onerror=function(){ni++;if(ni<names.length){load();go()}else{bad=true;ui()}};
au.addEventListener("loadedmetadata",function(){try{var s=+sessionStorage.getItem("bgmT");if(s&&s<au.duration)au.currentTime=s}catch(e){}});
au.addEventListener("timeupdate",function(){try{sessionStorage.setItem("bgmT",au.currentTime)}catch(e){}});
au.addEventListener("play",ui);au.addEventListener("pause",ui);
b.onclick=function(){if(bad)return;if(au.paused){on=true;au.play().catch(function(){})}else{on=false;au.pause()}try{localStorage.setItem("bgm",on?"on":"off")}catch(e){}};
load();ui();go();
addEventListener("pointerdown",function f(e){if(e.target===b)return;go();removeEventListener("pointerdown",f)});
})();
