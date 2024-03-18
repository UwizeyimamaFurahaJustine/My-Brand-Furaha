document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const messageTable = document.getElementById('messageTable');

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
                alert('Message sent successfully');
                contactForm.reset();
                
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error sending message:', error);
            alert('An error occurred while sending the message');
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

    
});
