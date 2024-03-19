//  // Get the modal
//  var modal = document.getElementById("profileModal");

//  // Get the <span> element that closes the modal
//  var closeBtn = document.getElementsByClassName("close")[0];

//  // Get the link to open the modal
//  var profileLink = document.getElementById("profileLink");

//  // When the user clicks on the link, open the modal
//  profileLink.onclick = function() {
//    modal.style.display = "block";
//  }

//  // When the user clicks on <span> (x), close the modal
//  closeBtn.onclick = function() {
//    modal.style.display = "none";
//  }

//  // When the user clicks anywhere outside of the modal, close it
//  window.onclick = function(event) {
//    if (event.target == modal) {
//      modal.style.display = "none";
//    }
//  }

//  function viewUser() {
//   // Retrieve the token from local storage
//   const token = localStorage.getItem('token');

//   // Verify if the token exists
//   if (token) {
//       // Decode the token to get user information
//       const userData = jwtDecode(token);
      
//       // Extract the user ID from the decoded token
//       const userId = userData.id; // Adjust this according to your token structure
      
//       // Send an HTTP GET request to fetch the user details
//       fetch(`https://api-furahax.onrender.com/users/${userId}`, {
//               method: 'GET',
//               headers: {
//                   'Authorization': `Bearer ${token}`
//               }
//           })
//           .then(response => {
//               if (!response.ok) {
//                   throw new Error('Network response was not ok');
//               }
//               return response.json();
//           })
//           .then(data => {
//               // Display the details of the user in the modal
//               const userDetailsElement = document.getElementById('userDetails');
//               userDetailsElement.innerHTML = `
//                   <p><strong>Title</strong><br>${data.username}</p>
//                   <p><strong>Description</strong><br>${data.email}</p>
//               `;
//               // Optionally, open the modal
//               modal.style.display = 'block';
//           })
//           .catch(error => {
//               console.error('Error fetching user details:', error);
//               alert('An error occurred while fetching user details');
//           });
//   } else {
//       console.log('User is not logged in');
//       // Handle the case where the user is not logged in
//   }
// }
// var profileLink = document.getElementById("profileLink");

// // Add an event listener to the profile link
// profileLink.addEventListener("click", function(event) {
//     // Prevent the default action of the link
//     event.preventDefault();
    
//     // Call the viewUser function
//     viewUser();
// });
//   function closeModal() {
//     const profileModal = document.getElementById('profileModal');
//     profileModal.style.display = 'none';
//   }

//   const updateForm = document.getElementById('updateUser');
//         if (updateForm) {
//             updateForm.addEventListener('submit', async (event) => {
//                 event.preventDefault();
//                 const userId = document.getElementById('updateUserId').value; // Get the user ID from the hidden input field
//                 const names = document.getElementById('updateNames').value;
//                 const email = document.getElementById('updateEmail').value;
                
        
//                 const requestBody = {
//                     username: names,
//                     email: email
                    
//                 };
        
//                 try {
//                     const response = await fetch(`${baseURL}/users/${userId}`, {
//                         method: 'PUT',
//                         headers: {
//                             'Content-Type': 'application/json',
//                             'Authorization': `Bearer ${localStorage.getItem('token')}`
//                         },
//                         body: JSON.stringify(requestBody)
//                     });
        
//                     if (response.ok) {
//                         alert('User details updated successfully');
//                         location.reload();
                       
//                     } else {
//                         const errorData = await response.json();
//                         throw new Error(`Error: ${errorData.message}`);
//                     }
//                 } catch (error) {
//                     console.error('Error updating user:', error);
//                     alert('An error occurred while updating user details');
//                 }
//             });
//         }
        
    


// // Function to handle edit user click event
// function updateUser(userId) {
//     console.log('Edit user with ID:', userId);
//     const updateForm = document.getElementById('updateForm');
//     if (updateForm) {
//         updateForm.style.display = 'block';

//         // Set the value of the hidden input field for blogId
//         document.getElementById('updateUserId').value = userId;

//         const baseURL = 'https://api-furahax.onrender.com';

//         fetch(`${baseURL}/users/${userId}`, {
//             method: 'GET',
//             headers: {
//                 'Authorization': `Bearer ${localStorage.getItem('token')}`
//             }
//         })

//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }
//                 return response.json();
//             })

//             .then(data => {
//                 document.getElementById('updateNames').value = data.username;
//                 document.getElementById('updateEmail').value = data.email;
//             })

//             .catch(error => {
//                 console.error('Error fetching user data:', error);
//                 alert('An error occurred while fetching user data');

//             });
//     }
//     const closeButtons = document.getElementsByClassName('close');
//     for (const closeButton of closeButtons) {
//         closeButton.addEventListener('click', function () {
//             const modal = this.parentElement.parentElement;
//             modal.style.display = 'none';
//         });

//     }

//     // Function to handle form submission for updating user details

// }

 
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