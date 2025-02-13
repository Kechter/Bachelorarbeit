import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SupabaseService } from '../supabase.service';

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
    private readonly formBuilder: FormBuilder 
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
        alert('Account created! You can now log in.');
      } else {
        await this.supabase.login(email, password);
        alert('Successfully logged in! Redirecting...');
        window.location.href = '/shop';
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
