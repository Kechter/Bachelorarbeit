import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { AuthComponent } from './auth/auth.component';

export const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },
];

export const appRouting = provideRouter(routes);
