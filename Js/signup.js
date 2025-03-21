// Initialize Select2 and fetch countries when document is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Select2 for country dropdown
    $('#country').select2({
        placeholder: 'Select your country',
        allowClear: true
    });

    // Fetch countries from REST Countries API
    fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(data => {
            const countries = data.map(country => ({
                id: country.cca2,
                text: country.name.common
            })).sort((a, b) => a.text.localeCompare(b.text));

            $('#country').empty().select2({
                data: countries,
                placeholder: 'Select your country',
                allowClear: true
            });
        })
        .catch(error => {
            console.error('Error fetching countries:', error);
        });

    // Add form submit handler
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', registerUser);
    }

    // Add password validation on input
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    if (password && confirmPassword) {
        password.addEventListener('input', validatePasswords);
        confirmPassword.addEventListener('input', validatePasswords);
    }

    // Create default admin account
    createDefaultAccount();
});

// Function to create default admin account
function createDefaultAccount() {
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

    let users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Only add if the account doesn't exist
    if (!users.some(user => user.email === defaultUser.email)) {
        users.push(defaultUser);
        localStorage.setItem('users', JSON.stringify(users));
        console.log('Default admin account created');
    }
}

// Function to toggle password visibility
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const showPasswordCheckbox = document.getElementById('showPassword');
    
    const type = showPasswordCheckbox.checked ? 'text' : 'password';
    passwordInput.type = type;
    confirmPasswordInput.type = type;
}

// Function to validate password match
function validatePasswords() {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const passwordError = document.getElementById('passwordError');
    
    if (password !== confirmPassword) {
        passwordError.textContent = 'Passwords do not match';
        return false;
    }
    
    passwordError.textContent = '';
    return true;
}

// Function to validate email format
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Function to validate phone number
function validatePhone(phone) {
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    return phoneRegex.test(phone);
}

// Function to register user
function registerUser(event) {
    event.preventDefault();
    
    // Get form values
    const email = document.getElementById('email').value.trim();
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const country = $('#country').select2('data')[0]?.text || '';
    const state = document.getElementById('state').value.trim();
    const currency = document.getElementById('currency').value;
    const address = document.getElementById('address').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const password = document.getElementById('password').value;
    
    // Validate inputs
    if (!firstName || !lastName) {
        alert('Please enter your full name');
        return;
    }
    
    if (!validateEmail(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    if (!validatePhone(phone)) {
        alert('Please enter a valid phone number');
        return;
    }
    
    if (!country || !state || !currency || !address) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Validate passwords
    if (!validatePasswords()) {
        return;
    }
    
    // Create user object
    const user = {
        email,
        firstName,
        lastName,
        country,
        state,
        currency,
        address,
        phone,
        password,
        role: 'user',
        createdAt: new Date().toISOString()
    };
    
    // Get existing users or initialize empty array
    let users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Check if email already exists
    if (users.some(u => u.email === email)) {
        alert('Email already registered. Please use a different email.');
        return;
    }
    
    // Add new user
    users.push(user);
    
    // Save to localStorage
    localStorage.setItem('users', JSON.stringify(users));
    
    // Show success message
    alert('Account created successfully!');
    
    // Redirect to login page
    window.location.href = 'loginpage.html';
}