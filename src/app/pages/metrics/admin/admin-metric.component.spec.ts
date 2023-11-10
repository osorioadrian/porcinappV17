import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMetricComponent } from './admin-metric.component';

describe('AdminMetricComponent', () => {
  let component: AdminMetricComponent;
  let fixture: ComponentFixture<AdminMetricComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminMetricComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminMetricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
