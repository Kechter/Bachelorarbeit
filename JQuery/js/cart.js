$(document).ready(function () {
  fetchCartItems();
});

function getUserId() {
  return localStorage.getItem("userId");
}

function fetchCartItems() {
  const userId = getUserId();
  if (!userId) return;

  $.ajax({
    url: `http://localhost:3001/api/cart?userId=${userId}`,
    method: "GET",
    success: function (cartItems) {
      fetchProductDetails(cartItems);
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
          const fullItem = {
            product_id: item.product_id,
            name: product.name,
            price: parseFloat(product.price),
          };
          resolve(fullItem);
        },
        error: function (error) {
          reject(error);
        },
      });
    });
  });

  Promise.all(productPromises)
    .then((fullItems) => {
      displayCartItems(fullItems);
    })
    .catch(() => {});
}

function displayCartItems(cartItems) {
  const grouped = {};

  cartItems.forEach((item) => {
    const id = item.product_id;
    if (!grouped[id]) {
      grouped[id] = { ...item, quantity: 1 };
    } else {
      grouped[id].quantity += 1;
    }
  });

  const $cartList = $("#cart-list").empty();

  Object.values(grouped).forEach((item) => {
    $cartList.append(`
      <div>
        <p><strong>${item.name}</strong></p>
        <p>$${item.price}</p>
        <p>Quantity: ${item.quantity}</p>
      </div>
      <hr/>
    `);
  });
}

function navigateTo(page) {
  window.location.href = `${page}.html`;
}
