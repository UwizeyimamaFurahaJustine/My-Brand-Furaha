document.addEventListener("DOMContentLoaded", function() {
    // Check if blogs-container element exists before proceeding
    var blogsContainer = document.getElementById("blogs-container");
    if (!blogsContainer) {
        console.error("Error: blogs-container element not found.");
        return;
    }
    var storedData = localStorage.getItem("blogs");
    if (storedData) {
        var blogsArray = JSON.parse(storedData);

        // Iterate through each blog and create HTML elements to display them
        blogsArray.forEach(function(blog) {
            var blogDiv = document.createElement("div");
            blogDiv.classList.add("blog");

            var image = document.createElement("img");
            image.src = blog.picture;
            image.alt = "";
            image.srcset = "";

            var blogContentDiv = document.createElement("div");
            blogContentDiv.classList.add("blog-content");

            var titleHeader = document.createElement("h6");
            titleHeader.classList.add("content-title");
            var titleLink = document.createElement("a");
            titleLink.href = "view_blog.html";
            titleLink.textContent = blog.title;
            titleLink.addEventListener("click", function(event) {
                localStorage.setItem("currentBlog", JSON.stringify(blog));
            });
            titleHeader.appendChild(titleLink);

            var descriptionParagraph = document.createElement("p");
            descriptionParagraph.textContent = blog.description;

            var blogTimestampDiv = document.createElement("div");
            blogTimestampDiv.classList.add("blog-timestamp");
            var dateParagraph = document.createElement("p");
            dateParagraph.textContent = blog.date;
            var authorParagraph = document.createElement("p");
            authorParagraph.classList.add("text-bold");
            authorParagraph.textContent = "By " + blog.author;

            blogTimestampDiv.appendChild(dateParagraph);
            blogTimestampDiv.appendChild(authorParagraph);

            blogContentDiv.appendChild(titleHeader);
            blogContentDiv.appendChild(descriptionParagraph);
            blogContentDiv.appendChild(blogTimestampDiv);

            blogDiv.appendChild(image);
            blogDiv.appendChild(blogContentDiv);

            blogsContainer.appendChild(blogDiv);
        });
    }
});

