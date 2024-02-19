document.addEventListener("DOMContentLoaded", function() {
    // Retrieve stored data from localStorage
    var storedData = localStorage.getItem("blogs");
    
    if (storedData) {
        var blogs = JSON.parse(storedData);
        var container = document.getElementById("blogs-container");

        // Loop through blogs and create HTML elements for each
        blogs.forEach(function(blog) {
            // Create blog element
            var blogDiv = document.createElement("div");
            blogDiv.classList.add("blog");

            // Create image element
            var img = document.createElement("img");
            img.src = blog.picture;
            img.alt = "Blog Image";
            blogDiv.appendChild(img);

            // Create blog content element
            var contentDiv = document.createElement("div");
            contentDiv.classList.add("blog-content");

            // Create title element
            var title = document.createElement("h6");
            title.classList.add("content-title");
            var titleLink = document.createElement("a");
            titleLink.href = "view_blog.html";
            titleLink.textContent = blog.title;
            title.appendChild(titleLink);
            contentDiv.appendChild(title);

            // Create description paragraph
            var description = document.createElement("p");
            description.textContent = blog.description;
            contentDiv.appendChild(description);

            // Create timestamp div
            var timestampDiv = document.createElement("div");
            timestampDiv.classList.add("blog-timestamp");

            // Create date paragraph
            var date = document.createElement("p");
            date.textContent = blog.date;
            timestampDiv.appendChild(date);

            // Create author paragraph
            var author = document.createElement("p");
            author.classList.add("text-bold");
            author.textContent = "By " + blog.author;
            timestampDiv.appendChild(author);

            // Append timestamp div to content div
            contentDiv.appendChild(timestampDiv);

            // Append content div to blog element
            blogDiv.appendChild(contentDiv);

            // Append blog element to container
            container.appendChild(blogDiv);
        });
    }
});