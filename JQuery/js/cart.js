$(document).ready(function () {
  fetchCartItems();
});

function getUserId() {
  return localStorage.getItem("userId");
}

function fetchCartItems() {
  const userId = getUserId();
  if (!userId) {
    return;
  }

  $.ajax({
    url: `http://localhost:3001/api/cart?userId=${userId}`,
    method: "GET",
    success: function (cartItems) {
      fetchProductDetails(cartItems);
    },
    error: function (error) {
      console.error("Error fetching cart items:", error);
    },
  });
}

function fetchProductDetails(cartItems) {
  const productPromises = cartItems.map((item) => {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `http://localhost:3001/api/product/${item.product_id}`,
        method: "GET",
        success: function (productData) {
          const product = productData[0];
          item.productName = product.name;
          item.price = product.price;
          resolve(item);
        },
        error: function (error) {
          console.error("Error fetching product details:", error);
          reject(error);
        },
      });
    });
  });

  Promise.all(productPromises).then((updatedCartItems) => {
    displayCartItems(updatedCartItems);
  });
}

function displayCartItems(cartItems) {
  const cartContainer = $("#cart-items");
  cartContainer.empty();

  cartItems.forEach((item) => {
    const itemElement = `
            <div class="cart-item">
                <h3>${item.productName}</h3>
                <p>$${item.price}</p>
                <p>Quantity: ${item.quantity}</p>
            </div>
        `;
    cartContainer.append(itemElement);
  });
}

function navigateTo(page) {
  window.location.href = `${page}.html`;
}
