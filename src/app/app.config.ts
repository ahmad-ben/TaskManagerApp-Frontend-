import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideAnimations } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { provideToastr } from 'ngx-toastr';

import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { routes } from './app.routes';
import { CheckConnectionInterceptor } from './services/interceptors/check-connection/check-connection.interceptor';
import { ClientErrorsInterceptor } from './services/interceptors/client-errors/client-errors.interceptor';
import { HeadersInterceptor } from './services/interceptors/headers/headers.interceptor';
import { ServerErrorsInterceptor } from './services/interceptors/server-errors/server-errors.interceptor';
import { SpinnerInterceptor } from './services/interceptors/spinner/spinner.interceptor';
import { UnauthorizedErrorsInterceptor } from './services/interceptors/unauthorized-errors/unauthorized-errors.interceptor';
import { toasterPosition } from './shared/functions/toasterPosition';


export const appConfig: ApplicationConfig = {
  providers: [

    provideAnimations(),
    provideToastr({
      timeOut: 2000,
      positionClass: toasterPosition(),
      iconClasses: { success: 'toast-success' },
      maxOpened: 1,
      preventDuplicates: true
    }),

    importProvidersFrom(
      NgxSpinnerModule,
    ),

    provideHttpClient( withInterceptorsFromDi(), ),

    [
      { provide: HTTP_INTERCEPTORS, useClass: CheckConnectionInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: HeadersInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: ServerErrorsInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: ClientErrorsInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: UnauthorizedErrorsInterceptor, multi: true },
    ],

    provideRouter(routes)

  ],



};
