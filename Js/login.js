// Temporary user list for authentication
const users = [
    { email: "jedidiahonotu@gmail.com", password: "12345" },
    { email: "emanuelonotu8@gmail.com", password: "abcde" },
    { email: "user2@example.com", password: "pass123" },
    { email: "user3@example.com", password: "hello@78" },
    { email: "user4@example.com", password: "xyz98765" }
];

// Function to toggle password visibility
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const showPasswordCheckbox = document.getElementById('showPassword');
    
    passwordInput.type = showPasswordCheckbox.checked ? 'text' : 'password';
}

// Function to validate login credentials
function validateLogin(email, password) {
    // Case-insensitive email check
    return users.find(user => 
        user.email.toLowerCase() === email.toLowerCase() && 
        user.password === password
    );
}

// Function to show error state
function showError(inputElement, errorMessage) {
    inputElement.style.borderColor = '#ff3333';
    inputElement.classList.add('error');
    const errorDiv = document.getElementById('passwordError');
    errorDiv.textContent = errorMessage;
    errorDiv.style.color = '#ff3333';
}

// Function to reset error state
function resetError(inputElement) {
    inputElement.style.borderColor = '';
    inputElement.classList.remove('error');
    const errorDiv = document.getElementById('passwordError');
    errorDiv.textContent = '';
}

// Add form submit handler when document is loaded
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    // Reset error state when user starts typing
    emailInput.addEventListener('input', () => resetError(emailInput));
    passwordInput.addEventListener('input', () => resetError(passwordInput));

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Get form values
            const email = emailInput.value.trim();
            const password = passwordInput.value;
            
            // Validate credentials
            const user = validateLogin(email, password);
            
            if (user) {
                // Clear any previous error
                resetError(emailInput);
                resetError(passwordInput);
                
                // Store user email in session
                sessionStorage.setItem('currentUser', user.email);
                
                // Redirect to create store page
                window.location.href = 'createStore.html';
            } else {
                // Show error message and red borders
                showError(emailInput, 'Invalid email or password');
                showError(passwordInput, 'Invalid email or password');
            }
        });
    }
});