function fetchCheckoutItems() {
    $.ajax({
        url: `http://localhost:3001/api/cart?userId=${getUserId()}`,
        method: "GET",
        success: function (cartItems) {
            fetchProductDetailsForCheckout(cartItems);
        }
    });
}

function fetchProductDetailsForCheckout(cartItems) {
    const productPromises = cartItems.map(item => 
        $.ajax({
            url: `http://localhost:3001/api/product/${item.product_id}`,
            method: "GET"
        })
    );

    Promise.all(productPromises).then(displayCheckoutItems);
}

function displayCheckoutItems(cartItems) {
    cartItems.forEach(item => {
        $("#checkout-items").append(`<div>${item.productName} - $${item.price}</div>`);
    });
}

function navigateTo(page) {
    window.location.href = `${page}.html`;
}
