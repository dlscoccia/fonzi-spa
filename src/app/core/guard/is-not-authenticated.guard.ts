import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStatus } from '@core/modelo';
import { AuthService } from '@core/services/auth.service';

// PublicGuard - PrivateGuard

export const isNotAuthenticatedGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.authStatus() === AuthStatus.authenticated) {
    router.navigateByUrl('/inicio');
    return false;
  }

  return true;
};
