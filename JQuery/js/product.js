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
            <p>${product.price}</p>
            <button onclick="addToCart('${product.id}')">Add to Cart</button>
          </div>
        </li>
      `);
  });
}

function addToCart(productId) {
  $.post("http://localhost:3001/api/cart/add", { productId });
}

function navigateTo(page) {
  window.location.href = `/${page}.html`;
}
