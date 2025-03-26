import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../supabase.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  userId: string | null = null;

  constructor(private supabaseService: SupabaseService) {}

  ngOnInit() {
    this.supabaseService.getUser().subscribe((userData: any) => {
      const user = userData?.user;
      if (user && user.id) {
        this.userId = user.id;
        this.loadCart();
      }
    });
  }

  loadCart() {
    if (!this.userId) {
      return;
    }

    this.supabaseService.getCart(this.userId).subscribe((items: any) => {
      if (!items || items.length === 0) {
        return;
      }

      const groupedItems: { [key: string]: any } = {};
      items.forEach((item: any) => {
        if (!groupedItems[item.product_id]) {
          groupedItems[item.product_id] = { ...item, quantity: 1 };
        } else {
          groupedItems[item.product_id].quantity += 1;
        }
      });

      this.cartItems = Object.values(groupedItems);

      this.cartItems.forEach((item, index) => {
        this.supabaseService
          .getProductById(item.product_id)
          .subscribe((products: any) => {
            if (products.length > 0) {
              const product = products[0];
              this.cartItems[index].productName = product.name;
              this.cartItems[index].price = product.price;
            }
          });
      });
    });
  }
}
