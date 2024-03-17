// app.js

// const jwtDecode = require('jwt-decode');

// const token = "eyJ0eXAiO.../// jwt token";
// const decoded = jwtDecode(token);

// console.log(decoded);



// Function to check if user is authenticated
function isAuthenticated() {
    const token = localStorage.getItem('token');
    return token ? true : false;
}

// Function to check if user is admin
function isAdmin() {
    const token = localStorage.getItem('token');
    if (token) {
        const decodedToken = jwt_decode(token);
        return decodedToken.role === 'admin';
    }
    return false;
}

// Function to check if user is user
function isUser() {
    const token = localStorage.getItem('token');
    if (token) {
        const decodedToken = jwt_decode(token);
        return decodedToken.role === 'user';
    }
    return false;
}

// Function to redirect unauthorized users
function redirectUnauthorized() {
    if (!isAuthenticated()) {
        window.location.href = 'login.html'; // Redirect to login page
    }
}

// Function to redirect non-admin users
function redirectNonAdmin() {
    if (!isAdmin()) {
        window.location.href = 'unauthorized.html'; // Redirect to unauthorized page
    }
}

// Function to redirect non-user users
function redirectNonUser() {
    if (!isUser()) {
        window.location.href = 'unauthorized.html'; // Redirect to unauthorized page
    }
}

// Example usage in protected pages
if (document.getElementById('adminPage')) {
    redirectUnauthorized(); // Protect admin page
    redirectNonAdmin(); // Redirect non-admin users
}

if (document.getElementById('userPage')) {
    redirectUnauthorized(); // Protect user page
    redirectNonUser(); // Redirect non-user users
}
