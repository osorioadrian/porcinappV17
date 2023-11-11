import { Component, OnInit, inject } from '@angular/core';
import { TableComponent } from '@shared/table/table.component';
import { Race } from '@pages/races/interface/race';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TableColumn } from '@shared/table/interface/table';
import { RacesService } from '@pages/races/service/races.service';
import { MatTableDataSource } from '@angular/material/table';
import { switchMap } from 'rxjs';
import { DeleteModalComponent } from '@shared/delete-modal/delete-modal.component';
import { AdminRacesComponent } from '@pages/races/admin/admin-races.component';

@Component({
  selector: 'app-races',
  standalone: true,
  imports: [TableComponent],
  providers: [RacesService],
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
export default class RacesComponent implements OnInit {
  races: Race[] = [];
  tableColumn: TableColumn[] = [];
  dataSource = new MatTableDataSource<Race>();
  raceService = inject(RacesService);
  dialog = inject(MatDialog);

  ngOnInit(): void {
    this.getRaces();
    this.setTableColumn();
  }

  setTableColumn() {
    this.tableColumn = [
      { label: 'Raza', def: 'name', dataKey: 'name' },
      {
        label: 'Especie',
        def: 'specie',
        dataKey: 'specie.name',
        dataType: 'object'
      }
    ];
  }

  getRaces() {
    this.raceService.getRaces().subscribe(resp => {
      this.dataSource.data = resp.reverse();
    });
  }

  actionModal(id: string) {
    const dialogRef = this.dialog.open(AdminRacesComponent, {
      height: '310px',
      width: '400px',
      data: id
    });

    dialogRef.afterClosed().subscribe(() => this.getRaces());

    dialogRef
      .afterClosed()
      .pipe(switchMap(() => this.raceService.getRaces()))
      .subscribe(() => {
        this.getRaces();
      });
  }

  onStatus(race: Race) {
    this.raceService.updateStatusRace(race).subscribe(() => this.getRaces());
  }

  onDelete(race: Race) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.height = '341px';
    dialogConfig.width = '512px';
    dialogConfig.data = {
      title: '¿Está seguro de eliminar esta raza?',
      description: 'Si continúa, la raza: ' + race.name + ' será eliminada.',
      actionButtonText: 'Eliminar!'
    };

    const dialogRef = this.dialog.open(DeleteModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        this.raceService.deleteRace(race).subscribe(() => {
          this.getRaces();
        });
      }
    });
  }
}
