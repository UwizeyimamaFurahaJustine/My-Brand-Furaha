    var blogContainer = document.getElementById("singleBlog-container");

    // Retrieve the selected blog from localStorage
    var currentBlog = localStorage.getItem("currentBlog");

    // Check if blog data exists
    if (!currentBlog) {
        console.error("Error: No blog data found in localStorage.");
        blogContainer.textContent = "No blog data available.";
    }
    try {
        var blog = JSON.parse(currentBlog);
        console.log(blog);
        // Clear previous blog content
        blogContainer.innerHTML = "";

        var imageDiv = document.createElement("div");
        imageDiv.classList.add("image");

        var title = document.createElement("h1");
        title.textContent = blog.title;

        var image = document.createElement("img");
        image.src = blog.picture;
        image.alt = "";

        imageDiv.appendChild(title);
        imageDiv.appendChild(image);

        var contentDiv = document.createElement("div");
        contentDiv.classList.add("content");

        var contentParagraph = document.createElement("p");
        contentParagraph.textContent = blog.description;

        var authorDateParagraph = document.createElement("p");
        authorDateParagraph.textContent = "By " + blog.author + " on " + blog.date;

        var stayTuneHeader = document.createElement("h2");
        stayTuneHeader.textContent = "Stay Tune!";

        contentDiv.appendChild(contentParagraph);
        contentDiv.appendChild(authorDateParagraph);
        contentDiv.appendChild(stayTuneHeader);

        blogContainer.appendChild(imageDiv);
        blogContainer.appendChild(contentDiv);
    } catch (error) {
        console.error("Error parsing blog data:", error);
        blogContainer.textContent = "Error displaying blog content.";
    }

    function likeBlog(){

    }

    // Showing like counter

    // Showing comments counter
