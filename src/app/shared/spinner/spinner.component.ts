import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerService } from '@common/services/spinner.service';
import { ThemePalette } from '@angular/material/core';
import {
  ProgressSpinnerMode,
  MatProgressSpinnerModule
} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  template: `
    <section class="spinner-section" *ngIf="isLoading$ | async">
      <mat-progress-spinner
        class="example-margin"
        [color]="color"
        [mode]="mode"
        [value]="value"
      >
      </mat-progress-spinner>
    </section>
  `,
  styles: `
    .spinner-section {
      position: fixed;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.15);
      z-index: 10;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `
})
export class SpinnerComponent {
  spinnerService = inject(SpinnerService);

  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 50;

  isLoading$ = this.spinnerService.isLoading$;
}
