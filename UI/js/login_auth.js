const infoElement = document.getElementById('info');

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Retrieve regular users' data from localStorage
    const regularUsers = JSON.parse(localStorage.getItem('users'));

    // Retrieve admin credentials from localStorage
    const adminCredentials = JSON.parse(localStorage.getItem('adminCredentials'));

    // Check if there are regular users stored
    if (regularUsers) {
        // Find regular user with matching email and password
        const regularUser = regularUsers.find(user => user.email === email && user.password === password);
        
        if (regularUser) {
            localStorage.setItem('currentUser', JSON.stringify(regularUser));
            infoElement.textContent = "Login Successful";

            // Redirect regular user to the dashboard
            window.location.href = 'blogs.html';
            return; // Exit the function
        }
    } else {
        alert('No regular users found. Please sign up first.');
        return; // Exit the function
    }

    // Check if there are admin credentials stored
    if (adminCredentials && adminCredentials.email === email && adminCredentials.password === password) {
        // Set current user as admin
        localStorage.setItem('currentUser', JSON.stringify(adminCredentials));
        infoElement.textContent = "Login Successful";

        // Redirect admin to the admin dashboard
        window.location.href = 'dashboard.html';
        return; // Exit the function
    }

    // If the provided credentials don't match any user or admin credentials, display an error message
    infoElement.textContent = "Invalid email or password";
});
