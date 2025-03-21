// updateProduct.js
document.addEventListener('DOMContentLoaded', function() {
    const updateProductForm = document.getElementById('updateProductForm');
    const imageInput = document.getElementById('productImages');
    const imagePreview = document.getElementById('imagePreview');
    const currentImages = document.getElementById('currentImages');
    let currentProduct = null;

    // Function to search for a product
    window.searchProduct = async function() {
        const searchInput = document.getElementById('productSearch').value;
        if (!searchInput) {
            alert('Please enter a product name or SKU');
            return;
        }

        try {
            // Simulate API call to fetch product
            const product = await fetchProduct(searchInput);
            if (product) {
                loadProductData(product);
                updateProductForm.style.display = 'block';
            } else {
                alert('Product not found');
            }
        } catch (error) {
            console.error('Error searching product:', error);
            alert('Error searching product. Please try again.');
        }
    };

    // Handle image preview for new images
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
    updateProductForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Get form values
        const productData = {
            id: currentProduct.id,
            name: document.getElementById('productName').value,
            category: document.getElementById('productCategory').value,
            price: document.getElementById('productPrice').value,
            stock: document.getElementById('productStock').value,
            sku: document.getElementById('productSKU').value,
            status: document.getElementById('productStatus').value,
            description: document.getElementById('productDescription').value,
            newImages: imageInput.files
        };

        try {
            await updateProduct(productData);
            alert('Product updated successfully!');
            window.location.href = 'manageProduct.html';
        } catch (error) {
            console.error('Error updating product:', error);
            alert('Error updating product. Please try again.');
        }
    });

    // Function to load product data into form
    function loadProductData(product) {
        currentProduct = product;
        document.getElementById('productName').value = product.name;
        document.getElementById('productCategory').value = product.category;
        document.getElementById('productPrice').value = product.price;
        document.getElementById('productStock').value = product.stock;
        document.getElementById('productSKU').value = product.sku;
        document.getElementById('productStatus').value = product.status;
        document.getElementById('productDescription').value = product.description;

        // Load current images
        currentImages.innerHTML = '';
        product.images.forEach(imageUrl => {
            const imgContainer = document.createElement('div');
            imgContainer.className = 'preview-image-container';
            imgContainer.innerHTML = `
                <img src="${imageUrl}" alt="Product Image">
                <button type="button" class="remove-image" onclick="removeProductImage('${imageUrl}')">
                    <i class="fas fa-times"></i>
                </button>
            `;
            currentImages.appendChild(imgContainer);
        });
    }

    // Mock function to simulate fetching product from backend
    async function fetchProduct(searchTerm) {
        // Simulate API call
        return new Promise((resolve) => {
            setTimeout(() => {
                // Mock product data
                resolve({
                    id: '123',
                    name: 'Sample Product',
                    category: 'electronics',
                    price: '99.99',
                    stock: '50',
                    sku: 'SKU123',
                    status: 'active',
                    description: 'Sample product description',
                    images: ['Images/sample-product.jpg']
                });
            }, 1000);
        });
    }

    // Mock function to simulate updating product in backend
    async function updateProduct(productData) {
        // Simulate API call
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Updated product data:', productData);
                resolve({ success: true });
            }, 1000);
        });
    }

    // Function to handle product deletion
    window.confirmDelete = function() {
        if (confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
            deleteProduct(currentProduct.id);
        }
    };

    // Mock function to simulate deleting product
    async function deleteProduct(productId) {
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            alert('Product deleted successfully!');
            window.location.href = 'manageProduct.html';
        } catch (error) {
            console.error('Error deleting product:', error);
            alert('Error deleting product. Please try again.');
        }
    }
});