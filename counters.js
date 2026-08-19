document.addEventListener('DOMContentLoaded', function(){
  var nums = document.querySelectorAll('.statsBand .num[data-count]');
  if(!nums.length) return;

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function finalText(el){
    var target = parseFloat(el.getAttribute('data-count'));
    var decimals = el.getAttribute('data-decimal') ? parseInt(el.getAttribute('data-decimal'), 10) : 0;
    var suffix = el.getAttribute('data-suffix') || '';
    return target.toFixed(decimals).replace('.', ',') + suffix;
  }

  function animate(el){
    var target = parseFloat(el.getAttribute('data-count'));
    var decimals = el.getAttribute('data-decimal') ? parseInt(el.getAttribute('data-decimal'), 10) : 0;
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = 1400;
    var start = null;
    function step(ts){
      if(!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = (target * eased).toFixed(decimals).replace('.', ',') + suffix;
      if(progress < 1){ requestAnimationFrame(step); }
      else { el.textContent = finalText(el); }
    }
    requestAnimationFrame(step);
  }

  if(reduceMotion || !('IntersectionObserver' in window)){
    nums.forEach(function(el){ el.textContent = finalText(el); });
    return;
  }

  var io = new IntersectionObserver(function(entries, obs){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        animate(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, {threshold:0.4});
  nums.forEach(function(el){ io.observe(el); });
});
