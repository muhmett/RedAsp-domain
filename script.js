// script.js pour REDASP.com
document.addEventListener('DOMContentLoaded', function() {
  /* ============================
     Animation au défilement
  ============================= */
  const animatedElements = document.querySelectorAll('.animate');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target); // évite de rejouer plusieurs fois
      }
    });
  }, { threshold: 0.15 });
  
  animatedElements.forEach(element => {
    element.style.opacity = 0;
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(element);
  });

  /* ============================
     Navigation fluide
  ============================= */
  document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetElement = document.querySelector(this.getAttribute('href'));
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ============================
     Dark/Light Mode Toggle
  ============================= */
  const themeToggle = document.createElement('button');
  themeToggle.innerHTML = '🌓';
  Object.assign(themeToggle.style, {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    zIndex: '1000',
    background: 'var(--primary)',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    cursor: 'pointer',
    fontSize: '1.5rem',
    boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
    transition: 'background 0.3s ease'
  });

  themeToggle.addEventListener('mouseenter', () => {
    themeToggle.style.background = 'var(--primary-dark)';
  });
  themeToggle.addEventListener('mouseleave', () => {
    themeToggle.style.background = 'var(--primary)';
  });

  themeToggle.addEventListener('click', function() {
    const html = document.documentElement;
    const isDark = html.getAttribute('data-theme') === 'dark';
    if (isDark) {
      html.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    } else {
      html.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    }
  });

  if (localStorage.getItem('theme') === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  document.body.appendChild(themeToggle);

  /* ============================
     Compteur de vues (LocalStorage)
  ============================= */
  const counterElement = document.createElement('div');
  Object.assign(counterElement.style, {
    position: 'fixed',
    bottom: '20px',
    left: '20px',
    background: 'var(--primary)',
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: 'var(--radius)',
    fontSize: '0.9rem',
    boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
  });

  let views = parseInt(localStorage.getItem('pageViews') || "0") + 1;
  localStorage.setItem('pageViews', views);
  counterElement.textContent = `👁️ ${views} vues`;

  document.body.appendChild(counterElement);
});
