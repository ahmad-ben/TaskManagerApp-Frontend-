import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { EMPTY, Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  authService = inject(AuthService);

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    req = this.addAuthHeader(req);

    return next.handle(req).pipe(
      catchError((httpErrorRes: HttpErrorResponse) => { //=>IMPO:  Why Should always return a token and what it does with it.
        console.log(httpErrorRes);

        if(httpErrorRes.status == 401) {
          if(httpErrorRes.error.message == 'The session does not exist or is expired.'){
            // this.authService.logout();
            return throwError(() => new Error(httpErrorRes.error.message))
          }

          return this.authService.getNewAccessToken()
            .pipe(
              switchMap(() => {
                req = this.addAuthHeader(req);
                return next.handle(req);
              }),
              catchError((error) => {
                return EMPTY;
              })
            )
        }
        else{
          // this.authService.logout();
          return throwError(() => new Error(httpErrorRes.error.message))
        }
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

/*
.subscribe({
  next: (newListFromDB: any) => {
    console.log(newListFromDB);
    this.inputValue = '';
    this.route.navigateByUrl(`/lists/${newListFromDB._id}`);
  }
})
*/

/*
{
        next: ((res: HttpResponse<any>) => {

        })
      }
*/



















/*
=============================================================================================

import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, catchError, switchMap, tap, throwError } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  authService = inject(AuthService);

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    req = //set new header value with the JWT token.

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if(error.status == 401 && //other condition for make sure that we didn't update JWT before) {
          return this.authService.getNewAccessToken() //=> refresh JWT
            .pipe(
              switchMap(() => {
                req = //set new header value with the JWT token using the refresh token
                return next.handle(req);
              }),
              catchError(() => {
                this.authService.logout();
                return EMPTY;
              })
            )
        }
        else{ //=> This case is after the refreshing of JWT by Refresh token but didn't success 'the refres token itself didn't correct 'maybe expire...''

          this.authService.logout();
          return throwError(() => new Error(error.message))

      })
    )
  }

}


//So here the big problem is i want a way for make sure that the JWT token updated but no work and that mean the refresh token has a problem







        //may the JWT expires if we have error.status == 401 so we should get new one from the back end by the refresh token
        //return the service method for get the new JWT
        //handle the new JWT in the header and return the next.handle(req); for send it again
        //it may fail again and this means the refresh token itself has problem, so log out:
          //this.authService.logout();
          // return throwError(() => new Error(error.message))






=============================================================================================


//=> IMPO:
 See how i can check the validity of Refresh token with JWT from other tutorials

*/
