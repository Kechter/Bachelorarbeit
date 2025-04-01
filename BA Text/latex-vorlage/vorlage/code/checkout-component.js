async fetchCartTotal() {
    const cart = await this.checkoutService.fetchCart(this.userId);
    const enrichedCartItems = await Promise.all(
      cart.map(async (item) => {
        const productDetails = await this.fetchProductDetails(item.product_id);
        return { ...item, productName: productDetails.name, price: productDetails.price };
      })
    );
    this.totalPrice = enrichedCartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
}


this.shadowRoot.innerHTML = `
  <h2>Checkout</h2>
  <div>Total Price: $${this.totalPrice}</div>
  <button id="go-to-products">Go to Products</button>
  <button id="go-to-cart">Go to Cart</button>
`; 

this.shadowRoot.querySelector("#go-to-products").addEventListener("click", () => {
    window.navigateTo("/products");
});