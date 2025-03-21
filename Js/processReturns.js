// processReturns.js
document.addEventListener('DOMContentLoaded', function() {
    const returnProcessForm = document.getElementById('returnProcessForm');
    const returnForm = document.getElementById('returnForm');

    // Handle return search
    window.searchReturn = async function() {
        const searchInput = document.getElementById('returnSearch').value;
        if (!searchInput) {
            alert('Please enter an Order ID or Return ID');
            return;
        }

        try {
            const returnRequest = await fetchReturnRequest(searchInput);
            if (returnRequest) {
                displayReturnDetails(returnRequest);
                returnForm.style.display = 'block';
            } else {
                alert('Return request not found');
            }
        } catch (error) {
            console.error('Error searching return request:', error);
            alert('Error searching return request. Please try again.');
        }
    };

    // Handle return processing form submission
    returnProcessForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const processData = {
            orderId: document.getElementById('displayOrderId').textContent,
            status: document.getElementById('returnStatus').value,
            refundAmount: document.getElementById('refundAmount').value,
            reason: document.getElementById('returnReason').value,
            notes: document.getElementById('returnNotes').value,
            restock: document.getElementById('restockItems').checked,
            notifyCustomer: document.getElementById('notifyCustomerReturn').checked
        };

        try {
            await processReturnRequest(processData);
            alert('Return processed successfully!');
            resetReturnForm();
        } catch (error) {
            console.error('Error processing return:', error);
            alert('Error processing return. Please try again.');
        }
    });

    // Function to display return details
    function displayReturnDetails(returnRequest) {
        // Display order information
        document.getElementById('displayOrderId').textContent = returnRequest.orderId;
        document.getElementById('displayOrderDate').textContent = new Date(returnRequest.orderDate).toLocaleDateString();
        document.getElementById('displayCustomer').textContent = returnRequest.customer.name;
        document.getElementById('displayReturnDate').textContent = new Date(returnRequest.returnDate).toLocaleDateString();

        // Display return items
        const returnItemsContainer = document.getElementById('returnItems');
        returnItemsContainer.innerHTML = returnRequest.items.map(item => `
            <div class="return-item">
                <div class="item-details">
                    <div class="item-image">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="item-info">
                        <h4>${item.name}</h4>
                        <p>Quantity: ${item.quantity}</p>
                        <p>Price: ${formatPrice(item.price)}</p>
                        <p>Return Reason: ${item.returnReason}</p>
                    </div>
                </div>
                <div class="item-condition">
                    <label>Item Condition:</label>
                    <select class="formInput item-condition-select" data-item-id="${item.id}">
                        <option value="new">Like New</option>
                        <option value="good">Good</option>
                        <option value="damaged">Damaged</option>
                        <option value="unsellable">Unsellable</option>
                    </select>
                </div>
            </div>
        `).join('');

        // Set initial refund amount
        document.getElementById('refundAmount').value = returnRequest.items.reduce((total, item) => 
            total + (item.price * item.quantity), 0).toFixed(2);
    }

    // Function to reset the form
    window.resetReturnForm = function() {
        returnProcessForm.reset();
        returnForm.style.display = 'none';
        document.getElementById('returnSearch').value = '';
    };

    // Helper function to format price
    function formatPrice(price) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(price);
    }
});

// Mock function to fetch return request
async function fetchReturnRequest(searchTerm) {
    // Simulate API call
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                orderId: 'ORD001',
                returnId: 'RET001',
                orderDate: '2025-03-15',
                returnDate: '2025-03-20',
                customer: {
                    name: 'John Doe',
                    email: 'john@example.com'
                },
                items: [
                    {
                        id: 1,
                        name: 'Product 1',
                        quantity: 1,
                        price: 99.99,
                        image: 'Images/products/product1.jpg',
                        returnReason: 'Size too small'
                    },
                    {
                        id: 2,
                        name: 'Product 2',
                        quantity: 2,
                        price: 49.99,
                        image: 'Images/products/product2.jpg',
                        returnReason: 'Defective'
                    }
                ]
            });
        }, 1000);
    });
}

