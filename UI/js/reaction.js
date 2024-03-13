
    // Initialize like count and comment count from local storage
    let likeCount = parseInt(localStorage.getItem('likeCount')) || 0;
    let commentCount = JSON.parse(localStorage.getItem('comments'))?.length || 0;
    let liked = localStorage.getItem('liked') === 'true';

    function likeBlog() {
      if (liked) {
        likeCount--;
        liked = false;
      } else {
        likeCount++;
        liked = true;
      }
      localStorage.setItem('likeCount', likeCount);
      localStorage.setItem('liked', liked);
      document.getElementById('viewCounter').textContent = likeCount;
    }

    function toggleCommentSection() {
      const commentSection = document.querySelector('.comment-form');
      if (commentSection.style.display === 'none') {
        commentSection.style.display = 'block';
      } else {
        commentSection.style.display = 'none';
      }
    }

    function addComment() {
      const commentInput = document.getElementById('commentInput');
      const comment = commentInput.value.trim();
      if (comment !== '') {
        // Get comments from localStorage
        let comments = localStorage.getItem('comments');
        if (!comments) {
          comments = [];
        } else {
          comments = JSON.parse(comments);
        }

        // Add new comment
        comments.push(comment);
        localStorage.setItem('comments', JSON.stringify(comments));

        // Increment comment count
        commentCount++;
        document.getElementById('commentCounter').textContent = commentCount;

        // Display comments
        displayComments();
      }
    }

    function displayComments() {
      const commentList = document.getElementById('commentList');
      commentList.innerHTML = ''; // Clear previous comments

      // Get comments from localStorage
      let comments = localStorage.getItem('comments');
      if (comments) {
        comments = JSON.parse(comments);
        comments.forEach(comment => {
          const li = document.createElement('li');
          li.textContent = comment;
          commentList.appendChild(li);
        });
      }
    }

    // Display existing comments on page load
    displayComments();

    // Display initial like count
    document.getElementById('viewCounter').textContent = likeCount;
    // Display initial comment count
    document.getElementById('commentCounter').textContent = commentCount;