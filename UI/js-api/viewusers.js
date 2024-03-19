document.addEventListener('DOMContentLoaded', () => {
    // Fetch all blogs from the backend
    const baseURL = 'https://api-furahax.onrender.com';
    fetch(`${baseURL}/users`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Add the user's authentication token 
        }

    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })

        // Function to display users
        .then(data => {

            const userDataBody = document.getElementById('userDataBody');

            data.forEach(user => {

                const tr = document.createElement('tr');
                tr.innerHTML = `
            <td>${user._id}</td>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${user.password}</td>
            <td>19/03/2024</td>
            <td>
                <button onclick="editUser('${user._id}')">Edit</button>
                <button onclick="deleteUser('${user._id}')">Delete</button>
            </td>
        `;
                userDataBody.appendChild(tr);
            });
        })
        .catch(error => {
            console.error('Error fetching blogs:', error);
        });

        const updateForm = document.getElementById('updateUser');
        if (updateForm) {
            updateForm.addEventListener('submit', async (event) => {
                event.preventDefault();
                const userId = document.getElementById('updateUserId').value; // Get the user ID from the hidden input field
                const names = document.getElementById('updateNames').value;
                const email = document.getElementById('updateEmail').value;
                
        
                const requestBody = {
                    username: names,
                    email: email
                    
                };
        
                try {
                    const response = await fetch(`https://api-furahax.onrender.com/users/${userId}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        },
                        body: JSON.stringify(requestBody)
                    });
        
                    if (response.ok) {
                        alert('User details updated successfully');
                        location.reload();
                       
                    } else {
                        const errorData = await response.json();
                        throw new Error(`Error: ${errorData.message}`);
                    }
                } catch (error) {
                    console.error('Error updating user:', error);
                    alert('An error occurred while updating user details');
                }
            });
        }
        
    
});

// Function to handle edit user click event
function editUser(userId) {
    console.log('Edit user with ID:', userId);
    const updateForm = document.getElementById('updateUser');
    if (updateForm) {
        updateForm.style.display = 'block';

        // Set the value of the hidden input field for blogId
        document.getElementById('updateUserId').value = userId;

        const baseURL = 'https://api-furahax.onrender.com';

        fetch(`${baseURL}/users/${userId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })

            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })

            .then(data => {
                document.getElementById('updateNames').value = data.username;
                document.getElementById('updateEmail').value = data.email;
            })

            .catch(error => {
                console.error('Error fetching user data:', error);
                alert('An error occurred while fetching user data');

            });
    }
    const closeButtons = document.getElementsByClassName('close');
    for (const closeButton of closeButtons) {
        closeButton.addEventListener('click', function () {
            const modal = this.parentElement.parentElement;
            modal.style.display = 'none';
        });

    }

    // Function to handle form submission for updating user details

}

// Function to delete a user
function deleteUser(userId) {
    fetch(`https://api-furahax.onrender.com/users/${userId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })

        .then(response => {
            if (response.ok) {
                alert('User deleted successfully');
                fetchUsers();
            }
        })
        .catch(error => {
            console.error('Error deleting user:', error);
            alert('An error occurred while deleting the user');
        });
}

