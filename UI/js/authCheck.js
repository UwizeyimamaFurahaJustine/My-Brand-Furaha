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

function logout() {
    // Clear current user data from localStorage
    localStorage.removeItem('currentUser');
    alert('Logged out successfully!');
    window.location.href = 'login.html'; // Redirect to login page
}

    // Function to check if the user is authenticated
    function isAuthenticated() {
        // Check if the user data exists in localStorage
        return localStorage.getItem('currentUser') !== null;
    }

    // Check if the user is authenticated
    if (!isAuthenticated()) {
        // Redirect the user to the login page
        window.location.href = 'login.html';
    }