import { Routes } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
import { loginGuard } from './common/guards/login.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./auth/auth.component')
  },
  {
    path: '',
    component: PagesComponent,
    loadChildren: () => import('./pages/pages.routes').then(r => r.pageRoutes),
    canActivate: [loginGuard]
  }
];
