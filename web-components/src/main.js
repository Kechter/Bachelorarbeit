document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("webcomponents");
  renderComponent();
});

import "./components/auth-component.js";
import "./components/product-list-component.js"
import "./components/cart-component.js";
import "./components/checkout-component.js";

let isAuthenticated = false;

function navigateTo(route) {
  history.pushState(null, null, route);
  renderComponent();
}

function renderComponent() {
  const app = document.getElementById('app');
  app.innerHTML = '';

  const path = window.location.pathname;

  if (!isAuthenticated && path !== '/auth' && path == '/') {
    navigateTo('/auth');
    return;
  }

  let component;
  switch (path) {
    case '/auth':
      component = document.createElement('auth-component');
      break;
    case '/products':
      component = document.createElement('product-list');
      break;
    case '/cart':
      component = document.createElement('cart-component');
      break;
    case '/checkout':
      component = document.createElement('checkout-component');
      break;
    default:
      navigateTo('/auth');
      return;
  }

  app.appendChild(component);
}

window.navigateTo = navigateTo;

window.loginSuccess = () => {
  isAuthenticated = true;
  navigateTo('/products');
};

window.addEventListener('popstate', renderComponent);
renderComponent();
