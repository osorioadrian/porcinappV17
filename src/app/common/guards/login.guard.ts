import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from 'app/auth/service/auth.service';

export const loginGuard: CanActivateFn = () => {
  const authService = inject(AuthService);

  if (authService.isLogged()) {
    return true;
  } else {
    authService.logout();
    return false;
  }
};
