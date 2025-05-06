// Main JS file that imports all modules
import { initDarkMode } from './dark-mode.js';
import { initScrollAnimations } from './scroll.js';
import { initFormValidation } from './form.js';
import { initInteractions } from './interactions.js';

// Initialize all modules when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize dark/light mode toggle
  initDarkMode();
  
  // Initialize scroll animations
  initScrollAnimations();
  
  // Initialize form validation
  initFormValidation();
  
  // Initialize interactions
  initInteractions();
  
  console.log('Resume website initialized successfully!');
});