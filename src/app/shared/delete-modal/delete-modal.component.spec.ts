import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteModalComponent } from './delete-modal.component';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

describe('DeleteModalComponent', () => {
  let component: DeleteModalComponent;
  let fixture: ComponentFixture<DeleteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteModalComponent, MatDialogModule, MatButtonModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {
            close: jest.fn()
          }
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {}
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the dialog', () => {
    const dialogRefSpy = jest.spyOn(component.dialogRef, 'close');
    component.closeModal();
    expect(dialogRefSpy).toHaveBeenCalled();
  });
});
