$(document).ready(function () {
    fetchCart();
});

const userId = 'df992ef6-af8d-4d4d-8f50-1214b7520dcf';

function fetchCart() {
    $.ajax({
        url: `http://localhost:3001/api/cart?userId=${userId}`,
        method: "GET",
        success: function (cartItems) {
            fetchProductDetails(cartItems);
            displayCartItems(cartItems);
        },
        error: function (error) {
            console.error("Error fetching cart items:", error);
        }
    });
}

function fetchProductDetails(cartItems) {
    const productPromises = cartItems.map(item => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `http://localhost:3001/api/product/${item.product_id}`,
                method: 'GET',
                success: function (productData) {
                    console.log('Product data:', productData);
                    const product = productData[0];
                    item.productName = product.name;
                    item.price = product.price;
                    resolve(item);
                },
                error: function (error) {
                    console.error('Error fetching product details:', error);
                    reject(error);
                }
            });
        });
    });

    Promise.all(productPromises).then(updatedCartItems => {
        console.log('Updated cart items:', updatedCartItems);
        displayCartItems(updatedCartItems);
    });
}

function displayCartItems(cartItems) {
    const cartContainer = $('#cart-items');
    cartContainer.empty();

    cartItems.forEach(item => {
        const cartItemElement = `
            <div class="cart-item">
                <h3>${item.productName}</h3>
                <p>Price: $${item.price}</p>
                <p>Quantity: ${item.quantity}</p>
            </div>
        `;
        cartContainer.append(cartItemElement);
    });
}

function navigateTo(page) {
    if (page === 'products') {
        window.location.href = 'products.html';
    } else if (page === 'checkout') {
        window.location.href = 'checkout.html';
    }
}