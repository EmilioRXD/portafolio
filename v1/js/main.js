(function () {
  /* ---- Nav mobile ---- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  navLinks.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    })
  );

  /* ---- Active link on scroll ---- */
  const sections = document.querySelectorAll('section[id], footer[id]');
  const links = document.querySelectorAll('.nav-links a');
  const spy = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach(s => spy.observe(s));

  /* ---- Carrusel ---- */
  const cards = Array.from(document.querySelectorAll('.card'));
  const N = cards.length;
  let cur = 0;
  let autoTimer = null;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const dotsWrap = document.getElementById('dots');

  cards.forEach((_, i) => {
    const d = document.createElement('button');
    d.className = 'car-dot' + (i === 0 ? ' active' : '');
    d.setAttribute('aria-label', 'Ir al proyecto ' + (i + 1));
    d.addEventListener('click', () => { goto(i); restart(); });
    dotsWrap.appendChild(d);
  });
  const dots = Array.from(dotsWrap.children);

  function paint() {
    cards.forEach((c, i) => {
      let cls = 'c-hidden';
      if (i === cur) cls = 'c-mid';
      else if (i === (cur + 1) % N) cls = 'c-right';
      else if (i === (cur - 1 + N) % N) cls = 'c-left';
      c.className = 'card ' + cls;
    });
    dots.forEach((d, i) => d.classList.toggle('active', i === cur));
  }

  function goto(i) {
    cur = (i + N) % N;
    paint();
  }

  function restart() {
    if (reduce) return;
    clearInterval(autoTimer);
    autoTimer = setInterval(() => goto(cur + 1), 4500);
  }

  const stage = document.getElementById('stage');
  const prev = document.getElementById('prev');
  const next = document.getElementById('next');
  prev.addEventListener('click', () => { goto(cur - 1); restart(); });
  next.addEventListener('click', () => { goto(cur + 1); restart(); });
  stage.addEventListener('mouseenter', () => clearInterval(autoTimer));
  stage.addEventListener('mouseleave', restart);
  stage.addEventListener('focusin', () => clearInterval(autoTimer));
  stage.addEventListener('focusout', restart);

  paint();
  restart();

  /* ---- Scrollbar flotante ---- */
  const floatTrack = document.getElementById('floatingScroll');
  const floatThumb = document.getElementById('floatingThumb');

  function updateFloatingScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollHeight <= 0) {
      floatTrack.style.display = 'none';
      return;
    }
    floatTrack.style.display = 'block';
    const progress = Math.min(Math.max(scrollTop / scrollHeight, 0), 1);
    const trackH = floatTrack.clientHeight;
    const thumbH = Math.max((window.innerHeight / document.documentElement.scrollHeight) * trackH, 44);
    const translateY = progress * (trackH - thumbH);

    floatThumb.style.height = thumbH + 'px';
    floatThumb.style.transform = 'translateY(' + translateY + 'px)';
  }

  window.addEventListener('scroll', () => requestAnimationFrame(updateFloatingScroll), { passive: true });
  window.addEventListener('resize', updateFloatingScroll);
  updateFloatingScroll();

  let isDragging = false;
  function onScrollDrag(e) {
    const rect = floatTrack.getBoundingClientRect();
    const y = Math.min(Math.max(e.clientY - rect.top, 0), rect.height);
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: (y / rect.height) * scrollHeight, behavior: 'auto' });
  }
  floatTrack.addEventListener('pointerdown', (e) => {
    isDragging = true;
    floatTrack.setPointerCapture(e.pointerId);
    onScrollDrag(e);
  });
  floatTrack.addEventListener('pointermove', (e) => {
    if (isDragging) onScrollDrag(e);
  });
  floatTrack.addEventListener('pointerup', (e) => {
    isDragging = false;
    try { floatTrack.releasePointerCapture(e.pointerId); } catch (_) {}
  });
  floatTrack.addEventListener('pointercancel', () => { isDragging = false; });
})();
