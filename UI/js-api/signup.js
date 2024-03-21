document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('myModal');
    const modalMessage = document.getElementById('modal-message');
    const closeBtn = document.getElementsByClassName('close')[0];
  
    // Function to show modal
    const showModal = (message) => {
      modalMessage.textContent = message;
      modal.style.display = 'block';
    };
  
    // Function to hide modal
    const hideModal = () => {
      modal.style.display = 'none';
    };
  
    // Function to handle user signup
    const signupUser = async (userData) => {
      try {
        const response = await fetch(`https://api-furahax.onrender.com/auth/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData)
        });
  
        if (response.ok) {
          showModal('User Register successfully');
          signupForm.reset();
        } else {
          const errorData = await response.json();
          showModal(`Error: ${errorData.message}`);
        }
      } catch (error) {
        console.error('Error signing up:', error);
        showModal('An error occurred while signing up');
      }
    };
  
    // Event listener for signup form submission
    document.getElementById('signupForm').addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const username = document.getElementById('username').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const userData = { username, email, password };
  
      try {
        console.log('Attempting signup...');
        await signupUser(userData);
      } catch (error) {
        console.error('Error during signup:', error);
      }
    });
  
    // Close the modal when the close button is clicked
    closeBtn.onclick = hideModal;
  
    // Close the modal when the user clicks outside the modal
    window.onclick = function(event) {
      if (event.target === modal) {
        hideModal();
      }
    };
  });
  