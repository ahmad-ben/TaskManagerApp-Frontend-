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
import { AuthService } from '../../auth/auth.service';

@Injectable()
export class ServerErrorsInterceptor implements HttpInterceptor {

  authService = inject(AuthService);
  toastr = inject(ToastrService);

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(

      catchError((httpErrorRes: HttpErrorResponse) => {
        if(httpErrorRes.status === undefined) return throwError(() => httpErrorRes);

        this.toastr.error('Something went wrong.', 'Error');
        this.authService.logout();
        return EMPTY;

      })
    )
  }

}
