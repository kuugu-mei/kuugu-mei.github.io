(function(){var S=document.currentScript.src,d=document.body,h=document.documentElement,l="zh";
try{l=localStorage.getItem("lang")||"zh"}catch(e){}
function set(){d.setAttribute("data-lang",l);h.lang=l}set();
document.getElementById("lang").onclick=function(){l=l==="zh"?"ja":"zh";set();try{localStorage.setItem("lang",l)}catch(e){}};
// 像素音符
var N=[["..XX..","..X.X.","..X..X","..X...","..X...","XXX...","XXX...",".X...."],["..XXXXX","..X...X","..X...X","..X...X","XXX.XXX","XXX.XXX",".X...X."]],
C=["#a9cfb4","#cfe3c4","#e3dcbc","#a6dde8"],cv=document.getElementById("notes"),x=cv.getContext("2d"),A=[],W,H,
still=matchMedia("(prefers-reduced-motion:reduce)").matches;
function rs(){W=cv.width=innerWidth;H=cv.height=innerHeight}rs();addEventListener("resize",rs);
for(var i=0;i<14;i++)A.push({x:Math.random()*W,y:Math.random()*H,s:3+(i%2),v:.35+Math.random()*.45,k:i%2,c:C[i%4],p:Math.random()*6});
function dr(){x.clearRect(0,0,W,H);A.forEach(function(a){var g=N[a.k],px=Math.round(a.x+Math.sin(a.y/60+a.p)*10);x.globalAlpha=.55;x.fillStyle=a.c;
g.forEach(function(r,j){for(var m=0;m<r.length;m++)if(r[m]=="X")x.fillRect(px+m*a.s,Math.round(a.y)+j*a.s,a.s,a.s)});
if(!still){a.y+=a.v;if(a.y>H){a.y=-40;a.x=Math.random()*W}}});if(!still)requestAnimationFrame(dr)}dr();
// 像素角色滚动框
var L=["sonic","riolu","lucario","torchic","blaziken","charmander","charizard"],T=document.getElementById("track"),G=["#9bd8a8","#a6dde8","#e6d28a"];
function slime(c){var k=document.createElement("canvas");k.width=k.height=16;var q=k.getContext("2d");q.fillStyle=c;
["......XXXX......","....XXXXXXXX....","...XXXXXXXXXX...","..XXXXXXXXXXXX..","..XXXXXXXXXXXX..",".XXXXXXXXXXXXXX.",".XXXXXXXXXXXXXX.","XXXXXXXXXXXXXXXX","XXXXXXXXXXXXXXXX","XXXXXXXXXXXXXXXX"].forEach(function(r,j){for(var m=0;m<16;m++)if(r[m]=="X")q.fillRect(m,j+5,1,1)});
q.fillStyle="#203a35";q.fillRect(4,10,2,3);q.fillRect(10,10,2,3);return k.toDataURL()}
for(var t=0;t<2;t++)L.forEach(function(n,i){var im=new Image();im.alt="";im.src=new URL("images/sprites/"+n+".png",S).href;
im.onerror=function(){im.onerror=null;im.src=slime(G[i%3])};T.appendChild(im)});
})();
