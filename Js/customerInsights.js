// customerInsights.js
document.addEventListener('DOMContentLoaded', function() {
    // Initialize charts
    initializePurchaseFrequencyChart();
    initializeRetentionChart();
    
    // Load initial data
    loadCustomerInsights();
});

// Function to load customer insights
async function loadCustomerInsights() {
    try {
        const data = await fetchCustomerData();
        updateDashboardStats(data);
        updateCharts(data);
        populateTopCustomersTable(data.topCustomers);
    } catch (error) {
        console.error('Error loading customer insights:', error);
        alert('Error loading customer insights. Please try again.');
    }
}

// Function to initialize purchase frequency chart
function initializePurchaseFrequencyChart() {
    const ctx = document.getElementById('purchaseFrequencyChart').getContext('2d');
    window.purchaseFrequencyChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['1x', '2-3x', '4-5x', '6-10x', '10+'],
            datasets: [{
                label: 'Number of Customers',
                data: [120, 85, 45, 30, 15],
                backgroundColor: '#00aaff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Number of Customers'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Purchase Frequency'
                    }
                }
            }
        }
    });
}

// Function to initialize retention chart
function initializeRetentionChart() {
    const ctx = document.getElementById('retentionChart').getContext('2d');
    window.retentionChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6'],
            datasets: [{
                label: 'Customer Retention Rate',
                data: [100, 85, 75, 68, 62, 60],
                borderColor: '#28a745',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Retention Rate (%)'
                    }
                }
            }
        }
    });
}

// Function to update dashboard statistics
function updateDashboardStats(data) {
    document.getElementById('totalCustomers').textContent = data.totalCustomers;
    document.getElementById('activeCustomers').textContent = data.activeCustomers;
    document.getElementById('customerLTV').textContent = data.averageLTV.toFixed(2);
    document.getElementById('churnRate').textContent = data.churnRate.toFixed(1);
}

// Function to populate top customers table
function populateTopCustomersTable(customers) {
    const tbody = document.querySelector('#topCustomersTable tbody');
    tbody.innerHTML = '';

    customers.forEach(customer => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>
                <div class="customer-info">
                    <img src="${customer.avatar}" alt="${customer.name}" class="customer-avatar">
                    <div>
                        <strong>${customer.name}</strong>
                        <small>${customer.email}</small>
                    </div>
                </div>
            </td>
            <td>${customer.totalOrders}</td>
            <td>$${customer.totalSpent.toFixed(2)}</td>
            <td>${new Date(customer.lastPurchase).toLocaleDateString()}</td>
            <td><span class="status-badge ${customer.status.toLowerCase()}">${customer.status}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="btn-icon" onclick="viewCustomerDetails('${customer.id}')" title="View Details">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn-icon" onclick="emailCustomer('${customer.id}')" title="Send Email">
                        <i class="fas fa-envelope"></i>
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Function to view customer details
window.viewCustomerDetails = function(customerId) {
    alert(`Viewing details for customer ${customerId}`);
};

// Function to email customer
window.emailCustomer = function(customerId) {
    alert(`Composing email for customer ${customerId}`);
};

// Mock function to fetch customer data
async function fetchCustomerData() {
    // Simulate API call
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                totalCustomers: 696,
                activeCustomers: 524,
                averageLTV: 450.75,
                churnRate: 5.2,
                topCustomers: [
                    {
                        id: '1',
                        name: 'John Doe',
                        email: 'john@example.com',
                        avatar: 'Images/default-avatar.png',
                        totalOrders: 25,
                        totalSpent: 2850.50,
                        lastPurchase: '2025-03-18',
                        status: 'VIP'
                    },
                    {
                        id: '2',
                        name: 'Jane Smith',
                        email: 'jane@example.com',
                        avatar: 'Images/default-avatar.png',
                        totalOrders: 18,
                        totalSpent: 1950.75,
                        lastPurchase: '2025-03-15',
                        status: 'Regular'
                    }
                    // Add more customers as needed
                ]
            });
        }, 1000);
    });
}