/* 开场：小窗口 "Enter Petri dish"，鼠标碰到文字会出现 ascii 乱码闪烁，点击直接进入页面 */
(function(){
var html=document.documentElement;if(!html.classList.contains("intro"))return;
function done(){html.classList.remove("intro","hp");html.classList.add("ssh")}
var win=document.createElement("div");win.id="ipw";
win.innerHTML='<div class="tb"><span>petri.exe</span><i><b>_</b><b>▫</b><b>×</b></i></div><div class="bd"><button type="button" id="ipgo"><span id="ipt">Enter Petri dish</span><u></u></button><small>click to enter</small></div>';
document.body.appendChild(win);
var btn=win.querySelector("#ipgo"),tx=win.querySelector("#ipt"),TXT="Enter Petri dish",CH="01#%&@*+=<>/\\|~^?!$0123456789",tm=0,n=0;
function scr(){n++;var out="";for(var i=0;i<TXT.length;i++){var c=TXT[i];out+=(c===" "||i<n/2-2&&false)?c:(Math.random()<.45?CH[Math.floor(Math.random()*CH.length)]:c)}tx.textContent=out}
btn.addEventListener("mouseenter",function(){clearInterval(tm);n=0;tm=setInterval(scr,70)});
btn.addEventListener("mouseleave",function(){clearInterval(tm);tx.textContent=TXT});
btn.addEventListener("click",function(){clearInterval(tm);win.remove();done()});
})();
