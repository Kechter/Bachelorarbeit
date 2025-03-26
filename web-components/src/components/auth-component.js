import { AuthService } from "../services/auth-service.js";

class AuthComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.authService = new AuthService();
  }

  connectedCallback() {
    localStorage.removeItem("isLoggedIn");
    this.renderLoginForm();
  }

  renderLoginForm() {
    this.shadowRoot.innerHTML = `
        <div>
            <h1>Login</h1>      
            <form id ="login-form">
                <input type="email" id="email" placeholder="Email" />
                <input type="password" id="password" placeholder="Password" />
                <button type="submit">Login </button>
            </form>
            <p>Don't have an account? <a id="switch-to-register" href="#">Register</a></p>
        </div>`;
    this.shadowRoot
      .getElementById("login-form")
      .addEventListener("submit", async (event) => {
        event.preventDefault();
        const email = this.shadowRoot.getElementById("email").value;
        const password = this.shadowRoot.getElementById("password").value;
        await this.authService.login(email, password);
        localStorage.setItem("isLoggedIn", true);
        window.navigateTo("/products");
      });

    this.shadowRoot
      .getElementById("switch-to-register")
      .addEventListener("click", (event) => {
        event.preventDefault();
        this.renderRegisterForm();
      });
  }

  renderRegisterForm() {
    this.shadowRoot.innerHTML = `
        <div>
            <h1>Register</h1>      
            <form id ="register-form">
                <input type="email" id="email" placeholder="Email" />
                <input type="password" id="password" placeholder="Password" />
                <button type="submit">Register</button>
            </form>
            <p>Already have an account? <a id="switch-to-login" href="#">Login</a></p>
        </div>
      `;
    this.shadowRoot
      .getElementById("register-form")
      .addEventListener("submit", async (event) => {
        event.preventDefault();
        const email = this.shadowRoot.getElementById("email").value;
        const password = this.shadowRoot.getElementById("password").value;
        await this.authService.signUp(email, password);
        this.renderLoginForm();
      });

    this.shadowRoot
      .getElementById("switch-to-login")
      .addEventListener("click", (event) => {
        event.preventDefault();
        this.renderLoginForm();
      });
  }
}

customElements.define("auth-component", AuthComponent);
