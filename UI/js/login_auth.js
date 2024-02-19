// Authentication 

// login.js
infoElement = document.getElementById('info');

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Retrieve user data from localStorage
    const users = JSON.parse(localStorage.getItem('users'));

    // Check if there are users stored
    if (users) {
        // Find user with matching email and password
        const user = users.find(user => user.email === email && user.password === password);
        
        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            infoElement.textContent = "Login Successful";
            // Redirect to dashboard
            window.location.href = 'dashboard.html'; 
        } else {
            infoElement.textContent = "Invalid email or password";
        }
    } else {
        alert('No users found. Please sign up first.');
    }
});
