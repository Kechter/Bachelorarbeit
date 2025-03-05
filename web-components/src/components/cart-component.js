import { CartService } from "../services/cart-service.js";

class CartComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.cartService = new CartService();
  }

  connectedCallback() {
    this.render();
  }

  async render() {
    const userId = 'df992ef6-af8d-4d4d-8f50-1214b7520dcf';
    const cart = await this.cartService.fetchCart(userId);

    const enrichedCartItems = await Promise.all(
      cart.map(async (item) => {
        const productDetails = await this.fetchProductDetails(item.product_id);
        return {
          ...item,
          productName: productDetails.name,
          description: productDetails.description,
          price: productDetails.price,
        };
      })
    );

    this.shadowRoot.innerHTML = `
        <div>
            <h1>Cart</h1>
            <ul id="cart"></ul>
            <div>
                <button id="go-to-products">Go to Products</button>
                <button id="go-to-checkout">Go to Checkout</button>
            </div>
        </div>
    `;

    const cartList = this.shadowRoot.querySelector("#cart");
    enrichedCartItems.forEach((item) => {
      const li = document.createElement("li");
      li.innerHTML = `
            <div>
                <span>${item.productName}</span>
                <p>${item.description}</p>
                <p>${item.price}</p>
                <p>Quantity: ${item.quantity}</p>
            </div>
        `;
      cartList.appendChild(li);
    });

    this.shadowRoot.querySelector('#go-to-products').addEventListener('click', () => {
      window.navigateTo('/products');
    });

    this.shadowRoot.querySelector('#go-to-checkout').addEventListener('click', () => {
      window.navigateTo('/checkout');
    });
  }

  async fetchProductDetails(productId) {
    const response = await fetch(`http://localhost:3001/api/product/${productId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch product ${productId}`);
    }
    const productArray = await response.json();
    return productArray[0];
  }
}

customElements.define("cart-component", CartComponent);
