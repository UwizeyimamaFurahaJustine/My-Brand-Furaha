// Function to check if the user is authenticated
function isAuthenticated() {
    // Check if the user data exists in localStorage and if it contains necessary information
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser && currentUser.role;
}

// Function to restrict access based on user's role
function restrictAccess() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const pathname = window.location.pathname;
    const isLoginOrSignupPage = pathname.includes('login.html') || pathname.includes('signup.html');
    const isAdmin = currentUser.role === 'admin';
    const isDashboardPage = pathname.includes('dashboard.html');
    const isUsersPage = pathname.includes('blogs.html');

    if (isLoginOrSignupPage || (isAdmin && isUsersPage) || (!isAdmin && isDashboardPage)) {
        window.location.href = isAdmin ? 'dashboard.html' : 'blogs.html';
    }
}

// Restrict access based on user's role
restrictAccess();