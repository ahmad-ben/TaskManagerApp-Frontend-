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
import { ErrorBodyType } from 'src/app/shared/types/errorBodyResponse';
import { AuthService } from '../../auth/auth.service';

@Injectable()
export class UnauthorizedErrorsInterceptor implements HttpInterceptor {

  authService = inject(AuthService);
  toastr = inject(ToastrService);

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(

      catchError((httpErrorRes: HttpErrorResponse) => {
        const errorBody : ErrorBodyType = httpErrorRes.error;

        if(httpErrorRes.status == 401) {
          if(errorBody.shouldNavigate){

            this.authService.logout();
            this.toastr.error('Session expired, please login again', 'Error');
            return throwError(() => new Error(httpErrorRes.error.errorCode));

          }

          return this.authService.getNewAccessToken()
            .pipe(
              switchMap(() => {

                req = this.addAuthHeader(req);
                return next.handle(req);

              })
            )
        }

        return next.handle(req);

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
