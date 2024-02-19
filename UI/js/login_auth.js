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

            // Check if the logged-in user is an admin
            if (email === "admin@example.com" && password === "AdminPassword123") {
                // Redirect to admin dashboard if the user is admin
                window.location.href = 'admin_dashboard.html';
            } else {
                // Redirect to user dashboard if the user is not admin
                window.location.href = 'user_dashboard.html';
            }
        } else {
            infoElement.textContent = "Invalid email or password";
        }
    } else {
        alert('No users found. Please sign up first.');
    }
});
