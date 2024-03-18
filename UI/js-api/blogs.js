// JavaScript code

document.addEventListener("DOMContentLoaded", () => {
  const loadMoreButton = document.getElementById("load-more");
  let skip = 0; // Variable to track how many blogs have been loaded

  // Function to fetch blogs from the backend
  const fetchBlogs = async () => {
    try {
      const response = await fetch(`https://api-furahax.onrender.com/blogs?skip=${skip}`);
      if (!response.ok) {
        throw new Error("Failed to fetch blogs");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  // Function to render blogs on the frontend
  const renderBlogs = async () => {
    const blogsContainer = document.getElementById("blogs-container");
    const blogsData = await fetchBlogs();

    if (blogsData.length === 0) {
      loadMoreButton.style.display = "none";
      return;
    }

    blogsData.forEach((blog) => {
      const blogElement = document.createElement("div");
      blogElement.classList.add("blog");
      var title = blog.title;
      var description = blog.description;
      var date = new Date(blog.createdAt);
      description = description.substring(0, 100) + "...";
      date = date.toLocaleString();
      blogElement.innerHTML = `
                <img src="https://api-furahax.onrender.com/images/${blog.image}"
                    alt="" srcset="">
                <div class="blog-content">
                    <h6 class="content-title">${title}</h6>
                    <p>${description}</p>
                    <div class="blog-timestamp">
                    <div class="reaction">
                    <button onclick="viewBlog('${blog._id}')">View</button>
            <svg
              width="25"
              height="25"
              viewBox="0 0 41 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.3731 17.0835C12.7171 17.0835 13.9296 16.3404 14.759 15.2829C16.0476 13.6399 17.6717 12.2725 19.5281 11.2839C20.7316 10.6429 21.776 9.69063 22.2824 8.42456C22.6368 7.53866 22.8188 6.59327 22.8188 5.63913V4.5835C22.8188 3.89314 23.3785 3.3335 24.0688 3.3335C26.1399 3.3335 27.8188 5.01243 27.8188 7.0835C27.8188 9.00288 27.3862 10.8212 26.6132 12.4463C26.1706 13.3769 26.7916 14.5835 27.822 14.5835M27.822 14.5835H33.0317C34.7428 14.5835 36.2743 15.7401 36.4555 17.4416C36.5304 18.1453 36.5688 18.8599 36.5688 19.5835C36.5688 24.3295 34.9157 28.6895 32.1539 32.1189C31.5078 32.921 30.5092 33.3335 29.4792 33.3335H22.7859C21.9798 33.3335 21.179 33.2035 20.4142 32.9486L15.2235 31.2184C14.4587 30.9635 13.6579 30.8335 12.8518 30.8335H10.1592M27.822 14.5835H24.0688M10.1592 30.8335C10.2972 31.1745 10.4474 31.5092 10.6092 31.8372C10.9378 32.5031 10.4792 33.3335 9.73664 33.3335H8.22366C6.74247 33.3335 5.3687 32.4701 4.93644 31.0534C4.37232 29.2045 4.06885 27.242 4.06885 25.2085C4.06885 22.6211 4.56019 20.1484 5.45466 17.8787C5.96309 16.5885 7.2644 15.8335 8.65111 15.8335H10.4057C11.1922 15.8335 11.6477 16.76 11.2394 17.4322C9.86199 19.6998 9.06885 22.3615 9.06885 25.2085C9.06885 27.1977 9.45605 29.0964 10.1592 30.8335Z"
                stroke="#282727"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
        <h5 id="viewCounter">${blog.likesNo}</h5>
            <svg
              width="25"
              height="25"
              viewBox="0 0 41 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.3188 33.75C28.6031 33.75 35.3188 27.5939 35.3188 20C35.3188 12.4061 28.6031 6.25 20.3188 6.25C12.0346 6.25 5.31885 12.4061 5.31885 20C5.31885 23.7325 6.94125 27.1176 9.57488 29.5952C10.0274 30.0208 10.32 30.6126 10.2193 31.2256C9.99497 32.5908 9.40204 33.832 8.54517 34.8433C8.80518 34.8898 9.06885 34.9263 9.33496 34.9522C9.65845 34.9838 9.98682 35 10.3188 35C12.4555 35 14.4358 34.3298 16.0608 33.1881C17.4106 33.5538 18.8397 33.75 20.3188 33.75Z"
                stroke="#0F172A"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
        <h5 id="commentCounter">${blog.commentsNo}</h5>
      </div>
                        <p>${date}</p>
                        <p class="text-bold">By Admin</p>
                    </div>
                </div>
            `;
            // console.log(blog._id);
            // blogElement.addEventListener("click", () => {
            //     // Redirect to viewblog.html with the blog ID as a query parameter
            //     window.location.href = `view_blog.html?id=${blog._id}`;
            // });
      blogsContainer.appendChild(blogElement);
    });
   

    skip += blogsData.length;
  };
  // Function to handle click on the "View" button for a blog


  // Event listener for Load More button
  loadMoreButton.addEventListener("click", renderBlogs);

  // Initial render
  renderBlogs();
});
function viewBlog(blogId) {
    // Redirect the user to view_blog.html with the blogId parameter
    window.location.href = `view_blog.html?blogId=${blogId}`;
}
