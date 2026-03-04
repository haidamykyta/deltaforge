// PolyStrike Landing - Animations, Scroll Effects, Navigation

document.addEventListener('DOMContentLoaded', () => {

  // --- Intersection Observer for scroll animations ---
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
  );

  document.querySelectorAll('.animate-on-scroll').forEach((el) => {
    observer.observe(el);
  });

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // --- Nav enhancement on scroll ---
  const nav = document.querySelector('nav');
  if (nav) {
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const currentScroll = window.scrollY;

      // Strengthen border on scroll
      if (currentScroll > 30) {
        nav.style.borderBottomColor = 'rgba(77, 107, 254, 0.2)';
        nav.style.background = 'rgba(6, 10, 20, 0.92)';
      } else {
        nav.style.borderBottomColor = '';
        nav.style.background = '';
      }

      lastScroll = currentScroll;
    });
  }

  // --- Mobile nav toggle ---
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
      navToggle.classList.toggle('active');
    });
  }

  // --- Animate numbers (count-up effect) ---
  const proofNumbers = document.querySelectorAll('.proof-number');
  const numberObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
          entry.target.dataset.animated = 'true';
          animateNumber(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  proofNumbers.forEach((el) => numberObserver.observe(el));

  function animateNumber(el) {
    const text = el.textContent.trim();

    // Check if it's a pure number
    const num = parseFloat(text);
    if (isNaN(num)) return; // Skip non-numeric (like "1.5yr")

    const isNegative = num < 0;
    const absNum = Math.abs(num);
    const suffix = text.replace(/[0-9.-]/g, '');
    const duration = 1200;
    const start = performance.now();

    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(absNum * eased);
      el.textContent = (isNegative ? '-' : '') + current + suffix;

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    el.textContent = (isNegative ? '-' : '') + '0' + suffix;
    requestAnimationFrame(step);
  }

  // --- Active nav link based on current page ---
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach((link) => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === 'index.html' && href === '#problem')) {
      // Don't mark anchor links as active on homepage
    }
    if (href === currentPage) {
      link.classList.add('active');
    }
  });
});
