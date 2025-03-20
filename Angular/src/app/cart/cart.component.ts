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
  readonly userId = 'df992ef6-af8d-4d4d-8f50-1214b7520dcf';

  constructor(private supabaseService: SupabaseService) {}

  ngOnInit() {
    this.supabaseService.getCart(this.userId).subscribe((items: any) => {
      this.cartItems = items;
      this.cartItems.forEach((item) => {
        this.supabaseService
          .getProductById(item.product_id)
          .subscribe((products: any) => {
            const product = products[0];
            item.productName = product.name;
            item.price = product.price;
          });
      });
    });
  }
}
