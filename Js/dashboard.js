document.addEventListener('DOMContentLoaded', function() {
    // Initialize Sales Chart
    const salesCtx = document.getElementById('salesChart').getContext('2d');
    new Chart(salesCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Sales',
                data: [1200, 1900, 1500, 2100, 1800, 2200],
                borderColor: '#00aaff',
                tension: 0.4,
                fill: true,
                backgroundColor: 'rgba(0,170,255,0.1)'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Initialize Products Chart
    const productsCtx = document.getElementById('productsChart').getContext('2d');
    new Chart(productsCtx, {
        type: 'doughnut',
        data: {
            labels: ['Product A', 'Product B', 'Product C', 'Product D'],
            datasets: [{
                data: [30, 25, 20, 15],
                backgroundColor: [
                    '#00aaff',
                    '#4CAF50',
                    '#FFC107',
                    '#ff4444'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });

    // Toggle Submenu
    const menuItems = document.querySelectorAll('.sidebar-nav li');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            const submenu = this.querySelector('.submenu');
            if (submenu) {
                submenu.style.display = 
                    submenu.style.display === 'block' ? 'none' : 'block';
            }
        });
    });
});// addProduct.js
document.addEventListener('DOMContentLoaded', function() {
    const addProductForm = document.getElementById('addProductForm');
    const imageInput = document.getElementById('productImages');
    const imagePreview = document.getElementById('imagePreview');

    // Handle image preview
    imageInput.addEventListener('change', function(e) {
        imagePreview.innerHTML = '';
        const files = Array.from(e.target.files);
        
        files.forEach(file => {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                const imgContainer = document.createElement('div');
                imgContainer.className = 'preview-image-container';

                reader.onload = function(e) {
                    imgContainer.innerHTML = `
                        <img src="${e.target.result}" alt="Preview">
                        <button type="button" class="remove-image"><i class="fas fa-times"></i></button>
                    `;
                };

                reader.readAsDataURL(file);
                imagePreview.appendChild(imgContainer);
            }
        });
    });

    // Handle form submission
    addProductForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Get form values
        const productData = {
            name: document.getElementById('productName').value,
            category: document.getElementById('productCategory').value,
            price: document.getElementById('productPrice').value,
            stock: document.getElementById('productStock').value,
            sku: document.getElementById('productSKU').value,
            barcode: document.getElementById('productBarcode').value,
            description: document.getElementById('productDescription').value,
            images: imageInput.files
        };

        try {
            // Here you would typically send the data to your backend
            // For now, we'll just show a success message
            await saveProduct(productData);
            
            alert('Product added successfully!');
            window.location.href = 'manageProduct.html';
        } catch (error) {
            console.error('Error adding product:', error);
            alert('Error adding product. Please try again.');
        }
    });

    // Mock function to simulate saving product to backend
    async function saveProduct(productData) {
        // Simulate API call
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Product data:', productData);
                resolve({ success: true });
            }, 1000);
        });
    }
});