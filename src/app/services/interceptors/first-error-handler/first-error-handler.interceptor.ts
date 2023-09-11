import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { ErrorBodyType } from './../../../shared/types/errorBodyResponse';

@Injectable()
export class FirstErrorHandlerInterceptor implements HttpInterceptor {

  authService = inject(AuthService);
  toastr = inject(ToastrService);

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('1- ERROR INTERCEPTOR WORKS THE REQ: ', req);

    return next.handle(req).pipe(

      catchError((httpErrorRes: HttpErrorResponse) => { //=>IMPO:  Why Should always return a token and what it does with it.
        const errorBody : ErrorBodyType = httpErrorRes.error;
        console.log('2- ERROR INTERCEPTOR WORKS THE HTTP_ERROR_RES: ', httpErrorRes);

        if(httpErrorRes.status == 401) {
          console.log('3- ERROR INTERCEPTOR WORKS THE 401 STATUS CODE: ', httpErrorRes);
          if(errorBody.shouldNavigate){ //=> The refresh method has a problem, it should loged out.
            console.log('4- ERROR INTERCEPTOR WORKS THE 401 STATUS CODE WITH ERROR_CODE NOT 0: ', httpErrorRes);
            this.authService.logout();
            this.toastr.error('Session expired, please login again', 'Error');
            return throwError(() => new Error(httpErrorRes.error.errorCode));
          }

          console.log('4- ERROR INTERCEPTOR WORKS THE 401 STATUS CODE WITH ERROR_CODE 0: ', httpErrorRes);
          return this.authService.getNewAccessToken()
            .pipe(
              switchMap(() => {
                req = this.addAuthHeader(req);
                console.log(req);
                return next.handle(req); //=> STOP: How This is working 'Chat GPT'
              })
            )
        }return next.handle(req);

      })
    )
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

export class FirstErrorHandlerInterceptor implements HttpInterceptor {

  authService = inject(AuthService);
  toastr = inject(ToastrService);

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    return next.handle(req).pipe(

      catchError((httpErrorRes: HttpErrorResponse) => {

        if(httpErrorRes.status == 401) {
          if(httpErrorRes.error.errorCode !== 0){
            this.authService.logout();
            this.toastr.error('Session expired, please login again', 'Error');
            return throwError(() => new Error(httpErrorRes.error.errorCode));
          }

          return this.authService.getNewAccessToken()
            .pipe(
              switchMap(() => {
                req = this.addAuthHeader(req);
                console.log(req);
                return next.handle(req);
              })
            )
        }return next.handle(req);

      })
    )
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



*/
