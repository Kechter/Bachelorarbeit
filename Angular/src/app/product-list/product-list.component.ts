import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../supabase.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  private router: Router;
  constructor(private readonly supabase: SupabaseService, router: Router) {
    this.router = router;
  }
  products: any[] = [];
  ngOnInit() {
    this.supabase.fetchProducts().subscribe((products: any) => {
      this.products = products;
    });
  }

  addToCart(product: any) {
    const userId = this.supabase.userId;
    const productId = product.id;
    const quantity = 1;

    this.supabase.addToCart(userId, productId, quantity).subscribe();
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }
  goToCheckout() {
    this.router.navigate(['/checkout']);
  }
}
