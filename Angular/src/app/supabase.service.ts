import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private backendUrl = 'http://localhost:3001/api';

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
}
