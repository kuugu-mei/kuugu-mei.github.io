/* 背景：竹林照片 + 慢慢变化的繁体字 + 鼠标水波（WebGL2）。不支持时保留 CSS 里的静态照片。 */
(function(){
"use strict";
var cv=document.getElementById("bgc");if(!cv)return;
var gl=cv.getContext("webgl2",{antialias:false,alpha:false});
if(!gl)return;
var RM=false;try{RM=matchMedia("(prefers-reduced-motion:reduce)").matches}catch(e){}
var GLYPHS=["花","鳥","草","木","魚","蟲","獸"],CELL=20;
var VS="#version 300 es\nvoid main(){vec2 p=vec2((gl_VertexID<<1)&2,gl_VertexID&2);gl_Position=vec4(p*2.-1.,0.,1.);}";
var FS="#version 300 es\nprecision highp float;\n"+
"uniform sampler2D uA,uB,uG,uH;uniform vec2 uRes,uHT;uniform float uCell,uTime,uPh,uAct,uMix,uCalm,uLodA,uLodB;uniform vec4 uCA,uCB;uniform float uTn,uPx,uBl,uMd;out vec4 o;\n"+
"float hash(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}\n"+
"vec3 ph(vec2 s,float la,float lb){vec3 a=textureLod(uA,uCA.xy+s*uCA.zw,la).rgb;vec3 b=textureLod(uB,uCB.xy+s*uCB.zw,lb).rgb;return mix(a,b,uMix);}\n"+
"void main(){\n"+
" vec2 f=vec2(gl_FragCoord.x,uRes.y-gl_FragCoord.y);vec2 s=f/uRes;\n"+
" float hx=texture(uH,s+vec2(uHT.x,0.)).r-texture(uH,s-vec2(uHT.x,0.)).r;float hy=texture(uH,s+vec2(0.,uHT.y)).r-texture(uH,s-vec2(0.,uHT.y)).r;\n"+
" vec2 g=vec2(hx,hy);float en=smoothstep(.12,.7,length(g)*7.);vec2 sd=s+g*.022;\n"+
" vec2 pf=sd*uRes/(uPx+.0001);if(uPx>0.)sd=(floor(pf)+.5)*uPx/uRes;\n"+
" float hp0=abs(texture(uH,s).r-.5);float clr=uMd>1.5?smoothstep(.0,.75,clamp(en*1.5+hp0*6.,0.,1.)):0.;\n"+
" vec3 base=ph(sd,uBl,uBl);\n"+
" if(uMd>1.5)base=mix(base,ph(sd,0.,0.),clr);\n"+
" if(uPx>0.){vec2 q2=fract(pf)-.5;base*=mix(.4,1.3,smoothstep(.52,.34,abs(q2.x)+abs(q2.y)));}\n"+
" vec3 bl=ph(sd,uLodA+2.6+uBl,uLodB+2.6+uBl);\n"+
" vec3 col=1.-(1.-base)*(1.-bl*.28);\n"+
" vec2 cell=floor(f/uCell);vec2 cuv=(cell+.5)*uCell/uRes;vec2 cd=cuv+g*.02;\n"+
" vec3 cc=ph(cd,uLodA,uLodB);float lum=dot(cc,vec3(.299,.587,.114));\n"+
" float hc=texture(uH,cuv).r-.5;\n"+
" float br=smoothstep(.5,.95,lum);float core=smoothstep(.76,.97,lum);float hs=hash(cell);\n"+
" float sp=.55+hash(cell+7.3)*1.6;\n"+
" float wv=sin(f.x/uRes.x*5.+f.y/uRes.y*3.5-uTime*.06)*1.4+sin(f.x/uRes.x*2.2-f.y/uRes.y*4.1+uTime*.04)*1.1;\n"+
" float sat1=max(cc.r,max(cc.g,cc.b))-min(cc.r,min(cc.g,cc.b));float whc=smoothstep(.74,.92,lum)*(1.-smoothstep(.07,.2,sat1));float sf=mix(1.,.22,whc);float t=uPh*sp*(1.+br*1.9)*sf+hs*40.+lum*2.+hc*11.+en*7.+wv;\n"+
" float s0=floor(t);float fr=fract(t);float w=smoothstep(.45,1.,fr);\n"+
" float i0=floor(hash(cell*1.37+s0)*7.);float i1=floor(hash(cell*1.37+s0+1.)*7.);\n"+
" vec2 gp=fract(f/uCell);\n"+
" float m0=texture(uG,(vec2(i0,0.)+gp)/vec2(7.,1.)).r;float m1=texture(uG,(vec2(i1,0.)+gp)/vec2(7.,1.)).r;\n"+
" float nz=hash(floor(gp*5.)+cell*3.1+s0);float sel=smoothstep(nz-.14,nz+.14,w*1.28-.14);float m=mix(m0,m1,sel);\n"+
" float tw=.5+.5*sin(uTime*(.7+hash(cell+3.1)*1.5)*mix(1.,.25,whc)+hs*50.);\n"+
" vec3 sat=mix(vec3(lum),cc,1.2);\n"+
" float vis=(.55+.45*smoothstep(.2,.95,lum))*(1.+.35*tw)*(1.+uAct*.5);\n"+
" float ew=clamp(en*1.2+abs(hc)*.8,0.,1.);vec3 pas=.5+.32*cos(6.2832*(vec3(0.,.16,.34)+.30+hs*.12+ew*.25+uTime*.02));\n"+
" vec3 ink=mix(vec3(.16,.36,.28),cc*vec3(.42,.5,.34),.5);vec3 stroke=mix(ink,pas,ew*.7);\n"+
" float sat0=max(cc.r,max(cc.g,cc.b))-min(cc.r,min(cc.g,cc.b));float wh=smoothstep(.74,.92,lum)*(1.-smoothstep(.07,.2,sat0));\n"+
" if(uMd<.5)col=mix(col,stroke,clamp(m*vis*.7,0.,1.));\n"+
" else if(uMd<1.5){vec3 tc=mix(vec3(lum),cc,1.5);tc=clamp(tc*.6,0.,1.);vec3 gc=mix(tc,pas,ew*.7);float al=m*mix(.82,.24,wh)*(1.+.3*tw)*(1.+uAct*.4);col=mix(col,gc,clamp(al,0.,1.));\n"+
"  float spk=step(.972,hash(cell+floor(uTime*1.6+hs*30.)))*m;col+=pas*spk*(1.-wh*.35)*.55;}\n"+
" else{float whp=smoothstep(.5,.78,dot(base,vec3(.299,.587,.114)));col=mix(col,col*vec3(.74,.75,.8),(1.-whp)*(1.-clr));\n"+
"  vec3 gB=clamp(mix(vec3(lum),cc,1.4)*1.4+.04,0.,1.);gB=mix(gB,pas,ew*.6);gB=mix(gB,pas*.8+.12,wh*.75);float aB=m*mix(.95,.36,wh)*vis*1.15;\n"+
"  vec3 tc2=clamp(mix(vec3(lum),cc,1.5)*.6,0.,1.);vec3 gA=mix(tc2,pas,ew*.7);float aA=m*mix(.8,.22,wh)*(1.+uAct*.4);\n"+
"  col=mix(col,mix(gB,gA,clr),clamp(mix(aB,aA,clr),0.,1.));\n"+
"  float spk=step(.985,hash(cell+floor(uTime*2.2+hs*30.)))*m*(.25+.75*max(ew,uAct*(1.-whc)));col+=pas*spk*.75*(1.-clr*.5);col+=gB*m*(1.-wh)*(1.-clr)*(.05+.1*tw);}\n"+
" col=mix(col,pas*.9,clamp(abs(hc)*m*2.2,0.,.6));\n"+
" float mh=0.;for(int k=0;k<4;k++){vec2 od=vec2(k<2?-.28:.28,(k&1)==0?-.28:.28);mh+=texture(uG,(vec2(i0,0.)+clamp(gp+od,0.,1.))/vec2(7.,1.)).r;}mh*=.25;\n"+
" col=mix(col,pas,clamp((mh*.5+m*.3)*ew*ew*.9,0.,.8));\n"+
" vec2 q=s-.5;col*=1.-dot(q,q)*.18;\n"+
" col=mix(col,mix(vec3(.02,.13,.12),vec3(.86,1.,.93),pow(clamp(dot(col,vec3(.299,.587,.114)),0.,1.),.85)),uTn);\n"+
" o=vec4(col,1.);}\n";
function sh(t,src){var s=gl.createShader(t);gl.shaderSource(s,src);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS)){console.error(gl.getShaderInfoLog(s))}return s}
var pr=gl.createProgram();gl.attachShader(pr,sh(gl.VERTEX_SHADER,VS));gl.attachShader(pr,sh(gl.FRAGMENT_SHADER,FS));gl.linkProgram(pr);
if(!gl.getProgramParameter(pr,gl.LINK_STATUS)){console.error(gl.getProgramInfoLog(pr));return}
gl.useProgram(pr);
var U={};["uA","uB","uG","uH","uRes","uHT","uCell","uTime","uPh","uAct","uMix","uCalm","uLodA","uLodB","uCA","uCB","uTn","uPx","uBl","uMd"].forEach(function(n){U[n]=gl.getUniformLocation(pr,n)});
gl.uniform1i(U.uA,0);gl.uniform1i(U.uB,1);gl.uniform1i(U.uG,2);gl.uniform1i(U.uH,3);



