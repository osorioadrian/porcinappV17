import { Injectable, inject } from '@angular/core';
import { environment } from '@env/environment.development';
import { Metric } from '@pages/metrics/interface/metric';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, map } from 'rxjs';

const base_url = environment.base_url;

@Injectable()
export class MetricsService {
  metrics: Metric[] = [];
  http = inject(HttpClient);
  _snackBar = inject(MatSnackBar);

  getMetrics(): Observable<Metric[]> {
    const url = base_url + '/metrics';

    return this.http.get<Metric[]>(url).pipe(
      map(resp => {
        return resp;
      })
    );
  }

  getMetricById(id: string): Observable<Metric> {
    const url = base_url + '/metrics/' + id;

    return this.http.get<Metric>(url).pipe(
      map(resp => {
        return resp;
      })
    );
  }

  createMetric(metric: Metric): Observable<Metric> {
    const url = base_url + '/metrics';

    return this.http.post<Metric>(url, metric).pipe(
      map((resp: Metric) => {
        this._snackBar.open('Métrica Creada', resp.name, {
          duration: 2900,
          panelClass: ['success-snackbar']
        });
        return resp;
      })
    );
  }

  updateMetric(metric: Metric, id: string): Observable<Metric> {
    const url = base_url + '/metrics/' + id;

    return this.http.patch<Metric>(url, metric).pipe(
      map((resp: Metric) => {
        this._snackBar.open('Métrica Actualizada', resp.name, {
          duration: 2900,
          panelClass: ['info-snackbar']
        });
        return resp;
      })
    );
  }

  updateStatusMetric(metric: Metric) {
    const url = `${base_url}/metrics/${metric._id}`;

    return this.http
      .patch<Metric>(url, { isActive: metric.isActive })
      .pipe(
        map((resp: Metric) => {
          if (resp.isActive === true) {
            this._snackBar.open('Estado Actualizado', 'Activo', {
              duration: 2900,
              panelClass: ['info-snackbar']
            });
          } else {
            this._snackBar.open('Estado Actualizado', 'Inactivo', {
              duration: 2900,
              panelClass: ['info-snackbar']
            });
          }
          return true;
        })
      );
  }

  deleteMetric(metric: Metric): Observable<Metric> {
    const url = `${base_url}/metrics/${metric._id}`;

    return this.http.delete<Metric>(url).pipe(
      map((resp: Metric) => {
        this._snackBar.open('Métrica Eliminada', resp.name, {
          duration: 2900,
          panelClass: ['info-snackbar']
        });
        return resp;
      })
    );
  }
}
