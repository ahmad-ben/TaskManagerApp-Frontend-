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

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {
  authService = inject(AuthService);
  toastr = inject(ToastrService);
  spinner = inject(NgxSpinnerService);

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

      this.spinner.show();

    console.log('HEADER INTERCEPTOR WORKS 1: ', req);

    req = this.addAuthHeader(req);

    console.log('HEADER INTERCEPTOR WORKS 2: ', req);

    return next.handle(req).pipe(
      tap((test) => {
        console.log('From Header Inter', test)
      }),
      finalize(() => {
        this.spinner.hide()
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

/*

If We Write:

export class HeadersInterceptor implements HttpInterceptor {

  authService = inject(AuthService);

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    return next.handle(req).pipe(
      ...
    );

    we can track this observable but subscribe in it how this could happen

  }

}

*/
