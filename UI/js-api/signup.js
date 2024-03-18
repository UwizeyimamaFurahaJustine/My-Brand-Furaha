// auth.js
document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');
    

 // Update with your backend URL

// Function to handle user signup

const signupUser = async (userData) =>{
    try {
        const response = await fetch(`https://api-furahax.onrender.com/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

            if (response.ok) {
                alert('Register successfully');
            signupForm.reset();
                
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message}`);
            }
    } catch (error) {
        console.error('Error signing up:', error);
        return { error: 'Error signing up' };
    }
}

document.getElementById('signupForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    signupUser(username, email, password);

    const userData = { username, email, password };

    try {
        console.log('Attempting signup...');
        const response = await signupUser(userData);
        console.log('Signup response:', response);

        if (response.error) {
            document.getElementById('info').textContent = response.error;
        } else {
            console.log('Redirecting to login page...');
            window.location.href = 'login.html'; // Redirect to login page
        }
    } catch (error) {
        console.error('Error during signup:', error);
       
    }
});



});