function mkTex(unit){var t=gl.createTexture();gl.activeTexture(gl.TEXTURE0+unit);gl.bindTexture(gl.TEXTURE_2D,t);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);return t}
var IM={fx:.5,fy:.38,z:1.0,w:1,h:1};
/* 字形图集：7 个字横排 */
(function(){var c=document.createElement("canvas"),S=96;c.width=S*7;c.height=S;var x=c.getContext("2d");x.fillStyle="#000";x.fillRect(0,0,c.width,c.height);x.fillStyle="#fff";x.textAlign="center";x.textBaseline="middle";x.font="600 70px \"Noto Serif SC\",\"Songti SC\",\"STSong\",\"Source Han Serif SC\",\"Hiragino Mincho ProN\",\"SimSun\",serif";
 GLYPHS.forEach(function(g,i){x.fillText(g,S*i+S/2,S/2+3)});
 mkTex(2);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,c);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR)})();

/* ---------- 水面模拟（低分辨率，慢而柔和） ---------- */
var GW=220,GH=124,cur,prv,hb,htex;
function simInit(){GH=Math.max(60,Math.round(GW*cv.height/cv.width));cur=new Float32Array(GW*GH);prv=new Float32Array(GW*GH);hb=new Uint8Array(GW*GH);
 htex=mkTex(3);gl.texImage2D(gl.TEXTURE_2D,0,gl.R8,GW,GH,0,gl.RED,gl.UNSIGNED_BYTE,hb);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
 gl.uniform2f(U.uHT,1/GW,1/GH)}
