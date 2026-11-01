(function(){document.documentElement.setAttribute("data-th","sage");
/* 背景音乐：在 <head> 里就开始加载，换页时按保存的位置接着播（并补上换页耗时），尽量不断档 */
var cs=document.currentScript,base=cs&&cs.src?cs.src:location.href,au=window.bgmAudio=new Audio(),SS=function(k,v){try{if(v===undefined)return sessionStorage.getItem(k);sessionStorage.setItem(k,v)}catch(e){return null}};
au.loop=true;au.volume=.4;au.preload="auto";au.src=new URL("music/maybe-tomorrow.mp3",base).href;
var on=true;try{on=localStorage.getItem("bgm")!=="off"}catch(e){}
var T=+SS("bgmT")||0,W=+SS("bgmW")||0,P=SS("bgmP")==="1";
au.addEventListener("loadedmetadata",function(){if(!(T>0)||!au.duration)return;var t=T+(P&&W?(Date.now()-W)/1000:0);try{au.currentTime=t%au.duration}catch(e){}});
au.addEventListener("canplay",function f(){au.removeEventListener("canplay",f);if(on&&(P||!SS("bgmP")))au.play().catch(function(){})});
var last=0;function save(){SS("bgmT",au.currentTime);SS("bgmW",Date.now());SS("bgmP",au.paused?"0":"1")}
au.addEventListener("timeupdate",function(){var n=Date.now();if(n-last>400){last=n;save()}});
au.addEventListener("pause",save);au.addEventListener("play",save);
addEventListener("pagehide",save);addEventListener("beforeunload",save);
document.addEventListener("click",function(e){var a=e.target.closest&&e.target.closest("a[href]");if(a)save()},true)})();
