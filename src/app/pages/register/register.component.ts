import { CommonModule } from '@angular/common';
import { HttpResponse } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ErrorBodyType } from 'src/app/shared/types/errorBodyResponse';

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

export class RegisterComponent implements OnInit, AfterViewInit {
  buttonClicked: boolean = false;
  errorMessage: string = '';

  @ViewChild('emailInput', { read: ElementRef }) emailInput?:ElementRef<HTMLInputElement>;

  router = inject(Router);
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  toastr = inject(ToastrService);

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

  ngOnInit(){ this.authService.deleteLoginInfo(); }

  ngAfterViewInit(){
    this.emailInput?.nativeElement.focus();
  }

  onRegisterButtonClicked(){
    this.buttonClicked = true;
    if(this.signUpForm.invalid) return;

    this.authService.register(
      this.signUpForm.value.email!,
      this.signUpForm.value.password!
    )
      .subscribe({
        next: (res: HttpResponse<any>) => {
          this.toastr.success( 'Login Success!', 'Welcome.');
          this.router.navigateByUrl('/homePage/lists')
        },
        error: (error: ErrorBodyType) => {
          console.log(error);

          this.errorMessage = error.message;
        }
      })
  }

}
