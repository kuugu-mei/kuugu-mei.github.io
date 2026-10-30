(function(){var S=document.currentScript.src,d=document.body,h=document.documentElement,l="zh",R=matchMedia("(prefers-reduced-motion:reduce)").matches;
try{l=localStorage.getItem("lang")||"zh"}catch(e){}
function set(){d.setAttribute("data-lang",l);h.lang=l}set();
document.getElementById("lang").onclick=function(){l=l==="zh"?"ja":"zh";set();if(window.__lg)window.__lg();try{localStorage.setItem("lang",l)}catch(e){}};
// 彩色星星碎片；光标图案已写在样式文件里
if(matchMedia("(pointer:fine)").matches){
var SC=["#4da3ff","#4fd6a0","#ffcf4d","#ff8fb8","#a58bff","#3fd0d8"],lt=0;if(!R)addEventListener("mousemove",function(e){var n=Date.now();if(n-lt<70)return;lt=n;var s=document.createElement("i");s.className="spk";s.style.setProperty("--c",SC[Math.floor(Math.random()*SC.length)]);
s.style.left=e.clientX+(Math.random()*16-8)+"px";s.style.top=e.clientY+(Math.random()*12)+"px";s.style.setProperty("--dx",(Math.random()*20-10)+"px");
s.onanimationend=function(){s.remove()};document.body.appendChild(s)})}
// 内容渲染（所有文字都来自 data.js）
function el(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e}
function arr(x){return Array.isArray(x)?x:[]}
function gid(i){return document.getElementById(i)}
function srt(a,k){return a.slice().sort(function(p,q){return (q[k]+" "+(q.time||"")).localeCompare(p[k]+" "+(p.time||""))})}
function pid(p){return "p-"+(p.id||(p.date+"-"+(p.time||"")).replace(/[^0-9a-z-]/gi,""))}
function fd(d,t){return String(d||"").replace(/^(\d{4})-(\d{1,2})-(\d{1,2})$/,function(m,y,mo,da){return y+"年"+(+mo)+"月"+(+da)+"日"})+(t?" "+t:"")}
function paras(box,t){String(t||"").split("\n").forEach(function(s){if(s)box.appendChild(el("p",0,s))})}
function TX(o){var f=document.createDocumentFragment();if(o==null)return f;if(typeof o=="string"){f.appendChild(document.createTextNode(o));return f}f.appendChild(el("span","zh",o.zh));f.appendChild(el("span","ja",o.ja!=null?o.ja:o.zh));return f}
function SP(o){var f=document.createDocumentFragment();if(o==null)return f;if(typeof o=="string"){f.appendChild(el("p",0,o));return f}f.appendChild(el("p","zh",o.zh));f.appendChild(el("p","ja",o.ja!=null?o.ja:o.zh));return f}
function SPN(o){var f=document.createDocumentFragment();if(o==null)return f;var L=typeof o==="string"?[[null,o]]:[["zh",o.zh],["ja",o.ja!=null?o.ja:o.zh]];L.forEach(function(p){String(p[1]||"").split("\n").forEach(function(t){if(t)f.appendChild(el("p",p[0],t))})});return f}
function put(i,n){var e=gid(i);if(e&&n){e.textContent="";e.appendChild(n)}}
function lst(cls,items){var u=el(cls=="rank"?"ol":"ul",cls);arr(items).forEach(function(x){var li=el("li");li.appendChild(TX(x));u.appendChild(li)});return u}
function avatar(){var d=el("div","av"),i=new Image();i.src="images/avatar.png";i.alt="";i.onerror=function(){i.remove()};d.appendChild(i);return d}
function pic(src,alt,ph,box){var i=new Image();i.src=src;i.alt=alt||"";i.loading="lazy";i.onerror=function(){i.remove();box.textContent=ph};box.appendChild(i)}
if(!window.SITE){var bn=el("div","err","小站的内容文件 data.js 读取失败：多半是少了引号、逗号或括号。请到 GitHub 打开 data.js，点右上角 History 恢复上一个版本，或把它发给 Claude 检查。");document.body.insertBefore(bn,document.body.firstChild)}
var SI=window.SITE||{},HM=SI.home||{},AB=SI.about||{},nm=SI.name||"mei";
if(SI.title)put("st",document.createTextNode(SI.title));
if(SI.subtitle)put("ss",TX(SI.subtitle));
if(SI.name)put("nm",document.createTextNode(SI.name));
if(SI.intro)put("intro",SP(SI.intro));
put("h-welcome",SP(HM.welcome));put("h-play",lst("plain",HM.playing));put("h-listen",lst("rank",HM.listening));put("h-read",lst("plain",HM.reading));
var vd=gid("video");
if(vd){if(HM.video&&HM.video.id){var v=el("div","vid"),fr=document.createElement("iframe");fr.src="https://www.youtube-nocookie.com/embed/"+HM.video.id;fr.title="video";fr.loading="lazy";fr.allowFullscreen=true;fr.setAttribute("referrerpolicy","strict-origin-when-cross-origin");fr.setAttribute("allow","encrypted-media; picture-in-picture; fullscreen");v.appendChild(fr);vd.appendChild(v);var cp=el("p","cap");cp.appendChild(TX(HM.video.caption));vd.appendChild(cp);vd.appendChild(SP({zh:"视频来自 YouTube，部分地区可能无法播放。",ja:"動画はYouTubeです。地域によっては再生できない場合があります。"}))}else{var vh=gid("vh");if(vh)vh.style.display="none"}}
(function(){var at=gid("a-text");if(!at)return;try{at.textContent="";if(AB.text)at.appendChild(SPN(AB.text));
arr(AB.sections).forEach(function(s){if(!s||typeof s!=="object")return;if(s.title){var h=el("h3","ab-h");h.appendChild(TX(s.title));at.appendChild(h)}if(s.text)at.appendChild(SPN(s.text))})}catch(e){console.error("[小站] 关于我小标题出错：",e)}})();
put("a-contact",lst("plain",AB.contact));put("a-soc",lst("plain",AB.socials));
var pe=gid("a-pets");
if(pe)arr(AB.pets).forEach(function(p){var d=el("div","pet"),im=el("div","pimg",p.img?"":"照片");if(p.img)pic(p.img,p.name,"照片",im);d.appendChild(im);d.appendChild(el("b",0,p.name||""));d.appendChild(el("small",0,p.info||""));pe.appendChild(d)});
var bo=gid("books");
if(bo){var bl=arr(SI.books).filter(function(b){return b.status!=="想读"}).map(function(b,i){var y=+b.year||(b.date?parseInt(b.date,10):0)||0;return{b:b,i:i,y:y||9999}});
 bl.sort(function(a,c){return (c.y-a.y)||String(c.b.date||"").localeCompare(String(a.b.date||""))||(a.i-c.i)});
 var cy=null,cnt={};bl.forEach(function(o){cnt[o.y]=(cnt[o.y]||0)+1});
 bl.forEach(function(o){var b=o.b;if(o.y!==cy){cy=o.y;var h=el("div","yr"+(bo.children.length?" nx":""));h.appendChild(el("span","y",o.y===9999?"NOW":String(o.y)));h.appendChild(el("span","n",cnt[o.y]+" 本 / books"));bo.appendChild(h)}
  var d=el("div","bk"),l=el("div"),r=el("div");l.appendChild(el("b",0,b.title||""));l.appendChild(document.createTextNode(" "+(b.author||"")));r.appendChild(el("span","chip "+({"读完":"b","想读":"t"}[b.status]||""),b.status||""));d.appendChild(l);d.appendChild(r);bo.appendChild(d)})}
var lk=gid("links");
if(lk)arr(SI.links).forEach(function(k){var d=el("div","card"),a=el("a",0,k.name||k.url);a.href=k.url||"#";a.target="_blank";a.rel="noopener";d.appendChild(a);d.appendChild(el("br"));d.appendChild(document.createTextNode(k.desc||""));lk.appendChild(d)});
put("c-text",SP(SI.contact));
var ga=gid("gal");
if(ga){var GL=arr(SI.gallery);if(!GL.length)for(var n=0;n<6;n++)ga.appendChild(el("div","ph","图片位置"));GL.forEach(function(g){var d=el("div","ph");d.title=g.caption||"";pic(g.img,g.caption,"图片",d);d.lastChild.style.cssText="width:100%;height:100%;object-fit:cover";ga.appendChild(d)})}
// 日志
var PS=srt(arr(window.POSTS),"date"),lat=gid("latest"),bp=gid("posts");
if(lat)PS.slice(0,3).forEach(function(p){var a=el("a","box"),t=String(p.text||"").replace(/\s+/g," ");a.href="blog.html#"+pid(p);a.appendChild(el("time",0,fd(p.date,p.time)));a.appendChild(el("p",0,t.slice(0,44)+(t.length>44?"…":"")));lat.appendChild(a)});
if(bp){PS.forEach(function(p){var a=el("article","post"),hd=el("div","phd"),w=el("div","who");a.id=pid(p);hd.appendChild(avatar());w.appendChild(el("b",0,nm));w.appendChild(el("time",0,fd(p.date,p.time)));hd.appendChild(w);a.appendChild(hd);paras(a,p.text);[].concat(arr(p.img)).forEach(function(s){var i=new Image();i.src=s;i.alt="";i.loading="lazy";a.appendChild(i)});bp.appendChild(a)});
if(location.hash){var tg=gid(location.hash.slice(1));if(tg){tg.classList.add("hit");setTimeout(function(){tg.scrollIntoView({block:"center"})},60)}}}
// 丝竹
var SZ=window.SIZHU||{tops:[],entries:[]},tp=gid("tops"),se=gid("sentries");
if(tp)arr(SZ.tops).slice().sort(function(a,b){return b.month.localeCompare(a.month)}).forEach(function(m,i){var bx=el(i?"details":"div","post");bx.appendChild(i?el("summary",0,m.month+" Top Tracks"):el("h3",0,m.month+" Top Tracks"));var ol=el("ol","rank");arr(m.tracks).forEach(function(s){ol.appendChild(el("li",0,s))});bx.appendChild(ol);tp.appendChild(bx)});
if(se)srt(arr(SZ.entries),"date").forEach(function(e){var a=el("article","post"),ul=el("ul","plain");a.appendChild(el("time",0,fd(e.date,e.time)));arr(e.songs).forEach(function(s){ul.appendChild(el("li",0,"♪ "+s))});a.appendChild(ul);paras(a,e.text);se.appendChild(a)});
// 公告栏 / 藏品
var nt=gid("notice");
if(nt)srt(arr(window.NOTICES),"date").forEach(function(n){var d=el("div","nt");d.appendChild(el("time",0,fd(n.date,n.time)));d.appendChild(el("p",0,n.text));nt.appendChild(d)});
// 黄历（本地用 lunar-javascript 计算，不联网）
var hl=gid("huangli");
if(hl){if(window.Solar){try{var sd=Solar.fromDate(new Date()),lu=sd.getLunar(),fs=lu.getFestivals().concat(sd.getFestivals());
var h3=el("h3");h3.appendChild(TX({zh:"黄历",ja:"暦"}));hl.appendChild(h3);
hl.appendChild(el("p",0,"阳历 "+sd.getYear()+"年"+sd.getMonth()+"月"+sd.getDay()+"日 星期"+sd.getWeekInChinese()));
hl.appendChild(el("p",0,"农历 "+lu.getYearInGanZhi()+"年 "+lu.getMonthInChinese()+"月"+lu.getDayInChinese()));
if(fs.length)hl.appendChild(el("p","fs",fs.join("、")));
hl.appendChild(el("p","yi","宜："+lu.getDayYi().slice(0,8).join("、")));hl.appendChild(el("p","ji","忌："+lu.getDayJi().slice(0,8).join("、")))}catch(e){hl.style.display="none"}}else hl.style.display="none"}
// 小外星人（只在首页）
(function(){var al=gid("alien");if(!al)return;
var im=al.querySelector("img"),bb=al.querySelector(".bub"),AM=arr(SI.alien&&SI.alien.messages),ax=0,ay=0,tx=0,ty=0,flip=1,st="rest",wait=1,last=0,lm=-1,SPD=50;
if(!AM.length)AM=["最近在研究：（在 data.js 的 alien 里写）"];
function lg(){return document.documentElement.lang==="ja"?"ja":"zh"}
function txt(m){return typeof m==="string"?m:(m[lg()]||m.zh||"")}
function rnd(a,b){return a+Math.random()*(b-a)}
function maxX(){return Math.max(120,innerWidth-80)}function maxY(){return Math.max(180,innerHeight-96)}
function pick(){tx=rnd(10,maxX());ty=rnd(70,maxY())}
function draw(){al.style.transform="translate("+ax.toFixed(1)+"px,"+ay.toFixed(1)+"px)";im.style.transform="scaleX("+flip+")"}
ax=rnd(10,maxX());ay=rnd(70,maxY());pick();draw();
function step(t){var dt=last?Math.min(.05,(t-last)/1000):0;last=t;
if(st==="walk"){var dx=tx-ax,dy=ty-ay,d=Math.sqrt(dx*dx+dy*dy);if(d<3){st="rest";wait=rnd(.6,2.2)}else{ax+=dx/d*SPD*dt;ay+=dy/d*SPD*dt;if(Math.abs(dx)>6)flip=dx<0?-1:1}}
else if(st==="rest"){wait-=dt;if(wait<=0){pick();st="walk"}}
draw();requestAnimationFrame(step)}
if(!R)requestAnimationFrame(step);
addEventListener("resize",function(){ax=Math.min(ax,maxX());ay=Math.min(ay,maxY());draw()});
al.addEventListener("click",function(){if(st==="talk")return;st="talk";var k;do{k=Math.floor(Math.random()*AM.length)}while(AM.length>1&&k===lm);lm=k;
bb.textContent=txt(AM[k]);bb.className="bub show"+(ax<120?" l":(ax>innerWidth-190?" r":""))+(ay<120?" below":"");al.classList.add("talk");
setTimeout(function(){bb.className="bub";al.classList.remove("talk");st="rest";wait=.5},4800)});
})();
// 留言板（Waline）
(function(){var bx=gid("waline");if(!bx)return;var GB=SI.guestbook||{};
if(!GB.serverURL||!window.Waline){var c=el("div","card");c.appendChild(TX({zh:"留言板还在准备中，暂时请通过上面的联系方式找我～",ja:"掲示板は準備中です。しばらくは連絡先からどうぞ。"}));bx.appendChild(c);return}
function lg(){return document.documentElement.lang==="ja"?"jp-JP":"zh-CN"}
function LC(){return document.documentElement.lang==="ja"?{placeholder:"お気軽にどうぞ～（メールは書かなくてOK）",sofa:"最初のコメントをどうぞ～",submit:"送信"}:{placeholder:"欢迎留言～（邮箱可以不填）",sofa:"来发第一条留言吧～",submit:"发送"}}
var AV=["guest1","guest2"],BASE=new URL("images/avatars/",location.href).href,ALIEN=new URL("images/alien.png",location.href).href,cur=1;
try{cur=+localStorage.getItem("meiav")||1}catch(e){}if(cur<1||cur>AV.length)cur=1;
var API=GB.serverURL.replace(/\/+$/,"")+"/api/comment",of=window.fetch;
function fx(c){if(!c||typeof c!=="object")return;var m=/#av=(\d+|admin)/.exec(c.link||"");
if(c.type==="administrator"||(m&&m[1]==="admin"))c.avatar=BASE+"admin.png";else if(m&&AV[m[1]-1])c.avatar=BASE+AV[m[1]-1]+".png";else c.avatar=ALIEN;
if(m)c.link="";arr(c.children).forEach(fx)}
if(of)window.fetch=function(u,o){var url=typeof u==="string"?u:(u&&u.url)||"",same=url.split("?")[0]===API;if(!same)return of.apply(this,arguments);
var meth=((o&&o.method)||(u&&u.method)||"GET").toUpperCase();
if(meth==="POST"&&o&&typeof o.body==="string"){try{var b=JSON.parse(o.body);var hd=(o&&o.headers)||{},adm=!!(hd.Authorization||hd.authorization);if(!b.link||b.link.indexOf("#av=")<0){b.link=location.origin+"/#av="+(adm?"admin":cur);o=Object.assign({},o,{body:JSON.stringify(b)})}}catch(e){}return of.call(this,u,o)}
if(meth!=="GET")return of.apply(this,arguments);
return of.apply(this,arguments).then(function(r){return r.clone().json().then(function(j){try{arr(j&&j.data&&j.data.data).forEach(fx)}catch(e){}return new Response(JSON.stringify(j),{status:r.status,headers:{"Content-Type":"application/json"}})}).catch(function(){return r})})};
var pk=el("div","avpick"),lb=el("span","avlab");lb.appendChild(TX({zh:"选一个头像：",ja:"アイコンを選んでね："}));pk.appendChild(lb);
AV.forEach(function(n,i){var b=el("button","avopt"+(i+1===cur?" on":""));b.type="button";b.setAttribute("aria-label","avatar "+(i+1));var im=el("img");im.src=BASE+n+".png";im.alt="";b.appendChild(im);
b.onclick=function(){cur=i+1;try{localStorage.setItem("meiav",cur)}catch(e){}Array.prototype.forEach.call(pk.querySelectorAll(".avopt"),function(x,k){x.classList.toggle("on",k===i)})};pk.appendChild(b)});
bx.parentNode.insertBefore(pk,bx);
var wl=Waline.init({el:"#waline",serverURL:GB.serverURL,path:"/guestbook",lang:lg(),locale:LC(),login:"enable",meta:["nick","mail"],requiredMeta:[],wordLimit:500,pageSize:10,emoji:false,search:false,imageUploader:false,reaction:false,dark:false});
window.__lg=function(){if(wl&&wl.update)wl.update({lang:lg(),locale:LC()})};
})();
// 背景音乐：依次尝试 mp3 / m4a / ogg / wav
var names=["qingmen.mp3","qingmeng.mp3","qingmeng.m4a","qingmeng.ogg","qingmeng.wav","qingmeng.mp3.mp3","青梦.mp3","青梦 - Youzee Music.mp3"],ni=0,bad=false,au=window.bgmAudio=new Audio(),b=document.getElementById("bgm"),on=true;
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
