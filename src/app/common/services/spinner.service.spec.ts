import { TestBed } from '@angular/core/testing';

import { SpinnerService } from './spinner.service';

describe('SpinnerService', () => {
  let service: SpinnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpinnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit true when showSpinner is called', () => {
    // Usa jest.spyOn en lugar de spyOn
    const nextSpy = jest.spyOn(service['loading'], 'next');

    service.showSpinner();

    expect(nextSpy).toHaveBeenCalledWith(true);
  });

  it('should emit false when hideSpinner is called', () => {
    // Usa jest.spyOn en lugar de spyOn
    const nextSpy = jest.spyOn(service['loading'], 'next');

    service.hideSpinner();

    expect(nextSpy).toHaveBeenCalledWith(false);
  });

  it('should emit true when isLoading$ is true', () => {
    service.showSpinner();

    service.isLoading$.subscribe(value => {
      expect(value).toBe(true);
    });
  });

  it('should emit false when isLoading$ is false', () => {
    service.hideSpinner();

    service.isLoading$.subscribe(value => {
      expect(value).toBe(false);
    });
  });
});
