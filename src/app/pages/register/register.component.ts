import { CommonModule } from '@angular/common';
import { HttpResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent {
  buttonClicked: boolean = false;

  router = inject(Router);
  fb = inject(FormBuilder);
  authService = inject(AuthService);

  signUpForm = this.fb.group({
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

  onRegisterButtonClicked(){
    this.buttonClicked = true;
    if(this.signUpForm.invalid) return;

    this.authService.register(
      this.signUpForm.value.email!,
      this.signUpForm.value.password!
    )
      .subscribe({
        next: (res: HttpResponse<any>) => {
          this.router.navigateByUrl('')
        }
      })
  }

}
