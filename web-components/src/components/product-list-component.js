import { ProductService } from "../services/product-service.js";

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
      </div>
    `;
    this.fetchProducts();
  }

  async fetchProducts() {
      const products = await this.productService.fetchProducts();
      const productsList = this.shadowRoot.querySelector('#products');
      products.forEach(product => {
        const li = document.createElement('li');
        li.textContent = product.name;
        productsList.appendChild(li);
      });
  }
}
customElements.define('product-list', ProductList);