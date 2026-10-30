/* 开场：Windows 旧窗口风格问答。「您願意保護自然嗎？」不 = Error；我願意 = ascii 乱码浮现发光的「歡迎來到培養皿」
   鼠标移到图片上强烈 ascii 闪烁，坚持 1.2 秒进入页面。已定：C 款（Win98 软件窗口）× 雾绿配色。 */
(function(){
var html=document.documentElement;if(!html.classList.contains("intro"))return;
function done(){html.classList.remove("intro","hp");html.classList.add("ssh");if(win.parentNode)win.remove();if(pv.parentNode)pv.remove();clearInterval(sc);cancelAnimationFrame(raf)}
var CH="01#%&@*+=<>/\\|~^?!$█▓▒░",rd=function(){return CH[Math.floor(Math.random()*CH.length)]};
var DS="c",CS="1";
var win=document.createElement("div");win.id="ipw";document.body.appendChild(win);
var pv=document.createElement("div");
var img=new Image();img.src="images/neuron.png";var cv,cx,state="ask",raf=0,hold=0,t0=performance.now(),sc=0,prog=0;
var Q="您願意保護自然嗎？",NO="不",YES="我願意";
function frame(title,inner,foot){
 var ic='<span class="ic"></span>';
 if(DS==="b")return '<div class="tb"><b class="cl"></b><span>'+title+'</span></div><div class="bd">'+inner+'</div>';
 var ctl=DS==="c"?'<i><b>_</b><b>▫</b><b>×</b></i>':'<i><b>_</b><b>×</b></i>';
 return '<div class="tb">'+ic+'<span>'+title+'</span>'+ctl+'</div>'+(DS==="c"?'<div class="mn"><u>F</u>ile <u>E</u>dit <u>V</u>iew <u>H</u>elp</div>':'')+'<div class="bd">'+inner+'</div>'+(DS==="c"?'<div class="sb"><span>'+(foot||"Ready")+'</span><span>microbes: 1</span></div>':'')}
function render(s){state=s;cancelAnimationFrame(raf);clearInterval(sc);hold=0;prog=0;win.className="w d-"+DS+" c-"+CS+(s==="ok"?" ok":(s==="err"?" err":""));
 
 var pic='<canvas id="ipc" width="64" height="64"></canvas>';
 if(s==="ask"){var q='<div class="row">'+pic+'<p>'+Q+'</p></div>';if(DS==="c")q='<fieldset><legend>Question</legend>'+q+'</fieldset>';
  win.innerHTML=frame("Microbe.exe",q+'<div class="bt"><button type="button" id="b1">'+NO+'</button><button type="button" id="b2">'+YES+'</button></div>')}
 else if(s==="err")win.innerHTML=frame("Error",'<div class="row"><span class="ex"><i>'+(DS==="b"?"!":"✖")+'</i></span><div class="et"><p>Error</p><small>ERR_NATURE_DENIED</small></div></div><div class="bt"><button type="button" id="b3">OK</button></div>',"Error");
 else win.innerHTML=frame("Microbe.exe",'<div class="row">'+pic+'<p id="wl" class="glow"></p></div><small id="hint">hover the picture · hold 1s</small><div class="pg"><b id="pgb"></b></div>',"Welcome");
 cv=win.querySelector("#ipc");cx=cv?cv.getContext("2d"):null;
 if(s==="ask"){win.querySelector("#b1").onclick=function(e){e.stopPropagation();render("err")};win.querySelector("#b2").onclick=function(e){e.stopPropagation();render("ok")}}
 if(s==="err")win.querySelector("#b3").onclick=function(e){e.stopPropagation();render("ask")};
 if(s==="ok")welcome();
 if(cx){loop();cv.addEventListener("pointerenter",function(){if(state==="ok"&&!hold)hold=performance.now()});cv.addEventListener("pointerleave",function(){hold=0;prog=0;var b=win.querySelector("#pgb");if(b)b.style.width="0"});cv.addEventListener("click",function(){if(state==="ok"&&!hold)hold=performance.now()})}}
function welcome(){var T="歡迎來到培養皿",el=win.querySelector("#wl"),n=0;sc=setInterval(function(){n++;var o="";for(var i=0;i<T.length;i++)o+=i<n/2.2?T[i]:rd();el.textContent=o;if(n/2.2>=T.length){el.textContent=T;clearInterval(sc)}},60)}
var G="01#%&@*+=<>/|~^?!$";
function loop(){var t=(performance.now()-t0)/1000;cx.clearRect(0,0,64,64);cx.fillStyle="#000";cx.fillRect(0,0,64,64);cx.drawImage(img,0,0,64,64);
 if(hold){prog=Math.min(1,(performance.now()-hold)/1200);var b=win.querySelector("#pgb");if(b)b.style.width=(prog*100)+"%";
  var id=cx.getImageData(0,0,64,64).data;cx.fillStyle="rgba(0,0,0,"+(.25+prog*.55)+")";cx.fillRect(0,0,64,64);cx.font="bold 7px monospace";cx.textBaseline="top";
  for(var gy=0;gy<64;gy+=4)for(var gx=0;gx<64;gx+=4){var k=(gy*64+gx)*4,l=(id[k]+id[k+1]+id[k+2])/3;if(Math.random()<.35+prog*.5){cx.fillStyle="hsl("+((t*240+gx*3+gy*5+Math.random()*60)%360)+",95%,"+(45+l/6+Math.random()*20)+"%)";cx.fillText(G[Math.floor(Math.random()*G.length)],gx,gy-1)}}
  if(Math.random()<.18){cx.fillStyle="rgba(255,255,255,.35)";cx.fillRect(0,Math.random()*64,64,2)}
  if(prog>=1){done();return}}
 raf=requestAnimationFrame(loop)}
document.addEventListener("click",function(e){if(state==="err")render("ask")});
img.onload=function(){render("ask")};
render("ask");
})();
