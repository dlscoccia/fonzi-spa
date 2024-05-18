import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthStatus } from '@core/modelo';
import { AuthService } from '@core/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate() {
    if (this.authService.authStatus() === AuthStatus.authenticated) {
      return true;
    } else {
      this.router.navigate(['/auth/ingresar']);
      return false;
    }
  }
}
