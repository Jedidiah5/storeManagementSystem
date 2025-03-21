// salesReport.js
document.addEventListener('DOMContentLoaded', function() {
    // Set default date range (last 30 days)
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);
    
    document.getElementById('startDate').value = startDate.toISOString().split('T')[0];
    document.getElementById('endDate').value = endDate.toISOString().split('T')[0];

    // Initialize charts
    initializeSalesTrendChart();
    initializeTopProductsChart();
    
    // Generate initial report
    generateReport();
});

// Function to generate report
window.generateReport = async function() {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;

    try {
        const data = await fetchSalesData(startDate, endDate);
        updateDashboardStats(data);
        updateCharts(data);
        populateSalesTable(data.sales);
    } catch (error) {
        console.error('Error generating report:', error);
        alert('Error generating report. Please try again.');
    }
};

// Function to initialize sales trend chart
function initializeSalesTrendChart() {
    const ctx = document.getElementById('salesTrendChart').getContext('2d');
    window.salesTrendChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Daily Sales',
                data: [],
                borderColor: '#00aaff',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: value => '$' + value
                    }
                }
            }
        }
    });
}

// Function to initialize top products chart
function initializeTopProductsChart() {
    const ctx = document.getElementById('topProductsChart').getContext('2d');
    window.topProductsChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: 'Sales Amount',
                data: [],
                backgroundColor: '#28a745'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: value => '$' + value
                    }
                }
            }
        }
    });
}

// Function to update dashboard statistics
function updateDashboardStats(data) {
    document.getElementById('totalSales').textContent = data.totalSales.toFixed(2);
    document.getElementById('totalOrders').textContent = data.totalOrders;
    document.getElementById('avgOrderValue').textContent = data.averageOrderValue.toFixed(2);
    document.getElementById('returnRate').textContent = data.returnRate.toFixed(1);
}

// Function to update charts
function updateCharts(data) {
    // Update sales trend chart
    salesTrendChart.data.labels = data.salesTrend.map(item => item.date);
    salesTrendChart.data.datasets[0].data = data.salesTrend.map(item => item.amount);
    salesTrendChart.update();

    // Update top products chart
    topProductsChart.data.labels = data.topProducts.map(item => item.name);
    topProductsChart.data.datasets[0].data = data.topProducts.map(item => item.sales);
    topProductsChart.update();
}

// Function to populate sales table
function populateSalesTable(sales) {
    const tbody = document.querySelector('#salesTable tbody');
    tbody.innerHTML = '';

    sales.forEach(sale => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${new Date(sale.date).toLocaleDateString()}</td>
            <td>${sale.orderId}</td>
            <td>${sale.customer}</td>
            <td>${sale.products}</td>
            <td>$${sale.amount.toFixed(2)}</td>
            <td><span class="status-badge ${sale.status.toLowerCase()}">${sale.status}</span></td>
        `;
        tbody.appendChild(tr);
    });
}

// Function to export report
window.exportReport = function(format) {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    alert(`Exporting ${format.toUpperCase()} report for ${startDate} to ${endDate}`);
};

// Mock function to fetch sales data
async function fetchSalesData(startDate, endDate) {
    // Simulate API call
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                totalSales: 15780.45,
                totalOrders: 127,
                averageOrderValue: 124.25,
                returnRate: 2.3,
                salesTrend: [
                    { date: '2025-03-14', amount: 520.50 },
                    { date: '2025-03-15', amount: 480.75 },
                    { date: '2025-03-16', amount: 750.25 },
                    // Add more dates...
                ],
                topProducts: [
                    { name: 'Product A', sales: 2500 },
                    { name: 'Product B', sales: 1800 },
                    { name: 'Product C', sales: 1200 },
                    // Add more products...
                ],
                sales: [
                    {
                        date: '2025-03-20',
                        orderId: '#12345',
                        customer: 'John Doe',
                        products: 'Product A, Product B',
                        amount: 245.50,
                        status: 'Completed'
                    },
                    // Add more sales...
                ]
            });
        }, 1000);
    });
}