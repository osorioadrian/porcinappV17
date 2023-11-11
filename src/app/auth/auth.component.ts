import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyErrorStateMatcher } from 'app/common/helpers/errorStateMatcher';
import {
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from './service/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatCheckboxModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export default class AuthComponent implements OnInit {
  hide = true;
  readonly matcher = new MyErrorStateMatcher();
  form!: UntypedFormGroup;

  router = inject(Router);
  formBuilder = inject(UntypedFormBuilder);
  authService = inject(AuthService);

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.form = this.formBuilder.nonNullable.group({
      email: new UntypedFormControl(localStorage.getItem('email') || '', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
      ]),
      password: new UntypedFormControl('', [Validators.required]),
      remember: [localStorage.getItem('remember') || '', false]
    });
  }

  login(): void {
    if (this.form.invalid) {
      return;
    }

    if (this.form.get('remember')!.value) {
      localStorage.setItem('email', this.form.get('email')!.value);
      localStorage.setItem('remember', this.form.get('remember')!.value);
    } else {
      localStorage.removeItem('email');
      localStorage.removeItem('remember');
    }

    const user = this.form.value;
    this.authService.login(user).subscribe(resp => {
      this.router.navigate(['/dashboard']);
    });
  }
}
