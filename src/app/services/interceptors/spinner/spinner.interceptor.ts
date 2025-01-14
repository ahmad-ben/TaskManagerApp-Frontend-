import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, finalize, first } from 'rxjs';
import { WorkingSpinnersService } from '../../spinners-state/working-spinner.service';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  isASpinnerWorking?: boolean;

  workingSpinners = inject(WorkingSpinnersService);
  spinner = inject(NgxSpinnerService);

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(!(req.url.includes("signIn") || req.url.includes("signUp"))) return next.handle(req);

    this.workingSpinners.arrayOfWorkingSpinners$
      .pipe( first() )
      .subscribe({
        next: ((arrayOfWorkingSpinners: string[]) => {
          if(arrayOfWorkingSpinners.length == 0) this.isASpinnerWorking = false;
          else this.isASpinnerWorking = true;
        })
      })

      if(!this.isASpinnerWorking) this.spinner.show('primary')

      return next.handle(req).pipe(
        finalize(() => this.spinner.hide('primary'))
      );

  }

}
