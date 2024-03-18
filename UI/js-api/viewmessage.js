function deleteMessage(messageId) {
    
    
    console.log('Deleting message with ID:', messageId);
    // Send an HTTP DELETE request to delete the message with the specified ID
    fetch(`https://api-furahax.onrender.com/messages/${messageId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Add the user's authentication token
        }
    })
    .then(response => {
        if (response.ok) {
            alert('Message deleted successfully');
            location.reload();
            // Optionally, remove the message from the UI or update the UI
        }
    })
    .catch(error => {
        console.error('Error deleting message:', error);
    });
}

document.addEventListener('DOMContentLoaded', () => {
   
    const messageTable = document.getElementById('messageTable');
   
   // Function to fetch messages
   const fetchMessages = async () => {
    try {
        const response = await fetch('https://api-furahax.onrender.com/messages',
        {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Add the user's authentication token
        }
        
    });

        if (response.ok) {
            const messages = await response.json();
            displayMessages(messages);
        } else {
            const errorData = await response.json();
            alert(`Error: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error fetching messages:', error);
        alert('An error occurred while fetching messages');
    }
};




// Function to display messages
const displayMessages = (messages) => {
    messageTable.innerHTML = '';
    messages.forEach((message) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${message._id}</td>
            <td>${message.name}</td>
            <td>${message.email}</td>
            <td>${message.message}</td>
            <td>${message.createdAt}</td>
            <td><button onclick="deleteMessage('${message._id}')">Delete</button></td>
        `;
        messageTable.appendChild(row);
    });
};


// Function to handle user logout
const logoutUser = () => {
    // Remove token from localStorage or session storage
    localStorage.removeItem('token');
    // Redirect to the login page
    window.location.href = 'login.html';
}
document.addEventListener('DOMContentLoaded', () => {

    // Other code ...

    // Event listener for logout button
    document.getElementById('logoutButton').addEventListener('click', () => {
        logoutUser(); // Call the logout function
    });

});



    // Fetch messages when the page loads
    fetchMessages();
});