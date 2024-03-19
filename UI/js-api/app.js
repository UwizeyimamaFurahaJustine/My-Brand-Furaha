// app.js

// const { jwtDecode } = require("jwt-decode");



// Function to check if user is authenticated
function isAuthenticated() {
    const token = localStorage.getItem('token');
    return token ? true : false;
}

// Function to check if user is admin
function isAdmin() {
    const token = localStorage.getItem('token');
    if (token) {
        const decodedToken = jwtDecode(token);
        return decodedToken.role === 'admin';
    }
    return false;
}

// Function to check if user is user
function isUser() {
    const token = localStorage.getItem('token');
    if (token) {
        const decodedToken = jwtDecode(token);
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
        window.location.href = 'blogs.html'; // Redirect to login page
    }
}

// Function to redirect non-user users
function redirectNonUser() {
    if (!isUser()) {
        window.location.href = 'dashboard.html'; // Redirect to login page
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
