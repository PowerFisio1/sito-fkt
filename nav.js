document.addEventListener('DOMContentLoaded', function(){
  var toggle = document.querySelector('.menuToggle');
  var nav = document.querySelector('nav.mainNav');
  if(!toggle || !nav) return;
  toggle.addEventListener('click', function(){
    nav.classList.toggle('open');
  });
  nav.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){ nav.classList.remove('open'); });
  });
});
