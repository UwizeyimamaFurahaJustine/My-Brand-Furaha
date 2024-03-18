 // Get the modal
 var modal = document.getElementById("profileModal");

 // Get the <span> element that closes the modal
 var closeBtn = document.getElementsByClassName("close")[0];

 // Get the link to open the modal
 var profileLink = document.getElementById("profileLink");

 // When the user clicks on the link, open the modal
 profileLink.onclick = function() {
   modal.style.display = "block";
 }

 // When the user clicks on <span> (x), close the modal
 closeBtn.onclick = function() {
   modal.style.display = "none";
 }

 // When the user clicks anywhere outside of the modal, close it
 window.onclick = function(event) {
   if (event.target == modal) {
     modal.style.display = "none";
   }
 }

 function viewBlog(userId) {
    // Send an HTTP GET request to fetch the details of the blog with the specified ID
    fetch(`https://api-furahax.onrender.com/users/${userId}`, {
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
            // Display the details of the blog in the modal
            const userDetailsElement = document.getElementById('userDetails');
            userDetailsElement.innerHTML = `
            <p><strong>Title</strong> <br> ${data.username}</p>
            <p><strong>Description</strong> <br> ${data.email}</p>
            
            </p>
            <!-- Add more details as needed -->
        `;
            // Optionally, open the modal
            const profileModal = document.getElementById('profileModal');
            profileModal.style.display = 'block';
        })
        .catch(error => {
            console.error('Error fetching blog details:', error);
        });
  }

  function closeModal() {
    const profileModal = document.getElementById('profileModal');
    profileModal.style.display = 'none';
  }

 
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
    document.getElementById('logout').addEventListener('click', () => {
        logoutUser(); // Call the logout function
    });

});