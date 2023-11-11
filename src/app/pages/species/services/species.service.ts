import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, map } from 'rxjs';
import { Specie } from '../interface/specie';
import { environment } from 'environments/environment.development';

const base_url = environment.base_url;

@Injectable()
export class SpeciesService {
  http = inject(HttpClient);
  snackBar = inject(MatSnackBar);

  getSpecies(): Observable<Specie[]> {
    const url = base_url + '/species';

    return this.http.get<Specie[]>(url).pipe(
      map(resp => {
        return resp;
      })
    );
  }

  getSpecieById(id: string): Observable<Specie> {
    const url = base_url + '/species/' + id;

    return this.http.get<Specie>(url).pipe(
      map(resp => {
        return resp;
      })
    );
  }

  createSpecie(specie: Specie): Observable<Specie> {
    const url = base_url + '/species';

    return this.http.post<Specie>(url, specie).pipe(
      map((resp: Specie) => {
        this.snackBar.open('Especie Creada', resp.name, {
          duration: 2900,
          panelClass: ['success-snackbar']
        });
        return resp;
      })
    );
  }

  updateSpecie(specie: Specie, id: string): Observable<Specie> {
    const url = base_url + '/species/' + id;

    return this.http.patch<Specie>(url, specie).pipe(
      map((resp: Specie) => {
        this.snackBar.open('Especie Actualizada', resp.name, {
          duration: 2900,
          panelClass: ['info-snackbar']
        });
        return resp;
      })
    );
  }

  updateStatusSpecie(specie: Specie) {
    const url = `${base_url}/species/${specie._id}`;

    return this.http
      .patch<Specie>(url, { isActive: specie.isActive })
      .pipe(
        map((resp: Specie) => {
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

  deleteSpecie(specie: Specie): Observable<Specie> {
    const url = `${base_url}/species/${specie._id}`;

    return this.http.delete<Specie>(url).pipe(
      map((resp: Specie) => {
        this.snackBar.open('Especie Eliminada', resp.name, {
          duration: 2900,
          panelClass: ['info-snackbar']
        });
        return resp;
      })
    );
  }
}
