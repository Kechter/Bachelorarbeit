import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../supabase.service';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from "../product-card/product-card.component";

@Component({
  selector: 'app-product-list',
  standalone : true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{
  constructor(private readonly supabase: SupabaseService) {
  }
  products: any[] = [];
  ngOnInit() {
    this.supabase.fetchProducts().subscribe((products: any) => {
      this.products = products;
    });
  }
}
