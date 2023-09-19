import { CommonModule } from '@angular/common';
import { HttpResponse } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorBodyType } from 'src/app/shared/types/errorBodyResponse';
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

export class LoginComponent implements OnInit, AfterViewInit {
  buttonClicked: boolean = false;
  errorMessage: string = '';

 @ViewChild('emailInput', { read: ElementRef }) emailInput?:ElementRef<HTMLInputElement>;

  router = inject(Router);
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  toastr = inject(ToastrService);

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

  ngOnInit(){ this.authService.deleteLoginInfo(); }

  ngAfterViewInit(){
    this.emailInput?.nativeElement.focus();
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
          this.toastr.success( 'Login Success!', 'Welcome.');
          this.router.navigateByUrl('/homePage/lists');
        },
        error: (error: ErrorBodyType) => {
          this.errorMessage = error.message;
        }
      });
  }

}
