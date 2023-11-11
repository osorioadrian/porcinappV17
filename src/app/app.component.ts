import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SpinnerComponent } from '@shared/spinner/spinner.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SpinnerComponent],
  styleUrls: ['./app.component.scss'],
  template: `
    <app-spinner />
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  title = 'porcinappV17';
}
