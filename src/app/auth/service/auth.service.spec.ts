import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { Auth } from '../interface/auth';

const base_url = 'http://localhost:3000/api/v1';

describe('AuthService', () => {
  let authService: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService, { provide: Router, useValue: {} }]
    });
    authService = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should login successfully', () => {
    const mockUser: Auth = {
      email: 'john@example.com',
      roles: ['ADMINISTRADOR'],
      img: 'avatar.jpg',
      remember: true,
      password: 'Abcd123'
    };
    const mockResponse = {
      id: '1',
      token: 'mock-token',
      user: mockUser,
      menu: []
    };

    authService.login(mockUser).subscribe(result => {
      expect(result).toBeTruthy();
      expect(authService.user).toEqual(mockUser);
      expect(authService.token).toEqual('mock-token');
      expect(authService.menu).toEqual([]);
    });

    const loginRequest = httpTestingController.expectOne(
      `${base_url}/auth/login`
    );
    expect(loginRequest.request.method).toEqual('POST');
    loginRequest.flush(mockResponse);
  });

  it('should handle login error', () => {
    const mockUser: Auth = {
      email: 'john@example.com',
      roles: ['ADMINISTRADOR'],
      img: 'avatar.jpg',
      remember: true,
      password: 'Abcd123'
    };

    authService.login(mockUser).subscribe(
      () => fail('Expected error, but got result'),
      error => {
        expect(error).toBeTruthy();
      }
    );

    const loginRequest = httpTestingController.expectOne(
      `${base_url}/auth/login`
    );
    expect(loginRequest.request.method).toEqual('POST');
    loginRequest.error(new ErrorEvent('error'));
  });
});
