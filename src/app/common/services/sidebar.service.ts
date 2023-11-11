import { Injectable, inject } from '@angular/core';
import { AuthService } from '@auth/service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  // Menu estating
  home: any = [
    {
      titulo: 'Inicio',
      submenu: [
        { titulo: 'Dashboard', url: '/dashboard', icon: 'dashboard' },
        { titulo: 'Perfil', url: '/profile', icon: 'person' },
        { titulo: 'Cerrar Sesión', url: '/login', icon: 'power_settings_new' }
      ]
    }
  ];

  // Menu backend
  menu: any[] = [];

  authService = inject(AuthService);

  loadMenu(): void {
    this.menu = this.authService.menu;
  }
}
