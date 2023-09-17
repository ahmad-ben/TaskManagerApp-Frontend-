import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EMPTY, Observable, catchError, throwError } from 'rxjs';
import { ErrorBodyType } from 'src/app/shared/types/errorBodyResponse';
import { AuthService } from '../../auth/auth.service';

@Injectable()
export class ServerErrorsInterceptor implements HttpInterceptor {

  authService = inject(AuthService);
  toastr = inject(ToastrService);

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('INTERCEPTOR 4 ServerErrorsInterceptor: ', req);
    return next.handle(req).pipe(

      catchError((httpErrorRes: HttpErrorResponse) => {
        console.log('INTERCEPTOR 4 ServerErrorsInterceptor In catchError', httpErrorRes);

        const errorBody : ErrorBodyType = httpErrorRes.error;
        if(!httpErrorRes.status) return throwError(() => httpErrorRes);

        this.toastr.error('Something went wrong.', 'Error');
        this.authService.logout();
        return EMPTY;

      })
    )
  }

}
