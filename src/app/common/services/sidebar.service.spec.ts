import { TestBed } from '@angular/core/testing';

import { SidebarService } from './sidebar.service';
import { AuthService } from '@auth/service/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SidebarService', () => {
  let service: SidebarService;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(SidebarService);
    authService = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load menu from AuthService', () => {
    const mockMenu = [
      {
        submenu: [{ titulo: 'Ingresos', url: '/incomes', icon: 'payments' }],
        titulo: 'Páginas'
      }
    ];
    authService.menu = mockMenu;

    service.loadMenu();

    expect(service.menu).toEqual(mockMenu);
  });
});
