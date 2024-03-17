// view_blog.js

document.addEventListener('DOMContentLoaded', () => {
    // Retrieve the blogId parameter from the URL
    const params = new URLSearchParams(window.location.search);
    const blogId = params.get('blogId');

    // Fetch the details of the blog using the blogId parameter
    fetchBlogDetails(blogId);
});

// Function to fetch the details of the blog
function fetchBlogDetails(blogId) {
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
            // Display the details of the blog
            const blogDetailsElement = document.getElementById('blogDetails');
            blogDetailsElement.innerHTML = `
                <div class="blog-content-container">
                    <p class="blog-title"> ${data.title}</p>
                    <div class="blog-image"><img src="http://localhost:7000/images/${data.image}" alt="Blog Image"></div>
                    <p class="blog-description"> ${data.description}</p>
                </div>
                <div class="blog-reaction">
                <button id="likeButton" onclick="toggleLike('${blogId}')">
            <svg
              width="31"
              height="30"
              viewBox="0 0 41 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.3731 17.0835C12.7171 17.0835 13.9296 16.3404 14.759 15.2829C16.0476 13.6399 17.6717 12.2725 19.5281 11.2839C20.7316 10.6429 21.776 9.69063 22.2824 8.42456C22.6368 7.53866 22.8188 6.59327 22.8188 5.63913V4.5835C22.8188 3.89314 23.3785 3.3335 24.0688 3.3335C26.1399 3.3335 27.8188 5.01243 27.8188 7.0835C27.8188 9.00288 27.3862 10.8212 26.6132 12.4463C26.1706 13.3769 26.7916 14.5835 27.822 14.5835M27.822 14.5835H33.0317C34.7428 14.5835 36.2743 15.7401 36.4555 17.4416C36.5304 18.1453 36.5688 18.8599 36.5688 19.5835C36.5688 24.3295 34.9157 28.6895 32.1539 32.1189C31.5078 32.921 30.5092 33.3335 29.4792 33.3335H22.7859C21.9798 33.3335 21.179 33.2035 20.4142 32.9486L15.2235 31.2184C14.4587 30.9635 13.6579 30.8335 12.8518 30.8335H10.1592M27.822 14.5835H24.0688M10.1592 30.8335C10.2972 31.1745 10.4474 31.5092 10.6092 31.8372C10.9378 32.5031 10.4792 33.3335 9.73664 33.3335H8.22366C6.74247 33.3335 5.3687 32.4701 4.93644 31.0534C4.37232 29.2045 4.06885 27.242 4.06885 25.2085C4.06885 22.6211 4.56019 20.1484 5.45466 17.8787C5.96309 16.5885 7.2644 15.8335 8.65111 15.8335H10.4057C11.1922 15.8335 11.6477 16.76 11.2394 17.4322C9.86199 19.6998 9.06885 22.3615 9.06885 25.2085C9.06885 27.1977 9.45605 29.0964 10.1592 30.8335Z"
                stroke="#282727"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
        </button>
        <h4 id="viewCounter">${data.likesNo}</h4>
        <button id="commentButton" onclick="toggleCommentSection()">
            <svg
              width="31"
              height="30"
              viewBox="0 0 41 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.3188 33.75C28.6031 33.75 35.3188 27.5939 35.3188 20C35.3188 12.4061 28.6031 6.25 20.3188 6.25C12.0346 6.25 5.31885 12.4061 5.31885 20C5.31885 23.7325 6.94125 27.1176 9.57488 29.5952C10.0274 30.0208 10.32 30.6126 10.2193 31.2256C9.99497 32.5908 9.40204 33.832 8.54517 34.8433C8.80518 34.8898 9.06885 34.9263 9.33496 34.9522C9.65845 34.9838 9.98682 35 10.3188 35C12.4555 35 14.4358 34.3298 16.0608 33.1881C17.4106 33.5538 18.8397 33.75 20.3188 33.75Z"
                stroke="#0F172A"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
        </button>
        <h4 id="commentCounter">${data.commentsNo}</h4>
      
      
      </div>
     
      <div class="comment-form">
        <span>Leave Comment</span><br />
        <input type="text" id="commentInput" name="comment" /><br />
        <button onclick="addComment('${blogId}')">Submit</button>
        
      </div>
      <div class="commentList" id="commentList"></div>
      
                <!-- Add more details as needed -->
            `;
        })
        .catch(error => {
            console.error('Error fetching blog details:', error);
        });
}

// Function to handle liking and unliking a blog post
function toggleLike(blogId) {
    // Check if the user has already liked the blog post
    const likeButton = document.getElementById('likeButton');
    const isLiked = likeButton.classList.contains('liked');

    // Send request to like or unlike the blog post based on current state
    if (isLiked) {
        unlikeBlog(blogId);
    } else {
        likeBlog(blogId);
    }
}

// Function to like a blog post
function likeBlog(blogId) {
    console.log(blogId)
    fetch(`http://localhost:7000/likes/${blogId}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            likeButton.classList.add('liked'); // Add the 'liked' class to indicate the post is liked
            likeButton.style.backgroundColor = 'black'; // Change button color to black
            updateLikesCount(blogId);
        })
        .catch(error => {
            console.error('Error liking blog:', error);
        });
}

// Function to unlike a blog post
function unlikeBlog(blogId) {
    fetch(`http://localhost:7000/likes/${blogId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            likeButton.classList.remove('liked'); // Remove the 'liked' class to indicate the post is unliked
            likeButton.style.backgroundColor = ''; // Reset button color
            updateLikesCount(blogId);
        })
        .catch(error => {
            console.error('Error unliking blog:', error);
        });
}

// Function to update the likes count displayed on the page
function updateLikesCount(blogId) {
    fetch(`http://localhost:7000/likes/${blogId}`, {
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
            const likesCounter = document.getElementById('viewCounter');
            likesCounter.textContent = data.likesNumber;
        })
        .catch(error => {
            console.error('Error updating likes count:', error);
        });
}


// Function to add a comment
function addComment(blogId) {
    const commentInput = document.getElementById('commentInput');
    const text = commentInput.value.trim(); // Trim to remove leading and trailing spaces

    if (!text) {
        alert('Please enter a comment');
        return;
    }

    fetch(`http://localhost:7000/comments/${blogId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ text: text })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            commentInput.value = ''; // Clear the input field
            fetchComments(blogId); // Fetch and display all comments again
        })
        .catch(error => {
            console.error('Error adding comment:', error);
        });
}

// Function to fetch and display comments
function fetchComments(blogId) {
    fetch(`http://localhost:7000/comments/${blogId}`, {
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
        .then(comments => {
            const commentListElement = document.getElementById('commentList');
            commentListElement.innerHTML = ''; // Clear the previous comments
            comments.forEach(comment => {
                const commentItem = document.createElement('div');
                commentItem.classList.add('comment-item'); // Add a class for styling
            
                // Create a span for the username
                const usernameSpan = document.createElement('span');
                usernameSpan.textContent = `${comment.user}: `;
                usernameSpan.classList.add('username'); // Add a class for styling
                
                // Create a span for the comment text
                const commentTextSpan = document.createElement('span');
                commentTextSpan.textContent = comment.text;
                commentTextSpan.classList.add('comment-text'); // Add a class for styling
        
                // Append username span and comment text span to the comment item
                commentItem.appendChild(usernameSpan);
                commentItem.appendChild(commentTextSpan);
        
                // Append the comment item to the comment list
                commentListElement.appendChild(commentItem);
            });
        })
        .catch(error => {
            console.error('Error fetching comments:', error);
        });
}

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const blogId = params.get('blogId');
    fetchComments(blogId);
});


