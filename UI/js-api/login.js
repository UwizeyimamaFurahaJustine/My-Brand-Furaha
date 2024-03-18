
document.addEventListener('DOMContentLoaded', () => {

    const loginForm = document.getElementById('loginForm');

    // Function to handle user login
    const loginUser = async (userData) => {
        try {
            const response = await fetch(`https://api-furahax.onrender.com/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' // Correct content type
                },
                body: JSON.stringify(userData)
            });

            if (response.ok) {
                const responseData = await response.json();
                return responseData; // Return response data if login successful
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message); // Throw error if login failed
            }
        } catch (error) {
            console.error('Error logging in:', error);
            throw error; // Re-throw the error to be caught by the caller
        }
    }

    // Function to handle login form submission
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const userData = { email, password };

        try {
            const response = await loginUser(userData);

            // Save token to localStorage or session storage if login successful
            localStorage.setItem('token', response.token);

            // Redirect based on user role
            const decodedToken = jwtDecode(response.token);
            if (decodedToken.role === 'admin') {
                window.location.href = 'dashboard.html'; // Redirect to admin page
            } else {
                window.location.href = 'blogs.html'; // Redirect to user page
            }
        } catch (error) {
            // Handle login error by displaying error message
            document.getElementById('info').textContent = error.message || 'An error occurred during login.';
        }
    });

});
