(function(){var S=document.currentScript.src,d=document.body,h=document.documentElement,l="zh",R=matchMedia("(prefers-reduced-motion:reduce)").matches;
try{l=localStorage.getItem("lang")||"zh"}catch(e){}
function set(){d.setAttribute("data-lang",l);h.lang=l}set();
document.getElementById("lang").onclick=function(){l=l==="zh"?"ja":"zh";set();try{localStorage.setItem("lang",l)}catch(e){}};
function px(rows,pal,s){var k=document.createElement("canvas");k.width=k.height=16*s;var q=k.getContext("2d");rows.forEach(function(r,j){for(var m=0;m<16;m++){var c=pal[r[m]];if(c){q.fillStyle=c;q.fillRect(m*s,j*s,s,s)}}});return k.toDataURL()}
// 像素音符背景
var N=[["..XX..","..X.X.","..X..X","..X...","..X...","XXX...","XXX...",".X...."],["..XXXXX","..X...X","..X...X","..X...X","XXX.XXX","XXX.XXX",".X...X."]],
C=["#6fb3a4","#7fb0d6","#8fd0a0","#5fa0c0"],cv=document.getElementById("notes"),x=cv.getContext("2d"),A=[],W,H;
function rs(){W=cv.width=innerWidth;H=cv.height=innerHeight}rs();addEventListener("resize",rs);
for(var i=0;i<14;i++)A.push({x:Math.random()*W,y:Math.random()*H,s:3+(i%2),v:.35+Math.random()*.45,k:i%2,c:C[i%4],p:Math.random()*6});
function dr(){x.clearRect(0,0,W,H);A.forEach(function(a){var g=N[a.k],p=Math.round(a.x+Math.sin(a.y/60+a.p)*10);x.globalAlpha=.7;x.fillStyle=a.c;
g.forEach(function(r,j){for(var m=0;m<r.length;m++)if(r[m]=="X")x.fillRect(p+m*a.s,Math.round(a.y)+j*a.s,a.s,a.s)});
if(!R){a.y+=a.v;if(a.y>H){a.y=-40;a.x=Math.random()*W}}});if(!R)requestAnimationFrame(dr)}dr();
// 光标：四叶草 / 点击青苹果 / 星星碎片
if(matchMedia("(pointer:fine)").matches){
var AP=["........S.......","........S.FFFF..","..DDDDD.DDDDDD..",".DLLLLGDGGGGGGD.",".DLHHLGGGGGGGGGD",".DLHLGGGGGGGGGGD",".DLLGGGGGGGGGGPD",".DGGGKGGGGGKGGPD",".DGGGKGGGGGKGPPD",".DGGGGGKKGGGGPPD",".DGGGGGGGGGGPPPD","..DGGGGGGGGPPPD.","...DGGGGGGPPPD..","....DDGGGPPDD...","......DDDD......","................"],
CU=["........S.......","........S.FFFF..","..DDDDD.DDDDDD..",".DGGGGGDGGGGGGD.",".DGCCCCCCCCCCCGD",".DGCCCCCCCCCCCGD",".DGCCCEEEEECCCGD",".DGCCCESESECCCGD",".DGCCCEESEECCCGD",".DGCCCEEEEECCCGD","..DGCCCCCCCCCGD.","...DGGCCCCCGGD..",".....DDGGGDD....","................","................","................"].map(function(r,i){return i>2&&i<13?r.slice(0,8)+"."+r.slice(9):r}),
ap=px(AP,{D:"#3f8f4a",G:"#98d672",L:"#c4f08f",H:"#f4ffdc",P:"#6fb85a",S:"#7a5a3a",F:"#5fbf6a",K:"#2f4f3a"},2),
cut=px(CU,{D:"#3f8f4a",G:"#98d672",C:"#f6ffd8",E:"#e3f0b4",S:"#7a5a3a",F:"#5fbf6a"},2),
st=document.createElement("style");st.textContent='html,html *{cursor:url("'+ap+'") 16 16,auto!important}html.dn,html.dn *{cursor:url("'+cut+'") 16 16,auto!important}';document.head.appendChild(st);
addEventListener("mousedown",function(){h.classList.add("dn")});addEventListener("mouseup",function(){h.classList.remove("dn")});
var lt=0;if(!R)addEventListener("mousemove",function(e){var n=Date.now();if(n-lt<70)return;lt=n;var s=document.createElement("i");s.className="spk";
s.style.left=e.clientX+(Math.random()*16-8)+"px";s.style.top=e.clientY+(Math.random()*12)+"px";s.style.setProperty("--dx",(Math.random()*20-10)+"px");
s.onanimationend=function(){s.remove()};document.body.appendChild(s)})}
// 背景音乐
var au=new Audio(new URL("music/qingmeng.mp3",S).href),b=document.getElementById("bgm"),on=true;
try{on=localStorage.getItem("bgm")!=="off"}catch(e){}
au.loop=true;au.volume=.4;
au.addEventListener("loadedmetadata",function(){try{var s=+sessionStorage.getItem("bgmT");if(s&&s<au.duration)au.currentTime=s}catch(e){}});
au.addEventListener("timeupdate",function(){try{sessionStorage.setItem("bgmT",au.currentTime)}catch(e){}});
au.onerror=function(){b.style.display="none"};
function ui(){b.textContent=au.paused?"♪ OFF":"♪ ON"}
au.addEventListener("play",ui);au.addEventListener("pause",ui);ui();
function go(){if(on)au.play().catch(function(){})}
b.onclick=function(){if(au.paused){on=true;au.play().catch(function(){})}else{on=false;au.pause()}try{localStorage.setItem("bgm",on?"on":"off")}catch(e){}};
go();addEventListener("pointerdown",function f(e){if(e.target===b)return;go();removeEventListener("pointerdown",f)});
})();
