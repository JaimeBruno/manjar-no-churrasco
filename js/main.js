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
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzEcIz-q8On9OpoUwnlxF5-9H981u973FVeQUMipG0qkZCxnmocHlZ3r_mMFnM4uDazug/exec';

// Horarios por día de la semana (0=dom, 1=lun ... 6=sab)
// Martes (2) = cerrado. Lunes (1) = solo mediodía.
const CRENEAUX = {
  midi: ['12:00', '12:30', '13:00', '13:30', '14:00'],
  soir: ['19:00', '19:30', '20:00', '20:30', '21:00']
};

const dateInput   = document.getElementById('r-date');
const heureSelect = document.getElementById('r-heure');
const reservaForm = document.getElementById('reservaForm');
const reservaMsg  = document.getElementById('reservaMsg');
const reservaBtn  = document.getElementById('reservaBtn');

// Fecha mínima = hoy
if (dateInput) {
  const today = new Date().toISOString().split('T')[0];
  dateInput.min = today;
}

// Al elegir fecha, rellenar horarios según el día
function updateCreneaux() {
  const val = dateInput.value;
  heureSelect.innerHTML = '';
  if (!val) return;

  const jour = new Date(val + 'T12:00:00').getDay();

  // Martes cerrado
  if (jour === 2) {
    heureSelect.innerHTML = '<option value="">— Fermé le mardi —</option>';
    return;
  }

  let options = [];
  if (jour === 1) {
    // Lunes: solo mediodía
    options = CRENEAUX.midi;
  } else {
    options = [...CRENEAUX.midi, ...CRENEAUX.soir];
  }

  heureSelect.innerHTML = options.map(h => `<option value="${h}">${h}</option>`).join('');
}

if (dateInput) {
  dateInput.addEventListener('change', updateCreneaux);
}

// Envío del formulario
if (reservaForm) {
  reservaForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const heure = heureSelect.value;
    if (!heure) {
      showMsg('Veuillez choisir un jour d\'ouverture.', 'error');
      return;
    }

    const payload = {
      nom:       document.getElementById('r-nom').value,
      email:     document.getElementById('r-email').value,
      telephone: document.getElementById('r-tel').value,
      personnes: document.getElementById('r-personnes').value,
      date:      dateInput.value,
      heure:     heure
    };

    reservaBtn.disabled = true;
    reservaBtn.textContent = 'ENVOI EN COURS...';

    fetch(SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify(payload)
    })
    .then(r => r.json())
    .then(res => {
      if (res.success) {
        showMsg('✅ Demande reçue ! Nous vous confirmerons par téléphone.', 'ok');
        reservaForm.reset();
        heureSelect.innerHTML = '';
      } else if (res.reason === 'complet') {
        showMsg('😔 Ce service est complet. Essayez un autre créneau ou jour.', 'error');
      } else {
        showMsg('Une erreur est survenue. Réessayez ou appelez-nous.', 'error');
      }
    })
    .catch(() => {
      showMsg('Une erreur est survenue. Réessayez ou appelez-nous.', 'error');
    })
    .finally(() => {
      reservaBtn.disabled = false;
      reservaBtn.textContent = 'CONFIRMER LA RÉSERVATION';
    });
  });
}

function showMsg(text, type) {
  reservaMsg.textContent = text;
  reservaMsg.style.display = 'block';
  reservaMsg.style.color = type === 'ok' ? '#7bc47b' : '#e88';
}
