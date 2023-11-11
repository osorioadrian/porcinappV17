import { Injectable, inject } from '@angular/core';
import { User } from '@pages/users/interface/user';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from '@env/environment.development';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users: User[] = [];

  http = inject(HttpClient);

  _snackBar = inject(MatSnackBar);

  getUsers(): Observable<User[]> {
    const url = `${base_url}/auth`;

    return this.http
      .get<User[]>(url)
      .pipe(
        map(resp => {
          return resp;
        })
      )
      .pipe(
        catchError(err => {
          this._snackBar.open('Error', err.error.message, { duration: 3000 });
          return throwError(() => err);
        })
      );
  }
}
