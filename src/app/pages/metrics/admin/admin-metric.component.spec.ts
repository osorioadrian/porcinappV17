import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminMetricComponent } from './admin-metric.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AdminMetricComponent', () => {
  let component: AdminMetricComponent;
  let fixture: ComponentFixture<AdminMetricComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AdminMetricComponent,
        HttpClientTestingModule,
        BrowserAnimationsModule
      ],
      providers: [{ provide: MAT_DIALOG_DATA, useValue: {} }]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminMetricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
