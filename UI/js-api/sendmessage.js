document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const modal = document.getElementById('myModal');
    const modalMessage = document.getElementById('modal-message');
    const closeBtn = document.getElementsByClassName('close')[0];
  
    // Function to send a message
    const sendMessage = async (name, email, message) => {
      try {
        const response = await fetch('https://api-furahax.onrender.com/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, message }),
        });
        if (response.ok) {
          modalMessage.textContent = 'Message sent successfully';
          modal.style.display = 'block';
          contactForm.reset();
        } else {
          const errorData = await response.json();
          modalMessage.textContent = `Error: ${errorData.message}`;
          modal.style.display = 'block';
        }
      } catch (error) {
        console.error('Error sending message:', error);
        modalMessage.textContent = 'An error occurred while sending the message';
        modal.style.display = 'block';
      }
    };
  
    // Function to handle form submission
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const fullName = document.getElementById('fullName').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      sendMessage(fullName, email, message);
    });
  
    // Close the modal when the close button is clicked
    if (closeBtn) {
      closeBtn.onclick = function() {
        modal.style.display = 'none';
      };
    }
  
    // Close the modal when user clicks outside the modal
    window.onclick = function(event) {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    };
  });
  