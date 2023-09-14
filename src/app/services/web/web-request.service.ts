import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class WebRequestService  {
  readonly rootUrl: string = 'https://taskmanagerapp-backend.onrender.com';
  // readonly rootUrl: string = 'http://192.168.1.5:80'; //=> IMPO: Just In Dev Search for '//=> , //, IMPO, /*, logs..'

  http = inject(HttpClient);

  get(url: string) {
    return this.http.get(`${this.rootUrl}/${url}`);
  }

  post(url: string, payload: Object) {
    return this.http.post(`${this.rootUrl}/${url}`, payload);
  }

  patch(url: string, payload: Object) {
    return this.http.patch(`${this.rootUrl}/${url}`, payload);
  }

  delete(url: string) {
    return this.http.delete(`${this.rootUrl}/${url}`);
  }

  login(email: string, password: string){
    return this.http.post(
      `${this.rootUrl}/users/signIn`,
      { email, password },
      { observe: 'response' }, //=> IMPO: What is This?
    );
  }

  register(email: string, password: string) {
    return this.http.post(
      `${this.rootUrl}/users/signUp`,
      { email, password },
      { observe: 'response' },
    );
  };

}



/*

  this is the whole service:

  import { HttpClient } from '@angular/common/http';
  import { Injectable, inject } from '@angular/core';
  import { ToastrService } from 'ngx-toastr';
  import { of } from 'rxjs';

  @Injectable({
    providedIn: 'root',
  })
  export class WebRequestService {
    readonly rootUrl: string = 'http://192.168.1.3:80';
    userOffline?: boolean;

    http = inject(HttpClient);
    toastr = inject(ToastrService);

    ngOnInit(): void {
      if (!navigator.onLine) {
        this.userOffline = true;
        this.toastr.error(
          'No connection',
          'Error',
          { timeOut: 5000 }
        );
      }
    }

    isUserOffline(){
      return this.userOffline;
    }

    post(url: string, payload: Object) {
      if(this.isUserOffline()) return of('')
      return this.http.post(`${this.rootUrl}/${url}`, payload);
    }

    login(email: string, password: string) {
      if(this.isUserOffline()) return of('');
      return this.http.post(
        `${this.rootUrl}/users/signIn`,
        { email, password },
        { observe: 'response' }
      );
    }

  }

  and for my second service class:

  import { HttpClient, HttpResponse } from '@angular/common/http';
  import { Injectable, inject } from '@angular/core';
  import { Router } from '@angular/router';
  import { shareReplay, tap } from 'rxjs';
  import { WebRequestService } from '../web/web-request.service';

  @Injectable({
    providedIn: 'root'
  })
  export class AuthService {

    webReqService = inject(WebRequestService);
    router = inject(Router);
    http = inject(HttpClient);

    login(email: string, password: string){
      return this.webReqService.login(email, password)
        .pipe(
          shareReplay(),
          tap((res: HttpResponse<any>) => {
            this.setLoginInfo(
              res.body._id,
              res.headers.get('X-access-token'),
              res.headers.get('X-refresh-token')
            );
          })
        );
    }

  }


  this gives me this problem:
  Expected 0 arguments, but got 2.ts(2554), way

*/
