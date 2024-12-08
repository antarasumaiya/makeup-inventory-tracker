let inventory = [];

async function fetchProducts() {
    const response = await fetch('http://localhost:5000/api/products');
    inventory = await response.json();
    renderInventory();
}

function renderInventory() {
    const table = document.getElementById('inventoryTable');
    table.innerHTML = '';

    inventory.forEach(product => {
        const row = `
            <tr>
                <td>${product.name}</td>
                <td>${product.brand}</td>
                <td>$${product.price.toFixed(2)}</td>
                <td><input type="checkbox" data-id="${product._id}"></td>
            </tr>
        `;
        table.innerHTML += row;
    });
}

async function addProduct() {
    const name = document.getElementById('productName').value;
    const brand = document.getElementById('productBrand').value;
    const category = document.getElementById('productCategory').value;
    const quantity = document.getElementById('productQuantity').value;
    const price = document.getElementById('productPrice').value;
    const expiry = document.getElementById('productExpiry').value;

    // Validate input fields
    if (!name || !brand || !category || !quantity || !price || !expiry) {
        alert('Please fill in all fields!');
        return;
    }

    const product = { name, brand, category, quantity: parseInt(quantity), price: parseFloat(price), expiry };

    try {
        const response = await fetch('http://localhost:5000/api/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product),
        });

        if (!response.ok) {
            const error = await response.json();
            alert(`Error adding product: ${error.message}`);
            return;
        }

        alert('Product added successfully!');
        fetchProducts(); // Refresh the inventory table
    } catch (error) {
        console.error('Error adding product:', error);
        alert('Unable to add product. Please check your backend.');
    }
}


function searchProducts() {
    const searchName = document.getElementById('searchName').value.toLowerCase();
    const filtered = inventory.filter(p => p.name.toLowerCase().includes(searchName));
    inventory = filtered;
    renderInventory();
}

function generateInvoice() {
    const selected = document.querySelectorAll('input[type="checkbox"]:checked');
    let total = 0;
    let invoice = 'Invoice:\n';

    selected.forEach(item => {
        const product = inventory.find(p => p._id === item.dataset.id);
        total += product.price;
        invoice += `${product.name}: $${product.price.toFixed(2)}\n`;
    });

    invoice += `Total: $${total.toFixed(2)}`;
    alert(invoice);
}

fetchProducts();
