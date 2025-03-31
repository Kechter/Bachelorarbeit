import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule, CartComponent],
  templateUrl: './cart-page.component.html',
})
export class CartPageComponent {
  constructor(private router: Router) {}

  goToCheckout() {
    this.router.navigate(['/checkout']);
  }

  goToProducts() {
    this.router.navigate(['/products']);
  }
}
