const infoElement = document.getElementById('info');

// Store admin credentials directly
const adminCredentials = {
  email: "admin@example.com",
  password: "AdminPassword123"
};

// Store admin credentials in localStorage
localStorage.setItem('adminCredentials', JSON.stringify(adminCredentials));
console.log("done");

// Your existing user registration form functionality
const form = document.querySelector("form"),
  emailField = form.querySelector(".email-field"),
  emailInput = form.querySelector(".email"),
  passField = form.querySelector(".create-password"),
  passInput = form.querySelector(".password"),
  cPassField = form.querySelector(".confirm-password"),
  cPassInput = form.querySelector(".cPassword"),
  namesField = form.querySelector(".names-field"), // Select the names field
  namesInput = form.querySelector(".names"); // Select the names input

function checkNames() {
  if (namesInput.value.trim() === "") {
    namesField.classList.add("invalid");
  } else {
    namesField.classList.remove("invalid");
  }
}

function checkEmail() {
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,5}$/;
  if (!emailInput.value.match(emailPattern)) {
    emailField.classList.add("invalid");
  } else {
    emailField.classList.remove("invalid");
  }
}

function createPass() {
  const passPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passInput.value.match(passPattern)) {
    passField.classList.add("invalid");
  } else {
    passField.classList.remove("invalid");
  }
}

function confirmPass() {
  if (passInput.value !== cPassInput.value || cPassInput.value === "") {
    cPassField.classList.add("invalid");
  } else {
    cPassField.classList.remove("invalid");
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  checkNames(); // Validate names
  checkEmail();
  createPass();
  confirmPass();

  if (!namesField.classList.contains("invalid") && // Check if names field is not invalid
    !emailField.classList.contains("invalid") &&
    !passField.classList.contains("invalid") &&
    !cPassField.classList.contains("invalid")) {
    // Store data in localStorage if validation passes
    storeUserData();
  }
});

function storeUserData() {
  let userData = [];
  if (localStorage.getItem('users')) {
    userData = JSON.parse(localStorage.getItem('users'));
  }
  const newUser = {
    names: namesInput.value, // Store names value
    email: emailInput.value,
    password: passInput.value
  };
  userData.push(newUser);
  localStorage.setItem('users', JSON.stringify(userData));
  infoElement.textContent = "Registered successfully";
  window.location.href = "login.html";
}
