/**
 * UI interaction enhancements
 * Handles micro-interactions and UI enhancements
 */

export function initInteractions() {
  // Initialize mobile menu toggle
  initMobileMenu();
  
  // Initialize print functionality
  initPrintButton();
  
  // Initialize tooltip functionality
  initTooltips();
}

/**
 * Initialize mobile menu toggle
 */
function initMobileMenu() {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const body = document.body;
  
  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      body.classList.toggle('mobile-menu-open');
    });
    
    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        body.classList.remove('mobile-menu-open');
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (
        body.classList.contains('mobile-menu-open') && 
        !e.target.closest('.nav') && 
        !e.target.closest('.mobile-menu-btn')
      ) {
        body.classList.remove('mobile-menu-open');
      }
    });
  }
}

/**
 * Initialize print functionality
 */
function initPrintButton() {
  const printBtn = document.querySelector('.print-btn');
  
  if (printBtn) {
    printBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.print();
    });
  }
}

/**
 * Initialize tooltips for elements with data-tooltip attribute
 */
function initTooltips() {
  // Find all elements with data-tooltip attribute
  const elements = document.querySelectorAll('[data-tooltip]');
  
  // Add tooltip functionality to each element
  elements.forEach(element => {
    // Mouse enter event to show tooltip
    element.addEventListener('mouseenter', (e) => {
      const tooltipText = element.getAttribute('data-tooltip');
      createTooltip(element, tooltipText);
    });
    
    // Mouse leave event to remove tooltip
    element.addEventListener('mouseleave', () => {
      const tooltip = document.querySelector('.tooltip');
      if (tooltip) {
        tooltip.remove();
      }
    });
  });
}

/**
 * Create and position a tooltip
 * @param {HTMLElement} element - Element to attach tooltip to
 * @param {string} text - Tooltip text
 */
function createTooltip(element, text) {
  // Remove any existing tooltips
  const existingTooltip = document.querySelector('.tooltip');
  if (existingTooltip) {
    existingTooltip.remove();
  }
  
  // Create tooltip element
  const tooltip = document.createElement('div');
  tooltip.className = 'tooltip';
  tooltip.textContent = text;
  
  // Add tooltip styles
  Object.assign(tooltip.style, {
    position: 'absolute',
    backgroundColor: 'var(--color-gray-800)',
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    fontSize: '0.875rem',
    zIndex: '1000',
    pointerEvents: 'none',
    whiteSpace: 'nowrap'
  });
  
  // Append to body
  document.body.appendChild(tooltip);
  
  // Position tooltip above the element
  positionTooltip(tooltip, element);
}

/**
 * Position the tooltip relative to its parent element
 * @param {HTMLElement} tooltip - Tooltip element
 * @param {HTMLElement} element - Parent element
 */
function positionTooltip(tooltip, element) {
  const rect = element.getBoundingClientRect();
  const tooltipRect = tooltip.getBoundingClientRect();
  
  // Calculate position (centered above the element)
  const top = rect.top - tooltipRect.height - 8;
  const left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
  
  // Adjust if tooltip would go off screen
  const adjustedLeft = Math.max(8, Math.min(left, window.innerWidth - tooltipRect.width - 8));
  
  // Set position
  tooltip.style.top = `${top}px`;
  tooltip.style.left = `${adjustedLeft}px`;
  
  // Add arrow pointing down to the element
  tooltip.style.setProperty('--arrow-size', '6px');
  tooltip.style.setProperty('--arrow-position', `${rect.left + rect.width / 2 - adjustedLeft}px`);
  tooltip.style.setProperty('--arrow-offset', `-6px`);
  
  tooltip.style.setProperty('--arrow-color', 'var(--color-gray-800)');
  tooltip.style.setProperty('--arrow-shadow-color', 'rgba(0, 0, 0, 0.2)');
  
  // Add arrow using ::after pseudo-element (using style tag for cross-browser support)
  const styleTag = document.createElement('style');
  styleTag.textContent = `
    .tooltip::after {
      content: '';
      position: absolute;
      bottom: var(--arrow-offset);
      left: var(--arrow-position);
      margin-left: calc(-1 * var(--arrow-size));
      border-width: var(--arrow-size);
      border-style: solid;
      border-color: var(--arrow-color) transparent transparent transparent;
    }
  `;
  document.head.appendChild(styleTag);
}