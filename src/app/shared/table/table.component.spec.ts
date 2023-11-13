import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableComponent } from './table.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from '@auth/service/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TableComponent,
        HttpClientTestingModule,
        BrowserAnimationsModule
      ],
      providers: [
        {
          provide: AuthService,
          useValue: { user: { roles: ['ADMINISTRADOR'] } }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit edit event', () => {
    const editSpy = jest.spyOn(component.edit, 'emit');
    const rowData = {};

    component.onEdit(rowData);

    expect(editSpy).toHaveBeenCalledWith(rowData);
  });

  it('should emit delete event', () => {
    const deleteSpy = jest.spyOn(component.delete, 'emit');
    const rowData = {};

    component.onDelete(rowData);

    expect(deleteSpy).toHaveBeenCalledWith(rowData);
  });

  it('should emit add event', () => {
    const addSpy = jest.spyOn(component.add, 'emit');

    component.onAdd();

    expect(addSpy).toHaveBeenCalled();
  });

  it('should emit status event', () => {
    const statusSpy = jest.spyOn(component.status, 'emit');
    const rowData = { isActive: true };

    component.onStatus(rowData, true);

    expect(statusSpy).toHaveBeenCalledWith(rowData);
  });
});
