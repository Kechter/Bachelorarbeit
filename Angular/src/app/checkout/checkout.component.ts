import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from '../supabase.service';
import { CommonModule } from '@angular/common';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, CartComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  constructor(
    private router: Router,
    private supabaseService: SupabaseService
  ) {}
  cart: any[] = [];
  totalPrice: number = 0;
  userId: string = 'df992ef6-af8d-4d4d-8f50-1214b7520dcf';

  ngOnInit() {
    this.supabaseService.getCart(this.userId).subscribe((cart: any) => {
      this.cart = cart;
      this.calculateTotal();
    });
  }

  calculateTotal() {
    const userId = this.supabaseService.getUserSync()?.user?.id;
    if (!userId) return;

    this.supabaseService.getCart(userId).subscribe({
      next: (response) => {
        if (!Array.isArray(response) || response.length === 0) {
          this.totalPrice = 0;
          return;
        }

        let total = 0;
        let itemsProcessed = 0;

        response.forEach((item) => {
          this.supabaseService.getProductById(item.product_id).subscribe({
            next: (products) => {
              if (Array.isArray(products) && products.length > 0) {
                total += products[0].price * item.quantity;
              }
            },
            complete: () => {
              itemsProcessed++;
              if (itemsProcessed === response.length) {
                this.totalPrice = parseFloat(total.toFixed(2));
              }
            },
          });
        });
      },
    });
  }

  goToCart() {
    this.router.navigate(['/cart-page']);
  }

  goToProducts() {
    this.router.navigate(['/products']);
  }
}
