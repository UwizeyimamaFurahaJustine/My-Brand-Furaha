document.addEventListener("DOMContentLoaded", function() {
  const contactForm = document.getElementById('contactForm');
  const fullNameInput = document.getElementById('fullName');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');

  function validateForm() {
  let isValid = true;

  const fullName = document.getElementById('fullName').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (fullName === '') {
      isValid = false;
      updateError('fullName', 'Please enter your full name');
  }

  if (email === '') {
      isValid = false;
      updateError('email', 'Please enter your email address');
  } else if (!isValidEmail(email)) {
      isValid = false;
      updateError('email', 'Please enter a valid email address');
  }

  if (message === '') {
      isValid = false;
      updateError('message', 'Please enter your message');
  }

  return isValid;
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function updateError(inputId, errorMessage) {
  const errorElement = document.getElementById(inputId + 'Error');
  errorElement.innerText = errorMessage;
}

  fullNameInput.addEventListener('input', () => {
      updateError('fullName', '');
  });
  emailInput.addEventListener('input', () => {
      updateError('email', '');
  });
  messageInput.addEventListener('input', () => {
      updateError('message', '');
  });

  contactForm.addEventListener('submit', function(event) {
      event.preventDefault();
      if (validateForm()) {
          const formData = {
              fullName: fullNameInput.value,
              email: emailInput.value,
              message: messageInput.value
          };
          saveFormData(formData);
          contactForm.reset();
          alert('Message sent successfully!');
      }
  });
});



function saveFormData(formData) {
  let savedData = JSON.parse(localStorage.getItem('formData')) || [];
  savedData.push(formData);
  localStorage.setItem('formData', JSON.stringify(savedData));
}