// Mock function to process return request
async function processReturnRequest(processData) {
    // Simulate API call
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Return processing data:', processData);
            resolve({ success: true });
        }, 1000);
    });
}// processReturns.js
document.addEventListener('DOMContentLoaded', function() {
    const returnProcessForm = document.getElementById('returnProcessForm');
    const returnForm = document.getElementById('returnForm');

    // Handle return search
    window.searchReturn = async function() {
        const searchInput = document.getElementById('returnSearch').value;
        if (!searchInput) {
            alert('Please enter an Order ID or Return ID');
            return;
        }

        try {
            const returnRequest = await fetchReturnRequest(searchInput);
            if (returnRequest) {
                displayReturnDetails(returnRequest);
                returnForm.style.display = 'block';
            } else {
                alert('Return request not found');
            }
        } catch (error) {
            console.error('Error searching return request:', error);
            alert('Error searching return request. Please try again.');
        }
    };

    // Handle return processing form submission
    returnProcessForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const processData = {
            orderId: document.getElementById('displayOrderId').textContent,
            status: document.getElementById('returnStatus').value,
            refundAmount: document.getElementById('refundAmount').value,
            reason: document.getElementById('returnReason').value,
            notes: document.getElementById('returnNotes').value,
            restock: document.getElementById('restockItems').checked,
            notifyCustomer: document.getElementById('notifyCustomerReturn').checked
        };

        try {
            await processReturnRequest(processData);
            alert('Return processed successfully!');
            resetReturnForm();
        } catch (error) {
            console.error('Error processing return:', error);
            alert('Error processing return. Please try again.');
        }
    });

    // Function to display return details
    function displayReturnDetails(returnRequest) {
        // Display order information
        document.getElementById('displayOrderId').textContent = returnRequest.orderId;
        document.getElementById('displayOrderDate').textContent = new Date(returnRequest.orderDate).toLocaleDateString();
        document.getElementById('displayCustomer').textContent = returnRequest.customer.name;
        document.getElementById('displayReturnDate').textContent = new Date(returnRequest.returnDate).toLocaleDateString();

        // Display return items
        const returnItemsContainer = document.getElementById('returnItems');
        returnItemsContainer.innerHTML = returnRequest.items.map(item => `
            <div class="return-item">
                <div class="item-details">
                    <div class="item-image">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="item-info">
                        <h4>${item.name}</h4>
                        <p>Quantity: ${item.quantity}</p>
                        <p>Price: ${formatPrice(item.price)}</p>
                        <p>Return Reason: ${item.returnReason}</p>
                    </div>
                </div>
                <div class="item-condition">
                    <label>Item Condition:</label>
                    <select class="formInput item-condition-select" data-item-id="${item.id}">
                        <option value="new">Like New</option>
                        <option value="good">Good</option>
                        <option value="damaged">Damaged</option>
                        <option value="unsellable">Unsellable</option>
                    </select>
                </div>
            </div>
        `).join('');

        // Set initial refund amount
        document.getElementById('refundAmount').value = returnRequest.items.reduce((total, item) => 
            total + (item.price * item.quantity), 0).toFixed(2);
    }

    // Function to reset the form
    window.resetReturnForm = function() {
        returnProcessForm.reset();
        returnForm.style.display = 'none';
        document.getElementById('returnSearch').value = '';
    };

    // Helper function to format price
    function formatPrice(price) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(price);
    }
});

// Mock function to fetch return request
async function fetchReturnRequest(searchTerm) {
    // Simulate API call
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                orderId: 'ORD001',
                returnId: 'RET001',
                orderDate: '2025-03-15',
                returnDate: '2025-03-20',
                customer: {
                    name: 'John Doe',
                    email: 'john@example.com'
                },
                items: [
                    {
                        id: 1,
                        name: 'Product 1',
                        quantity: 1,
                        price: 99.99,
                        image: 'Images/products/product1.jpg',
                        returnReason: 'Size too small'
                    },
                    {
                        id: 2,
                        name: 'Product 2',
                        quantity: 2,
                        price: 49.99,
                        image: 'Images/products/product2.jpg',
                        returnReason: 'Defective'
                    }
                ]
            });
        }, 1000);
    });
}

// Mock function to process return request
async function processReturnRequest(processData) {
    // Simulate API call
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Return processing data:', processData);
            resolve({ success: true });
        }, 1000);
    });
}