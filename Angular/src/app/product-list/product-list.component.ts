import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../supabase.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { take } from 'rxjs';

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
    const userData = this.supabase.getUserSync();
    const user = userData?.user;

    if (user && user.id) {
      this.supabase.addToCart(user.id, product.id, 1).subscribe();
    } else {
      this.supabase.getUser().pipe(take(1)).subscribe(fetchedUserData => {
        const fetchedUser = fetchedUserData?.user;
        if (fetchedUser && fetchedUser.id) {
          this.supabase.addToCart(fetchedUser.id, product.id, 1).subscribe();
        }
      });
    }
  }
  

  goToCart() {
    this.router.navigate(['/cart-page']);
  }
  goToCheckout() {
    this.router.navigate(['/checkout']);
  }
}
