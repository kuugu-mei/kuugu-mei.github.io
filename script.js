(function(){var S=document.currentScript.src,d=document.body,h=document.documentElement,l="zh",R=matchMedia("(prefers-reduced-motion:reduce)").matches;
try{l=localStorage.getItem("lang")||"zh"}catch(e){}
function set(){d.setAttribute("data-lang",l);h.lang=l}set();
document.getElementById("lang").onclick=function(){l=l==="zh"?"ja":"zh";set();try{localStorage.setItem("lang",l)}catch(e){}};
// 像素音符背景
var N=[["..XX..","..X.X.","..X..X","..X...","..X...","XXX...","XXX...",".X...."],["..XXXXX","..X...X","..X...X","..X...X","XXX.XXX","XXX.XXX",".X...X."]],
C=["#6fb3a4","#7fb0d6","#8fd0a0","#5fa0c0"],cv=document.getElementById("notes"),x=cv.getContext("2d"),A=[],W,H;
function rs(){W=cv.width=innerWidth;H=cv.height=innerHeight}rs();addEventListener("resize",rs);
for(var i=0;i<14;i++)A.push({x:Math.random()*W,y:Math.random()*H,s:3+(i%2),v:.35+Math.random()*.45,k:i%2,c:C[i%4],p:Math.random()*6});
function dr(){x.clearRect(0,0,W,H);A.forEach(function(a){var g=N[a.k],p=Math.round(a.x+Math.sin(a.y/60+a.p)*10);x.globalAlpha=.7;x.fillStyle=a.c;
g.forEach(function(r,j){for(var m=0;m<r.length;m++)if(r[m]=="X")x.fillRect(p+m*a.s,Math.round(a.y)+j*a.s,a.s,a.s)});
if(!R){a.y+=a.v;if(a.y>H){a.y=-40;a.x=Math.random()*W}}});if(!R)requestAnimationFrame(dr)}dr();
// 点击切开苹果（备用）+ 星星碎片；光标图案已写在样式文件里
if(matchMedia("(pointer:fine)").matches){
addEventListener("mousedown",function(){h.classList.add("dn")});addEventListener("mouseup",function(){h.classList.remove("dn")});
var lt=0;if(!R)addEventListener("mousemove",function(e){var n=Date.now();if(n-lt<70)return;lt=n;var s=document.createElement("i");s.className="spk";
s.style.left=e.clientX+(Math.random()*16-8)+"px";s.style.top=e.clientY+(Math.random()*12)+"px";s.style.setProperty("--dx",(Math.random()*20-10)+"px");
s.onanimationend=function(){s.remove()};document.body.appendChild(s)})}
// 背景音乐：依次尝试 mp3 / m4a / ogg / wav
var names=["qingmeng.mp3","qingmeng.m4a","qingmeng.ogg","qingmeng.wav"],ni=0,bad=false,au=new Audio(),b=document.getElementById("bgm"),on=true;
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
