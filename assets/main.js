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
