/* 开场：海洋 404 风格问答窗口（中 / 日 / 英）。
   No → 小神经元被框在半透明窗里，冒出彩色像素泡沫和尖尾巴对话气泡「……请再回答一次。」，点任意处泡沫炸开（啵）后重新提问；
   Yes, I do → 图出现在文字右侧，ascii 乱码浮现「歡迎來到培養皿」（含日英），鼠标放在图上坚持 1.2 秒进入页面。 */
(function(){
var html=document.documentElement;if(!html.classList.contains("intro"))return;
var CH="01#%&@*+=<>/\\|~^?!$█▓▒░",rd=function(){return CH[Math.floor(Math.random()*CH.length)]};
var S=72,win=document.createElement("div");win.id="ipw";document.body.appendChild(win);
var imgA=new Image();imgA.src="images/neuron-big.png";
var cv,cx,state="ask",raf=0,hold=0,t0=performance.now(),sc=0,prog=0,tmr=[],ov=null,pg0=null;
var ZH="您願意保護自然嗎？",JA="自然を守るために協力していただけますか？",EN="Would you be willing to take action to protect nature?";
var rr=function(a,b){return a+Math.random()*(b-a)};
function T(f,ms){tmr.push(setTimeout(f,ms))}
function clean(){tmr.forEach(clearTimeout);tmr=[];if(ov){if(ov._pop)document.removeEventListener("click",ov._pop,true);ov.remove();ov=null}win.style.visibility=""}
function setPic(){}
var SN=1;

function done(){html.classList.remove("intro","hp");html.classList.add("ssh");clean();if(win.parentNode)win.remove();clearInterval(sc);cancelAnimationFrame(raf)}
function frame(inner){return '<div class="tb"><span>Microbe.exe</span></div><div class="bd">'+inner+'</div><i class="an a1">1.2 mb</i><i class="an a2">404_DINOSAUR_01.BMP</i>'}
function render(s){state=s;cancelAnimationFrame(raf);clearInterval(sc);clean();hold=0;prog=0;win.className="p p6"+(s==="ok"?" ok":"");setPic();
 if(s==="ask")win.innerHTML=frame('<div class="row"><p><b class="t-zh">'+ZH+'</b><span class="t-ja">'+JA+'</span><span class="t-en">'+EN+'</span></p></div><div class="bt"><button type="button" id="b1">No</button><button type="button" id="b2">Yes, I do</button></div>');
 else win.innerHTML=frame('<div class="row"><div class="wt"><b id="wl" class="t-zh"></b><span id="wj" class="t-ja"></span><span id="we" class="t-en"></span></div><span class="ph"><canvas id="ipc" width="'+S+'" height="'+S+'"></canvas></span></div><small id="hint">hover the picture · hold 1s</small><div class="pg"><b id="pgb"></b></div>');
 cv=win.querySelector("#ipc");cx=cv?cv.getContext("2d"):null;
 if(s==="ask"){win.querySelector("#b1").onclick=function(e){e.stopPropagation();bubble()};win.querySelector("#b2").onclick=function(e){e.stopPropagation();render("ok")}}
 else{welcome();cv.addEventListener("pointerenter",function(){if(!hold)hold=performance.now()});cv.addEventListener("pointerleave",function(){hold=0;prog=0;var b=win.querySelector("#pgb");if(b)b.style.width="0"});cv.addEventListener("click",function(){if(!hold)hold=performance.now()});loop()}}
function scr(el,Tx,delay,spd){var n=0;T(function(){var iv=setInterval(function(){if(!el.parentNode){clearInterval(iv);return}n++;var o="";for(var i=0;i<Tx.length;i++)o+=(Tx[i]===" "||i<n/spd)?Tx[i]:rd();el.textContent=o;if(n/spd>=Tx.length){el.textContent=Tx;clearInterval(iv)}},60)},delay)}
function welcome(){scr(win.querySelector("#wl"),"歡迎來到培養皿",0,2.2);scr(win.querySelector("#wj"),"培養皿へようこそ",500,1.6);scr(win.querySelector("#we"),"Welcome to the Petri dish",900,.8)}
var G="01#%&@*+=<>/|~^?!$";
function loop(){var t=(performance.now()-t0)/1000;cx.clearRect(0,0,S,S);if(imgA.complete)cx.drawImage(imgA,0,0,S,S);
 if(hold){prog=Math.min(1,(performance.now()-hold)/1200);var b=win.querySelector("#pgb");if(b)b.style.width=(prog*100)+"%";
  var id=cx.getImageData(0,0,S,S).data;cx.fillStyle="rgba(0,0,0,"+(.25+prog*.55)+")";cx.fillRect(0,0,S,S);cx.font="bold 7px monospace";cx.textBaseline="top";
  for(var gy=0;gy<S;gy+=4)for(var gx=0;gx<S;gx+=4){var k=(gy*S+gx)*4,l=(id[k]+id[k+1]+id[k+2])/3;if(Math.random()<.35+prog*.5){cx.fillStyle="hsl("+((t*240+gx*3+gy*5+Math.random()*60)%360)+",95%,"+(45+l/6+Math.random()*20)+"%)";cx.fillText(G[Math.floor(Math.random()*G.length)],gx,gy-1)}}
  if(Math.random()<.18){cx.fillStyle="rgba(255,255,255,.35)";cx.fillRect(0,Math.random()*S,S,2)}
  if(prog>=1){done();return}}
 raf=requestAnimationFrame(loop)}

/* ---------- 啵（单个音节，轻柔） ---------- */
var AC=null;
function pop(){try{AC=AC||new (window.AudioContext||window.webkitAudioContext)();var c=AC,t=c.currentTime+.01,o=c.createOscillator(),g=c.createGain(),o2=null,lp=c.createBiquadFilter();lp.type="lowpass";lp.frequency.value=3200;
 function env(v,a,d){g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v,t+a);g.gain.exponentialRampToValueAtTime(.0005,t+a+d)}
 if(SN===1){o.type="sine";o.frequency.setValueAtTime(760,t);o.frequency.exponentialRampToValueAtTime(330,t+.09);env(.2,.006,.11)}
 else if(SN===2){o.type="sine";o.frequency.setValueAtTime(620,t);o.frequency.exponentialRampToValueAtTime(1250,t+.075);env(.16,.01,.12)}
 else{o.type="triangle";o.frequency.setValueAtTime(1046,t);o.frequency.exponentialRampToValueAtTime(784,t+.06);env(.17,.004,.15);o2=c.createOscillator();o2.type="sine";o2.frequency.setValueAtTime(2093,t);o2.frequency.exponentialRampToValueAtTime(1568,t+.06);var g2=c.createGain();g2.gain.setValueAtTime(.05,t);g2.gain.exponentialRampToValueAtTime(.0005,t+.1);o2.connect(g2);g2.connect(lp);o2.start(t);o2.stop(t+.2)}
 o.connect(g);g.connect(lp);lp.connect(c.destination);o.start(t);o.stop(t+.25)}catch(e){}}

/* ---------- No：半透明小窗里若隐若现的神经元 + 像素对话气泡 + 上浮的彩色泡沫 ---------- */
var BS=[[16,1],[22,2],[28,3],[36,4],[20,5]];
function bubble(){state="err";cancelAnimationFrame(raf);win.style.visibility="hidden";
 ov=document.createElement("div");ov.id="ipb";document.body.appendChild(ov);
 var pn=document.createElement("div");pn.className="npw";ov.appendChild(pn);
 var im=document.createElement("img");im.src="images/neuron-a.png";im.className="nbi";pn.appendChild(im);
 var sp=document.createElement("div");sp.className="nsp";
 sp.innerHTML='<svg viewBox="0 0 196 58" width="196" height="58" shape-rendering="crispEdges"><path d="M5 2H189V5H192V37H189V40H118L108 52H104V48H100V44H96V40H5V37H2V5H5Z" fill="#d6f3f9" stroke="#0b4a5c" stroke-width="2.4" stroke-linejoin="miter"/><path d="M7 5H12V7H7ZM7 7H9V11H7Z" fill="#fff"/></svg><span></span>';pn.appendChild(sp);
 var txt="......Plz answer again.",n=0;T(function ty(){n++;sp.lastChild.textContent=txt.slice(0,n);if(n<txt.length)T(ty,38)},420);
 function mkb(x,y,k,cls,sc){var b=document.createElement("img"),d=BS[k%5];b.src="images/bubw"+d[1]+".png";b.className="bb "+(cls||"");var w=Math.round(d[0]*(sc||.6));b.style.cssText="left:"+x+"px;top:"+y+"px;width:"+w+"px;height:"+w+"px";pn.appendChild(b);return b}
 /* 泡沫只在小图像附近冒出：围着神经元的左右和头顶，往上飘一小段就消失 */
 (function spawn(){if(!ov)return;var side=Math.random(),x,y;if(side<.34){x=rr(62,84);y=rr(100,122)}else if(side<.68){x=rr(148,170);y=rr(100,122)}else{x=rr(88,138);y=rr(92,104)}
  var b=mkb(x,y,Math.random()*5|0,"rise",rr(.45,.75));b.style.animationDuration=rr(1.8,2.8)+"s";b.style.setProperty("--dx",rr(-8,8)+"px");T(function(){b.remove()},3000);T(spawn,rr(220,420))})();
 function burst(e){document.removeEventListener("click",burst,true);pop();
  var all=[].slice.call(pn.querySelectorAll(".bb"));
  all.forEach(function(b){b.classList.add("zap")});
  var ir=im.getBoundingClientRect(),sr=sp.getBoundingClientRect();
  [ir,sr].forEach(function(r,k){for(var i=0;i<(k?7:9);i++){var x=r.left+rr(0,r.width),y=r.top+rr(0,r.height),b=document.createElement("img"),d=BS[Math.random()*5|0],w=Math.round(d[0]*.5);b.src="images/bubw"+d[1]+".png";b.className="bb fly";b.style.cssText="left:"+x+"px;top:"+y+"px;width:"+w+"px;height:"+w+"px";ov.appendChild(b);(function(b,x,y,r){var a=Math.atan2(y-(r.top+r.height/2),x-(r.left+r.width/2))+rr(-.6,.6),dd=rr(18,60);requestAnimationFrame(function(){requestAnimationFrame(function(){b.style.transform="translate("+Math.cos(a)*dd+"px,"+(Math.sin(a)*dd-rr(6,26))+"px)";b.style.opacity="0"})})})(b,x,y,r)}});
  im.style.opacity="0";sp.style.opacity="0";pn.classList.add("gone");
  T(function(){render("ask")},620)}
 ov._pop=burst;T(function(){if(ov)document.addEventListener("click",burst,true)},300)}
render("ask");
})();
