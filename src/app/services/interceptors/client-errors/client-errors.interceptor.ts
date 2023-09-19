import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError, throwError } from 'rxjs';
import { ErrorBodyType } from 'src/app/shared/types/errorBodyResponse';
import { AuthService } from '../../auth/auth.service';

@Injectable()
export class ClientErrorsInterceptor implements HttpInterceptor {

  authService = inject(AuthService);
  toastr = inject(ToastrService);

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(

      catchError((httpErrorRes: HttpErrorResponse) => {

        const errorBody : ErrorBodyType = httpErrorRes.error;

        if(httpErrorRes.status == 400 || httpErrorRes.status == 404){

          return throwError(() => errorBody);

        }

        else return next.handle(req);

      })
    )
  }

}