function drop(gx,gy,r,amp){var x0=Math.max(1,Math.floor(gx-r*2)),x1=Math.min(GW-2,Math.ceil(gx+r*2)),y0=Math.max(1,Math.floor(gy-r*2)),y1=Math.min(GH-2,Math.ceil(gy+r*2));
 for(var y=y0;y<=y1;y++)for(var x=x0;x<=x1;x++){var d=((x-gx)*(x-gx)+(y-gy)*(y-gy))/(r*r);if(d<4)cur[y*GW+x]+=amp*Math.exp(-d*1.3)}}
function step(){var DAMP=.9935;for(var y=1;y<GH-1;y++){var o=y*GW;for(var x=1;x<GW-1;x++){var i=o+x;prv[i]=((cur[i-1]+cur[i+1]+cur[i-GW]+cur[i+GW])*.5-prv[i])*DAMP}}var t=cur;cur=prv;prv=t}
function upload(){for(var i=0;i<cur.length;i++){var v=cur[i]*.5;v=v>.5?.5:v<-.5?-.5:v;hb[i]=Math.round(127.5+255*v)}
 gl.activeTexture(gl.TEXTURE3);gl.bindTexture(gl.TEXTURE_2D,htex);gl.texSubImage2D(gl.TEXTURE_2D,0,0,0,GW,GH,gl.RED,gl.UNSIGNED_BYTE,hb)}


