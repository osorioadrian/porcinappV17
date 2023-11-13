import { ComponentFixture, TestBed } from '@angular/core/testing';
import RacesComponent from './races.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { AuthService } from '@auth/service/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RacesService } from './service/races.service';

describe('RacesComponent', () => {
  let component: RacesComponent;
  let fixture: ComponentFixture<RacesComponent>;
  let racesService: RacesService;
  let matDialog: MatDialog;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MatDialogModule,
        MatTableModule,
        HttpClientTestingModule
      ],
      providers: [
        RacesService,
        MatDialog,
        {
          provide: AuthService,
          useValue: { user: { roles: ['ADMINISTRADOR'] } }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RacesComponent);
    component = fixture.componentInstance;
    racesService = TestBed.inject(RacesService);
    matDialog = TestBed.inject(MatDialog);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set table columns', () => {
    component.setTableColumn();
    const expectedColumns = [
      { label: 'Raza', def: 'name', dataKey: 'name' },
      {
        label: 'Especie',
        def: 'specie',
        dataKey: 'specie.name',
        dataType: 'object'
      }
    ];
    expect(component.tableColumn).toEqual(expectedColumns);
  });
});
