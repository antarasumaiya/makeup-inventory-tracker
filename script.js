// Inventory list and functions
let inventory = [];

// Add item to inventory and refresh filters
document.getElementById("addForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const brand = document.getElementById("brand").value;
    const category = document.getElementById("category").value;
    const quantity = document.getElementById("quantity").value;
    const expiry = document.getElementById("expiry").value;

    addItemToInventory(name, brand, category, quantity, expiry);
    updateFilterOptions();
    document.getElementById("addForm").reset();
});

function addItemToInventory(name, brand, category, quantity, expiry) {
    const newItem = { id: Date.now(), name, brand, category, quantity, expiry };
    inventory.push(newItem);
    renderInventory();
}

function renderInventory(filterName = "", filterCategory = "", filterBrand = "") {
    const table = document.getElementById("inventoryTable");
    table.innerHTML = "";

    inventory.filter(item => {
        return (!filterName || item.name.toLowerCase().includes(filterName.toLowerCase())) &&
               (!filterCategory || item.category === filterCategory) &&
               (!filterBrand || item.brand === filterBrand);
    }).forEach(item => {
        const row = table.insertRow();
        row.insertCell(0).textContent = item.name;
        row.insertCell(1).textContent = item.brand;
        row.insertCell(2).textContent = item.category;
        row.insertCell(3).textContent = item.quantity;
        row.insertCell(4).textContent = item.expiry;

        const deleteCell = row.insertCell(5);
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = () => deleteItem(item.id);
        deleteCell.appendChild(deleteButton);
    });
}

function deleteItem(id) {
    inventory = inventory.filter(item => item.id !== id);
    renderInventory();
}

// Update filter options
function updateFilterOptions() {
    const categories = [...new Set(inventory.map(item => item.category))];
    const brands = [...new Set(inventory.map(item => item.brand))];

    const categorySelect = document.getElementById("filterCategory");
    const brandSelect = document.getElementById("filterBrand");

    categorySelect.innerHTML = `<option value="">Filter by Category</option>`;
    categories.forEach(category => {
        categorySelect.innerHTML += `<option value="${category}">${category}</option>`;
    });

    brandSelect.innerHTML = `<option value="">Filter by Brand</option>`;
    brands.forEach(brand => {
        brandSelect.innerHTML += `<option value="${brand}">${brand}</option>`;
    });
}

// Search and filter
document.getElementById("search").addEventListener("input", function() {
    const filterName = document.getElementById("search").value;
    const filterCategory = document.getElementById("filterCategory").value;
    const filterBrand = document.getElementById("filterBrand").value;
    renderInventory(filterName, filterCategory, filterBrand);
});

document.getElementById("filterCategory").addEventListener("change", function() {
    const filterName = document.getElementById("search").value;
    const filterCategory = document.getElementById("filterCategory").value;
    const filterBrand = document.getElementById("filterBrand").value;
    renderInventory(filterName, filterCategory, filterBrand);
});

document.getElementById("filterBrand").addEventListener("change", function() {
    const filterName = document.getElementById("search").value;
    const filterCategory = document.getElementById("filterCategory").value;
    const filterBrand = document.getElementById("filterBrand").value;
    renderInventory(filterName, filterCategory, filterBrand);
});