document.querySelectorAll('.carousel').forEach(function(carousel){
  var track = carousel.querySelector('.carouselTrack');
  var slides = Array.prototype.slice.call(track.children);
  var dotsWrap = carousel.querySelector('.carouselDots');
  var prevBtn = carousel.querySelector('.carouselBtn.prev');
  var nextBtn = carousel.querySelector('.carouselBtn.next');

  slides.forEach(function(_, i){
    var dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'carouselDot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', 'Vai alla foto ' + (i + 1));
    dot.addEventListener('click', function(){
      track.scrollTo({ left: slides[i].offsetLeft, behavior: 'smooth' });
    });
    dotsWrap.appendChild(dot);
  });
  var dots = Array.prototype.slice.call(dotsWrap.children);

  function updateDots(){
    var idx = Math.round(track.scrollLeft / track.clientWidth);
    dots.forEach(function(d, i){ d.classList.toggle('active', i === idx); });
  }

  var scrollTimer;
  track.addEventListener('scroll', function(){
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(updateDots, 80);
  });

  if (prevBtn) prevBtn.addEventListener('click', function(){
    track.scrollBy({ left: -track.clientWidth, behavior: 'smooth' });
  });
  if (nextBtn) nextBtn.addEventListener('click', function(){
    track.scrollBy({ left: track.clientWidth, behavior: 'smooth' });
  });
});
