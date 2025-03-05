$(document).ready(function () {
    fetchCheckoutItems();
});

const userId = 'df992ef6-af8d-4d4d-8f50-1214b7520dcf';

function fetchCheckoutItems() {
    $.ajax({
        url: `http://localhost:3001/api/cart?userId=${userId}`,
        method: "GET",
        success: function (cartItems) {
            fetchProductDetailsForCheckout(cartItems);
        },
        error: function (error) {
            console.error("Error fetching cart items:", error);
        }
    });
}

function fetchProductDetailsForCheckout(cartItems) {
    const productPromises = cartItems.map(item => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `http://localhost:3001/api/product/${item.product_id}`,
                method: 'GET',
                success: function (productData) {
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
        displayCheckoutItems(updatedCartItems);
        calculateTotalPrice(updatedCartItems);
    });
}

function displayCheckoutItems(cartItems) {
    const checkoutContainer = $('#checkout-items');
    checkoutContainer.empty();

    cartItems.forEach(item => {
        const itemElement = `
            <div class="checkout-item">
                <h3>${item.productName}</h3>
                <p>Price: $${item.price}</p>
                <p>Quantity: ${item.quantity}</p>
            </div>
        `;
        checkoutContainer.append(itemElement);
    });
}

function calculateTotalPrice(cartItems) {
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    $('#total-price').text(total.toFixed(2));
}

function navigateTo(page) {
    if (page === 'products') {
        window.location.href = 'products.html';
    } else if (page === 'cart') {
        window.location.href = 'cart.html';
    }
}