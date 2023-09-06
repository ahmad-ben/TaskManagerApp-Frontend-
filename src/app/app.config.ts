import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { routes } from './app.routes';
import { ApiInterceptor } from './services/interceptor/api.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptorsFromDi(),
    ), //( withInterceptors([ ApiInterceptor ]) ), //=> IMPO: Learn More About This Approach and about interceptor en general
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true }, //=> IMPO: what all of this...
    provideRouter(routes)
  ]
};

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
