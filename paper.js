(function(){
var d=document,$=function(s,r){return(r||d).querySelector(s)};
function el(t,c,h){var e=d.createElement(t);if(c)e.className=c;if(h!=null)e.innerHTML=h;return e}
function mod(label,inner,cls){var m=el("section","mod"+(cls?" "+cls:""));if(label)m.appendChild(el("h4","",label));var b=el("div","mb");if(typeof inner==="string")b.innerHTML=inner;else b.appendChild(inner);m.appendChild(b);return m}
function z(n){return("0"+n).slice(-2)}
function tm(t){t=Math.floor(t||0);return Math.floor(t/60)+":"+z(t%60)}
var IC={prev:'<svg viewBox="0 0 10 10" shape-rendering="crispEdges"><path d="M0 0h2v10H0zM3 5l7-5v10z" fill="currentColor"/></svg>',
 next:'<svg viewBox="0 0 10 10" shape-rendering="crispEdges"><path d="M8 0h2v10H8zM7 5L0 0v10z" fill="currentColor"/></svg>',
 pause:'<svg viewBox="0 0 10 10" shape-rendering="crispEdges"><path d="M1 0h3v10H1zM6 0h3v10H6z" fill="currentColor"/></svg>',
 play:'<svg viewBox="0 0 10 10" shape-rendering="crispEdges"><path d="M1 0l9 5-9 5z" fill="currentColor"/></svg>',
 stop:'<svg viewBox="0 0 10 10" shape-rendering="crispEdges"><path d="M1 1h8v8H1z" fill="currentColor"/></svg>',
 vol:'<svg viewBox="0 0 12 10" shape-rendering="crispEdges"><path d="M0 3h3l3-3v10L3 7H0zM8 3h1v4H8zM10 1h1v8h-1z" fill="currentColor"/></svg>'};
function init(){
 var L=$(".colL"),R=$(".colR"),H=$(".head"),P=$(".paper");if(!L||!R||!H)return;
 var S=window.SITE||{},now=new Date(),y=now.getFullYear(),m=now.getMonth(),td=now.getDate();
 var wd=["日","一","二","三","四","五","六"][now.getDay()];
 // 刊头下方信息条
 var sub=$(".sub",H),hs=el("div","hstrip");
 hs.appendChild(el("span","c","青涩的青色的Mei"));
 if(sub)hs.appendChild(sub);
 hs.appendChild(el("span","c",y+"."+z(m+1)+"."+z(td)));
 var lb=$("#lang");if(lb)hs.appendChild(lb);
 H.appendChild(hs);
 var logm=$(".logm",L);
 // 歌单（与站点背景音乐联动）
 var ls=(S.home&&S.home.listening)||[];if(!ls.length)ls=["（曲名 · 歌手）"];
 var pl='<div class="np"><span class="pst">click to play</span><i class="dots"></i><i class="ptm">0:00</i></div><div class="pbar"><b></b></div><div class="ctl"><button type="button" data-a="prev" aria-label="prev">'+IC.prev+'</button><button type="button" data-a="pause" aria-label="pause">'+IC.pause+'</button><button type="button" data-a="play" aria-label="play">'+IC.play+'</button><button type="button" data-a="stop" aria-label="stop">'+IC.stop+'</button><button type="button" data-a="next" aria-label="next">'+IC.next+'</button></div><ul class="pl"><li>'+String(ls[0]).replace(/</g,"&lt;")+'</li></ul>';
 var plm=mod("",pl,"plm");L.insertBefore(plm,logm);
 function wirePlayer(){var a=window.bgmAudio,bg=d.getElementById("bgm");if(!a)return false;
  var pst=$(".pst",plm),ptm=$(".ptm",plm),bar=$(".pbar b",plm);
  function ui(){var bad=bg&&/没找到/.test(bg.textContent||"");pst.textContent=bad?"no file":(a.paused?(a.currentTime>0?"paused":"click to play"):"playing");plm.classList.toggle("playing",!a.paused&&!bad)}
  a.addEventListener("play",ui);a.addEventListener("pause",ui);a.addEventListener("timeupdate",function(){bar.style.width=(a.duration?a.currentTime/a.duration*100:0)+"%";ptm.textContent=tm(a.currentTime)});
  if(bg)new MutationObserver(ui).observe(bg,{childList:true,characterData:true,subtree:true});
  $(".ctl",plm).onclick=function(e){var b=e.target.closest("button");if(!b)return;var k=b.getAttribute("data-a");
   if(k==="play"||(k==="pause"&&!a.paused)){if(bg)bg.click();return}
   if(k==="stop"){a.pause();a.currentTime=0;return}
   if(k==="prev"||k==="next"){a.currentTime=0}};
  $(".pbar",plm).onclick=function(e){if(a.duration){var r=this.getBoundingClientRect();a.currentTime=(e.clientX-r.left)/r.width*a.duration}};
  ui();return true}
 if(!wirePlayer()){var n=0,iv=setInterval(function(){if(wirePlayer()||++n>40)clearInterval(iv)},150)}
 // 右栏：目录下面接 News + 留给 ASCII 图的位置
 var NW=window.NEWS||{},E=function(t){return String(t==null?"":t).replace(/&/g,"&amp;").replace(/</g,"&lt;")};
 var nimg=NW.img?'<div class="phb" style="padding:0;border:0;background:none"><img src="'+E(NW.img)+'" alt="" style="width:100%;height:100%;object-fit:cover;display:block"></div>':'<div class="phb"><span>IMAGE</span></div>';
 var nw='<div class="wk">'+nimg+'<div class="cap2">'+E(NW.caption!=null?NW.caption:"FIG.02 — （这里放新闻图片）")+'</div><p class="zh">'+E(NW.zh!=null?NW.zh:"（示例）在这里写一小段配图文字：最近发生的一件小事、一次展览、一个想法。")+'</p><p class="ja">'+E(NW.ja!=null?NW.ja:"（サンプル）ここに写真のコメントを書きます。")+'</p></div>';
 R.appendChild(mod("News",nw));
 R.appendChild(mod("",'<div class="axs"><img src="images/ascii-side.png" alt="" onerror="this.parentNode.className+=\' empty\'"><span>ASCII IMAGE</span></div>',"axm"));
 // 首页：欢迎 + 电吉他 / 乌克丽丽
 if(P&&$("#h-welcome",P)){
  var IB=window.INFOBOX||{},IBR=IB.rows||[["创建","開設","2026","2026"],["内容物","内容物","真菌","菌類"],["状态","状態","更新中","更新中"]];
  var nws=el("section","news");
  nws.innerHTML='<div class="nh"><span class="en">Welcome</span><em>'+y+'年'+(m+1)+'月'+td+'日 · 星期'+wd+'</em></div>'
  +'<h3 class="hd">Petri dish<span class="dh">——培养皿</span></h3>'
  +'<div class="by"><span class="zh">本报讯：暂无介绍</span><span class="ja">本紙：紹介はまだありません</span></div>'
  +'<div class="nbody"><div class="tx"></div><aside class="infobox"><div class="it">'+E(IB.title!=null?IB.title:"Petri dish")+'</div>'+(IB.img?'<div class="phb" style="padding:0;border:0;background:none"><img src="'+E(IB.img)+'" alt="" style="width:100%;height:100%;object-fit:cover;display:block"></div>':'<div class="phb"><span>IMAGE</span></div>')+'<div class="ic"><span class="zh">'+E(IB.zh!=null?IB.zh:"图：（示例配图）")+'</span><span class="ja">'+E(IB.ja!=null?IB.ja:"図：（サンプル）")+'</span></div><table>'+IBR.map(function(r){return '<tr><th><span class="zh">'+E(r[0])+'</span><span class="ja">'+E(r[1])+'</span></th><td><span class="zh">'+E(r[2])+'</span><span class="ja">'+E(r[3])+'</span></td></tr>'}).join('')+'</table></aside></div>'
  +'<div class="brf">'+[["电吉他","エレキギター","最近在练的小段落。（示例音频，之后换成自己的录音）","最近練習しているフレーズ。（サンプル音源）","audio/guitar.mp3"],["乌克丽丽","ウクレレ","随手弹的一小段和弦。（示例音频，之后换成自己的录音）","気ままに弾いたコード。（サンプル音源）","audio/ukulele.mp3"]].map(function(b){return '<div class="bi"><div class="bt"><b class="zh">'+b[0]+'</b><b class="ja">'+b[1]+'</b><div class="mp" data-src="'+b[4]+'"><button type="button" class="pb" aria-label="play">'+IC.play+'</button><span class="tt">0:00 / 0:00</span><div class="pb2"><b></b></div><button type="button" class="vl" aria-label="mute">'+IC.vol+'</button><span class="kb">⋮</span></div></div></div>'}).join('')+'</div>';
  P.insertBefore(nws,P.firstChild);
  var wel=$("#h-welcome",P),txx=$(".tx",nws);if(wel&&txx)txx.appendChild(wel);
  var auds=[];
  Array.prototype.forEach.call(nws.querySelectorAll(".mp"),function(box){var a=new Audio(),btn=$(".pb",box),bar=$(".pb2 b",box),ti=$(".tt",box),vl=$(".vl",box);a.preload="metadata";a.src=box.getAttribute("data-src");auds.push(a);
   function t(){ti.textContent=tm(a.currentTime)+" / "+tm(a.duration)}
   a.addEventListener("loadedmetadata",t);
   btn.onclick=function(){if(a.paused){auds.forEach(function(o){if(o!==a)o.pause()});var g=d.getElementById("bgm");if(window.bgmAudio&&!window.bgmAudio.paused&&g)g.click();a.play().catch(function(){})}else a.pause()};
   a.addEventListener("play",function(){btn.innerHTML=IC.pause});a.addEventListener("pause",function(){btn.innerHTML=IC.play});a.addEventListener("ended",function(){btn.innerHTML=IC.play;bar.style.width="0";t()});
   a.addEventListener("timeupdate",function(){bar.style.width=(a.duration?a.currentTime/a.duration*100:0)+"%";t()});
   vl.onclick=function(){a.muted=!a.muted;vl.classList.toggle("off",a.muted)};
   $(".pb2",box).onclick=function(e){if(a.duration){var r=this.getBoundingClientRect();a.currentTime=(e.clientX-r.left)/r.width*a.duration}}});
 }
}
if(d.readyState==="loading")d.addEventListener("DOMContentLoaded",init);else init();
})();

(function(){var f=document.querySelector('footer');if(!f)return;var a=document.createElement('a');a.className='rp';a.textContent='重播开场 · replay intro';a.onclick=function(){try{sessionStorage.removeItem('seen')}catch(e){}location.href='index.html'};f.appendChild(a)})();
