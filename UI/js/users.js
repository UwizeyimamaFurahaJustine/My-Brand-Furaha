const form = document.querySelector("form"),
namesField = form.querySelector(".names-field"),
namesInput = form.querySelector(".names"),
  emailField = form.querySelector(".email-field"),
  emailInput = form.querySelector(".email"),
  passField = form.querySelector(".create-password"),
  passInput = form.querySelector(".password"),
  cPassField = form.querySelector(".confirm-password"),
  cPassInput = form.querySelector(".cPassword"),
  infoElement = document.getElementById('info');


  // Retrieve stored data from localStorage
function retrieveUserData() {
    let userData = [];
    if (localStorage.getItem('users')) {
      userData = JSON.parse(localStorage.getItem('users'));
    }
    return userData;
  }
  
  // Generate HTML table rows based on the retrieved data
  function generateTableRows(userData) {
    let rows = '';
    userData.forEach((user, index) => {
      rows += `
        <tr>
          <td>${index + 1}</td>
          <td>${user.names}</td>
          <td>${user.email}</td>
          <td>${user.password}</td>
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
  
  // Display retrieved data in a table
  function displayUserDataInTable() {
    const userData = retrieveUserData();
    const tableBody = document.getElementById('userDataBody');
    if (userData.length > 0) {
      const tableRows = generateTableRows(userData);
      tableBody.innerHTML = tableRows;
    } else {
      tableBody.innerHTML = '<tr><td colspan="5">No data available</td></tr>';
    }
  }
  
  // Function to view user details in a modal
  function viewUser(index) {
    const userData = retrieveUserData();
    const user = userData[index];
    const modal = document.getElementById('userModal');
    const userDetails = document.getElementById('userDetails');
    userDetails.innerHTML = `<strong>Names:</strong> ${user.names}<br><strong>Email:</strong> ${user.email}<br><strong>Password:</strong> ${user.password}`;
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
    const updateNames = document.getElementById('updateNames');
    const updateEmail = document.getElementById('updateEmail');
    const updatePassword = document.getElementById('updatePassword');
    updateNames.value = user.names;
    updateEmail.value = user.email;
    updatePassword.value = user.password;
    updateForm.style.display = "block";

    
  }
  
  // Function to handle form submission for updating user details
document.getElementById('updateForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const updateNames = document.getElementById('updateNames').value;
  const updateEmail = document.getElementById('updateEmail').value;
  const updatePassword = document.getElementById('updatePassword').value;
  // Retrieve stored user data
  let userData = retrieveUserData();
  // Find the index of the user to be updated
  const index = userData.findIndex(user => user.email === updateEmail);
  // Update user details
  userData[index].names = updateNames;
  userData[index].password = updatePassword;
  // Store updated user data back to localStorage
  localStorage.setItem('users', JSON.stringify(userData));
  // Close the update form
  document.getElementById('updateForm').style.display = "none";
  // Refresh the table to reflect the changes
  displayUserDataInTable();
});
  
  // Function to delete user
  function deleteUser(index) {
    const userData = retrieveUserData();
    userData.splice(index, 1);
    localStorage.setItem('users', JSON.stringify(userData));
    displayUserDataInTable();
  }
  
  // Call the function to display data in the table when the page loads
  window.onload = function() {
    displayUserDataInTable();
  };
  