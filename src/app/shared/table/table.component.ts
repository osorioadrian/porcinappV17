import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  inject
} from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TableConfig } from '@shared/table/interface/table-config';
import { TableColumn } from '@shared/table/interface/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ColumnValuePipe } from '@common/pipes/column-value.pipe';
import { AuthService } from '@auth/service/auth.service';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    MatButtonModule,
    NgFor,
    NgIf,
    ColumnValuePipe,
    MatInputModule,
    MatIconModule,
    MatSlideToggleModule
  ],
  templateUrl: './table.component.html',
  styles: `
    .mat-header-cell,
    .mat-cell {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    button {
      float: right;
    }
    mat-form-field {
      width: 50%;
    }
  `
})
export class TableComponent {
  dataSource: MatTableDataSource<Array<any>> = new MatTableDataSource();
  tableDisplayColumns: string[] = [];
  tableColumns: TableColumn[] = [];
  selection = new SelectionModel<any>(true, []);
  tableConfig: TableConfig | undefined;
  authService = inject(AuthService);

  trackTask(index: number): number {
    return index;
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @Input() set data(data: Array<any>) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  @Input() set columns(columns: TableColumn[]) {
    this.tableColumns = columns;
    this.tableDisplayColumns = this.tableColumns.map(col => col.def);
    this.tableDisplayColumns.push('status');
    this.tableDisplayColumns.push('edit');
    this.tableDisplayColumns.push('delete');
  }

  @Output() edit: EventEmitter<any> = new EventEmitter();

  @Output() status: EventEmitter<any> = new EventEmitter();

  @Output() add: EventEmitter<any> = new EventEmitter();

  @Output() delete: EventEmitter<any> = new EventEmitter();

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onEdit(row: any) {
    this.edit.emit(row);
  }

  onDelete(row: any) {
    this.delete.emit(row);
  }

  onStatus(row: any, status: boolean) {
    row.isActive = status;
    this.status.emit(row);
  }

  onAdd() {
    this.add.emit();
  }
}
