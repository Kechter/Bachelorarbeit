export class AuthService {
  constructor() {
    this.backendUrl = "http://localhost:3001/api";
  }

  async signUp(email, password) {
    const response = await fetch(`${this.backendUrl}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    return response.json();
  }

  async login(email, password) {
    const response = await fetch(`${this.backendUrl}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    sessionStorage.setItem("token", data.token);
    localStorage.setItem("userId", data.user.id);
    return data;
  }
}
