// Function to logout
function logout() {
    // Clear current user data from localStorage
    localStorage.removeItem('currentUser');
    alert('Logged out successfully!');
    window.location.href = 'login.html'; // Redirect to login page
}

// Function to check if the user is authenticated
function isAuthenticated() {
    // Check if the user data exists in localStorage and if it contains necessary information
    const currentUser = localStorage.getItem('currentUser');
    return currentUser && currentUser !== 'undefined' && currentUser !== 'null';
}

// Redirect the user to the login page if they are not authenticated
if (!isAuthenticated()) {
    window.location.href = 'login.html';
}

// If an authenticated user tries to access the login page, redirect them to the dashboard
if (window.location.pathname.includes('login.html') && isAuthenticated()) {
    window.location.href = 'dashboard.html';
}