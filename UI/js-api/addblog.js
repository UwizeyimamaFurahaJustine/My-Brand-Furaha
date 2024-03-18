document.addEventListener('DOMContentLoaded', () => {
    const addBlogForm = document.getElementById('addBlogForm');

    addBlogForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Get form data
        const formData = new FormData(this);

        // Send an HTTP POST request to the backend
        fetch('https://api-furahax.onrender.com/blogs', {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}` // Add the user's authentication token
            }
        })
        .then(response => {
            if (response.ok) {
                return response.json(); // Return parsed JSON response
            } else {
                throw new Error('Failed to add blog'); // Throw error for non-successful response
            }
        })
        .then(data => {
            // Handle the response from the backend
            console.log('New blog added successfully:', data);
            alert('Blog added successfully'); // Display success message
            addBlogForm.reset(); // Reset the form
        })
        .catch(error => {
            console.error('Error adding new blog:', error);
            alert('Failed to add blog. Please try again.'); // Display error message
        });
    });
});
