// staffManagement.js
document.addEventListener('DOMContentLoaded', function() {
    // Initialize staff table
    loadStaffMembers();

    // Add event listeners for filters
    document.getElementById('roleFilter').addEventListener('change', filterStaff);
    document.getElementById('statusFilter').addEventListener('change', filterStaff);
    document.getElementById('searchStaff').addEventListener('input', filterStaff);

    // Add form submit handler
    document.getElementById('staffForm').addEventListener('submit', handleStaffSubmit);
});

// Function to load staff members
async function loadStaffMembers() {
    try {
        const staff = await fetchStaffMembers();
        populateStaffTable(staff);
    } catch (error) {
        console.error('Error loading staff members:', error);
        alert('Error loading staff members. Please try again.');
    }
}

// Function to populate staff table
function populateStaffTable(staffMembers) {
    const tbody = document.querySelector('#staffTable tbody');
    tbody.innerHTML = '';

    staffMembers.forEach(staff => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>
                <div class="staff-info">
                    <img src="${staff.avatar}" alt="${staff.name}" class="staff-avatar">
                    <div>
                        <strong>${staff.name}</strong>
                        <small>${staff.email}</small>
                    </div>
                </div>
            </td>
            <td><span class="role-badge ${staff.role.toLowerCase()}">${staff.role}</span></td>
            <td>${staff.department}</td>
            <td>${formatLastActive(staff.lastActive)}</td>
            <td><span class="status-badge ${staff.status.toLowerCase()}">${staff.status}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="btn-icon" onclick="editStaff('${staff.id}')" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon" onclick="resetPassword('${staff.id}')" title="Reset Password">
                        <i class="fas fa-key"></i>
                    </button>
                    <button class="btn-icon danger" onclick="deleteStaff('${staff.id}')" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Function to filter staff
function filterStaff() {
    const roleFilter = document.getElementById('roleFilter').value.toLowerCase();
    const statusFilter = document.getElementById('statusFilter').value.toLowerCase();
    const searchTerm = document.getElementById('searchStaff').value.toLowerCase();

    const rows = document.querySelectorAll('#staffTable tbody tr');
    rows.forEach(row => {
        const role = row.querySelector('.role-badge').textContent.toLowerCase();
        const status = row.querySelector('.status-badge').textContent.toLowerCase();
        const staffInfo = row.querySelector('.staff-info').textContent.toLowerCase();

        const matchesRole = !roleFilter || role === roleFilter;
        const matchesStatus = !statusFilter || status === statusFilter;
        const matchesSearch = !searchTerm || staffInfo.includes(searchTerm);

        row.style.display = matchesRole && matchesStatus && matchesSearch ? '' : 'none';
    });
}

// Function to open add staff modal
window.openAddStaffModal = function() {
    document.getElementById('modalTitle').textContent = 'Add New Staff';
    document.getElementById('staffForm').reset();
    document.getElementById('staffModal').style.display = 'block';
};

// Function to close staff modal
window.closeStaffModal = function() {
    document.getElementById('staffModal').style.display = 'none';
};

// Function to handle staff form submission
async function handleStaffSubmit(e) {
    e.preventDefault();

    const formData = {
        name: document.getElementById('staffName').value,
        email: document.getElementById('staffEmail').value,
        role: document.getElementById('staffRole').value,
        department: document.getElementById('staffDepartment').value,
        phone: document.getElementById('staffPhone').value,
        status: document.getElementById('staffStatus').value,
        permissions: Array.from(document.querySelectorAll('input[name="permissions"]:checked'))
            .map(checkbox => checkbox.value)
    };

    try {
        await saveStaffMember(formData);
        closeStaffModal();
        loadStaffMembers();
        alert('Staff member saved successfully!');
    } catch (error) {
        console.error('Error saving staff member:', error);
        alert('Error saving staff member. Please try again.');
    }
}

// Function to edit staff
window.editStaff = async function(staffId) {
    try {
        const staff = await fetchStaffMember(staffId);
        document.getElementById('modalTitle').textContent = 'Edit Staff';
        document.getElementById('staffName').value = staff.name;
        document.getElementById('staffEmail').value = staff.email;
        document.getElementById('staffRole').value = staff.role.toLowerCase();
        document.getElementById('staffDepartment').value = staff.department;
        document.getElementById('staffPhone').value = staff.phone;
        document.getElementById('staffStatus').value = staff.status.toLowerCase();

        // Set permissions
        document.querySelectorAll('input[name="permissions"]').forEach(checkbox => {
            checkbox.checked = staff.permissions.includes(checkbox.value);
        });

        document.getElementById('staffModal').style.display = 'block';
    } catch (error) {
        console.error('Error loading staff member:', error);
        alert('Error loading staff member. Please try again.');
    }
};

// Function to reset password
window.resetPassword = function(staffId) {
    if (confirm('Are you sure you want to reset this staff member\'s password?')) {
        alert('Password reset email has been sent.');
    }
};

// Function to delete staff
window.deleteStaff = function(staffId) {
    if (confirm('Are you sure you want to delete this staff member?')) {
        alert('Staff member has been deleted.');
        loadStaffMembers();
    }
};

// Helper function to format last active time
function formatLastActive(date) {
    const lastActive = new Date(date);
    const now = new Date();
    const diffMinutes = Math.floor((now - lastActive) / 1000 / 60);

    if (diffMinutes < 60) {
        return `${diffMinutes}m ago`;
    } else if (diffMinutes < 1440) {
        return `${Math.floor(diffMinutes / 60)}h ago`;
    } else {
        return lastActive.toLocaleDateString();
    }
}

// Mock function to fetch staff members
async function fetchStaffMembers() {
    // Simulate API call
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                {
                    id: '1',
                    name: 'John Smith',
                    email: 'john@example.com',
                    avatar: 'Images/default-avatar.png',
                    role: 'Admin',
                    department: 'Management',
                    lastActive: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
                    status: 'Active',
                    phone: '+1234567890',
                    permissions: ['manage_products', 'manage_orders', 'view_reports', 'manage_staff']
                },
                {
                    id: '2',
                    name: 'Sarah Johnson',
                    email: 'sarah@example.com',
                    avatar: 'Images/default-avatar.png',
                    role: 'Manager',
                    department: 'Sales',
                    lastActive: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
                    status: 'Active',
                    phone: '+1234567891',
                    permissions: ['manage_products', 'manage_orders', 'view_reports']
                }
                // Add more staff members as needed
            ]);
        }, 1000);
    });
}

// Mock function to fetch single staff member
async function fetchStaffMember(staffId) {
    // Simulate API call
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                id: staffId,
                name: 'John Smith',
                email: 'john@example.com',
                role: 'Admin',
                department: 'Management',
                phone: '+1234567890',
                status: 'Active',
                permissions: ['manage_products', 'manage_orders', 'view_reports', 'manage_staff']
            });
        }, 500);
    });
}

// Mock function to save staff member
async function saveStaffMember(formData) {
    // Simulate API call
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Saving staff member:', formData);
            resolve({ success: true });
        }, 1000);
    });
}

// Mock function to delete staff member
async function deleteStaffMember(staffId) {
    // Simulate API call
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Deleting staff member:', staffId);
            resolve({ success: true });
        }, 1000);
    });
}