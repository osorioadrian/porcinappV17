import { Component, ViewChild, inject } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Subscription } from 'rxjs';
import { User } from '@pages/users/interface/user';
import { UsersService } from '@pages/users/service/users.service';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ImagenPipe } from '@common/pipes/imagen.pipe';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    MatIconModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    ImagenPipe,
    MatDialogModule,
    MatInputModule
  ],
  templateUrl: './users.component.html',
  styles: `
    .avatar {
        width: 50px;
        border-radius: 50%;
        padding-top: 5px;
      }
      .descipcion {
        padding-left: 15px;
      }
      .searchTable {
        width: 50%
      }
  `
})
export default class UsersComponent {
  private subscription: Subscription = new Subscription();
  users: User[] = [];
  pageSize = 6;
  pageSizeOptions: number[] = [6, 12, 24, 60];
  checked: any;
  disabled = false;

  displayedColumns: string[] = [
    'imagen',
    'name',
    'contacto',
    'role',
    'status',
    'edit'
  ];
  dataSource = new MatTableDataSource<User>();

  private readonly userService = inject(UsersService);
  private readonly dialog = inject(MatDialog);

  trackTask(index: number): number {
    return index;
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.getUsers();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getUsers(): void {
    this.subscription.add(
      this.userService.getUsers().subscribe(response => {
        this.dataSource.data = response.reverse();
      })
    );
  }

  searchUser(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  modalUser(id: string): void {
    // const dialogRef = this.dialog.open(AdminUserComponent, {
    //   data: id
    // });
    // dialogRef.afterClosed().subscribe( () => this.getUsers());
  }

  updateStatus(user: User, status: boolean) {
    // user.isActive = status;
    // this.userService.updateStatusUser(user).subscribe( () => this.getUsers() );
  }
}
