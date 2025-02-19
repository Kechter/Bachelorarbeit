import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SupabaseService } from '../supabase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone : true,
  imports: [ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  loading = false;
  isRegistering = false;

  authForm;

  constructor(
    private readonly supabase: SupabaseService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router
  ) {
    this.authForm = this.formBuilder.group({
      email: '',
      password: ''
    });
  }

  async onSubmit(): Promise<void> {
    try {
      this.loading = true;
      const email = this.authForm.value.email as string;
      const password = this.authForm.value.password as string;

      if (this.isRegistering) {
        await this.supabase.signUp(email, password);
      } else {
        await this.supabase.login(email, password);
        this.router.navigate(['/products']);
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      this.authForm.reset();
      this.loading = false;
    }
  }

  toggleForm() {
    this.isRegistering = !this.isRegistering;
  }
}
