import { Component, inject } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogModule
} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { TableColumn } from '@shared/table/interface/table';
import { Metric } from '@pages/metrics/interface/metric';
import { MetricsService } from '@pages/metrics/service/metrics.service';
import { TableComponent } from '@shared/table/table.component';
import { switchMap } from 'rxjs';
import { DeleteModalComponent } from '@shared/delete-modal/delete-modal.component';
import { AdminMetricComponent } from '@pages/metrics/admin/admin-metric.component';

@Component({
  selector: 'app-metrics',
  standalone: true,
  imports: [TableComponent, MatDialogModule],
  providers: [MetricsService],
  template: `
    <app-table
      (edit)="actionModal($event)"
      (delete)="onDelete($event)"
      (add)="actionModal($event)"
      (status)="onStatus($event)"
      [data]="dataSource.data"
      [columns]="tableColumn"
    ></app-table>
  `,
  styles: ``
})
export default class MetricsComponent {
  metrics: Metric[] = [];
  tableColumn: TableColumn[] = [];
  dataSource = new MatTableDataSource<Metric>();
  metricService = inject(MetricsService);
  dialog = inject(MatDialog);

  ngOnInit(): void {
    this.getMetrics();
    this.setTableColumn();
  }

  setTableColumn() {
    this.tableColumn = [
      { label: 'Métricas', def: 'name', dataKey: 'name' },
      { label: 'Símbolo', def: 'symbol', dataKey: 'symbol' }
    ];
  }

  actionModal(id: string) {
    const dialogRef = this.dialog.open(AdminMetricComponent, {
      height: '310px',
      width: '400px',
      data: id
    });

    dialogRef.afterClosed().subscribe(() => this.getMetrics());

    dialogRef
      .afterClosed()
      .pipe(switchMap(() => this.metricService.getMetrics()))
      .subscribe(() => {
        this.getMetrics();
      });
  }

  onStatus(metric: Metric) {
    this.metricService
      .updateStatusMetric(metric)
      .subscribe(() => this.getMetrics());
  }

  getMetrics() {
    this.metricService.getMetrics().subscribe(resp => {
      this.dataSource.data = resp.reverse();
    });
  }

  onDelete(metric: Metric) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.height = '341px';
    dialogConfig.width = '512px';
    dialogConfig.data = {
      title: '¿Está seguro de eliminar esta métrica?',
      description:
        'Si continúa, la métrica: ' + metric.name + ' será eliminada.',
      actionButtonText: 'Eliminar!'
    };

    const dialogRef = this.dialog.open(DeleteModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        this.metricService.deleteMetric(metric).subscribe(() => {
          this.getMetrics();
        });
      }
    });
  }
}
