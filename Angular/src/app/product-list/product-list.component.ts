import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../supabase.service';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from "../product-card/product-card.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone : true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{
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

  goToCart() { 
    this.router.navigate(['/cart']);
  }
  goToCheckout() { 
    this.router.navigate(['/checkout']);
  }
}
