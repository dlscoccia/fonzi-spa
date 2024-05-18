import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { AuthService } from '../../../../core/services/auth.service';

@Component({
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  fb = inject(FormBuilder);

  public myForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  private authService = inject(AuthService);

  private router = inject(Router);

  login() {
    if (this.myForm.invalid) return;

    const { email, password } = this.myForm.value;

    this.authService.login(email, password).subscribe({
      next: () => this.router.navigateByUrl('/checkout'),
      error: (message) => {
        return Swal.fire({
          title: 'Algo salio mal...',
          text: message,
          icon: 'error',
        });
      },
    });
  }
}
