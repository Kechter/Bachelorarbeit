$(document).ready(function () {
    fetchProducts();
});

function fetchProducts() {
    $.ajax({
        url: "http://localhost:3001/api/products",
        method: "GET",
        success: function (products) {
            displayProducts(products);
        },
        error: function (error) {
            console.error("Error fetching products:", error);
        }
    });
}

function displayProducts(products) {
    let productList = $("#product-list");
    productList.empty();

    products.forEach(product => {
        let productItem = `
            <div class="product">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p>$${product.price}</p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
        productList.append(productItem);
    });
}

function addToCart(productId) {
    $.ajax({
        url: "http://localhost:3001/cart/add",
        method: "POST",
        data: { productId },
        success: function () {
            alert("Product added to cart!");
        },
        error: function (error) {
            console.error("Error adding to cart:", error);
        }
    });
}
