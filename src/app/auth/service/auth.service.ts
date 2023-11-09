import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Auth } from '../interface/auth';
import { environment } from 'environments/environment.development';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Router } from '@angular/router';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user!: Auth;
  token!: string;
  menu: [] = [];

  router = inject(Router);
  http = inject(HttpClient);

  constructor() {
    this.loadStorage();
  }

  login(user: Auth): Observable<boolean> {
    const url = base_url + '/auth/login';

    return this.http
      .post(url, user)
      .pipe(
        map((resp: any) => {
          // this.snackbar.open('Bienvenido', resp.user.fullName, {
          //   duration: 2900,
          //   panelClass: ['info-snackbar']
          // });
          this.saveStorage(resp.id, resp.token, resp.user, resp.menu);

          this.user = resp.user;

          return true;
        })
      )
      .pipe(
        catchError(err => {
          // this.snackbar.open('Error en el login', err.error.message, {
          //   duration: 2900,
          //   panelClass: ['snackBar-fail']
          // });
          return throwError(() => err);
        })
      );
  }

  logout(): void {
    this.user = null!;
    this.token = '';
    this.menu = [];

    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('menu');

    this.router.navigate(['/login']);
  }

  saveStorage(id: string, token: string, user: Auth, menu: []): void {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('menu', JSON.stringify(menu));

    this.user = user;
    this.token = token;
    this.menu = menu;
  }

  loadStorage(): void {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token')!;
      this.user = JSON.parse(localStorage.getItem('user')!);
      this.menu = JSON.parse(localStorage.getItem('menu')!);
    } else {
      this.token = '';
      this.user = null!;
      this.menu = [];
    }
  }

  isLogged(): boolean {
    return this.token.length > 5 ? true : false;
  }

  renewToken(): Observable<boolean> {
    let url = base_url + '/login/renew';
    url += '?token=' + this.token;

    return this.http
      .get(url)
      .pipe(
        map((resp: any) => {
          const { fullName, email, roles, img = '', id } = resp.user;

          this.token = resp.token;
          localStorage.setItem('token', this.token);
          return true;
        })
      )
      .pipe(
        catchError(err => {
          this.router.navigate(['/login']);
          // this.snackbar.open(err.error.message, '', {
          //   duration: 2900,
          //   panelClass: ['danger-snackbar']
          // });
          return throwError(() => err);
        })
      );
  }
}
