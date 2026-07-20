/* ============================================
   THE SHEPHERD HOME CARE - MAIN JAVASCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileNav();
  initScrollAnimations();
  initTestimonials();
  initActiveNav();
  initBackToTop();
  initObfuscator();
});

/* ----- Sticky Header ----- */
function initStickyHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;

  let ticking = false;

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        header.classList.toggle('header--scrolled', window.scrollY > 50);
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // If page loads scrolled (e.g. from refresh), apply immediately
  if (window.scrollY > 50) {
    header.classList.add('header--scrolled');
  }

  // For sub-pages (careers), always show solid header
  if (document.body.classList.contains('page--sub')) {
    header.classList.add('header--scrolled');
  }
}

/* ----- Mobile Navigation ----- */
function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const header = document.getElementById('site-header');
  const mobileNav = document.getElementById('mobile-nav');

  if (!toggle || !header || !mobileNav) return;

  toggle.addEventListener('click', () => {
    const isOpen = header.classList.toggle('nav-open');
    toggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close on link click
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      header.classList.remove('nav-open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && header.classList.contains('nav-open')) {
      header.classList.remove('nav-open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      toggle.focus();
    }
  });
}

/* ----- Scroll-Triggered Animations ----- */
function initScrollAnimations() {
  // Respect reduced motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      el.classList.add('is-visible');
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
  );

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });
}

/* ----- Testimonial Rotation ----- */
function initTestimonials() {
  const slider = document.getElementById('testimonial-slider');
  if (!slider) return;

  const testimonials = [
    {
      quote: 'The Shepherd Home Care has been a blessing for our family. They truly treat my mother like their own. The caregivers are kind, patient, and always go above and beyond. We finally have peace of mind.',
      author: 'Sarah M.',
      role: 'Daughter of Client',
      initial: 'S'
    },
    {
      quote: 'After struggling to find reliable care for my father, we found The Shepherd. From day one, they listened to our needs and matched us with the perfect caregiver. It feels like family helping family.',
      author: 'James T.',
      role: 'Son of Client',
      initial: 'J'
    },
    {
      quote: 'What sets The Shepherd apart is that they truly know my grandmother by name and by heart. The personal touch and attention to detail makes all the difference. We are so grateful.',
      author: 'Maria L.',
      role: 'Granddaughter of Client',
      initial: 'M'
    }
  ];

  const quoteEl = slider.querySelector('.testimonial__quote');
  const authorEl = slider.querySelector('.testimonial__author');
  const roleEl = slider.querySelector('.testimonial__role');
  const avatarEl = slider.querySelector('.testimonial__avatar');
  const dots = slider.querySelectorAll('.testimonial-dot');

  if (!quoteEl || !authorEl || !roleEl) return;

  let current = 0;
  let interval;

  function showTestimonial(index) {
    current = index;
    const t = testimonials[index];

    // Fade out
    const testimonial = slider.querySelector('.testimonial');
    testimonial.style.opacity = '0';

    setTimeout(() => {
      quoteEl.textContent = t.quote;
      authorEl.textContent = t.author;
      roleEl.textContent = t.role;
      if (avatarEl) {
        avatarEl.textContent = t.initial;
      }
      testimonial.style.opacity = '1';
    }, 300);

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  function nextTestimonial() {
    showTestimonial((current + 1) % testimonials.length);
  }

  // Dot click
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      clearInterval(interval);
      showTestimonial(parseInt(dot.dataset.index, 10));
      interval = setInterval(nextTestimonial, 6000);
    });
  });

  // Pause on hover
  slider.addEventListener('mouseenter', () => clearInterval(interval));
  slider.addEventListener('mouseleave', () => {
    interval = setInterval(nextTestimonial, 6000);
  });

  // Start auto-rotation
  interval = setInterval(nextTestimonial, 6000);
}

/* ----- Active Nav Link Highlighting ----- */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            const href = link.getAttribute('href');
            link.classList.toggle('active', href === `#${id}`);
          });
        }
      });
    },
    { rootMargin: '-30% 0px -70% 0px' }
  );

  sections.forEach(section => observer.observe(section));
}

/* ----- Back to Top Button ----- */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        btn.classList.toggle('visible', window.scrollY > 400);
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ----- Email Obfuscation Defender ----- */
function initObfuscator() {
  document.querySelectorAll('.obfuscate-mailto').forEach(el => {
    const em = el.getAttribute('data-em');
    const dom = el.getAttribute('data-dom');
    const email = `${em}@${dom}`;
    
    if (el.hasAttribute('data-text') && el.textContent.trim() === '') {
      el.textContent = email;
    }
    
    el.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = `mailto:${email}`;
    });
  });
}
