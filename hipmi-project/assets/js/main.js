/* ============================================================
   HIPMI — main.js
   Skrip bersama untuk seluruh halaman. Setiap fitur dicek dulu
   keberadaan elemennya di halaman sebelum dijalankan, supaya
   file ini aman dipakai di semua halaman tanpa error di console.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initActiveNavLink();
  initCounters();
  initDirectoryFilter();
  initChipFilter('galleryFilterRow', 'galleryGrid', 'galleryEmpty');
  initTabs();
  initRegForm();
  initDemoForms();
  initScrollReveal();
  initHeaderScrollShadow();
  initBackToTop();
});

/* ---------- 1. Navigasi mobile (hamburger) ---------- */
function initMobileNav(){
  const menuToggle = document.getElementById('menuToggle');
  const primaryNav = document.getElementById('primaryNav');
  if (!menuToggle || !primaryNav) return;

  const iconMenu = document.getElementById('iconMenu');
  const iconClose = document.getElementById('iconClose');

  menuToggle.addEventListener('click', () => {
    const isOpen = primaryNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    if (iconMenu) iconMenu.style.display = isOpen ? 'none' : 'block';
    if (iconClose) iconClose.style.display = isOpen ? 'block' : 'none';
  });

  primaryNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    primaryNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    if (iconMenu) iconMenu.style.display = 'block';
    if (iconClose) iconClose.style.display = 'none';
  }));
}

/* ---------- 2. Tandai link navigasi aktif sesuai halaman ---------- */
function initActiveNavLink(){
  const links = document.querySelectorAll('nav.primary a[data-page]');
  if (!links.length) return;
  const current = document.body.getAttribute('data-page');
  links.forEach(link => {
    if (link.getAttribute('data-page') === current) link.classList.add('active');
  });
}

/* ---------- 3. Animasi counter statistik ---------- */
function initCounters(){
  const counters = document.querySelectorAll('.stat-num');
  if (!counters.length) return;

  const formatNum = (val, compact) => {
    if (compact === 'jt') return (val / 1000000).toFixed(1).replace('.0', '') + ' jt';
    return val.toLocaleString('id-ID');
  };

  const animateCounter = (el) => {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    const compact = el.dataset.compact;
    const duration = 1400;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const val = Math.floor(eased * target);
      el.textContent = formatNum(val, compact) + (progress === 1 ? suffix : '');
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => io.observe(c));
}

/* ---------- 4. Filter Direktori Anggota ---------- */
function initDirectoryFilter(){
  initChipFilter('filterRow', 'memberGrid', 'directoryEmpty');
}

/* ---------- 4b. Helper filter chip generik (dipakai Direktori & Galeri) ---------- */
function initChipFilter(filterRowId, gridId, emptyId){
  const filterRow = document.getElementById(filterRowId);
  const grid = document.getElementById(gridId);
  if (!filterRow || !grid) return;

  const chips = filterRow.querySelectorAll('.chip');
  const cards = grid.querySelectorAll('[data-sector], [data-category]');
  const emptyState = emptyId ? document.getElementById(emptyId) : null;

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const filter = chip.dataset.filter;
      let visibleCount = 0;
      cards.forEach(card => {
        const key = card.dataset.sector || card.dataset.category;
        const show = (filter === 'all' || key === filter);
        card.style.display = show ? '' : 'none';
        if (show) visibleCount++;
      });
      if (emptyState) emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
    });
  });
}

/* ---------- 5. Tabs (halaman Kabar & Wawasan) ---------- */
function initTabs(){
  const tabButtons = document.querySelectorAll('.tab-btn');
  if (!tabButtons.length) return;

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach(p => {
        p.classList.remove('active', 'tab-fade');
      });
      btn.classList.add('active');
      const panel = document.getElementById(target);
      if (panel) {
        panel.classList.add('active');
        // beri jeda 1 frame supaya transisi opacity benar-benar terlihat
        requestAnimationFrame(() => {
          requestAnimationFrame(() => panel.classList.add('tab-fade'));
        });
      }
    });
  });

  // panel pertama yang sudah aktif saat load juga perlu kelas fade-nya
  const initialActive = document.querySelector('.tab-panel.active');
  if (initialActive) requestAnimationFrame(() => initialActive.classList.add('tab-fade'));
}

/* ---------- 6. Formulir pendaftaran anggota ---------- */
function initRegForm(){
  const form = document.getElementById('regForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const note = document.getElementById('formNote');
    if (note) {
      note.textContent = 'Terima kasih, pendaftaran Anda telah tercatat. Tim BPC domisili akan segera menghubungi Anda.';
      note.style.color = '#E7D3AC';
    }
    form.reset();
  });
}

/* ---------- 7. Form demo lain (Kontak, RSVP Agenda) ---------- */
function initDemoForms(){
  document.querySelectorAll('form[data-demo-success]').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const successMsg = form.dataset.demoSuccess;
      const note = form.querySelector('.form-note');
      if (note) note.textContent = successMsg;
      form.reset();
    });
  });
}

/* ---------- 8. Scroll reveal — elemen muncul halus saat kena scroll ---------- */
function initScrollReveal(){
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  const addReveal = (el, delayIndex) => {
    el.classList.add('reveal');
    if (!prefersReduced && delayIndex) {
      el.style.transitionDelay = (Math.min(delayIndex, 6) * 70) + 'ms';
    }
    observer.observe(el);
  };

  // Kelompok elemen: kartunya sendiri yang staggered (muncul bergantian)
  const groupSelectors = [
    '.hero-inner', '.stats-row', '.program-list', '.agenda-list', '.news-list',
    '.member-grid', '.story-grid', '.region-grid', '.contact-grid', '.partner-grid',
    '.pub-list', '.gallery-grid', '.value-list', '.timeline', '.faq-list',
    '.mini-stats', '.org-row2', '.org-kompartemen', '.membership-grid'
  ];
  groupSelectors.forEach(sel => {
    document.querySelectorAll(sel).forEach(container => {
      Array.from(container.children).forEach((child, i) => addReveal(child, i));
    });
  });

  // Blok tunggal: muncul sebagai satu kesatuan, tanpa stagger
  const soloSelectors = [
    '.page-banner .container', '.section-head', '.doc-toc', '.cta-banner',
    '.form-card', '.profile-hero', '.article-head', '.story-detail-head',
    '.org-chart > .org-node'
  ];
  soloSelectors.forEach(sel => {
    document.querySelectorAll(sel).forEach(el => addReveal(el, 0));
  });
}

/* ---------- 9. Header dapat shadow halus saat halaman di-scroll ---------- */
function initHeaderScrollShadow(){
  const header = document.querySelector('header');
  if (!header) return;
  const toggle = () => {
    if (window.scrollY > 12) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  toggle();
  window.addEventListener('scroll', toggle, { passive: true });
}

/* ---------- 10. Tombol kembali ke atas ---------- */
function initBackToTop(){
  const btn = document.createElement('button');
  btn.className = 'back-to-top';
  btn.setAttribute('aria-label', 'Kembali ke atas');
  btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
  document.body.appendChild(btn);

  const toggle = () => {
    if (window.scrollY > 480) btn.classList.add('show');
    else btn.classList.remove('show');
  };
  toggle();
  window.addEventListener('scroll', toggle, { passive: true });

  btn.addEventListener('click', () => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
  });
}
