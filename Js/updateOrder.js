// updateOrder.js
document.addEventListener('DOMContentLoaded', function() {
    const statusUpdateForm = document.getElementById('statusUpdateForm');
    const orderUpdateForm = document.getElementById('orderUpdateForm');

    // Handle order search
    window.searchOrder = async function() {
        const searchInput = document.getElementById('orderSearch').value;
        if (!searchInput) {
            alert('Please enter an Order ID or Customer Email');
            return;
        }

        try {
            const order = await fetchOrder(searchInput);
            if (order) {
                displayOrderDetails(order);
                orderUpdateForm.style.display = 'block';
            } else {
                alert('Order not found');
            }
        } catch (error) {
            console.error('Error searching order:', error);
            alert('Error searching order. Please try again.');
        }
    };

    // Handle status update form submission
    statusUpdateForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const updateData = {
            orderId: document.getElementById('displayOrderId').textContent,
            newStatus: document.getElementById('newStatus').value,
            trackingNumber: document.getElementById('trackingNumber').value,
            notes: document.getElementById('statusNotes').value,
            notifyCustomer: document.getElementById('notifyCustomer').checked
        };

        try {
            await updateOrderStatus(updateData);
            alert('Order status updated successfully!');
            resetForm();
        } catch (error) {
            console.error('Error updating order status:', error);
            alert('Error updating order status. Please try again.');
        }
    });

    // Function to display order details
    function displayOrderDetails(order) {
        document.getElementById('displayOrderId').textContent = order.id;
        document.getElementById('displayOrderDate').textContent = new Date(order.date).toLocaleDateString();
        document.getElementById('displayCustomer').textContent = order.customer.name;
        document.getElementById('displayAmount').textContent = formatPrice(order.total);

        // Update status timeline
        updateStatusTimeline(order.statusHistory);
    }

    // Function to update status timeline
    function updateStatusTimeline(statusHistory) {
        const timeline = document.getElementById('statusTimeline');
        timeline.innerHTML = '';

        statusHistory.forEach((status, index) => {
            const timelineItem = document.createElement('div');
            timelineItem.className = `timeline-item ${index === statusHistory.length - 1 ? 'current' : ''}`;
            
            timelineItem.innerHTML = `
                <div class="timeline-marker"></div>
                <div class="timeline-content">
                    <h4>${status.status}</h4>
                    <p>${new Date(status.date).toLocaleString()}</p>
                    ${status.notes ? `<p class="notes">${status.notes}</p>` : ''}
                </div>
            `;

            timeline.appendChild(timelineItem);
        });
    }

    // Function to reset the form
    window.resetForm = function() {
        statusUpdateForm.reset();
        orderUpdateForm.style.display = 'none';
        document.getElementById('orderSearch').value = '';
    };

    // Helper function to format price
    function formatPrice(price) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(price);
    }
});

// Mock function to fetch order
async function fetchOrder(searchTerm) {
    // Simulate API call
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                id: 'ORD001',
                date: '2025-03-20',
                customer: {
                    name: 'John Doe',
                    email: 'john@example.com'
                },
                total: 229.98,
                statusHistory: [
                    {
                        status: 'Pending',
                        date: '2025-03-20T10:00:00',
                        notes: 'Order placed'
                    },
                    {
                        status: 'Processing',
                        date: '2025-03-20T10:15:00',
                        notes: 'Payment confirmed'
                    }
                ]
            });
        }, 1000);
    });
}

// Mock function to update order status
async function updateOrderStatus(updateData) {
    // Simulate API call
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Status update data:', updateData);
            resolve({ success: true });
        }, 1000);
    });
}