var W=0,H=0,dpr=1;
function resize(){dpr=Math.min(window.devicePixelRatio||1,1.25);var w=Math.max(2,Math.round(innerWidth*dpr)),h=Math.max(2,Math.round(innerHeight*dpr));if(w===W&&h===H)return;W=w;H=h;cv.width=W;cv.height=H;gl.viewport(0,0,W,H);gl.uniform2f(U.uRes,W,H);gl.uniform1f(U.uCell,CELL*dpr);simInit()}
function crop(im,time){var ca=W/H,ia=im.w/im.h,cw,ch;if(ia>ca){ch=1;cw=ca/ia}else{cw=1;ch=ia/ca}
 var z=im.z*(1+(RM?0:.016*Math.sin(time*.06)));cw/=z;ch/=z;var x0=Math.min(Math.max(im.fx-cw/2,0),1-cw),y0=Math.min(Math.max(im.fy-ch/2,0),1-ch);return[x0,y0,cw,ch]}
var lp=null,act=0;
function move(e){act=Math.min(1,act+.06);var x=e.clientX/innerWidth,y=e.clientY/innerHeight;
 if(lp){var dx=x-lp.x,dy=y-lp.y,dist=Math.hypot(dx*innerWidth,dy*innerHeight),n=Math.max(1,Math.ceil(dist/14));act=Math.min(1,act+dist*.004);var amp=Math.min(.3,.04+dist*.0034);
  for(var i=1;i<=n;i++){drop((lp.x+dx*i/n)*GW,(lp.y+dy*i/n)*GH,3.2,amp/n*1.6)}}
 else drop(x*GW,y*GH,3.2,.3);
 lp={x:x,y:y}}
addEventListener("pointermove",move,{passive:true});
addEventListener("pointerdown",function(e){lp=null;move(e);drop(e.clientX/innerWidth*GW,e.clientY/innerHeight*GH,5,.7)},{passive:true});
document.addEventListener("pointerleave",function(){lp=null});
addEventListener("resize",resize);
var t0=performance.now(),acc=0,last=t0,first=true,ph=0,running=true;
function frame(now){if(!running)return;var dt=Math.min(.1,(now-last)/1000);last=now;acc+=dt;var n=0;while(acc>=1/48&&n<4){step();acc-=1/48;n++}
 var time=(now-t0)/1000;act*=Math.exp(-dt*.55);ph+=RM?0:dt*(.07+act*.45);
 if(first&&time>1.0){first=false;drop(GW*.46,GH*.62,5,.6)}
 upload();
 var a=crop(IM,time);
 gl.uniform4f(U.uCA,a[0],a[1],a[2],a[3]);gl.uniform4f(U.uCB,a[0],a[1],a[2],a[3]);
 gl.uniform1f(U.uTime,time);gl.uniform1f(U.uPh,ph);gl.uniform1f(U.uAct,act);gl.uniform1f(U.uMix,0);gl.uniform1f(U.uTn,window.BGTN||0);var bv=window.BGV||"a";gl.uniform1f(U.uPx,bv==="b"?4*dpr:0);gl.uniform1f(U.uCalm,RM?1:0);
 var lod=Math.max(0,Math.log2(CELL*dpr*a[2]*IM.w/W));gl.uniform1f(U.uLodA,lod);gl.uniform1f(U.uLodB,lod);var md=window.BGMD||1;gl.uniform1f(U.uMd,md);gl.uniform1f(U.uBl,md===2?2.0:0);
 gl.drawArrays(gl.TRIANGLES,0,3);if(!RM)requestAnimationFrame(frame)}
document.addEventListener("visibilitychange",function(){if(document.hidden){running=false}else if(!running){running=true;last=performance.now();if(!RM)requestAnimationFrame(frame)}});
window.BGMD=2;
var tx0=null,tx1=null,started=false;
function up(unit,t,im){gl.activeTexture(gl.TEXTURE0+unit);gl.bindTexture(gl.TEXTURE_2D,t);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,im);gl.generateMipmap(gl.TEXTURE_2D);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR_MIPMAP_LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE)}
function loadBg(n){var im=new Image();im.onload=function(){IM.w=im.naturalWidth;IM.h=im.naturalHeight;if(!tx0){tx0=gl.createTexture();tx1=gl.createTexture()}up(0,tx0,im);up(1,tx1,im);if(!started){started=true;resize();cv.style.background="none";requestAnimationFrame(frame)}};im.src="images/bg-tiger.jpg?v=1"}
loadBg(1);
if(document.fonts&&document.fonts.ready){}
})();
