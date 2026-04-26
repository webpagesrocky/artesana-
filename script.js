// Año dinámico en el footer
document.getElementById('year').textContent = new Date().getFullYear();

// Menú móvil
const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('primary-nav');

toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
});

// Cerrar menú al hacer click en un enlace (móvil)
nav.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    if (nav.classList.contains('open')) {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
});

// Reveal on scroll: añade .reveal a secciones y .in cuando entran al viewport
const revealTargets = document.querySelectorAll(
  '.hero-copy, .hero-art, .historia-text, .historia-img, .mvv-card, .taller-card, .price-card, .libro-img, .libro-copy, .video-wrap, .donate-card, .contact-card'
);
revealTargets.forEach(el => el.classList.add('reveal'));

const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealTargets.forEach(el => io.observe(el));

// YouTube click-to-play: reemplaza la portada por el iframe al hacer click
document.querySelectorAll('.yt-thumb').forEach(btn => {
  btn.addEventListener('click', () => {
    const src = btn.dataset.embed;
    const iframe = document.createElement('iframe');
    iframe.src = src;
    iframe.title = btn.getAttribute('aria-label') || 'YouTube video';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    iframe.allowFullscreen = true;
    iframe.frameBorder = 0;
    btn.replaceWith(iframe);
  });
});

// Header con sombra al hacer scroll
const header = document.querySelector('.site-header');
const onScroll = () => {
  if (window.scrollY > 8) header.classList.add('scrolled');
  else header.classList.remove('scrolled');
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();
