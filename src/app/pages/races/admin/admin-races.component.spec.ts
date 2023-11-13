import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRacesComponent } from './admin-races.component';
import { RacesService } from '../service/races.service';
import { SpeciesService } from '@pages/species/services/species.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

describe('AdminRacesComponent', () => {
  let component: AdminRacesComponent;
  let fixture: ComponentFixture<AdminRacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AdminRacesComponent,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        MatDialogModule
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: RacesService, useValue: {} },
        { provide: SpeciesService, useValue: {} }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminRacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
