import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '@auth/service/auth.service';

export const userAdminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const user = JSON.parse(localStorage.getItem('user')!);
  const roles = user.roles;
  const isAdmin = roles.includes('ADMINISTRADOR');

  if (isAdmin) {
    return true;
  } else {
    authService.logout();
    return false;
  }

  return true;
};
