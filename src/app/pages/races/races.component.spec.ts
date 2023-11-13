import { ComponentFixture, TestBed } from '@angular/core/testing';
import RacesComponent from './races.component';
import { RacesService } from './service/races.service';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('RacesComponent', () => {
  let component: RacesComponent;
  let fixture: ComponentFixture<RacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        RacesComponent,
        HttpClientTestingModule
      ],
      providers: [
        RacesService,
        { provide: RacesService, useValue: { getRaces: () => of([]) } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
