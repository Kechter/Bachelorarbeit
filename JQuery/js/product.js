$(document).ready(function () {
  fetchProducts();
});

function fetchProducts() {
  $.get("http://localhost:3001/api/products").done(displayProducts);
}

function displayProducts(products) {
  let productList = $("#product-list").empty();
  products.forEach((product) => {
    productList.append(`
        <li>
          <div>
            <p>${product.name}</p>
            <p>${product.description}</p>
            <p>$${product.price}</p>
            <button onclick="addToCart('${product.id}')">Add to Cart</button>
          </div>
        </li>
      `);
  });
}

function getUserId() {
  return localStorage.getItem("userId");
}

function addToCart(productId) {
  const userId = getUserId();
  if (!userId) return;

  const requestData = { userId, productId, quantity: 1 };

  $.ajax({
    url: "http://localhost:3001/api/cart/add",
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify(requestData),
  });
}

function navigateTo(page) {
  window.location.href = `/${page}.html`;
}
