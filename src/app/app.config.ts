import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideAnimations } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { provideToastr } from 'ngx-toastr';

import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { routes } from './app.routes';
import { FirstErrorHandlerInterceptor } from './services/interceptors/first-error-handler/first-error-handler.interceptor';
import { HeadersInterceptor } from './services/interceptors/headers/headers.interceptor';
import { SecondErrorHandlerInterceptor } from './services/interceptors/second-error-handler/second-error-handler.interceptor';
import { ListsResolveService } from './services/resolves/lists.resolve.service';
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
      ListsResolveService
    ),

    provideHttpClient( withInterceptorsFromDi(), ), //( withInterceptors([ ApiInterceptor 'ARRAY_OF_APP_INTERCEPTORS']) ), //=> IMPO: Learn More About This Approach and about interceptor en general

    [
      { provide: HTTP_INTERCEPTORS, useClass: HeadersInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: SecondErrorHandlerInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: FirstErrorHandlerInterceptor, multi: true },
    ], //=> IMPO: what all of this...

    provideRouter(routes)

  ],



};



// import { provideAnimations } from '@angular/platform-browser/animations';
// import { AppComponent } from './src/app.component';

// import { provideToastr } from 'ngx-toastr';

// bootstrapApplication(AppComponent, {
//   providers: [
//     provideAnimations(), // required animations providers
//     provideToastr(), // Toastr providers
//   ]
// });

// bootstrapApplication(AppComponent, {
//   providers: [
//       provideHttpClient(
//           withInterceptorsFromDi(),
//       ),
//       {
//           provide: HTTP_INTERCEPTORS,
//           useClass: AuthInterceptor,
//           multi: true,
//       },
//    ] });
