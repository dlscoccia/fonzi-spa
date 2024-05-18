import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { AuthService } from '../../../../core/services/auth.service';
import { matchingFieldsValidator } from '@shared/utils/matchingFieldsValidator';

@Component({
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent {
  fb = inject(FormBuilder);

  public myForm: FormGroup = this.fb.group(
    {
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    },
    { validators: matchingFieldsValidator }
  );

  private authService = inject(AuthService);

  private router = inject(Router);

  register() {
    if (this.myForm.invalid) return;

    const { name, email, password } = this.myForm.value;

    this.authService.register(name, email, password).subscribe({
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
