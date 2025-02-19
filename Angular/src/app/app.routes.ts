import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { ProductListComponent } from './product-list/product-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },
  { path: 'products', component: ProductListComponent }
];

export const appRouting = provideRouter(routes);
