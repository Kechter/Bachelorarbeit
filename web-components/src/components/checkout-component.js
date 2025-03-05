import { CheckoutService } from "../services/checkout-service.js";

class CheckoutComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.checkoutService = new CheckoutService(); 
    this.cartItems = [];
    this.totalPrice = 0;
    this.userId = 'df992ef6-af8d-4d4d-8f50-1214b7520dcf';
  }

  connectedCallback() {
    this.fetchCartData();
  }

  async fetchCartData() {
    const cart = await this.checkoutService.fetchCart(this.userId);

    const enrichedCartItems = await Promise.all(
      cart.map(async (item) => {
        const productDetails = await this.fetchProductDetails(item.product_id);
        return {
          ...item,
          productName: productDetails.name,
          price: productDetails.price,
        };
      })
    );

    this.cartItems = enrichedCartItems;
    this.totalPrice = this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    this.render();
  }

  async fetchProductDetails(productId) {
    const response = await fetch(`http://localhost:3001/api/product/${productId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch product ${productId}`);
    }
    const productArray = await response.json();
    return productArray[0]; 
  }

  render() {
    this.shadowRoot.innerHTML = `
      <div>
        <h2>Checkout</h2>
        <div id="cart-items"></div>
        <h3>Total: $${this.totalPrice.toFixed(2)}</h3>
        <button id="go-to-products">Go to Products</button>
        <button id="go-to-cart">Go to Cart</button>

        <section class="payment-info">
          <h2>Payment Information</h2>
          <div>
            <label for="cardNumber">Card Number</label>
            <input type="text" id="cardNumber" value="1234 5678 9012 3456" readonly />
          </div>
          <div>
            <label for="expiryDate">Expiry Date</label>
            <input type="month" id="expiryDate" value="2025-12" readonly />
          </div>
          <div>
            <label for="cvv">CVV</label>
            <input type="text" id="cvv" value="123" readonly />
          </div>
        </section>

        <div class="checkout-button">
          <button>Proceed to Payment</button>
        </div>
      </div>
    `;

    const cartItemsContainer = this.shadowRoot.querySelector("#cart-items");
    this.cartItems.forEach((item) => {
      const itemDiv = document.createElement("div");
      itemDiv.innerHTML = `
        <h3>${item.productName}</h3>
        <p>$${item.price.toFixed(2)}</p>
        <p>Quantity: ${item.quantity}</p>
      `;
      cartItemsContainer.appendChild(itemDiv);
    });

    this.shadowRoot.querySelector('#go-to-products').addEventListener('click', () => {
      window.navigateTo('/products');
    });

    this.shadowRoot.querySelector('#go-to-cart').addEventListener('click', () => {
      window.navigateTo('/cart');
    });
  }
}

customElements.define('checkout-component', CheckoutComponent);
