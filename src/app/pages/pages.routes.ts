import { Routes } from '@angular/router';
import { userAdminGuard } from 'app/common/guards/user-admin.guard';
import { verifyTokenGuard } from 'app/common/guards/verify-token.guard';

export const pageRoutes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component'),
    canActivate: [verifyTokenGuard],
    title: 'Porcinapp - Dashboard',
    data: { titulo: 'Dashboard' }
  },
  {
    path: 'users',
    loadComponent: () => import('./users/users.component'),
    canActivate: [userAdminGuard],
    title: 'Porcinapp - Usuarios',
    data: { titulo: 'Usuarios' }
  }
];
