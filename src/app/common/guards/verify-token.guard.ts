import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from 'app/auth/service/auth.service';

export const verifyTokenGuard: CanActivateFn = () => {
  const autService = inject(AuthService);
  const token = localStorage.getItem('token');
  const payload = JSON.parse(atob(token!.split('.')[1]));
  const expired = expiredToken(payload.exp);

  if (expired) {
    console.log('expired if');

    return false;
    autService.logout();
  }

  return verifyRenew(payload.exp);
};

const verifyRenew = (expiration: number): Promise<boolean> => {
  console.log('verifyRenew');

  return new Promise((resolve, reject) => {
    const tokenExp = new Date(expiration * 1000);
    const now = new Date();

    now.setTime(now.getTime() + 1 * 60 * 60 * 1000);

    if (tokenExp.getTime() > now.getTime()) {
      resolve(true);
    } else {
      inject(AuthService)
        .renewToken()
        .subscribe(
          () => {
            resolve(true);
          },
          () => {
            reject(false);
            inject(AuthService).logout();
          }
        );
    }
  });
};

const expiredToken = (dateExp: number): boolean => {
  console.log('expiredToken');

  const now = new Date().getTime() / 1000;

  if (dateExp < now) {
    return true;
  } else {
    return false;
  }
};
