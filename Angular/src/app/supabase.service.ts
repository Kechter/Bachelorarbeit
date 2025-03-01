import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private backendUrl = 'http://localhost:3001/api';
  readonly userId = 'df992ef6-af8d-4d4d-8f50-1214b7520dcf';

  constructor(private http: HttpClient) {}

  signUp(email: string, password: string) {
    return this.http.post(`${this.backendUrl}/signup`, { email, password });
  }

  login(email: string, password: string) {
    return this.http.post(`${this.backendUrl}/login`, { email, password });
  }

  logout() {
    return this.http.post(`${this.backendUrl}/logout`, {});
  }

  getSession() {
    return this.http.get(`${this.backendUrl}/session`);
  }

  fetchProducts() {
    return this.http.get(`${this.backendUrl}/products`);
  }

  addToCart(userId: string, productId: string, quantity: number) {
    return this.http.post(`${this.backendUrl}/cart/add`, { userId, productId, quantity });
  }

  getCart(userId: string) {
    return this.http.get(`${this.backendUrl}/cart?userId=${userId}`);
  }

  getProductById(productId: string) {
    return this.http.get(`${this.backendUrl}/product/${productId}`);
  }
  
}
