import { TestBed } from '@angular/core/testing';

import { SpeciesService } from './species.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SpeciesService', () => {
  let service: SpeciesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SpeciesService]
    });
    service = TestBed.inject(SpeciesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
