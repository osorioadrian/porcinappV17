import { ComponentFixture, TestBed } from '@angular/core/testing';
import MetricsComponent from './metrics.component';
import { MetricsService } from './service/metrics.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { AuthService } from '@auth/service/auth.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TableComponent } from '@shared/table/table.component';
import { DeleteModalComponent } from '@shared/delete-modal/delete-modal.component';
import { AdminMetricComponent } from './admin/admin-metric.component';

describe('MetricsComponent', () => {
  let component: MetricsComponent;
  let fixture: ComponentFixture<MetricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        MatDialogModule,
        MatTableModule,
        TableComponent,
        DeleteModalComponent,
        AdminMetricComponent,
        MetricsComponent
      ],
      providers: [
        {
          provide: MetricsService,
          useValue: {
            getMetrics: () => of([]),
            updateStatusMetric: () => of({})
          }
        },
        { provide: AuthService, useValue: { user: { roles: [] } } }
      ],
      declarations: []
    }).compileComponents();

    fixture = TestBed.createComponent(MetricsComponent);
    component = fixture.componentInstance;
    component.tableColumn = [
      { label: 'Métricas', def: 'name', dataKey: 'name' },
      { label: 'Símbolo', def: 'symbol', dataKey: 'symbol' }
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
