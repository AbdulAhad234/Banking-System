document
  .getElementById("showSignUpModal")
  .addEventListener("click", function () {
    var loginModal = bootstrap.Modal.getInstance(
      document.getElementById("loginModal")
    );
    var signUpModal = new bootstrap.Modal(
      document.getElementById("signUpModal")
    );
    loginModal.hide();
    signUpModal.show();
  });

// Show the login modal
document
  .getElementById("showLoginModal")
  .addEventListener("click", function () {
    var signUpModal = bootstrap.Modal.getInstance(
      document.getElementById("signUpModal")
    );
    var loginModal = new bootstrap.Modal(document.getElementById("loginModal"));
    signUpModal.hide();
    loginModal.show();
  });

  document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    
    var email = document.getElementById("loginEmail").value;
    var password = document.getElementById("loginPassword").value;
  
    if (email && password) {
      // Send login credentials to the server
      fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: email, password: password })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error("Login failed");
        }
        return response.json();
      })
      .then(data => {
        // Redirect to the dashboard page if login was successful
        window.location.href = "/UserDashboard/userDashBoard.html";
      })
      .catch(error => {
        console.error("Error logging in:", error.message);
        // Display error message to the user
        alert("Login failed. Please check your credentials and try again.");
      });
    }
  });
  

// Handle sign-up form submission
document.getElementById("signUpForm").addEventListener("submit", function (e) {
  e.preventDefault();
  // Basic validation
  var firstName = document.getElementById("signUpFirstName").value;
  var lastName = document.getElementById("signUpLastName").value;
  var email = document.getElementById("signUpEmail").value;
  var phoneNumber = document.getElementById("signUpPhoneNumber").value;
  var address = document.getElementById("signUpAddress").value;
  var password = document.getElementById("signUpPassword").value;
  var confirmPassword = document.getElementById("signUpConfirmPassword").value;

  if (
    firstName &&
    lastName &&
    email &&
    phoneNumber &&
    address &&
    password &&
    confirmPassword &&
    password === confirmPassword
  ) {
    // Simulate a successful sign-up and redirect to the dashboard page
    window.location.href = "/UserDashboard/userDashBoard.html";
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const signUpForm = document.getElementById("signUpForm");

  signUpForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Collect input values
    const firstName = document.getElementById("signUpFirstName").value;
    const lastName = document.getElementById("signUpLastName").value;
    const email = document.getElementById("signUpEmail").value;
    const phone = document.getElementById("signUpPhoneNumber").value;
    const address = document.getElementById("signUpAddress").value;
    const password = document.getElementById("signUpPassword").value;
    const confirmPassword = document.getElementById(
      "signUpConfirmPassword"
    ).value;

    // Check if passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Create customer object
    const customer = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone: phone,
      address: address,
      password: password,
    };

    // Make HTTP request to add customer
    fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customer),
    })
      .then((response) => {
        console.log(response); // Log the response
        if (!response.ok) {
          throw new Error("Failed to sign up");
        }
        return response.json();
      })
      .then((data) => {
        // Redirect to User dashboard only if sign-up is successful
        window.location.href = "/UserDashboard/userDashBoeard.html";
      })
      .catch((error) => {
        console.error("Error signing up:", error.message);
        alert("Failed to sign up. Please try again.");
      });
  });
});
