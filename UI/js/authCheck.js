/*window.onload = ()=>{
    console.log("Page Load")
    const loggedInUser = localStorage.getItem("currentUser");
    if (loggedInUser !== null) {
        console.log("User Exists");
    } else {
        console.log("Should return to login page");
        window.location.href = "login.html"
    }
    
}*/


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

// Check if the user is authenticated
if (!isAuthenticated()) {
    // Redirect the user to the login page if they are not authenticated
    window.location.href = 'login.html';
} else {
    // Redirect the user away from the login or signup page if they are already authenticated
    window.location.href = 'dashboard.html'; // Redirect to dashboard or any other authenticated page
}

