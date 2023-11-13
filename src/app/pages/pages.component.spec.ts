import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PagesComponent } from './pages.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LayoutModule } from '@angular/cdk/layout';
import { SidebarService } from '@common/services/sidebar.service';
import { AuthService } from '@auth/service/auth.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { NoopAnimationsModule } from '@angular/platform-browser/animations'; // Asegúrate de tener esta importación correcta
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PagesComponent', () => {
  let component: PagesComponent;
  let fixture: ComponentFixture<PagesComponent>;
  let sidebarService: SidebarService;
  let authService: AuthService;
  let breakpointObserver: BreakpointObserver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatToolbarModule,
        MatListModule,
        MatIconModule,
        MatSidenavModule,
        MatExpansionModule,
        MatMenuModule,
        LayoutModule,
        NoopAnimationsModule, // Asegúrate de tener esta importación aquí
        HttpClientTestingModule,
        PagesComponent
      ],
      providers: [SidebarService, AuthService, BreakpointObserver],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(PagesComponent);
    component = fixture.componentInstance;
    sidebarService = TestBed.inject(SidebarService);
    authService = TestBed.inject(AuthService);
    breakpointObserver = TestBed.inject(BreakpointObserver);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Agrega tus demás pruebas aquí
});
