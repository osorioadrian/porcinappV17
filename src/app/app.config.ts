import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { headerInterceptor } from './common/interceptors/header.interceptor';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CustomPaginator } from './common/helpers/customPaginator';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { spinnerInterceptor } from './common/interceptors/spinner.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(MatSnackBarModule),
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(
      withInterceptors([headerInterceptor, spinnerInterceptor])
    ),
    { provide: MatPaginatorIntl, useValue: CustomPaginator() }
  ]
};
