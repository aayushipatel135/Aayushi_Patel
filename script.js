// Typewriter effect
const taglines = [
  'ML Engineer · Software Developer',
  'Building Intelligent Systems',
  'NLP & Deep Learning Enthusiast',
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
