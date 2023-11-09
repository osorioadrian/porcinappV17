import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  loading = new BehaviorSubject<boolean>(false);
  isLoading$ = this.loading.asObservable();

  showSpinner(): void {
    this.loading.next(true);
  }

  hideSpinner(): void {
    this.loading.next(false);
  }
}
