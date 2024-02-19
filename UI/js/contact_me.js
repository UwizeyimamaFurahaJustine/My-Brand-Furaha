document.addEventListener("DOMContentLoaded", function() {
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        if (validateForm()) {
            const formData = {
                fullName: document.getElementById('fullName').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };
            saveFormData(formData);
            contactForm.reset();
            alert('Message sent successfully!');
        }
    });
});

function validateForm() {
    let isValid = true;

    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (fullName === '') {
        isValid = false;
        document.getElementById('fullNameError').innerText = 'Please enter your full name';
    } else {
        document.getElementById('fullNameError').innerText = '';
    }

    if (email === '') {
        isValid = false;
        document.getElementById('emailError').innerText = 'Please enter your email address';
    } else if (!isValidEmail(email)) {
        isValid = false;
        document.getElementById('emailError').innerText = 'Please enter a valid email address';
    } else {
        document.getElementById('emailError').innerText = '';
    }

    if (message === '') {
        isValid = false;
        document.getElementById('messageError').innerText = 'Please enter your message';
    } else {
        document.getElementById('messageError').innerText = '';
    }

    return isValid;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function saveFormData(formData) {
    let savedData = JSON.parse(localStorage.getItem('formData')) || [];
    savedData.push(formData);
    localStorage.setItem('formData', JSON.stringify(savedData));
}