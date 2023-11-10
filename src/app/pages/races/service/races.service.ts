import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'environments/environment.development';
import { Race } from '../interface/race';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, catchError, map, throwError } from 'rxjs';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class RacesService {
  http = inject(HttpClient);
  snackBar = inject(MatSnackBar);

  getRaces(): Observable<Race[]> {
    const url = base_url + '/races';

    return this.http.get<Race[]>(url).pipe(
      map(resp => {
        return resp;
      })
    );
  }

  getRaceById(id: string): Observable<Race> {
    const url = base_url + '/races/' + id;

    return this.http.get<Race>(url).pipe(
      map(resp => {
        return resp;
      })
    );
  }

  createRace(race: Race): Observable<Race> {
    const url = base_url + '/races';

    return this.http.post<Race>(url, race).pipe(
      map((resp: Race) => {
        this.snackBar.open('Raza Creada', resp.name, {
          duration: 2900,
          panelClass: ['success-snackbar']
        });
        return resp;
      })
    );
  }

  updateRace(race: Race, id: string): Observable<Race> {
    const url = base_url + '/races/' + id;

    return this.http.patch<Race>(url, race).pipe(
      map((resp: Race) => {
        this.snackBar.open('Raza Actualizada', resp.name, {
          duration: 2900,
          panelClass: ['info-snackbar']
        });
        return resp;
      })
    );
  }

  updateStatusRace(race: Race) {
    const url = `${base_url}/races/${race._id}`;

    return this.http
      .patch<Race>(url, { isActive: race.isActive })
      .pipe(
        map((resp: Race) => {
          if (resp.isActive === true) {
            this.snackBar.open('Estado Actualizado', 'Activo', {
              duration: 2900,
              panelClass: ['info-snackbar']
            });
          } else {
            this.snackBar.open('Estado Actualizado', 'Inactivo', {
              duration: 2900,
              panelClass: ['info-snackbar']
            });
          }
          return true;
        })
      );
  }

  deleteRace(race: Race): Observable<Race> {
    const url = `${base_url}/races/${race._id}`;

    return this.http.delete<Race>(url).pipe(
      map((resp: Race) => {
        this.snackBar.open('Raza Eliminada', resp.name, {
          duration: 2900,
          panelClass: ['info-snackbar']
        });
        return resp;
      })
    );
  }
}
