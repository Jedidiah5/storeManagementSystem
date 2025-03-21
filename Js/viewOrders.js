// viewOrders.js
document.addEventListener('DOMContentLoaded', function() {
    // Initialize DataTable
    const ordersTable = $('#ordersTable').DataTable({
        pageLength: 10,
        order: [[2, 'desc']], // Sort by date by default
        responsive: true,
        language: {
            search: "Search orders:",
            lengthMenu: "Show _MENU_ orders per page",
            info: "Showing _START_ to _END_ of _TOTAL_ orders",
            emptyTable: "No orders found"
        }
    });

    // Load initial order data
    loadOrders();

    // Handle status filter
    document.getElementById('statusFilter').addEventListener('change', function() {
        ordersTable.column(5).search(this.value).draw();
    });

    // Handle date filter
    document.getElementById('dateFilter').addEventListener('change', function() {
        const date = new Date(this.value).toLocaleDateString();
        ordersTable.column(2).search(date).draw();
    });

    // Function to load orders
    async function loadOrders() {
        try {
            const orders = await fetchOrders();
            populateTable(orders);
        } catch (error) {
            console.error('Error loading orders:', error);
            alert('Error loading orders. Please try again.');
        }
    }

    // Function to populate table with orders
    function populateTable(orders) {
        ordersTable.clear();

        orders.forEach(order => {
            ordersTable.row.add([
                order.id,
                `${order.customer.name}<br><small>${order.customer.email}</small>`,
                new Date(order.date).toLocaleDateString(),
                formatItems(order.items),
                formatPrice(order.total),
                createStatusBadge(order.status),
                order.paymentStatus,
                createActionButtons(order.id)
            ]);
        });

        ordersTable.draw();
    }

    // Helper function to format items
    function formatItems(items) {
        return items.map(item => 
            `${item.name} x${item.quantity}`
        ).join('<br>');
    }

    // Helper function to format price
    function formatPrice(price) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(price);
    }

    // Helper function to create status badge
    function createStatusBadge(status) {
        const statusClasses = {
            pending: 'warning',
            processing: 'info',
            shipped: 'primary',
            delivered: 'success',
            cancelled: 'danger'
        };
        return `<span class="status-badge ${statusClasses[status]}">${status}</span>`;
    }

    // Helper function to create action buttons
    function createActionButtons(orderId) {
        return `
            <div class="action-buttons">
                <button class="btn-icon" onclick="viewOrderDetails('${orderId}')" title="View Details">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn-icon" onclick="printOrder('${orderId}')" title="Print">
                    <i class="fas fa-print"></i>
                </button>
                <button class="btn-icon" onclick="emailOrder('${orderId}')" title="Email">
                    <i class="fas fa-envelope"></i>
                </button>
            </div>
        `;
    }
});

// Function to view order details
window.viewOrderDetails = async function(orderId) {
    try {
        const order = await fetchOrderDetails(orderId);
        showOrderModal(order);
    } catch (error) {
        console.error('Error fetching order details:', error);
        alert('Error fetching order details. Please try again.');
    }
};

// Function to show order details modal
function showOrderModal(order) {
    const modal = document.getElementById('orderDetailsModal');
    const modalBody = modal.querySelector('.modal-body');

    modalBody.innerHTML = `
        <div class="order-details">
            <div class="order-section">
                <h4>Order Information</h4>
                <p><strong>Order ID:</strong> ${order.id}</p>
                <p><strong>Date:</strong> ${new Date(order.date).toLocaleString()}</p>
                <p><strong>Status:</strong> ${createStatusBadge(order.status)}</p>
            </div>
            
            <div class="order-section">
                <h4>Customer Information</h4>
                <p><strong>Name:</strong> ${order.customer.name}</p>
                <p><strong>Email:</strong> ${order.customer.email}</p>
                <p><strong>Phone:</strong> ${order.customer.phone}</p>
            </div>

            <div class="order-section">
                <h4>Items</h4>
                <table class="items-table">
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${order.items.map(item => `
                            <tr>
                                <td>${item.name}</td>
                                <td>${item.quantity}</td>
                                <td>${formatPrice(item.price)}</td>
                                <td>${formatPrice(item.price * item.quantity)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>

            <div class="order-section">
                <h4>Payment Information</h4>
                <p><strong>Subtotal:</strong> ${formatPrice(order.subtotal)}</p>
                <p><strong>Tax:</strong> ${formatPrice(order.tax)}</p>
                <p><strong>Shipping:</strong> ${formatPrice(order.shipping)}</p>
                <p><strong>Total:</strong> ${formatPrice(order.total)}</p>
                <p><strong>Payment Status:</strong> ${order.paymentStatus}</p>
            </div>
        </div>
    `;

    modal.style.display = 'block';
}

// Function to close modal
window.closeModal = function() {
    document.getElementById('orderDetailsModal').style.display = 'none';
};

// Function to export orders
window.exportOrders = function(format) {
    // Implementation for exporting orders
    alert(`Exporting orders in ${format.toUpperCase()} format - Coming soon`);
};

// Mock function to fetch orders
async function fetchOrders() {
    // Simulate API call
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                {
                    id: 'ORD001',
                    customer: {
                        name: 'John Doe',
                        email: 'john@example.com'
                    },
                    date: '2025-03-20',
                    items: [
                        { name: 'Product 1', quantity: 2 }
                    ],
                    total: 199.98,
                    status: 'pending',
                    paymentStatus: 'Paid'
                },
                // Add more sample orders
            ]);
        }, 1000);
    });
}

// Mock function to fetch order details
async function fetchOrderDetails(orderId) {
    // Simulate API call
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                id: orderId,
                date: '2025-03-20',
                status: 'pending',
                customer: {
                    name: 'John Doe',
                    email: 'john@example.com',
                    phone: '+1234567890'
                },
                items: [
                    {
                        name: 'Product 1',
                        quantity: 2,
                        price: 99.99
                    }
                ],
                subtotal: 199.98,
                tax: 20.00,
                shipping: 10.00,
                total: 229.98,
                paymentStatus: 'Paid'
            });
        }, 500);
    });
}