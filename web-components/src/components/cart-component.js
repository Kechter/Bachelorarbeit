import { CartService } from "../services/cart-service.js";
import { getUserId } from "../auth-util.js";

class CartComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.cartService = new CartService();
  }

  connectedCallback() {
    this.userId = getUserId();
    this.render();
  }

  async render() {
    this.userId = getUserId();
    if (!this.userId) return;

    const cart = await this.cartService.fetchCart(this.userId);

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

    const isCheckoutPage = this.getAttribute("data-page") === "checkout";

    this.shadowRoot.innerHTML = `
        <div>
            <h2>Cart</h2>
            <div id="cart-items"></div>
            ${
              !isCheckoutPage
                ? `
            <button id="go-to-products">Go to Products</button>
            <button id="go-to-checkout">Go to Checkout</button>
            `
                : ""
            }
        </div>
    `;

    const cartList = this.shadowRoot.querySelector("#cart-items");
    enrichedCartItems.forEach((item) => {
      const itemDiv = document.createElement("div");
      itemDiv.innerHTML = `
            <h3>${item.productName}</h3>
            <p>$${item.price}</p>
            <p>Quantity: ${item.quantity}</p>
        `;
      cartList.appendChild(itemDiv);
    });

    if (!isCheckoutPage) {
      this.shadowRoot
        .querySelector("#go-to-products")
        .addEventListener("click", () => {
          window.navigateTo("/products");
        });

      this.shadowRoot
        .querySelector("#go-to-checkout")
        .addEventListener("click", () => {
          window.navigateTo("/checkout");
        });
    }
  }

  async fetchProductDetails(productId) {
    const response = await fetch(
      `http://localhost:3001/api/product/${productId}`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch product ${productId}`);
    }
    const productArray = await response.json();
    return productArray[0];
  }
}

customElements.define("cart-component", CartComponent);
