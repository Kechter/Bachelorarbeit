import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from '../supabase.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
cartItems: any[] = [];
totalAmount: number = 0;
readonly userId = 'df992ef6-af8d-4d4d-8f50-1214b7520dcf';
private router: Router;

  constructor(router: Router, private supabaseService: SupabaseService) {
    this.router = router;
  }
  
  ngOnInit() {
    this.supabaseService.getCart(this.userId).subscribe((items: any) => {
      this.cartItems = items;
      this.cartItems.forEach(item => {
        this.supabaseService.getProductById(item.product_id).subscribe((product: any) => {
          item.productName = product[0].name;
          item.price = product[0].price;
          this.totalAmount += item.price;
        });
      });
    });
  }

  goToCart() { 
    this.router.navigate(['/cart']);
  }
  goToProducts() { 
    this.router.navigate(['/products']);
  }
}

