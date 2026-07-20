/* ============================================
   THE SHEPHERD HOME CARE - FORM HANDLING
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initContactForm();
  initApplicationForm();
});

/* ----- Contact Form ----- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validateContactForm(form)) return;

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    const formData = new FormData(form);
    // IMPORTANT: Replace this with your actual Web3Forms access key
    formData.append("access_key", "72c593bd-0f07-4fec-a013-a3f770c185a7");
    formData.append("subject", "New Contact Inquiry from The Shepherd Home Care");

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        // Show success state
        form.style.display = 'none';
        const success = document.getElementById('contact-success');
        if (success) success.classList.add('show');
        form.reset();
      } else {
        alert("Something went wrong. Please try again later.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again later.");
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
}

/* ----- Application Form ----- */
function initApplicationForm() {
  const form = document.getElementById('application-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validateApplicationForm(form)) return;

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;

    const formData = new FormData(form);

    // IMPORTANT: Replace this with your actual Web3Forms access key
    formData.append("access_key", "72c593bd-0f07-4fec-a013-a3f770c185a7");
    formData.append("subject", "New Caregiver Application");

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        // Show success
        form.style.display = 'none';
        const success = document.getElementById('application-success');
        if (success) success.classList.add('show');
        form.reset();
      } else {
        alert("Something went wrong. Please try again later.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again later.");
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
}

/* ----- Validation: Contact Form ----- */
function validateContactForm(form) {
  let valid = true;
  clearErrors(form);

  const name = form.querySelector('#contact-name');
  const email = form.querySelector('#contact-email');
  const message = form.querySelector('#contact-message');

  if (!name.value.trim()) {
    showError(name);
    valid = false;
  }

  if (!isValidEmail(email.value)) {
    showError(email);
    valid = false;
  }

  if (!message.value.trim()) {
    showError(message);
    valid = false;
  }

  return valid;
}

/* ----- Validation: Application Form ----- */
function validateApplicationForm(form) {
  let valid = true;
  clearErrors(form);

  const firstName = form.querySelector('#app-first-name');
  const lastName = form.querySelector('#app-last-name');
  const email = form.querySelector('#app-email');
  const phone = form.querySelector('#app-phone');

  if (!firstName.value.trim()) {
    showError(firstName);
    valid = false;
  }

  if (!lastName.value.trim()) {
    showError(lastName);
    valid = false;
  }

  if (!isValidEmail(email.value)) {
    showError(email);
    valid = false;
  }

  if (phone.value.trim() && !isValidPhone(phone.value)) {
    showError(phone);
    valid = false;
  }

  return valid;
}

/* ----- Helpers ----- */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function isValidPhone(phone) {
  const digits = phone.replace(/\D/g, '');
  return digits.length >= 10;
}

function showError(input) {
  input.classList.add('is-invalid');
  const error = input.nextElementSibling;
  if (error && error.classList.contains('form-error')) {
    error.style.display = 'block';
  }
}

function clearErrors(form) {
  form.querySelectorAll('.is-invalid').forEach(el => {
    el.classList.remove('is-invalid');
  });
  form.querySelectorAll('.form-error').forEach(el => {
    el.style.display = 'none';
  });
}
