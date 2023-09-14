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

  private setLoginInfo(userId: string | null, JWTToken: string | null, sessionToken: string | null){
    if(userId && JWTToken && sessionToken){
      localStorage.setItem('userId', userId);
      localStorage.setItem('accessToken', JWTToken);
      localStorage.setItem('refreshToken', sessionToken);
    }
  }

  deleteLoginInfo(){
    localStorage.removeItem('userId');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

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

  register(email: string, password: string){
    return this.webReqService.register(email, password)
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

  logout(){
    this.deleteLoginInfo();
    this.router.navigateByUrl('login');
  }

  getAccessToken(){
    return localStorage.getItem('accessToken');
  }

  setAccessToken(accessToken: string){
    localStorage.setItem('accessToken', accessToken);
  }

  getRefreshToken(): string{
    const refreshTokenFromLocalStorage = localStorage.getItem('refreshToken');
    return refreshTokenFromLocalStorage ? refreshTokenFromLocalStorage : '';
  }

  getUserId(): string{
    const userIdFromLocalStorage = localStorage.getItem('userId');
    return userIdFromLocalStorage ? userIdFromLocalStorage : '';
  }

  getNewAccessToken(){
    return this.http.get(
      `${this.webReqService.rootUrl}/users/getNewAccessToken`,
        {
          headers:
            {
              'X-refresh-token': this.getRefreshToken(),
              'userId': this.getUserId(),
            },
          observe: 'response'
        },
    ).pipe(
      tap((res: HttpResponse<any>) => {
        const accessToken = res.headers.get('X-access-token');
        if(accessToken) return this.setAccessToken(accessToken);
        this.setAccessToken('');
      })
    )
  }

}
