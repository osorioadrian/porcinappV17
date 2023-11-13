import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesComponent } from './pages.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AuthService } from '@auth/service/auth.service';
import { SidebarService } from '@common/services/sidebar.service';
import { Observable, of } from 'rxjs';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { BreadcrumbsComponent } from '@shared/breadcrumbs/breadcrumbs.component';

describe('PagesComponent', () => {
  let component: PagesComponent;
  let fixture: ComponentFixture<PagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PagesComponent,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        BreadcrumbsComponent
      ],
      providers: [
        { provide: AuthService, useValue: {} },
        { provide: SidebarService, useValue: {} },
        {
          provide: BreakpointObserver,
          useValue: { observe: () => of({ matches: false }) }
        },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 1 })
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
