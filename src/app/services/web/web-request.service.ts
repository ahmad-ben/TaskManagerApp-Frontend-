import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WebRequestService {
  readonly rootUrl: string = 'http://192.168.1.4:80';

  http = inject(HttpClient);

  ngOnInit(): void {}

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

  login(email: string, password: string) {
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
  }
}
