import { Component, Input } from '@angular/core';
import { SupabaseService } from '../supabase.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() product: any;

  constructor(private readonly supabase: SupabaseService) {}

  addToCart(product: any) {
    const userId = this.supabase.userId;
    const productId = product.id;
    const quantity = 1;

    this.supabase.addToCart(userId, productId, quantity).subscribe();
  }
}
