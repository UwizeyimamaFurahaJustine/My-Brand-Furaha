function getCurrentDate() {
    var now = new Date();
    var year = now.getFullYear();
    var month = (now.getMonth() + 1).toString().padStart(2, '0');
    var day = now.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}

document.addEventListener("DOMContentLoaded", function() {
    // Set the value of the date input field to the current date
    document.getElementById('date').value = getCurrentDate();
});

function validateForm() {
    var title = document.getElementById("title").value;
    var pictureInput = document.getElementById("picture");
    var description = document.getElementById("description").value;
    var date = document.getElementById("date").value;
    var author = document.getElementById("author").value;
    var isValid = true;

    // Reset errors
    document.getElementById("titleError").innerHTML = "";
    document.getElementById("pictureError").innerHTML = "";
    document.getElementById("descriptionError").innerHTML = "";
    document.getElementById("dateError").innerHTML = "";
    document.getElementById("authorError").innerHTML = "";

    // Validate title
    if (!title) {
        document.getElementById("titleError").innerHTML = "Title is required";
        isValid = false;
    }

    // Validate picture
    var picture = pictureInput.files[0];
    if (!picture) {
        document.getElementById("pictureError").innerHTML = "Picture is required";
        isValid = false;
    }

    // Validate description
    if (!description) {
        document.getElementById("descriptionError").innerHTML = "Description is required";
        isValid = false;
    }

    // Validate author
    if (!author) {
        document.getElementById("authorError").innerHTML = "Author is required";
        isValid = false;
    }

    if (isValid) {
        var reader = new FileReader();
        reader.onload = function(event) {
            // Create object to store data
            var blogs = {
                title: title,
                picture: event.target.result, // Store picture as base64 string
                description: description,
                date: date,
                author: author
            };

            // Check if data already exists in localStorage
            var storedData = localStorage.getItem("blogs");
            var dataArray = [];
            if (storedData) {
                dataArray = JSON.parse(storedData);
            }

            // Add new data to array
            dataArray.push(blogs);

            // Store data in localStorage
            localStorage.setItem("blogs", JSON.stringify(dataArray));

            // Reset form
            document.getElementById("myForm").reset();
        };
        reader.readAsDataURL(picture);
    }
}