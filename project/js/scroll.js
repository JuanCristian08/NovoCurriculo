/**
 * Scroll animations
 * Handles smooth scrolling and reveal animations on scroll
 */

export function initScrollAnimations() {
  // Add scroll reveal class to elements to be animated
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => {
    section.classList.add('reveal');
  });
  
  // Initialize scroll observer for reveal animations
  initScrollObserver();
  
  // Smooth scroll for navigation links
  initSmoothScroll();
  
  // Initialize header scroll behavior
  initHeaderScroll();
  
  // Initialize back to top button
  initBackToTop();
}

/**
 * Initialize scroll observer for reveal animations
 */
function initScrollObserver() {
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealOptions = {
    root: null, // viewport
    rootMargin: '-50px',
    threshold: 0.15
  };
  
  const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        
        // Animate skill bars when skills section is visible
        if (entry.target.id === 'skills') {
          animateSkillBars();
        }
      }
    });
  };
  
  const observer = new IntersectionObserver(revealCallback, revealOptions);
  
  revealElements.forEach(element => {
    observer.observe(element);
  });
}

/**
 * Animate skill bars when they come into view
 */
function animateSkillBars() {
  const progressBars = document.querySelectorAll('.skill-progress-bar');
  
  progressBars.forEach(bar => {
    const percent = bar.getAttribute('data-percent');
    bar.style.width = `${percent}`;
  });
}

/**
 * Initialize smooth scroll for navigation links
 */
function initSmoothScroll() {
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      
      const targetId = link.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // Close mobile menu if open
        const body = document.body;
        body.classList.remove('mobile-menu-open');
        
        // Scroll to the target section
        window.scrollTo({
          top: targetElement.offsetTop - 60, // Adjust for header height
          behavior: 'smooth'
        });
      }
      
      // Update active link
      navLinks.forEach(navLink => navLink.classList.remove('active'));
      link.classList.add('active');
    });
  });
}

/**
 * Initialize header scroll behavior
 * Hide header on scroll down, show on scroll up
 */
function initHeaderScroll() {
  const header = document.querySelector('.header');
  let lastScrollTop = 0;
  
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add scrolled class when page is scrolled
    if (scrollTop > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Hide/show header based on scroll direction
    if (scrollTop > lastScrollTop && scrollTop > 300) {
      // Scrolling down and not at the top
      header.classList.add('hidden');
    } else {
      // Scrolling up or at the top
      header.classList.remove('hidden');
    }
    
    lastScrollTop = scrollTop;
  });
}

/**
 * Initialize back to top button
 */
function initBackToTop() {
  const backToTopButton = document.getElementById('back-to-top');
  
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
      backToTopButton.classList.add('visible');
    } else {
      backToTopButton.classList.remove('visible');
    }
  });
  
  backToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}