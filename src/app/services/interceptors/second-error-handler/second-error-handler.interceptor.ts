import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EMPTY, Observable, catchError, tap, throwError } from 'rxjs';
import { ErrorBodyType } from 'src/app/shared/types/errorBodyResponse';
import { AuthService } from '../../auth/auth.service';

@Injectable()
export class SecondErrorHandlerInterceptor implements HttpInterceptor {
  authService = inject(AuthService);
  toastr = inject(ToastrService);

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('SECOND 1- ERROR INTERCEPTOR WORKS THE REQ: ', req);

    return next.handle(req).pipe(
      tap((test) => { console.log('Tap In Second Inter', test, req); }),

      catchError((httpErrorRes: HttpErrorResponse) => { //=>IMPO:  Why Should always return a token and what it does with it.
        const errorBody : ErrorBodyType = httpErrorRes.error;
        console.log('SECOND 2- ERROR INTERCEPTOR WORKS THE HTTP_ERROR_RES: ', httpErrorRes, '--------', httpErrorRes.status);

        if(httpErrorRes.status == 400 || httpErrorRes.status == 404){
          console.log('SECOND 3- ERROR INTERCEPTOR WORKS THE 400 Or 404 STATUS CODE: ', httpErrorRes);

          console.log('seee', errorBody);

          return throwError(() => errorBody);

        }

        else{
          console.log('SECOND 3- ERROR INTERCEPTOR WORKS THE ELSE STATUS CODE: ', httpErrorRes);
          this.toastr.error('Something went wrong.', 'Error');
          this.authService.logout();
          return EMPTY;
        }

      }) //=> IMPO: Do The Case .. other statement approach
    )
  }

}


