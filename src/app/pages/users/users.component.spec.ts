import { ComponentFixture, TestBed } from '@angular/core/testing';
import UsersComponent from './users.component';
import { of } from 'rxjs';
import { UsersService } from './service/users.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersComponent, BrowserAnimationsModule],
      providers: [
        { provide: UsersService, useValue: { getUsers: () => of([]) } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
