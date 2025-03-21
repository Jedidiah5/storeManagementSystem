// manageProduct.js
document.addEventListener('DOMContentLoaded', function() {
    // Initialize DataTable
    const productsTable = $('#productsTable').DataTable({
        pageLength: 10,
        order: [[1, 'asc']], // Sort by name by default
        responsive: true,
        language: {
            search: "Search products:",
            lengthMenu: "Show _MENU_ products per page",
            info: "Showing _START_ to _END_ of _TOTAL_ products",
            emptyTable: "No products found"
        }
    });

    // Load initial product data
    loadProducts();

    // Handle category filter
    document.getElementById('categoryFilter').addEventListener('change', function() {
        productsTable.column(3).search(this.value).draw();
    });

    // Handle status filter
    document.getElementById('statusFilter').addEventListener('change', function() {
        productsTable.column(6).search(this.value).draw();
    });

    // Function to load products
    async function loadProducts() {
        try {
            const products = await fetchProducts();
            populateTable(products);
        } catch (error) {
            console.error('Error loading products:', error);
            alert('Error loading products. Please try again.');
        }
    }

    // Function to populate table with products
    function populateTable(products) {
        productsTable.clear();

        products.forEach(product => {
            productsTable.row.add([
                `<img src="${product.image}" alt="${product.name}" class="product-thumbnail">`,
                product.name,
                product.sku,
                product.category,
                formatPrice(product.price),
                product.stock,
                createStatusBadge(product.status),
                createActionButtons(product.id)
            ]);
        });

        productsTable.draw();
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
            active: 'success',
            inactive: 'secondary',
            outOfStock: 'danger'
        };
        return `<span class="status-badge ${statusClasses[status]}">${status}</span>`;
    }

    // Helper function to create action buttons
    function createActionButtons(productId) {
        return `
            <div class="action-buttons">
                <button class="btn-icon" onclick="editProduct('${productId}')" title="Edit">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-icon" onclick="viewProduct('${productId}')" title="View">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn-icon danger" onclick="deleteProduct('${productId}')" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
    }
});

// Function to handle bulk actions
window.applyBulkAction = function() {
    const action = document.getElementById('bulkAction').value;
    if (!action) {
        alert('Please select an action');
        return;
    }

    const selectedRows = $('#productsTable').DataTable().rows('.selected').data();
    if (selectedRows.length === 0) {
        alert('Please select at least one product');
        return;
    }

    const confirmMessage = `Are you sure you want to ${action} ${selectedRows.length} products?`;
    if (confirm(confirmMessage)) {
        // Here you would typically make an API call to perform the bulk action
        console.log(`Performing ${action} on selected products`);
        alert('Bulk action completed successfully');
        location.reload();
    }
};

// Function to edit product
window.editProduct = function(productId) {
    window.location.href = `updateProduct.html?id=${productId}`;
};

// Function to view product details
window.viewProduct = function(productId) {
    // Implement view product functionality
    alert('View product details - Coming soon');
};

// Function to delete product
window.deleteProduct = function(productId) {
    if (confirm('Are you sure you want to delete this product?')) {
        // Here you would typically make an API call to delete the product
        console.log(`Deleting product ${productId}`);
        alert('Product deleted successfully');
        location.reload();
    }
};

// Mock function to fetch products from backend
async function fetchProducts() {
    // Simulate API call
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                {
                    id: '1',
                    image: 'Images/sample-product.jpg',
                    name: 'Sample Product 1',
                    sku: 'SKU001',
                    category: 'Electronics',
                    price: 99.99,
                    stock: 50,
                    status: 'active'
                },
                {
                    id: '2',
                    image: 'Images/sample-product.jpg',
                    name: 'Sample Product 2',
                    sku: 'SKU002',
                    category: 'Clothing',
                    price: 49.99,
                    stock: 0,
                    status: 'outOfStock'
                }
                // Add more sample products as needed
            ]);
        }, 1000);
    });
}