import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { EMPTY, Observable, finalize, tap } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { WorkingSpinnersService } from '../../spinners-state/working-spinner.service';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {
  isASpinnerWorking?: boolean;

  authService = inject(AuthService);
  toastr = inject(ToastrService);
  spinner = inject(NgxSpinnerService);
  workingSpinners = inject(WorkingSpinnersService);

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('No Connection', !navigator.onLine);
    if (!navigator.onLine) {
      this.toastr.error(
        'No connection',
        'Error',
        { timeOut: 4000 }
      );
      return EMPTY;
    }

    console.log('Header works');
    console.log('starts here');

    this.workingSpinners.arrayOfWorkingSpinners$
      .subscribe({
        next: ((arrayOfWorkingSpinners: string[]) => {
          if(arrayOfWorkingSpinners.length == 0) this.isASpinnerWorking = false;
          else this.isASpinnerWorking = true;
        })
      })

    if(!this.isASpinnerWorking) {
      console.log('REQUEST', req);
      console.log('this.isASpinnerWorking', this.isASpinnerWorking);
      this.spinner.show('primary')
    }

    console.log('HEADER INTERCEPTOR WORKS 1: ', req);

    req = this.addAuthHeader(req);

    console.log('HEADER INTERCEPTOR WORKS 2: ', req);

    return next.handle(req).pipe(
      tap((test) => {
        console.log('From Header Inter', test)
      }),
      finalize(() => {
        console.log('------------ finalize', this.isASpinnerWorking)
        this.spinner.hide('primary');
      })
    );

  }

  addAuthHeader(req: HttpRequest<any>){
    const accessToken = this.authService.getAccessToken();

    if(accessToken) return req.clone({
      setHeaders: {
        'X-access-token': accessToken
      }
    })
    return req;
  }

}

