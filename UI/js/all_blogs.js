// Retrieve stored data from localStorage
function retrieveUserData() {
    let userData = [];
    if (localStorage.getItem('blogs')) {
      userData = JSON.parse(localStorage.getItem('blogs'));
    }
    return userData;
  }
  
  // Function to generate HTML table rows based on the retrieved data
function generateTableRows(userData) {
    let rows = '';
    userData.forEach((user, index) => {
        rows += `
            <tr>
                <td>${index + 1}</td>
                <td><img src="${user.picture}" style="max-width: 100px; max-height: 100px;"></td>
                <td>${user.title}</td>
                <td>${user.description}</td>
                <td></td>
                <td></td>
                <td>${user.date}</td>
                <td>${user.author}</td>
                <td>
                    <button onclick="viewUser(${index})">View</button>
                    <button onclick="openUpdateForm(${index})">Edit</button>
                    <button onclick="deleteUser(${index})">Delete</button>
                </td>
            </tr>
        `;
    });
    return rows;
}

// Function to display retrieved data in a table
function displayUserDataInTable() {
    const userData = retrieveUserData();
    const tableBody = document.getElementById('blogTableBody');
    if (userData.length > 0) {
        const tableRows = generateTableRows(userData);
        tableBody.innerHTML = tableRows;
    } else {
        tableBody.innerHTML = '<tr><td colspan="8">No data available</td></tr>';
    }
}
  
  // Function to view user details in a modal
  function viewUser(index) {
    const userData = retrieveUserData();
    const user = userData[index];
    const modal = document.getElementById('userModal');
    const blogDetails = document.getElementById('blogDetails');
    blogDetails.innerHTML = `<strong>Tile:</strong> ${user.title}<br><strong>Picture:</strong><img src="${user.picture}" style="max-width: 100px; max-height: 100px;"><br><strong>Description:</strong> ${user.description}<br><strong>Comments:</strong> <br><strong>Likes:</strong> $<br><strong>Date:</strong> ${user.date}<br><strong>Author:</strong> ${user.author}`;
    modal.style.display = "block";

    // Close the modal when the close button or outside the modal content is clicked
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
  }
  
// Function to open update form with user details
function openUpdateForm(index) {
    const userData = retrieveUserData();
    const user = userData[index];
    const updateForm = document.getElementById('updateForm');
    const updateTitle = document.getElementById('updateTitle');
    // Remove the line attempting to set the value of the file input
    // const updatePicture = document.getElementById('updatePicture');
    const updateDescription = document.getElementById('updateDescription');
    const updateDate = document.getElementById('updateDate');
    const updateAuthor = document.getElementById('updateAuthor');
    updateTitle.value = user.title;
    // Instead of setting the value of the file input, display the image using an <img> tag
    const updatePicturePreview = document.getElementById('updatePicturePreview');
    updatePicturePreview.src = user.picture; // Assuming 'user.picture' contains the image URL
    updateDescription.value = user.description;
    updateDate.value = user.date;
    updateAuthor.value = user.author;
    updateForm.style.display = "block";
}
  
  // Function to handle form submission for updating user details
  document.getElementById('updateForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const updateTitle = document.getElementById('updateTitle').value;
      const updatePicture = document.getElementById('updatePicture').value;
      const updateDescription = document.getElementById('updateDescription').value;
      const updateDate = document.getElementById('updateDate').value;
      const updateAuthor = document.getElementById('updateAuthor').value;
      // Retrieve stored user data
      let userData = retrieveUserData();
      // Find the index of the user to be updated
      const index = userData.findIndex(user => user.title === updateTitle);
      // Update user details if found
      if (index !== -1) {
          userData[index].picture = updatePicture;
          userData[index].description = updateDescription;
          userData[index].date = updateDate;
          userData[index].author = updateAuthor;
          // Store updated user data back to localStorage
          localStorage.setItem('blogs', JSON.stringify(userData));
          // Close the update form
          document.getElementById('updateForm').style.display = "none";
          // Refresh the table to reflect the changes
          displayUserDataInTable();
      } else {
          alert("User not found!"); // Show an alert if user not found
      }
  });
  
  // Function to delete user
  function deleteUser(index) {
      const userData = retrieveUserData();
      userData.splice(index, 1);
      localStorage.setItem('blogs', JSON.stringify(userData));
      displayUserDataInTable();
  }
  
  // Call the function to display data in the table when the page loads
  window.onload = function() {
      displayUserDataInTable();
  };