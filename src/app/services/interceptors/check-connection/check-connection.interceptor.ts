import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EMPTY, Observable } from 'rxjs';

@Injectable()
export class CheckConnectionInterceptor implements HttpInterceptor {
  toastr = inject(ToastrService);

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!navigator.onLine) {
      this.toastr.error(
        'No connection',
        'Error',
        { timeOut: 4000 }
      );
      return EMPTY;
    };

    return next.handle(req);

  }

}
