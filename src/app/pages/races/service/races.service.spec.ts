import { TestBed } from '@angular/core/testing';

import { RacesService } from './races.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RacesService', () => {
  let service: RacesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RacesService]
    });
    service = TestBed.inject(RacesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
