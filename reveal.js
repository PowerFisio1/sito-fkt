document.addEventListener('DOMContentLoaded', function(){
  var els = document.querySelectorAll('.sectionHead, .card, .ctaBand');
  if(!('IntersectionObserver' in window)){
    els.forEach(function(el){ el.classList.add('is-visible'); });
    return;
  }
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      entry.target.classList.toggle('is-visible', entry.isIntersecting);
    });
  }, {threshold:0.15, rootMargin:'0px 0px -8% 0px'});
  els.forEach(function(el){ io.observe(el); });
});
