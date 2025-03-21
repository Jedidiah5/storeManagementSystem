/*        Login Page */
function validation(event) {
    event.preventDefault(); 

    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();
    let passwordInput = document.getElementById("password");
    let passwordError = document.getElementById("passwordError");

    // Get users from localStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Find user with case-insensitive email comparison
    let user = users.find(user => user.email.toLowerCase() === email.toLowerCase());

    if (user) {
        if (user.password === password) {
            // Store user info in session
            sessionStorage.setItem('currentUser', JSON.stringify({
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role
            }));
            
            // Redirect to dashboard
            window.location.href = "storeDashboard.html";
        } else {
            passwordInput.style.border = "2px solid red";
            passwordError.textContent = "You have entered the wrong password";
            passwordError.style.color = "red";
        }
    } else {
        alert("User not found. Please check your email or sign up.");
    }
}

// Add event listener to remove red border and error message when user starts typing
document.getElementById("password").addEventListener("input", function() {
    this.style.border = "";
    document.getElementById("passwordError").textContent = "";
});

function signup() {
    window.location.href = "signup.html";
}

// Toggle password visibility
function togglePassword() {
    let passwordField = document.getElementById("password");
    passwordField.type = passwordField.type === "password" ? "text" : "password";
}

// Initialize default admin account if it doesn't exist
document.addEventListener('DOMContentLoaded', function() {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Create default admin account if it doesn't exist
    if (!users.some(user => user.email.toLowerCase() === 'jedidiahonotu@gmail.com')) {
        const defaultUser = {
            email: 'jedidiahonotu@gmail.com',
            firstName: 'Jedidiah',
            lastName: 'Onotu',
            country: 'Nigeria',
            state: 'Lagos',
            currency: 'NGN',
            address: 'Default Address',
            phone: '+1234567890',
            password: '123456',
            role: 'admin',
            createdAt: new Date().toISOString()
        };
        
        users.push(defaultUser);
        localStorage.setItem('users', JSON.stringify(users));
        console.log('Default admin account created');
    }
});

/*                            Login end Page                       */




/*                         Sign Up Page                            */
// Initialize Select2 dropdowns
$(document).ready(function() {
  // Initialize country dropdown
  $('#country').select2({
    placeholder: 'Select a country',
    allowClear: true
  });

  // Fetch countries from API
  fetch('https://restcountries.com/v3.1/all?fields=name,subregion,region')
    .then(response => response.json())
    .then(data => {
      const countrySelect = document.getElementById('country');
      
      // Sort countries alphabetically
      data.sort((a, b) => a.name.common.localeCompare(b.name.common));
      
      // Add countries to dropdown
      data.forEach(country => {
        const option = document.createElement('option');
        option.value = country.name.common;
        option.textContent = country.name.common;
        countrySelect.appendChild(option);
      });
    })
    .catch(error => {
      console.error('Error fetching countries:', error);
      alert('Error loading countries. Please try again later.');
    });
});

function signupUser(event) {
  event.preventDefault();

  let firstName = document.getElementById("firstName").value.trim();
  let lastName = document.getElementById("lastName").value.trim();
  let country = document.getElementById("country").value.trim();
  let state = document.getElementById("state").value.trim();
  let currency = document.getElementById("currency").value.trim();
  let address = document.getElementById("address").value.trim();
  let phone = document.getElementById("phone").value.trim();
  let email = document.getElementById("email").value.trim();
  let password = document.getElementById("password").value.trim();
  let confirmPassword = document.getElementById("confirmPassword").value.trim();

  if (!firstName || !lastName || !country || !state || !currency || !address || !phone || !email || !password || !confirmPassword) {
    alert("All fields are required.");
    return;
  }

  if (password.length > 8) {
    alert("Password should not exceed 8 characters.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  // Get existing users or create an empty array
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // Check if email already exists
  if (users.some(user => user.email === email)) {
    alert("Email is already registered. Please log in.");
    return;
  }

  // Add new user to the array with all fields
  users.push({
    firstName,
    lastName,
    country,
    state,
    currency,
    address,
    phone,
    email,
    password
  });

  // Save users back to localStorage
  localStorage.setItem("users", JSON.stringify(users));

  alert("Sign-up successful! Please verify your email.");
}

// Toggle password visibility (only for the first password input)
function togglePassword() {
  let passwordField = document.getElementById("password");
  passwordField.type = passwordField.type === "password" ? "text" : "password";
}

// Simulated email verification (just an alert for now)
function verifyEmail() {
  alert("A verification email has been sent to your email address.");
}
