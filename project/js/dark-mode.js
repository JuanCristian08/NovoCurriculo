/**
 * Dark mode functionality
 * Handles toggling between dark and light modes with localStorage persistence
 */

export function initDarkMode() {
  const themeToggle = document.getElementById('theme-toggle');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Check for saved theme in localStorage
  const savedTheme = localStorage.getItem('theme');
  
  // Apply saved theme or use system preference
  if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
    document.body.classList.add('dark-mode');
  }
  
  // Set up event listener for theme toggle button
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
  
  // Set up event listener for system theme changes
  prefersDarkScheme.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      if (e.matches) {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }
    }
  });
  
  // Add mousemove event for flashlight effect in dark mode
  document.addEventListener('mousemove', updateFlashlightEffect);
}

/**
 * Toggle between dark and light themes
 */
function toggleTheme() {
  if (document.body.classList.contains('dark-mode')) {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('theme', 'light');
  } else {
    document.body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
  }
}

/**
 * Create a flashlight effect when in dark mode by updating CSS variables
 * @param {MouseEvent} e - Mouse move event
 */
function updateFlashlightEffect(e) {
  if (document.body.classList.contains('dark-mode')) {
    document.documentElement.style.setProperty('--cursor-x', `${e.clientX}px`);
    document.documentElement.style.setProperty('--cursor-y', `${e.clientY}px`);
  }
}