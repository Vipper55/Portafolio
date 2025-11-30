// ===================================
// SMOOTH SCROLLING
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    
    if (target) {
      target.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  });
});

// ===================================
// SCROLL ANIMATIONS
// ===================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Observar todos los elementos con clase fade-in
document.querySelectorAll('.fade-in').forEach(element => {
  observer.observe(element);
});

// ===================================
// NAVIGATION SCROLL EFFECT
// ===================================
window.addEventListener('scroll', () => {
  const nav = document.getElementById('nav');
  
  if (window.scrollY > 100) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// ===================================
// ACTIVE NAVIGATION LINK
// ===================================
function setActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  let currentSection = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (window.scrollY >= sectionTop - 200) {
      currentSection = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', setActiveNavLink);

// ===================================
// CAROUSEL AUTO SCROLL (OPCIONAL)
// ===================================
function initCarouselAutoScroll() {
  const carousel = document.querySelector('.posters-carousel');
  
  if (!carousel) return;
  
  let isScrolling = false;
  let startX;
  let scrollLeft;
  
  carousel.addEventListener('mousedown', (e) => {
    isScrolling = true;
    carousel.style.cursor = 'grabbing';
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
  });
  
  carousel.addEventListener('mouseleave', () => {
    isScrolling = false;
    carousel.style.cursor = 'grab';
  });
  
  carousel.addEventListener('mouseup', () => {
    isScrolling = false;
    carousel.style.cursor = 'grab';
  });
  
  carousel.addEventListener('mousemove', (e) => {
    if (!isScrolling) return;
    e.preventDefault();
    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - startX) * 2;
    carousel.scrollLeft = scrollLeft - walk;
  });
}

// Inicializar el carrusel cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initCarouselAutoScroll);

// ===================================
// LOADING ANIMATION
// ===================================
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

// ===================================
// MOBILE MENU TOGGLE (Para futuro)
// ===================================
function initMobileMenu() {
  const menuButton = document.querySelector('.mobile-menu-button');
  const navLinks = document.querySelector('.nav-links');
  
  if (menuButton && navLinks) {
    menuButton.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      menuButton.classList.toggle('active');
    });
  }
}

// ===================================
// PERFORMANCE: Throttle scroll events
// ===================================
function throttle(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Aplicar throttle a eventos de scroll
const throttledScroll = throttle(() => {
  setActiveNavLink();
}, 100);

window.addEventListener('scroll', throttledScroll);

// ===================================
// CONSOLE MESSAGE (Easter egg)
// ===================================
console.log('%c👾 Hey Developer! ', 'background: #9d4edd; color: white; font-size: 20px; padding: 10px;');
console.log('%cLooking at the code? I like you already! 🚀', 'font-size: 14px; color: #c77dff;');
console.log('%cFeel free to reach out: jhairassael@gmail.com', 'font-size: 12px; color: #888;');