// ===== NAVBAR SCROLL EFFECT =====
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 80);
});

// ===== MOBILE MENU =====
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

burger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href === '#cardapio') {
      e.preventDefault();
      openMenuPage();
    }
    navLinks.classList.remove('open');
  });
});

// ===== MENU PAGE =====
const menuPage = document.getElementById('menuPage');
const menuClose = document.getElementById('menuClose');
const heroMenuBtn = document.getElementById('heroMenuBtn');
const navMenuTrigger = document.getElementById('navMenuTrigger');

function openMenuPage() {
  menuPage.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeMenuPage() {
  menuPage.classList.remove('open');
  document.body.style.overflow = '';
}

if (heroMenuBtn) heroMenuBtn.addEventListener('click', openMenuPage);
if (navMenuTrigger) navMenuTrigger.addEventListener('click', (e) => { e.preventDefault(); openMenuPage(); });
if (menuClose) menuClose.addEventListener('click', closeMenuPage);

// Close on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && menuPage.classList.contains('open')) closeMenuPage();
});

// ===== MENU CATEGORY FILTER =====
const mpills = document.querySelectorAll('.mpill');
const mcards = document.querySelectorAll('.mcard');

mpills.forEach(pill => {
  pill.addEventListener('click', () => {
    mpills.forEach(p => p.classList.remove('mpill--active'));
    pill.classList.add('mpill--active');
    const cat = pill.dataset.cat;
    mcards.forEach(card => {
      card.style.display = card.dataset.cat === cat ? 'flex' : 'none';
    });
  });
});

// ===== SCROLL ANIMATIONS =====
const animElements = document.querySelectorAll('.anim, .anim-left, .anim-right, .anim-scale');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else {
      entry.target.classList.remove('visible');
    }
  });
}, { threshold: 0.1 });

animElements.forEach(el => observer.observe(el));

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#cardapio') return; // handled separately
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ===== RESERVATION FORM =====
const reservaBtn = document.querySelector('.reserva .btn');
if (reservaBtn) {
  reservaBtn.addEventListener('click', () => {
    alert('Reserva enviada! (Demo - integrar con backend)');
  });
}
