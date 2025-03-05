export class ProductService {
    constructor() {
      this.backendUrl = "http://localhost:3001/api"; 
    }
  
    async fetchProducts() {

        const response = await fetch(`${this.backendUrl}/products`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
  
        if (!response.ok) {
          throw new Error(`Failed to fetch products: ${response.statusText}`);
        }
        
        return await response.json();
    }

    async addProductToCart(product) {
        const response = await fetch(`${this.backendUrl}/cart/add`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(product),
        });
  
        if (!response.ok) {
          throw new Error(`Failed to add product to cart: ${response.statusText}`);
        }
    }
  }
  