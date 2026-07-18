// Theme toggle
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });
}

// Typewriter effect
const taglines = [
  'ML Engineer · Software Developer',
  'Building Intelligent Systems',
  'NLP · Computer Vision · LLMs',
  'IBM · DA-IICT Alumni',
];

const taglineEl = document.querySelector('.tagline-text');
if (taglineEl) {
  let i = 0, j = 0, deleting = false;

  function type() {
    const current = taglines[i];
    if (!deleting) {
      taglineEl.textContent = current.slice(0, ++j);
      if (j === current.length) {
        deleting = true;
        setTimeout(type, 2200);
        return;
      }
    } else {
      taglineEl.textContent = current.slice(0, --j);
      if (j === 0) {
        deleting = false;
        i = (i + 1) % taglines.length;
      }
    }
    setTimeout(type, deleting ? 38 : 65);
  }
  type();
}

// Navbar scroll shrink
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

// Active nav link tracking
const sections = document.querySelectorAll('section[id], header[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 140) current = sec.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
  });
}, { passive: true });

// Scroll-triggered section reveal
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.07, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.section').forEach(s => revealObserver.observe(s));

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Scroll progress bar
const scrollProgress = document.getElementById('scrollProgress');
if (scrollProgress) {
  window.addEventListener('scroll', () => {
    const h = document.documentElement;
    const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
  }, { passive: true });
}

// Cursor-follow spotlight in hero
const heroHeader = document.getElementById('home');
if (heroHeader) {
  heroHeader.addEventListener('mousemove', (e) => {
    const rect = heroHeader.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    heroHeader.style.setProperty('--mx', x + '%');
    heroHeader.style.setProperty('--my', y + '%');
  });
}

// Hero stat count-up
const statNums = document.querySelectorAll('.stat-num');
if (statNums.length) {
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.target, 10) || 0;
      const step = Math.max(1, Math.round(target / 36));
      let cur = 0;
      (function tick() {
        cur += step;
        if (cur >= target) { el.textContent = target; return; }
        el.textContent = cur;
        requestAnimationFrame(tick);
      })();
      statObserver.unobserve(el);
    });
  }, { threshold: 0.5 });
  statNums.forEach(el => statObserver.observe(el));
}

// Staggered project card reveal
const projectCards = document.querySelectorAll('.project-card');
if (projectCards.length) {
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const card = entry.target;
      const i = Array.from(projectCards).indexOf(card);
      setTimeout(() => card.classList.add('card-visible'), (i % 3) * 90);
      cardObserver.unobserve(card);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -30px 0px' });
  projectCards.forEach(card => cardObserver.observe(card));
}

// Project card tilt-on-hover
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / rect.height) * -6;
    const rotateY = ((x - rect.width / 2) / rect.width) * 6;
    card.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// Profile picture fallback
const profilePicture = document.getElementById('profilePicture');
if (profilePicture) {
  profilePicture.addEventListener('error', function () {
    this.style.display = 'none';
    const fallback = document.createElement('div');
    fallback.style.cssText = `
      position:relative; z-index:2; width:100%; height:100%; border-radius:50%;
      display:flex; align-items:center; justify-content:center;
      background: linear-gradient(135deg, rgba(0,245,212,0.15), rgba(139,92,246,0.2));
      font-size:3.2rem; font-weight:800; color:#00f5d4;
    `;
    fallback.textContent = 'AP';
    this.parentNode.appendChild(fallback);
  });
}
