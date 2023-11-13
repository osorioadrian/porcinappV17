import { TestBed } from '@angular/core/testing';

import { MetricsService } from './metrics.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MetricsService', () => {
  let service: MetricsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MetricsService]
    });
    service = TestBed.inject(MetricsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
