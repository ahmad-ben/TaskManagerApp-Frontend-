import { CommonModule } from '@angular/common';
import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from './../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  buttonClicked: boolean = false;

  router = inject(Router);
  fb = inject(FormBuilder);
  authService = inject(AuthService);

  signInForm = this.fb.group({
    email:[
      '',
      [
        Validators.required,
        Validators.email,
        Validators.minLength(10),
        Validators.maxLength(255)
      ]
    ],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(100)
      ]
    ],
  })

  ngOnInit(){
    this.authService.deleteLoginInfo();
  }

  onLoginButtonClicked(){
    this.buttonClicked = true;
    if(this.signInForm.invalid) return;

    this.authService.login(
      this.signInForm.value.email!,
      this.signInForm.value.password!
    )
      .subscribe({
        next: (res: HttpResponse<any>) => {
          this.router.navigateByUrl('');
        }
      });
  }

}
