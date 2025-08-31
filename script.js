document.addEventListener('DOMContentLoaded', function() {
  // ===== Hero background animation =====
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.style.opacity = 0;
    hero.style.transform = 'scale(1.05)';
    hero.style.transition = 'opacity 1.2s ease, transform 1.2s ease';

    setTimeout(() => {
      hero.style.opacity = 1;
      hero.style.transform = 'scale(1)';
    }, 300);
  }

  // ===== Animation on scroll =====
  const animatedElements = document.querySelectorAll('.animate');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, {
    threshold: 0.1
  });
  
  animatedElements.forEach(element => {
    element.style.opacity = 0;
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(element);
  });

  // ===== Smooth navigation =====
  document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      window.scrollTo({
        top: targetElement.offsetTop - 100,
        behavior: 'smooth'
      });
    });
  });

  // ===== Theme switcher =====
  const themeToggle = document.createElement('button');
  themeToggle.innerHTML = '🌓';
  themeToggle.style.position = 'fixed';
  themeToggle.style.bottom = '20px';
  themeToggle.style.right = '20px';
  themeToggle.style.zIndex = '1000';
  themeToggle.style.background = 'var(--primary)';
  themeToggle.style.color = 'white';
  themeToggle.style.border = 'none';
  themeToggle.style.borderRadius = '50%';
  themeToggle.style.width = '50px';
  themeToggle.style.height = '50px';
  themeToggle.style.cursor = 'pointer';
  themeToggle.style.fontSize = '1.5rem';
  
  themeToggle.addEventListener('click', function() {
    const html = document.documentElement;
    if (html.getAttribute('data-theme') === 'dark') {
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

  // ===== Page views counter =====
  const counterElement = document.createElement('div');
  counterElement.style.position = 'fixed';
  counterElement.style.bottom = '20px';
  counterElement.style.left = '20px';
  counterElement.style.background = 'var(--primary)';
  counterElement.style.color = 'white';
  counterElement.style.padding = '0.5rem 1rem';
  counterElement.style.borderRadius = 'var(--radius)';
  counterElement.style.fontSize = '0.9rem';
  
  let views = localStorage.getItem('pageViews') || 0;
  views = parseInt(views) + 1;
  localStorage.setItem('pageViews', views);
  counterElement.textContent = `👁️ ${views} views`;
  
  document.body.appendChild(counterElement);
});
