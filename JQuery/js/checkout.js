$(document).ready(function () {
  fetchCheckoutItems();
});

function getUserId() {
  return localStorage.getItem("userId");
}

function fetchCheckoutItems() {
  const userId = getUserId();

  if (!userId) {
    return;
  }

  $.ajax({
    url: `http://localhost:3001/api/cart?userId=${userId}`,
    method: "GET",
    success: function (cartItems) {
      fetchProductDetailsForCheckout(cartItems);
    },
    error: function (error) {
      console.error("Fehler beim Abrufen der Warenkorb-Daten:", error);
    },
  });
}

function fetchProductDetailsForCheckout(cartItems) {
  const productPromises = cartItems.map((item) => {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `http://localhost:3001/api/product/${item.product_id}`,
        method: "GET",
        success: function (productData) {
          if (productData.length > 0) {
            const product = productData[0];
            item.productName = product.name;
            item.price = parseFloat(product.price);
          } else {
            item.price = 0;
          }
          resolve(item);
        },
        error: function (error) {
          reject(error);
        },
      });
    });
  });

  Promise.all(productPromises).then((updatedCartItems) => {
    displayCheckoutItems(updatedCartItems);
    calculateTotalPrice(updatedCartItems);
  });
}

function displayCheckoutItems(cartItems) {
  const checkoutContainer = $("#checkout-items");
  checkoutContainer.empty();

  cartItems.forEach((item) => {
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
  if (!cartItems || cartItems.length === 0) {
    $("#total-price").text("0.00");
    return;
  }

  const total = cartItems.reduce((sum, item) => {
    return sum + (item.price ? item.price * item.quantity : 0);
  }, 0);

  $("#total-price").text(total.toFixed(2));
}

function navigateTo(page) {
  if (page === "products") {
    window.location.href = "products.html";
  } else if (page === "cart") {
    window.location.href = "cart.html";
  }
}
