(function(){
var d=document,box=d.getElementById("recs");if(!box)return;
var CATS=[["media","media","media"],["site","site","site"],["game","game","game"],["book","book","book"],["item","thing","thing"]];
var S=window.SITE||{},items=Array.isArray(S.recs)&&S.recs.length?S.recs:[
 {cat:"media",title:"（作品名）",img:"images/cv-1.png"},{cat:"game",title:"（游戏名）",img:"images/cv-2.png"},{cat:"book",title:"（书名）",img:"images/cv-3.png"},{cat:"site",title:"（网站名）",img:"images/cv-4.png"},
 {cat:"item",title:"（物品名）",img:"images/cv-5.png"},{cat:"media",title:"（纪录片名）",img:"images/cv-6.png"},{cat:"game",title:"（游戏名）",img:"images/cv-7.png"},{cat:"site",title:"（网站名）",img:"images/cv-8.png"},
 {cat:"book",title:"（书名）",img:"images/cv-9.png"},{cat:"item",title:"（物品名）",img:"images/cv-10.png"}];
var on={};/* 没有选中任何分类 = 全部显示；点哪个就只显示哪个，可多选，再点一下取消 */
function lg(){return d.documentElement.lang==="ja"?"ja":"zh"}
function tx(v){return v&&typeof v==="object"?(v[lg()]||v.zh||""):(v||"")}
function norm(c){return c==="thing"?"item":c}
var bar=d.createElement("div");bar.className="rf";
CATS.forEach(function(c){var b=d.createElement("button");b.type="button";b.setAttribute("data-c",c[0]);b.innerHTML='<i></i><span>'+c[1]+'</span>';
 b.onclick=function(){on[c[0]]=!on[c[0]];b.className=on[c[0]]?"on":"";apply()};bar.appendChild(b)});
var g=d.createElement("div");g.className="rg";
items.forEach(function(it){var a=d.createElement(it.url?"a":"div");a.className="rc";a.setAttribute("data-c",norm(it.cat));if(it.url){a.href=it.url;a.target="_blank";a.rel="noopener"}
 var c=CATS.filter(function(x){return x[0]===it.cat})[0]||["",it.cat||"",it.cat||""];
 a.innerHTML='<div class="ty">'+(norm(it.cat)==="item"?"thing":String(it.cat||"")).toUpperCase()+'</div><div class="im"><img alt="" loading="lazy"></div><div class="tt"></div>';
 var im=a.querySelector("img");if(it.img)im.src=it.img;else a.querySelector(".im").className+=" none";im.onerror=function(){this.style.display="none"};
 a.querySelector(".tt").textContent=tx(it.title);g.appendChild(a)});
function apply(){var any=CATS.some(function(c){return on[c[0]]});Array.prototype.forEach.call(g.children,function(a){a.style.display=(!any||on[a.getAttribute("data-c")])?"":"none"})}
box.appendChild(bar);box.appendChild(g);apply();
})();
