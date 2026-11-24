// Bordes de papel rasgado: genera un clip-path dentado por hoja
(function(){
  function rnd(seed){return function(){seed=(seed*9301+49297)%233280;return seed/233280}}
  document.querySelectorAll('.torn').forEach(function(el,i){
    var r=rnd(17+i*31), mode=el.dataset.torn||'bottom', pts=[], steps=34, j;
    var amp=mode==='both'?7:4.5;
    if(mode==='top'||mode==='both'){for(j=0;j<=steps;j++)pts.push((j/steps*100).toFixed(2)+'% '+(r()*amp).toFixed(2)+'%')}
    else{pts.push('0% 0%','100% 0%')}
    if(mode==='bottom'||mode==='both'){for(j=steps;j>=0;j--)pts.push((j/steps*100).toFixed(2)+'% '+(100-r()*amp).toFixed(2)+'%')}
    else{pts.push('100% 100%','0% 100%')}
    el.style.clipPath='polygon('+pts.join(',')+')';
  });
})();

// Menú: desplegables por clic/teclado y menú móvil
(function(){
  var nav=document.querySelector('nav.main'), burger=document.querySelector('.burger'), hdr=document.querySelector('header.top');
  if(!nav) return;
  function closeAll(except){nav.querySelectorAll('.item.open').forEach(function(it){if(it!==except){it.classList.remove('open');var b=it.querySelector('.top-link');if(b)b.setAttribute('aria-expanded','false')}})}
  nav.querySelectorAll('button.top-link').forEach(function(b){
    b.addEventListener('click',function(e){var it=b.parentElement,open=!it.classList.contains('open');closeAll(it);it.classList.toggle('open',open);b.setAttribute('aria-expanded',open?'true':'false');e.stopPropagation()});
  });
  document.addEventListener('click',function(e){if(!nav.contains(e.target))closeAll()});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'){closeAll();setMenu(false)}});
  function setMenu(on){document.body.classList.toggle('menu-open',on);if(burger){burger.setAttribute('aria-expanded',on?'true':'false');burger.querySelector('span').textContent=on?'Cerrar':'Menú'}}
  if(burger){
    burger.addEventListener('click',function(){if(hdr)document.documentElement.style.setProperty('--hdr',hdr.getBoundingClientRect().bottom+'px');setMenu(!document.body.classList.contains('menu-open'))});
  }
  nav.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){setMenu(false);closeAll()})});
})();
