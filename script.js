(function(){var d=document.body,l="zh";try{l=localStorage.getItem("lang")||"zh"}catch(e){}
d.setAttribute("data-lang",l);document.documentElement.lang=l;
document.getElementById("lang").onclick=function(){l=l==="zh"?"ja":"zh";d.setAttribute("data-lang",l);document.documentElement.lang=l;try{localStorage.setItem("lang",l)}catch(e){}}})();
