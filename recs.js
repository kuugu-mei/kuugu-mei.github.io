(function(){
var d=document,box=d.getElementById("recs");if(!box)return;
var CATS=[["media","media","media"],["site","site","site"],["game","game","game"],["book","book","book"],["item","item","item"]];
var S=window.SITE||{},items=Array.isArray(S.recs)&&S.recs.length?S.recs:[
 {cat:"game",title:"Mouthwashing",img:"images/mouthwashing.png",fit:"contain"},{cat:"media",title:"（作品名）",img:"images/cv-1.png"},{cat:"game",title:"（游戏名）",img:"images/cv-2.png"},{cat:"book",title:"（书名）",img:"images/cv-3.png"},{cat:"site",title:"（网站名）",img:"images/cv-4.png"},
 {cat:"item",title:"（物品名）",img:"images/cv-5.png"},{cat:"media",title:"（纪录片名）",img:"images/cv-6.png"},{cat:"game",title:"（游戏名）",img:"images/cv-7.png"},{cat:"site",title:"（网站名）",img:"images/cv-8.png"},
 {cat:"book",title:"（书名）",img:"images/cv-9.png"},{cat:"item",title:"（物品名）",img:"images/cv-10.png"}];
/* 封面：保留原色，做成有序抖动的像素点阵（每个颜色通道 4 阶） */
var BY=[0,8,2,10,12,4,14,6,3,11,1,9,15,7,13,5];
function dth(im){if(im.getAttribute("data-d"))return;var w0=im.naturalWidth,h0=im.naturalHeight;if(!w0||!h0)return;
 var rt=w0/h0,cd=im.closest(".rc");if(cd){if(rt>1.45){cd.className+=" wide";cd.style.setProperty("--ar",Math.min(2.4,rt))}else cd.style.setProperty("--ar",Math.max(.66,Math.min(1.15,rt)))}
 try{var W=Math.min(w0,200),H=Math.max(1,Math.round(h0*W/w0)),c=d.createElement("canvas");c.width=W;c.height=H;var x=c.getContext("2d");x.drawImage(im,0,0,W,H);var id=x.getImageData(0,0,W,H),p=id.data,L=3;
  for(var y=0;y<H;y++)for(var i=0;i<W;i++){var k=(y*W+i)*4,t=(BY[(y&3)*4+(i&3)]+.5)/16-.5;for(var j=0;j<3;j++){var v=(p[k+j]/255-.5)*1.12+.5+t/L;v=Math.round(Math.min(1,Math.max(0,v))*L)/L;p[k+j]=v*255}}
  x.putImageData(id,0,0);im.setAttribute("data-d","1");im.src=c.toDataURL("image/png")}catch(e){}}
var on={};/* 没有选中任何分类 = 全部显示；点哪个就只显示哪个，可多选，再点一下取消 */
function lg(){return d.documentElement.lang==="ja"?"ja":"zh"}
function tx(v){return v&&typeof v==="object"?(v[lg()]||v.zh||""):(v||"")}
function norm(c){return c==="thing"?"item":c}
var bar=d.createElement("div");bar.className="rf";
CATS.forEach(function(c){var b=d.createElement("button");b.type="button";b.setAttribute("data-c",c[0]);b.innerHTML='<i></i><span>'+c[1]+'</span>';
 b.onclick=function(){on[c[0]]=!on[c[0]];b.className=on[c[0]]?"on":"";apply()};bar.appendChild(b)});
var g=d.createElement("div");g.className="rg";
items.forEach(function(it){var a=d.createElement(it.url?"a":"div");a.className="rc";a.setAttribute("data-c",norm(it.cat));var tip=tx(it.tip);if(it.url){a.href=it.url;a.target="_blank";a.rel="noopener"}
 var c=CATS.filter(function(x){return x[0]===it.cat})[0]||["",it.cat||"",it.cat||""];
 a.innerHTML='<div class="ty">'+String(norm(it.cat)||"").toUpperCase()+'</div><div class="im"><img alt="" loading="lazy"></div><div class="tt"></div>';
 var im=a.querySelector("img");if(it.fit==="contain")a.querySelector(".im").className+=" contain";if(it.pos)im.style.objectPosition=it.pos;im.onload=function(){dth(this)};if(it.img)im.src=it.img;else a.querySelector(".im").className+=" none";im.onerror=function(){this.style.display="none"};
 a.querySelector(".tt").textContent=tx(it.title);
 if(tip){a.className+=" hastip";var tg=d.createElement("span");tg.className="tg";tg.textContent="tip";a.appendChild(tg);a.setAttribute("role","button");a.tabIndex=0;
  a.addEventListener("click",function(e){e.preventDefault();showTip(a,it)});a.addEventListener("keydown",function(e){if(e.key==="Enter"){e.preventDefault();showTip(a,it)}})}
 g.appendChild(a)});
/* 标签说明：像素对话气泡，点别处关闭 */
var tb=null;
function closeTip(){if(tb){tb.remove();tb=null}}
function showTip(a,it){var same=tb&&tb._a===a;closeTip();if(same)return;
 tb=d.createElement("div");tb.className="tipb";tb._a=a;var p=d.createElement("p");p.textContent=tx(it.tip);tb.appendChild(p);
 if(it.url){var l=d.createElement("a");l.href=it.url;l.target="_blank";l.rel="noopener";l.textContent=lg()==="ja"?"開く ↗":"前往 ↗";tb.appendChild(l)}
 d.body.appendChild(tb);
 var r=a.getBoundingClientRect(),w=tb.offsetWidth,h=tb.offsetHeight,x=Math.max(8,Math.min(innerWidth-w-8,r.left+r.width/2-w/2)),up=r.top>h+18,y=up?r.top-h-12:r.bottom+12;
 tb.style.left=x+"px";tb.style.top=y+"px";tb.style.setProperty("--tx",Math.max(12,Math.min(w-22,r.left+r.width/2-x-6))+"px");tb.className+=up?" up":" dn"}
d.addEventListener("click",function(e){if(tb&&!tb.contains(e.target)&&!(e.target.closest&&e.target.closest(".hastip")))closeTip()},true);
addEventListener("scroll",closeTip,{passive:true});addEventListener("resize",closeTip);d.addEventListener("keydown",function(e){if(e.key==="Escape")closeTip()});
function apply(){var any=CATS.some(function(c){return on[c[0]]});Array.prototype.forEach.call(g.children,function(a){a.style.display=(!any||on[a.getAttribute("data-c")])?"":"none"})}
box.appendChild(bar);box.appendChild(g);apply();
})();
