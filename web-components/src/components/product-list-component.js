import { ProductService } from "../services/product-service.js";
import { getUserId } from "../auth-util.js";

class ProductList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.productService = new ProductService();
  }
  connectedCallback() {
    this.render();
  }
  render() {
    this.shadowRoot.innerHTML = `
      <div>
        <h1>Product List</h1>
        <ul id="products"></ul>
        <div>
          <button id="go-to-cart">Go to Cart</button>
          <button id="go-to-checkout">Go to Checkout</button>
        </div>
      </div>
    `;
    this.fetchProducts();
    this.addNavigationListeners();
  }

  async fetchProducts() {
    const products = await this.productService.fetchProducts();
    const productsList = this.shadowRoot.querySelector("#products");
    products.forEach((product) => {
      const li = document.createElement("li");
      li.innerHTML = `
          <div>
            <p>${product.name}</p>
            <p>${product.description}</p>
            <p>$${product.price}</p>
            <button>Add to Cart</button>
          </div>
        `;
      productsList.appendChild(li);
    });
    this.shadowRoot.querySelectorAll(".add-to-cart").forEach((button) => {
      button.addEventListener("click", (event) => this.addToCart(event));
    });
  }

  addNavigationListeners() {
    this.shadowRoot
      .querySelector("#go-to-cart")
      .addEventListener("click", () => {
        window.navigateTo("/cart");
      });

    this.shadowRoot
      .querySelector("#go-to-checkout")
      .addEventListener("click", () => {
        window.navigateTo("/checkout");
      });
  }

  async addToCart(event) {
    const userId = getUserId();
    if (!userId) return;
    const productId = event.target.getAttribute("data-id");
    const product = { userId, productId, quantity: 1 };
    await this.productService.addProductToCart(product);
  }
}

customElements.define("product-list", ProductList);
