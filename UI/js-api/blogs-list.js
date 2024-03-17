document.addEventListener('DOMContentLoaded', () => {
    // Fetch all blogs from the backend
    const baseURL = 'http://localhost:7000';
    fetch(baseURL + '/blogs')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Render the blogs in the table
            const blogTableBody = document.getElementById('blogTableBody');

            data.forEach(blog => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${blog._id}</td>
                    <td><img src="${baseURL}/images/${blog.image}" alt="${blog.title}" style="width: 100px; height: auto;"></td>
                    <td>${blog.title}</td>
                    <td>${blog.description}</td>
                    <td>${blog.commentsNo}</td>
                    <td>${blog.likesNo}</td>
                    <td>${blog.createdAt}</td>
                    
                    <td>
                        <button onclick="viewBlog('${blog._id}')">View</button>
                        <button onclick="editBlog('${blog._id}')">Edit</button>
                        <button onclick="deleteBlog('${blog._id}')">Delete</button>
                    </td>
                `;
                blogTableBody.appendChild(tr);
            });
        })
        .catch(error => {
            console.error('Error fetching blogs:', error);
        });

    // Add event listener for updateForm if it exists
    const updateForm = document.getElementById('updateForm');
    if (updateForm) {
        updateForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent the default form submission

            // Get form data
            const formData = new FormData(this);

            // Extract the blog ID from the form data
            const blogId = formData.get('blogId');

            // Send an HTTP PUT request to update the blog
            fetch(`http://localhost:7000/blogs/${blogId}`, {
                method: 'PUT',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}` // Add the user's authentication token
                }
            })
                .then(response => {
                    if (response.ok) {
                        alert('Blog updated successfully');
                        location.reload();
                        // Optionally, redirect to the blog page or update the UI
                    }
                    return response.json();
                })
                .then(data => {
                    // Handle the response from the backend
                    console.log('Blog updated:', data);
                })
                .catch(error => {
                    console.error('Error updating blog:', error);
                });
        });
    }
});

// Function to handle click on the "View" button for a blog
function viewBlog(blogId) {
    // Send an HTTP GET request to fetch the details of the blog with the specified ID
    fetch(`http://localhost:7000/blogs/${blogId}`, {
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
            const blogDetailsElement = document.getElementById('blogDetails');
            blogDetailsElement.innerHTML = `
            <p><strong>Title</strong> <br> ${data.title}</p>
            <p><strong>Description</strong> <br> ${data.description}</p>
            <p><strong>Image</strong><br> <img src="http://localhost:7000/images/${data.image}" alt="Blog Image" style="width: 100px; height: 100px;">
            </p>
            <!-- Add more details as needed -->
        `;
            // Optionally, open the modal
            const userModal = document.getElementById('userModal');
            userModal.style.display = 'block';
        })
        .catch(error => {
            console.error('Error fetching blog details:', error);
        });
}

// Close the modal when clicking on the close button
const closeButtons = document.getElementsByClassName('close');
for (const closeButton of closeButtons) {
    closeButton.addEventListener('click', function () {
        const modal = this.parentElement.parentElement;
        modal.style.display = 'none';
    });
}

// Inside the editBlog function
function editBlog(blogId) {
    console.log('Edit blog with ID:', blogId);
    // For simplicity, we'll just open the modal for now
    const updateForm = document.getElementById('updateForm');
    if (updateForm) {
        updateForm.style.display = 'block';

        // Set the value of the hidden input field for blogId
        document.getElementById('updateBlogId').value = blogId;

        const baseURL = 'http://localhost:7000'; // Define baseURL

        // You can also fetch the current data of the blog and populate the form fields
        fetch(`${baseURL}/blogs/${blogId}`, {
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
                // Populate the form fields with the data of the blog
                document.getElementById('updateTitle').value = data.title;
                document.getElementById('updateDescription').value = data.description;

                // Set the src attribute of the image field
                const imageElement = document.getElementById('updatePicturePreview');
                imageElement.src = `${baseURL}/images/${data.image}`; // Use baseURL here

                // Optionally, populate other form fields
            })
            .catch(error => {
                console.error('Error fetching blog details:', error);
            });
    }

    const closeButtons = document.getElementsByClassName('close');
    for (const closeButton of closeButtons) {
        closeButton.addEventListener('click', function () {
            const modal = this.parentElement.parentElement;
            modal.style.display = 'none';
        });
    }

}

// Function to handle click on the "Delete" button for a blog
function deleteBlog(blogId) {
    // Send an HTTP DELETE request to delete the blog with the specified ID
    fetch(`http://localhost:7000/blogs/${blogId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Add the user's authentication token
        }
    })
        .then(response => {
            if (response.ok) {
                alert('Blog deleted successfully');
                location.reload();
                // Optionally, remove the blog from the UI or update the UI
            }
        })
        .catch(error => {
            console.error('Error deleting blog:', error);
        });
}
