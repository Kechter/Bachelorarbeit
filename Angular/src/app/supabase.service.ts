import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private backendUrl = 'http://localhost:3001/api';
  private currentUser = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {
    this.getSession();
  }

  signUp(email: string, password: string) {
    return this.http
      .post(`${this.backendUrl}/signup`, { email, password })
      .subscribe((user: any) => {
        this.currentUser.next(user);
      });
  }

  login(email: string, password: string) {
    return this.http
      .post(`${this.backendUrl}/login`, { email, password })
      .subscribe((user: any) => {
        this.currentUser.next(user);
      });
  }

  logout() {
    this.currentUser.next(null);
    return this.http.post(`${this.backendUrl}/logout`, {});
  }

  getSession() {
    return this.http
      .get(`${this.backendUrl}/session`)
      .subscribe((user: any) => {
        this.currentUser.next(user);
      });
  }

  getUser() {
    return this.currentUser.asObservable();
  }

  getUserSync(): any {
    return this.currentUser.value;
  }

  fetchProducts() {
    return this.http.get(`${this.backendUrl}/products`);
  }

  addToCart(userId: string, productId: string, quantity: number) {
    return this.http.post(`${this.backendUrl}/cart/add`, {
      userId,
      productId,
      quantity,
    });
  }

  getCart(userId: string) {
    return this.http.get(`${this.backendUrl}/cart?userId=${userId}`);
  }

  getProductById(productId: string) {
    return this.http.get(`${this.backendUrl}/product/${productId}`);
  }
}
