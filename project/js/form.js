/**
 * Form validation
 * Handles contact form validation and submission
 */

export function initFormValidation() {
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
    
    // Add input validation on blur
    const formInputs = contactForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
      input.addEventListener('blur', validateInput);
      input.addEventListener('input', clearError);
    });
  }
}

/**
 * Handle form submission
 * @param {Event} e - Form submit event
 */
function handleFormSubmit(e) {
  e.preventDefault();
  
  // Get form elements
  const form = e.target;
  const nameInput = form.elements.name;
  const emailInput = form.elements.email;
  const subjectInput = form.elements.subject;
  const messageInput = form.elements.message;
  
  // Validate all inputs
  const nameValid = validateInput({ target: nameInput });
  const emailValid = validateInput({ target: emailInput });
  const subjectValid = validateInput({ target: subjectInput });
  const messageValid = validateInput({ target: messageInput });
  
  // If all inputs are valid, process the form
  if (nameValid && emailValid && subjectValid && messageValid) {
    // Simulate form submission (in a real app, this would send data to a server)
    simulateFormSubmission(form);
  }
}

/**
 * Validate individual form input
 * @param {Event} e - Input blur event
 * @returns {boolean} - Whether the input is valid
 */
function validateInput(e) {
  const input = e.target;
  const value = input.value.trim();
  const errorElement = input.nextElementSibling;
  
  // Clear previous error
  errorElement.textContent = '';
  input.classList.remove('error');
  
  // Validate based on input type
  switch (input.id) {
    case 'name':
      if (value === '') {
        showError(input, errorElement, 'Please enter your name');
        return false;
      } else if (value.length < 2) {
        showError(input, errorElement, 'Name must be at least 2 characters');
        return false;
      }
      break;
      
    case 'email':
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (value === '') {
        showError(input, errorElement, 'Please enter your email');
        return false;
      } else if (!emailPattern.test(value)) {
        showError(input, errorElement, 'Please enter a valid email address');
        return false;
      }
      break;
      
    case 'subject':
      if (value === '') {
        showError(input, errorElement, 'Please enter a subject');
        return false;
      } else if (value.length < 3) {
        showError(input, errorElement, 'Subject must be at least 3 characters');
        return false;
      }
      break;
      
    case 'message':
      if (value === '') {
        showError(input, errorElement, 'Please enter your message');
        return false;
      } else if (value.length < 10) {
        showError(input, errorElement, 'Message must be at least 10 characters');
        return false;
      }
      break;
  }
  
  return true;
}

/**
 * Show error message for invalid input
 * @param {HTMLElement} input - Input element
 * @param {HTMLElement} errorElement - Error message element
 * @param {string} message - Error message
 */
function showError(input, errorElement, message) {
  errorElement.textContent = message;
  input.classList.add('error');
  input.focus();
}

/**
 * Clear error when user starts typing
 * @param {Event} e - Input event
 */
function clearError(e) {
  const input = e.target;
  const errorElement = input.nextElementSibling;
  
  errorElement.textContent = '';
  input.classList.remove('error');
}

/**
 * Simulate form submission with success message
 * @param {HTMLFormElement} form - Form element
 */
function simulateFormSubmission(form) {
  // Create and show loading state
  const submitButton = form.querySelector('button[type="submit"]');
  const originalText = submitButton.textContent;
  submitButton.disabled = true;
  submitButton.textContent = 'Sending...';
  
  // Simulate network request
  setTimeout(() => {
    // Reset form
    form.reset();
    
    // Reset button
    submitButton.disabled = false;
    submitButton.textContent = originalText;
    
    // Show success message
    const formContainer = form.parentElement;
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
      <div class="success-icon">✓</div>
      <h3>Message Sent!</h3>
      <p>Thank you for your message. I will get back to you soon.</p>
    `;
    
    // Add success styles
    Object.assign(successMessage.style, {
      backgroundColor: 'var(--color-background-alt)',
      padding: 'var(--spacing-lg)',
      borderRadius: 'var(--border-radius-md)',
      textAlign: 'center',
      color: 'var(--color-text)',
      marginTop: 'var(--spacing-md)',
      border: '1px solid var(--color-success)'
    });
    
    // Add icon styles
    const successIcon = successMessage.querySelector('.success-icon');
    Object.assign(successIcon.style, {
      backgroundColor: 'var(--color-success)',
      color: 'white',
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto var(--spacing-md)',
      fontSize: '1.5rem'
    });
    
    // Replace form with success message
    formContainer.replaceChild(successMessage, form);
    
    // After 5 seconds, restore the form
    setTimeout(() => {
      formContainer.replaceChild(form, successMessage);
    }, 5000);
  }, 1500);
}